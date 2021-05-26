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
public class Alarm {
	@Id
	@Column(name = "user_id", columnDefinition = "INT")
	private int userId;
	@Column(name = "letter_id", columnDefinition = "INT")
	private int letterId;
	
	@Builder
	public Alarm(int userId, int letterId) {
		super();
		this.userId = userId;
		this.letterId = letterId;
	}
}
