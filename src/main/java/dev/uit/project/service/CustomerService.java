package dev.uit.project.service;

import dev.uit.project.dto.CustomerDTO;
import dev.uit.project.dto.CustomertypeDTO;
import dev.uit.project.entity.Customer;
import dev.uit.project.entity.Customertype;
import dev.uit.project.repository.CustomerRepository;
import dev.uit.project.repository.CustomertypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomertypeRepository customertypeRepository;

    /**
     * Lấy danh sách tất cả khách hàng
     */
    public List<CustomerDTO> list() {
        return customerRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /**
     * Lấy thông tin khách hàng theo ID
     */
    public CustomerDTO get(Long id) {
        return customerRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
    }

    /**
     * Tạo mới khách hàng
     */
    public CustomerDTO create(CustomerDTO customerDTO) {
        Customer customer = convertToEntity(customerDTO);
        customer.setId(null); // đảm bảo tạo mới
        customer.setCreateddate(LocalDate.now()); // gán ngày tạo hiện tại
        Customer saved = customerRepository.save(customer);
        return convertToDTO(saved);
    }

    /**
     * Cập nhật thông tin khách hàng
     */
    public CustomerDTO update(Long id, CustomerDTO customerDTO) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        // Cập nhật các trường từ DTO
        existing.setFirstname(customerDTO.getFirstname());
        existing.setLastname(customerDTO.getLastname());
        existing.setCompanyname(customerDTO.getCompanyname());
        existing.setPhone(customerDTO.getPhone());
        existing.setAddress(customerDTO.getAddress());
        existing.setEmail(customerDTO.getEmail());
        existing.setTotalaccumulatedspent(customerDTO.getTotalaccumulatedspent());

        // Xử lý customertype (nếu có)
        CustomertypeDTO typeDTO = customerDTO.getCustomertypeid();
        if (typeDTO != null && typeDTO.getId() != null) {
            Customertype customertype = customertypeRepository.findById(typeDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Customertype not found with id: " + typeDTO.getId()));
            existing.setCustomertypeid(customertype);
        } else {
            existing.setCustomertypeid(null);
        }

        Customer updated = customerRepository.save(existing);
        return convertToDTO(updated);
    }

    /**
     * Xóa khách hàng
     */
    public void delete(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found with id: " + id);
        }
        customerRepository.deleteById(id);
    }

    // ------------------ Chuyển đổi Entity <-> DTO ------------------

    private CustomerDTO convertToDTO(Customer entity) {
        return CustomerDTO.fromEntity(entity);
    }

    private Customer convertToEntity(CustomerDTO dto) {
        Customer customer = new Customer();
        customer.setFirstname(dto.getFirstname());
        customer.setLastname(dto.getLastname());
        customer.setCompanyname(dto.getCompanyname());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setEmail(dto.getEmail());
        customer.setTotalaccumulatedspent(dto.getTotalaccumulatedspent());
        // Không set id (sẽ do DB tự sinh khi tạo mới)
        // Không set createddate (sẽ gán trong create)

        // Xử lý customertype
        CustomertypeDTO typeDTO = dto.getCustomertypeid();
        if (typeDTO != null && typeDTO.getId() != null) {
            Customertype customertype = customertypeRepository.findById(typeDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Customertype not found with id: " + typeDTO.getId()));
            customer.setCustomertypeid(customertype);
        } else {
            customer.setCustomertypeid(null);
        }

        return customer;
    }
}