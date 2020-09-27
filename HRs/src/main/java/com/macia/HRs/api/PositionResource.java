package com.macia.HRs.api;

import com.macia.HRs.entity.Position;
import com.macia.HRs.repository.PositionRepository;
import com.macia.HRs.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/positions")
public class PositionResource {

    @Autowired
    private PositionRepository PositionRepository;

    @Autowired
    private PositionService posService;

    @GetMapping()
    @ResponseBody
    public List<Position> getAllPosition(){
        return posService.findAllAvailable();
    }

    @GetMapping("/count")
    @CrossOrigin("*")
    public Long count() {

        return PositionRepository.count();
    }
    @DeleteMapping("/{id}/uid/{uid}")
    public Map<String, Boolean> deletePosition(@PathVariable(value = "id") Integer PositionId,@PathVariable(value = "uid") Integer uid) throws Exception {
        Position Position =
                PositionRepository
                        .findById(PositionId)
                        .orElseThrow(() -> new ResourceNotFoundException("Position not found on :: " + PositionId));
        Position.setIsDeleted(Boolean.TRUE);
        Position.setModifyBy(uid);
        PositionRepository.save(Position);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Position> getPositionById(@PathVariable(value = "id") Integer PositionId)
            throws ResourceNotFoundException {
        Position Position =
                PositionRepository
                        .findById(PositionId)
                        .orElseThrow(() -> new ResourceNotFoundException("Position not found on :: " + PositionId));
        return ResponseEntity.ok().body(Position);
    }
    //findAllLikeName
    @GetMapping("/find/{name}")
    @ResponseBody
    @CrossOrigin("*")
    public List<Position> getPositionLikeName(@PathVariable(value = "name") String posname)
            throws ResourceNotFoundException {
       return posService.findAllLikeName(posname);
    }

    
    @PostMapping("/uid/{Uid}")
    @ResponseBody
    public Position createPosition(@RequestBody Position Position,@PathVariable int Uid) {
        return PositionRepository.save(Position);
    }

    
    @PutMapping("/{id}/uid/{uid}")
    @ResponseBody
    public ResponseEntity<Position> updatePosition(
            @PathVariable(value = "id") Integer PositionId,
            @PathVariable(value = "uid") Integer uid,
            @RequestBody Position PositionDetails)
            throws ResourceNotFoundException {
        Position Position =
                PositionRepository
                        .findById(PositionId)
                        .orElseThrow(() -> new ResourceNotFoundException("Position not found on :: " + PositionId));
        Position.setPositionName(PositionDetails.getPositionName());
        Position.setModifyBy(uid);
        final Position updatedPosition = PositionRepository.save(Position);
        return ResponseEntity.ok(updatedPosition);
    }
}