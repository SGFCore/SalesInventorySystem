package dev.uit.project.service;

import dev.uit.project.dto.RevenueReportDTO;
import dev.uit.project.dto.RevenueReportLineDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;


@Service
@Transactional
public class RevenueReportExcelService extends ExcelReportService {
    
    public ByteArrayOutputStream generateRevenueReportExcel(RevenueReportDTO report) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Revenue Report");
        
        // Create title and date range header (avoid calling superclass addHeader which is not visible)
        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("REVENUE REPORT - " + report.getReportType());
        CellStyle titleStyle = workbook.createCellStyle();
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short)14);
        titleStyle.setFont(titleFont);
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 5));

        Row dateRow = sheet.createRow(1);
        String start = report.getStartDate() != null ? report.getStartDate().toString() : "";
        String end = report.getEndDate() != null ? report.getEndDate().toString() : "";
        dateRow.createCell(0).setCellValue("From: " + start + "    To: " + end);
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 5));
        
        CellStyle headerStyle = createHeaderStyle(workbook);
        CellStyle dataStyle = createDataStyle(workbook);
        
        String[] headers = {"Product Name", "Quantity", "Unit Price", "Total Amount", "Channel", "Date"};
        Row headerRow = sheet.createRow(4);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }
        
        int rowNum = 5;
        if (report.getDetails() != null) {
            for (RevenueReportLineDTO line : report.getDetails()) {
                Row row = sheet.createRow(rowNum++);
                
                row.createCell(0).setCellValue(line.getProductName() != null ? line.getProductName() : "");
                row.createCell(1).setCellValue(line.getQuantity() != null ? line.getQuantity() : 0);
                row.createCell(2).setCellValue(line.getUnitPrice() != null ? line.getUnitPrice().doubleValue() : 0);
                row.createCell(3).setCellValue(line.getTotalAmount() != null ? line.getTotalAmount().doubleValue() : 0);
                row.createCell(4).setCellValue(line.getChannel() != null ? line.getChannel() : "");
                row.createCell(5).setCellValue(line.getDate() != null ? line.getDate().toString() : "");
                
                for (int i = 0; i < 6; i++) {
                    row.getCell(i).setCellStyle(dataStyle);
                }
            }
        }
        
        rowNum += 2;
        Row summaryRow1 = sheet.createRow(rowNum++);
        summaryRow1.createCell(0).setCellValue("Direct Sales:");
        summaryRow1.createCell(1).setCellValue(report.getTotalDirectSales() != null ? report.getTotalDirectSales().doubleValue() : 0);
        
        Row summaryRow2 = sheet.createRow(rowNum++);
        summaryRow2.createCell(0).setCellValue("Online Sales:");
        summaryRow2.createCell(1).setCellValue(report.getTotalOnlineSales() != null ? report.getTotalOnlineSales().doubleValue() : 0);
        
        Row summaryRow3 = sheet.createRow(rowNum);
        summaryRow3.createCell(0).setCellValue("Total Revenue:");
        summaryRow3.createCell(1).setCellValue(report.getTotalRevenue() != null ? report.getTotalRevenue().doubleValue() : 0);
        
        for (int i = 0; i < 6; i++) {
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
