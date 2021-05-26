package com.caterpie.timeletter.dto;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClubLettersDto {
	private List<Map<LetterInfoDto, Object>> openedLetter;
	private List<Map<LetterInfoDto, Object>> closedLetter;
}

