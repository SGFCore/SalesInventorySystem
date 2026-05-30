package dev.uit.project.service;

import dev.uit.project.dto.OrderDTO;
import dev.uit.project.entity.*;
import dev.uit.project.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SalesService {

    private final OrderRepository orderRepository;
    private final OrderReturnRepository orderReturnRepository;
    private final ReturnDetailRepository returnDetailRepository;
    private final DetailinventoryRepository detailinventoryRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;

    public List<OrderDTO> searchOrders(String keyword) {
        String lowerKeyword = keyword.toLowerCase();
        return orderRepository.findAll().stream()
                .filter(o -> 
                    (o.getId() != null && o.getId().toString().contains(lowerKeyword)) ||
                    (o.getCustomerid() != null && o.getCustomerid().getPhone() != null && o.getCustomerid().getPhone().contains(lowerKeyword)) ||
                    (o.getInvoiceid() != null && o.getInvoiceid().getId() != null && o.getInvoiceid().getId().toString().contains(lowerKeyword))
                )
                .map(OrderDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void processExchange(Long orderId, Long oldProductId, Long newProductId, Integer quantity, Long employeeId) {
        if (!oldProductId.equals(newProductId)) {
            throw new RuntimeException("Chế độ đổi hàng hiện tại chỉ áp dụng 1 đổi 1 cùng mã SKU");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
        
        Product product = productRepository.findById(oldProductId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));

        Employee emp = employeeRepository.findById(employeeId).orElse(null);

        Long warehouseId = 2L; 

        DetailinventoryId invId = new DetailinventoryId();
        invId.setWarehouseid(warehouseId);
        invId.setProductid(oldProductId);

        Detailinventory inv = detailinventoryRepository.findById(invId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm đổi chưa được cấu hình tại kho cửa hàng"));

        if (inv.getAvailablestock() < quantity) {
            throw new RuntimeException("Không đủ số lượng tồn kho khả dụng để đổi");
        }

        // Tạo order return
        Orderreturn orderReturn = new Orderreturn();
        orderReturn.setOrderid(order);
        orderReturn.setEmployeeid(emp);
        orderReturn.setReturndate(LocalDate.now());
        orderReturn.setReason("Đổi hàng 1-1");
        orderReturn.setStatus("Hoàn tất");
        orderReturn.setTotalrefund(BigDecimal.ZERO);
        orderReturn.setReturnrefcode("EXCH-" + orderId + "-" + (int)(Math.random() * 1000));
        Orderreturn savedReturn = orderReturnRepository.save(orderReturn);

        // Chi tiết trả (SP cũ nhập lại)
        Returndetail detail = new Returndetail();
        ReturndetailId detailId = new ReturndetailId();
        detailId.setReturnid(savedReturn.getId());
        detailId.setProductid(oldProductId);
        detail.setId(detailId);
        detail.setReturnid(savedReturn);
        detail.setProductid(product);
        detail.setQuantity(Long.valueOf(quantity));
        detail.setQcStatus("Đạt chuẩn");
        detail.setTargetwarehouseid(warehouseRepository.findById(warehouseId).orElse(null));
        detail.setActiontaken("Đã đổi 1-1");
        returnDetailRepository.save(detail);

        System.out.println("AUDIT LOG: NV " + (emp != null ? emp.getFullname() : "Unknown") + " xử lý ĐỔI HÀNG cho ĐH #" + orderId);
    }

    public void processReturn(Long orderId, String reason, Long employeeId, List<Map<String, Object>> items) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        Employee emp = employeeRepository.findById(employeeId).orElse(null);
        BigDecimal totalRefund = BigDecimal.ZERO;

        Orderreturn orderReturn = new Orderreturn();
        orderReturn.setOrderid(order);
        orderReturn.setEmployeeid(emp);
        orderReturn.setReturndate(LocalDate.now());
        orderReturn.setReason(reason);
        orderReturn.setStatus("Chờ xử lý"); // Yêu cầu hoàn tiền khách hàng
        orderReturn.setReturnrefcode("REF-" + orderId + "-" + (int)(Math.random() * 1000));
        Orderreturn savedReturn = orderReturnRepository.save(orderReturn);

        for (Map<String, Object> item : items) {
            Long productId = Long.valueOf(item.get("productId").toString());
            Integer quantity = Integer.valueOf(item.get("quantity").toString());
            
            String qcStatus = item.get("qcStatus") != null ? item.get("qcStatus").toString() : "Đạt chuẩn";
            Long targetWarehouseId = item.get("targetWarehouseId") != null ? Long.valueOf(item.get("targetWarehouseId").toString()) : 2L;
            String actionTaken = item.get("actionTaken") != null ? item.get("actionTaken").toString() : "Nhập lại kho";

            Product p = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("SP không tồn tại"));
            
            Returndetail detail = new Returndetail();
            ReturndetailId detailId = new ReturndetailId();
            detailId.setReturnid(savedReturn.getId());
            detailId.setProductid(productId);
            detail.setId(detailId);
            detail.setReturnid(savedReturn);
            detail.setProductid(p);
            detail.setQuantity(Long.valueOf(quantity));
            detail.setQcStatus(qcStatus);
            detail.setTargetwarehouseid(warehouseRepository.findById(targetWarehouseId).orElse(null));
            detail.setActiontaken(actionTaken);
            returnDetailRepository.save(detail);

            // Cập nhật tồn kho
            if ("Nhập lại kho".equals(actionTaken)) {
                DetailinventoryId invId = new DetailinventoryId();
                invId.setWarehouseid(targetWarehouseId);
                invId.setProductid(productId);
                Detailinventory inv = detailinventoryRepository.findById(invId).orElse(null);
                if (inv != null) {
                    inv.setAvailablestock(inv.getAvailablestock() + quantity);
                    inv.setRealstock(inv.getRealstock() + quantity);
                    detailinventoryRepository.save(inv);
                }
            } else if ("Hủy hàng".equals(actionTaken) || "Chờ sửa chữa".equals(actionTaken)) {
                DetailinventoryId invId = new DetailinventoryId();
                invId.setWarehouseid(targetWarehouseId);
                invId.setProductid(productId);
                Detailinventory inv = detailinventoryRepository.findById(invId).orElse(null);
                if (inv != null) {
                    inv.setRealstock(inv.getRealstock() + quantity);
                    detailinventoryRepository.save(inv);
                }
            }

            BigDecimal price = p.getProductprice() != null ? new BigDecimal(p.getProductprice()) : BigDecimal.ZERO;
            totalRefund = totalRefund.add(price.multiply(new BigDecimal(quantity)));
        }

        savedReturn.setTotalrefund(totalRefund);
        orderReturnRepository.save(savedReturn);
        
        System.out.println("AUDIT LOG: NV " + (emp != null ? emp.getFullname() : "Unknown") + " xử lý TRẢ HÀNG cho ĐH #" + orderId + ". Hoàn tiền: " + totalRefund);
    }

    @Autowired
    private dev.uit.project.repository.TransferticketRepository transferticketRepository;
    @Autowired
    private dev.uit.project.repository.TransferticketdetailRepository transferticketdetailRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<dev.uit.project.dto.TransferticketDTO> getTransferTickets() {
        return transferticketRepository.findAll().stream()
                .map(dev.uit.project.dto.TransferticketDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void createTransferTicket(Map<String, Object> payload) {
        Long employeeId = payload.get("employeeId") != null ? Long.valueOf(payload.get("employeeId").toString()) : null;
        Long sourceWhId = Long.valueOf(payload.get("sourceWarehouseId").toString());
        Long destWhId = Long.valueOf(payload.get("destinationWarehouseId").toString());
        List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("items");

        Employee emp = employeeId != null ? employeeRepository.findById(employeeId).orElse(null) : null;
        Warehouse sourceWh = warehouseRepository.findById(sourceWhId).orElseThrow(() -> new RuntimeException("Kho xuất không hợp lệ"));
        Warehouse destWh = warehouseRepository.findById(destWhId).orElseThrow(() -> new RuntimeException("Kho nhập không hợp lệ"));

        Transferticket ticket = new Transferticket();
        ticket.setEmployeeid(emp);
        ticket.setSourcewhid(sourceWh);
        ticket.setDestwhid(destWh);
        ticket.setStatus("Đang luân chuyển"); // Tạm thời để 'Đang luân chuyển' luôn để demo nhân viên có thể xác nhận
        ticket.setCreateddate(LocalDate.now());
        Transferticket savedTicket = transferticketRepository.save(ticket);

        for (Map<String, Object> item : items) {
            Long productId = Long.valueOf(item.get("productId").toString());
            Long quantity = Long.valueOf(item.get("quantity").toString());

            Product p = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("SP không hợp lệ"));

            Transferticketdetail detail = new Transferticketdetail();
            TransferticketdetailId detailId = new TransferticketdetailId();
            detailId.setTransferid(savedTicket.getId());
            detailId.setProductid(productId);
            detail.setId(detailId);
            detail.setTransferid(savedTicket);
            detail.setProductid(p);
            detail.setRequestquantity(quantity);
            // Vì tự động chuyển sang Đang luân chuyển, set luôn exportQuantity
            detail.setExportquantity(quantity); 
            transferticketdetailRepository.save(detail);

            // Trừ tồn kho tại kho xuất
            DetailinventoryId srcInvId = new DetailinventoryId();
            srcInvId.setWarehouseid(sourceWhId);
            srcInvId.setProductid(productId);
            Detailinventory srcInv = detailinventoryRepository.findById(srcInvId).orElse(null);
            if (srcInv != null) {
                srcInv.setAvailablestock(srcInv.getAvailablestock() - quantity);
                srcInv.setRealstock(srcInv.getRealstock() - quantity);
                detailinventoryRepository.save(srcInv);
            }
        }
    }

    public void confirmTransferReceive(Long id) {
        Transferticket ticket = transferticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu luân chuyển"));

        if (!"Đang luân chuyển".equals(ticket.getStatus())) {
            throw new RuntimeException("Trạng thái phiếu không hợp lệ để nhận hàng");
        }

        ticket.setStatus("Hoàn tất");
        // ticket.setTransferdate(LocalDate.now()); // Không có cột Transferdate trong DB hiện tại
        transferticketRepository.save(ticket);

        List<Transferticketdetail> details = transferticketdetailRepository.findAll().stream()
                .filter(d -> d.getTransferid().getId().equals(id))
                .toList();

        for (Transferticketdetail detail : details) {
            Long qty = detail.getRequestquantity();
            detail.setReceivequantity(qty);
            transferticketdetailRepository.save(detail);

            // Cộng tồn kho tại kho nhập
            DetailinventoryId destInvId = new DetailinventoryId();
            destInvId.setWarehouseid(ticket.getDestwhid().getId());
            destInvId.setProductid(detail.getProductid().getId());
            Detailinventory destInv = detailinventoryRepository.findById(destInvId).orElse(new Detailinventory());
            
            if (destInv.getId() == null) {
                destInv.setId(destInvId);
                destInv.setWarehouseid(ticket.getDestwhid());
                destInv.setProductid(detail.getProductid());
                destInv.setRealstock(qty);
                destInv.setAvailablestock(qty);
                destInv.setMinstock(5L);
            } else {
                destInv.setRealstock((destInv.getRealstock() != null ? destInv.getRealstock() : 0) + qty);
                destInv.setAvailablestock((destInv.getAvailablestock() != null ? destInv.getAvailablestock() : 0) + qty);
            }
            detailinventoryRepository.save(destInv);
        }
    }
}
