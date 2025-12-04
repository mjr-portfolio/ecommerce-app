<h1>E-Commerce Web App (React + Flask)</h1>

A full-stack e-commerce demo application built as part of my software engineering portfolio.
The app includes a React frontend (Vite + Styled Components), a Flask backend with authentication and session cookies, PostgreSQL on Railway, and deployment on Vercel.

This project mirrors real production patterns such as session-based auth, protected/admin routes, API organisation with blueprints, reusable UI components, and a clean frontend architecture.

🌍 Live Demo

Frontend (Vercel):
https://ecommerce-app-omega-ruby.vercel.app

Backend (Railway):
https://ecommerce-app-production-323f.up.railway.app

    ⚠️ Chrome Note:
    
    Use Firefox!
    
    Because of cross-site cookies + free hosting, Chrome tends to fail with persistant sessions.
    Firefox works consistently. The project remains fully functional for portfolio demonstration.

✨ Features

👤 User Accounts

    Register / Log in / Log out

    Secure session-based authentication

    Persistent login across refresh

    User profile page

🛒 Shopping & Cart

    Browse products

    Product detail pages

    Add/update/remove cart items

    Cart quantity badge in navbar

📦 Orders

    Create orders via checkout

    View order history

    Order detail pages

🔐 Admin Panel

    Admin dashboard

    Create/edit/delete products

    Manage orders & statuses

🎨 UI / UX

    Styled Components theming

    Light/dark mode

    Reusable cards, buttons, grids, sections

    Mobile-responsive layout

🧪 Testing
Backend Tests (pytest)

    Authentication logic

    Cart behaviour

    Order creation

    Product endpoints

    Database models

Frontend Tests (Vitest + React Testing Library)

    Navbar badge behaviour

    Protected route behaviour

    Login/Register form logic

📁 Project Structure

<pre>
ecommerce-app/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── models.py
│   │   ├── routes/
│   │   ├── utils/
│   ├── migrations/
│   ├── tests/
│   ├── requirements.txt
│   ├── Procfile
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── pages/
    │   ├── components/
    │   ├── theme/
    │   ├── hook/
    │   │   └── useIsMobile.js
    │   ├── lib/
    │   │   └── api.js
    ├── public/products/
    ├── tests/
    ├── vite.config.js
    ├── vercel.json
</pre>

🚀 Deployment Setup
🔧 Backend (Railway)

    Gunicorn entrypoint:

    web: gunicorn "app:create_app()"

    Railway PostgreSQL database

    Session cookies configured for secure cross-site usage:

    SESSION_COOKIE_SECURE=True SESSION_COOKIE_HTTPONLY=True SESSION_COOKIE_SAMESITE=None

    CORS restricted to Vercel domain

    Alembic migrations + product seeding

🎨 Frontend (Vercel)

    VITE_API_URL points to Railway backend

    SPA routing fixed via vercel.json → index.html fallback

    All fetches routed through a helper (api())

    Credentials included only when needed

🔁 Redirect Handling (Next.js-style)

When accessing a protected route:

    User is redirected to:
    /login?next=/previous-page

    After login, they are returned to the page they came from
    (e.g., Cart → Login → Cart)

Lighthouse Scores

| Category       | Score Range |
|----------------|-------------|
| Performance    | 75–90       |
| Accessibility  | 85–100      |
| Best Practices | 95–100      |
| SEO            | 85–95       |

🛠 Tech Stack

Frontend

    React (Vite)

    React Router

    Styled Components

    Vitest + RTL

    Vercel

Backend

    Flask

    Flask-Login

    Flask-Migrate (Alembic)

    SQLAlchemy

    PostgreSQL (Railway)

    Gunicorn

🧰 Local Development

    Backend
      cd backend pip install -r requirements.txt flask run
    
    Frontend
      cd frontend npm install npm run dev

    Environment variables:

    frontend/.env
      VITE_API_URL=http://localhost:5000

    backend/.env
      SECRET_KEY=dev SQLALCHEMY_DATABASE_URI=sqlite:///ecommerce.db

🔮 Future Improvements

    Search, filtering & pagination

    Stripe test checkout

    Dedicated image hosting

    Improved mobile UI

    More frontend tests

    Admin analytics dashboard

✔ Final Notes

This project demonstrates:

    Full-stack development

    Auth, sessions, cookies

    Database modelling, migrations & seeding

    Realistic admin/user flows

    Deployment debugging (CORS, cookies, proxies)

    Clean UI patterns

    Building and shipping a complete application

