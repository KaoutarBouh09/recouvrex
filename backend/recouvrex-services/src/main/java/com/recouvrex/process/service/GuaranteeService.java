package com.recouvrex.process.service;

import com.recouvrex.process.model.guarantee.Guarantee;
import com.recouvrex.process.model.guarantee.GuaranteesByTypeDTO;

public interface GuaranteeService {

    Guarantee createGuarantee(Object guarantee, String type);

    Guarantee updateGuarantee(Long id, Object guarantee, String type);

    GuaranteesByTypeDTO getAllGuaranteesByCreditIdGroupedByType(Long creditId);
}
