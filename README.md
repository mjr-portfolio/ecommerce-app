<h1>E-Commerce Web App (React + Flask)</h1>

A fully-featured full-stack e-commerce demo built for my software engineering portfolio.

This project demonstrates a complete end-to-end e-commerce workflow using a React + Vite frontend, a Flask backend, PostgreSQL on Railway, and Vercel for deployment.
It mirrors real-world engineering patterns such as session-based authentication, protected/admin routes, reusable UI components, migrations, and clean separation between frontend and backend layers.

<h2>🌍 Live Demo</h2>

Frontend (Vercel):
https://ecommerce-app-omega-ruby.vercel.app

Backend (Railway):
https://ecommerce-app-production-323f.up.railway.app

    ⚠️ Chrome Note:

    Because Vercel (frontend) and Railway (backend) use different domains,
    Chrome’s latest cross-site cookie rules may prevent session cookies from being restored reliably.
    
    Firefox works perfectly and is recommended.
    More detail is included in the “Known Issues” section.

<h2>✨ Features</h2>

👤 Authentication & Accounts

    Register / Log in / Log out

    Secure session-based auth (Flask-Login + cookies)

    Persistent login across refreshes

    User profile page

    Automatic redirection back to original page after login (?next=/original-page)

🛒 Shopping Experience

    Browse products

    Product detail pages

    Add to cart (redirects unauthenticated users to login, then back)

    Update cart item quantities

    Remove items

    Cart item count badge in navbar

📦 Orders System

    Checkout creates an order

    View order history

    View individual order details

🔐 Admin Panel

    Admin dashboard

    Create/edit/delete products

    Manage orders & order statuses

(Fully separated from normal user routes)

🎨 UX / UI

    Reusable Custom components (Cards, Grids, Buttons, Sections, Inputs, Messages)

    Styled Components theming

    Light / Dark mode with localStorage persistence

    Fully responsive layout (w/ Mobile)

    Clean, consistent spacing & typography

<h2>🧱 Tech Stack</h2>

Frontend

    React (Vite)

    React Router v6

    Styled Components (custom theming system)

    Custom reusable UI components

    API helper wrapper (api())

    Dark/Light mode

    Vercel hosting

Backend

    Flask

    Flask-Login (secure session cookies)

    Flask-Migrate (Alembic)

    SQLAlchemy ORM

    PostgreSQL (Railway)

    CORS configured for Vercel

    Gunicorn production server

DevOps

    GitHub → automatic Railway + Vercel deployments

    SQLite for local dev, Postgres in production

    Product seeding script via Railway shell


<h2>🧪 Testing</h2>

Backend (pytest)

    Authentication logic

    Cart behaviour

    Order creation

    Product endpoints

    Database models

Frontend (Vitest + React Testing Library)

    Navbar behaviour

    Protected Routes

    Login/Register form logic

<h2>📁 Project Structure</h2>

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

<h2>🖼 Screenshots</h2>

Homepage:

<img src="./docs/screenshots/homepage.webp" width="600"/>

Product Detail:

<img src="./docs/screenshots/product_detail.webp" width="600"/>

Cart:

<img src="./docs/screenshots/cart.webp" width="600"/>

Order History:

<img src="./docs/screenshots/orders.webp" width="600"/>

Admin Product Edit:

<img src="./docs/screenshots/admin_edit_product.webp" width="600"/>

Admin Order Status:

<img src="./docs/screenshots/admin_order_status.webp" width="600"/>

<h2>🚀 Deployment Setup</h2>

🔧 Backend (Railway)

    Gunicorn entrypoint:
        gunicorn "app:create_app()"

    Railway PostgreSQL database

    Production session cookies configured for secure cross-site usage:
        SESSION_COOKIE_SECURE=True
        SESSION_COOKIE_HTTPONLY=True
        SESSION_COOKIE_SAMESITE=None

    CORS restricted to Vercel domain

    Alembic migrations
    
    Product seed script run via Railway shell

🎨 Frontend (Vercel)

    VITE_API_URL points to Railway backend URL

    vercel.json ensures SPA routing (“refresh-safe pages”)

    All fetches routed through a custom api() helper

    Credentials included for protected routes only

🔁 Protected Route Redirects

    Unauthenticated users are redirected to:

    /login?next=/previous-page

    After logging in, they return to where they started
    (e.g., Add-to-Cart → Login → Cart).

<h2>🗼 Lighthouse Scores</h2>

| Category       | Score Range |
|----------------|-------------|
| Performance    | 75–90       |
| Accessibility  | 85–100      |
| Best Practices | 95–100      |
| SEO            | 85–95       |

Scores vary slightly due to:

    Free hosting cold starts

    Railway → Vercel cross-domain latency

<h2>🧰 Local Development</h2>

    Backend
      cd backend pip install -r requirements.txt flask run
    
    Frontend
      cd frontend npm install npm run dev

    Environment variables:

    frontend/.env
      VITE_API_URL=http://localhost:5000

    backend/.env
      SECRET_KEY=dev SQLALCHEMY_DATABASE_URI=sqlite:///ecommerce.db

⚠️ Known Issue: Chrome Cross-Site Cookies

Chrome recently restricted third-party cookies, which affects setups where:

    frontend = vercel.app

    backend = railway.app

Because they are different domains, Chrome may block restoring the session cookie, causing:

    /api/auth/me returning 401

    Cart count failing to load

    Session logout on refresh

Firefox handles cross-site cookies correctly, so it is recommended for demos.

This is a hosting/browser limitation — not a code issue.

<h2>🔮 Future Improvements</h2>

    Product search, filtering & pagination

    Dedicated image hosting

    More mobile UI refinements

    More frontend test coverage

    Payment provider integration

    Stock/out-of-stock logic

    Full analytics dashboard for admin

    Switch to single-domain deployment or token auth to fully solve Chrome cookies

    Reduce bundle size & image optimisation

<h2>✔ Final Notes</h2>

This project demonstrates:

    Full-stack architecture (frontend, backend, DB)

    Secure session-based authentication

    Database modelling, migrations, and seeding

    Realistic user & admin workflows

    Production deployments on two platforms

    Clean UI engineering

    Problem-solving around CORS, cookies & hosting constraints

    Modern frontend patterns (reusable components, theming, routing)
