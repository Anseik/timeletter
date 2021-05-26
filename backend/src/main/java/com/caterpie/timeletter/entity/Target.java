package com.caterpie.timeletter.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="target")
@NoArgsConstructor
public class Target {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int targetId;
	
	@Column(length=45, nullable=true)
	private String phoneNumber;
	
	@Column
	private int letterId;
	
	
	@Builder
	public Target(int targetId, String phoneNumber, int letterId) {
		super();
		this.targetId = targetId;
		this.phoneNumber = phoneNumber;
		this.letterId = letterId;
	}
	
	
	
}
