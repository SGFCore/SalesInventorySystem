package dev.uit.project.service;

import dev.uit.project.dto.CategoryDTO;
import dev.uit.project.entity.Category;
import dev.uit.project.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    /**
     * Lấy danh sách tất cả các danh mục
     */
    public List<CategoryDTO> list() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /**
     * Lấy thông tin danh mục theo ID
     */
    public CategoryDTO get(Long id) {
        return categoryRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    /**
     * Tạo mới một danh mục
     */
    public CategoryDTO create(CategoryDTO categoryDTO) {
        Category category = convertToEntity(categoryDTO);
        Category saved = categoryRepository.save(category);
        return convertToDTO(saved);
    }

    /**
     * Cập nhật thông tin danh mục
     */
    public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        existing.setCategoryname(categoryDTO.getCategoryname());

        Category updated = categoryRepository.save(existing);
        return convertToDTO(updated);
    }

    /**
     * Xóa một danh mục
     */
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    // ------------------ Chuyển đổi Entity <-> DTO ------------------

    private CategoryDTO convertToDTO(Category entity) {
        return CategoryDTO.fromEntity(entity);
    }

    private Category convertToEntity(CategoryDTO dto) {
        Category category = new Category();
        category.setCategoryname(dto.getCategoryname());
        // id sẽ do DB tự sinh khi tạo mới, không set ở đây
        return category;
    }
}