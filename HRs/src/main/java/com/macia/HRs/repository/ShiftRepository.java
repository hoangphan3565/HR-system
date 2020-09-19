package com.macia.HRs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.macia.HRs.entity.Shift;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Integer> {

}
