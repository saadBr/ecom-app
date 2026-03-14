package net.saadbr.inventoryservice.repository;

import net.saadbr.inventoryservice.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author saade
 **/
public interface ProductRepository extends JpaRepository<Product, String> {
}
