package com.ganesh.Emp_Mng_Sys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employees> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employees> getEmployeeById(Integer id) {
        return employeeRepository.findById(id);
    }

    public Employees addEmployee(Employees employee) {
        return employeeRepository.save(employee);
    }

    public Employees updateEmployee(Integer id, Employees employeeDetails) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setName(employeeDetails.getName());
                    employee.setEmail(employeeDetails.getEmail());
                    employee.setJobTitle(employeeDetails.getJobTitle());
                    employee.setPhone(employeeDetails.getPhone());
                    return employeeRepository.save(employee);
                })
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
    }
}
