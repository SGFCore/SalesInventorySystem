package dev.uit.project.service;

import dev.uit.project.dto.OrderDetailDTO;
import dev.uit.project.entity.Combo;
import dev.uit.project.entity.Order;
import dev.uit.project.entity.Orderdetail;
import dev.uit.project.entity.Product;
import dev.uit.project.repository.ComboRepository;
import dev.uit.project.repository.OrderDetailRepository;
import dev.uit.project.repository.OrderRepository;
import dev.uit.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ComboRepository comboRepository;

    public List<OrderDetailDTO> list() {
        return orderDetailRepository.findAll()
                .stream()
                .map(OrderDetailDTO::fromEntity)
                .toList();
    }

    public OrderDetailDTO get(Long id) {
        return orderDetailRepository.findById(id)
                .map(OrderDetailDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Order detail not found: " + id));
    }

    public OrderDetailDTO create(OrderDetailDTO dto) {
        Orderdetail entity = convertToEntity(dto);
        Orderdetail saved = orderDetailRepository.save(entity);
        return OrderDetailDTO.fromEntity(saved);
    }

    public OrderDetailDTO update(Long id, OrderDetailDTO dto) {
        Orderdetail existing = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order detail not found: " + id));

        if (dto.getOrderid() != null) {
            Order order = orderRepository.findById(dto.getOrderid())
                    .orElseThrow(() -> new RuntimeException("Order not found: " + dto.getOrderid()));
            existing.setOrderid(order);
        }
        if (dto.getProductid() != null) {
            Product prod = productRepository.findById(dto.getProductid())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + dto.getProductid()));
            existing.setProductid(prod);
        } else {
            existing.setProductid(null);
        }
        if (dto.getComboid() != null) {
            Combo combo = comboRepository.findById(dto.getComboid())
                    .orElseThrow(() -> new RuntimeException("Combo not found: " + dto.getComboid()));
            existing.setComboid(combo);
        } else {
            existing.setComboid(null);
        }

        existing.setQuantity(dto.getQuantity());
        existing.setUnitprice(dto.getUnitprice());
        existing.setDiscountamount(dto.getDiscountamount());
        existing.setTotalamount(dto.getTotalamount());

        Orderdetail updated = orderDetailRepository.save(existing);
        return OrderDetailDTO.fromEntity(updated);
    }

    public void delete(Long id) {
        if (!orderDetailRepository.existsById(id)) {
            throw new RuntimeException("Order detail not found: " + id);
        }
        orderDetailRepository.deleteById(id);
    }

    private Orderdetail convertToEntity(OrderDetailDTO dto) {
        Orderdetail entity = new Orderdetail();
        if (dto.getOrderid() != null) {
            Order order = orderRepository.findById(dto.getOrderid())
                    .orElseThrow(() -> new RuntimeException("Order not found: " + dto.getOrderid()));
            entity.setOrderid(order);
        }
        if (dto.getProductid() != null) {
            Product prod = productRepository.findById(dto.getProductid())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + dto.getProductid()));
            entity.setProductid(prod);
        }
        if (dto.getComboid() != null) {
            Combo combo = comboRepository.findById(dto.getComboid())
                    .orElseThrow(() -> new RuntimeException("Combo not found: " + dto.getComboid()));
            entity.setComboid(combo);
        }
        entity.setQuantity(dto.getQuantity());
        entity.setUnitprice(dto.getUnitprice());
        entity.setDiscountamount(dto.getDiscountamount());
        entity.setTotalamount(dto.getTotalamount());
        return entity;
    }
}
