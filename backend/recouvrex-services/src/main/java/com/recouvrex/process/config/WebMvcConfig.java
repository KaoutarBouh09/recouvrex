// package com.recouvrex.process.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// /*
//  * we will need to enabel this cors configuration if we
//  * disable the security 
//  */

// @Configuration
// public class WebMvcConfig implements WebMvcConfigurer {

//   @Override
//   public void addCorsMappings(CorsRegistry registry) {
//     registry.addMapping("/**")
//         .allowedMethods("*")
//         .allowedOrigins("http://localhost:5173")
//         .allowedHeaders("*")
//         .allowCredentials(false)
//         .maxAge(-1);
//         }
// }
