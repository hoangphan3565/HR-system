package com.macia.HRs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"SDL_ID"})
@NamedQueries({
})
public class Shift_Daily implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SDL_ID")
    private Integer SDL_ID;

    @Column(nullable = false, name = "DayOfWeek")
    private Integer DayOfWeek;



    @CreationTimestamp
    @Column(nullable = false, name = "CreateDate")
    private LocalDateTime createDate;

    @Column(nullable = false, name = "CreateBy")
    private Integer createBy;

    @UpdateTimestamp
    @Column(name = "ModifyDate")
    private LocalDateTime modifyDate;

    @Column(name = "ModifyBy")
    private Integer modifyDy;

    @Column(name = "IsDeleted")
    private Boolean isDeleted;



    @ManyToOne
    @JoinColumn(name = "SIF_ID")
    private Shift shift;

    @ManyToOne
    @JoinColumn(name = "DLS_ID")
    private Daily_Schedule daily_schedule;


}