package com.wladisluv.server.service;

import com.wladisluv.server.model.Position;

import java.util.List;
import java.util.Optional;

public interface IPositionService {
    Position addPosition(Position position);
    List<Position> getPositions();
    Optional<Position> updatePosition(Position position, Long id);
    Optional<Position> getPositionById(Long id);
    void deletePosition(Long id);
}
