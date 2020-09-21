package com.macia.HRs.api;

import com.macia.HRs.entity.Shift_Daily;
import com.macia.HRs.repository.ShiftDailyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shiftdailies")
public class ShiftDailyResource {

    @Autowired
    private ShiftDailyRepository sidRepo;


    @GetMapping()
    public List<Shift_Daily> getAllShiftDaily(){
        return sidRepo.findAll();
    }

    @GetMapping("/count")
    public Long count() {

        return sidRepo.count();
    }
    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteShiftDaily(@PathVariable(value = "id") Integer ShiftDailyId) throws Exception {
        Shift_Daily ShiftDaily =
                sidRepo
                        .findById(ShiftDailyId)
                        .orElseThrow(() -> new ResourceNotFoundException("ShiftDaily not found on :: " + ShiftDailyId));
        sidRepo.delete(ShiftDaily);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shift_Daily> getShiftDailyById(@PathVariable(value = "id") Integer ShiftDailyId)
            throws ResourceNotFoundException {
        Shift_Daily ShiftDaily =
                sidRepo
                        .findById(ShiftDailyId)
                        .orElseThrow(() -> new ResourceNotFoundException("ShiftDaily not found on :: " + ShiftDailyId));
        return ResponseEntity.ok().body(ShiftDaily);
    }


    @PostMapping()
    public Shift_Daily createShiftDaily(@RequestBody Shift_Daily ShiftDaily) {
        return sidRepo.save(ShiftDaily);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shift_Daily> updateShiftDaily(
            @PathVariable(value = "id") Integer ShiftDailyId, @RequestBody Shift_Daily ShiftDailyDetails)
            throws ResourceNotFoundException {
        Shift_Daily ShiftDaily =
                sidRepo
                        .findById(ShiftDailyId)
                        .orElseThrow(() -> new ResourceNotFoundException("ShiftDaily not found on :: " + ShiftDailyId));
        ShiftDaily.setDayOfWeek(ShiftDailyDetails.getDayOfWeek());
        final Shift_Daily updatedShiftDaily = sidRepo.save(ShiftDaily);
        return ResponseEntity.ok(updatedShiftDaily);
    }
}