package com.caterpie.timeletter.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.caterpie.timeletter.dto.LetterInfoDto;
import com.caterpie.timeletter.dto.ClubUser;
import com.caterpie.timeletter.entity.Club;
import com.caterpie.timeletter.entity.ClubDetailUser;
import com.caterpie.timeletter.entity.ClubList;
import com.caterpie.timeletter.entity.User;

@Repository
public interface ClubRepository extends JpaRepository<Club, Integer> {
	Club findByClubName(String clubName);
	
	Club findByClubId(int clubId);
	
	@Query(value="select c.user_id, c.club_id, c.club_profile, c.club_desc, c.club_name, count(m.user_id) members FROM club c inner join club_has_member m on c.club_id = m.club_id and  c.club_id in ( select club_id from club_has_member where user_id = ? ) group by c.club_id;", nativeQuery=true)
	List<Map<ClubList, Object>> findClubIdIn(int userId);
	
	
	@Transactional
	@Modifying
	@Query(value="delete from club_has_member where club_id = ?", nativeQuery=true)
	void delAllMember(int clubId);
	
	
	@Transactional
	@Modifying
	@Query(value="delete from club_has_member where club_id = ? and user_id = ?", nativeQuery=true)
	void deleteMember(int clubId, int userId);

	
	@Transactional
	@Modifying
	@Query(value="insert into club_has_member values(?, ?)", nativeQuery=true)
	void joinClub(int userId, int clubId);
	
	
	@Query(value="select club_id from club_has_member where user_id = ?", nativeQuery=true)
	List<Integer> findMyClub(int userId);
	

	@Query(value="select c.user_id, c.club_id, c.club_profile, c.club_desc, c.club_name, count(m.user_id) members FROM club c inner join club_has_member m on c.club_id = m.club_id group by c.club_id", nativeQuery=true)
	List<Map<ClubList, Object>> findClubList();
	
	
	@Query(value="select u.user_id, name, phone_number from (user u inner join club_has_member m on u.user_id = m.user_id) where club_id = ?", nativeQuery=true)
	List<Map<ClubDetailUser, Object>> findDetailUser(int clubId);
	
	@Query(value="select title, open_date, is_private, is_open, name, letter_code from letter inner join user on letter.user_id = user.user_id where club_id= ? and is_open = 1;", nativeQuery=true)
	List<Map<LetterInfoDto, Object>> findOpenedLetters(int clubId);
	
	@Query(value="select title, open_date, is_private, is_open, name, letter_code from letter inner join user on letter.user_id = user.user_id where club_id= ? and is_open = 0;", nativeQuery=true)
	List<Map<LetterInfoDto, Object>> findClosedLetters(int clubId);

	@Query(value="select user_id, name, email from user where name like :word%", nativeQuery=true)
	List<Map<ClubUser, Object>> findUserName(@Param("word") String word);
		
}

