package dev.uit.project.service;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.Element;
import dev.uit.project.entity.Invoice;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class RevenueReportPdfService extends PdfReportService {
    
    public ByteArrayOutputStream generateTransactionPdf(List<Invoice> invoices, LocalDate start, LocalDate end) throws DocumentException {
        PdfPTable table = new PdfPTable(5);
        table.setWidths(new float[]{1.5f, 2, 2, 2, 2.5f});
        
        table.addCell(createHeaderCell("Mã HĐ"));
        table.addCell(createHeaderCell("Ngày lập"));
        table.addCell(createHeaderCell("Mã KH"));
        table.addCell(createHeaderCell("Kênh bán"));
        table.addCell(createHeaderCell("Tổng tiền"));
        
        BigDecimal totalRevenue = BigDecimal.ZERO;
        
        for (Invoice inv : invoices) {
            table.addCell(createDataCellCenter("#" + inv.getId()));
            table.addCell(createDataCellCenter(inv.getInvoicedate() != null ? inv.getInvoicedate().toString() : "N/A"));
            table.addCell(createDataCellCenter(inv.getCustomerid() != null ? inv.getCustomerid().getId().toString() : "N/A"));
            table.addCell(createDataCellCenter(inv.getSalechannelcode() == 0 ? "Tại quầy" : "Trực tuyến"));
            
            BigDecimal amount = inv.getFinalamount() != null ? inv.getFinalamount() : BigDecimal.ZERO;
            table.addCell(createDataCellRight(String.format("%,.0f đ", amount)));
            
            totalRevenue = totalRevenue.add(amount);
        }
        
        // Final Summary Row
        PdfPCell totalLabel = createHeaderCell("TỔNG CỘNG DOANH THU");
        totalLabel.setColspan(4);
        totalLabel.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(totalLabel);
        
        PdfPCell totalVal = createHeaderCell(String.format("%,.0f đ", totalRevenue));
        table.addCell(totalVal);
        
        return generatePdf("BÁO CÁO CHI TIẾT DOANH THU", start, end, table);
    }

    // For compatibility with other dashboard functions if needed
    public ByteArrayOutputStream generateRevenueReportPdf(dev.uit.project.dto.RevenueReportDTO report) throws DocumentException {
        PdfPTable table = new PdfPTable(4);
        try {
            table.setWidths(new float[]{3, 2, 2, 3});
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        }
        
        table.addCell(createHeaderCell("Sản phẩm"));
        table.addCell(createHeaderCell("Số lượng"));
        table.addCell(createHeaderCell("Đơn giá"));
        table.addCell(createHeaderCell("Thành tiền"));
        
        if (report.getDetails() != null) {
            for (dev.uit.project.dto.RevenueReportLineDTO line : report.getDetails()) {
                table.addCell(createDataCell(line.getProductName()));
                table.addCell(createDataCellCenter(line.getQuantity().toString()));
                table.addCell(createDataCellRight(String.format("%,.0f đ", line.getUnitPrice())));
                table.addCell(createDataCellRight(String.format("%,.0f đ", line.getTotalAmount())));
            }
        }
        
        return generatePdf("REVENUE REPORT - " + report.getReportType(), report.getStartDate(), report.getEndDate(), table);
    }
}
