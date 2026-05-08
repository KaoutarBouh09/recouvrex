package com.recouvrex.process.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="task")
public class Task extends BaseEntity{

    private String type;
    private LocalDateTime startDate;
    private LocalDateTime enDate;
    private LocalDateTime createdOn;
    private LocalDateTime ScheduledTo;
    private Boolean isNew;
    @ManyToOne
    @JoinColumn(name = "case_id")
    private Case cas;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
    @ManyToOne
    @JoinColumn(name = "user_creator_id")
    private User createdBy;
    private String taskObject;
    private String taskDescription;
    private Boolean sendNotification;
    private Integer achievement; //this should be between 0 and 100 means the achevment is from 0% to 100%

}
