package com.recouvrex.process.utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CountCasesStatus implements Serializable {
    Long id;
    String status;
    Long count;
}
