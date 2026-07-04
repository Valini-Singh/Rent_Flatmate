📘 Rent_Flatmate (Full Stack Project)

An AI-powered rental matching platform where owners post listings and tenants find rooms based on compatibility scoring (AI + fallback logic).

🌐 Project Structure (Your Repo)
Rent_Flatmate/
│
├── frontend/              # React + Vite (Tenant + Owner UI)
├── src/                   # Backend (Express + TypeScript)
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│
├── prisma/                # Database schema
├── package.json           # Backend dependencies
├── tsconfig.json
├── .gitignore
├── README.md
🚀 Features
🏠 Owner Features
Register/Login (JWT Auth)
Create listings (location, rent, room type, furnishing, availability)
View tenant interest requests
Accept / Decline interest
Mark listing as filled
🧑 Tenant Features
Register/Login
Create tenant profile (location, budget, move-in date)
Browse listings
Send interest requests
View compatibility score (AI + fallback)
🤖 AI Compatibility System

Each tenant–listing pair is scored from 0–100 based on:

Location match
Budget compatibility
AI-generated reasoning (Gemini API)
Fallback rule-based scoring if AI fails
🧠 AI Prompt Used
Given this room listing and tenant profile, compute a compatibility score from 0 to 100 based on budget and location match.

Return JSON:
{ "score": number, "explanation": string }
🔁 Fallback Logic (Important)

If AI fails:

Base score = 50
+30 if location matches
+20 if budget is close
⚙️ Tech Stack
Frontend
React (Vite)
TypeScript
Axios
React Router DOM
Backend
Node.js
Express.js
TypeScript
Prisma ORM
JWT Authentication
Database
PostgreSQL (via Prisma)
📡 API Routes
Auth
POST /auth/register
POST /auth/login
Listings
POST /listings
GET /listings
GET /listings/my-listings
PUT /listings/:id
DELETE /listings/:id
Tenant
POST /tenant
GET /tenant
Interest
POST /interests
GET /interests
PATCH /interests/:id/accept
PATCH /interests/:id/decline
🔌 Backend Features
Role-based authentication (OWNER / TENANT / ADMIN)
Prisma ORM database integration
Interest workflow system
AI scoring engine integration
Email notification hooks (optional configured)
Chat room creation after acceptance
💬 Real-Time Chat (Ready Structure)
Chat room created when interest is accepted
Message persistence in database
WebSocket-ready backend architecture
📧 Notifications

System supports:

Email on interest acceptance
Email on interest rejection
Optional email on high compatibility score (>80)
🧠 Database Models (Prisma)
User
Listing
TenantProfile
Interest
ChatRoom
Message
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/Rent_Flatmate.git
cd Rent_Flatmate
2️⃣ Install Backend Dependencies
npm install
3️⃣ Run Backend
npm run dev
4️⃣ Run Frontend
cd frontend
npm install
npm run dev
🔐 Environment Variables

Create .env in backend:

DATABASE_URL=your_database_url
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
🧪 How to Test Project
Register Owner
Create Listing
Register Tenant
Create Tenant Profile
Browse Listings
Send Interest
View AI Score
Accept / Decline Interest
🚀 Deployment (Optional)
Frontend (Vercel)
Deploy frontend/
Add VITE_API_URL
Backend (Render)
Deploy root project
Add environment variables
⚠️ Important Notes
❌ Do NOT upload node_modules
❌ Do NOT upload .env
❌ Use main branch only
❌ Keep repo public
✅ Ensure project runs locally before submission
👨‍💻 Author

Built as part of Rent & Flatmate Finder Assignment

🏁 Status

✔ Authentication System
✔ Listing System
✔ Interest System
✔ AI Compatibility Engine
✔ Fallback Logic
✔ Backend + Frontend Integration

🎯 Final Summary

This project demonstrates:

Full-stack MERN-style architecture
AI-based decision making
Real-world rental matching logic
Scalable backend design
Production-ready structure

