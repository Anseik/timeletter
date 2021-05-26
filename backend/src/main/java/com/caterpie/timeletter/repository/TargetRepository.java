package com.caterpie.timeletter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caterpie.timeletter.entity.Target;

public interface TargetRepository extends JpaRepository<Target, Integer> {

	Iterable<Target> findAllByPhoneNumber(String phonenumber);
}
