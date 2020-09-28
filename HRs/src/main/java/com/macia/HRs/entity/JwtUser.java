package com.macia.HRs.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
@Entity
@Data
public class JwtUser {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Integer id;
@Column(unique=true)
private String username;
private String password;
private String fullname;
}
