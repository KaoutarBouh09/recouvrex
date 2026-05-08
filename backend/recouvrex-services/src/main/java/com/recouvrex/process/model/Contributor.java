package com.recouvrex.process.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Builder
@Entity
@Table(name="contributor")
public class Contributor extends BaseEntity{



}
