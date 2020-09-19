package com.macia.HRs.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.macia.HRs.entity.Employee_Shift;
import com.macia.HRs.entity.Holiday;
import com.macia.HRs.entity.Shift;
import com.macia.HRs.repository.Employee_Shift_Repository;

@RestController
@RequestMapping("/api/employee_shift")
public class Employee_Shift_Resource {
	@Autowired
	private Employee_Shift_Repository employeeShift_Repository;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping()
	public List<Employee_Shift> getEmployeeShift() {
		return employeeShift_Repository.findAll();
	}

	@GetMapping("/count")
	public Long count() {

		return employeeShift_Repository.count();
	}

	// delete employeeshift
	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteEmployeeShift(@PathVariable(value = "id") Integer employeeShiftID)
			throws Exception {
		Employee_Shift employee_Shift = employeeShift_Repository.findById(employeeShiftID)
				.orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + employeeShiftID));
		employeeShift_Repository.delete(employee_Shift);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	// get data employeeshift
	@GetMapping("/{id}")
	public ResponseEntity<Employee_Shift> getEmployeeShiftById(@PathVariable(value = "id") Integer employeeShiftID)
			throws ResourceNotFoundException {
		Employee_Shift employee_Shift = employeeShift_Repository.findById(employeeShiftID)
				.orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + employeeShiftID));
		return ResponseEntity.ok().body(employee_Shift);
	}

	// Create employeeshift
	@PostMapping("")
	public Employee_Shift createEmployeeShift(@RequestBody Employee_Shift employee_Shift) {
		return employeeShift_Repository.save(employee_Shift);
	}

	// Update employeeShift
	@PutMapping("/{id}")
	public ResponseEntity<Employee_Shift> updatedEmployeeShift(@PathVariable(value = "id") Integer employeeShiftId,
			@RequestBody Employee_Shift employeeShiftDetail) throws ResourceNotFoundException {
		Employee_Shift employee_Shift = employeeShift_Repository.findById(employeeShiftId)
				.orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + employeeShiftId));
		employee_Shift.setStartdate(employeeShiftDetail.getStartdate());
		employee_Shift.setEnddate(employeeShiftDetail.getEnddate());
		employee_Shift.setCreateby(employeeShiftDetail.getCreateby());
		employee_Shift.setModifyby(employeeShiftDetail.getModifyby());
		employee_Shift.setIsdeleted(employeeShiftDetail.getIsdeleted());
		final Employee_Shift updateEmployeeShift = employeeShift_Repository.save(employee_Shift);
		return ResponseEntity.ok(updateEmployeeShift);
	}

}
