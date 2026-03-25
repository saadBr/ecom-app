package net.saadbr.orderservice;

import net.saadbr.orderservice.entities.Order;
import net.saadbr.orderservice.entities.OrderState;
import net.saadbr.orderservice.entities.ProductItem;
import net.saadbr.orderservice.model.Product;
import net.saadbr.orderservice.repositories.OrderRepository;
import net.saadbr.orderservice.repositories.ProductRepository;
import net.saadbr.orderservice.restClients.InventoryRestClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(OrderRepository orderRepository, ProductRepository productRepository, InventoryRestClient inventoryRestClient) {
		return args -> {
			List<Product> allProducts = inventoryRestClient.getAllProducts();
			for (int i = 0; i < 5; i++) {
				Order order = Order.builder()
						.id(UUID.randomUUID().toString())
						.date(LocalDate.now())
						.state(OrderState.PENDING)
						.build();
				orderRepository.save(order);
				allProducts.forEach(p->{
					ProductItem productItem = ProductItem.builder()
							.productId(p.getId().toString())
							.quantity(new Random().nextInt(10))
							.price(p.getPrice())
							.order(order)
							.build();
					productRepository.save(productItem);
				});
			}
		};
	}
}
