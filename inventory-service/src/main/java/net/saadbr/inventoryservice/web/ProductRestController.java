package net.saadbr.inventoryservice.web;

import net.saadbr.inventoryservice.entities.Product;
import net.saadbr.inventoryservice.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author saade
 **/
@RestController
@RequestMapping("/api")
public class ProductRestController {
    private ProductRepository productRepository;

    public ProductRestController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    @GetMapping("/products")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }
    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable String id) {
        return productRepository.findById(id).get();
    }
}
