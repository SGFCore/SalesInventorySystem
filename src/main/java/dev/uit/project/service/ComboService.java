package dev.uit.project.service;

import dev.uit.project.dto.ComboDTO;
import dev.uit.project.entity.Combo;
import dev.uit.project.repository.ComboRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComboService {

    private final ComboRepository comboRepository;

    /**
     * Lấy danh sách tất cả các combo
     */
    public List<ComboDTO> list() {
        return comboRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /**
     * Lấy thông tin combo theo ID
     */
    public ComboDTO get(Long id) {
        return comboRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Combo not found with id: " + id));
    }

    /**
     * Tạo mới một combo
     */
    public ComboDTO create(ComboDTO comboDTO) {
        Combo combo = convertToEntity(comboDTO);
        Combo saved = comboRepository.save(combo);
        return convertToDTO(saved);
    }

    /**
     * Cập nhật thông tin combo
     */
    public ComboDTO update(Long id, ComboDTO comboDTO) {
        Combo existing = comboRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Combo not found with id: " + id));

        existing.setComboprice(comboDTO.getComboprice());

        Combo updated = comboRepository.save(existing);
        return convertToDTO(updated);
    }

    /**
     * Xóa một combo
     */
    public void delete(Long id) {
        if (!comboRepository.existsById(id)) {
            throw new RuntimeException("Combo not found with id: " + id);
        }
        comboRepository.deleteById(id);
    }

    // ------------------ Chuyển đổi Entity <-> DTO ------------------

    private ComboDTO convertToDTO(Combo entity) {
        return ComboDTO.fromEntity(entity);
    }

    private Combo convertToEntity(ComboDTO dto) {
        Combo combo = new Combo();
        combo.setComboprice(dto.getComboprice());
        // id sẽ do DB tự sinh khi tạo mới
        return combo;
    }
}