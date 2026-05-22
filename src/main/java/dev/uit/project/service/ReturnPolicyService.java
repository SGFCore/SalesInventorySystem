package dev.uit.project.service;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import dev.uit.project.dto.ReturnPolicyDTO;
import dev.uit.project.entity.Returnpolicy;
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
        Returnpolicy returnPolicy = convertToEntity(returnPolicyDTO);
        Returnpolicy savedReturnPolicy = returnPolicyRepository.save(returnPolicy);
        return convertToDTO(savedReturnPolicy);
    }
    
    /**
     * Cập nhật thông tin chính sách đổi trả
     */
    public ReturnPolicyDTO update(Long id, ReturnPolicyDTO returnPolicyDTO) {
        Returnpolicy existingReturnPolicy = returnPolicyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ReturnPolicy not found with id: " + id));
        
        BeanUtils.copyProperties(returnPolicyDTO, existingReturnPolicy, "id");
        Returnpolicy updatedReturnPolicy = returnPolicyRepository.save(existingReturnPolicy);
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
    private ReturnPolicyDTO convertToDTO(Returnpolicy returnPolicy) {
        ReturnPolicyDTO returnPolicyDTO = new ReturnPolicyDTO();
        BeanUtils.copyProperties(returnPolicy, returnPolicyDTO);
        return returnPolicyDTO;
    }
    
    /**
     * Chuyển đổi DTO sang Entity
     */
    private Returnpolicy convertToEntity(ReturnPolicyDTO returnPolicyDTO) {
        Returnpolicy returnPolicy = new Returnpolicy();
        BeanUtils.copyProperties(returnPolicyDTO, returnPolicy);
        return returnPolicy;
    }
}
