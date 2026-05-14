package dev.uit.project.controller;

import dev.uit.project.dto.CombodetailDTO;
import dev.uit.project.service.CombodetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/combo-details")
@RequiredArgsConstructor
public class CombodetailController {

    private final CombodetailService combodetailService;

    /**
     * Lấy danh sách tất cả chi tiết combo
     * GET /combo-details
     */
    @GetMapping
    public ResponseEntity<List<CombodetailDTO>> list() {
        return ResponseEntity.ok(combodetailService.list());
    }

    /**
     * Lấy chi tiết combo theo comboId và productId
     * GET /combo-details/{comboId}/{productId}
     */
    @GetMapping("/{comboId}/{productId}")
    public ResponseEntity<CombodetailDTO> get(@PathVariable Long comboId, @PathVariable Long productId) {
        return ResponseEntity.ok(combodetailService.get(comboId, productId));
    }

    /**
     * Tạo mới một chi tiết combo
     * POST /combo-details
     */
    @PostMapping
    public ResponseEntity<CombodetailDTO> create(@RequestBody CombodetailDTO combodetailDTO) {
        return ResponseEntity.ok(combodetailService.create(combodetailDTO));
    }

    /**
     * Cập nhật chi tiết combo (quantity)
     * PUT /combo-details/{comboId}/{productId}
     */
    @PutMapping("/{comboId}/{productId}")
    public ResponseEntity<CombodetailDTO> update(@PathVariable Long comboId, @PathVariable Long productId,
                                                 @RequestBody CombodetailDTO combodetailDTO) {
        return ResponseEntity.ok(combodetailService.update(comboId, productId, combodetailDTO));
    }

    /**
     * Xóa chi tiết combo
     * DELETE /combo-details/{comboId}/{productId}
     */
    @DeleteMapping("/{comboId}/{productId}")
    public ResponseEntity<Void> delete(@PathVariable Long comboId, @PathVariable Long productId) {
        combodetailService.delete(comboId, productId);
        return ResponseEntity.ok().build();
    }
}