package dev.uit.project.service;

import dev.uit.project.dto.OrderDTO;
import dev.uit.project.entity.*;
import dev.uit.project.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;
    private final InvoiceRepository invoiceRepository;
    private final ShipcompanyRepository shipcompanyRepository;
    private final ExportreceiptRepository exportreceiptRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final OrderPdfService orderPdfService;

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
        if (dto.getShipcompanyId() != null) {
            Shipcompany comp = shipcompanyRepository.findById(dto.getShipcompanyId())
                    .orElseThrow(() -> new RuntimeException("Shipcompany not found: " + dto.getShipcompanyId()));
            existing.setShipcompanyid(comp);
        } else {
            existing.setShipcompanyid(null);
        }
        if (dto.getExportreceiptId() != null) {
            Exportreceipt rec = exportreceiptRepository.findById(dto.getExportreceiptId())
                    .orElseThrow(() -> new RuntimeException("Exportreceipt not found: " + dto.getExportreceiptId()));
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

    public List<OrderDTO> getShippingReadyOrders() {
        // shippingstatus = 4 (Packed), 2 (In Transit); salechannelid = 1 (Online)
        return orderRepository.findAll()
                .stream()
                .filter(o -> (o.getShippingstatus() != null && (o.getShippingstatus() == 4 || o.getShippingstatus() == 2)) 
                          && (o.getInvoiceid() != null && o.getInvoiceid().getSalechannelcode() == 1))
                .map(OrderDTO::fromEntity)
                .toList();
    }

    public List<OrderDTO> getCompletedOrders() {
        return orderRepository.findAll()
                .stream()
                .filter(o -> o.getOrderstatus() != null && o.getOrderstatus() == 3)
                .map(OrderDTO::fromEntity)
                .toList();
    }

    public OrderDTO assignShipping(Long orderId, Long shipCompanyId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        Shipcompany company = shipcompanyRepository.findById(shipCompanyId)
                .orElseThrow(() -> new RuntimeException("Shipcompany not found"));

        order.setShipcompanyid(company);
        order.setShippingstatus(2L); // 2 = In Transit / Sent to Shipping
        
        // Generate random ship code
        String randomCode = "SGF" + System.currentTimeMillis() % 1000000 + (int)(Math.random() * 100);
        order.setShipcode(randomCode);

        return OrderDTO.fromEntity(orderRepository.save(order));
    }

    public OrderDTO cancelShipping(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // Trigger C18 will handle the inventory restoration on OrderStatus = 4
        order.setOrderstatus(4L); // 4 = Cancelled
        order.setShippingstatus(3L); // 3 = Returned/Refused (or suitable status)
        
        return OrderDTO.fromEntity(orderRepository.save(order));
    }

    public java.io.ByteArrayOutputStream generatePickListPdf(List<Long> orderIds) throws com.itextpdf.text.DocumentException {
        List<Orderdetail> allDetails = orderDetailRepository.findByOrderid_IdIn(orderIds);
        return orderPdfService.generatePickListPdf(allDetails);
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
        if (dto.getShipcompanyId() != null) {
            Shipcompany comp = shipcompanyRepository.findById(dto.getShipcompanyId())
                    .orElseThrow(() -> new RuntimeException("Shipcompany not found: " + dto.getShipcompanyId()));
            entity.setShipcompanyid(comp);
        }
        if (dto.getExportreceiptId() != null) {
            Exportreceipt rec = exportreceiptRepository.findById(dto.getExportreceiptId())
                    .orElseThrow(() -> new RuntimeException("Exportreceipt not found: " + dto.getExportreceiptId()));
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
