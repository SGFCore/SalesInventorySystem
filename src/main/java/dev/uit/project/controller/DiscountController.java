package dev.uit.project.controller;

import dev.uit.project.dto.DiscountDTO;
import dev.uit.project.service.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;

    @GetMapping
    public ResponseEntity<List<DiscountDTO>> list() {
        return ResponseEntity.ok(discountService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiscountDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(discountService.get(id));
    }

    @PostMapping
    public ResponseEntity<DiscountDTO> create(@RequestBody DiscountDTO dto) {
        return ResponseEntity.ok(discountService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiscountDTO> update(@PathVariable Long id, @RequestBody DiscountDTO dto) {
        return ResponseEntity.ok(discountService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        discountService.delete(id);
        return ResponseEntity.ok().build();
    }
}
