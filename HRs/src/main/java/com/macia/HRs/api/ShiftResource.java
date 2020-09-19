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

import com.macia.HRs.entity.Holiday;
import com.macia.HRs.entity.Shift;
import com.macia.HRs.repository.ShiftRepository;

@RestController
@RequestMapping("/api/shifts")
public class ShiftResource {
	@Autowired
	private ShiftRepository shiftRepository;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping()
	public List<Shift> getShifts() {
		return shiftRepository.findAll();
	}

	@GetMapping("/count")
	public Long count() {

		return shiftRepository.count();
	}

	// deleteshift
	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteShift(@PathVariable(value = "id") Integer shiftID) throws Exception {
		Shift shift = shiftRepository.findById(shiftID)
				.orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + shiftID));
		shiftRepository.delete(shift);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	// get data shift
	@GetMapping("/{id}")
	public ResponseEntity<Shift> getShiftById(@PathVariable(value = "id") Integer shiftID)
			throws ResourceNotFoundException {
		Shift shift = shiftRepository.findById(shiftID)
				.orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + shiftID));
		return ResponseEntity.ok().body(shift);
	}

	// Create shift
	@PostMapping("")
	public Shift createShift(@RequestBody Shift shift) {
		return shiftRepository.save(shift);
	}

	// update data shift


}
