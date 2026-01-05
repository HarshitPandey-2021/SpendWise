// ============ CONFIGURATION ============
const API_URL = 'https://spendwise-mvzm.onrender.com/api';

// ============ SAMPLE DATA ============
const SAMPLE_EXPENSES = [
    { id: 'sample1', title: 'Sample Lunch', amount: 250, category: 'Food', date: new Date().toISOString() },
    { id: 'sample2', title: 'Sample Bus Fare', amount: 50, category: 'Transport', date: new Date().toISOString() },
    { id: 'sample3', title: 'Sample Movie', amount: 300, category: 'Entertainment', date: new Date().toISOString() },
    { id: 'sample4', title: 'Sample Shopping', amount: 500, category: 'Shopping', date: new Date().toISOString() },
    { id: 'sample5', title: 'Sample Electricity', amount: 400, category: 'Bills', date: new Date().toISOString() }
];

// ============ DOM ELEMENTS ============
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');
const submitBtn = document.getElementById('submitBtn');
const sampleNotice = document.getElementById('sampleNotice');

// ============ CHART INSTANCES ============
let pieChart = null;
let barChart = null;

// ============ CATEGORY EMOJI ============
const categoryEmoji = {
    'Food': '🍔',
    'Transport': '🚌',
    'Shopping': '🛒',
    'Entertainment': '🎮',
    'Bills': '💡',
    'Health': '💊',
    'Other': '📦'
};

// ============ CHART COLORS ============
const chartColors = {
    'Food': '#FF6384',
    'Transport': '#36A2EB',
    'Shopping': '#FFCE56',
    'Entertainment': '#4BC0C0',
    'Bills': '#9966FF',
    'Health': '#FF9F40',
    'Other': '#C9CBCF'
};

// ============ FETCH EXPENSES ============
async function fetchExpenses() {
    try {
        expenseList.innerHTML = '<p class="loading">Loading...</p>';
        
        const response = await fetch(`${API_URL}/expenses`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        
        const expenses = await response.json();
        
        // If no real data, use sample data
        const dataToDisplay = expenses.length > 0 ? expenses : SAMPLE_EXPENSES;
        const usingSampleData = expenses.length === 0;
        
        // Show/hide sample data notice
        if (usingSampleData) {
            sampleNotice.classList.remove('hidden');
        } else {
            sampleNotice.classList.add('hidden');
        }
        
        displayExpenses(dataToDisplay, usingSampleData);
        updateTotal(dataToDisplay);
        updateCharts(dataToDisplay);
        
    } catch (error) {
        console.error('Error:', error);
        expenseList.innerHTML = '<p class="empty-state">Failed to load expenses. Using sample data for demo.</p>';
        
        // Show sample data on error
        displayExpenses(SAMPLE_EXPENSES, true);
        updateTotal(SAMPLE_EXPENSES);
        updateCharts(SAMPLE_EXPENSES);
        sampleNotice.classList.remove('hidden');
    }
}

// ============ DISPLAY EXPENSES ============
function displayExpenses(expenses, isSample = false) {
    if (expenses.length === 0) {
        expenseList.innerHTML = '<p class="empty-state">No expenses yet. Add one!</p>';
        return;
    }
    
    expenseList.innerHTML = expenses.map((expense) => {
        const isSampleItem = typeof expense.id === 'string' && expense.id.startsWith('sample');
        
        return `
            <div class="expense-item ${isSampleItem ? 'sample-item' : ''}" data-id="${expense.id}">
                <span class="emoji">${categoryEmoji[expense.category] || '📦'}</span>
                <div class="details">
                    <strong>₹${parseFloat(expense.amount).toFixed(2)}</strong>
                    <span>${expense.category}</span>
                    ${expense.title ? `<small>${expense.title}</small>` : ''}
                </div>
                <span class="date">${formatDate(expense.date)}</span>
                ${!isSampleItem ? `<button onclick="deleteExpense(${expense.id})">🗑️</button>` : '<span class="sample-tag">DEMO</span>'}
            </div>
        `;
    }).join('');
}

// ============ UPDATE TOTAL ============
function updateTotal(expenses) {
    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    totalAmount.textContent = `₹${total.toFixed(2)}`;
}

// ============ UPDATE CHARTS ============
function updateCharts(expenses) {
    // Calculate category totals
    const categoryTotals = {};
    
    expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + parseFloat(exp.amount);
    });
    
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const colors = categories.map(cat => chartColors[cat] || '#C9CBCF');
    
    // Update Pie Chart
    updatePieChart(categories, amounts, colors);
    
    // Update Bar Chart
    updateBarChart(categories, amounts, colors);
}

