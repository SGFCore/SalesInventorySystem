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

    public void processExchange(Long orderId, Long oldProductId, Long newProductId, Integer quantity) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
        
        Product oldProduct = productRepository.findById(oldProductId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm cũ không tồn tại"));
        Product newProduct = productRepository.findById(newProductId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm mới không tồn tại"));

        DetailinventoryId newInvId = new DetailinventoryId();
        newInvId.setWarehouseid(2L); // Kho cửa hàng
        newInvId.setProductid(newProductId);

        Detailinventory newInv = detailinventoryRepository.findById(newInvId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm đổi chưa được cấu hình tại kho cửa hàng"));

        if (newInv.getAvailablestock() < quantity) {
            throw new RuntimeException("Không đủ số lượng tồn kho khả dụng để đổi");
        }

        // Tạo order return
        Orderreturn orderReturn = new Orderreturn();
        orderReturn.setOrderid(order);
        orderReturn.setReturndate(LocalDate.now());
        orderReturn.setReason("Đổi hàng");
        orderReturn.setStatus("Chờ xử lý");
        orderReturn.setTotalrefund(BigDecimal.ZERO); // Tính bù trừ ngoài luồng, hoặc tính lại nếu cần.
        Orderreturn savedReturn = orderReturnRepository.save(orderReturn);

        // Chi tiết trả (SP cũ)
        Returndetail detail = new Returndetail();
        ReturndetailId detailId = new ReturndetailId();
        detailId.setReturnid(savedReturn.getId());
        detailId.setProductid(oldProductId);
        detail.setId(detailId);
        detail.setReturnid(savedReturn);
        detail.setProductid(oldProduct);
        detail.setQuantity(Long.valueOf(quantity));
        
        Warehouse targetWh = warehouseRepository.findById(2L).orElse(null);
        detail.setTargetwarehouseid(targetWh);
        detail.setActiontaken("Đã đổi");
        detail.setQcStatus("Đạt chuẩn");
        returnDetailRepository.save(detail);

        // Update inventory for new product (subtract available and real stock)
        newInv.setAvailablestock(newInv.getAvailablestock() - quantity);
        newInv.setRealstock(newInv.getRealstock() - quantity);
        detailinventoryRepository.save(newInv);

        // Update inventory for old product (add available and real stock)
        DetailinventoryId oldInvId = new DetailinventoryId();
        oldInvId.setWarehouseid(2L);
        oldInvId.setProductid(oldProductId);
        Detailinventory oldInv = detailinventoryRepository.findById(oldInvId).orElse(null);
        if (oldInv != null) {
            oldInv.setAvailablestock(oldInv.getAvailablestock() + quantity);
            oldInv.setRealstock(oldInv.getRealstock() + quantity);
            detailinventoryRepository.save(oldInv);
        }
    }

    public void processReturn(Long orderId, String reason, List<Map<String, Object>> items) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        BigDecimal totalRefund = BigDecimal.ZERO;

        Orderreturn orderReturn = new Orderreturn();
        orderReturn.setOrderid(order);
        orderReturn.setReturndate(LocalDate.now());
        orderReturn.setReason(reason);
        orderReturn.setStatus("Chờ duyệt hoàn tiền");
        Orderreturn savedReturn = orderReturnRepository.save(orderReturn);

        for (Map<String, Object> item : items) {
            Long productId = Long.valueOf(item.get("productId").toString());
            Integer quantity = Integer.valueOf(item.get("quantity").toString());
            String condition = item.get("condition").toString();

            Product p = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("SP không tồn tại"));
            
            Returndetail detail = new Returndetail();
            ReturndetailId detailId = new ReturndetailId();
            detailId.setReturnid(savedReturn.getId());
            detailId.setProductid(productId);
            detail.setId(detailId);
            detail.setReturnid(savedReturn);
            detail.setProductid(p);
            detail.setQuantity(Long.valueOf(quantity));
            // Removed detail.setCondition(condition) because it does not exist in Returndetail

            if (condition.equals("Còn mới")) {
                Warehouse targetWh = warehouseRepository.findById(2L).orElse(null);
                detail.setTargetwarehouseid(targetWh); // Kho quầy
                detail.setQcStatus("Đạt chuẩn");
                detail.setActiontaken("Nhập lại kho");

                DetailinventoryId invId = new DetailinventoryId();
                invId.setWarehouseid(2L);
                invId.setProductid(productId);
                Detailinventory inv = detailinventoryRepository.findById(invId).orElse(null);
                if (inv != null) {
                    inv.setAvailablestock(inv.getAvailablestock() + quantity);
                    inv.setRealstock(inv.getRealstock() + quantity);
                    detailinventoryRepository.save(inv);
                }
            } else {
                Warehouse targetWh = warehouseRepository.findById(3L).orElse(null);
                detail.setTargetwarehouseid(targetWh); // Kho lỗi
                detail.setQcStatus("Lỗi");
                detail.setActiontaken("Nhập kho lỗi");

                DetailinventoryId invId = new DetailinventoryId();
                invId.setWarehouseid(3L);
                invId.setProductid(productId);
                Detailinventory inv = detailinventoryRepository.findById(invId).orElse(null);
                if (inv != null) {
                    inv.setRealstock(inv.getRealstock() + quantity);
                    // Lỗi thì không cộng available
                    detailinventoryRepository.save(inv);
                }
            }
            returnDetailRepository.save(detail);

            BigDecimal price = p.getProductprice() != null ? new BigDecimal(p.getProductprice()) : BigDecimal.ZERO;
            totalRefund = totalRefund.add(price.multiply(new BigDecimal(quantity)));
        }

        savedReturn.setTotalrefund(totalRefund);
        orderReturnRepository.save(savedReturn);
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
