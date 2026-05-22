package dev.uit.project.service;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfPTable;
import dev.uit.project.dto.WarehouseReportDTO;
import dev.uit.project.dto.WarehouseReportLineDTO;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;

@Service
public class WarehouseReportPdfService extends PdfReportService {
    
    public ByteArrayOutputStream generateWarehouseReportPdf(WarehouseReportDTO report) throws DocumentException {
        LocalDate month = report.getMonth();
        PdfPTable table = createWarehouseTable(report);
        return generatePdf("WAREHOUSE REPORT - MONTHLY", 
                          month.withDayOfMonth(1), 
                          month.plusMonths(1).minusDays(1), 
                          table);
    }
    
    private PdfPTable createWarehouseTable(WarehouseReportDTO report) {
        PdfPTable table = new PdfPTable(4);
        try {
            table.setWidths(new float[]{2, 1.5f, 2, 1.5f});
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        }

        table.addCell(createHeaderCell("Product Name"));
        table.addCell(createHeaderCell("Quantity"));
        table.addCell(createHeaderCell("Timestamp"));
        table.addCell(createHeaderCell("Type"));
        
        if (report.getDetails() != null) {
            for (WarehouseReportLineDTO line : report.getDetails()) {
                table.addCell(createDataCell(line.getProductName() != null ? line.getProductName() : ""));
                table.addCell(createDataCell(line.getQuantity() != null ? line.getQuantity().toString() : "0"));
                table.addCell(createDataCell(line.getTimestamp() != null ? line.getTimestamp().toString() : ""));
                table.addCell(createDataCell(line.getType() != null ? line.getType() : ""));
            }
        }
        
        table.addCell(createHeaderCell("TOTAL IMPORT:"));
        table.addCell(createDataCell(report.getTotalImported() != null ? report.getTotalImported().toString() : "0"));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        
        table.addCell(createHeaderCell("TOTAL EXPORT:"));
        table.addCell(createDataCell(report.getTotalExported() != null ? report.getTotalExported().toString() : "0"));
        table.addCell(createDataCell(""));
        table.addCell(createDataCell(""));
        
        return table;
    }
}
