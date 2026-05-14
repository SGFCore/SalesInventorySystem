package dev.uit.project.service;

import dev.uit.project.dto.CombodetailDTO;
import dev.uit.project.entity.Combodetail;
import dev.uit.project.entity.CombodetailId;
import dev.uit.project.entity.Combo;
import dev.uit.project.entity.Product;
import dev.uit.project.repository.CombodetailRepository;
import dev.uit.project.repository.ComboRepository;
import dev.uit.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CombodetailService {

    private final CombodetailRepository combodetailRepository;
    private final ComboRepository comboRepository;
    private final ProductRepository productRepository;

    /**
     * Lấy danh sách tất cả chi tiết combo
     */
    public List<CombodetailDTO> list() {
        return combodetailRepository.findAll()
                .stream()
                .map(CombodetailDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Lấy chi tiết combo theo comboId và productId
     */
    public CombodetailDTO get(Long comboId, Long productId) {
        CombodetailId id = new CombodetailId();
        id.setComboid(comboId);
        id.setProductid(productId);
        return combodetailRepository.findById(id)
                .map(CombodetailDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Combodetail not found with comboId: " + comboId + ", productId: " + productId));
    }

    /**
     * Tạo mới một chi tiết combo
     */
    public CombodetailDTO create(CombodetailDTO dto) {
        // Kiểm tra combo và product tồn tại
        Combo combo = comboRepository.findById(dto.getComboId())
                .orElseThrow(() -> new RuntimeException("Combo not found with id: " + dto.getComboId()));
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + dto.getProductId()));

        Combodetail entity = new Combodetail();
        CombodetailId id = new CombodetailId();
        id.setComboid(dto.getComboId());
        id.setProductid(dto.getProductId());
        entity.setId(id);
        entity.setComboid(combo);
        entity.setProductid(product);
        entity.setQuantity(dto.getQuantity());

        Combodetail saved = combodetailRepository.save(entity);
        return CombodetailDTO.fromEntity(saved);
    }

    /**
     * Cập nhật chi tiết combo (thường chỉ cập nhật quantity)
     */
    public CombodetailDTO update(Long comboId, Long productId, CombodetailDTO dto) {
        CombodetailId id = new CombodetailId();
        id.setComboid(comboId);
        id.setProductid(productId);
        Combodetail existing = combodetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Combodetail not found with comboId: " + comboId + ", productId: " + productId));

        existing.setQuantity(dto.getQuantity());
        // Không thay đổi combo và product

        Combodetail updated = combodetailRepository.save(existing);
        return CombodetailDTO.fromEntity(updated);
    }

    /**
     * Xóa chi tiết combo
     */
    public void delete(Long comboId, Long productId) {
        CombodetailId id = new CombodetailId();
        id.setComboid(comboId);
        id.setProductid(productId);
        if (!combodetailRepository.existsById(id)) {
            throw new RuntimeException("Combodetail not found with comboId: " + comboId + ", productId: " + productId);
        }
        combodetailRepository.deleteById(id);
    }
}