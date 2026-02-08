<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Loan Management System</title>
</head>
<body>
    <h1>Loan Management System (MERN Mini-Project)</h1>

    <p>A <strong>Loan Management System</strong> built with the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js) that allows managing loans, borrowers, repayments, interest rates, transactions, and contracts.</p>

    <h2>Project Structure</h2>
    <pre>
loan-management-system/
├── backend/     # Node.js + Express backend
├── frontend/    # React frontend
    </pre>

    <h2>Technologies Used</h2>
    <ul>
        <li><strong>Frontend:</strong> React, Tailwind CSS</li>
        <li><strong>Backend:</strong> Node.js, Express.js, MongoDB (Mongoose)</li>
        <li><strong>Database:</strong> MongoDB</li>
        <li><strong>Testing:</strong> Jest / Supertest (backend)</li>
    </ul>

    <h2>Getting Started</h2>

    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js and npm installed</li>
        <li>MongoDB installed and running locally or via a cloud service</li>
    </ul>

    <h3>Clone the Repository</h3>
    <pre>
git clone https://github.com/phyokyaw82/loan-management-system.git
cd loan-management-system
    </pre>

    <h2>Backend Setup</h2>
    <ol>
        <li>Navigate to the backend folder:
            <pre>cd backend</pre>
        </li>
        <li>Install dependencies:
            <pre>npm install</pre>
        </li>
        <li>Create a <code>.env</code> file and set your environment variables:
            <pre>
PORT=5000
MONGODB_URI=&lt;your_mongodb_connection_string&gt;
            </pre>
        </li>
        <li>Run the backend server:
            <pre>nodemon src/index</pre>
            <p>Backend server will run on <strong>port 5000</strong>.</p>
        </li>
        <li>Run backend tests:
            <pre>npm test</pre>
        </li>
    </ol>

    <h2>Frontend Setup</h2>
    <ol>
        <li>Navigate to the frontend folder:
            <pre>cd frontend</pre>
        </li>
        <li>Install dependencies:
            <pre>npm install</pre>
        </li>
        <li>Start the frontend app:
            <pre>npm start</pre>
            <p>Frontend will run on <strong>port 3001</strong>.</p>
        </li>
    </ol>

    <h2>Project Features</h2>
    <h3>Borrower Management</h3>
    <ul>
        <li>Add, view, update, and delete borrowers</li>
        <li>Fields: Full Name, Contact Info, Address, NRC/ID</li>
    </ul>

    <h3>Loan Management</h3>
    <ul>
        <li>Create loans with loan type, amount, start & end date, interest rate</li>
        <li>Associate loans with borrowers</li>
    </ul>

    <h3>Repayment Tracking</h3>
    <ul>
        <li>Record repayments with amount, date, and remaining balance</li>
        <li>Automatically update loan balance</li>
    </ul>

    <h3>Interest Rate Management</h3>
    <ul>
        <li>Manage interest rates (5%, 10%, 15%, 20%)</li>
        <li>Apply to loans automatically</li>
    </ul>

    <h3>Transaction Management</h3>
    <ul>
        <li>Record loan-related transactions: repayment, late fees, penalties</li>
        <li>View transaction history for each loan</li>
    </ul>

    <h3>Contract Management</h3>
    <ul>
        <li>Upload and manage loan contracts (PDF or other formats)</li>
        <li>View or download contracts</li>
    </ul>

    <h2>Ports</h2>
    <ul>
        <li><strong>Frontend:</strong> http://localhost:3001</li>
        <li><strong>Backend:</strong> http://localhost:5000</li>
    </ul>

    <h2>Notes</h2>
    <ul>
        <li>Make sure <strong>MongoDB is running</strong> before starting the backend.</li>
        <li>The frontend and backend need to run <strong>simultaneously</strong> for the app to function properly.</li>
        <li>All sensitive files (like <code>.env</code>) are excluded from Git via <code>.gitignore</code>.</li>
    </ul>

    <h2>License</h2>
    <p>This project is for educational purposes as part of a mini-project assignment.</p>
</body>
</html>
