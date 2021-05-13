package com.caterpie.timeletter.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.caterpie.timeletter.dto.ClubJoinDto;
import com.caterpie.timeletter.entity.Club;
import com.caterpie.timeletter.entity.ClubDetailUser;
import com.caterpie.timeletter.entity.ClubList;

@Repository
public interface ClubRepository extends JpaRepository<Club, Integer> {
	Club findByClubName(String clubName);
	
	Club findByClubId(int clubId);
	
	List<Club> findByClubIdIn(List<Integer> clubList);
	
	
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
	
	
	@Query(value="select u.user_id, name from (user u inner join club_has_member m on u.user_id = m.user_id) where club_id = ?", nativeQuery=true)
	List<Map<ClubDetailUser, Object>> findDetailUser(int clubId);
}

