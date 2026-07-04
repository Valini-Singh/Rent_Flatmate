# Rent & Flatmate Finder

A full-stack web application that helps property owners list rental rooms and enables tenants to discover suitable rooms based on their preferences. The application includes AI-assisted compatibility scoring, role-based authentication, interest management, and email notifications for important events.

---

## Project Overview

Rent & Flatmate Finder connects owners and tenants through a simple rental platform.

- Owners can create and manage room listings.
- Tenants can create a profile, browse available listings, and express interest.
- Compatibility between a tenant and a listing is calculated using Google's Gemini API with a rule-based fallback mechanism.
- Owners can accept or decline requests, and notifications are sent through email.

---

# Tech Stack

## Frontend

- React
- Vite
- TypeScript
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication

## Database

- PostgreSQL

## AI Integration

- Google Gemini API
- Rule-based compatibility fallback

## Email

- Nodemailer

---

# Project Structure

```
Rent_Flatmate
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── prisma/
│   ├── schema.prisma
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── index.ts
│
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization
  - Owner
  - Tenant
  - Admin

---

## Owner Features

- Register and Login
- Create room listings
- View own listings
- Edit listings
- Delete listings
- Mark listings as filled
- View tenant interest requests
- Accept tenant requests
- Decline tenant requests

---

## Tenant Features

- Register and Login
- Create tenant profile
- Update tenant profile
- Browse available listings
- Send interest requests

---

## Listing Information

Each listing contains:

- Location
- Rent
- Room Type
- Furnished Status
- Available From Date
- Image URL
- Availability Status

---

# AI Compatibility Scoring

When a tenant expresses interest in a listing:

- Listing details and tenant preferences are sent to the Gemini API.
- Gemini returns:
  - Compatibility Score (0–100)
  - Explanation

The result is stored with the interest request.

### Prompt Used

```
Given this room listing:

Location:
Rent:

And this tenant profile:

Preferred Location:
Budget:

Compute a compatibility score from 0 to 100.

Return JSON:

{
  "score": number,
  "explanation": string
}
```

---

## Fallback Logic

If the Gemini API is unavailable, the application automatically switches to a rule-based scoring algorithm.

Rules:

- Base Score = 50
- +30 if preferred location matches
- +20 if listing rent is close to tenant budget

This ensures compatibility scoring is always available.

---

# Interest Management

Tenants can:

- Express interest in listings

Owners can:

- View received interests
- Accept requests
- Decline requests

When an interest is accepted:

- Status is updated
- A chat room record is created
- Email notification is sent to the tenant

---

# Email Notifications

The application sends email notifications for:

- Interest Accepted
- Interest Declined

Support for notifying owners of high compatibility matches is included and can be extended further.

---

# API Endpoints

## Authentication

POST /auth/register

POST /auth/login

---

## Listings

POST /listings

GET /listings

GET /listings/my-listings

PUT /listings/:id

DELETE /listings/:id

PATCH /listings/:id/fill

---

## Tenant

POST /tenant

GET /tenant

---

## Interests

POST /interests

GET /interests

PATCH /interests/:id/accept

PATCH /interests/:id/decline

---

# Database Models

The project uses Prisma ORM with PostgreSQL.

Main models include:

- User
- Listing
- TenantProfile
- Interest
- ChatRoom
- Message

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Rent_Flatmate.git

cd Rent_Flatmate
```

---

## Backend

Install dependencies

```bash
npm install
```

Run server

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file in the backend.

Example:

```env
DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

---

# Testing Flow

1. Register as Owner

2. Login as Owner

3. Create Listing

4. Register as Tenant

5. Login as Tenant

6. Create Tenant Profile

7. Browse Listings

8. Send Interest

9. View Compatibility Score

10. Login as Owner

11. Accept or Decline Interest

12. Verify Email Notification

---

# Deployment

The application can be deployed using:

Frontend

- Vercel

Backend

- Render

Database

- PostgreSQL (Neon, Supabase, Railway or Render PostgreSQL)

---

# Future Improvements

The project can be extended with:

- Fully functional real-time chat using Socket.IO
- Advanced listing filters
- Image uploads using Cloudinary
- Recommendation dashboard
- Admin analytics dashboard
- Push notifications

---

# Notes

- Do not commit `.env`
- Do not commit `node_modules`
- Keep the repository public for evaluation.
- Use the `main` branch for submissions.

---

# Author

**Valini Singh**

Built as part of the **Rent & Flatmate Finder Assignment**.
