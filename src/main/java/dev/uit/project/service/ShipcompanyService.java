package dev.uit.project.service;

import dev.uit.project.dto.ShipcompanyDTO;
import dev.uit.project.entity.Shipcompany;
import dev.uit.project.repository.ShipcompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShipcompanyService {

    private final ShipcompanyRepository shipcompanyRepository;

    /**
     * Lấy danh sách tất cả các công ty vận chuyển
     */
    public List<ShipcompanyDTO> list() {
        return shipcompanyRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /**
     * Lấy thông tin công ty vận chuyển theo ID
     */
    public ShipcompanyDTO get(Long id) {
        return shipcompanyRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Shipcompany not found with id: " + id));
    }

    /**
     * Tạo mới một công ty vận chuyển
     */
    public ShipcompanyDTO create(ShipcompanyDTO shipcompanyDTO) {
        Shipcompany shipcompany = convertToEntity(shipcompanyDTO);
        shipcompany.setId(null); // đảm bảo tạo mới
        Shipcompany saved = shipcompanyRepository.save(shipcompany);
        return convertToDTO(saved);
    }

    /**
     * Cập nhật thông tin công ty vận chuyển
     */
    public ShipcompanyDTO update(Long id, ShipcompanyDTO shipcompanyDTO) {
        Shipcompany existing = shipcompanyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipcompany not found with id: " + id));

        existing.setShipcompanyname(shipcompanyDTO.getShipcompanyname());
        existing.setSupportedregion(shipcompanyDTO.getSupportedregion());
        existing.setPhone(shipcompanyDTO.getPhone());
        existing.setEmail(shipcompanyDTO.getEmail());
        existing.setAddress(shipcompanyDTO.getAddress());
        existing.setNotes(shipcompanyDTO.getNotes());
        existing.setStatus(shipcompanyDTO.getStatus());

        Shipcompany updated = shipcompanyRepository.save(existing);
        return convertToDTO(updated);
    }

    /**
     * Xóa một công ty vận chuyển
     */
    public void delete(Long id) {
        if (!shipcompanyRepository.existsById(id)) {
            throw new RuntimeException("Shipcompany not found with id: " + id);
        }
        shipcompanyRepository.deleteById(id);
    }

    // ------------------ Chuyển đổi Entity <-> DTO ------------------

    private ShipcompanyDTO convertToDTO(Shipcompany entity) {
        return ShipcompanyDTO.fromEntity(entity);
    }

    private Shipcompany convertToEntity(ShipcompanyDTO dto) {
        Shipcompany shipcompany = new Shipcompany();
        shipcompany.setShipcompanyname(dto.getShipcompanyname());
        shipcompany.setSupportedregion(dto.getSupportedregion());
        shipcompany.setPhone(dto.getPhone());
        shipcompany.setEmail(dto.getEmail());
        shipcompany.setAddress(dto.getAddress());
        shipcompany.setNotes(dto.getNotes());
        shipcompany.setStatus(dto.getStatus());
        return shipcompany;
    }
}