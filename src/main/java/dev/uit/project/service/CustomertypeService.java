package dev.uit.project.service;

import java.util.List;
import org.springframework.stereotype.Service;
import dev.uit.project.dto.CustomertypeDTO;
import dev.uit.project.entity.Customertype;
import dev.uit.project.repository.CustomertypeRepository;
import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomertypeService {
    
    private final CustomertypeRepository customertypeRepository;
    
    /**
     * Lấy danh sách tất cả các loại khách hàng
     */
    public List<CustomertypeDTO> list() {
        return customertypeRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .toList();
    }
    
    /**
     * Lấy thông tin loại khách hàng theo ID
     */
    public CustomertypeDTO get(Long id) {
        return customertypeRepository.findById(id)
            .map(this::convertToDTO)
            .orElseThrow(() -> new RuntimeException("Customertype not found with id: " + id));
    }
    
    /**
     * Tạo mới một loại khách hàng
     */
    public CustomertypeDTO create(CustomertypeDTO customertypeDTO) {
        Customertype customertype = convertToEntity(customertypeDTO);
        Customertype savedCustomertype = customertypeRepository.save(customertype);
        return convertToDTO(savedCustomertype);
    }
    
    /**
     * Cập nhật thông tin loại khách hàng
     */
    public CustomertypeDTO update(Long id, CustomertypeDTO customertypeDTO) {
        Customertype existingCustomertype = customertypeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Customertype not found with id: " + id));
        
        existingCustomertype.setCustomertypename(customertypeDTO.getCustomertypename());
        existingCustomertype.setDiscount(customertypeDTO.getDiscount());
        existingCustomertype.setDetail(customertypeDTO.getDetail());
        existingCustomertype.setSpendinglimit(customertypeDTO.getSpendinglimit());
        
        Customertype updatedCustomertype = customertypeRepository.save(existingCustomertype);
        return convertToDTO(updatedCustomertype);
    }
    
    /**
     * Xóa một loại khách hàng
     */
    public void delete(Long id) {
        if (!customertypeRepository.existsById(id)) {
            throw new RuntimeException("Customertype not found with id: " + id);
        }
        customertypeRepository.deleteById(id);
    }
    
    /**
     * Chuyển đổi Entity sang DTO
     */
    private CustomertypeDTO convertToDTO(Customertype customertype) {
        return new CustomertypeDTO(
            customertype.getId(),
            customertype.getCustomertypename(),
            customertype.getDiscount(),
            customertype.getDetail(),
            customertype.getSpendinglimit()
        );
    }
    
    /**
     * Chuyển đổi DTO sang Entity
     */
    private Customertype convertToEntity(CustomertypeDTO customertypeDTO) {
        Customertype customertype = new Customertype();
        customertype.setCustomertypename(customertypeDTO.getCustomertypename());
        customertype.setDiscount(customertypeDTO.getDiscount());
        customertype.setDetail(customertypeDTO.getDetail());
        customertype.setSpendinglimit(customertypeDTO.getSpendinglimit());
        return customertype;
    }
}
