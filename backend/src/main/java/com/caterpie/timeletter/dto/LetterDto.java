package com.caterpie.timeletter.dto;


import java.util.List;


import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class LetterDto {
	private int clubId;
	private String title;
	private String message;
	private String openDate;
	private String latitude;
	private String longitude;
	private boolean isPrivate;
	private boolean isOpen;
	private List<String> phoneNumber;
}
