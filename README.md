# Smart Task Management Microservice & Dashboard

[![Build & Test Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Code Coverage](https://img.shields.io/badge/coverage-87.34%25-green.svg)]()
[![Docker Ready](https://img.shields.io/badge/docker-ready-blue.svg)]()
[![Course Code](https://img.shields.io/badge/IU-DLBSEPPSD01__E-orange.svg)]()

**Course:** DLBSEPPSD01_E – Software Development  
**Degree Program:** B.Sc. / M.Sc. Computer Science & Software Engineering  
**IU International University of Applied Sciences**

---

## 🚀 Overview

The **Smart Task Management Microservice** is a lightweight, high-performance, containerized REST API and interactive Single-Page Application (SPA) dashboard designed to streamline task lifecycle management for agile software engineering teams.

### Key Highlights:
- **RESTful API Backend:** Express.js endpoints for full Task CRUD operations (Create, Read, Update, Delete) with status and priority filtering.
- **DB Ephemeral Store:** In-memory high-speed data store (DB Ephemeral) ensuring zero-dependency, ultra-fast local testing and microservice execution.
- **Interactive SPA Frontend:** Built with Bootstrap 5 and modern JavaScript, allowing visual task management and real-time health probe monitoring directly from the browser.
- **Health Telemetry Probe:** Endpoint at `/health` providing JSON system metrics (uptime, version, memory) for cloud orchestrator liveness checks.
- **DevSecOps Containerization:** Multi-stage Docker build producing a minimal Alpine container (<65MB) executing under non-root security context (`appuser`).
- **Automated Testing:** 100% pass rate across Jest and Supertest unit & integration test cases with >87% statement coverage.

---

## 📁 Repository Structure

```
software_dev_project/
├── .dockerignore              # Docker build exclusions
├── .gitignore                 # Git ignore rules (node_modules, coverage, envs)
├── Dockerfile                 # Multi-stage container specification
├── docker-compose.yml         # Container orchestration configuration
├── package.json               # Dependencies and test scripts
├── README.md                  # Project documentation & GitHub overview
├── public/                    # Frontend Single Page Application (SPA)
│   └── index.html             # Responsive Bootstrap 5 Dashboard UI
├── src/                       # Backend Application Source
│   ├── app.js                 # Express App configuration & middleware
│   ├── server.js              # Server entry point & port listener
│   ├── controllers/           # Business logic & DB Ephemeral handlers
│   │   └── taskController.js  # CRUD controller
│   └── routes/                # REST API route mappings
│       └── taskRoutes.js      # /api/v1/tasks routes
└── test/                      # Automated Test Suite
    └── task.test.js           # Jest and Supertest API tests
```

---

## 🛠️ Quickstart Guide

### Option 1: Running Locally (Node.js)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Execute Automated Tests:**
   ```bash
   npm test
   ```

3. **Start Microservice:**
   ```bash
   npm start
   ```
   - Access Web Dashboard: `http://localhost:5000`
   - Access Health Probe: `http://localhost:5000/health`
   - Access REST API: `http://localhost:5000/api/v1/tasks`

---

### Option 2: Running via Docker & Docker Compose

1. **Build and Start Container:**
   ```bash
   docker-compose up --build
   ```

2. **Verify Running Service:**
   - Open your browser at `http://localhost:5000`.

3. **Stop Container:**
   ```bash
   docker-compose down
   ```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Query Parameters / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Liveness & Telemetry Probe | None |
| `GET` | `/api/v1/tasks` | Fetch all tasks | `?status=PENDING` or `?priority=HIGH` |
| `GET` | `/api/v1/tasks/:id` | Fetch task by ID | None |
| `POST` | `/api/v1/tasks` | Create new task | `{ "title": "Text", "priority": "HIGH" }` |
| `PUT` | `/api/v1/tasks/:id` | Update task status/priority | `{ "status": "COMPLETED" }` |
| `DELETE` | `/api/v1/tasks/:id` | Delete task by ID | None |

---

## 📄 License & Academic Declaration

Developed for course **DLBSEPPSD01_E – Software Development** at **IU International University of Applied Sciences**. All rights reserved.
