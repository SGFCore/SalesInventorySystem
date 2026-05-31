package dev.uit.project.service;

import dev.uit.project.dto.ExportreceiptdetailDTO;
import dev.uit.project.entity.Exportreceiptdetail;
import dev.uit.project.repository.ExportreceiptdetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExportreceiptdetailService {

    private final ExportreceiptdetailRepository exportreceiptdetailRepository;

    public List<ExportreceiptdetailDTO> list() {
        return exportreceiptdetailRepository.findAll().stream()
                .map(ExportreceiptdetailDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ExportreceiptdetailDTO get(dev.uit.project.entity.ExportreceiptdetailId id) {
        return exportreceiptdetailRepository.findById(id)
                .map(ExportreceiptdetailDTO::fromEntity)
                .orElse(null);
    }

    public ExportreceiptdetailDTO create(ExportreceiptdetailDTO dto) {
        Exportreceiptdetail entity = dto.toEntity();
        Exportreceiptdetail saved = exportreceiptdetailRepository.save(entity);
        return ExportreceiptdetailDTO.fromEntity(saved);
    }

    public ExportreceiptdetailDTO update(dev.uit.project.entity.ExportreceiptdetailId id, ExportreceiptdetailDTO dto) {
        if (!exportreceiptdetailRepository.existsById(id)) {
            return null;
        }
        Exportreceiptdetail entity = dto.toEntity();
        
        if (!id.equals(entity.getId())) {
            exportreceiptdetailRepository.deleteById(id);
        }
        
        Exportreceiptdetail saved = exportreceiptdetailRepository.save(entity);
        return ExportreceiptdetailDTO.fromEntity(saved);
    }

    public void delete(dev.uit.project.entity.ExportreceiptdetailId id) {
        exportreceiptdetailRepository.deleteById(id);
    }
}
