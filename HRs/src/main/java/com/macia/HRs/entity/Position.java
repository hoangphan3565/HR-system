package com.macia.HRs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@EqualsAndHashCode(exclude = {"POS_ID"})
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "department.findAll",
                query = "SELECT p FROM Position p"),
        @NamedQuery(name = "department.findByName",
                query = "SELECT p FROM Position p WHERE p.positionName = :posname"),
        @NamedQuery(name = "department.findAllDepartmentByName",
                query = "from Position p where LOWER(p.positionName) like '%' || :posname ||'%'"),
})

public class Position implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POS_ID")
    private Integer POS_ID;

    @Column(name = "PositionName", length = 50, unique = true)
    private String positionName;


    @JsonIgnore
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            mappedBy = "position",
            fetch = FetchType.LAZY, orphanRemoval = false)
    private List<Employee> employees;
}
