package com.caterpie.timeletter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling   
public class TimeletterApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimeletterApplication.class, args);
	}

}
