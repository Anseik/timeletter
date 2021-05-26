package com.caterpie.timeletter.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.caterpie.timeletter.dto.LetterInfoDto;
import com.caterpie.timeletter.entity.User;
import com.caterpie.timeletter.repository.AlarmRepository;
import com.caterpie.timeletter.service.AlarmService;
import com.caterpie.timeletter.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/alarm")
public class AlarmController {
	static final Logger logger = LoggerFactory.getLogger(AlarmController.class);
	@Autowired
	AlarmService alarmService;
	@Autowired
	private UserService userService;
	
	/**
	 * @apiNote 알람 조회 기능
	 * @return LetterInfoDto
	 */
	@GetMapping("/letters")
	@ApiOperation(value = "알람 조회 기능", notes = "종버튼 클릭시 API 요청")
	public List<Map<LetterInfoDto, Object>> getAlarms(){
		Optional<User> opt = Optional.ofNullable(userService.getCurrentUserWithAuthorities().orElse(null));
		if (opt == null) throw new RuntimeException("User Not Found");
		
		return alarmService.getAlarms(opt.get().getUserId());
	}
	
	/**
	 * @apiNote 알람창에서 레터조회시 해당 알람 삭제
	 * @return 
	 */
	@DeleteMapping("/letter")
	@ApiOperation(value = "확인한 알람 삭제", notes = "알람창에서 알람 클릭시 letter_id를 받아 해당 알람삭제")
	public ResponseEntity<String> deleteAlarm(@RequestParam("id") int letterId){
		Optional<User> opt = Optional.ofNullable(userService.getCurrentUserWithAuthorities().orElse(null));
		if (opt == null) throw new RuntimeException("User Not Found");
		alarmService.deleteAlarm(opt.get().getUserId(), letterId);
		return new ResponseEntity<String>("success",HttpStatus.OK);
	}
}
