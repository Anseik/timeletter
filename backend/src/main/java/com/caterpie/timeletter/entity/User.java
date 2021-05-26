package com.caterpie.timeletter.entity;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

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
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id", columnDefinition = "INT UNSIGNED")
	private int userId;
	@Column(length=45,nullable =false)
	private String email;
	@Column(length=20,nullable =false)
	private String name;
	@Column(length=256,nullable =false)
	private String profile;
	@Column(length=64,nullable =false)
	private String password;
	@Column(length=20,nullable =false)
	private String phoneNumber;
	@JsonIgnore
	@Column(name="activated")
	private boolean activated;
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private Club club;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="user_id", referencedColumnName="user_id")
	private List<Letter> letters;
	
	@ManyToMany
	@JoinTable(
			name="user_has_authority",
			joinColumns = {@JoinColumn(name= "user_id", referencedColumnName= "user_id")},
			inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
	private Set<Authority> authorities;

	@Builder
	public User(String email, String name, String profile, String password, String phoneNumber, boolean activated,
			Set<Authority> authorities, List<Letter> letters) {
		super();
		this.email = email;
		this.name = name;
		this.profile = profile;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.activated = activated;
		this.authorities = authorities;
		this.letters = letters;
	}
}

