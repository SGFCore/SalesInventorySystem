package dev.uit.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy; // 1. Thêm dòng import này

@SpringBootApplication
@EnableAspectJAutoProxy // 2. Thêm công tắc này để bật Camera giám sát (AOP)
public class ProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }

}