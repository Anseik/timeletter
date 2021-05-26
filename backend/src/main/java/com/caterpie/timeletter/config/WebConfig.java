package com.caterpie.timeletter.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
	  registry.addMapping("/**")
      .allowedOrigins("*")
      .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
      .allowedHeaders("*");
  }
  
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
//    registry.addResourceHandler("/videos/**").addResourceLocations("/videos/");
    registry.addResourceHandler("/videos/**").addResourceLocations("file:///" + "/videos" + "/");
//    registry.addResourceHandler("/videos/**").addResourceLocations("classpath:/videos/");
  }
}
