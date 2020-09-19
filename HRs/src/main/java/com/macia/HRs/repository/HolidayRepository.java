package com.macia.HRs.repository;

import org.springframework.stereotype.Repository;

import com.macia.HRs.entity.Holiday;

import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Integer> {
}
