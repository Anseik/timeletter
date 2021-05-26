package com.caterpie.timeletter.service;

import java.util.List;
import java.util.Map;

import com.caterpie.timeletter.dto.LetterInfoDto;

public interface AlarmService {

	List<Map<LetterInfoDto, Object>> getAlarms(int userId);

	void deleteAlarm(int userId, int letterId);

}
