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
    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    @ResponseBody
    public Map<String, Boolean> deleteEmployee(@PathVariable(value = "id") Integer empID) throws Exception {
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
        return employeeRepository.findByFirstName(name);
    }

    /*==================== Get EMP details Via NamedQuery by firstname=====================*/
//    @GetMapping("/find/fname/{fname}")
//    @ResponseBody
//    public List<Employee> findEmployeeByFirstName(@PathVariable(value = "fname") String name)
//            throws ResourceNotFoundException {
//        return employeeService.findEmployeeByFirstName(name);
//    }

    /*==================== Get EMP details Via PROC by firstname=====================*/
    @GetMapping("/find/fname/{fname}")
    @ResponseBody
    public List<Employee> findEmployeeByFirstName(@PathVariable(value = "fname") String fname)
            throws ResourceNotFoundException {
        return employeeService.findAllEmpViaProcByFirstName(fname);
    }

    @PostMapping("/create/dept/{deptid}")
    public Employee createEmployeeWithDeptID(@RequestBody Employee employee,@PathVariable(value = "deptid") Integer deptid) {
        Department department = deptRepo.findById(deptid).orElseThrow(null);
        employee.setDepartment(department);
        return employeeRepository.save(employee);
    }
    @PostMapping("/create/pos/{posid}")
    public Employee createEmployeeWithPostID(@RequestBody Employee employee,@PathVariable(value = "posid") Integer posid) {
        Position position = posRepo.findById(posid).orElseThrow(null);
        employee.setPosition(position);
        return employeeRepository.save(employee);
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/create/dept/{deptid}/pos/{posid}")
    public Employee createEmployeeWithDeptAndPostID(@RequestBody Employee employee,@PathVariable(value = "deptid") Integer deptid,@PathVariable(value = "posid") Integer posid) {
        Department department = deptRepo.findById(deptid).orElseThrow(null);
        employee.setDepartment(department);
        Position position = posRepo.findById(posid).orElseThrow(null);
        employee.setPosition(position);
        return employeeRepository.save(employee);
    }
    
    @CrossOrigin(origins = "*")
    @PutMapping("/update/{eid}/dept/{deptid}/pos/{posid}")
	public Employee updateEmployeeById(@RequestBody Employee employee,@PathVariable int eid,@PathVariable int deptid,@PathVariable int posid) {
    	Employee e=employeeRepository.findById(eid).orElseThrow(null);
    	Department d=deptRepo.findById(deptid).orElseThrow(null);
		Position p=posRepo.findById(posid).orElseThrow(null);
		e.setFirstName(employee.getFirstName());
		e.setLastName(employee.getLastName());
		e.setStartdate(employee.getStartdate());
		e.setDepartment(d);
		e.setPosition(p);
		return employeeRepository.save(e);
	}


}
