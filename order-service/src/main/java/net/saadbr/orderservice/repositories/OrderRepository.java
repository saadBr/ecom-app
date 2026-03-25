package net.saadbr.orderservice.repositories;

import net.saadbr.orderservice.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author saade
 **/
public interface OrderRepository extends JpaRepository<Order, String> {
}
