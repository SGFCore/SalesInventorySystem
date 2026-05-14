package dev.uit.project.controller;

import dev.uit.project.dto.ProducttypeDTO;
import dev.uit.project.service.ProducttypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-types")
@RequiredArgsConstructor
public class ProducttypeController {

    private final ProducttypeService producttypeService;

    /**
     * Lấy danh sách tất cả các loại sản phẩm
     * GET /product-types
     */
    @GetMapping
    public ResponseEntity<List<ProducttypeDTO>> list() {
        return ResponseEntity.ok(producttypeService.list());
    }

    /**
     * Lấy thông tin loại sản phẩm theo ID
     * GET /product-types/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProducttypeDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(producttypeService.get(id));
    }

    /**
     * Tạo mới một loại sản phẩm
     * POST /product-types
     */
    @PostMapping
    public ResponseEntity<ProducttypeDTO> create(@RequestBody ProducttypeDTO producttypeDTO) {
        return ResponseEntity.ok(producttypeService.create(producttypeDTO));
    }

    /**
     * Cập nhật thông tin loại sản phẩm
     * PUT /product-types/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProducttypeDTO> update(@PathVariable Long id, @RequestBody ProducttypeDTO producttypeDTO) {
        return ResponseEntity.ok(producttypeService.update(id, producttypeDTO));
    }

    /**
     * Xóa một loại sản phẩm
     * DELETE /product-types/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        producttypeService.delete(id);
        return ResponseEntity.ok().build();
    }
}