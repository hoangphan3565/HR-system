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
@EqualsAndHashCode(exclude = {"SIF_ID"})
@NamedQueries({
        @NamedQuery(name = "shift_findAll",
                query = "SELECT e FROM Shift e"),
        @NamedQuery(name = "shift_findAllshiftByFirstName",
                query = "from Shift e where LOWER(e.shiftName) like '%' || :firstname ||'%'"),
})
public class Shift implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SIF_ID")
    private Integer SIF_ID;

    @Column(unique = true, name = "ShiftName", length = 10)
    private String shiftName;

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

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            mappedBy = "employee",
            fetch = FetchType.LAZY, orphanRemoval = false)
    private List<Employee_Shift> employee_shifts;

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            mappedBy = "shift",
            fetch = FetchType.LAZY, orphanRemoval = false)
    private List<Shift_Daily> shift_dailies;
}