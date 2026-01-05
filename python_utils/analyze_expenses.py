"""
SpendWise Analytics Engine
Advanced statistical analysis of spending patterns
"""

import sqlite3
import json
from datetime import datetime, timedelta
from collections import defaultdict

DB_PATH = '../backend/expenses.db'

class ExpenseAnalyzer:
    def __init__(self):
        self.conn = sqlite3.connect(DB_PATH)
        self.cursor = self.conn.cursor()
    
    def get_all_expenses(self):
        """Fetch all expenses from database"""
        self.cursor.execute("SELECT * FROM expenses ORDER BY date DESC")
        columns = [desc[0] for desc in self.cursor.description]
        rows = self.cursor.fetchall()
        
        return [dict(zip(columns, row)) for row in rows]
    
    def calculate_statistics(self):
        """Calculate comprehensive statistics"""
        expenses = self.get_all_expenses()
        
        if not expenses:
            return {"error": "No data available"}
        
        stats = {
            "total_spending": sum(exp['amount'] for exp in expenses),
            "total_transactions": len(expenses),
            "average_expense": sum(exp['amount'] for exp in expenses) / len(expenses),
            "highest_expense": max(exp['amount'] for exp in expenses),
            "lowest_expense": min(exp['amount'] for exp in expenses),
            "categories": self.category_analysis(expenses),
            "trends": self.spending_trends(expenses),
            "generated_at": datetime.now().isoformat()
        }
        
        return stats
    
    def category_analysis(self, expenses):
        """Analyze spending by category"""
        category_data = defaultdict(lambda: {"count": 0, "total": 0, "items": []})
        
        for exp in expenses:
            cat = exp['category']
            category_data[cat]['count'] += 1
            category_data[cat]['total'] += exp['amount']
            category_data[cat]['items'].append(exp['title'])
        
        # Calculate percentages
        total = sum(exp['amount'] for exp in expenses)
        
        result = {}
        for cat, data in category_data.items():
            result[cat] = {
                "count": data['count'],
                "total": round(data['total'], 2),
                "average": round(data['total'] / data['count'], 2),
                "percentage": round((data['total'] / total * 100), 2),
                "sample_items": data['items'][:3]  # Show first 3 items
            }
        
        return dict(sorted(result.items(), key=lambda x: x[1]['total'], reverse=True))
    
    def spending_trends(self, expenses):
        """Analyze spending trends over time"""
        # Group by date
        daily_spending = defaultdict(float)
        
        for exp in expenses:
            date = exp['date'].split('T')[0]  # Get date part only
            daily_spending[date] += exp['amount']
        
        # Find highest and lowest spending days
        sorted_days = sorted(daily_spending.items(), key=lambda x: x[1], reverse=True)
        
        return {
            "highest_spending_day": {
                "date": sorted_days[0][0] if sorted_days else None,
                "amount": sorted_days[0][1] if sorted_days else 0
            },
            "lowest_spending_day": {
                "date": sorted_days[-1][0] if sorted_days else None,
                "amount": sorted_days[-1][1] if sorted_days else 0
            },
            "days_tracked": len(daily_spending)
        }
    
    def export_json_report(self):
        """Export detailed JSON report"""
        stats = self.calculate_statistics()
        
        filename = f'expense_report_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(stats, f, indent=2, ensure_ascii=False)
        
        print(f"✅ JSON report saved: {filename}")
        return stats
    
    def print_summary(self):
        """Print formatted summary to console"""
        stats = self.calculate_statistics()
        
        if "error" in stats:
            print("❌", stats["error"])
            return
        
        print("\n" + "="*60)
        print("📊 SPENDWISE ANALYTICS REPORT")
        print("="*60)
        
        print(f"\n💰 OVERALL STATISTICS")
        print(f"   Total Spending:      ₹{stats['total_spending']:,.2f}")
        print(f"   Total Transactions:  {stats['total_transactions']}")
        print(f"   Average Expense:     ₹{stats['average_expense']:,.2f}")
        print(f"   Highest Expense:     ₹{stats['highest_expense']:,.2f}")
        print(f"   Lowest Expense:      ₹{stats['lowest_expense']:,.2f}")
        
        print(f"\n📈 CATEGORY BREAKDOWN")
        print("-" * 60)
        for cat, data in stats['categories'].items():
            print(f"\n   {cat}:")
            print(f"      Total:      ₹{data['total']:,.2f} ({data['percentage']}%)")
            print(f"      Count:      {data['count']} transactions")
            print(f"      Average:    ₹{data['average']:,.2f}")
            print(f"      Examples:   {', '.join(data['sample_items'][:2])}")
        
        print(f"\n📅 SPENDING TRENDS")
        print("-" * 60)
        trends = stats['trends']
        print(f"   Days Tracked:           {trends['days_tracked']}")
        print(f"   Highest Spending Day:   {trends['highest_spending_day']['date']} (₹{trends['highest_spending_day']['amount']:,.2f})")
        print(f"   Lowest Spending Day:    {trends['lowest_spending_day']['date']} (₹{trends['lowest_spending_day']['amount']:,.2f})")
        
        print("\n" + "="*60)
        print(f"Report generated at: {stats['generated_at']}")
        print("="*60 + "\n")
    
    def close(self):
        """Close database connection"""
        self.conn.close()

def main():
    print("🚀 SpendWise Analytics Engine\n")
    
    analyzer = ExpenseAnalyzer()
    
    # Print summary to console
    analyzer.print_summary()
    
    # Export JSON report
    analyzer.export_json_report()
    
    analyzer.close()

if __name__ == "__main__":
    main()