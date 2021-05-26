package com.caterpie.timeletter.entity;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Letter {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "letter_id", columnDefinition = "INT")
	private int letterId;
	@Column(length=100,nullable=false)
	private String title;
	@Column(length=256,nullable=true)
	private String url;
	@Column(length=100,nullable=true)
	private String message;
	@Column(length=100,nullable=false)
	private String openDate;
	@Column(name="latitude",nullable=true)
	private BigDecimal latitude;
	@Column(name="longitude",nullable=true)
	private BigDecimal longitude;
	@Column(name="is_private")
	private boolean isPrivate;
	@Column(name="is_open")
	private boolean isOpen;
	@Column(name="user_id")
	private int userId;
	@Column(name="club_id")
	private int clubId;
	@Column(name="letter_code")
	private String letterCode;

	
	@OneToMany(fetch=FetchType.LAZY)
	@JoinColumn(name="letterId")
	private List<Target> targets;
	
	
	@Builder
	public Letter(int letterId, String title, String url, String message, String openDate, BigDecimal latitude,
			BigDecimal longitude, boolean isPrivate, boolean isOpen, int userId, int clubId, String letterCode, List<Target> targets) {
		super();
		this.letterId = letterId;
		this.title = title;
		this.url = url;
		this.message = message;
		this.openDate = openDate;
		this.latitude = latitude;
		this.longitude = longitude;
		this.isPrivate = isPrivate;
		this.isOpen = isOpen;
		this.userId = userId;
		this.clubId = clubId;
		this.letterCode = letterCode;
		this.targets = targets;
	}

}
