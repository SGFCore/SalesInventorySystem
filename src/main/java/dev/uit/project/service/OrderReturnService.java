package dev.uit.project.service;

import dev.uit.project.dto.OrderReturnDTO;
import dev.uit.project.entity.OrderReturn;
import dev.uit.project.repository.OrderReturnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderReturnService {

    private final OrderReturnRepository orderReturnRepository;

    public List<OrderReturnDTO> list() {
        return orderReturnRepository.findAll().stream()
                .map(OrderReturnDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public OrderReturnDTO get(Long id) {
        return orderReturnRepository.findById(id)
                .map(OrderReturnDTO::fromEntity)
                .orElse(null);
    }

    public OrderReturnDTO create(OrderReturnDTO dto) {
        OrderReturn entity = dto.toEntity();
        OrderReturn saved = orderReturnRepository.save(entity);
        return OrderReturnDTO.fromEntity(saved);
    }

    public OrderReturnDTO update(Long id, OrderReturnDTO dto) {
        if (!orderReturnRepository.existsById(id)) {
            return null;
        }
        OrderReturn entity = dto.toEntity();
        OrderReturn saved = orderReturnRepository.save(entity);
        return OrderReturnDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        orderReturnRepository.deleteById(id);
    }
}
