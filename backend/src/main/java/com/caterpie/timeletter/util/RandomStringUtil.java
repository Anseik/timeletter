package com.caterpie.timeletter.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Random;

public class RandomStringUtil {

	private final int LEFT_LIMIT = 48;
	private final int RIGHT_LIMIT = 122;
	private final int STRING_LENGTH = 10;
	
	public String rand() {
		Random random = new Random();
		
		String res = random.ints(LEFT_LIMIT,RIGHT_LIMIT+1)
						.filter(i -> (i<=57 || i>=65) && (i<=90||i>=97))
						.limit(STRING_LENGTH)
						.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
						.toString();
		
		SimpleDateFormat sdf = new SimpleDateFormat("MMddhhmmss");
		String time = sdf.format(new Timestamp(System.currentTimeMillis()));
		
		StringBuilder sb = new StringBuilder().append(time);
		for (int i=0;i<time.length();++i) {
			if (i%2==0) sb.setCharAt(i, res.charAt(i));
		}
		
		
		return sb.toString();
	}
	
//	public static void main(String[] args) {
//		System.out.println(new RandomUtil().rand());
//	}
	
}
