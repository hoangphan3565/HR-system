package com.macia.HRs.api;

import com.macia.HRs.entity.Holiday;
import com.macia.HRs.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/holidaies")
public class HolidayResource {

    @Autowired
    private HolidayRepository HolidayRepository;


    @GetMapping()
    public List<Holiday> getAllHoliday(){
        return HolidayRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteHoliday(@PathVariable(value = "id") Integer HolidayId) throws Exception {
        Holiday Holiday =
                HolidayRepository
                        .findById(HolidayId)
                        .orElseThrow(() -> new ResourceNotFoundException("Holiday not found on :: " + HolidayId));
        HolidayRepository.delete(Holiday);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Holiday> getHolidayById(@PathVariable(value = "id") Integer HolidayId)
            throws ResourceNotFoundException {
        Holiday Holiday =
                HolidayRepository
                        .findById(HolidayId)
                        .orElseThrow(() -> new ResourceNotFoundException("Holiday not found on :: " + HolidayId));
        return ResponseEntity.ok().body(Holiday);
    }


    @PostMapping()
    public Holiday createHoliday(@RequestBody Holiday Holiday) {
        return HolidayRepository.save(Holiday);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Holiday> updateHoliday(
            @PathVariable(value = "id") Integer HolidayId, @RequestBody Holiday HolidayDetails)
            throws ResourceNotFoundException {
        Holiday Holiday =
                HolidayRepository
                        .findById(HolidayId)
                        .orElseThrow(() -> new ResourceNotFoundException("Holiday not found on :: " + HolidayId));
        Holiday.setDayName(HolidayDetails.getDayName());
        Holiday.setFromDate(HolidayDetails.getFromDate());
        Holiday.setToDate(HolidayDetails.getToDate());
        Holiday.setNumOfDayOff(HolidayDetails.getNumOfDayOff());
        Holiday.setCoefficient(HolidayDetails.getCoefficient());
        final Holiday updatedHoliday = HolidayRepository.save(Holiday);
        return ResponseEntity.ok(updatedHoliday);
    }
}