package dev.uit.project.service;

import dev.uit.project.dto.DetailinventoryDTO;
import dev.uit.project.entity.Detailinventory;
import dev.uit.project.entity.DetailinventoryId;
import dev.uit.project.entity.Product;
import dev.uit.project.entity.Warehouse;
import dev.uit.project.repository.DetailinventoryRepository;
import dev.uit.project.repository.ProductRepository;
import dev.uit.project.repository.WarehouseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DetailinventoryService {

    private final DetailinventoryRepository detailinventoryRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;

    /**
     * Lấy danh sách tất cả các chi tiết tồn kho
     */
    public List<DetailinventoryDTO> list() {
        return detailinventoryRepository.findAll()
                .stream()
                .map(DetailinventoryDTO::fromEntity)
                .toList();
    }

    /**
     * Lấy thông tin chi tiết kho theo ID (giả định ID ở đây đại diện cho Warehouse ID hoặc trả về một list)
     */
    public DetailinventoryDTO get(Long id) {
        // Vì là khóa composite, tìm bản ghi đầu tiên có WarehouseID khớp
        return detailinventoryRepository.findAll()
                .stream()
                .filter(item -> item.getId().getWarehouseid().equals(id))
                .map(DetailinventoryDTO::fromEntity)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("DetailInventory not found for warehouse id: " + id));
    }

    /**
     * Tạo mới một chi tiết kho
     */
    public DetailinventoryDTO create(DetailinventoryDTO dto) {
        Detailinventory entity = convertToEntity(dto);
        Detailinventory saved = detailinventoryRepository.save(entity);
        return DetailinventoryDTO.fromEntity(saved);
    }

    /**
     * Cập nhật thông tin chi tiết kho theo composite key
     */
    public DetailinventoryDTO update(Long id, DetailinventoryDTO dto) {
        DetailinventoryId key = new DetailinventoryId();
        key.setWarehouseid(id);
        key.setProductid(dto.getProductId());

        Detailinventory existing = detailinventoryRepository.findById(key)
                .orElseThrow(() -> new RuntimeException("DetailInventory not found for key: " + key));

        existing.setCurrentquantity(dto.getCurrentquantity());
        existing.setRealstock(dto.getRealstock());
        existing.setAvailablestock(dto.getAvailablestock());
        existing.setMinstock(dto.getMinstock());
        existing.setMaxstock(dto.getMaxstock());
        existing.setIsalertenabled(dto.getIsalertenabled());
        existing.setStoragelocation(dto.getStoragelocation());

        Detailinventory updated = detailinventoryRepository.save(existing);
        return DetailinventoryDTO.fromEntity(updated);
    }

    /**
     * Xóa các chi tiết kho liên quan đến warehouse id
     */
    public void delete(Long id) {
        List<Detailinventory> list = detailinventoryRepository.findAll().stream()
                .filter(item -> item.getId().getWarehouseid().equals(id))
                .toList();
        detailinventoryRepository.deleteAll(list);
    }

    // Convert DTO to Entity
    private Detailinventory convertToEntity(DetailinventoryDTO dto) {
        Detailinventory entity = new Detailinventory();
        
        DetailinventoryId key = new DetailinventoryId();
        key.setWarehouseid(dto.getWarehouseId());
        key.setProductid(dto.getProductId());
        entity.setId(key);

        Warehouse wh = warehouseRepository.findById(dto.getWarehouseId())
                .orElseThrow(() -> new RuntimeException("Warehouse not found: " + dto.getWarehouseId()));
        Product prod = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found: " + dto.getProductId()));

        entity.setWarehouseid(wh);
        entity.setProductid(prod);
        
        entity.setCurrentquantity(dto.getCurrentquantity());
        entity.setRealstock(dto.getRealstock());
        entity.setAvailablestock(dto.getAvailablestock());
        entity.setMinstock(dto.getMinstock());
        entity.setMaxstock(dto.getMaxstock());
        entity.setIsalertenabled(dto.getIsalertenabled());
        entity.setStoragelocation(dto.getStoragelocation());
        
        return entity;
    }
}
