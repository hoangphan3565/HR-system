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

import com.macia.HRs.entity.Department;
import com.macia.HRs.entity.Holiday;
import com.macia.HRs.repository.HolidayRepository;

@RestController
@RequestMapping("/api/holidays")
public class HolidayResource {
	@Autowired
	private HolidayRepository holidayRepository;
	
	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping()
    public List<Holiday> getHolidays(){
        return holidayRepository.findAll();
    }
	@GetMapping("/count")
    public Long count() {

        return holidayRepository.count();
    }
	//deleteHoliday
	@DeleteMapping("/{id}")
    public Map<String, Boolean> deleteHoliday(@PathVariable(value = "id") Integer holidayID) throws Exception {
        Holiday holiday =
                holidayRepository
                        .findById(holidayID)
                        .orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + holidayID));
        holidayRepository.delete(holiday);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
	//get data holiday
	@GetMapping("/{id}")
    public ResponseEntity<Holiday> getHolidayById(@PathVariable(value = "id") Integer holidayID)
            throws ResourceNotFoundException {
        Holiday holiday =
                holidayRepository
                        .findById(holidayID)
                        .orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + holidayID));
        return ResponseEntity.ok().body(holiday);
    }
	//Create holiday
	@PostMapping("")
    public Holiday createHoliday(@RequestBody Holiday holiday) {
        return holidayRepository.save(holiday);
    }
	//update data holiday
	@PutMapping("/{id}")
    public ResponseEntity<Holiday> updatedHoliday(
            @PathVariable(value = "id") Integer holidayId, @RequestBody Holiday holidayDetail)
            throws ResourceNotFoundException {
        Holiday holiday =
                holidayRepository
                        .findById(holidayId)
                        .orElseThrow(() -> new ResourceNotFoundException("Department not found on :: " + holidayId));
        holiday.setDayName(holidayDetail.getDayName());
        holiday.setToDate(holidayDetail.getToDate());
        holiday.setFromDate(holidayDetail.getFromDate());
        holiday.setNumOfDayOff(holidayDetail.getNumOfDayOff());
        holiday.setCoefficient(holidayDetail.getCoefficient());
        holiday.setCreateBy(holidayDetail.getCreateBy());
        holiday.setModifyDy(holidayDetail.getModifyDy());
        holiday.setIsDeleted(holidayDetail.getIsDeleted());
        final Holiday updatedHoliday = holidayRepository.save(holiday);
        return ResponseEntity.ok(updatedHoliday);
    }
	
}
