package dev.uit.project.service;

import dev.uit.project.dto.ListdiscountDTO;
import dev.uit.project.entity.Listdiscount;
import dev.uit.project.repository.ListdiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListdiscountService {

    private final ListdiscountRepository listdiscountRepository;

    public List<ListdiscountDTO> list() {
        return listdiscountRepository.findAll().stream()
                .map(ListdiscountDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ListdiscountDTO get(Long id) {
        return listdiscountRepository.findById(id)
                .map(ListdiscountDTO::fromEntity)
                .orElse(null);
    }

    public ListdiscountDTO create(ListdiscountDTO dto) {
        Listdiscount entity = dto.toEntity();
        Listdiscount saved = listdiscountRepository.save(entity);
        return ListdiscountDTO.fromEntity(saved);
    }

    public ListdiscountDTO update(Long id, ListdiscountDTO dto) {
        if (!listdiscountRepository.existsById(id)) {
            return null;
        }
        Listdiscount entity = dto.toEntity();
        Listdiscount saved = listdiscountRepository.save(entity);
        return ListdiscountDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        listdiscountRepository.deleteById(id);
    }
}
