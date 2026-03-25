package net.saadbr.orderservice.repositories;

import net.saadbr.orderservice.entities.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author saade
 **/
public interface ProductRepository extends JpaRepository<ProductItem, Long> {
}
