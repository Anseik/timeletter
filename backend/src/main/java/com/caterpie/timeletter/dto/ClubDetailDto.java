package com.caterpie.timeletter.dto;

import java.util.List;
import java.util.Map;

import com.caterpie.timeletter.entity.ClubDetailUser;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * 그룹 디테일 페이지에서 사용될 Dto
 */

@Getter
@Setter
@NoArgsConstructor
public class ClubDetailDto {
	private int clubId;
	private String clubName;
	private String clubProfile;
	private String clubDesc;
	private boolean isMaster;
	private List<Map<ClubDetailUser, Object>> members;
	
	
	@Builder
	public ClubDetailDto(int clubId, String clubName, String clubProfile, String clubDesc, List<Map<ClubDetailUser, Object>> members, boolean isMaster) {
		super();
		this.clubName = clubName;
		this.clubDesc = clubDesc;
		this.clubProfile = clubProfile;
		this.clubId = clubId;
		this.members = members;
		this.isMaster = isMaster;
	}
}
