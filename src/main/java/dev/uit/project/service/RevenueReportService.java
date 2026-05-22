package dev.uit.project.service;

import dev.uit.project.dto.RevenueReportDTO;
import dev.uit.project.dto.RevenueReportLineDTO;
import dev.uit.project.repository.OrderDetailRepository;
import dev.uit.project.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RevenueReportService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    // ==================== PUBLIC METHODS ====================

    public RevenueReportDTO getDailyRevenueReport(LocalDate date) {
        List<Object[]> orders = orderRepository.findPaidOrdersByDate(date);
        return buildReport(orders, date, date, "DAILY");
    }

    public RevenueReportDTO getMonthlyRevenueReport(int month, int year) {
        List<Object[]> orders = orderRepository.findPaidOrdersByMonth(month, year);
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);
        return buildReport(orders, startDate, endDate, "MONTHLY");
    }

    public RevenueReportDTO getYearlyRevenueReport(int year) {
        List<Object[]> orders = orderRepository.findPaidOrdersByYear(year);
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        return buildReport(orders, startDate, endDate, "YEARLY");
    }

    // ==================== PRIVATE HELPERS ====================

    private RevenueReportDTO buildReport(List<Object[]> orderRows, LocalDate start, LocalDate end, String type) {
        if (orderRows == null || orderRows.isEmpty()) {
            return emptyReport(start, end, type);
        }

        // Lấy danh sách Order IDs
        List<Long> orderIds = orderRows.stream()
                .map(row -> ((Number) row[0]).longValue())
                .collect(Collectors.toList());

        // Lấy chi tiết sản phẩm (gộp theo product)
        List<Object[]> detailRows = orderDetailRepository.sumByOrderIds(orderIds);
        List<RevenueReportLineDTO> details = detailRows.stream()
                .map(this::mapToDetailDTO)
                .collect(Collectors.toList());

        // Tính tổng doanh thu theo kênh
        BigDecimal direct = BigDecimal.ZERO;
        BigDecimal online = BigDecimal.ZERO;
        for (Object[] row : orderRows) {
            BigDecimal amount = (BigDecimal) row[1];
            String channel = (String) row[3];
            if ("Direct".equals(channel)) {
                direct = direct.add(amount != null ? amount : BigDecimal.ZERO);
            } else {
                online = online.add(amount != null ? amount : BigDecimal.ZERO);
            }
        }

        // Gộp kết quả
        RevenueReportDTO dto = new RevenueReportDTO();
        dto.setStartDate(start);
        dto.setEndDate(end);
        dto.setReportType(type);
        dto.setTotalDirectSales(direct);
        dto.setTotalOnlineSales(online);
        dto.setTotalRevenue(direct.add(online));
        dto.setDetails(details);
        return dto;
    }

    private RevenueReportLineDTO mapToDetailDTO(Object[] row) {
        // row: [productId, productName, totalQuantity, totalAmount]
        RevenueReportLineDTO dto = new RevenueReportLineDTO();
        dto.setProductName((String) row[1]);
        dto.setQuantity(((Number) row[2]).longValue());

        BigDecimal totalAmount = (BigDecimal) row[3];
        dto.setTotalAmount(totalAmount);

        // Tính unitPrice = totalAmount / quantity (nếu có)
        if (dto.getQuantity() != null && dto.getQuantity() > 0 && totalAmount != null) {
            BigDecimal unitPrice = totalAmount.divide(BigDecimal.valueOf(dto.getQuantity()), 2, RoundingMode.HALF_UP);
            dto.setUnitPrice(unitPrice);
        } else {
            dto.setUnitPrice(BigDecimal.ZERO);
        }
        return dto;
    }

    private RevenueReportDTO emptyReport(LocalDate start, LocalDate end, String type) {
        RevenueReportDTO dto = new RevenueReportDTO();
        dto.setStartDate(start);
        dto.setEndDate(end);
        dto.setReportType(type);
        dto.setTotalDirectSales(BigDecimal.ZERO);
        dto.setTotalOnlineSales(BigDecimal.ZERO);
        dto.setTotalRevenue(BigDecimal.ZERO);
        dto.setDetails(List.of());
        return dto;
    }
}