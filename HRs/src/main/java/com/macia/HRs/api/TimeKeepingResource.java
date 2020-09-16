package com.macia.HRs.api;

import com.macia.HRs.entity.Department;
import com.macia.HRs.entity.Employee;
import com.macia.HRs.entity.Position;
import com.macia.HRs.repository.PositionRepository;
import com.macia.HRs.repository.TimeKeepingRepository;
import com.macia.HRs.service.TimeKeepingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timekeepings")
public class TimeKeepingResource {

    @Autowired
    private TimeKeepingService tkpService;

    @Autowired
    private TimeKeepingRepository tkpRepo;

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
}
