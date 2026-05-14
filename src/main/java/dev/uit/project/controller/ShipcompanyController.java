package dev.uit.project.controller;

import dev.uit.project.dto.ShipcompanyDTO;
import dev.uit.project.service.ShipcompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ship-companies")
@RequiredArgsConstructor
public class ShipcompanyController {

    private final ShipcompanyService shipcompanyService;

    /**
     * Lấy danh sách tất cả các công ty vận chuyển
     * GET /ship-companies
     */
    @GetMapping
    public ResponseEntity<List<ShipcompanyDTO>> list() {
        return ResponseEntity.ok(shipcompanyService.list());
    }

    /**
     * Lấy thông tin công ty vận chuyển theo ID
     * GET /ship-companies/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ShipcompanyDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(shipcompanyService.get(id));
    }

    /**
     * Tạo mới một công ty vận chuyển
     * POST /ship-companies
     */
    @PostMapping
    public ResponseEntity<ShipcompanyDTO> create(@RequestBody ShipcompanyDTO shipcompanyDTO) {
        return ResponseEntity.ok(shipcompanyService.create(shipcompanyDTO));
    }

    /**
     * Cập nhật thông tin công ty vận chuyển
     * PUT /ship-companies/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ShipcompanyDTO> update(@PathVariable Long id, @RequestBody ShipcompanyDTO shipcompanyDTO) {
        return ResponseEntity.ok(shipcompanyService.update(id, shipcompanyDTO));
    }

    /**
     * Xóa một công ty vận chuyển
     * DELETE /ship-companies/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        shipcompanyService.delete(id);
        return ResponseEntity.ok().build();
    }
}