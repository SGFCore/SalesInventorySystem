package dev.uit.project.service;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import dev.uit.project.dto.ReturnPolicyDTO;
import dev.uit.project.entity.ReturnPolicy;
import dev.uit.project.repository.ReturnPolicyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReturnPolicyService {
    
    private final ReturnPolicyRepository returnPolicyRepository;
    
    /**
     * Lấy danh sách tất cả các chính sách đổi trả
     */
    public List<ReturnPolicyDTO> list() {
        return returnPolicyRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .toList();
    }
    
    /**
     * Lấy thông tin chính sách đổi trả theo ID
     */
    public ReturnPolicyDTO get(Long id) {
        return returnPolicyRepository.findById(id)
            .map(this::convertToDTO)
            .orElseThrow(() -> new RuntimeException("ReturnPolicy not found with id: " + id));
    }
    
    /**
     * Tạo mới một chính sách đổi trả
     */
    public ReturnPolicyDTO create(ReturnPolicyDTO returnPolicyDTO) {
        ReturnPolicy returnPolicy = convertToEntity(returnPolicyDTO);
        ReturnPolicy savedReturnPolicy = returnPolicyRepository.save(returnPolicy);
        return convertToDTO(savedReturnPolicy);
    }
    
    /**
     * Cập nhật thông tin chính sách đổi trả
     */
    public ReturnPolicyDTO update(Long id, ReturnPolicyDTO returnPolicyDTO) {
        ReturnPolicy existingReturnPolicy = returnPolicyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ReturnPolicy not found with id: " + id));
        
        BeanUtils.copyProperties(returnPolicyDTO, existingReturnPolicy, "id");
        ReturnPolicy updatedReturnPolicy = returnPolicyRepository.save(existingReturnPolicy);
        return convertToDTO(updatedReturnPolicy);
    }
    
    /**
     * Xóa một chính sách đổi trả
     */
    public void delete(Long id) {
        if (!returnPolicyRepository.existsById(id)) {
            throw new RuntimeException("ReturnPolicy not found with id: " + id);
        }
        returnPolicyRepository.deleteById(id);
    }
    
    /**
     * Chuyển đổi Entity sang DTO
     */
    private ReturnPolicyDTO convertToDTO(ReturnPolicy returnPolicy) {
        ReturnPolicyDTO returnPolicyDTO = new ReturnPolicyDTO();
        BeanUtils.copyProperties(returnPolicy, returnPolicyDTO);
        return returnPolicyDTO;
    }
    
    /**
     * Chuyển đổi DTO sang Entity
     */
    private ReturnPolicy convertToEntity(ReturnPolicyDTO returnPolicyDTO) {
        ReturnPolicy returnPolicy = new ReturnPolicy();
        BeanUtils.copyProperties(returnPolicyDTO, returnPolicy);
        return returnPolicy;
    }
}
