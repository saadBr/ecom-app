package net.saadbr.orderservice.web;

import net.saadbr.orderservice.entities.Order;
import net.saadbr.orderservice.repositories.OrderRepository;
import net.saadbr.orderservice.restClients.InventoryRestClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author saade
 **/
@RestController
@RequestMapping("/api")
public class OrderRestControllers {
    private OrderRepository orderRepository;
    private InventoryRestClient inventoryRestClient;

    public OrderRestControllers(OrderRepository orderRepository, InventoryRestClient inventoryRestClient) {
        this.orderRepository = orderRepository;
        this.inventoryRestClient = inventoryRestClient;
    }

    @GetMapping("/orders")
    public List<Order> findAllOrders() {
        List<Order> allOrders = orderRepository.findAll();
        return allOrders;
    }
    @GetMapping("/orders/{id}")
    public Order findOrderById(@PathVariable String id) {
        Order order = orderRepository.findById(id).get();
        order.getItems().forEach(item -> {
            item.setProduct(inventoryRestClient.findProductById(item.getProductId()));
        });
        return order;
    }
}
