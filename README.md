# Secured E-Commerce Microservices App (Spring Boot + Angular + Keycloak)

A microservices-based application to manage **products**, **orders**, and **order details** with secure authentication and authorization using **Keycloak**.

The backend is built with **Spring Boot**, **Spring Security**, and **OpenFeign**, while the frontend is an **Angular** application consuming protected APIs.

---

## Architecture overview

### Backend

#### inventory-service
Manages product data.

Exposes APIs for:
- listing products
- retrieving product details

#### order-service
Manages orders and order items.

Exposes APIs for:
- listing orders
- retrieving order details

For order details, the service aggregates order items with product information coming from `inventory-service` using **OpenFeign**.

#### Keycloak
Handles:
- authentication
- login
- token generation
- secured access to backend services

### Frontend (Angular)

#### ecom-frontend
UI for:
- Products
- Orders
- Order Details

The Angular app authenticates users with **Keycloak** and consumes the protected backend APIs using bearer tokens.

---

## Services & default ports (typical setup)

| Service | Role | Port |
|---|---|---:|
| Keycloak | Authentication / Identity Provider | 8090 |
| inventory-service | Products API | 8089 |
| order-service | Orders API | 8091 |
| angular client | Web UI | 4200 |

---

## Run order

Start services in this order for the smoothest startup:

1. Keycloak
2. inventory-service
3. order-service
4. Angular frontend

### Quick checks

- Keycloak: `http://localhost:8090`
- Inventory service: `http://localhost:8089`
- Order service: `http://localhost:8091`
- Angular app: `http://localhost:4200`

---

## API routes (examples)

### Inventory service
- Products: `http://localhost:8089/api/products`
- Product details: `http://localhost:8089/api/products/{id}`

### Order service
- Orders: `http://localhost:8091/api/orders`
- Order details: `http://localhost:8091/api/orders/{id}`

---

## Frontend (Angular)

The Angular app:

- Lists Products
- Lists Orders
- Displays Order Details with itemized products and totals

The frontend is styled using **Bootstrap**.

---

## Security flow

This project demonstrates a secured communication flow using **JWT**:

1. User logs in with **Keycloak**
2. Angular receives an access token
3. Angular calls protected backend APIs with the bearer token
4. `order-service` validates the token
5. `order-service` calls `inventory-service` using **OpenFeign**
6. The JWT is propagated between services for secured communication

---

## Tech stack

- Java 21
- Spring Boot 3.x
- Spring Security OAuth2 Resource Server
- OpenFeign
- Spring Data JPA
- H2 Database
- Angular
- keycloak-angular
- Bootstrap
- Keycloak

---

## Author

**Saad EL MABROUK**
