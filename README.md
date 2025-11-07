# INSY7314\_POE

POE Part 3



YouTube video: https://youtu.be/dbn2Z0WXaFM



GitHub repo: https://github.com/jiabou/INSY7314\_POE.git



Project Overview

This MERN stack project is an International Payments system designed to manage customers, employees, and transactions securely. It features customer and employee registration and login, transaction processing, and an admin portal for verifying payments.



Prerequisites for this project:

* Visual Studio Code must be used to run the app.



* Node.js must be installed on your device.Download link: https://nodejs.org/en/download  (v16 or higher recommended)



* MongoDB Atlas or Local MongoDB is recommended to view data.



* Browser with HTTPS support 



* Create a .env file with correct values for:

&nbsp;   NGO\_URI (MongoDB connection string, e.g., mongodb+srv://johnee004\_db\_user:SQ6mfVMXRrx4jYx@bankingclusterpayments.isptqrr.mongodb.net/international\_payments\_db?retryWrites=true\&w=majority\&appName=BankingClusterPayments)

&nbsp;   PORT (backend server port, e.g., 5000)

&nbsp;   USE\_HTTPS (true/false to enable HTTPS)



* Backend dependencies installed and other commands as follows: (make sure to use "cd backend")

&nbsp;   "npm init -y"



&nbsp;   "npm install express mongoose dotenv" then "npm install"  



&nbsp;   "npm install nodemon" then "npm install"    

&nbsp;   

* Frontend dependencies installed and other commands as follows: (make sure to use "cd frontend")

&nbsp;   "npm install --save-dev vite" then "npm install"

&nbsp;   

&nbsp;   Optional vite isntall "npm create vite@latest ."

&nbsp;      >React

&nbsp;      >JavaScript

&nbsp;   then "npm install"

&nbsp;   

&nbsp;   Chakra install "npm install axios react-router-dom" then "npm i react-router-dom"



* Optional:

&nbsp;   Postman or curl for testing API endpoints. (Examples included in YouTube videos)

&nbsp;   GitHub or another Git hosting service for remote repository.

&nbsp;   

Setup Instructions

* Make sure the prerequisites have been met before starting
* Create 2 terminals (backend and frontend)
* Navigate to the frontend directory in one of the terminals (cd frontend) 
* Run the following command in the frontend FIRST: "npm run dev" (allows the app to use ssl) 
* Navigate to the backend directory in one of the terminals (cd backend)
* Run the following command in the backend SECOND: "npm run dev"
* Open the following link in your browers of choice: https://localhost:5173/
* Use the one of the following credentials to log into the employee login page:

&nbsp;   Employee 1: 
                Employee ID: E501

&nbsp;               Role:        PaymentVerifier

&nbsp;               Password:    Password!123



    Employee 2: 

                Employee ID: E502

                Role:        PaymentVerifier

                Password:    Password!123



* Register a new customer through the customer register customer page or the login with the following credentials:



    Customer 1:
                Full Name:      John Smith

                Account Number: 25313189

&nbsp;               Password:       Password!123



    Customer 2:

                Full Name:      James May

                Account Number: 12345678

                Password:       Password!123



Features

* Customer registration and login with password hashing and salting



* Employee login ONLY with password hashing and salting



* Create, fetch, and update international payment transactions



* Backend secured with HTTPS (self-signed certificates), CORS, Helmet security headers, and rate limiting



* All traffic is severed over SSL 



* Clickjacking protection using X-Frame-Options header



* React frontend with Context API to manage authenticated user states



* Input validation for form data on frontend and backend



* Regex Validation for the frontend



* circle-ci pipeline included



Technologies Used

* Frontend: React, React Router, Context API, Axios



* Backend: Node.js, Express.js, MongoDB, Mongoose, bcrypt, Helmet, express-rate-limit, CORS



* Security: HTTPS with self-signed certificates, rate limiting, X-Frame-Options header



* Development: Vite, Nodemon



* Others: dotenv for environment variable management







