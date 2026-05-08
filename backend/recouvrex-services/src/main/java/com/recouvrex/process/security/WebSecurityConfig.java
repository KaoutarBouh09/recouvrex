package com.recouvrex.process.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

        private final JwtAuthConverter jwtAuthConverter;

        // ✅ Chain 1 : routes publiques — SANS JWT, priorité haute
        @Bean
        @Order(1)
        public SecurityFilterChain publicFilterChain(HttpSecurity http) throws Exception {
                http
                        .securityMatcher("/public/**", "/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui/index.html")
                        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                        .csrf(csrf -> csrf.disable())
                        .cors(Customizer.withDefaults())
                        .sessionManagement(session -> session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
                return http.build();
        }

        // ✅ Chain 2 : routes protégées — AVEC JWT
        @Bean
        @Order(2)
        public SecurityFilterChain securedFilterChain(HttpSecurity http) throws Exception {
                return http
                        .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/api", "/api/**")
                                .hasAnyRole(RECOUVREX_ADMIN, RECOUVREX_MANAGER, RECOUVREX_USER, RECOUVREX_REGION_RESPONSABLE, RECOUVREX_RECOVERY_AGENT)
                                .anyRequest().authenticated()
                        )
                        .oauth2ResourceServer(oauth2 -> oauth2
                                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthConverter)))
                        .sessionManagement(session -> session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                        .cors(Customizer.withDefaults())
                        .build();
        }

        public static final String RECOUVREX_USER = "RECOUVREX_USER";
        public static final String RECOUVREX_MANAGER = "RECOUVREX_MANAGER";
        public static final String RECOUVREX_ADMIN = "RECOUVREX_ADMIN";
        public static final String RECOUVREX_REGION_RESPONSABLE = "RECOUVREX_REGION_RESPONSABLE";
        public static final String RECOUVREX_RECOVERY_AGENT = "RECOUVREX_RECOVERY_AGENT";
}