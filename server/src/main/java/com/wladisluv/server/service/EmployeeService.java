package com.wladisluv.server.service;

import com.wladisluv.server.exception.EmployeeNotFoundException;
import com.wladisluv.server.model.Employee;
import com.wladisluv.server.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService implements IEmployeeService{
    private final EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }
    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    @Override
    public Employee updateEmployee(Employee employee, Long id) {
        return employeeRepository.findById(id).map(emp -> {
            emp.setFirstName(employee.getFirstName());
            emp.setLastName(employee.getLastName());
            emp.setPosition(employee.getPosition());
            emp.setHireDate(employee.getHireDate());
            emp.setLocation(employee.getLocation());
            return employeeRepository.save(emp);
        }).orElseThrow(() -> new EmployeeNotFoundException("This employee could not be found"));
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("No employee found with Id:" +id));
    }

    @Override
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException(("employee not found"));
        }
    }
}
