package com.caterpie.timeletter.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.caterpie.timeletter.entity.Letter;

public interface LetterRepository extends JpaRepository<Letter, Integer> {

	@EntityGraph(attributePaths = "targets")
	// 타겟 리스트를 이미들고와야한다.
	Optional<Letter> findOneByLetterId(int letterId);
	
	Optional<Letter> findByLetterCode(String letterCode);

	Set<Letter> findAllByIsOpenEqualsAndOpenDateEquals(boolean isOpen, String time);

	Set<Letter> findAllByIsOpenEqualsAndOpenDateEqualsAndClubIdGreaterThan(boolean isOpen, String time, int clubId);
}
