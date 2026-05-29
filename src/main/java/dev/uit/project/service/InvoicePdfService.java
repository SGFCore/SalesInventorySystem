package dev.uit.project.service;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import dev.uit.project.entity.Invoice;
import dev.uit.project.entity.Invoicedetail;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class InvoicePdfService extends PdfReportService {

    public ByteArrayOutputStream generateInvoicePdf(Invoice invoice, List<Invoicedetail> details, Map<String, String> vatInfo) throws DocumentException {
        boolean isVat = vatInfo != null && !vatInfo.isEmpty();
        String reportTitle = isVat ? "HÓA ĐƠN GIÁ TRỊ GIA TĂNG (VAT)" : "HÓA ĐƠN BÁN HÀNG";
        
        // Define PdfPTable for basic info
        PdfPTable infoTable = new PdfPTable(2);
        infoTable.setWidthPercentage(100);
        try {
            infoTable.setWidths(new float[]{1, 1});
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        PdfPCell leftCell = new PdfPCell();
        leftCell.setBorder(PdfPCell.NO_BORDER);
        leftCell.addElement(new com.itextpdf.text.Paragraph("Mã HĐ: #" + invoice.getId(), boldFont));
        leftCell.addElement(new com.itextpdf.text.Paragraph("Ngày lập: " + invoice.getInvoicedate(), baseFont));
        if (invoice.getCustomerid() != null) {
            leftCell.addElement(new com.itextpdf.text.Paragraph("Khách hàng: " + invoice.getCustomerid().getFirstname() + " " + invoice.getCustomerid().getLastname(), baseFont));
            leftCell.addElement(new com.itextpdf.text.Paragraph("Điện thoại: " + invoice.getCustomerid().getPhone(), baseFont));
        }
        infoTable.addCell(leftCell);

        PdfPCell rightCell = new PdfPCell();
        rightCell.setBorder(PdfPCell.NO_BORDER);
        if (isVat) {
            rightCell.addElement(new com.itextpdf.text.Paragraph("Tên công ty: " + vatInfo.getOrDefault("companyName", ""), boldFont));
            rightCell.addElement(new com.itextpdf.text.Paragraph("Mã số thuế: " + vatInfo.getOrDefault("taxId", ""), baseFont));
            rightCell.addElement(new com.itextpdf.text.Paragraph("Địa chỉ: " + vatInfo.getOrDefault("address", ""), baseFont));
            rightCell.addElement(new com.itextpdf.text.Paragraph("Thuế suất VAT: " + vatInfo.getOrDefault("taxRate", "") + "%", baseFont));
        }
        infoTable.addCell(rightCell);

        // Product Table
        PdfPTable table = new PdfPTable(5);
        table.setSpacingBefore(20);
        try {
            table.setWidths(new float[]{1, 3, 1, 2, 2});
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        table.addCell(createHeaderCell("STT"));
        table.addCell(createHeaderCell("Tên sản phẩm / Combo"));
        table.addCell(createHeaderCell("SL"));
        table.addCell(createHeaderCell("Đơn giá"));
        table.addCell(createHeaderCell("Thành tiền"));

        int stt = 1;
        BigDecimal subTotal = BigDecimal.ZERO;

        for (Invoicedetail detail : details) {
            table.addCell(createDataCellCenter(String.valueOf(stt++)));
            String name = detail.getProductid() != null ? detail.getProductid().getProductname() : (detail.getComboid() != null ? "Combo #" + detail.getComboid().getId() : "N/A");
            table.addCell(createDataCell(name));
            table.addCell(createDataCellCenter(detail.getQuantity().toString()));
            
            BigDecimal unitPrice = detail.getUnitprice() != null ? detail.getUnitprice() : BigDecimal.ZERO;
            table.addCell(createDataCellRight(String.format("%,.0f đ", unitPrice)));
            
            BigDecimal amount = detail.getTotalamount() != null ? detail.getTotalamount() : BigDecimal.ZERO;
            table.addCell(createDataCellRight(String.format("%,.0f đ", amount)));
            
            subTotal = subTotal.add(amount);
        }

        // Summary Rows
        PdfPCell subTotalLabel = createDataCellRight("Cộng tiền hàng:");
        subTotalLabel.setColspan(4);
        table.addCell(subTotalLabel);
        table.addCell(createDataCellRight(String.format("%,.0f đ", subTotal)));

        if (isVat) {
            BigDecimal taxRate = new BigDecimal(vatInfo.getOrDefault("taxRate", "0"));
            BigDecimal taxAmount = subTotal.multiply(taxRate).divide(new BigDecimal(100));
            
            PdfPCell taxLabel = createDataCellRight("Tiền thuế VAT (" + taxRate + "%):");
            taxLabel.setColspan(4);
            table.addCell(taxLabel);
            table.addCell(createDataCellRight(String.format("%,.0f đ", taxAmount)));
            
            BigDecimal totalWithTax = subTotal.add(taxAmount);
            PdfPCell totalLabel = createHeaderCell("TỔNG CỘNG THANH TOÁN:");
            totalLabel.setColspan(4);
            totalLabel.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(totalLabel);
            table.addCell(createHeaderCell(String.format("%,.0f đ", totalWithTax)));
        } else {
            PdfPCell totalLabel = createHeaderCell("TỔNG CỘNG THANH TOÁN:");
            totalLabel.setColspan(4);
            totalLabel.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(totalLabel);
            table.addCell(createHeaderCell(String.format("%,.0f đ", invoice.getFinalamount() != null ? invoice.getFinalamount() : subTotal)));
        }

        // Combine all into document
        loadFonts(); // Make sure fonts are loaded from PdfReportService
        this.title = reportTitle;
        this.startDate = null;
        this.endDate = null;

        com.itextpdf.text.Document document = new com.itextpdf.text.Document(com.itextpdf.text.PageSize.A4, 36, 36, 90, 50);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        com.itextpdf.text.pdf.PdfWriter writer = com.itextpdf.text.pdf.PdfWriter.getInstance(document, baos);
        writer.setPageEvent(this);
        document.open();

        com.itextpdf.text.Paragraph pTitle = new com.itextpdf.text.Paragraph(title, titleFont);
        pTitle.setAlignment(Element.ALIGN_CENTER);
        pTitle.setSpacingAfter(20);
        document.add(pTitle);

        document.add(infoTable);
        
        table.setWidthPercentage(100);
        document.add(table);
        
        document.close();
        return baos;
    }
}
