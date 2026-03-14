package net.saadbr.inventoryservice.web;

import net.saadbr.inventoryservice.entities.Product;
import net.saadbr.inventoryservice.repository.ProductRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
    @PreAuthorize("hasAuthority('USER')")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }
    @GetMapping("/products/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Product getProduct(@PathVariable String id) {
        return productRepository.findById(id).get();
    }
    @GetMapping("/auth")
    public Authentication authenticate(Authentication authentication) {
        return authentication;
    }
}

