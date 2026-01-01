# Yes! README.md Will Show on GitHub! 🎯

When you commit `README.md` to your repo, it automatically displays on your GitHub repository page!

---

## How It Works:

```
Your Repo Structure:
SpendWise/
├── frontend/
├── backend/
└── README.md    ← This file shows on GitHub homepage!
```

When someone visits:
```
https://github.com/HarshitPandey-2021/SpendWise
```

They see your README.md content **right below the file list**! 

---

## Professional README Template for SpendWise

Copy this into your `README.md`:

```markdown
# 💰 SpendWise - Personal Expense Tracker

A full-stack web application for tracking daily expenses with a clean, modern interface.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://spenwisee.netlify.app/)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/HarshitPandey-2021/SpendWise)

---

## 🚀 Live Demo

- **Frontend:** [https://spenwisee.netlify.app/](https://spenwisee.netlify.app/)
- **Backend API:** [https://spendwise-mvzm.onrender.com/](https://spendwise-mvzm.onrender.com/)

> **Note:** Backend is hosted on Render's free tier and may take 30-60 seconds to wake up on first request.


---

## ✨ Features

- ✅ Add expenses with title, amount, and category
- 📊 View all expenses in an organized list
- 🗑️ Delete expenses with confirmation
- 💰 Real-time total calculation
- 📱 Fully responsive design (mobile & desktop)
- 🌙 Modern dark theme UI
- ⚡ Fast and lightweight

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with modern layouts (Flexbox/Grid)
- **JavaScript (ES6+)** - Client-side logic and API integration

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for REST API
- **SQLite** - Lightweight relational database

### Deployment
- **Netlify** - Frontend hosting with CDN
- **Render.com** - Backend hosting with automatic deployments

### Tools
- **Git & GitHub** - Version control
- **Postman** - API testing
- **VS Code** - Development environment

---

## 📁 Project Structure

```
SpendWise/
├── frontend/
│   ├── index.html          # Main HTML structure
│   ├── style.css           # Styling and responsive design
│   └── script.js           # Client-side logic and API calls
├── backend/
│   ├── index.js            # Express server and API routes
│   ├── database.js         # SQLite database configuration
│   ├── package.json        # Dependencies and scripts
│   └── expenses.db         # SQLite database (auto-generated)
├── .gitignore              # Ignored files (node_modules, .db)
└── README.md               # Project documentation
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/` | Health check | - | `{ "message": "API running" }` |
| GET | `/api/expenses` | Get all expenses | - | Array of expense objects |
| POST | `/api/expenses` | Add new expense | `{ title, amount, category }` | Created expense object |
| DELETE | `/api/expenses/:id` | Delete expense | - | `{ "message": "Deleted" }` |
| GET | `/api/stats` | Get category totals | - | Array of category aggregations |

### Example API Request

```javascript
// Add new expense
fetch('https://spendwise-mvzm.onrender.com/api/expenses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Lunch',
    amount: 150,
    category: 'Food'
  })
})
```

---

## 🏃 Run Locally

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start server
node index.js
```

Server will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Option 1: Open directly
# Just open index.html in your browser

# Option 2: Use Live Server (recommended)
# Install Live Server extension in VS Code
# Right-click index.html → "Open with Live Server"

# Option 3: Use Python's built-in server
python -m http.server 3000
```

Frontend will run on `http://localhost:3000` (or `http://localhost:5500` with Live Server)

---

## 🌐 Deployment

### Deploy Frontend (Netlify)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `frontend` folder
3. Your site is live!

### Deploy Backend (Render)

1. Go to [render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repository
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Deploy!

---

## 🧠 What I Learned

### Technical Skills
- Building REST APIs with Express.js
- Database design and SQL queries
- Asynchronous JavaScript (async/await, Promises)
- DOM manipulation and event handling
- CORS configuration for cross-origin requests
- Deployment and DevOps basics

### Problem-Solving
- Debugging CORS errors
- Managing asynchronous API calls
- Handling edge cases and error states
- Understanding client-server architecture

### Best Practices
- Writing clean, readable code
- Parameterized SQL queries (SQL injection prevention)
- Input validation on both client and server
- Proper error handling and user feedback
- Version control with Git

---

## 🐛 Known Issues & Limitations

- **Data Persistence:** Database resets on Render server restart (ephemeral storage on free tier)
- **First Load Delay:** Backend may take 30-60s to wake up from sleep on Render free tier
- **No Authentication:** Single-user application without login system
- **No Data Visualization:** Currently displays data in list format only

### Future Improvements
- [ ] Add user authentication
- [ ] Implement data visualization (charts/graphs)
- [ ] Export expenses to CSV/PDF
- [ ] Add expense editing functionality
- [ ] Migrate to PostgreSQL for persistent storage
- [ ] Add date range filtering
- [ ] Implement expense categories customization

---

## 🤝 Contributing

This is a learning project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Harshit Pandey**

- 🎓 B.Tech Computer Science (AI) - University of Lucknow
- 💼 [LinkedIn](https://linkedin.com/in/harshit-pandey-236830247)
- 🐙 [GitHub](https://github.com/HarshitPandey-2021)
- 📧 [Email](mailto:pandey6051172@gmail.com)

---

## 🙏 Acknowledgments

- Built as a learning project to understand full-stack web development
- Inspired by the need for simple expense tracking solutions
- Thanks to the open-source community for documentation and resources

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/HarshitPandey-2021/SpendWise)
![GitHub stars](https://img.shields.io/github/stars/HarshitPandey-2021/SpendWise?style=social)
![GitHub forks](https://img.shields.io/github/forks/HarshitPandey-2021/SpendWise?style=social)

---

**⭐ If you found this project helpful, please consider giving it a star!**
```


### Add Badges (Optional but Looks Professional)

At the top of README, you can add:

```markdown
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
```

These create colored badges like:

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
