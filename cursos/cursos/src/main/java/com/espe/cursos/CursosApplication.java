package com.espe.cursos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableFeignClients // Habilitar Feign
@SpringBootApplication
public class CursosApplication {

	public static void main(String[] args) {
		SpringApplication.run(CursosApplication.class, args);
	}

	// Configuración de CORS
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**") // Permite CORS en todas las rutas bajo /api
						.allowedOrigins("http://localhost:3000") // Permite solicitudes desde el frontend
						.allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos HTTP permitidos
						.allowedHeaders("*") // Headers permitidos
						.allowCredentials(true); // Permite cookies y autenticación
			}
		};
	}
}