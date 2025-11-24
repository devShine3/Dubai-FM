# Dubai FM ERP 🏗️

A comprehensive **Facility Management Enterprise Resource Planning (ERP)** system designed for service providers in Dubai. This solution integrates CRM, Operations, and Accounting into a single platform with a premium user interface.

![Status](https://img.shields.io/badge/Status-Completed-success)
![Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20NestJS%20%7C%20PostgreSQL-blue)

## 🌟 Features

### 1. 📊 Admin & Dispatcher Dashboard
*   **Kanban Job Board**: Drag-and-drop style view of Open, In-Progress, and Completed jobs.
*   **Job Management**: Create, dispatch, and delete job cards.
*   **Invoicing**: Generate VAT-compliant (5%) invoices automatically upon job completion.

### 2. 👷 Technician Mobile App
*   **Job Acceptance**: View assigned jobs on a mobile-friendly interface.
*   **Navigation**: One-click Google Maps integration for property location.
*   **Workflow**: Start jobs to track time and mark them as completed.

### 3. 🏠 Customer Portal
*   **Self-Service**: Tenants/Owners can book new services directly.
*   **Payments**: View unpaid invoices and pay them online (mock payment flow).
*   **History**: Track status of requested jobs.

### 4. 🤖 AI Assistant
*   **Smart Chatbot**: Integrated AI helper to answer common questions about booking, billing, and status.

---

## 🛠️ Tech Stack

*   **Frontend**: Next.js 14 (React), Tailwind CSS, Lucide Icons.
*   **Backend**: NestJS (Node.js), TypeORM.
*   **Database**: PostgreSQL (Dockerized).
*   **DevOps**: Docker Compose for local database orchestration.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   Docker Desktop (for the database)

### 1. Clone the Repository
```bash
git clone https://github.com/devShine3/Dubai-FM.git
cd Dubai-FM
```

### 2. Setup Database
Start the PostgreSQL container:
```bash
cd dubai-fm-erp
docker-compose up -d
```

### 3. Install Dependencies & Run Backend
```bash
# In the dubai-fm-erp directory
npm install
npm run start:dev
```
*The backend API will start on `http://localhost:3000`*

### 4. Install Dependencies & Run Frontend
Open a new terminal:
```bash
cd ../dubai-fm-dashboard
npm install
npm run dev
```
*The dashboard will open at `http://localhost:3001`*

---

## 🌐 Deployment Guide

### Frontend (Next.js)
We recommend **Vercel** for the dashboard and apps.
1.  Push this repo to GitHub.
2.  Go to [Vercel.com](https://vercel.com) and import the project.
3.  Set the `Root Directory` to `dubai-fm-dashboard`.
4.  Deploy!

### Backend (NestJS + Database)
We recommend **Railway** or **Render** for the API and Database.
1.  Create a new project on [Railway.app](https://railway.app).
2.  Provision a PostgreSQL database.
3.  Deploy the `dubai-fm-erp` folder as a Node.js service.
4.  Update the `DATABASE_HOST` environment variables to point to your live database.

---

## 📄 License
Private Property of Dubai FM Services.
