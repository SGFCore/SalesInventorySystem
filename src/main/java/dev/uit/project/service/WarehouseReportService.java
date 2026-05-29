package dev.uit.project.service;

import dev.uit.project.dto.WarehouseReportDTO;
import dev.uit.project.dto.WarehouseReportLineDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WarehouseReportService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private dev.uit.project.repository.DetailinventoryRepository detailinventoryRepository;

    @Autowired
    private WarehouseReportPdfService warehouseReportPdfService;

    public ByteArrayOutputStream generateInventoryPdf(Long warehouseId, Long productId) throws com.itextpdf.text.DocumentException {
        List<dev.uit.project.entity.Detailinventory> items = detailinventoryRepository.findWithFilters(warehouseId, productId);
        return warehouseReportPdfService.generateInventoryPdf(items);
    }

    public List<dev.uit.project.entity.Detailinventory> getInventoryReport(Long warehouseId, Long productId) {
        return detailinventoryRepository.findWithFilters(warehouseId, productId);
    }

    public WarehouseReportDTO getMonthlyWarehouseReport(int month, int year) {
        WarehouseReportDTO report = new WarehouseReportDTO();
        report.setMonth(LocalDate.of(year, month, 1));

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        // 1. Lấy dữ liệu nhập kho trong khoảng thời gian
        String importSql = """
            SELECT ir.CREATEDDATE, p.PRODUCTNAME, ird.ACTUALQUANTITY
            FROM IMPORTRECEIPT ir
            JOIN IMPORTRECEIPTDETAIL ird ON ir.IMPORTRECEIPTID = ird.IMPORTRECEIPTID
            JOIN PRODUCT p ON ird.PRODUCTID = p.PRODUCTID
            WHERE ir.STATUS = 'Đã hoàn thành'
            AND ir.CREATEDDATE BETWEEN :startDate AND :endDate
            ORDER BY ir.CREATEDDATE
        """;

        Query importQuery = entityManager.createNativeQuery(importSql);
        importQuery.setParameter("startDate", startDate);
        importQuery.setParameter("endDate", endDate);
        @SuppressWarnings("unchecked")
        List<Object[]> importRows = importQuery.getResultList();

        // 2. Lấy dữ liệu xuất kho trong khoảng thời gian
        String exportSql = """
            SELECT er.CREATEDDATE, p.PRODUCTNAME, erd.QUANTITY
            FROM EXPORTRECEIPT er
            JOIN EXPORTRECEIPTDETAIL erd ON er.EXPORTRECEIPTID = erd.EXPORTRECEIPTID
            JOIN PRODUCT p ON erd.PRODUCTID = p.PRODUCTID
            WHERE er.STATUS = 'Đã hoàn thành'
            AND er.CREATEDDATE BETWEEN :startDate AND :endDate
            ORDER BY er.CREATEDDATE
        """;

        Query exportQuery = entityManager.createNativeQuery(exportSql);
        exportQuery.setParameter("startDate", startDate);
        exportQuery.setParameter("endDate", endDate);
        @SuppressWarnings("unchecked")
        List<Object[]> exportRows = exportQuery.getResultList();

        // 3. Xây dựng chi tiết báo cáo
        List<WarehouseReportLineDTO> details = new ArrayList<>();
        long totalImported = 0L;
        long totalExported = 0L;

        for (Object[] row : importRows) {
            LocalDate createdDate = ((java.sql.Date) row[0]).toLocalDate();
            LocalDateTime timestamp = LocalDateTime.of(createdDate, LocalTime.MIDNIGHT);
            String productName = (String) row[1];
            Long quantity = ((Number) row[2]).longValue();

            WarehouseReportLineDTO line = new WarehouseReportLineDTO();
            line.setProductName(productName);
            line.setQuantity(quantity);
            line.setTimestamp(timestamp);
            line.setType("IMPORT");
            details.add(line);

            totalImported += quantity;
        }

        for (Object[] row : exportRows) {
            LocalDate createdDate = ((java.sql.Date) row[0]).toLocalDate();
            LocalDateTime timestamp = LocalDateTime.of(createdDate, LocalTime.MIDNIGHT);
            String productName = (String) row[1];
            Long quantity = ((Number) row[2]).longValue();

            WarehouseReportLineDTO line = new WarehouseReportLineDTO();
            line.setProductName(productName);
            line.setQuantity(quantity);
            line.setTimestamp(timestamp);
            line.setType("EXPORT");
            details.add(line);

            totalExported += quantity;
        }

        report.setDetails(details);
        report.setTotalImported(totalImported);
        report.setTotalExported(totalExported);

        return report;
    }
}