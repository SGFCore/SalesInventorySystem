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

    public ByteArrayOutputStream generateInvoicePdf(Invoice invoice, List<Invoicedetail> details, Map<String, Object> vatInfo) throws DocumentException {
        boolean isVat = vatInfo != null && !vatInfo.isEmpty() && vatInfo.containsKey("companyName");
        String reportTitle = isVat ? "HÓA ĐƠN GIÁ TRỊ GIA TĂNG (VAT)" : "HÓA ĐƠN BÁN HÀNG";
        
        loadFonts();
        
        // Define PdfPTable for basic info
        PdfPTable infoTable = new PdfPTable(2);
        infoTable.setWidthPercentage(100);
        try {
            infoTable.setWidths(new float[]{1.2f, 1});
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        PdfPCell leftCell = new PdfPCell();
        leftCell.setBorder(PdfPCell.NO_BORDER);
        leftCell.addElement(new com.itextpdf.text.Paragraph("Mã HĐ: #" + invoice.getId(), boldFont));
        leftCell.addElement(new com.itextpdf.text.Paragraph("Ngày lập: " + (invoice.getInvoicedate() != null ? invoice.getInvoicedate().toString() : ""), baseFont));
        if (invoice.getCustomerid() != null) {
            leftCell.addElement(new com.itextpdf.text.Paragraph("Khách hàng: " + invoice.getCustomerid().getFirstname() + " " + invoice.getCustomerid().getLastname(), baseFont));
            leftCell.addElement(new com.itextpdf.text.Paragraph("Điện thoại: " + (invoice.getCustomerid().getPhone() != null ? invoice.getCustomerid().getPhone() : ""), baseFont));
        }
        infoTable.addCell(leftCell);

        PdfPCell rightCell = new PdfPCell();
        rightCell.setBorder(PdfPCell.NO_BORDER);
        if (isVat) {
            rightCell.addElement(new com.itextpdf.text.Paragraph("Tên công ty: " + vatInfo.getOrDefault("companyName", ""), boldFont));
            rightCell.addElement(new com.itextpdf.text.Paragraph("Mã số thuế: " + vatInfo.getOrDefault("taxCode", ""), baseFont));
            rightCell.addElement(new com.itextpdf.text.Paragraph("Địa chỉ: " + vatInfo.getOrDefault("address", ""), baseFont));
        }
        infoTable.addCell(rightCell);

        // Product Table
        PdfPTable table = new PdfPTable(5);
        table.setSpacingBefore(20);
        try {
            table.setWidths(new float[]{0.8f, 3.2f, 1, 2, 2});
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
            table.addCell(createDataCellCenter(detail.getQuantity() != null ? detail.getQuantity().toString() : "0"));
            
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

        BigDecimal finalTotal = subTotal;

        if (isVat) {
            // Handle Discount
            Object discountObj = vatInfo.get("discount");
            BigDecimal discountVal = BigDecimal.ZERO;
            if (discountObj != null) {
                discountVal = new BigDecimal(discountObj.toString());
            }

            if (discountVal.compareTo(BigDecimal.ZERO) > 0) {
                String discLabel = "Chiết khấu:";
                BigDecimal actualDiscount = discountVal;
                
                // If it's a small number, assume it's a percentage
                if (discountVal.compareTo(new BigDecimal(100)) <= 0) {
                    discLabel = "Chiết khấu (" + discountVal + "%):";
                    actualDiscount = subTotal.multiply(discountVal).divide(new BigDecimal(100));
                }

                PdfPCell discCellLabel = createDataCellRight(discLabel);
                discCellLabel.setColspan(4);
                table.addCell(discCellLabel);
                table.addCell(createDataCellRight(String.format("-%,.0f đ", actualDiscount)));
                finalTotal = subTotal.subtract(actualDiscount);
            }

            // Handle Tax
            BigDecimal taxRate = new BigDecimal(vatInfo.getOrDefault("taxRate", "10").toString());
            BigDecimal taxAmount = finalTotal.multiply(taxRate).divide(new BigDecimal(100));
            
            PdfPCell taxLabel = createDataCellRight("Tiền thuế VAT (" + taxRate + "%):");
            taxLabel.setColspan(4);
            table.addCell(taxLabel);
            table.addCell(createDataCellRight(String.format("%,.0f đ", taxAmount)));
            
            finalTotal = finalTotal.add(taxAmount);
        }

        // Handle Shipping Fee (if Online)
        BigDecimal shippingFee = BigDecimal.ZERO;
        if (vatInfo != null && vatInfo.containsKey("shippingFee")) {
            shippingFee = new BigDecimal(vatInfo.get("shippingFee").toString());
            if (shippingFee.compareTo(BigDecimal.ZERO) > 0) {
                PdfPCell shipLabel = createDataCellRight("Phí vận chuyển:");
                shipLabel.setColspan(4);
                table.addCell(shipLabel);
                table.addCell(createDataCellRight(String.format("%,.0f đ", shippingFee)));
                finalTotal = finalTotal.add(shippingFee);
            }
        }

        // Final Total
        PdfPCell totalLabel = createHeaderCell("TỔNG CỘNG THANH TOÁN:");
        totalLabel.setColspan(4);
        totalLabel.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(totalLabel);
        table.addCell(createHeaderCell(String.format("%,.0f đ", finalTotal)));

        // Combine all into document
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
