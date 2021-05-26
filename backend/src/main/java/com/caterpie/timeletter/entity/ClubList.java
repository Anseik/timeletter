package com.caterpie.timeletter.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/*
 * 그룹 리스트 페이지에서 사용될 entity
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class ClubList {
	@Id
	@Column(name = "club_id")
	private int clubId;
	@Column(length=10,nullable =false)
	private String clubName;
	@Column(length=100)
	private String clubProfile;
	@Column(length=256)
	private String clubDesc;
	private int userId;
	private int members;
	
}

