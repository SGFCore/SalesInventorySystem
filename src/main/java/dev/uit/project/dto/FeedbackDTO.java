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
}