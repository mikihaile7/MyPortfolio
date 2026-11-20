# Mikias Haile – Full-Stack MERN Portfolio (COMP229 Assignment 3)

React (Vite) frontend + Express/MongoDB backend with JWT authentication and role-based CRUD.

## Features
- **Sign Up / Sign In / Sign Out** (JWT). Auth state is shared app-wide with React Context (`client/src/auth/AuthContext.jsx`).
- **Roles:** `user` (default on sign-up, read-only) and `admin` (seeded in MongoDB with `npm run seed`).
- **Admin CRUD** from the UI for **Projects**, **Education/Qualifications**, and **Contact messages** (`/messages`, admin only).
- **Contact form** saves to MongoDB (`POST /api/contacts`).
- Protected API routes: `requireSignin` (valid JWT) + `isAdmin` (role checked in the database).

## API
| Method | URL | Access |
|---|---|---|
| POST | `/auth/signin` | public |
| GET | `/auth/signout` | public |
| POST | `/api/users` | public (sign up, always role `user`) |
| GET | `/api/users` | admin |
| GET/PUT/DELETE | `/api/users/:userId` | signed in (owner or admin for PUT/DELETE) |
| GET | `/api/projects`, `/api/projects/:id` | public |
| POST / PUT / DELETE | `/api/projects[/:id]` | admin |
| GET | `/api/qualifications`, `/api/qualifications/:id` | public |
| POST / PUT / DELETE | `/api/qualifications[/:id]` | admin |
| POST | `/api/contacts` | public (contact form) |
| GET / PUT / DELETE | `/api/contacts[/:id]` | admin |

## Run locally
```bash
npm install && npm --prefix client install
cp .env.example .env      # then fill in your MongoDB Atlas URI, JWT secret, admin credentials
npm run seed              # creates the admin user + starter projects/education
npm run dev               # API on :3000, React on http://localhost:5173
```

## Deploy (Vercel)
`vercel.json` serves the React build and routes `/api/*` and `/auth/*` to `server.js`.
In Vercel → Project → Settings → Environment Variables add `MONGODB_URI` and `JWT_SECRET`,
and in MongoDB Atlas → Network Access allow `0.0.0.0/0`.
