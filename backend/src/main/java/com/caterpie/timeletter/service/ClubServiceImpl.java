package com.caterpie.timeletter.service;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.caterpie.timeletter.dto.ClubDetailDto;
import com.caterpie.timeletter.dto.ClubDto;
import com.caterpie.timeletter.dto.ClubLettersDto;
import com.caterpie.timeletter.dto.LetterDto;
import com.caterpie.timeletter.entity.Club;
import com.caterpie.timeletter.entity.ClubDetailUser;
import com.caterpie.timeletter.entity.ClubList;
import com.caterpie.timeletter.repository.ClubRepository;

@Service
public class ClubServiceImpl implements ClubService {
	
	@Autowired
	private ClubRepository clubRepository;
	
	@Transactional 
	public void insertClub(ClubDto clubReq) { 
		Club club = Club.builder()
				.clubName(clubReq.getClubName())
				.userId(clubReq.getMasterId())
				.clubDesc(clubReq.getDesc())
				.clubProfile(clubReq.getProfile())
				.build();
		clubRepository.save(club);
	}
	
	@Transactional
	public void deleteClub(@RequestParam int clubId){
		clubRepository.deleteById(clubId);
    }

	@Transactional
	public void joinClub(int userId, int clubId) {
		clubRepository.joinClub(userId, clubId);
	}
	
	@Override
	public ClubDetailDto findClubDetail(int clubId, int userId) {
		
		Club club = clubRepository.findByClubId(clubId);
		List<Map<ClubDetailUser, Object>> cdUser = clubRepository.findDetailUser(clubId);
		
		//요청한 유저가 클럽장인지 클럽멤버인지
		boolean isMaster = false;
		if(club.getUserId() == userId)
			isMaster = true;
		
		ClubDetailDto clubDetail = ClubDetailDto.builder()
				.isMaster(isMaster)
				.clubDesc(club.getClubDesc())
				.clubName(club.getClubName())
				.clubProfile(club.getClubProfile())
				.clubId(club.getClubId())
				.members(cdUser)
				.build();
		return clubDetail;
	}

	@Override
	public ClubLettersDto findLetters(int clubId) {
		ClubLettersDto cld = new ClubLettersDto();
		cld.setOpenedLetter(clubRepository.findOpenedLetters(clubId));
		cld.setClosedLetter(clubRepository.findClosedLetters(clubId));
		return cld;
	
	}
	
}
