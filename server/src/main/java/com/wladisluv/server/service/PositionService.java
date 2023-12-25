package com.wladisluv.server.service;

import com.wladisluv.server.exception.EmployeeNotFoundException;
import com.wladisluv.server.model.Position;
import com.wladisluv.server.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PositionService implements IPositionService{
    private final PositionRepository positionRepository;

    @Override
    public List<Position> getPositions() {
        return positionRepository.findAll();
    }
    @Override
    public Position addPosition(Position position) {
        return positionRepository.save(position);
    }
    @Override
    public Optional<Position> updatePosition(Position position, Long id) {
        return positionRepository.findById(id).map(pos -> {
            pos.setTitle(position.getTitle());
            return positionRepository.save(pos);
        });
    }

    @Override
    public Optional<Position> getPositionById(Long id) {
        return positionRepository.findById(id);
    }

    @Override
    public void deletePosition(Long id) {
        positionRepository.deleteById(id);
    }
}
