package dev.uit.project.controller;

import dev.uit.project.dto.DetailinventoryDTO;
import dev.uit.project.service.DetailinventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detail-inventories")
@RequiredArgsConstructor
public class DetailinventoryController {

    private final DetailinventoryService detailinventoryService;

    @GetMapping
    public ResponseEntity<List<DetailinventoryDTO>> list() {
        return ResponseEntity.ok(detailinventoryService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetailinventoryDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(detailinventoryService.get(id));
    }

    @PostMapping
    public ResponseEntity<DetailinventoryDTO> create(@RequestBody DetailinventoryDTO dto) {
        return ResponseEntity.ok(detailinventoryService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetailinventoryDTO> update(@PathVariable Long id, @RequestBody DetailinventoryDTO dto) {
        return ResponseEntity.ok(detailinventoryService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        detailinventoryService.delete(id);
        return ResponseEntity.ok().build();
    }
}
