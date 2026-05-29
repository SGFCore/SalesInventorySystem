package dev.uit.project.controller;

import com.itextpdf.text.DocumentException;
import dev.uit.project.dto.RevenueReportDTO;
import dev.uit.project.dto.WarehouseReportDTO;
import dev.uit.project.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {
    
    @Autowired
    private RevenueReportService revenueReportService;
    
    @Autowired
    private WarehouseReportService warehouseReportService;
    
    @Autowired
    private RevenueReportPdfService revenueReportPdfService;
    
    @Autowired
    private WarehouseReportPdfService warehouseReportPdfService;
    
    @Autowired
    private RevenueReportExcelService revenueReportExcelService;
    
    @Autowired
    private WarehouseReportExcelService warehouseReportExcelService;
    
    @GetMapping("/revenue/pdf")
    public ResponseEntity<byte[]> getRevenueTransactionPdf(
            @RequestParam String startDate,
            @RequestParam String endDate) throws DocumentException {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        ByteArrayOutputStream pdf = revenueReportService.generateRevenuePdf(start, end);
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=revenue_report.pdf")
                .body(pdf.toByteArray());
    }

    @GetMapping("/inventory/pdf")
    public ResponseEntity<byte[]> getInventoryReportPdf(
            @RequestParam(required = false) Long warehouseId,
            @RequestParam(required = false) Long productId) throws DocumentException {
        ByteArrayOutputStream pdf = warehouseReportService.generateInventoryPdf(warehouseId, productId);
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=inventory_report.pdf")
                .body(pdf.toByteArray());
    }

    @GetMapping("/revenue/transactions")
    public ResponseEntity<List<dev.uit.project.dto.InvoiceDTO>> getRevenueTransactions(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        List<dev.uit.project.dto.InvoiceDTO> dtos = revenueReportService.getRevenueTransactions(start, end)
                .stream()
                .map(dev.uit.project.dto.InvoiceDTO::fromEntity)
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/inventory")
    public ResponseEntity<List<dev.uit.project.dto.DetailinventoryDTO>> getInventoryReport(
            @RequestParam(required = false) Long warehouseId,
            @RequestParam(required = false) Long productId) {
        List<dev.uit.project.dto.DetailinventoryDTO> dtos = warehouseReportService.getInventoryReport(warehouseId, productId)
                .stream()
                .map(dev.uit.project.dto.DetailinventoryDTO::fromEntity)
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/revenue/daily")
    public ResponseEntity<RevenueReportDTO> getDailyRevenueReport(@RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        RevenueReportDTO report = revenueReportService.getDailyRevenueReport(localDate);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/revenue/monthly")
    public ResponseEntity<RevenueReportDTO> getMonthlyRevenueReport(
            @RequestParam int month, 
            @RequestParam int year) {
        RevenueReportDTO report = revenueReportService.getMonthlyRevenueReport(month, year);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/revenue/yearly")
    public ResponseEntity<RevenueReportDTO> getYearlyRevenueReport(@RequestParam int year) {
        RevenueReportDTO report = revenueReportService.getYearlyRevenueReport(year);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/revenue/daily/pdf")
    public ResponseEntity<byte[]> getDailyRevenueReportPdf(@RequestParam String date) 
            throws DocumentException {
        LocalDate localDate = LocalDate.parse(date);
        RevenueReportDTO report = revenueReportService.getDailyRevenueReport(localDate);
        ByteArrayOutputStream pdf = revenueReportPdfService.generateRevenueReportPdf(report);
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=revenue_report_daily.pdf")
                .body(pdf.toByteArray());
    }
    
    @GetMapping("/revenue/monthly/pdf")
    public ResponseEntity<byte[]> getMonthlyRevenueReportPdf(
            @RequestParam int month, 
            @RequestParam int year) 
            throws DocumentException {
        RevenueReportDTO report = revenueReportService.getMonthlyRevenueReport(month, year);
        ByteArrayOutputStream pdf = revenueReportPdfService.generateRevenueReportPdf(report);
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=revenue_report_monthly.pdf")
                .body(pdf.toByteArray());
    }
    
    @GetMapping("/revenue/yearly/pdf")
    public ResponseEntity<byte[]> getYearlyRevenueReportPdf(@RequestParam int year) 
            throws DocumentException {
        RevenueReportDTO report = revenueReportService.getYearlyRevenueReport(year);
        ByteArrayOutputStream pdf = revenueReportPdfService.generateRevenueReportPdf(report);
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=revenue_report_yearly.pdf")
                .body(pdf.toByteArray());
    }
    
    @GetMapping("/revenue/daily/excel")
    public ResponseEntity<byte[]> getDailyRevenueReportExcel(@RequestParam String date) 
            throws IOException {
        LocalDate localDate = LocalDate.parse(date);
        RevenueReportDTO report = revenueReportService.getDailyRevenueReport(localDate);
        ByteArrayOutputStream excel = revenueReportExcelService.generateRevenueReportExcel(report);
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=revenue_report_daily.xlsx")
                .body(excel.toByteArray());
    }
    
    @GetMapping("/revenue/monthly/excel")
    public ResponseEntity<byte[]> getMonthlyRevenueReportExcel(
            @RequestParam int month, 
            @RequestParam int year) 
            throws IOException {
        RevenueReportDTO report = revenueReportService.getMonthlyRevenueReport(month, year);
        ByteArrayOutputStream excel = revenueReportExcelService.generateRevenueReportExcel(report);
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=revenue_report_monthly.xlsx")
                .body(excel.toByteArray());
    }
    
    @GetMapping("/revenue/yearly/excel")
    public ResponseEntity<byte[]> getYearlyRevenueReportExcel(@RequestParam int year) 
            throws IOException {
        RevenueReportDTO report = revenueReportService.getYearlyRevenueReport(year);
        ByteArrayOutputStream excel = revenueReportExcelService.generateRevenueReportExcel(report);
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=revenue_report_yearly.xlsx")
                .body(excel.toByteArray());
    }
    
    @GetMapping("/warehouse/monthly")
    public ResponseEntity<WarehouseReportDTO> getMonthlyWarehouseReport(
            @RequestParam int month, 
            @RequestParam int year) {
        WarehouseReportDTO report = warehouseReportService.getMonthlyWarehouseReport(month, year);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/warehouse/monthly/pdf")
    public ResponseEntity<byte[]> getMonthlyWarehouseReportPdf(
            @RequestParam int month, 
            @RequestParam int year) 
            throws DocumentException {
        WarehouseReportDTO report = warehouseReportService.getMonthlyWarehouseReport(month, year);
        ByteArrayOutputStream pdf = warehouseReportPdfService.generateWarehouseReportPdf(report);
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=warehouse_report_monthly.pdf")
                .body(pdf.toByteArray());
    }
    
    @GetMapping("/warehouse/monthly/excel")
    public ResponseEntity<byte[]> getMonthlyWarehouseReportExcel(
            @RequestParam int month, 
            @RequestParam int year) 
            throws IOException {
        WarehouseReportDTO report = warehouseReportService.getMonthlyWarehouseReport(month, year);
        ByteArrayOutputStream excel = warehouseReportExcelService.generateWarehouseReportExcel(report);
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=warehouse_report_monthly.xlsx")
                .body(excel.toByteArray());
    }
}
