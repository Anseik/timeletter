package com.caterpie.timeletter.util;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

import ws.schild.jave.Encoder;
import ws.schild.jave.MultimediaObject;
import ws.schild.jave.encode.AudioAttributes;
import ws.schild.jave.encode.EncodingAttributes;
import ws.schild.jave.encode.VideoAttributes;
import ws.schild.jave.encode.enums.X264_PROFILE;
import ws.schild.jave.info.VideoSize;

public class EncoderUtil {

	public String encode(MultipartFile origin, String path) {
		String url = "";
		try {
			url = path+origin.getOriginalFilename();			
			File source = new File(url);			

			url = path+"encoded_"+origin.getOriginalFilename();
			File target = new File(url);
			
			// Convert audio
			AudioAttributes audio = new AudioAttributes();
			audio.setCodec("aac");
			audio.setBitRate(70000);
			audio.setChannels(1);
			audio.setSamplingRate(44100);
			
			// Convert video
			VideoAttributes video = new VideoAttributes();
			video.setCodec("h264");
			video.setX264Profile(X264_PROFILE.BASELINE);
			
			video.setBitRate(2336000);
			video.setFrameRate(30);
			video.setSize(new VideoSize(720,960));
			
			// Declare Encoding Attributes
			EncodingAttributes attrs = new EncodingAttributes();
			attrs.setOutputFormat("mp4");
			attrs.setOutputFormat("mp4");
			attrs.setAudioAttributes(audio);
			attrs.setVideoAttributes(video);
			
			Encoder encoder = new Encoder();  
			encoder.encode(new MultimediaObject(source), target, attrs);

		} catch (Exception e) {
			e.printStackTrace();
			
		}
		
		return url;
	}


}
