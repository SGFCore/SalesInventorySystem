package dev.uit.project.service;

import dev.uit.project.dto.ProducttypeDTO;
import dev.uit.project.entity.Producttype;
import dev.uit.project.repository.ProducttypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProducttypeService {

    private final ProducttypeRepository producttypeRepository;

    /**
     * Lấy danh sách tất cả các loại sản phẩm
     */
    public List<ProducttypeDTO> list() {
        return producttypeRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /**
     * Lấy thông tin loại sản phẩm theo ID
     */
    public ProducttypeDTO get(Long id) {
        return producttypeRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Producttype not found with id: " + id));
    }

    /**
     * Tạo mới một loại sản phẩm
     */
    public ProducttypeDTO create(ProducttypeDTO producttypeDTO) {
        Producttype producttype = convertToEntity(producttypeDTO);
        Producttype saved = producttypeRepository.save(producttype);
        return convertToDTO(saved);
    }

    /**
     * Cập nhật thông tin loại sản phẩm
     */
    public ProducttypeDTO update(Long id, ProducttypeDTO producttypeDTO) {
        Producttype existing = producttypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producttype not found with id: " + id));

        existing.setProducttypename(producttypeDTO.getProducttypename());
        existing.setCategoryid(producttypeDTO.getCategoryid());

        Producttype updated = producttypeRepository.save(existing);
        return convertToDTO(updated);
    }

    /**
     * Xóa một loại sản phẩm
     */
    public void delete(Long id) {
        if (!producttypeRepository.existsById(id)) {
            throw new RuntimeException("Producttype not found with id: " + id);
        }
        producttypeRepository.deleteById(id);
    }

    // ------------------ Chuyển đổi Entity <-> DTO ------------------

    private ProducttypeDTO convertToDTO(Producttype entity) {
        return ProducttypeDTO.fromEntity(entity);
    }

    private Producttype convertToEntity(ProducttypeDTO dto) {
        Producttype producttype = new Producttype();
        producttype.setProducttypename(dto.getProducttypename());
        producttype.setCategoryid(dto.getCategoryid());
        // id sẽ do DB tự sinh khi tạo mới
        return producttype;
    }
}