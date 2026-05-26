package dev.uit.project.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.uit.project.dto.ReturnDetailDTO;
import dev.uit.project.entity.Returndetail;
import dev.uit.project.entity.ReturndetailId;
import dev.uit.project.entity.Orderreturn;
import dev.uit.project.entity.Product;
import dev.uit.project.entity.Warehouse;
import dev.uit.project.repository.ReturnDetailRepository;
import dev.uit.project.repository.OrderReturnRepository;
import dev.uit.project.repository.ProductRepository;
import dev.uit.project.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ReturnDetailService {

    private final ReturnDetailRepository returnDetailRepository;
    private final OrderReturnRepository orderReturnRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;

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

        existingReturnDetail.setQuantity(returnDetailDTO.getQuantity());
        existingReturnDetail.setQcStatus(returnDetailDTO.getQcStatus());
        existingReturnDetail.setActiontaken(returnDetailDTO.getActiontaken());

        if (returnDetailDTO.getTargetWarehouseId() != null) {
            Warehouse warehouse = warehouseRepository.findById(returnDetailDTO.getTargetWarehouseId())
                .orElseThrow(() -> new RuntimeException("Warehouse not found with id: " + returnDetailDTO.getTargetWarehouseId()));
            existingReturnDetail.setTargetwarehouseid(warehouse);
        } else {
            existingReturnDetail.setTargetwarehouseid(null);
        }

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
        return ReturnDetailDTO.fromEntity(returnDetail);
    }

    /**
     * Chuyển đổi DTO sang Entity
     */
    private Returndetail convertToEntity(ReturnDetailDTO returnDetailDTO) {
        if (returnDetailDTO == null) {
            return null;
        }
        Returndetail returnDetail = new Returndetail();

        // Populate composite key
        ReturndetailId id = new ReturndetailId();
        id.setReturnid(returnDetailDTO.getReturnId());
        id.setProductid(returnDetailDTO.getProductId());
        returnDetail.setId(id);

        // Populate relationships
        if (returnDetailDTO.getReturnId() != null) {
            Orderreturn orderReturn = orderReturnRepository.findById(returnDetailDTO.getReturnId())
                .orElseThrow(() -> new RuntimeException("Orderreturn not found with id: " + returnDetailDTO.getReturnId()));
            returnDetail.setReturnid(orderReturn);
        }

        if (returnDetailDTO.getProductId() != null) {
            Product product = productRepository.findById(returnDetailDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + returnDetailDTO.getProductId()));
            returnDetail.setProductid(product);
        }

        if (returnDetailDTO.getTargetWarehouseId() != null) {
            Warehouse warehouse = warehouseRepository.findById(returnDetailDTO.getTargetWarehouseId())
                .orElseThrow(() -> new RuntimeException("Warehouse not found with id: " + returnDetailDTO.getTargetWarehouseId()));
            returnDetail.setTargetwarehouseid(warehouse);
        }

        // Populate other fields
        returnDetail.setQuantity(returnDetailDTO.getQuantity());
        returnDetail.setQcStatus(returnDetailDTO.getQcStatus());
        returnDetail.setActiontaken(returnDetailDTO.getActiontaken());

        return returnDetail;
    }
}
