// frontend/script.js

// ============ CONFIGURATION ============
// Change this to your Render URL after deployment
const API_URL = 'http://localhost:5000/api';
// For local testing, use: 'http://localhost:5000/api'

// ============ DOM ELEMENTS ============
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');
const submitBtn = document.getElementById('submitBtn');

// Category emoji mapping
const categoryEmoji = {
    'Food': '🍔',
    'Transport': '🚌',
    'Shopping': '🛒',
    'Entertainment': '🎮',
    'Bills': '💡',
    'Other': '📦'
};

// ============ FETCH ALL EXPENSES ============
async function fetchExpenses() {
    try {
        expenseList.innerHTML = '<p class="loading">Loading...</p>';
        
        const response = await fetch(`${API_URL}/expenses`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        
        const expenses = await response.json();
        displayExpenses(expenses);
        updateTotal(expenses);
        
    } catch (error) {
        console.error('Error:', error);
        expenseList.innerHTML = '<p class="empty-state">Failed to load expenses. Please try again.</p>';
    }
}

// ============ DISPLAY EXPENSES ============
function displayExpenses(expenses) {
    if (expenses.length === 0) {
        expenseList.innerHTML = '<p class="empty-state">No expenses yet. Add one!</p>';
        return;
    }
    
    expenseList.innerHTML = expenses.map(expense => `
        <div class="expense-item" data-id="${expense.id}">
            <span class="emoji">${categoryEmoji[expense.category] || '📦'}</span>
            <div class="details">
                <div class="title">${expense.title}</div>
                <div class="meta">${expense.category} • ${formatDate(expense.date)}</div>
            </div>
            <span class="amount">₹${parseFloat(expense.amount).toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})" title="Delete">🗑️</button>
        </div>
    `).join('');
}

// ============ UPDATE TOTAL ============
function updateTotal(expenses) {
    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    totalAmount.textContent = `₹${total.toFixed(2)}`;
}

// ============ FORMAT DATE ============
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short',
        year: 'numeric'
    });
}

// ============ ADD EXPENSE ============
async function addExpense(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    
    // Validation
    if (!title || !amount || !category) {
        alert('Please fill all fields');
        return;
    }
    
    // Disable button while submitting
    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding...';
    
    try {
        const response = await fetch(`${API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, amount: parseFloat(amount), category })
        });
        
        if (!response.ok) {
            throw new Error('Failed to add expense');
        }
        
        // Clear form
        expenseForm.reset();
        
        // Refresh list
        fetchExpenses();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add expense. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add Expense';
    }
}

// ============ DELETE EXPENSE ============
async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/expenses/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete expense');
        }
        
        // Refresh list
        fetchExpenses();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete expense. Please try again.');
    }
}

// ============ EVENT LISTENERS ============
expenseForm.addEventListener('submit', addExpense);

// ============ INITIAL LOAD ============
fetchExpenses();