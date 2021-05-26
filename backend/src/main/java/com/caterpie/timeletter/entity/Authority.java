package com.caterpie.timeletter.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "authority")
@Getter
@Setter
@NoArgsConstructor
public class Authority {

   @Id
   @Column(name = "authority_name", length = 50)
   private String authorityName;

   @Builder
   public Authority(String authorityName) {
		super();
		this.authorityName = authorityName;
	}
   
   
   
}