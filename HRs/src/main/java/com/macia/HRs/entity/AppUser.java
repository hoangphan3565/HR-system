package com.macia.HRs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@EqualsAndHashCode(exclude = {"USR_ID"})
@NoArgsConstructor
@AllArgsConstructor

public class AppUser implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USR_ID")
    private Integer USR_ID;

    @Column(length = 100, nullable = false)
    private String fullName;

    @Column( length = 100, nullable = false, unique = true)
    private String username;

    @Column(length = 200, nullable = false)
    private String password;
}