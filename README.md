Loan Management System (MERN Mini-Project)
A simple Loan Management System built with the MERN stack. The project includes a backend (Node.js +
Express) and frontend (React) for managing loans, borrowers, repayments, and contracts.
Project Structure
loan-management-system/
├── backend/ # Node.js + Express backend
├── frontend/ # React frontend
Setup
1. Clone the repository
git clone https://github.com/phyokyaw82/loan-management-system.git
cd loan-management-system
2. Backend
cd backend
npm install
Create a .env file with:
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
Run the server:
Node.js
React
MongoDB
•
•
1
nodemon src/index
Run tests (optional):
npm test
Backend runs on http://localhost:5000
3. Frontend
cd frontend
npm install
npm start
Frontend runs on http://localhost:3001
Notes
Make sure MongoDB is running before starting the backend.
Run frontend and backend simultaneously for the app to work.
Sensitive files like .env are excluded from Git ( .gitignore ).
License
Educational project for assignment purposes.
