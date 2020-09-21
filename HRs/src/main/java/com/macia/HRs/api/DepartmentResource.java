package com.macia.HRs.api;

import com.macia.HRs.entity.Department;
import com.macia.HRs.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/departments")
public class DepartmentResource {

    @Autowired
    private DepartmentRepository departmentRepository;


    @CrossOrigin(origins="*")
    @GetMapping()
    public List<Department> getAllDepartment(){
        return departmentRepository.findAll();
    }

    @GetMapping("/count")
    public Long count() {

        return departmentRepository.count();
    }
    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteDepartment(@PathVariable(value = "id") Integer departmentId) throws Exception {
        Department department =
                departmentRepository
                        .findById(departmentId)
                        .orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + departmentId));
        departmentRepository.delete(department);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable(value = "id") Integer departmentId)
            throws ResourceNotFoundException {
        Department department =
                departmentRepository
                        .findById(departmentId)
                        .orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + departmentId));
        return ResponseEntity.ok().body(department);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("")
    public Department createDepartment(@RequestBody Department department) {
        return departmentRepository.save(department);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(
            @PathVariable(value = "id") Integer departmentId, @RequestBody Department departmentDetails)
            throws ResourceNotFoundException {
        Department department =
                departmentRepository
                        .findById(departmentId)
                        .orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + departmentId));
        department.setDepartmentName(departmentDetails.getDepartmentName());
        department.setStartDate(departmentDetails.getStartDate());
        final Department updatedDepartment = departmentRepository.save(department);
        return ResponseEntity.ok(updatedDepartment);
    }

}