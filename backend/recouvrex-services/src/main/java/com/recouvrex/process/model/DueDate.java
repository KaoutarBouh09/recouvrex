package com.recouvrex.process.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.recouvrex.process.model.enums.DueDateStatusEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//Classe echeance
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="due_date")
public class DueDate  extends BaseEntity{

    private String dueDateId;

    private LocalDate paymentDueDate; // ?????

    @Enumerated(EnumType.STRING)
    private DueDateStatusEnum dueDateStatus; //Statut échéance

    private BigDecimal principalAmount; //montant capital, partie de l'échéance utilisé pour payer le prêt initial

    private BigDecimal interestAmount; // intérêts

    private BigDecimal insuranceAmount; // Montant assurance

    private BigDecimal ancillaryCharge; //Montant accessoires

    private BigDecimal remainingPrincipalBalance; //Capital restant dû

    private LocalDateTime startDate; //date ouverture de l'échéance

    private LocalDateTime modificationDate; //Date de modification

    private BigDecimal totalInstallmentAmount; //montant total échéance

    private BigDecimal latePaymentCharge; //Pénalité de retard

    private BigDecimal unpaidPrincipalAmount; // montant capital impayé

    private BigDecimal accruedInterest; // montant intérêt impayé

    private BigDecimal unpaidInsurancePrenium; //Montant assurance impayé

    private BigDecimal unpaidAncillaryCharges; //Montant accessoires impayés

    private LocalDate expectedPaymentDate; // DATE paiment prevu

    @ManyToOne
    @JoinColumn(name = "case_id")
     private  Case _case;

    @ManyToOne
    @JoinColumn(name = "credit_id")
    private  Credit credit;

/*
  @OneToMany(mappedBy = "dueDate", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Reglement> reglements ; // Add this for bidirectional relationship
*/

    @PrePersist
    protected void onCreate() {
        startDate = LocalDateTime.now();
        modificationDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        modificationDate = LocalDateTime.now();
    }
}
