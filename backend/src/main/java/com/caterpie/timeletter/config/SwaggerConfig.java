package com.caterpie.timeletter.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.caterpie.timeletter.controller.UserController;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.groupName("Time Letter")
				.apiInfo(apiInfo())
				.select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .securityContexts(Arrays.asList(securityContext()))
		        .securitySchemes(Arrays.asList(apiKey()));
	}
	
	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Time Letter")
				.description("TimeLetter")
				.termsOfServiceUrl("")
				.license("Time Letter")
				.licenseUrl("gustjq2167@naver.com")
				.version("1.0")	
				.build();
				

	}
	
	private ApiKey apiKey() {
		return new ApiKey("JWT","Authorization","header");
	}
	
	private SecurityContext securityContext() {
        return SecurityContext.builder()
        		.securityReferences(defaultAuth())
//        		.operationSelector(Predicate<OperationContext> selector)
        		.build();
    }

    List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
    }
}