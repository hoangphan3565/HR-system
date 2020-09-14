package com.macia.HRs.entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.macia.HRs.utility.Gender;
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
import java.time.LocalTime;
import java.util.List;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"DLS_ID"})
@NamedQueries({
})
public class Daily_Shcedule implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DLS_ID")
    private Integer DLS_ID;

    @Column(unique = true, name = "Name", length = 100,nullable = false)
    private String Name;

    @Column(name = "StartTime")
    private LocalTime startTime;

    @Column(name = "EndTime")
    private LocalTime endTime;

    @CreationTimestamp
    @Column(nullable = false, name = "CreateDate")
    private LocalDateTime createdate;

    @Column(nullable = false, name = "CreateBy")
    private Integer createby;

    @UpdateTimestamp
    @Column(name = "ModifyDate")
    private LocalDateTime modifyDate;

    @Column(name = "ModifyBy")
    private Integer modifyby;

    @Column(name = "isDeleted")
    private Boolean isdeleted;

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            mappedBy = "shift",
            fetch = FetchType.LAZY, orphanRemoval = false)
    private List<Shift_Daily> shift_dailies;
}