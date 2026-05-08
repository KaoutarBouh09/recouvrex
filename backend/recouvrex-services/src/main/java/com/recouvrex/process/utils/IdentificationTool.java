package com.recouvrex.process.utils;

import com.recouvrex.process.repository.CreditRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

public class IdentificationTool {

    public static String generateCaseId(){

        return UUID.randomUUID().toString();

    }
    public static String generateDueDateId(){return UUID.randomUUID().toString();}

    public static String generateReglementId(){return UUID.randomUUID().toString();}

    public static String generateThirdPartyId(Long lastId){
        Long nextId = lastId + 1;
        // Format the ID with leading zeros
        String formattedId = String.format("%05d", nextId);
        // Return the formatted ID
        return "IND" + formattedId;

    }

    public static String generateCreditId(Long lastId ){
        Long nextId = lastId + 1;
        // Format the ID with leading zeros
        String formattedId = String.format("%010d", nextId);
        // Return the formatted ID
        return "CRD" + formattedId;
    }

    public static String generateAgreementId(){
        return UUID.randomUUID().toString();
    }


}
