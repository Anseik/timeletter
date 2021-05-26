package com.caterpie.timeletter.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JoinDto {
	private String email;
	private String password;
	private String name;
	private String phoneNumber;
}