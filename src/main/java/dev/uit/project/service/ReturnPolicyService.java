package dev.uit.project.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.uit.project.dto.ReturnPolicyDTO;
import dev.uit.project.entity.Returnpolicy;
import dev.uit.project.repository.ReturnPolicyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
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
        
        existingReturnPolicy.setPolicyname(returnPolicyDTO.getPolicyname());
        existingReturnPolicy.setMaxreturndays(returnPolicyDTO.getMaxreturndays());
        existingReturnPolicy.setPenaltyfeerate(returnPolicyDTO.getPenaltyfeerate());
        existingReturnPolicy.setEffectivedate(returnPolicyDTO.getEffectivedate());
        existingReturnPolicy.setIsactive(returnPolicyDTO.getIsactive());
        
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
        return ReturnPolicyDTO.fromEntity(returnPolicy);
    }
    
    /**
     * Chuyển đổi DTO sang Entity
     */
    private Returnpolicy convertToEntity(ReturnPolicyDTO returnPolicyDTO) {
        if (returnPolicyDTO == null) {
            return null;
        }
        Returnpolicy returnPolicy = new Returnpolicy();
        returnPolicy.setId(returnPolicyDTO.getId());
        returnPolicy.setPolicyname(returnPolicyDTO.getPolicyname());
        returnPolicy.setMaxreturndays(returnPolicyDTO.getMaxreturndays());
        returnPolicy.setPenaltyfeerate(returnPolicyDTO.getPenaltyfeerate());
        returnPolicy.setEffectivedate(returnPolicyDTO.getEffectivedate());
        returnPolicy.setIsactive(returnPolicyDTO.getIsactive());
        return returnPolicy;
    }
}
