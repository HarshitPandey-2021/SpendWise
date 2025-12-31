// backend/index.js

const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ============ ROUTES ============

// Home route - test if API is running
app.get('/', (req, res) => {
    res.json({ message: '🚀 Campus Expense Tracker API is running!' });
});

// GET all expenses
app.get('/expenses', (req, res) => {
    const sql = 'SELECT * FROM expenses ORDER BY date DESC';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// POST - Add new expense
app.post('/api/expenses', (req, res) => {
    const { title, amount, category } = req.body;
    
    // Validation
    if (!title || !amount || !category) {
        return res.status(400).json({ error: 'Title, amount, and category are required' });
    }
    
    const sql = 'INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)';
    const date = new Date().toISOString();
    
    db.run(sql, [title, amount, category, date], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            id: this.lastID, 
            title, 
            amount, 
            category, 
            date,
            message: 'Expense added successfully!' 
        });
    });
});

// DELETE - Remove expense
app.delete('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = 'DELETE FROM expenses WHERE id = ?';
    
    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted successfully!' });
    });
});

// GET - Stats for summary
app.get('/api/stats', (req, res) => {
    const sql = `
        SELECT category, SUM(amount) as total 
        FROM expenses 
        GROUP BY category
    `;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});