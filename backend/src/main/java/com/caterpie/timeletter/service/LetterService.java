package com.caterpie.timeletter.service;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.caterpie.timeletter.dto.LetterDto;
import com.caterpie.timeletter.dto.LetterInfoDto;
import com.caterpie.timeletter.entity.Letter;
import com.caterpie.timeletter.entity.User;

public interface LetterService {
	/* C :: 레터 생성 */
	int createLetter(LetterDto letterDto, int userId);
	void saveFile(int letterId, String url) throws Exception;
	
	/* R :: 레터 조회 */
	long countLetter();
	Optional<Letter> retrieveLetter(String letterCode);
	List<LetterInfoDto> getAllLetters(User user);
	
	/* R :: 영상 조회 */
	File retrieveFile(int letterId);
	
	/* R :: 레터 삭제(롤백) */
	void deleteLetter(int letterId);
	
	
}
