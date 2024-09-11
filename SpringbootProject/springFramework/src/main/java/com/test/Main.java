package com.test;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.test.mapper")

public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
