package com.macia.HRs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.macia.HRs.entity.Department;
import com.macia.HRs.entity.Employee;
import com.macia.HRs.entity.Employee_Shift;
import com.macia.HRs.entity.Position;
import com.macia.HRs.entity.Shift;


@Repository
public interface Employee_Shift_Repository extends JpaRepository<Employee_Shift, Integer> {
	List<Employee> findByDepartment(Optional<Department> dept);
    List<Employee> findByPosition(Optional<Position> pos);
    List<Employee> findByFirstName(String firstname);
    List<Shift> findByEmployee(Optional<Employee> emp);
    List<Shift> findByID(Optional<Shift> shift);

//    @Modifying
//    @Query("select * from employee_shift")
//    List<Employee_Shift> findAll();
}
