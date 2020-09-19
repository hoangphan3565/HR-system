package com.macia.HRs.repository;
import com.macia.HRs.entity.Department;
import com.macia.HRs.entity.Employee;
import com.macia.HRs.entity.Position;
import com.macia.HRs.entity.TimeKeeping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeKeepingRepository extends JpaRepository<TimeKeeping, Integer> {
}