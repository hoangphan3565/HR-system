package com.macia.HRs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"EMS_ID"})
@ToString(exclude = {"employee"})
@NamedQueries({
        @NamedQuery(name = "employeeshift_findAllAvailable",
                query = "SELECT es FROM Employee_Shift es where es.isdeleted=false"),
        @NamedQuery(name = "employeeshift_findByDepId",
                query = "from Employee_Shift es where es.employee.department.DEP_ID=:depid"),
        @NamedQuery(name = "employeeshift_findByEmpCode",
                query = "from Employee_Shift es where LOWER(es.employee.employeeCode) like '%' || LOWER(:empcode) ||'%'"),
})
public class Employee_Shift implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMS_ID")
    private Integer EMS_ID;

    @Column(nullable = false, name = "StartDate")
    private LocalDate startdate;

    @Column(nullable = false, name = "EndDate")
    private LocalDate enddate;

    @CreationTimestamp
    @Column(name = "CreateDate")
    private LocalDateTime createdate;

    @Column(name = "CreateBy")
    private Integer createby;

    @UpdateTimestamp
    @Column(name = "ModifyDate")
    private LocalDateTime modifyDate;

    @Column(name = "ModifyBy")
    private Integer modifyBy;

    @Column(name = "isDeleted")
    private Boolean isdeleted;



    @ManyToOne
    @JoinColumn(name = "EMP_ID")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "SIF_ID")
    private Shift shift;

}