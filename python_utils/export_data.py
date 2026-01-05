"""
SpendWise Data Exporter
Exports expense data from SQLite to CSV and generates summary report
"""

import sqlite3
import csv
from datetime import datetime
import os

# Path to database
DB_PATH = '../backend/expenses.db'

def export_to_csv():
    """Export all expenses to CSV file"""
    
    # Check if database exists
    if not os.path.exists(DB_PATH):
        print("❌ Database not found! Make sure backend has been run at least once.")
        return
    
    # Connect to database
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Fetch all expenses
    cursor.execute("SELECT id, title, amount, category, date FROM expenses ORDER BY date DESC")
    rows = cursor.fetchall()
    
    if len(rows) == 0:
        print("⚠️ No expenses found in database")
        conn.close()
        return
    
    # Export to CSV
    filename = f'expenses_export_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'
    
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        
        # Write header
        writer.writerow(['ID', 'Title', 'Amount (₹)', 'Category', 'Date'])
        
        # Write data
        writer.writerows(rows)
    
    print(f"✅ Successfully exported {len(rows)} expenses to {filename}")
    
    # Generate summary
    generate_summary(cursor)
    
    conn.close()

def generate_summary(cursor):
    """Generate spending summary"""
    
    print("\n📊 SPENDING SUMMARY")
    print("=" * 50)
    
    # Total spending
    cursor.execute("SELECT SUM(amount) FROM expenses")
    total = cursor.fetchone()[0] or 0
    print(f"💰 Total Spending: ₹{total:,.2f}")
    
    # Count
    cursor.execute("SELECT COUNT(*) FROM expenses")
    count = cursor.fetchone()[0]
    print(f"📝 Total Transactions: {count}")
    
    # Average
    if count > 0:
        avg = total / count
        print(f"📊 Average Expense: ₹{avg:,.2f}")
    
    # Category breakdown
    cursor.execute("""
        SELECT category, 
               COUNT(*) as count,
               SUM(amount) as total,
               AVG(amount) as average
        FROM expenses 
        GROUP BY category 
        ORDER BY total DESC
    """)
    
    categories = cursor.fetchall()
    
    if categories:
        print("\n📈 Category Breakdown:")
        print("-" * 50)
        for cat, cnt, tot, avg in categories:
            percentage = (tot / total * 100) if total > 0 else 0
            print(f"{cat:12} | ₹{tot:8,.2f} ({percentage:5.1f}%) | {cnt:3} items | Avg: ₹{avg:6,.2f}")
    
    print("=" * 50)

if __name__ == "__main__":
    print("🚀 SpendWise Data Exporter\n")
    export_to_csv()