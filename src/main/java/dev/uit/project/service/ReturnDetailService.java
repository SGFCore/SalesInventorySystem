package dev.uit.project.service;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.uit.project.dto.ReturnDetailDTO;
import dev.uit.project.entity.Returndetail;
import dev.uit.project.repository.ReturnDetailRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
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
        Returndetail returnDetail = convertToEntity(returnDetailDTO);
        Returndetail savedReturnDetail = returnDetailRepository.save(returnDetail);
        return convertToDTO(savedReturnDetail);
    }

    /**
     * Cập nhật thông tin trả hàng
     */
    public ReturnDetailDTO update(Long id, ReturnDetailDTO returnDetailDTO) {
        Returndetail existingReturnDetail = returnDetailRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ReturnDetail not found with id: " + id));

        BeanUtils.copyProperties(returnDetailDTO, existingReturnDetail, "id");

        Returndetail updatedReturnDetail = returnDetailRepository.save(existingReturnDetail);
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
    private ReturnDetailDTO convertToDTO(Returndetail returnDetail) {
        ReturnDetailDTO returnDetailDTO = new ReturnDetailDTO();
        BeanUtils.copyProperties(returnDetail, returnDetailDTO);
        return returnDetailDTO;
    }

    /**
     * Chuyển đổi DTO sang Entity
     */
    private Returndetail convertToEntity(ReturnDetailDTO returnDetailDTO) {
        Returndetail returnDetail = new Returndetail();
        BeanUtils.copyProperties(returnDetailDTO, returnDetail);
        return returnDetail;
    }
}
