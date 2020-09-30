package com.macia.HRs.api;

import com.macia.HRs.DTO.TimeKeepingDTO;
import com.macia.HRs.entity.Department;
import com.macia.HRs.entity.Employee;
import com.macia.HRs.entity.Position;
import com.macia.HRs.entity.TimeKeeping;
import com.macia.HRs.repository.EmployeeRepository;
import com.macia.HRs.repository.TimeKeepingRepository;
import com.macia.HRs.service.TimeKeepingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/timekeepings")
public class TimeKeepingResource {

    @Autowired
    private TimeKeepingService tkpService;

    @Autowired
    private TimeKeepingRepository tkpRepo;
    
    @Autowired
    private EmployeeRepository empRepo;

    @PersistenceContext
    EntityManager em;


    @PostMapping("/syncdatas/{date}")
    @ResponseBody
    public String syncData(@PathVariable(value = "date") String date) throws Exception {
        Integer record = tkpService.syncTKPDataViaProcByDate(date);
        if(record>0){
            return "Successfully synchronized "+record+" lines of data!";
        }
        return "Everything has been synchronized!";
    }  
    @GetMapping("/{id}")
    @CrossOrigin("*")
    @ResponseBody
    public TimeKeeping getTimeKeepingById(@PathVariable(value = "id") Integer id){
        return tkpRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("TimeKeeping not found on :: " + id));
    }

    @GetMapping("/date/{date}/dept/{depid}")
    @CrossOrigin("*")
    @ResponseBody
    public List<TimeKeepingDTO> getTimeKeepingByDeptIDAndDate(
            @PathVariable(value = "date") String date,
            @PathVariable(value = "depid") Integer depid) {
        return tkpService.getTimeKeepingByDeptIDAndDate(date,depid);
    }

    @GetMapping("/date/{date}")
    @CrossOrigin("*")
    @ResponseBody
    public List<TimeKeepingDTO> getTimeKeepingByDate(@PathVariable(value = "date") String date) {
        return tkpService.getTimeKeepingByDate(date);
    }

    @DeleteMapping("/{id}/uid/{uid}")
    @CrossOrigin("*")
    public Map<String, Boolean> deleteTimeKeeping(@PathVariable(value = "id") Integer timekeepingId,@PathVariable(value = "uid") Integer uid) throws Exception {
        TimeKeeping timeKeeping = tkpRepo
                        .findById(timekeepingId)
                        .orElseThrow(() -> new ResourceNotFoundException("TimeKeeping not found on :: " + timekeepingId));
        timeKeeping.setIsDeleted(Boolean.TRUE);
        timeKeeping.setModifyBy(uid);
        tkpRepo.save(timeKeeping);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @PutMapping("/{id}/updatetime/{time}/uid/{uid}")
    @ResponseBody
    @CrossOrigin("*")
    public Map<String, Boolean> updateTimeKeeping(
            @PathVariable(value = "id") Integer timekeepingId,
            @PathVariable(value = "time") String time,
            @PathVariable(value = "uid") Integer uid)
            throws ResourceNotFoundException {
        TimeKeeping timeKeeping = tkpRepo
                        .findById(timekeepingId)
                        .orElseThrow(() -> new ResourceNotFoundException("TimeKeeping not found on :: " + timekeepingId));
        LocalDate dateoftkp = timeKeeping.getDateTime().toLocalDate();
        LocalDateTime updateddatimetkp = dateoftkp.atTime(LocalTime.parse(time));
        timeKeeping.setDateTime(updateddatimetkp);
        timeKeeping.setModifyBy(uid);
        tkpRepo.save(timeKeeping);
        Map<String, Boolean> response = new HashMap<>();
        response.put("updated", Boolean.TRUE);
        return response;
    }
    @PostMapping("/create/empcode/{empcode}")
    @ResponseBody
    @CrossOrigin("*")
    public TimeKeeping createTimeKeeping(
            @RequestBody TimeKeeping timeKeeping,
            @PathVariable(value = "empcode") String empcode) throws Exception {
        Employee e = empRepo.findByEmployeeCode(empcode);
        timeKeeping.setCreateDate(LocalDateTime.now());
        timeKeeping.setTimeCheckCodeOfEmp(e.getTimeCheckCode());
        timeKeeping.setEmployee(e);
        return tkpRepo.save(timeKeeping);
    }
    
    
}
