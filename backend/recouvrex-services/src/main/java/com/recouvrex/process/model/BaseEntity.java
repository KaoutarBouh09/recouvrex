package com.recouvrex.process.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
@Data
@Setter
@Getter
@MappedSuperclass
public abstract class BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
