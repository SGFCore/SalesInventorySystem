package dev.uit.project.service;

import dev.uit.project.dto.OrderDTO;
import dev.uit.project.entity.*;
import dev.uit.project.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;
    private final InvoiceRepository invoiceRepository;
    private final ShipcompanyRepository shipcompanyRepository;
    private final ExportreceiptRepository exportreceiptRepository;

    public List<OrderDTO> list() {
        return orderRepository.findAll()
                .stream()
                .map(OrderDTO::fromEntity)
                .toList();
    }

    public OrderDTO get(Long id) {
        return orderRepository.findById(id)
                .map(OrderDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
    }

    public OrderDTO create(OrderDTO dto) {
        Order entity = convertToEntity(dto);
        Order saved = orderRepository.save(entity);
        return OrderDTO.fromEntity(saved);
    }

    public OrderDTO update(Long id, OrderDTO dto) {
        Order existing = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));

        if (dto.getCustomerId() != null) {
            Customer cust = customerRepository.findById(dto.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found: " + dto.getCustomerId()));
            existing.setCustomerid(cust);
        } else {
            existing.setCustomerid(null);
        }
        if (dto.getEmployeeId() != null) {
            Employee emp = employeeRepository.findById(dto.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeId()));
            existing.setEmployeeid(emp);
        } else {
            existing.setEmployeeid(null);
        }
        if (dto.getInvoiceId() != null) {
            Invoice inv = invoiceRepository.findById(dto.getInvoiceId())
                    .orElseThrow(() -> new RuntimeException("Invoice not found: " + dto.getInvoiceId()));
            existing.setInvoiceid(inv);
        } else {
            existing.setInvoiceid(null);
        }
        if (dto.getShipCompanyId() != null) {
            Shipcompany comp = shipcompanyRepository.findById(dto.getShipCompanyId())
                    .orElseThrow(() -> new RuntimeException("Shipcompany not found: " + dto.getShipCompanyId()));
            existing.setShipcompanyid(comp);
        } else {
            existing.setShipcompanyid(null);
        }
        if (dto.getExportreceiptid() != null) {
            Exportreceipt rec = exportreceiptRepository.findById(dto.getExportreceiptid())
                    .orElseThrow(() -> new RuntimeException("Exportreceipt not found: " + dto.getExportreceiptid()));
            existing.setExportreceiptid(rec);
        } else {
            existing.setExportreceiptid(null);
        }

        existing.setShipcode(dto.getShipcode());
        existing.setTotalamount(dto.getTotalamount());
        existing.setOrderstatus(dto.getOrderstatus());
        existing.setShippingstatus(dto.getShippingstatus());
        existing.setShipmentnote(dto.getShipmentnote());
        existing.setShippingfee(dto.getShippingfee());

        Order updated = orderRepository.save(existing);
        return OrderDTO.fromEntity(updated);
    }

    public void delete(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found: " + id);
        }
        orderRepository.deleteById(id);
    }

    private Order convertToEntity(OrderDTO dto) {
        Order entity = new Order();
        if (dto.getCustomerId() != null) {
            Customer cust = customerRepository.findById(dto.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found: " + dto.getCustomerId()));
            entity.setCustomerid(cust);
        }
        if (dto.getEmployeeId() != null) {
            Employee emp = employeeRepository.findById(dto.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeId()));
            entity.setEmployeeid(emp);
        }
        if (dto.getInvoiceId() != null) {
            Invoice inv = invoiceRepository.findById(dto.getInvoiceId())
                    .orElseThrow(() -> new RuntimeException("Invoice not found: " + dto.getInvoiceId()));
            entity.setInvoiceid(inv);
        }
        if (dto.getShipCompanyId() != null) {
            Shipcompany comp = shipcompanyRepository.findById(dto.getShipCompanyId())
                    .orElseThrow(() -> new RuntimeException("Shipcompany not found: " + dto.getShipCompanyId()));
            entity.setShipcompanyid(comp);
        }
        if (dto.getExportreceiptid() != null) {
            Exportreceipt rec = exportreceiptRepository.findById(dto.getExportreceiptid())
                    .orElseThrow(() -> new RuntimeException("Exportreceipt not found: " + dto.getExportreceiptid()));
            entity.setExportreceiptid(rec);
        }
        entity.setShipcode(dto.getShipcode());
        entity.setTotalamount(dto.getTotalamount());
        entity.setOrderstatus(dto.getOrderstatus());
        entity.setShippingstatus(dto.getShippingstatus());
        entity.setShipmentnote(dto.getShipmentnote());
        entity.setShippingfee(dto.getShippingfee());
        return entity;
    }
}
