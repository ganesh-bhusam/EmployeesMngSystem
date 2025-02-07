
 
# Employee Management System

## Overview
This is a **full-stack Employee Management System** built from scratch using **React.js** for the frontend, **Spring Boot** for the backend, and **MySQL** as the database. The system allows managing employee details with functionalities like adding, updating, deleting, and viewing employee records.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Spring Boot
- **Database:** MySQL
- **API Communication:** REST APIs
- **Cross-Origin Configuration:** Enabled to allow frontend-backend communication

## Features
- **Employee CRUD Operations:** Create, Read, Update, Delete employees
- **RESTful APIs:** Developed and tested APIs for data exchange
- **MySQL Database Integration:** Storing employee data efficiently
- **Spring Boot Backend:** Secure and optimized API handling
- **React Frontend:** Interactive and user-friendly UI
- **Cross-Origin Support:** Connected frontend and backend securely

## Setup Instructions
### Prerequisites
Make sure you have the following installed:
- Node.js & npm (for frontend)
- Java & Maven (for backend)
- MySQL Server

### Backend (Spring Boot)
1. **Clone the repository** and navigate to the backend folder:
   ```bash
   git clone https://github.com/your-repo/employee-mgmt-system.git
   cd employee-mgmt-system/backend
   ```
2. **Install dependencies** and build the project:
   ```bash
   mvn clean install
   ```
3. **Configure MySQL Database** in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
4. **Run the backend server:**
   ```bash
   mvn spring-boot:run
   ```

### Frontend (React.js)
1. **Navigate to the frontend folder:**
   ```bash
   cd ../frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the frontend server:**
   ```bash
   npm start
   ```

## API Endpoints
- `GET /api/employees` - Fetch all employees
- `POST /api/employees` - Add a new employee
- `PUT /api/employees/{id}` - Update employee details
- `DELETE /api/employees/{id}` - Remove an employee

## Cross-Origin Configuration (CORS)
Configured in **Spring Boot** to allow frontend to access backend APIs:
```java
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
```

## Running the Project
1. **Start MySQL Server**
2. **Run the Spring Boot Backend**
3. **Run the React Frontend**
4. Open `http://localhost:3000` in the browser

## Conclusion
This **Employee Management System** is a fully functional web application that integrates a React frontend with a Spring Boot backend and a MySQL database. It showcases full-stack development, REST API handling, and database management.

Feel free to contribute or suggest improvements!

---
**Author:** Your Name  
**GitHub:** (https://github.com/ganesh-bhusam)

