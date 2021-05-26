package com.caterpie.timeletter.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Club {

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
		
	
	@Builder
	public Club(String clubName, int userId, String clubDesc, String clubProfile) {
		super();
		this.clubName = clubName;
		this.userId = userId;
		this.clubDesc = clubDesc;
		this.clubProfile = clubProfile;
	}
	
}
