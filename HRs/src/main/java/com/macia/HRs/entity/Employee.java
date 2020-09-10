package com.macia.HRs.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.macia.HRs.utility.Gender;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"EMP_ID"})
@ToString(exclude = {"department"})
@NamedQueries({
        @NamedQuery(name = "employee_findAll",
                query = "SELECT e FROM Employee e"),
        @NamedQuery(name = "employee_findByFirstName",
                query = "SELECT e FROM Employee e WHERE e.firstName = :firstName"),
        @NamedQuery(name = "employee_findAllEmployeeByFirstName",
                query = "from Employee e where LOWER(e.firstName) like '%' || :firstname ||'%'"),
})
public class Employee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMP_ID")
    private Integer EMP_ID;

    @Column(unique = true, name = "Code", length = 10)
    private String employeeid;

    @Column(nullable = false, name = "FirstName", length = 20)
    private String firstName;

    @Column(nullable = false, name = "LastName", length = 20)
    private String lastName;

    @Transient
    private String fullName;

    @Column(nullable = false, name = "StartDate")
    private LocalDate startdate;

    @Column(nullable = false, name = "EndDate")
    private LocalDate enddate;

    @Enumerated(EnumType.ORDINAL)
    private Gender gender;


    @CreationTimestamp
    @Column(nullable = false, name = "CreateDate")
    private LocalDateTime createdate;

    @Column(nullable = false, name = "CreateBy")
    private Integer createby;

    @Column(name = "ModifyDate")
    private LocalDateTime modifyDate;

    @Column(name = "ModifyBy")
    private Integer modifyby;


    @Column(name = "isDeleted")
    private Boolean isdeleted;

    @ManyToOne
    @JoinColumn(name = "DEP_ID")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "POS_ID")
    private Position position;


    @JsonIgnore
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            mappedBy = "employee",
            fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Employee_Shift> employee_shifts;


    public String getFullName() {
        StringBuilder fullName = new StringBuilder();
        return fullName.append(lastName).append(" ").append(firstName).toString();
    }
}
