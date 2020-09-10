package com.macia.HRs.service;

import com.macia.HRs.entity.Employee;
import com.macia.HRs.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Service
public class EmployeeService {
    @PersistenceContext
    EntityManager em;

    @Autowired
    EmployeeRepository empRepo;

    //Using Maned Query
    public List<Employee> findEmployeeByFirstName(String fistname){
        Query query =  em.createNamedQuery("employee_findAllEmployeeByFirstName", Employee.class);
        query.setParameter("firstname", fistname.toLowerCase());
        return query.getResultList();
    }
}
