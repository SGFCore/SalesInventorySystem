package dev.uit.project.controller;

import dev.uit.project.dto.ExportreceiptdetailDTO;
import dev.uit.project.service.ExportreceiptdetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/export-receipt-details")
@RequiredArgsConstructor
public class ExportreceiptdetailController {

    private final ExportreceiptdetailService exportreceiptdetailService;

    @GetMapping
    public ResponseEntity<List<ExportreceiptdetailDTO>> list() {
        return ResponseEntity.ok(exportreceiptdetailService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExportreceiptdetailDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(exportreceiptdetailService.get(id));
    }

    @PostMapping
    public ResponseEntity<ExportreceiptdetailDTO> create(@RequestBody ExportreceiptdetailDTO dto) {
        return ResponseEntity.ok(exportreceiptdetailService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExportreceiptdetailDTO> update(@PathVariable Long id, @RequestBody ExportreceiptdetailDTO dto) {
        return ResponseEntity.ok(exportreceiptdetailService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        exportreceiptdetailService.delete(id);
        return ResponseEntity.ok().build();
    }
}
