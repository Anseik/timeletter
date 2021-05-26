package com.caterpie.timeletter.service;

import com.caterpie.timeletter.dto.ClubDetailDto;
import com.caterpie.timeletter.dto.ClubDto;
import com.caterpie.timeletter.dto.ClubLettersDto;

public interface ClubService {
	void insertClub(ClubDto clubReq);
	void deleteClub(int clubId);
	void joinClub(int userId, int clubId);
	ClubDetailDto findClubDetail(int clubId, int userId);
	ClubLettersDto findLetters(int clubId);
}
