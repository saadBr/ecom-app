package net.saadbr.orderservice.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * @author saade
 **/
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Product {
    private String id;
    private String name;
    private double price;
    private int quantity;
}
