package dev.uit.project.service;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import dev.uit.project.dto.ReturnDetailDTO;
import dev.uit.project.entity.ReturnDetail;
import dev.uit.project.repository.ReturnDetailRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReturnDetailService {

    private final ReturnDetailRepository returnDetailRepository;

    /**
     * Lấy danh sách tất cả các dữ liệu trả hàng
     */
    public List<ReturnDetailDTO> list() {
        return returnDetailRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .toList();
    }

    /**
     * Lấy thông tin trả hàng theo ID
     */
    public ReturnDetailDTO get(Long id) {
        return returnDetailRepository.findById(id)
            .map(this::convertToDTO)
            .orElseThrow(() -> new RuntimeException("ReturnDetail not found with id: " + id));
    }

    /**
     * Tạo mới một bản ghi trả hàng
     */
    public ReturnDetailDTO create(ReturnDetailDTO returnDetailDTO) {
        ReturnDetail returnDetail = convertToEntity(returnDetailDTO);
        ReturnDetail savedReturnDetail = returnDetailRepository.save(returnDetail);
        return convertToDTO(savedReturnDetail);
    }

    /**
     * Cập nhật thông tin trả hàng
     */
    public ReturnDetailDTO update(Long id, ReturnDetailDTO returnDetailDTO) {
        ReturnDetail existingReturnDetail = returnDetailRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ReturnDetail not found with id: " + id));

        BeanUtils.copyProperties(returnDetailDTO, existingReturnDetail, "id");

        ReturnDetail updatedReturnDetail = returnDetailRepository.save(existingReturnDetail);
        return convertToDTO(updatedReturnDetail);
    }

    /**
     * Xóa một bản ghi trả hàng
     */
    public void delete(Long id) {
        if (!returnDetailRepository.existsById(id)) {
            throw new RuntimeException("ReturnDetail not found with id: " + id);
        }
        returnDetailRepository.deleteById(id);
    }

    /**
     * Chuyển đổi Entity sang DTO
     */
    private ReturnDetailDTO convertToDTO(ReturnDetail returnDetail) {
        ReturnDetailDTO returnDetailDTO = new ReturnDetailDTO();
        BeanUtils.copyProperties(returnDetail, returnDetailDTO);
        return returnDetailDTO;
    }

    /**
     * Chuyển đổi DTO sang Entity
     */
    private ReturnDetail convertToEntity(ReturnDetailDTO returnDetailDTO) {
        ReturnDetail returnDetail = new ReturnDetail();
        BeanUtils.copyProperties(returnDetailDTO, returnDetail);
        return returnDetail;
    }
}
