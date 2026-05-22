package dev.uit.project.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public abstract class PdfReportService extends PdfPageEventHelper {
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private Font headerFont;
    private Font footerFont;

    protected ByteArrayOutputStream generatePdf(String title, LocalDate startDate, LocalDate endDate,
                                                PdfPTable dataTable) throws DocumentException {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
        this.footerFont = new Font(Font.FontFamily.HELVETICA, 9, Font.ITALIC);

        Document document = new Document(PageSize.A4.rotate());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(document, baos);
        writer.setPageEvent(this);
        document.open();
        dataTable.setWidthPercentage(100);
        document.add(dataTable);
        document.close();
        return baos;
    }

    @Override
    public void onEndPage(PdfWriter writer, Document document) {
        // Header (include title and optional date range)
        PdfPTable header = new PdfPTable(1);
        header.setTotalWidth(document.getPageSize().getWidth() - document.leftMargin() - document.rightMargin());
        header.setLockedWidth(true);
        // Title
        PdfPCell cell = new PdfPCell(new Phrase(title, headerFont));
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        header.addCell(cell);
        // Date range line (use startDate and endDate if available)
        DateTimeFormatter df = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String range = "";
        if (startDate != null && endDate != null) {
            range = String.format("Period: %s - %s", startDate.format(df), endDate.format(df));
        } else if (startDate != null) {
            range = String.format("From: %s", startDate.format(df));
        } else if (endDate != null) {
            range = String.format("Until: %s", endDate.format(df));
        }
        if (!range.isEmpty()) {
            PdfPCell rangeCell = new PdfPCell(new Phrase(range, footerFont));
            rangeCell.setBorder(Rectangle.NO_BORDER);
            rangeCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            header.addCell(rangeCell);
        }
        header.writeSelectedRows(0, -1, document.leftMargin(), document.top() + 30, writer.getDirectContent());

        // Footer
        PdfPTable footer = new PdfPTable(1);
        footer.setTotalWidth(document.getPageSize().getWidth() - document.leftMargin() - document.rightMargin());
        footer.setLockedWidth(true);
        String footerText = String.format("Generated on: %s | Page %d", 
                LocalDate.now().format(df), writer.getPageNumber());
        cell = new PdfPCell(new Phrase(footerText, footerFont));
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        footer.addCell(cell);
        footer.writeSelectedRows(0, -1, document.leftMargin(), document.bottom() - 10, writer.getDirectContent());
    }

    protected PdfPCell createHeaderCell(String content) {
        PdfPCell cell = new PdfPCell(new Paragraph(content, 
                new Font(Font.FontFamily.HELVETICA, 11, Font.BOLD, BaseColor.WHITE)));
        cell.setBackgroundColor(BaseColor.DARK_GRAY);
        cell.setPadding(8);
        return cell;
    }

    protected PdfPCell createDataCell(String content) {
        PdfPCell cell = new PdfPCell(new Paragraph(content, 
                new Font(Font.FontFamily.HELVETICA, 10)));
        cell.setPadding(6);
        return cell;
    }
}