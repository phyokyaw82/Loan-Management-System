# Loan Management System (MERN Mini-Project)

![Node.js](https://img.shields.io/badge/Node.js-v18.x-green?logo=node.js)
![React](https://img.shields.io/badge/React-v18.x-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.x-green?logo=mongodb)
![License](https://img.shields.io/badge/License-Educational-orange)

A **Loan Management System** built with the **MERN stack** (MongoDB, Express, React, Node.js) that allows managing loans, borrowers, repayments, interest rates, transactions, and contracts.

---

## Technologies Used

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **Database:** MongoDB  
- **Testing:** Jest / Supertest (backend)  

---

## Getting Started

### Prerequisites

- Node.js and npm installed  
- MongoDB installed and running locally or via a cloud service  

---

### Clone the Repository

```bash
git clone https://github.com/phyokyaw82/loan-management-system.git
cd loan-management-system

Backend Setup

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Create a .env file and set your environment variables:

PORT=5000
MONGODB_URI=<your_mongodb_connection_string>


Run the backend server:

nodemon src/index


Backend server will run on port 5000.

Run backend tests:

npm test

Frontend Setup

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend app:

npm start


Frontend will run on port 3001.

Project Features
Borrower Management

Add, view, update, and delete borrowers

Fields: Full Name, Contact Info, Address, NRC/ID

Loan Management

Create loans with loan type, amount, start & end date, interest rate

Associate loans with borrowers

Repayment Tracking

Record repayments with amount, date, and remaining balance

Automatically update loan balance

Interest Rate Management

Manage interest rates (5%, 10%, 15%, 20%)

Apply to loans automatically

Transaction Management

Record loan-related transactions: repayment, late fees, penalties

View transaction history for each loan

Contract Management

Upload and manage loan contracts (PDF or other formats)

View or download contracts

Ports

Frontend: http://localhost:3001

Backend: http://localhost:5000

Notes

Make sure MongoDB is running before starting the backend.

The frontend and backend need to run simultaneously for the app to function properly.

All sensitive files (like .env) are excluded from Git via .gitignore.
