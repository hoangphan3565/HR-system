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
    @JoinColumn(name = "SIF_ID")
    private Shift shift;

    @ManyToOne
    @JoinColumn(name = "DLS_ID")
    private Daily_Shcedule daily_shcedule;


}