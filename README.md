ReachInbox – Email Scheduler
A production-grade email scheduling system built as part of the ReachInbox hiring assignment.
The application supports bulk email scheduling, delayed execution, rate limiting, and a clean dashboard UI, using modern backend and frontend practices.

🚀 Features Overview
✅ Backend

Email scheduling using BullMQ + Redis (no cron jobs)

Persistent jobs that survive server restarts

PostgreSQL for durable storage

Email sending via Ethereal SMTP

Configurable:

Worker concurrency

Delay between emails

Hourly rate limits

Redis-backed rate limiting (safe across workers)

No duplicate or repeated email sends

✅ Frontend

React + Tailwind CSS

Real Google OAuth login

Dashboard with:

Scheduled Emails

Sent Emails

Compose Email modal

CSV / TXT upload & parsing

Bulk email scheduling with preview

Clean UI matching the provided Figma

🏗️ Tech Stack
Backend

Node.js (ES6 JavaScript)

Express.js

BullMQ

Redis

PostgreSQL

Nodemailer (Ethereal Email)

Frontend

React

Tailwind CSS

React Router

Google OAuth (Google Identity Services)

📂 Project Structure
reachinbox-email-scheduler/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── queues/
│   │   ├── workers/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
└── README.md

⚙️ Backend Setup
1️⃣ Install Dependencies
cd backend
npm install

2️⃣ Environment Variables (backend/.env)
PORT=5000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=reachinbox

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

ETHEREAL_USER=your_ethereal_user
ETHEREAL_PASS=your_ethereal_pass

EMAIL_RATE_LIMIT_PER_HOUR=200
EMAIL_MIN_DELAY_MS=2000
WORKER_CONCURRENCY=5

3️⃣ Start Redis

Using Docker:

docker run -d -p 6379:6379 redis:7

4️⃣ Run Backend
npm run dev

🎨 Frontend Setup
1️⃣ Install Dependencies
cd frontend
npm install

2️⃣ Start Frontend
npm start


Frontend runs at:

http://localhost:3000

🔐 Google OAuth Setup

Create a Google Cloud project

Configure OAuth consent screen

Create OAuth Client ID (Web)

Add:

http://localhost:3000


as Authorized JavaScript Origin
5. Use the Client ID in the frontend Google OAuth provider

🧠 How Scheduling Works

User schedules emails from the frontend

Each email is:

Stored in PostgreSQL

Added to BullMQ as a delayed job

BullMQ persists jobs in Redis

Worker processes jobs when delay expires

Rate limits are enforced using Redis counters

Emails are sent via Ethereal SMTP

Status updates to sent or failed

✅ Jobs are not lost on restart
✅ Emails are never duplicated

⏱️ Rate Limiting & Concurrency

Concurrency: Configurable BullMQ worker concurrency

Delay Between Emails: Configurable minimum delay (e.g. 2 seconds)

Hourly Limit:

Redis-backed counters per hour

Jobs exceeding the limit are delayed, not dropped

Safe across:

Multiple workers

Server restarts

🧪 Restart Safety

Redis persists delayed jobs

PostgreSQL stores email metadata

Restarting backend does not resend or lose emails

🎥 Demo Checklist (5 Minutes)

Login with Google

Upload CSV & schedule emails

View Scheduled Emails

Restart backend server

Show emails still being sent

View Sent Emails

Open Ethereal inbox

📝 Notes & Assumptions

JavaScript (ES6) used instead of TypeScript for faster delivery

Architecture is TypeScript-ready

Ethereal Email used for safe testing

CSV parsing supports basic email lists
