"""
SpendWise Visualization Generator
Creates PNG charts for presentation/reports
"""

import sqlite3
import matplotlib.pyplot as plt
from datetime import datetime
import os

DB_PATH = '../backend/expenses.db'

class ExpenseVisualizer:
    def __init__(self):
        self.conn = sqlite3.connect(DB_PATH)
        self.cursor = self.conn.cursor()
        
        # Set style
        plt.style.use('dark_background')
    
    def get_category_data(self):
        """Get spending by category"""
        self.cursor.execute("""
            SELECT category, SUM(amount) as total
            FROM expenses
            GROUP BY category
            ORDER BY total DESC
        """)
        
        data = self.cursor.fetchall()
        
        if not data:
            return [], []
        
        categories = [row[0] for row in data]
        amounts = [row[1] for row in data]
        
        return categories, amounts
    
    def create_pie_chart(self):
        """Generate pie chart"""
        categories, amounts = self.get_category_data()
        
        if not categories:
            print("⚠️ No data to visualize")
            return
        
        colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        
        plt.figure(figsize=(10, 7))
        plt.pie(amounts, labels=categories, autopct='%1.1f%%', 
                colors=colors, startangle=90)
        plt.title('Expense Distribution by Category', fontsize=16, pad=20)
        
        filename = f'expense_pie_chart_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png'
        plt.savefig(filename, dpi=300, bbox_inches='tight', facecolor='#1a1a2e')
        plt.close()
        
        print(f"✅ Pie chart saved: {filename}")
        return filename
    
    def create_bar_chart(self):
        """Generate bar chart"""
        categories, amounts = self.get_category_data()
        
        if not categories:
            return
        
        colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a']
        
        plt.figure(figsize=(12, 7))
        bars = plt.bar(categories, amounts, color=colors[:len(categories)])
        
        plt.title('Spending by Category', fontsize=16, pad=20)
        plt.xlabel('Category', fontsize=12)
        plt.ylabel('Amount (₹)', fontsize=12)
        plt.xticks(rotation=45, ha='right')
        
        # Add value labels on bars
        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2., height,
                    f'₹{height:,.0f}',
                    ha='center', va='bottom', fontsize=10)
        
        plt.grid(axis='y', alpha=0.3)
        plt.tight_layout()
        
        filename = f'expense_bar_chart_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png'
        plt.savefig(filename, dpi=300, bbox_inches='tight', facecolor='#1a1a2e')
        plt.close()
        
        print(f"✅ Bar chart saved: {filename}")
        return filename
    
    def create_spending_timeline(self):
        """Generate timeline of daily spending"""
        self.cursor.execute("""
            SELECT DATE(date) as day, SUM(amount) as total
            FROM expenses
            GROUP BY day
            ORDER BY day
        """)
        
        data = self.cursor.fetchall()
        
        if len(data) < 2:
            print("⚠️ Need more data for timeline")
            return
        
        days = [row[0] for row in data]
        amounts = [row[1] for row in data]
        
        plt.figure(figsize=(14, 6))
        plt.plot(days, amounts, marker='o', linewidth=2, markersize=8, color='#667eea')
        plt.fill_between(range(len(days)), amounts, alpha=0.3, color='#764ba2')
        
        plt.title('Daily Spending Trend', fontsize=16, pad=20)
        plt.xlabel('Date', fontsize=12)
        plt.ylabel('Amount (₹)', fontsize=12)
        plt.xticks(rotation=45, ha='right')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        filename = f'expense_timeline_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png'
        plt.savefig(filename, dpi=300, bbox_inches='tight', facecolor='#1a1a2e')
        plt.close()
        
        print(f"✅ Timeline chart saved: {filename}")
        return filename
    
    def generate_all(self):
        """Generate all visualizations"""
        print("\n📊 Generating visualizations...\n")
        
        self.create_pie_chart()
        self.create_bar_chart()
        self.create_spending_timeline()
        
        print("\n✅ All visualizations generated!\n")
    
    def close(self):
        self.conn.close()

def main():
    print("🎨 SpendWise Visualization Generator\n")
    
    visualizer = ExpenseVisualizer()
    visualizer.generate_all()
    visualizer.close()

if __name__ == "__main__":
    main()