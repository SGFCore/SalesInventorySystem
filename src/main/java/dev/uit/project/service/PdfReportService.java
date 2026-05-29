package dev.uit.project.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public abstract class PdfReportService extends PdfPageEventHelper {
    protected String title;
    protected LocalDate startDate;
    protected LocalDate endDate;
    protected Font baseFont;
    protected Font boldFont;
    protected Font titleFont;
    protected Font headerFont;
    protected Font footerFont;

    protected void loadFonts() {
        try {
            // Loading fonts from classpath and converting to byte array for iText
            byte[] regularFontData = StreamUtils.copyToByteArray(new ClassPathResource("fonts/segoeuithis.ttf").getInputStream());
            byte[] boldFontData = StreamUtils.copyToByteArray(new ClassPathResource("fonts/segoeuithibd.ttf").getInputStream());
            
            BaseFont bfRegular = BaseFont.createFont("segoeuithis.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED, true, regularFontData, null);
            BaseFont bfBold = BaseFont.createFont("segoeuithibd.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED, true, boldFontData, null);
            
            this.baseFont = new Font(bfRegular, 10);
            this.boldFont = new Font(bfBold, 10);
            this.titleFont = new Font(bfBold, 18, Font.NORMAL, new BaseColor(30, 58, 138));
            this.headerFont = new Font(bfBold, 10, Font.NORMAL, BaseColor.WHITE);
            this.footerFont = new Font(bfRegular, 8, Font.ITALIC, BaseColor.GRAY);
        } catch (Exception e) {
            e.printStackTrace();
            this.baseFont = new Font(Font.FontFamily.HELVETICA, 10);
            this.boldFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
            this.titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            this.headerFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.WHITE);
            this.footerFont = new Font(Font.FontFamily.HELVETICA, 8, Font.ITALIC, BaseColor.GRAY);
        }
    }

    protected ByteArrayOutputStream generatePdf(String title, LocalDate startDate, LocalDate endDate,
                                                PdfPTable dataTable) throws DocumentException {
        loadFonts();
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;

        // Use A4 Portrait for better readability of detailed tables
        Document document = new Document(PageSize.A4, 36, 36, 90, 50);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(document, baos);
        writer.setPageEvent(this);
        document.open();

        // Title Section
        Paragraph pTitle = new Paragraph(title.toUpperCase(), titleFont);
        pTitle.setAlignment(Element.ALIGN_CENTER);
        pTitle.setSpacingAfter(10);
        document.add(pTitle);

        // Metadata Section
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        Paragraph pMeta = new Paragraph("Ngày xuất: " + LocalDateTime.now().format(dtf), footerFont);
        pMeta.setAlignment(Element.ALIGN_RIGHT);
        pMeta.setSpacingAfter(20);
        document.add(pMeta);

        // Period Section
        if (startDate != null && endDate != null) {
            DateTimeFormatter df = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            Paragraph pPeriod = new Paragraph("Khoảng thời gian: " + startDate.format(df) + " - " + endDate.format(df), boldFont);
            pPeriod.setSpacingAfter(15);
            document.add(pPeriod);
        }

        // Table
        dataTable.setWidthPercentage(100);
        document.add(dataTable);
        
        document.close();
        return baos;
    }

    @Override
    public void onEndPage(PdfWriter writer, Document document) {
        PdfContentByte cb = writer.getDirectContent();
        
        // Footer
        PdfPTable footer = new PdfPTable(1);
        footer.setTotalWidth(document.getPageSize().getWidth() - document.leftMargin() - document.rightMargin());
        footer.setLockedWidth(true);
        
        String footerText = String.format("Trang %d | Sales Inventory System", writer.getPageNumber());
        PdfPCell cell = new PdfPCell(new Phrase(footerText, footerFont));
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        footer.addCell(cell);
        
        footer.writeSelectedRows(0, -1, document.leftMargin(), document.bottom() - 10, cb);
    }

    protected PdfPCell createHeaderCell(String content) {
        PdfPCell cell = new PdfPCell(new Phrase(content, headerFont));
        cell.setBackgroundColor(new BaseColor(51, 65, 85)); // Slate 700
        cell.setPadding(8);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setBorderColor(BaseColor.LIGHT_GRAY);
        return cell;
    }

    protected PdfPCell createDataCell(String content) {
        PdfPCell cell = new PdfPCell(new Phrase(content, baseFont));
        cell.setPadding(6);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setBorderColor(BaseColor.LIGHT_GRAY);
        return cell;
    }
    
    protected PdfPCell createDataCellCenter(String content) {
        PdfPCell cell = createDataCell(content);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        return cell;
    }

    protected PdfPCell createDataCellRight(String content) {
        PdfPCell cell = createDataCell(content);
        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        return cell;
    }
}
