package dev.uit.project.controller;

import dev.uit.project.dto.CountsheetdetailDTO;
import dev.uit.project.service.CountsheetdetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/count-sheet-details")
@RequiredArgsConstructor
public class CountsheetdetailController {

    private final CountsheetdetailService countsheetdetailService;

    @GetMapping
    public ResponseEntity<List<CountsheetdetailDTO>> list() {
        return ResponseEntity.ok(countsheetdetailService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountsheetdetailDTO> get(@PathVariable dev.uit.project.entity.CountsheetdetailId id) {
        return ResponseEntity.ok(countsheetdetailService.get(id));
    }

    @PostMapping
    public ResponseEntity<CountsheetdetailDTO> create(@RequestBody CountsheetdetailDTO dto) {
        return ResponseEntity.ok(countsheetdetailService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CountsheetdetailDTO> update(@PathVariable dev.uit.project.entity.CountsheetdetailId id, @RequestBody CountsheetdetailDTO dto) {
        return ResponseEntity.ok(countsheetdetailService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable dev.uit.project.entity.CountsheetdetailId id) {
        countsheetdetailService.delete(id);
        return ResponseEntity.ok().build();
    }
}
