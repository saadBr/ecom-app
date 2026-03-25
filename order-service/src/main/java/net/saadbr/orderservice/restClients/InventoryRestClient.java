package net.saadbr.orderservice.restClients;

import net.saadbr.orderservice.entities.ProductItem;
import net.saadbr.orderservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * @author saade
 **/
@FeignClient(url = "http://localhost:8089", name = "inventory-service")
public interface InventoryRestClient {
    @GetMapping("/api/products")
    public List<Product> getAllProducts();
    @GetMapping("/api/products/{id}")
    Product findProductById(@PathVariable String id);
}
