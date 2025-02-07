import React from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
    return (
        <div className="container">
            <h1>Employee Management System</h1>
            
            <EmployeeList />
            <EmployeeForm />
        </div>
    );
}

export default App;