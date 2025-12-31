// backend/database.js

const sqlite3 = require('sqlite3').verbose();

// Create/connect to database
const db = new sqlite3.Database('./expenses.db', (err) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
    } else {
        console.log('✅ Connected to SQLite database');
    }
});

// Create expenses table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('❌ Error creating table:', err.message);
    } else {
        console.log('✅ Expenses table ready');
    }
});

module.exports = db;