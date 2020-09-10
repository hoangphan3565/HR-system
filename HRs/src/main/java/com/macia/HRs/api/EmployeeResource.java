package com.macia.HRs.api;


import com.macia.HRs.entity.Department;
import com.macia.HRs.entity.Employee;
import com.macia.HRs.entity.Position;
import com.macia.HRs.repository.DepartmentRepository;
import com.macia.HRs.repository.EmployeeRepository;
import com.macia.HRs.repository.PositionRepository;
import com.macia.HRs.service.EmployeeService;
import com.macia.HRs.utility.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class EmployeeResource {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private DepartmentRepository deptRepo;

    @Autowired
    private PositionRepository posRepo;

    @GetMapping()
    @ResponseBody
    public List<Employee> getAllEmployee(){
        return employeeRepository.findAllWithouyNplusOne();
    }

    @GetMapping("/count")
    public Long count() {

        return employeeRepository.count();
    }
    @DeleteMapping("/{id}")
    @ResponseBody
    public Map<String, Boolean> deleteProject(@PathVariable(value = "id") Integer empID) throws Exception {
        Employee employee =
                employeeRepository
                        .findById(empID)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee not found on :: " + empID));
        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted Employee Name: "+employee.getFullName(), Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Employee> getEmployeeById(@PathVariable(value = "id") Integer empId)
            throws ResourceNotFoundException {
        Employee user =
                employeeRepository
                        .findById(empId)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee not found on :: " + empId));
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/dept/{deptid}")
    @ResponseBody
    public List<Employee> getAllEmployeeByDeptId(@PathVariable(value = "deptid") Integer deptid){
        return employeeRepository.findByDepartment(deptRepo.findById(deptid));
    }

    @GetMapping("/pos/{posid}")
    @ResponseBody
    public List<Employee> getAllEmployeeByPosId(@PathVariable(value = "posid") Integer posid){
        return employeeRepository.findByPosition(posRepo.findById(posid));
    }

    @GetMapping("/dept/{deptid}/count")
    public Integer countEmployeeInDepartment(@PathVariable(value = "deptid") Integer deptid) {
        return employeeRepository.findByDepartment(deptRepo.findById(deptid)).size();
    }

    @GetMapping("/name/{name}")
    @ResponseBody
    public List<Employee> getEmployeeByFirstName(@PathVariable(value = "name") String name)
            throws ResourceNotFoundException {
        //Tìm kiến theo tên nhân viên bằng câu truy vấn like
        //return employeeService.findEmployeeByFirstName(name);

        //phải truyền vào đúng tên nhân viên
        return employeeRepository.findByFirstName(name);
    }

    @GetMapping("/find/fname/{name}")
    @ResponseBody
    public List<Employee> findEmployeeByFirstName(@PathVariable(value = "name") String name)
            throws ResourceNotFoundException {
        return employeeService.findEmployeeByFirstName(name);
    }

    @GetMapping("/gender/female")
    @ResponseBody
    public List<Employee> getFemaleEmployees()
            throws ResourceNotFoundException {
        return employeeRepository.findByGender(Gender.FEMALE);
    }
    @GetMapping("/gender/female/count")
    @ResponseBody
    public Integer getFemaleEmployeesTotal()
            throws ResourceNotFoundException {
        return employeeRepository.findByGender(Gender.FEMALE).size();
    }
    @GetMapping("/gender/male")
    @ResponseBody
    public List<Employee> getMaleEmployees()
            throws ResourceNotFoundException {
        return employeeRepository.findByGender(Gender.MALE);
    }
    @GetMapping("/gender/male/count")
    @ResponseBody
    public Integer getMaleEmployeesTotal()
            throws ResourceNotFoundException {
        return employeeRepository.findByGender(Gender.MALE).size();
    }

    @PostMapping("/create/dept/{deptid}")
    public Employee createEmployeeWithDeptID(@RequestBody Employee employee,@PathVariable(value = "deptid") Integer deptid) {
        Department department = deptRepo.findById(deptid).orElseThrow();
        employee.setDepartment(department);
        return employeeRepository.save(employee);
    }
    @PostMapping("/create/pos/{posid}")
    public Employee createEmployeeWithPostID(@RequestBody Employee employee,@PathVariable(value = "posid") Integer posid) {
        Position position = posRepo.findById(posid).orElseThrow();
        employee.setPosition(position);
        return employeeRepository.save(employee);
    }
    @PostMapping("/create/dept/{deptid}/pos/{posid}")
    public Employee createEmployeeWithDeptAndPostID(@RequestBody Employee employee,@PathVariable(value = "deptid") Integer deptid,@PathVariable(value = "posid") Integer posid) {
        Department department = deptRepo.findById(deptid).orElseThrow();
        employee.setDepartment(department);
        Position position = posRepo.findById(posid).orElseThrow();
        employee.setPosition(position);
        return employeeRepository.save(employee);
    }
}
