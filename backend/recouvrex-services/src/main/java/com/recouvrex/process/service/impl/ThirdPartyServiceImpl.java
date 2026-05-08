package com.recouvrex.process.service.impl;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.ThirdParty;
import com.recouvrex.process.model.User;
import com.recouvrex.process.repository.ThirdPartyRepository;
import com.recouvrex.process.repository.UserRepository;
import com.recouvrex.process.service.ThirdPartyService;
import com.recouvrex.process.utils.CaseSpecifications;
import com.recouvrex.process.utils.IdentificationTool;
import com.recouvrex.process.utils.ThirdPartySpecifications;
import jakarta.persistence.EntityNotFoundException;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ThirdPartyServiceImpl implements ThirdPartyService {
    @Autowired
    ThirdPartyRepository thirdPartyRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ThirdParty createThirdParty(ThirdParty thirdParty) {
        User user = userRepository.findById(thirdParty.getUser().getId()).orElse(null);
        thirdParty.setUser(user);
        Long lastId = thirdPartyRepository.getLastThirdPartyId();
        if (lastId == null) {
            lastId = 0L;
        }
        thirdParty.setThirdPartyId(IdentificationTool.generateThirdPartyId(lastId));
        return thirdPartyRepository.save(thirdParty);
    }

    @Override
    public List<ThirdParty> getAllThirdPartyByUserId(Long userId) {
        return thirdPartyRepository.getAllThirdPartyByUserId(userId);
    }

    @Override
    public ThirdParty updateThirdParty(ThirdParty thirdParty) {
        // Find the existing entity from the database
        ThirdParty existingThirdParty = thirdPartyRepository.findById(thirdParty.getId())
                .orElseThrow(() -> new EntityNotFoundException("DueDate not found with id: " + thirdParty.getId()));
        // Use BeanUtils to copy properties from thirdParty to existingthirdParty
        BeanUtils.copyProperties(thirdParty, existingThirdParty, "id", "thirdPartyId", "user");

        // Save the updated entity back to the database
        return thirdPartyRepository.save(existingThirdParty);

    }

    @Override
    public List<ThirdParty> FilterThirdPartyMultiCriteria(Long userConnectedId, String thirdPartyId,
            String firstnameThird, String lastnameThird, String personalEmail, String professionalEmail,
            String clientType, String companyName) {
        Specification<ThirdParty> spec = ThirdPartySpecifications.FilterThirdPartyMultiCriteria(userConnectedId,
                thirdPartyId, firstnameThird,
                lastnameThird, personalEmail, professionalEmail, clientType, companyName);

        return thirdPartyRepository.findAll(spec);
    }

    @Override
    public List<ThirdParty> filterThirdPartyUsingOneArg(Long userConnectedId, String searchKeyWord) {
        Specification<ThirdParty> spec = ThirdPartySpecifications.filterThirdPartyUsingOneArg(userConnectedId,
                searchKeyWord);
        return thirdPartyRepository.findAll(spec);
    }

    @Override
    @Transactional
    public List<ThirdParty> createMultipleThirdParties(List<ThirdParty> thirdParties) {
        return thirdPartyRepository.saveAll(thirdParties);
    }

    @Override
    public Long countNbrThirdPartyByUser(Long userId) {
        return thirdPartyRepository.countNbrThirdPartyByUser(userId);
    }


}
