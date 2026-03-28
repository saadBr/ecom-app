package net.saadbr.inventoryservice;

import net.saadbr.inventoryservice.entities.Product;
import net.saadbr.inventoryservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.UUID;

@SpringBootApplication
public class InventoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(ProductRepository productRepository) {
		return args -> {
			productRepository.save(Product.builder().id("P01").name("Computer").price(13000).quantity(20).build());
			productRepository.save(Product.builder().id("P02").name("Printer").price(3500).quantity(5).build());
			productRepository.save(Product.builder().id("P03").name("Phone").price(11000).quantity(10).build());
		};
	}
}
