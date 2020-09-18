package com.macia.HRs.api;
import com.macia.HRs.entity.Daily_Schedule;
import com.macia.HRs.repository.DailyScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dailyschedules")
public class DailyScheduleResource {

    @Autowired
    private DailyScheduleRepository dlsRepo;


    @GetMapping()
    public List<Daily_Schedule> getAllDailySchedule(){
        return dlsRepo.findAll();
    }

    @GetMapping("/count")
    public Long count() {

        return dlsRepo.count();
    }
    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteDailySchedule(@PathVariable(value = "id") Integer DailyScheduleId) throws Exception {
        Daily_Schedule DailySchedule =
                dlsRepo
                        .findById(DailyScheduleId)
                        .orElseThrow(() -> new ResourceNotFoundException("DailySchedule not found on :: " + DailyScheduleId));
        dlsRepo.delete(DailySchedule);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Daily_Schedule> getDailyScheduleById(@PathVariable(value = "id") Integer DailyScheduleId)
            throws ResourceNotFoundException {
        Daily_Schedule DailySchedule =
                dlsRepo
                        .findById(DailyScheduleId)
                        .orElseThrow(() -> new ResourceNotFoundException("DailySchedule not found on :: " + DailyScheduleId));
        return ResponseEntity.ok().body(DailySchedule);
    }


    @PostMapping()
    public Daily_Schedule createDailySchedule(@RequestBody Daily_Schedule DailySchedule) {
        return dlsRepo.save(DailySchedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Daily_Schedule> updateDailySchedule(
            @PathVariable(value = "id") Integer DailyScheduleId, @RequestBody Daily_Schedule DailyScheduleDetails)
            throws ResourceNotFoundException {
        Daily_Schedule DailySchedule =
                dlsRepo
                        .findById(DailyScheduleId)
                        .orElseThrow(() -> new ResourceNotFoundException("DailySchedule not found on :: " + DailyScheduleId));
        DailySchedule.setName(DailyScheduleDetails.getName());
        final Daily_Schedule updatedDailySchedule = dlsRepo.save(DailySchedule);
        return ResponseEntity.ok(updatedDailySchedule);
    }
}