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

import java.util.List;

@Service
@RequiredArgsConstructor
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
        Product product = convertToEntity(productDTO);
        product.setId(null); // đảm bảo tạo mới
        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    /**
     * Cập nhật thông tin sản phẩm
     */
    public ProductDTO update(Long id, ProductDTO productDTO) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Cập nhật các trường đơn giản
        existing.setProductname(productDTO.getProductname());
        existing.setDetail(productDTO.getDetail());
        existing.setProductprice(productDTO.getProductprice());
        existing.setProductstatus(productDTO.getProductstatus());
        existing.setAllowreturn(productDTO.getAllowreturn());
        existing.setImageurl(productDTO.getImageurl());

        // Xử lý category
        CategoryDTO catDTO = productDTO.getCategoryid();
        if (catDTO != null && catDTO.getId() != null) {
            Category category = categoryRepository.findById(catDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + catDTO.getId()));
            existing.setCategoryid(category);
        } else {
            existing.setCategoryid(null);
        }

        // Xử lý producttype
        ProducttypeDTO typeDTO = productDTO.getProducttypeid();
        if (typeDTO != null && typeDTO.getId() != null) {
            Producttype producttype = producttypeRepository.findById(typeDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Producttype not found with id: " + typeDTO.getId()));
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
        CategoryDTO catDTO = dto.getCategoryid();
        if (catDTO != null && catDTO.getId() != null) {
            Category category = categoryRepository.findById(catDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + catDTO.getId()));
            product.setCategoryid(category);
        } else {
            product.setCategoryid(null);
        }

        // Xử lý producttype
        ProducttypeDTO typeDTO = dto.getProducttypeid();
        if (typeDTO != null && typeDTO.getId() != null) {
            Producttype producttype = producttypeRepository.findById(typeDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Producttype not found with id: " + typeDTO.getId()));
            product.setProducttypeid(producttype);
        } else {
            product.setProducttypeid(null);
        }

        return product;
    }
}