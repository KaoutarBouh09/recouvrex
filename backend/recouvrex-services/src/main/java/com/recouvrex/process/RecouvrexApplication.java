package com.recouvrex.process;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.recouvrex.process.service.ReminderService;

@EnableScheduling
@SpringBootApplication
public class RecouvrexApplication {


  public static void main(String... args) {
    SpringApplication.run(RecouvrexApplication.class, args);
  }
  @Bean
  CommandLineRunner run(ReminderService reminderService) {
        return args -> {
            reminderService.sendOverdueReminders();
        };
    }
  
}
