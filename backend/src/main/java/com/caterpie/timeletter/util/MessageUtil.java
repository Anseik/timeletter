package com.caterpie.timeletter.util;

import java.util.HashMap;

import org.json.simple.JSONObject;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;


public class MessageUtil {

	public void sendSms(String phoneNumber, String letterCode) {

        String api_key = "NCSPLPODIRAYBMGH";
        String api_secret = "TAT6Q8S0TM4PHKCQWLBOUFX3VH2K91H1";
        Message coolsms = new Message(api_key, api_secret);
        HashMap<String, String> params = new HashMap<String, String>();

        params.put("to", phoneNumber);
        params.put("from", "01047539502");
        params.put("type", "LMS");
        params.put("text", "[TimeLetter] ssafy1님께서 보낸 타임레터가 도착하였습니다. 접속하기 >> https://k4d105.p.ssafy.io/letter/detail/"+letterCode);
        params.put("app_version", "test app 1.2");

        try {
            JSONObject obj = (JSONObject) coolsms.send(params);
            System.out.println(obj.toString());
        } catch (CoolsmsException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getCode());
        }
    }
	
//	public static void main(String[] args) {
//		new MessageUtil().sendSms();
//	}
}