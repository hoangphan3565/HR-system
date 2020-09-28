package com.macia.HRs.security;
import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor	//need default constructor for JSON Parsing
@AllArgsConstructor
public class JwtRequest implements Serializable {
	private String username;
	private String password;
}