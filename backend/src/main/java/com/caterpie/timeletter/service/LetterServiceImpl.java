package com.caterpie.timeletter.service;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caterpie.timeletter.dto.LetterDto;
import com.caterpie.timeletter.dto.LetterInfoDto;
import com.caterpie.timeletter.entity.Letter;
import com.caterpie.timeletter.entity.Target;
import com.caterpie.timeletter.entity.User;
import com.caterpie.timeletter.repository.LetterRepository;
import com.caterpie.timeletter.repository.TargetRepository;
import com.caterpie.timeletter.repository.UserRepository;
import com.caterpie.timeletter.util.RandomStringUtil;

@Service
public class LetterServiceImpl implements LetterService {

	private static final Logger logger = LoggerFactory.getLogger(LetterServiceImpl.class);
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private LetterRepository letterRepo;
	
	@Autowired
	private TargetRepository targetRepo;
	
	@Override
	public int createLetter(LetterDto letterDto, int userId){
		
		// user_has_letter에 업데이트
		Letter letter = Letter.builder()
				.title(letterDto.getTitle())
				.message(letterDto.getMessage())
				.openDate(letterDto.getOpenDate())
				.latitude(new BigDecimal(letterDto.getLatitude()))
				.longitude(new BigDecimal(letterDto.getLongitude()))
				.isPrivate(letterDto.isPrivate())
				.isOpen(letterDto.isOpen())
				.userId(userId)
				.clubId(letterDto.getClubId())
				.letterCode(new RandomStringUtil().rand())
				.build();
		
		int letterId = -1;
		try {
			Letter result = letterRepo.save(letter);
			letterId = result.getLetterId();
			
			User user = userRepo.findById(userId).get();
			List<Letter> letters = user.getLetters();
			letters.add(letter);
			user.setLetters(letters);
			userRepo.save(user);
						
			List<String> list = letterDto.getPhoneNumber();
			if (list.isEmpty()) list.add(user.getPhoneNumber());
			list.stream().forEach(s -> {
				Target target = Target.builder()
						.letterId(result.getLetterId())
						.phoneNumber(s)
						.build();
				targetRepo.save(target);
			});
		} catch (Exception e) {
			logger.error("Error Occurs!!", e);
		}
		
		return letterId;

	}

	@Override
	public void saveFile(int letterId, String url) throws Exception {
		
		Letter letter = letterRepo.findById(letterId).get();
		logger.info(letter.toString());
		letter.setUrl(url);
		letterRepo.save(letter);
		
	}

	@Override
	public Optional<Letter> retrieveLetter(String letterCode) {
		// 유저 아이디 확인
		return letterRepo.findByLetterCode(letterCode);

	}
	
	@Override
	public List<LetterInfoDto> getAllLetters(User user) {
		
		// 유저 휴대폰 번호 가지고 오기
		String phoneNumber = user.getPhoneNumber();
		// target table과 letter 테이블을 조인해서 새로운 테이블 생성
		// 해당 테이블에서 유저 휴대폰 번호와 일치하는 정보 가지고 오기
		Iterator<Target> iter = targetRepo.findAllByPhoneNumber(phoneNumber).iterator();
		List<Letter> letters = new ArrayList<>();
		
		while (iter.hasNext()) {
			Target t = iter.next();
			Optional<Letter> l = letterRepo.findOneByLetterId(t.getLetterId());
			if (l.isPresent()) letters.add(l.get());
		}
		
		// 해당 레터의 소유자 id를 가지고 유저 정보 찾기
		// 둘을 매핑하여 반환?
		List<LetterInfoDto> arr = new ArrayList<>();
		letters.stream().forEach(letter -> {
			Optional<User> opt = userRepo.findById(letter.getUserId());
			if (opt.isPresent()) {
				new LetterInfoDto();
				LetterInfoDto letterInfo = LetterInfoDto.builder()
									.userName(opt.get().getName())
									.title(letter.getTitle())
									.openDate(letter.getOpenDate())
									.isPrivate(letter.isPrivate())
									.isOpen(letter.isOpen())
									.letterCode(letter.getLetterCode())
									.build();
				arr.add(letterInfo);
			}
		});
		
		
		return arr;
	}

	@Override
	public File retrieveFile(int letterId) {
		Optional<Letter> opt = letterRepo.findById(letterId);
		if (!opt.isPresent()) return null;
		String url = opt.get().getUrl();
		File file = new File(url);
		if (!file.canRead()) return null;
		return file;
	}

	@Override
	public void deleteLetter(int letterId) {
		letterRepo.deleteById(letterId);
	}

	@Override
	public long countLetter() {
		long cnt = letterRepo.count();
		return cnt;
	}

}
