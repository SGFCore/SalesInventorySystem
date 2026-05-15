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
import dev.uit.project.dto.OrderReturnDTO;
import dev.uit.project.service.OrderReturnService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/order-returns")
@RequiredArgsConstructor
public class OrderReturnController {
    
    private final OrderReturnService orderReturnService;
    
    /**
     * Lấy danh sách tất cả các đơn trả hàng
     * GET /order-returns
     */
    @GetMapping
    public ResponseEntity<List<OrderReturnDTO>> list() {
        return ResponseEntity.ok(orderReturnService.list());
    }
    
    /**
     * Lấy thông tin đơn trả hàng theo ID
     * GET /order-returns/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderReturnDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(orderReturnService.get(id));
    }
    
    /**
     * Tạo mới một đơn trả hàng
     * POST /order-returns
     */
    @PostMapping
    public ResponseEntity<OrderReturnDTO> create(@RequestBody OrderReturnDTO orderReturnDTO) {
        return ResponseEntity.ok(orderReturnService.create(orderReturnDTO));
    }
    
    /**
     * Cập nhật thông tin đơn trả hàng
     * PUT /order-returns/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<OrderReturnDTO> update(@PathVariable Long id, @RequestBody OrderReturnDTO orderReturnDTO) {
        return ResponseEntity.ok(orderReturnService.update(id, orderReturnDTO));
    }
    
    /**
     * Xóa một đơn trả hàng
     * DELETE /order-returns/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        orderReturnService.delete(id);
        return ResponseEntity.ok().build();
    }
}