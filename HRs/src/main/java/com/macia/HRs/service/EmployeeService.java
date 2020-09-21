package com.macia.HRs.service;

import com.macia.HRs.entity.Employee;
import com.macia.HRs.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import java.util.List;

@Service
public class EmployeeService {
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private EmployeeRepository empRepo;

    //Using Maned Query
    public List<Employee> findEmployeeByFirstName(String fistname){
        Query query =  em.createNamedQuery("employee_findAllEmployeeByFirstName", Employee.class);
        query.setParameter("firstname", fistname.toLowerCase());
        return query.getResultList();
    }

    //Using NamedStoredProcedure
    @SuppressWarnings("unchecked")
    public List<Employee> findAllEmpViaProcByFirstName(String firstname) {
        StoredProcedureQuery storedProcedureQuery = this.em.createNamedStoredProcedureQuery("named_getEmployeeLikeName");
        storedProcedureQuery.setParameter("firstname", firstname);
        storedProcedureQuery.execute();
        return storedProcedureQuery.getResultList();
    }
}
