🛒 E-Commerce Web App (React + Flask)

A full-stack e-commerce demo application built as part of my software engineering portfolio.
The project includes a React frontend (Vite + Styled Components), a Flask backend (with sessions, authentication, and cart/checkout logic), Postgres on Railway, and frontend hosting on Vercel.

This reflects real-world patterns like session-based auth, protected routes, admin-only functionality, API organisation with blueprints, and a clean component-driven UI.

🚀 Live Demo

Frontend (Vercel): https://ecommerce-app-omega-ruby.vercel.app

Backend (Railway): https://ecommerce-app-production-323f.up.railway.app

⚠️ Note for Chrome users:
Free hosting occasionally causes session cookie issues after cold starts. Firefox works consistently.
I’ve left notes in the README to explain the setup choices and areas to improve if I revisit the project.

📦 Features
👤 User Accounts

Register, log in, and log out (session-based authentication)

Persistent login using secure cookies

Profile page with account details

🛒 Shopping & Cart

Browse products (public)

View product details

Add items to cart (requires login)

Update quantities, remove items

Cart item badge in navbar

Full checkout flow (demo)

📦 Orders

View past orders

Order detail pages

Order complete confirmation screen

🛠 Admin Panel

Admin dashboard

Manage all products (list, add, edit)

Manage all orders

Update order statuses (pending → completed etc.)

🔒 Security

Server-side Flask-Login sessions (not JWT)

Protected + admin-only React routes

CORS locked to the frontend domain

Secure session cookie settings for deployment

🎨 Frontend Styling

Styled Components for theme + responsiveness

Light/Dark mode with persistence

Reusable UI components (buttons, grid, cards, sections)

🧪 Testing

Backend tests (pytest + coverage):

Authentication routes

Cart behaviour

Order creation and totals

Product endpoints

User model

Frontend tests (Vitest + React Testing Library):

Navbar badge behaviour

Protected route behaviour

Login/Register form logic

📁 Project Structure
root/
  venv/
  backend/
    app/
      routes/
      utils/
      models.py
      __init__.py
      config.py
    migrations/
    tests/
    requirements.txt
    Procfile
  frontend/
    src/
      pages/
      components/
      theme/
      lib/api.js
      App.jsx
    public/
      products/ (product images)
    vite.config.js
    vercel.json

🌐 Deployment Setup
Backend (Railway)

Gunicorn entrypoint using Flask factory pattern:
web: gunicorn "app:create_app()"

Postgres database (Railway managed)

Session cookies configured for cross-site secure use:

SESSION_COOKIE_SECURE=True

SESSION_COOKIE_HTTPONLY=True

SESSION_COOKIE_SAMESITE='None'

CORS locked to Vercel domain

Alembic migrations + seeding script for products

Frontend (Vercel)

VITE_API_URL set to the Railway backend

Refresh-safe routing via index.html fallback

All fetches routed through a helper (api())

Credentials included only when needed

💡 Next.js-style Redirect Handling

When a user tries to access a protected route:

They’re redirected to Login with ?next=/previous-page

After logging in, they are taken back automatically
(used for cart → login → cart flow)

🚦 Lighthouse Scores

These scores fluctuate due to free hosting (cold starts), but generally fall into:

Metric	Score (Typical)
Performance	75–90
Accessibility	95–100
Best Practices	95–100
SEO	95–100
<details> <summary>Click to show Lighthouse screenshots (optional)</summary>

Add screenshots here later

</details>
🧭 Improvements & Next Steps

This is a demo app, so I intentionally kept the scope reasonable.
These are areas I’d improve in a production build:

Add a dedicated image hosting solution

Fix Chrome session behaviour with a custom cookie backend

Add pagination, search, filtering

Add inventory management rules (stock updates)

Add better mobile optimisation

Expand frontend test coverage (pages and edge cases)

Add a staging environment

Add admin analytics dashboard

Add Stripe test checkout

🛠 Tech Stack
Frontend

React (Vite)

React Router

Styled Components

Vitest + React Testing Library

Vercel deployment

Backend

Python / Flask

Flask-Login

Flask-Migrate (Alembic)

Flask-CORS

SQLAlchemy

PostgreSQL (Railway)

Gunicorn

📦 Installation (Local Development)
Backend
cd backend
pip install -r requirements.txt
flask run

Frontend
cd frontend
npm install
npm run dev


Set your .env files:

frontend/.env

VITE_API_URL=http://localhost:5000


backend/.env

SECRET_KEY=dev
SQLALCHEMY_DATABASE_URI=sqlite:///ecommerce.db

✔ Final Notes

This project was built to show:

My ability to structure a full-stack application

Real authentication and session-based state

Clean UI + reusable components

REST API design

Database schemas, migrations, seeding

Debugging cross-origin, cookie, and hosting issues

Test-driven thinking on both frontend and backend

It’s completed to a standard I’m happy to include in my portfolio, and I’ll continue refining it alongside future projects.
