package com.macia.HRs.repository;

import com.macia.HRs.entity.Department;
import com.macia.HRs.entity.Employee;
import com.macia.HRs.entity.Position;
import com.macia.HRs.utility.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findByDepartment(Optional<Department> dept);
    List<Employee> findByPosition(Optional<Position> pos);
    List<Employee> findByGender(Gender gender);
    List<Employee> findByFirstName(String firstname);

    @Modifying
    @Query("select e from Employee e LEFT JOIN FETCH e.department")
    List<Employee> findAllWithouyNplusOne();
}