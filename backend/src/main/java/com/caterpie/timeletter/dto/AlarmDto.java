package com.caterpie.timeletter.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AlarmDto {
	private int user_id;
	private int letter_id;
	private int club_id;
	private String phone_number;
	private String letter_code;
	
}
