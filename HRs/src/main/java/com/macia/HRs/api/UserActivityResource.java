package com.macia.HRs.api;

import com.macia.HRs.entity.User_Activity;
import com.macia.HRs.repository.UserActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/useractivities")
public class UserActivityResource {

    @Autowired
    private UserActivityRepository UserActivityRepository;


    @GetMapping()
    public List<User_Activity> getAllUserActivity(){
        return UserActivityRepository.findAll();
    }

    @GetMapping("/count")
    public Long count() {
        return UserActivityRepository.count();
    }
    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUserActivity(@PathVariable(value = "id") Integer UserActivityId) throws Exception {
        User_Activity UserActivity =
                UserActivityRepository
                        .findById(UserActivityId)
                        .orElseThrow(() -> new ResourceNotFoundException("UserActivity not found on :: " + UserActivityId));
        UserActivityRepository.delete(UserActivity);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User_Activity> getUserActivityById(@PathVariable(value = "id") Integer UserActivityId)
            throws ResourceNotFoundException {
        User_Activity UserActivity =
                UserActivityRepository
                        .findById(UserActivityId)
                        .orElseThrow(() -> new ResourceNotFoundException("UserActivity not found on :: " + UserActivityId));
        return ResponseEntity.ok().body(UserActivity);
    }


    @PostMapping("")
    public User_Activity createUserActivity(@RequestBody User_Activity UserActivity) {
        return UserActivityRepository.save(UserActivity);
    }
}