package com.macia.HRs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
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

    @Column(name = "PositionName", length = 50, unique = true,nullable = false)
    private String positionName;

    @CreationTimestamp
    @Column(name = "CreateDate")
    private LocalDateTime createDate;

    @Column(name = "CreateBy")
    private Integer createBy;

    @UpdateTimestamp
    @Column(name = "ModifyDate")
    private LocalDateTime modifyDate;

    @Column(name = "ModifyBy")
    private Integer modifyDy;

    @Column(name = "IsDeleted")
    private Boolean isDeleted;

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            mappedBy = "position",
            fetch = FetchType.LAZY, orphanRemoval = false)
    private List<Employee> employees;
}
