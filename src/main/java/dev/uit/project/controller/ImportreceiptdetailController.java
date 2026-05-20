package dev.uit.project.controller;

import dev.uit.project.dto.ImportreceiptdetailDTO;
import dev.uit.project.service.ImportreceiptdetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/import-receipt-details")
@RequiredArgsConstructor
public class ImportreceiptdetailController {

    private final ImportreceiptdetailService importreceiptdetailService;

    @GetMapping
    public ResponseEntity<List<ImportreceiptdetailDTO>> list() {
        return ResponseEntity.ok(importreceiptdetailService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImportreceiptdetailDTO> get(@PathVariable dev.uit.project.entity.ImportreceiptdetailId id) {
        return ResponseEntity.ok(importreceiptdetailService.get(id));
    }

    @PostMapping
    public ResponseEntity<ImportreceiptdetailDTO> create(@RequestBody ImportreceiptdetailDTO dto) {
        return ResponseEntity.ok(importreceiptdetailService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImportreceiptdetailDTO> update(@PathVariable dev.uit.project.entity.ImportreceiptdetailId id, @RequestBody ImportreceiptdetailDTO dto) {
        return ResponseEntity.ok(importreceiptdetailService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable dev.uit.project.entity.ImportreceiptdetailId id) {
        importreceiptdetailService.delete(id);
        return ResponseEntity.ok().build();
    }
}
