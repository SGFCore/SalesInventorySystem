package dev.uit.project.service;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import dev.uit.project.entity.Orderdetail;
import dev.uit.project.entity.Detailinventory;
import dev.uit.project.repository.DetailinventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@Service
public class OrderPdfService extends PdfReportService {

    @Autowired
    private DetailinventoryRepository inventoryRepository;

    public ByteArrayOutputStream generatePickListPdf(List<Orderdetail> details) throws DocumentException {
        this.title = "DANH SÁCH LẤY HÀNG";
        loadFonts();

        // 1. Aggregate items
        Map<Long, Long> aggregationMap = new HashMap<>();
        Map<Long, String> productNameMap = new HashMap<>();
        for (Orderdetail d : details) {
            if (d.getProductid() != null) {
                Long pId = d.getProductid().getId();
                aggregationMap.put(pId, aggregationMap.getOrDefault(pId, 0L) + d.getQuantity());
                productNameMap.put(pId, d.getProductid().getProductname());
            }
        }

        // 2. Fetch Storage Locations (Warehouse 1)
        List<Detailinventory> inventories = inventoryRepository.findByWarehouseId(1L);
        Map<Long, String> locationMap = new HashMap<>();
        for (Detailinventory i : inventories) {
            if (i.getProductid() != null) {
                locationMap.put(i.getProductid().getId(), i.getStoragelocation());
            }
        }

        // 3. Prepare data rows
        List<Map<String, Object>> rows = new ArrayList<>();
        for (Long pId : aggregationMap.keySet()) {
            Map<String, Object> row = new HashMap<>();
            row.put("id", pId);
            row.put("name", productNameMap.get(pId));
            row.put("qty", aggregationMap.get(pId));
            row.put("loc", locationMap.get(pId));
            rows.add(row);
        }

        // 4. Sort by location
        rows.sort((a, b) -> {
            String locA = (String) a.get("loc");
            String locB = (String) b.get("loc");
            if (locA == null && locB == null) return 0;
            if (locA == null) return 1;
            if (locB == null) return -1;
            return locA.compareTo(locB);
        });

        // 5. Create Table
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        table.setSpacingBefore(20);
        table.setWidths(new float[]{0.8f, 1.2f, 4, 1.5f, 2.5f});

        table.addCell(createHeaderCell("STT"));
        table.addCell(createHeaderCell("Mã SP"));
        table.addCell(createHeaderCell("Tên sản phẩm"));
        table.addCell(createHeaderCell("SL"));
        table.addCell(createHeaderCell("Vị trí (Kệ/Ngăn)"));

        int stt = 1;
        for (Map<String, Object> row : rows) {
            table.addCell(createDataCellCenter(String.valueOf(stt++)));
            table.addCell(createDataCellCenter("#" + row.get("id")));
            table.addCell(createDataCell((String) row.get("name")));
            table.addCell(createDataCellCenter(row.get("qty").toString()));
            
            String loc = (String) row.get("loc");
            if (loc == null || loc.trim().isEmpty()) {
                table.addCell(createDataCellCenter("Chưa có vị trí"));
            } else {
                table.addCell(createDataCellCenter(loc));
            }
        }

        // 6. Build Document
        com.itextpdf.text.Document document = new com.itextpdf.text.Document(com.itextpdf.text.PageSize.A4, 36, 36, 90, 50);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        com.itextpdf.text.pdf.PdfWriter writer = com.itextpdf.text.pdf.PdfWriter.getInstance(document, baos);
        writer.setPageEvent(this);
        document.open();

        com.itextpdf.text.Paragraph pTitle = new com.itextpdf.text.Paragraph(title, titleFont);
        pTitle.setAlignment(Element.ALIGN_CENTER);
        pTitle.setSpacingAfter(10);
        document.add(pTitle);

        com.itextpdf.text.Paragraph pDate = new com.itextpdf.text.Paragraph("Ngày lập: " + java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")), baseFont);
        pDate.setAlignment(Element.ALIGN_RIGHT);
        pDate.setSpacingAfter(10);
        document.add(pDate);

        document.add(table);
        
        document.close();
        return baos;
    }
}
