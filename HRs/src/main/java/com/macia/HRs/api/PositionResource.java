package com.macia.HRs.api;

import com.macia.HRs.entity.Position;
import com.macia.HRs.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/positions")
public class PositionResource {

    @Autowired
    private PositionRepository PositionRepository;


    @GetMapping()
    public List<Position> getAllPosition(){
        return PositionRepository.findAll();
    }

    @GetMapping("/count")
    public Long count() {

        return PositionRepository.count();
    }
    @DeleteMapping("/{id}")
    public Map<String, Boolean> deletePosition(@PathVariable(value = "id") Integer PositionId) throws Exception {
        Position Position =
                PositionRepository
                        .findById(PositionId)
                        .orElseThrow(() -> new ResourceNotFoundException("Position not found on :: " + PositionId));
        PositionRepository.delete(Position);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Position> getPositionById(@PathVariable(value = "id") Integer PositionId)
            throws ResourceNotFoundException {
        Position Position =
                PositionRepository
                        .findById(PositionId)
                        .orElseThrow(() -> new ResourceNotFoundException("Position not found on :: " + PositionId));
        return ResponseEntity.ok().body(Position);
    }


    @PostMapping("")
    public Position createPosition(@RequestBody Position Position) {
        return PositionRepository.save(Position);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Position> updatePosition(
            @PathVariable(value = "id") Integer PositionId, @RequestBody Position PositionDetails)
            throws ResourceNotFoundException {
        Position Position =
                PositionRepository
                        .findById(PositionId)
                        .orElseThrow(() -> new ResourceNotFoundException("Position not found on :: " + PositionId));
        Position.setPositionName(PositionDetails.getPositionName());
        final Position updatedPosition = PositionRepository.save(Position);
        return ResponseEntity.ok(updatedPosition);
    }
}