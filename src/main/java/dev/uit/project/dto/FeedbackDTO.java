package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Feedback;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {

    @JsonProperty("FeedbackID")
    private Long id;

    @JsonProperty("OrderDetailID")
    private Long orderdetailId;

    @JsonProperty("CustomerID")
    private Long customerId;

    @JsonProperty("FeedbackComment")
    private String feedbackcomment;

    @JsonProperty("FeedBackDate") // NOTE: FE types.ts uses FeedBackDate with uppercase B
    private Instant feedbackdate;

    @JsonProperty("AttachmentURL")
    private String attachmenturl;

    @JsonProperty("Rating")
    private Long rating;

    public static FeedbackDTO fromEntity(Feedback entity) {
        if (entity == null) return null;
        Long odId = entity.getOrderdetailid() != null ? entity.getOrderdetailid().getId() : null;
        Long custId = entity.getCustomerid() != null ? entity.getCustomerid().getId() : null;
        return new FeedbackDTO(
                entity.getId(),
                odId,
                custId,
                entity.getFeedbackcomment(),
                entity.getFeedbackdate(),
                entity.getAttachmenturl(),
                entity.getRating()
        );
    }

    public Feedback toEntity() {
        Feedback entity = new Feedback();
        entity.setId(this.id);
        entity.setFeedbackcomment(this.feedbackcomment);
        entity.setFeedbackdate(this.feedbackdate);
        entity.setAttachmenturl(this.attachmenturl);
        entity.setRating(this.rating);
        if (this.orderdetailId != null) {
            dev.uit.project.entity.Orderdetail od = new dev.uit.project.entity.Orderdetail();
            od.setId(this.orderdetailId);
            entity.setOrderdetailid(od);
        }
        if (this.customerId != null) {
            dev.uit.project.entity.Customer c = new dev.uit.project.entity.Customer();
            c.setId(this.customerId);
            entity.setCustomerid(c);
        }
        return entity;
    }
}