package com.macia.HRs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"EVL_ID"})
@ToString(exclude = {"employee"})
@NamedQueries({
})
public class Event_Log implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EVL_ID")
    private Integer EVL_ID;

    @Column(nullable = false, name = "DateTime")
    private LocalDateTime DateTime;

    @Column(nullable = false, name = "Reader")
    private Integer reader;

    @Column(nullable = false, name = "EventData")
    private Integer eventData;

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
    @JoinColumn(name = "EMP_ID")
    private Employee employee;
}