package dev.uit.project.service;

import dev.uit.project.dto.DiscountDTO;
import dev.uit.project.entity.Discount;
import dev.uit.project.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DiscountService {

    private final DiscountRepository discountRepository;

    public List<DiscountDTO> list() {
        return discountRepository.findAll().stream()
                .map(DiscountDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public DiscountDTO get(Long id) {
        return discountRepository.findById(id)
                .map(DiscountDTO::fromEntity)
                .orElse(null);
    }

    public DiscountDTO create(DiscountDTO dto) {
        Discount entity = dto.toEntity();
        Discount saved = discountRepository.save(entity);
        return DiscountDTO.fromEntity(saved);
    }

    public DiscountDTO update(Long id, DiscountDTO dto) {
        if (!discountRepository.existsById(id)) {
            return null;
        }
        Discount entity = dto.toEntity();
        Discount saved = discountRepository.save(entity);
        return DiscountDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        discountRepository.deleteById(id);
    }
}
