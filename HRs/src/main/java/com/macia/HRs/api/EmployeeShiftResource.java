package com.macia.HRs.api;

import com.macia.HRs.entity.Employee_Shift;
import com.macia.HRs.repository.EmployeeShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/empshifts")
public class EmployeeShiftResource {

    @Autowired
    private EmployeeShiftRepository emsRepo;


    @GetMapping()
    public List<Employee_Shift> getAllEmployee_Shift(){
        return emsRepo.findAll();
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteEmployee_Shift(@PathVariable(value = "id") Integer Employee_ShiftId) throws Exception {
        Employee_Shift Employee_Shift =
                emsRepo
                        .findById(Employee_ShiftId)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee_Shift not found on :: " + Employee_ShiftId));
        emsRepo.delete(Employee_Shift);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee_Shift> getEmployee_ShiftById(@PathVariable(value = "id") Integer Employee_ShiftId)
            throws ResourceNotFoundException {
        Employee_Shift Employee_Shift =
                emsRepo
                        .findById(Employee_ShiftId)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee_Shift not found on :: " + Employee_ShiftId));
        return ResponseEntity.ok().body(Employee_Shift);
    }

    @PostMapping()
    public Employee_Shift createEmployee_Shift(@RequestBody Employee_Shift Employee_Shift) {
        return emsRepo.save(Employee_Shift);
    }
}