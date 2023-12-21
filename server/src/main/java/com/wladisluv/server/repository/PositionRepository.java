package com.wladisluv.server.repository;

import com.wladisluv.server.model.Employee;
import com.wladisluv.server.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository  extends JpaRepository<Position, Long> {

}
