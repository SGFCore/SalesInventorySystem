package dev.uit.project.controller;

import dev.uit.project.dto.WarehouseDTO;
import dev.uit.project.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warehouses")
@RequiredArgsConstructor
public class WarehouseController {

    private final WarehouseService warehouseService;

    /**
     * Lấy danh sách tất cả kho hàng
     * GET /warehouses
     */
    @GetMapping
    public ResponseEntity<List<WarehouseDTO>> list() {
        return ResponseEntity.ok(warehouseService.list());
    }

    /**
     * Lấy thông tin kho hàng theo ID
     * GET /warehouses/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<WarehouseDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(warehouseService.get(id));
    }

    /**
     * Tạo mới một kho hàng
     * POST /warehouses
     */
    @PostMapping
    public ResponseEntity<WarehouseDTO> create(@RequestBody WarehouseDTO warehouseDTO) {
        return ResponseEntity.ok(warehouseService.create(warehouseDTO));
    }

    /**
     * Cập nhật thông tin kho hàng
     * PUT /warehouses/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<WarehouseDTO> update(@PathVariable Long id, @RequestBody WarehouseDTO warehouseDTO) {
        return ResponseEntity.ok(warehouseService.update(id, warehouseDTO));
    }

    /**
     * Xóa một kho hàng
     * DELETE /warehouses/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        warehouseService.delete(id);
        return ResponseEntity.ok().build();
    }
}