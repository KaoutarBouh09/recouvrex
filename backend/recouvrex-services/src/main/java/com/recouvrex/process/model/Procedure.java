package com.recouvrex.process.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "procedure")
public class Procedure extends BaseEntity {


    private String procedureLabel;

}
