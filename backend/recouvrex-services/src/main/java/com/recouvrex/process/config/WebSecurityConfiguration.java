/*package com.recouvrex.process.config;

import com.recouvrex.process.security.JwtAuthConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

    private final JwtAuthConverter jwtAuthConverter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        http.authorizeHttpRequests()
                 .requestMatchers("/camunda/**", "/api", "/swagger-ui/**", "/v3/api-docs/**", "/api/case/**").permitAll()
                .requestMatchers("/api/tutorial/**").hasRole("USER")
                .requestMatchers("/api/tutorials/**").hasRole("USER")
                .requestMatchers("/api/test").hasRole("ADMIN");
                //.anyRequest().authenticated();
         //.anyRequest().permitAll();
        http.logout().disable().formLogin().disable().authorizeHttpRequests().requestMatchers("/**").permitAll();
        http.oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(jwtAuthConverter);
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }
}*/