package com.caterpie.timeletter.service;

import java.util.List;
import java.util.Optional;

import com.caterpie.timeletter.dto.JoinDto;
import com.caterpie.timeletter.dto.UserModifyDto;
import com.caterpie.timeletter.entity.User;

public interface UserService {
	
	/* C :: 회원 가입 */
	void insertUser(JoinDto joinReq);
	
	/* R :: 회원 정보 가져오기 */
	Optional<User> getUserWithAuthorities(String email);
	Optional<User> getCurrentUserWithAuthorities();
	Optional<User> getUserById(int userId);
	
	/* U :: 회원 가입 수정 */
	void updateUser(UserModifyDto modReq);
	
	/* D :: 회원 정보 삭제 */
	void deleteUser(int userId);
	
	
}
