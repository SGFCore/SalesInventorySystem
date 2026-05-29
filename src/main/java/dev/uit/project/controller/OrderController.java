package dev.uit.project.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.uit.project.dto.OrderDTO;
import dev.uit.project.service.OrderService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    
    /**
     * Lấy danh sách tất cả đơn hàng
     * GET /orders
     */
    @GetMapping
    public ResponseEntity<List<OrderDTO>> list() {
        return ResponseEntity.ok(orderService.list());
    }
    
    /**
     * Lấy thông tin đơn hàng theo ID
     * GET /orders/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.get(id));
    }
    
    /**
     * Tạo mới một đơn hàng
     * POST /orders
     */
    @PostMapping
    public ResponseEntity<OrderDTO> create(@RequestBody OrderDTO orderDTO) {
        return ResponseEntity.ok(orderService.create(orderDTO));
    }
    
    /**
     * Cập nhật thông tin đơn hàng
     * PUT /orders/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> update(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        return ResponseEntity.ok(orderService.update(id, orderDTO));
    }
    
    /**
     * Xóa một đơn hàng
     * DELETE /orders/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/completed")
    public ResponseEntity<List<OrderDTO>> getCompletedOrders() {
        return ResponseEntity.ok(orderService.getCompletedOrders());
    }

    /**
     * Lấy danh sách đơn hàng đã đóng gói (RoleID = 2)
     */
    @GetMapping("/shipping-ready")
    public ResponseEntity<List<OrderDTO>> getShippingReadyOrders() {
        return ResponseEntity.ok(orderService.getShippingReadyOrders());
    }

    /**
     * Đẩy đơn vận chuyển (Assign shipping company and code)
     */
    @PostMapping("/{id}/assign-ship")
    public ResponseEntity<OrderDTO> assignShipping(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, Long> payload) {
        Long shipCompanyId = payload.get("shipcompanyid");
        return ResponseEntity.ok(orderService.assignShipping(id, shipCompanyId));
    }

    /**
     * Hủy giao vận (Cancel order)
     */
    @PostMapping("/{id}/cancel-ship")
    public ResponseEntity<OrderDTO> cancelShipping(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.cancelShipping(id));
    }
}