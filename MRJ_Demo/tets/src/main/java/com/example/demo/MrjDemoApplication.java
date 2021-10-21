package com.example.demo;

import com.example.demo.properties.FileUploadProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
	FileUploadProperty.class
})
public class MrjDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MrjDemoApplication.class, args);
	}

}
