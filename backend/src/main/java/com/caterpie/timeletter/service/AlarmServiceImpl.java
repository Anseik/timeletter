package com.caterpie.timeletter.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caterpie.timeletter.dto.LetterInfoDto;
import com.caterpie.timeletter.entity.Alarm;
import com.caterpie.timeletter.repository.AlarmRepository;

@Service
public class AlarmServiceImpl implements AlarmService{
	@Autowired
	private AlarmRepository alarmRepository;

	@Override
	public List<Map<LetterInfoDto, Object>> getAlarms(int userId) {
		//alarm테이블에서 user_id에 해당되는 알람들(letter_id)
		List<Map<Alarm, Object>> myAlarms = alarmRepository.findALLByUserId(userId);	
		
		//알람들(letter_id)에 해당되는 레터정보들 리스트로 셋팅
		List<Map<LetterInfoDto, Object>> list = new ArrayList<Map<LetterInfoDto, Object>>();
		for(int i=0, l=myAlarms.size(); i<l; i++) {
			list.add(alarmRepository.getLetter((int) myAlarms.get(i).get("letter_id")));
		}
		return list;
	}

	@Override
	public void deleteAlarm(int userId, int letterId) {
		alarmRepository.deleteAlarm(userId, letterId);
	}
	
	
	
	
	
	
	
	
}
