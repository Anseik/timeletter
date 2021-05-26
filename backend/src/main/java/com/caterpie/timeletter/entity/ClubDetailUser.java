package com.caterpie.timeletter.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ClubDetailUser {
	@Id
	private int userId;
	private String name;
	private String phoneNumber;
}
