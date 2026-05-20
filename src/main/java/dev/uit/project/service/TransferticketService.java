package dev.uit.project.service;

import dev.uit.project.dto.TransferticketDTO;
import dev.uit.project.entity.Transferticket;
import dev.uit.project.repository.TransferticketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransferticketService {

    private final TransferticketRepository transferticketRepository;

    public List<TransferticketDTO> list() {
        return transferticketRepository.findAll().stream()
                .map(TransferticketDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public TransferticketDTO get(Long id) {
        return transferticketRepository.findById(id)
                .map(TransferticketDTO::fromEntity)
                .orElse(null);
    }

    public TransferticketDTO create(TransferticketDTO dto) {
        Transferticket entity = dto.toEntity();
        Transferticket saved = transferticketRepository.save(entity);
        return TransferticketDTO.fromEntity(saved);
    }

    public TransferticketDTO update(Long id, TransferticketDTO dto) {
        if (!transferticketRepository.existsById(id)) {
            return null;
        }
        Transferticket entity = dto.toEntity();
        Transferticket saved = transferticketRepository.save(entity);
        return TransferticketDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        transferticketRepository.deleteById(id);
    }
}
