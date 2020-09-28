package com.macia.HRs.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.macia.HRs.entity.JwtUser;
@Repository
public interface JwtUserRepository extends JpaRepository<JwtUser,Integer> {
	public JwtUser findByUsername(String username);
}
