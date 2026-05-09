package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "FEEDBACK")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FEEDBACKID", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "ORDERDETAILID")
    private Orderdetail orderdetailid;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "CUSTOMERID")
    private Customer customerid;

    @Size(max = 200)
    @NotNull
    @Column(name = "FEEDBACKCOMMENT", nullable = false, length = 200)
    private String feedbackcomment;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "FEEDBACKDATE")
    private Instant feedbackdate;

    @Size(max = 4000)
    @Column(name = "ATTACHMENTURL", length = 4000)
    private String attachmenturl;

    @NotNull
    @Column(name = "RATING", nullable = false)
    private Long rating;


}