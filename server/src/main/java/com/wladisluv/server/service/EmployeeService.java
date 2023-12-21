package com.wladisluv.server.service;

import com.wladisluv.server.exception.EmployeeNotFoundException;
import com.wladisluv.server.exception.PositionNotFoundException;
import com.wladisluv.server.model.Employee;
import com.wladisluv.server.model.Position;
import com.wladisluv.server.repository.EmployeeRepository;
import com.wladisluv.server.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService implements IEmployeeService{
    private final EmployeeRepository employeeRepository;
    private final PositionRepository positionRepository;

    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }
    @Override
    public Employee addEmployee(Employee employee) {
        Long positionId = employee.getPositionId();

        if (positionId == null) {
            throw new IllegalArgumentException("Position id must not be null");
        }
        Position position = positionRepository.findById(positionId)
                .orElseThrow(() -> new PositionNotFoundException("Position not found with id: " + positionId));
        employee.setPosition(position);
        return employeeRepository.save(employee);
    }


    @Override
    public Employee updateEmployee(Employee employee, Long id) {
        return employeeRepository.findById(id)
                .map(emp -> {
                    emp.setFirstName(employee.getFirstName());
                    emp.setLastName(employee.getLastName());
                    emp.setHireDate(employee.getHireDate());
                    emp.setLocation(employee.getLocation());
                    Position position = positionRepository.findById(employee.getPositionId())
                            .orElseThrow(() -> new PositionNotFoundException("Position not found with id: " + employee.getPositionId()));
                    emp.setPosition(position);
                    return employeeRepository.save(emp);
                })
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("No employee found with Id:" + id));
    }

    @Override
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }
}
