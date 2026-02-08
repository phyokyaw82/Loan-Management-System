# Loan Management System (MERN Mini-Project)

![Node.js](https://img.shields.io/badge/Node.js-v18.x-green?logo=node.js)
![React](https://img.shields.io/badge/React-v18.x-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.x-green?logo=mongodb)

A simple **Loan Management System** built with the MERN stack. The project includes a backend (Node.js + Express) and frontend (React) for managing loans, borrowers, repayments, and contracts.

---

## Project Structure

```
loan-management-system/
├── backend/     # Node.js + Express backend
├── frontend/    # React frontend
```

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/phyokyaw82/loan-management-system.git
cd loan-management-system
```

---

### 2. Backend

```bash
cd backend
npm install
```

- Create a `.env` file with:

```
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
```

- Run the server:

```bash
nodemon src/index
```

- Run tests (optional):

```bash
npm test
```

> Backend runs on **http://localhost:5000**

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs on **http://localhost:5174**

---

## Notes

- Make sure **MongoDB is running** before starting the backend.
- Run **frontend and backend simultaneously** for the app to work.
- Sensitive files like `.env` are excluded from Git (`.gitignore`).

---

## License

Educational project for assignment purposes.

