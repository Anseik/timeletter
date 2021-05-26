package com.caterpie.timeletter.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.caterpie.timeletter.dto.ClubDetailDto;
import com.caterpie.timeletter.dto.ClubDto;
import com.caterpie.timeletter.dto.ClubJoinDto;
import com.caterpie.timeletter.dto.ClubLettersDto;
import com.caterpie.timeletter.dto.ClubUser;
import com.caterpie.timeletter.dto.ClubWord;
import com.caterpie.timeletter.dto.LetterDto;
import com.caterpie.timeletter.entity.Club;
import com.caterpie.timeletter.entity.ClubList;
import com.caterpie.timeletter.entity.User;
import com.caterpie.timeletter.repository.ClubRepository;
import com.caterpie.timeletter.service.ClubService;
import com.caterpie.timeletter.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/club")
public class ClubController {
	static final Logger logger = LoggerFactory.getLogger(ClubController.class);
	@Autowired
	private ClubRepository clubRepository;
	@Autowired
	ClubService service;
	@Autowired
	private UserService userService;
	
	/**
	 * @apiNote 클럽 생성 기능
	 * @return HttpStatus
	 */
	@Transactional()
	@PostMapping(path="/insert")
	@ApiOperation(value = "클럽생성하기", notes = "클럽생성")
	public ResponseEntity<String> insertClub(@RequestBody ClubDto clubReq) {
		try {
			Optional<User> opt = Optional.ofNullable(userService.getCurrentUserWithAuthorities().orElse(null));
			if (opt == null) throw new RuntimeException("User Not Found");
			clubReq.setMasterId(opt.get().getUserId());	//Master_id 설정
			
			service.insertClub(clubReq);	//클럽생성
			
			Club newClub = clubRepository.findByClubName(clubReq.getClubName());	//생성된 클럽
			service.joinClub(clubReq.getMasterId(), newClub.getClubId() );	//마스터 클럽가입
			
			int memLen = clubReq.getMembersId().size();
			for(int i=0; i<memLen; i++) {	//멤버수만큼 클럽가입
				service.joinClub(clubReq.getMembersId().get(i), newClub.getClubId());
			}
		}catch (Exception e) {
			return new ResponseEntity<String>("fail",HttpStatus.BAD_REQUEST);		
		}
		return new ResponseEntity<String>("OK",HttpStatus.CREATED);
	}
	
	
	/**
	 * @apiNote 전체 클럽 조회 기능
	 * @return List<Club>
	 */
	@GetMapping("/findAll")
	@ApiOperation(value = "전체 클럽조회", notes = "클럽조회")
	public List<Club> findAll() {
		return clubRepository.findAll();
	}

	
	/**
	 * @apiNote 클럽 가입(초대) 기능
	 * @return HttpStatus
	 */
	@PostMapping(path="/join")
	@ApiOperation(value = "클럽가입(초대)하기", notes = "가입 클럽하기")
	public ResponseEntity<String> insertClub(@RequestBody ClubJoinDto joinReq) {
		try {
			service.joinClub(joinReq.getUserId(), joinReq.getClubId());
		}catch (Exception e) {
			return new ResponseEntity<String>("fail",HttpStatus.BAD_REQUEST);		
		}
		return new ResponseEntity<String>("OK",HttpStatus.CREATED);
	}
	
	
	/**
	 * @apiNote 내가 가입한 클럽 조회 기능
	 * @return List<Club>
	 */
	@GetMapping("/findMyClub")
	@ApiOperation(value = "user_id로 가입된 클럽 찾기", notes = "가입된 클럽조회")
	public List<Map<ClubList, Object>> findByUserId() {
		Optional<User> opt = Optional.ofNullable(userService.getCurrentUserWithAuthorities().orElse(null));
		if (opt == null) throw new RuntimeException("User Not Found");
		
		return clubRepository.findClubIdIn(opt.get().getUserId());
	}
	
	
	/**
	 * @apiNote 클럽 목록 조회 기능
	 * @return List<Map<ClubList, Object>>
	 */
	@GetMapping("/findClubList")
	@ApiOperation(value = "클럽 리스트 보기", notes = "클럽 리스트 페이지에서 사용될 API")
	public List<Map<ClubList, Object>> findClubList() {
		return clubRepository.findClubList();
	}
	
	
	/**
	 * @apiNote 클럽 상세 정보 조회 기능
	 * @return ClubDetailDto
	 */
	@GetMapping("/findDetail")
	@ApiOperation(value = "club_id로 클럽 디테일 정보 조회", notes = "클럽 디테일 페이지에서 사용될 API")
	public ClubDetailDto findClubDetail(@RequestParam("id") int clubId) {
		Optional<User> opt = Optional.ofNullable(userService.getCurrentUserWithAuthorities().orElse(null));
		if (opt == null) throw new RuntimeException("User Not Found");
		return service.findClubDetail(clubId, opt.get().getUserId());
	}
	
	
	/**
	 * @apiNote 클럽(멤버 포함) 삭제
	 * @return HttpStatus
	 */
	@DeleteMapping("/delClub")
	@ApiOperation(value = "club_id로 클럽 삭제", response = String.class)
	public ResponseEntity<String> delpost(@RequestParam("id") int clubId) {
		try {
			clubRepository.delAllMember(clubId);	//club_member테이블에서 club_id로 삭제
			clubRepository.deleteById(clubId);		//club테이블에서 club_id로 삭제
		}catch (Exception e) {
			return new ResponseEntity<String>("fail",HttpStatus.BAD_REQUEST);
		}   	
		return new ResponseEntity<String>("success",HttpStatus.OK);
	}
	
	
	/**
	 * @apiNote 클럽 멤버 삭제
	 * @return HttpStatus
	 */
	@DeleteMapping("/delMember")
	@ApiOperation(value = "user_id로 멤버 삭제", notes = "클럽 디테일 페이지에서 멤버 삭제기능")
	public ResponseEntity<String> delMember(@RequestBody ClubJoinDto delReq) {
		try {
			clubRepository.deleteMember(delReq.getClubId(), delReq.getUserId());
		}catch (Exception e) {
			return new ResponseEntity<String>("fail",HttpStatus.BAD_REQUEST);
		}   	
		return new ResponseEntity<String>("success",HttpStatus.OK);
	}
	
	
	/**
	 * @apiNote 클럽의 레터 조회
	 * @return ClubLetters
	 */
	@GetMapping("/findLetters")
	@ApiOperation(value = "club_id로 클럽 레터들 조회", notes = "클럽 디테일 페이지에서 레터조회 API")
	public ClubLettersDto findLetters(@RequestParam("id") int clubId) {
		return service.findLetters(clubId);
	}
	
	
	/**
	 * @apiNote 글자가 포함된 유저이름,email 조회
	 * @return ClubUser
	 */
	@GetMapping("/findWord")
	@ApiOperation(value = "글자가 포함된 유저이름,email 조회", notes = "글자로 유저 조회(Keyboard On API")
	public List<Map<ClubUser, Object>> findUserName(@RequestParam String word) {
		return clubRepository.findUserName(word);
	}
}
