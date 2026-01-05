# 💰 SpendWise - Full-Stack Expense Tracker

A comprehensive expense management application with real-time analytics, interactive visualizations, and multi-language data processing.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://spenwisee.netlify.app/)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/HarshitPandey-2021/SpendWise)

---

## 🚀 Live Demo

- **Frontend:** [https://spenwisee.netlify.app/](https://spenwisee.netlify.app/)
- **Backend API:** [https://spendwise-mvzm.onrender.com/](https://spendwise-mvzm.onrender.com/)

> ⚠️ **Note:** Backend hosted on Render's free tier. First load may take 30-60s. App auto-wakes server and displays sample data during this time.

---

## ✨ Features

- ✅ **Smart Expense Management** - Add, view, delete expenses with real-time updates
- 💰 **Live Calculations** - Instant total across all categories
- 📊 **Interactive Charts** - Pie & bar visualizations using Chart.js
- 📥 **CSV Export** - One-click download of expense data
- 📄 **Analytics Reports** - Comprehensive in-app statistics
- 🎯 **Demo Mode** - Sample data for first-time visitors
- 📱 **Responsive Design** - Works on mobile, tablet, desktop
- 🐍 **Python Analytics** - Offline data analysis suite

---

## 🛠️ Tech Stack

**Frontend:** HTML5, CSS3, JavaScript (ES6+), Chart.js  
**Backend:** Node.js, Express.js, SQLite  
**Analytics:** Python, Pandas, Matplotlib  
**Deployment:** Netlify (frontend), Render (backend)

---

## 📁 Project Structure

SpendWise/  
├── frontend/  
│   ├── index.html  
│   ├── style.css  
│   └── script.js  
├── backend/  
│   ├── index.js  
│   ├── database.js  
│   └── package.json  
├── python_utils/  
│   ├── export_data.py  
│   ├── analyze_expenses.py  
│   └── visualize.py  
└── README.md

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add new expense |
| DELETE | `/api/expenses/:id` | Delete expense |
| GET | `/api/stats` | Category totals |

**Example:**
```javascript
fetch('https://spendwise-mvzm.onrender.com/api/expenses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Lunch', amount: 150, category: 'Food' })
})
---

## 🏃 Run Locally

### Backend
```bash
cd backend
npm install
node index.js
# Runs at http://localhost:5000
```

### Frontend
```bash
cd frontend
# Option 1: Open index.html in browser
# Option 2: Use Live Server extension in VS Code
# Option 3: python -m http.server 3000
```

### Python Analytics (Optional)
```bash
cd python_utils
pip install -r requirements.txt
python export_data.py      # CSV export
python analyze_expenses.py # Analytics
python visualize.py        # PNG charts
```

---

## 🌐 Deployment

**Frontend (Netlify):**
1. Drag `frontend` folder to [netlify.com](https://netlify.com)
2. Site goes live instantly

**Backend (Render):**
1. New Web Service on [render.com](https://render.com)
2. Settings: `Root: backend`, `Build: npm install`, `Start: node index.js`
3. Update `API_URL` in `frontend/script.js` with Render URL

---

## 📊 Features Breakdown

### Web Analytics
- **Real-time Charts:** Pie (proportions) & Bar (comparisons)
- **CSV Export:** Browser-based, no server needed
- **Analytics Modal:** Stats, breakdowns, trends

### Python Suite
- **export_data.py:** CSV + summary statistics
- **analyze_expenses.py:** JSON reports, trend analysis
- **visualize.py:** PNG charts (Matplotlib)

---

## 🧠 What I Learned

- Full-stack architecture (frontend ↔ API ↔ database)
- RESTful API design with Express.js
- Asynchronous JavaScript (async/await, Fetch API)
- Data visualization with Chart.js
- SQL queries and parameterization
- Multi-language integration (JS ↔ Python)
- Deployment and DevOps (Netlify, Render)
- CORS handling, error management
- UX optimizations (auto-wake, sample data)

---

## 🐛 Known Issues

| Issue | Workaround |
|-------|------------|
| Data resets on server restart | Render free tier uses ephemeral storage |
| 30-60s first load | Auto-wake + sample data display |
| No user authentication | Single-user design (for now) |

**Production upgrades:** PostgreSQL, JWT auth, paid hosting, caching

---

## 🤝 Contributing

Contributions welcome! Fork → Branch → PR

**Ideas:** User auth, expense editing, budget limits, date filtering, PDF export

---

## 👨‍💻 Author

**Harshit Pandey**  
B.Tech CS (AI) - University of Lucknow

- [LinkedIn](https://linkedin.com/in/harshit-pandey-236830247)
- [GitHub](https://github.com/HarshitPandey-2021)
- [Email](mailto:pandey6051172@gmail.com)

---

## 📊 Stats

![GitHub repo size](https://img.shields.io/github/repo-size/HarshitPandey-2021/SpendWise)
![GitHub last commit](https://img.shields.io/github/last-commit/HarshitPandey-2021/SpendWise)
![GitHub stars](https://img.shields.io/github/stars/HarshitPandey-2021/SpendWise?style=social)

---

⭐ **Star this repo if you found it helpful!**
