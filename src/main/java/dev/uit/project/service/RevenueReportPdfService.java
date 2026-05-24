package dev.uit.project.service;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfPTable;
import dev.uit.project.dto.RevenueReportDTO;
import dev.uit.project.dto.RevenueReportLineDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;

@Service
@Transactional
public class RevenueReportPdfService extends PdfReportService {
    
    public ByteArrayOutputStream generateRevenueReportPdf(RevenueReportDTO report) throws DocumentException {
        PdfPTable table = createRevenueTable(report);
        return generatePdf("REVENUE REPORT - " + report.getReportType(), 
                          report.getStartDate(), 
                          report.getEndDate(), 
                          table);
    }
    
    private PdfPTable createRevenueTable(RevenueReportDTO report) {
        PdfPTable table = new PdfPTable(6);
        try {
            table.setWidths(new float[]{2, 2, 1.5f, 1.5f, 1.5f, 1.5f});
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        }
        
        table.addCell(createHeaderCell("Product Name"));
        table.addCell(createHeaderCell("Quantity"));
        table.addCell(createHeaderCell("Unit Price"));
        table.addCell(createHeaderCell("Total Amount"));
        table.addCell(createHeaderCell("Channel"));
        table.addCell(createHeaderCell("Date"));
        
        if (report.getDetails() != null) {
            for (RevenueReportLineDTO line : report.getDetails()) {
                table.addCell(createDataCell(line.getProductName() != null ? line.getProductName() : ""));
                table.addCell(createDataCell(line.getQuantity() != null ? line.getQuantity().toString() : "0"));
                table.addCell(createDataCell(formatCurrency(line.getUnitPrice())));
                table.addCell(createDataCell(formatCurrency(line.getTotalAmount())));
                table.addCell(createDataCell(line.getChannel() != null ? line.getChannel() : ""));
                table.addCell(createDataCell(line.getDate() != null ? line.getDate().toString() : ""));
            }
        }
        
        table.addCell(createHeaderCell("TOTAL"));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        
        table.addCell(createHeaderCell("Direct Sales:"));
        table.addCell(createDataCell(formatCurrency(report.getTotalDirectSales())));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        
        table.addCell(createHeaderCell("Online Sales:"));
        table.addCell(createDataCell(formatCurrency(report.getTotalOnlineSales())));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        
        table.addCell(createHeaderCell("Total Revenue:"));
        table.addCell(createDataCell(formatCurrency(report.getTotalRevenue())));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        
        return table;
    }
    
    private String formatCurrency(BigDecimal amount) {
        if (amount == null) {
            return "0";
        }
        return amount.toString();
    }
}
