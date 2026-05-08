package com.recouvrex.process.model.guarantee;

import com.recouvrex.process.model.BaseEntity;
import com.recouvrex.process.model.Credit;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class Guarantee extends BaseEntity {

    // Relation many-to-one avec l'entité Credit
    @ManyToOne
    @JoinColumn(name = "credit_id")
    private Credit credit;

    // Type de garantie (exemple: Hypothèque, Fonds de commerce, etc.)
    private String type;

}
