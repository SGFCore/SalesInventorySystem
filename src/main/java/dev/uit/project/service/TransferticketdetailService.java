package dev.uit.project.service;

import dev.uit.project.dto.TransferticketdetailDTO;
import dev.uit.project.entity.Transferticketdetail;
import dev.uit.project.repository.TransferticketdetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransferticketdetailService {

    private final TransferticketdetailRepository transferticketdetailRepository;

    public List<TransferticketdetailDTO> list() {
        return transferticketdetailRepository.findAll().stream()
                .map(TransferticketdetailDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public TransferticketdetailDTO get(Long id) {
        return transferticketdetailRepository.findById(id)
                .map(TransferticketdetailDTO::fromEntity)
                .orElse(null);
    }

    public TransferticketdetailDTO create(TransferticketdetailDTO dto) {
        Transferticketdetail entity = dto.toEntity();
        Transferticketdetail saved = transferticketdetailRepository.save(entity);
        return TransferticketdetailDTO.fromEntity(saved);
    }

    public TransferticketdetailDTO update(Long id, TransferticketdetailDTO dto) {
        if (!transferticketdetailRepository.existsById(id)) {
            return null;
        }
        Transferticketdetail entity = dto.toEntity();
        Transferticketdetail saved = transferticketdetailRepository.save(entity);
        return TransferticketdetailDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        transferticketdetailRepository.deleteById(id);
    }
}
