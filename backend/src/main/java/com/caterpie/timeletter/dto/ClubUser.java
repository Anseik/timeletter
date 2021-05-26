package com.caterpie.timeletter.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClubUser {
	private int userId;
	private String name;
	private String email;
}
