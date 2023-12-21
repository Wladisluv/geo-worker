package com.wladisluv.server.controller;

import com.wladisluv.server.model.Employee;
import com.wladisluv.server.model.Position;
import com.wladisluv.server.service.IPositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/positions")
@RequiredArgsConstructor
public class PositionController {
    private final IPositionService positionService;
    @GetMapping
    public ResponseEntity<List<Position>> getPositions() {
        return new ResponseEntity<>(positionService.getPositions(), HttpStatus.OK);
    }
    @PostMapping
    public Position addPosition(@RequestBody Position position){
        return positionService.addPosition(position);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Position> updatePosition(@RequestBody Position position, @PathVariable Long id) {
        Optional<Position> updatedPosition = positionService.updatePosition(position, id);
        return updatedPosition.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePosition(@PathVariable Long id) {
        positionService.deletePosition(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/position/{id}")
    public ResponseEntity<Position> getPositionById(@PathVariable Long id) {
        Optional<Position> position = positionService.getPositionById(id);
        return position.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}