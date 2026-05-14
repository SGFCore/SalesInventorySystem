package dev.uit.project.controller;

import dev.uit.project.dto.ComboDTO;
import dev.uit.project.service.ComboService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/combos")
@RequiredArgsConstructor
public class ComboController {

    private final ComboService comboService;

    /**
     * Lấy danh sách tất cả các combo
     * GET /combos
     */
    @GetMapping
    public ResponseEntity<List<ComboDTO>> list() {
        return ResponseEntity.ok(comboService.list());
    }

    /**
     * Lấy thông tin combo theo ID
     * GET /combos/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ComboDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(comboService.get(id));
    }

    /**
     * Tạo mới một combo
     * POST /combos
     */
    @PostMapping
    public ResponseEntity<ComboDTO> create(@RequestBody ComboDTO comboDTO) {
        return ResponseEntity.ok(comboService.create(comboDTO));
    }

    /**
     * Cập nhật thông tin combo
     * PUT /combos/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ComboDTO> update(@PathVariable Long id, @RequestBody ComboDTO comboDTO) {
        return ResponseEntity.ok(comboService.update(id, comboDTO));
    }

    /**
     * Xóa một combo
     * DELETE /combos/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        comboService.delete(id);
        return ResponseEntity.ok().build();
    }
}