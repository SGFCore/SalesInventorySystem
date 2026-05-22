package dev.uit.project.service;

import dev.uit.project.dto.WarehouseReportDTO;
import dev.uit.project.dto.WarehouseReportLineDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;

@Service
public class WarehouseReportExcelService extends ExcelReportService {
    
    public ByteArrayOutputStream generateWarehouseReportExcel(WarehouseReportDTO report) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Warehouse Report");
        
        LocalDate month = report.getMonth();

        CellStyle headerStyle = createHeaderStyle(workbook);
        CellStyle dataStyle = createDataStyle(workbook);

        // Create a simple header (title and date range) since addHeader from ExcelReportService is not accessible
        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("WAREHOUSE REPORT - MONTHLY");
        titleCell.setCellStyle(headerStyle);

        Row dateRow = sheet.createRow(1);
        Cell dateCell = dateRow.createCell(0);
        dateCell.setCellValue("From: " + month.withDayOfMonth(1).toString() + " To: " + month.plusMonths(1).minusDays(1).toString());
        dateCell.setCellStyle(dataStyle);
        
        String[] headers = {"Product Name", "Quantity", "Timestamp", "Type"};
        Row headerRow = sheet.createRow(4);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }
        
        int rowNum = 5;
        if (report.getDetails() != null) {
            for (WarehouseReportLineDTO line : report.getDetails()) {
                Row row = sheet.createRow(rowNum++);
                
                row.createCell(0).setCellValue(line.getProductName() != null ? line.getProductName() : "");
                row.createCell(1).setCellValue(line.getQuantity() != null ? line.getQuantity() : 0);
                row.createCell(2).setCellValue(line.getTimestamp() != null ? line.getTimestamp().toString() : "");
                row.createCell(3).setCellValue(line.getType() != null ? line.getType() : "");
                
                for (int i = 0; i < 4; i++) {
                    row.getCell(i).setCellStyle(dataStyle);
                }
            }
        }
        
        rowNum += 2;
        Row summaryRow1 = sheet.createRow(rowNum++);
        summaryRow1.createCell(0).setCellValue("Total Import:");
        summaryRow1.createCell(1).setCellValue(report.getTotalImported() != null ? report.getTotalImported() : 0);
        
        Row summaryRow2 = sheet.createRow(rowNum);
        summaryRow2.createCell(0).setCellValue("Total Export:");
        summaryRow2.createCell(1).setCellValue(report.getTotalExported() != null ? report.getTotalExported() : 0);
        
        for (int i = 0; i < 4; i++) {
            sheet.autoSizeColumn(i);
        }
        
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        workbook.close();
        
        return baos;
    }
    
    private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }
    
    private CellStyle createDataStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        return style;
    }
}
