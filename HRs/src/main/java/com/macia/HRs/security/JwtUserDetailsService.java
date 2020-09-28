package com.macia.HRs.security;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.macia.HRs.entity.JwtUser;
import com.macia.HRs.repository.JwtUserRepository;
@Service
public class JwtUserDetailsService implements UserDetailsService {	
	@Autowired
	private JwtUserRepository jwtUserRepo;	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		JwtUser user = jwtUserRepo.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}
}

