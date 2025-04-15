package weg.projetofinal.Imobiliaria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity
public class HavApplication {

	public static void main(String[] args) {

		SpringApplication.run(HavApplication.class, args);
	}
}
