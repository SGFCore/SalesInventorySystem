package dev.uit.project.dto;

import dev.uit.project.entity.*;
import java.time.Instant;
import java.time.LocalDate;
import java.math.BigDecimal;

public class RequestdetailIdDTO {
    private Long requestid;
    private Long productid;
    public RequestdetailIdDTO() {}
    public RequestdetailIdDTO(Long requestid, Long productid) {
        this.requestid = requestid; this.productid = productid;
    }
    public Long getRequestid() { return requestid; }
    public void setRequestid(Long requestid) { this.requestid = requestid; }
    public Long getProductid() { return productid; }
    public void setProductid(Long productid) { this.productid = productid; }
}