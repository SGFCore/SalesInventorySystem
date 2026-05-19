package dev.uit.project.service;

import dev.uit.project.dto.RequestDetailDTO;
import dev.uit.project.entity.Product;
import dev.uit.project.entity.Requestdetail;
import dev.uit.project.entity.RequestdetailId;
import dev.uit.project.entity.Requestform;
import dev.uit.project.repository.ProductRepository;
import dev.uit.project.repository.RequestDetailRepository;
import dev.uit.project.repository.RequestFormRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestDetailService {

    private final RequestDetailRepository requestDetailRepository;
    private final RequestFormRepository requestFormRepository;
    private final ProductRepository productRepository;

    public List<RequestDetailDTO> list() {
        return requestDetailRepository.findAll()
                .stream()
                .map(RequestDetailDTO::fromEntity)
                .toList();
    }

    public RequestDetailDTO get(Long id) {
        return requestDetailRepository.findAll()
                .stream()
                .filter(item -> item.getId().getRequestid().equals(id))
                .map(RequestDetailDTO::fromEntity)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Request detail not found for request id: " + id));
    }

    public RequestDetailDTO create(RequestDetailDTO dto) {
        Requestdetail entity = convertToEntity(dto);
        Requestdetail saved = requestDetailRepository.save(entity);
        return RequestDetailDTO.fromEntity(saved);
    }

    public RequestDetailDTO update(Long id, RequestDetailDTO dto) {
        RequestdetailId key = new RequestdetailId();
        key.setRequestid(id);
        key.setProductid(dto.getProductId());

        Requestdetail existing = requestDetailRepository.findById(key)
                .orElseThrow(() -> new RuntimeException("Request detail not found for key: " + key));

        existing.setQuantity(dto.getQuantity());

        Requestdetail updated = requestDetailRepository.save(existing);
        return RequestDetailDTO.fromEntity(updated);
    }

    public void delete(Long id) {
        List<Requestdetail> list = requestDetailRepository.findAll().stream()
                .filter(item -> item.getId().getRequestid().equals(id))
                .toList();
        requestDetailRepository.deleteAll(list);
    }

    private Requestdetail convertToEntity(RequestDetailDTO dto) {
        Requestdetail entity = new Requestdetail();
        RequestdetailId key = new RequestdetailId();
        key.setRequestid(dto.getId());
        key.setProductid(dto.getProductId());
        entity.setId(key);

        Requestform req = requestFormRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("RequestForm not found: " + dto.getId()));
        Product prod = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found: " + dto.getProductId()));

        entity.setRequestid(req);
        entity.setProductid(prod);
        entity.setQuantity(dto.getQuantity());
        return entity;
    }
}
