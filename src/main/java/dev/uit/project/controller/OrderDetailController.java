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
import dev.uit.project.dto.OrderDetailDTO;
import dev.uit.project.service.OrderDetailService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/order-details")
@RequiredArgsConstructor
public class OrderDetailController {
    
    private final OrderDetailService orderDetailService;
    
    /**
     * Lấy danh sách tất cả chi tiết đơn hàng
     * GET /order-details
     */
    @GetMapping
    public ResponseEntity<List<OrderDetailDTO>> list() {
        return ResponseEntity.ok(orderDetailService.list());
    }
    
    /**
     * Lấy thông tin chi tiết đơn hàng theo ID
     * GET /order-details/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderDetailDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(orderDetailService.get(id));
    }
    
    /**
     * Tạo mới một chi tiết đơn hàng
     * POST /order-details
     */
    @PostMapping
    public ResponseEntity<OrderDetailDTO> create(@RequestBody OrderDetailDTO orderDetailDTO) {
        return ResponseEntity.ok(orderDetailService.create(orderDetailDTO));
    }
    
    /**
     * Cập nhật thông tin chi tiết đơn hàng
     * PUT /order-details/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<OrderDetailDTO> update(@PathVariable Long id, @RequestBody OrderDetailDTO orderDetailDTO) {
        return ResponseEntity.ok(orderDetailService.update(id, orderDetailDTO));
    }
    
    /**
     * Xóa một chi tiết đơn hàng
     * DELETE /order-details/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        orderDetailService.delete(id);
        return ResponseEntity.ok().build();
    }
}