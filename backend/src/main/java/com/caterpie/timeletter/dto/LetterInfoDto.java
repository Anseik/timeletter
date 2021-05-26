package com.caterpie.timeletter.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LetterInfoDto {
	private String userName;
	private String title;
	private String openDate;
	private boolean isPrivate;
	private boolean isOpen;
	private String letterCode;
	
	@Builder
	public LetterInfoDto(String userName, String title, String openDate, boolean isPrivate, boolean isOpen,
			String letterCode) {
		super();
		this.userName = userName;
		this.title = title;
		this.openDate = openDate;
		this.isPrivate = isPrivate;
		this.isOpen = isOpen;
		this.letterCode = letterCode;
	}
}