// ============ CREATE/UPDATE PIE CHART ============
function updatePieChart(labels, data, colors) {
    const ctx = document.getElementById('categoryPieChart').getContext('2d');
    
    if (pieChart) {
        pieChart.destroy();
    }
    
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: '#1e2746',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// ============ CREATE/UPDATE BAR CHART ============
function updateBarChart(labels, data, colors) {
    const ctx = document.getElementById('categoryBarChart').getContext('2d');
    
    if (barChart) {
        barChart.destroy();
    }
    
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Spending (₹)',
                data: data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `₹${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#888',
                        callback: function(value) {
                            return '₹' + value;
                        }
                    },
                    grid: {
                        color: '#2d3a5a'
                    }
                },
                x: {
                    ticks: {
                        color: '#888'
                    },
                    grid: {
                        color: '#2d3a5a'
                    }
                }
            }
        }
    });
}

// ============ FORMAT DATE ============
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short' 
    });
}

// ============ ADD EXPENSE ============
async function addExpense(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    
    if (!title || !amount || !category) {
        alert('Please fill all fields');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding...';
    
    try {
        const response = await fetch(`${API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                title, 
                amount: parseFloat(amount), 
                category 
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to add expense');
        }
        
        expenseForm.reset();
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

function downloadCSV() {
    // Get current expenses (real or sample)
    fetch(`${API_URL}/expenses`)
        .then(response => response.json())
        .then(expenses => {
            if (expenses.length === 0) {
                expenses = SAMPLE_EXPENSES;
            }
            
            // Create CSV content
            let csv = 'ID,Title,Amount (₹),Category,Date\n';
            
            expenses.forEach(exp => {
                const date = new Date(exp.date).toLocaleString('en-IN');
                csv += `${exp.id},"${exp.title}",${exp.amount},${exp.category},"${date}"\n`;
            });
            
            // Create download link
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            const timestamp = new Date().toISOString().slice(0, 10);
            link.setAttribute('href', url);
            link.setAttribute('download', `spendwise_expenses_${timestamp}.csv`);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log('✅ CSV downloaded successfully');
        })
        .catch(error => {
            console.error('Error generating CSV:', error);
            alert('Failed to generate CSV. Please try again.');
        });
}

/**
 * Show analytics report in modal
 */
async function showAnalyticsReport() {
    try {
        const response = await fetch(`${API_URL}/expenses`);
        let expenses = [];
        
        if (response.ok) {
            expenses = await response.json();
        }
        
        if (expenses.length === 0) {
            expenses = SAMPLE_EXPENSES;
        }
        
        // Generate report HTML
        const reportHTML = generateReportHTML(expenses);
        
        // Display report
        const reportDisplay = document.getElementById('reportDisplay');
        const reportContent = document.getElementById('reportContent');
        
        reportContent.innerHTML = reportHTML;
        reportDisplay.classList.remove('hidden');
        
        // Scroll to report
        reportDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    } catch (error) {
        console.error('Error generating report:', error);
        alert('Failed to generate report. Please try again.');
    }
}

/**
 * Generate HTML for analytics report
 */
function generateReportHTML(expenses) {
    // Calculate statistics
    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const count = expenses.length;
    const average = total / count;
    const highest = Math.max(...expenses.map(e => parseFloat(e.amount)));
    const lowest = Math.min(...expenses.map(e => parseFloat(e.amount)));
    
    // Category breakdown
    const categoryData = {};
    expenses.forEach(exp => {
        if (!categoryData[exp.category]) {
            categoryData[exp.category] = {
                total: 0,
                count: 0,
                items: []
            };
        }
        categoryData[exp.category].total += parseFloat(exp.amount);
        categoryData[exp.category].count += 1;
        categoryData[exp.category].items.push(exp.title);
    });
    
    // Sort categories by total
    const sortedCategories = Object.entries(categoryData)
        .sort((a, b) => b[1].total - a[1].total);
    
    // Generate HTML
    let html = `
        <div class="report-overview">
            <h4>💰 Overview Statistics</h4>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                <div class="report-stat">
                    <div class="stat-label">Total Spending</div>
                    <div class="stat-value">₹${total.toFixed(2)}</div>
                </div>
                
                <div class="report-stat">
                    <div class="stat-label">Total Transactions</div>
                    <div class="stat-value">${count}</div>
                </div>
                
                <div class="report-stat">
                    <div class="stat-label">Average Expense</div>
                    <div class="stat-value">₹${average.toFixed(2)}</div>
                </div>
                
                <div class="report-stat">
                    <div class="stat-label">Highest Expense</div>
                    <div class="stat-value">₹${highest.toFixed(2)}</div>
                </div>
                
                <div class="report-stat">
                    <div class="stat-label">Lowest Expense</div>
                    <div class="stat-value">₹${lowest.toFixed(2)}</div>
                </div>
            </div>
        </div>
        
        <div class="category-breakdown">
            <h4 style="margin-top: 30px; margin-bottom: 15px; color: #667eea;">📊 Category Breakdown</h4>
    `;
    
    sortedCategories.forEach(([category, data]) => {
        const percentage = ((data.total / total) * 100).toFixed(1);
        const avgPerItem = (data.total / data.count).toFixed(2);
        
        html += `
            <div class="category-item">
                <div>
                    <div class="category-name">${categoryEmoji[category] || '📦'} ${category}</div>
                    <div class="category-meta">${data.count} transactions • Avg: ₹${avgPerItem}</div>
                </div>
                <div class="category-stats">
                    <div class="category-amount">₹${data.total.toFixed(2)}</div>
                    <div class="category-meta">${percentage}%</div>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        
        <div class="report-timestamp">
            Generated on ${new Date().toLocaleString('en-IN', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
            })}
        </div>
    `;
    
    return html;
}

/**
 * Close analytics report
 */
function closeReport() {
    const reportDisplay = document.getElementById('reportDisplay');
    reportDisplay.classList.add('hidden');
}

// Close report when clicking outside
document.addEventListener('click', (e) => {
    const reportDisplay = document.getElementById('reportDisplay');
    if (e.target === reportDisplay) {
        closeReport();
    }
});