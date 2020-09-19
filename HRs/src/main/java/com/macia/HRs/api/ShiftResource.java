package com.macia.HRs.api;

import com.macia.HRs.entity.Shift;
import com.macia.HRs.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shifts")
public class ShiftResource {

    @Autowired
    private ShiftRepository ShiftRepository;


    @GetMapping()
    public List<Shift> getAllShift(){
        return ShiftRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteShift(@PathVariable(value = "id") Integer ShiftId) throws Exception {
        Shift Shift =
                ShiftRepository
                        .findById(ShiftId)
                        .orElseThrow(() -> new ResourceNotFoundException("Shift not found on :: " + ShiftId));
        ShiftRepository.delete(Shift);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shift> getShiftById(@PathVariable(value = "id") Integer ShiftId)
            throws ResourceNotFoundException {
        Shift Shift =
                ShiftRepository
                        .findById(ShiftId)
                        .orElseThrow(() -> new ResourceNotFoundException("Shift not found on :: " + ShiftId));
        return ResponseEntity.ok().body(Shift);
    }


    @PostMapping()
    public Shift createShift(@RequestBody Shift Shift) {
        return ShiftRepository.save(Shift);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shift> updateShift(
            @PathVariable(value = "id") Integer ShiftId, @RequestBody Shift ShiftDetails)
            throws ResourceNotFoundException {
        Shift Shift =
                ShiftRepository
                        .findById(ShiftId)
                        .orElseThrow(() -> new ResourceNotFoundException("Shift not found on :: " + ShiftId));
        Shift.setShiftName(ShiftDetails.getShiftName());
        Shift.setShiftCode(ShiftDetails.getShiftCode());
        final Shift updatedShift = ShiftRepository.save(Shift);
        return ResponseEntity.ok(updatedShift);
    }
}