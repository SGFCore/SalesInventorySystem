package dev.uit.project.service;

import dev.uit.project.dto.ProductDTO;
import dev.uit.project.dto.CategoryDTO;
import dev.uit.project.dto.ProducttypeDTO;
import dev.uit.project.entity.Product;
import dev.uit.project.entity.Category;
import dev.uit.project.entity.Producttype;
import dev.uit.project.repository.ProductRepository;
import dev.uit.project.repository.CategoryRepository;
import dev.uit.project.repository.ProducttypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProducttypeRepository producttypeRepository;

    /**
     * Lấy danh sách tất cả sản phẩm
     */
    public List<ProductDTO> list() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /**
     * Lấy thông tin sản phẩm theo ID
     */
    public ProductDTO get(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    /**
     * Tạo mới một sản phẩm
     */
    public ProductDTO create(ProductDTO productDTO) {
        Product product = new Product();
        product.setProductname(productDTO.getProductname());
        product.setDetail(productDTO.getDetail());
        product.setProductprice(productDTO.getProductprice());
        product.setProductstatus(productDTO.getProductstatus());
        product.setAllowreturn(productDTO.getAllowreturn());
        product.setImageurl(productDTO.getImageurl());

        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found: " + productDTO.getCategoryId()));
            product.setCategoryid(category);
        }

        // Nếu có truyền productTypeId -> map
        if (productDTO.getProducttypeId() != null) {
            Producttype producttype = producttypeRepository.findById(productDTO.getProducttypeId())
                    .orElseThrow(() -> new RuntimeException("ProductType not found: " + productDTO.getProducttypeId()));
            product.setProducttypeid(producttype);
        }

        Product saved = productRepository.save(product);
        return ProductDTO.fromEntity(saved);
    }

    /**
     * Cập nhật thông tin sản phẩm
     */
    public ProductDTO update(Long id, ProductDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));

        existing.setProductname(dto.getProductname());
        existing.setDetail(dto.getDetail());
        existing.setProductprice(dto.getProductprice());
        existing.setProductstatus(dto.getProductstatus());
        existing.setAllowreturn(dto.getAllowreturn());
        existing.setImageurl(dto.getImageurl());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found: " + dto.getCategoryId()));
            existing.setCategoryid(category);
        } else {
            existing.setCategoryid(null);
        }

        if (dto.getProducttypeId() != null) {
            Producttype producttype = producttypeRepository.findById(dto.getProducttypeId())
                    .orElseThrow(() -> new RuntimeException("ProductType not found: " + dto.getProducttypeId()));
            existing.setProducttypeid(producttype);
        } else {
            existing.setProducttypeid(null);
        }

        Product updated = productRepository.save(existing);
        return convertToDTO(updated);
    }

    /**
     * Xóa một sản phẩm
     */
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    // ------------------ Chuyển đổi Entity <-> DTO ------------------

    private ProductDTO convertToDTO(Product entity) {
        return ProductDTO.fromEntity(entity);
    }

    private Product convertToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setProductname(dto.getProductname());
        product.setDetail(dto.getDetail());
        product.setProductprice(dto.getProductprice());
        product.setProductstatus(dto.getProductstatus());
        product.setAllowreturn(dto.getAllowreturn());
        product.setImageurl(dto.getImageurl());

        // Xử lý category
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + dto.getCategoryId()));
            product.setCategoryid(category);
        } else {
            product.setCategoryid(null);
        }

        // Xử lý producttype
        if (dto.getProducttypeId() != null) {
            Producttype producttype = producttypeRepository.findById(dto.getProducttypeId())
                    .orElseThrow(() -> new RuntimeException("Producttype not found with id: " + dto.getProducttypeId()));
            product.setProducttypeid(producttype);
        } else {
            product.setProducttypeid(null);
        }

        return product;
    }
}