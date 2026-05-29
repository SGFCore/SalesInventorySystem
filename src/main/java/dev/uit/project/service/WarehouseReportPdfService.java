package dev.uit.project.service;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfPTable;
import dev.uit.project.entity.Detailinventory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class WarehouseReportPdfService extends PdfReportService {
    
    public ByteArrayOutputStream generateInventoryPdf(List<Detailinventory> items) throws DocumentException {
        PdfPTable table = new PdfPTable(5);
        table.setWidths(new float[]{2, 2, 2, 2, 2});
        
        table.addCell(createHeaderCell("Mã Sản phẩm"));
        table.addCell(createHeaderCell("Mã Kho"));
        table.addCell(createHeaderCell("Tồn thực tế"));
        table.addCell(createHeaderCell("Có thể bán"));
        table.addCell(createHeaderCell("Trạng thái"));
        
        for (Detailinventory item : items) {
            table.addCell(createDataCellCenter(item.getProductid() != null ? item.getProductid().getId().toString() : "N/A"));
            table.addCell(createDataCellCenter(item.getWarehouseid() != null ? item.getWarehouseid().getId().toString() : "N/A"));
            table.addCell(createDataCellCenter(item.getRealstock() != null ? item.getRealstock().toString() : "0"));
            table.addCell(createDataCellCenter(item.getAvailablestock() != null ? item.getAvailablestock().toString() : "0"));
            
            long available = item.getAvailablestock() != null ? item.getAvailablestock() : 0;
            long min = item.getMinstock() != null ? item.getMinstock() : 5;
            String status = available < min ? "Sắp hết hàng" : "Đủ hàng";
            table.addCell(createDataCellCenter(status));
        }
        
        return generatePdf("BÁO CÁO TỒN KHO CHI TIẾT", null, null, table);
    }

    public ByteArrayOutputStream generateWarehouseReportPdf(dev.uit.project.dto.WarehouseReportDTO report) throws DocumentException {
        java.time.LocalDate month = report.getMonth();
        PdfPTable table = createWarehouseTable(report);
        return generatePdf("WAREHOUSE REPORT - MONTHLY", 
                          month.withDayOfMonth(1), 
                          month.plusMonths(1).minusDays(1), 
                          table);
    }
    
    private PdfPTable createWarehouseTable(dev.uit.project.dto.WarehouseReportDTO report) {
        PdfPTable table = new PdfPTable(4);
        try {
            table.setWidths(new float[]{3, 2, 3, 2});
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        }

        table.addCell(createHeaderCell("Sản phẩm"));
        table.addCell(createHeaderCell("Số lượng"));
        table.addCell(createHeaderCell("Thời điểm"));
        table.addCell(createHeaderCell("Loại"));
        
        if (report.getDetails() != null) {
            for (dev.uit.project.dto.WarehouseReportLineDTO line : report.getDetails()) {
                table.addCell(createDataCell(line.getProductName()));
                table.addCell(createDataCellCenter(line.getQuantity().toString()));
                table.addCell(createDataCellCenter(line.getTimestamp().toString()));
                table.addCell(createDataCellCenter(line.getType()));
            }
        }
        
        return table;
    }
}
