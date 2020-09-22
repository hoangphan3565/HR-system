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
    public List<Employee> getEmloyeeByDepartmentAndPosition(int deptid,int posid){
		Query query=em.createQuery("from Employee e where e.department.DEP_ID=:deptid and e.position.POS_ID=:posid",Employee.class);
		query.setParameter("deptid",deptid);
		query.setParameter("posid",posid);
		return query.getResultList();	
	}
    
    public List<Employee> getEmloyeeByCodeAndPosition(String code,int posid){
		Query query=em.createQuery("from Employee e where e.employeeCode=:code and e.position.POS_ID=:posid",Employee.class);
		query.setParameter("code",code);
		query.setParameter("posid",posid);
		return (List<Employee>) query.getResultList();	
	}
    public List<Employee> getEmloyeeByCodeAndDepartment(String code,int deptid){
		Query query=em.createQuery("from Employee e where e.employeeCode=:code and e.department.DEP_ID=:deptid",Employee.class);
		query.setParameter("code",code);
		query.setParameter("deptid",deptid);
		return (List<Employee>) query.getResultList();	
	}
    public List<Employee> getEmloyeeByCodeAndDepartmentAndPosition(String code,int deptid,int posid){
  		Query query=em.createQuery("from Employee e where e.employeeCode=:code and e.department.DEP_ID=:deptid and e.position.POS_ID=:posid",Employee.class);
  		query.setParameter("code",code);
  		query.setParameter("deptid",deptid);
  		query.setParameter("posid",posid);
  		return (List<Employee>) query.getResultList();	
  	}
}
