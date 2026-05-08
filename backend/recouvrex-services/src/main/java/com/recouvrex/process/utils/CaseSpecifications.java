package com.recouvrex.process.utils;

import com.recouvrex.process.model.*;
import com.recouvrex.process.model.enums.UserStatusEnum;
import com.recouvrex.process.repository.CaseRepository;
import com.recouvrex.process.repository.UserRepository;
import jakarta.persistence.criteria.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CaseSpecifications {

    public static Predicate casesForUsers(Long connectedUserId, Root<Case> root, CriteriaQuery<?> query,
            CriteriaBuilder criteriaBuilder) {
        Predicate userPredicate = criteriaBuilder.conjunction();

        userPredicate = criteriaBuilder.and(userPredicate,
                criteriaBuilder.equal(root.get("assignedAgent").get("id"), connectedUserId));

        Join<Case, User> managerJoin = root.join("assignedAgent");
        userPredicate = criteriaBuilder.or(userPredicate,
                criteriaBuilder.equal(managerJoin.get("manager").get("id"), connectedUserId));

        return userPredicate;
    }

    public static Specification<Case> withCriteria(Long userConnectedId, String caseId, String firstnameThird,
            String lastnameThird, String firstnameUser, String lastnameUser, String contractId, String status , UserStatusEnum userStatus) {
        return (Root<Case> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = casesForUsers(userConnectedId, root, query, criteriaBuilder);

            // Add your additional search conditions based on the provided criteria
            if (!StringUtils.isBlank(caseId)) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("caseId")), "%" + caseId.toLowerCase() + "%"));
            }
            if (status != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("status").get("status")), "%" + status.toLowerCase() + "%"));
            }
            /*
             * if (procedureId != null) {
             * predicate = criteriaBuilder.and(predicate,
             * criteriaBuilder.equal(root.get("procedure").get("id"), procedureId));
             * }
             */
            if (firstnameThird != null) {
            
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("firstName")), "%" + firstnameThird.toLowerCase() + "%"));
            }
            if (lastnameThird != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("lastName")), "%" + lastnameThird.toLowerCase() + "%"));
            }
            if (contractId != null) {
                // Subquery to select the thirdpartyId based on the contractId
                Subquery<Long> thirdPartyIdSubquery = query.subquery(Long.class);
                Root<Contract> contractRoot = thirdPartyIdSubquery.from(Contract.class);
                thirdPartyIdSubquery.select(contractRoot.get("thirdParty").get("id"));
                thirdPartyIdSubquery.where(criteriaBuilder.equal(contractRoot.get("contractId"), contractId));

                // Main query to select cases where thirdpartyId matches the subquery result
                predicate = criteriaBuilder.and(predicate, root.get("thirdParty").get("id").in(thirdPartyIdSubquery));
            }

            if (firstnameUser != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(root.get("assignedAgent").get("firstName"), "%" + firstnameUser + "%"));
            }
            if (lastnameUser != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(root.get("assignedAgent").get("lastName"), "%" + lastnameUser + "%"));
            }
            if (userStatus != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get("assignedAgent").get("status"),   userStatus ));
            }

            return predicate;
        };
    }

    public static Specification<Case> withCriteriaOneString(Long userConnectedId, Long statusId, String searchText) {
        return (Root<Case> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = casesForUsers(userConnectedId, root, query, criteriaBuilder);
            if (statusId != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get("status").get("id"), statusId));
            }
            // Add your additional search conditions based on the provided searchText
            if (searchText != null && !searchText.isEmpty()) {
                String searchTextLower = searchText.toLowerCase(); // Convert search text to lowercase
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("caseId")), "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("firstName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("status").get("status")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("lastName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("thirdPartyId")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("assignedAgent").get("lastName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("assignedAgent").get("firstName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("assignedAgent").get("status")),
                                  searchTextLower ),
                        // Handle contractId using subquery
                        getContractIdPredicate(searchTextLower, root, query, criteriaBuilder)));

            }

            return predicate;
        };
    }

    private static Predicate getContractIdPredicate(String contractId, Root<Case> root, CriteriaQuery<?> query,
            CriteriaBuilder criteriaBuilder) {
        // Subquery to select the thirdpartyId based on the contractId
        Subquery<Long> thirdPartyIdSubquery = query.subquery(Long.class);
        Root<Contract> contractRoot = thirdPartyIdSubquery.from(Contract.class);
        thirdPartyIdSubquery.select(contractRoot.get("thirdParty").get("id"));
        thirdPartyIdSubquery.where(criteriaBuilder.equal(contractRoot.get("contractId"), contractId));

        // Main query to select cases where thirdpartyId matches the subquery result
        return root.get("thirdParty").get("id").in(thirdPartyIdSubquery);
    }

    //**************************************************************//
                          // CASE SPECIFICATIONS FOR ADMIN //
    //**************************************************************//
    public static Specification<Case> withCriteriaForAdmin( String caseId, String firstnameThird,
                                                   String lastnameThird, String firstnameUser, String lastnameUser, String contractId, String status , UserStatusEnum userStatus) {
        return (Root<Case> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            // Add your additional search conditions based on the provided criteria
            if (!StringUtils.isBlank(caseId)) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("caseId")), "%" + caseId.toLowerCase() + "%"));
            }
            if (status != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("status").get("status")), "%" + status.toLowerCase() + "%"));
            }
            /*
             * if (procedureId != null) {
             * predicate = criteriaBuilder.and(predicate,
             * criteriaBuilder.equal(root.get("procedure").get("id"), procedureId));
             * }
             */
            if (firstnameThird != null) {

                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("firstName")), "%" + firstnameThird.toLowerCase() + "%"));
            }
            if (lastnameThird != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("lastName")), "%" + lastnameThird.toLowerCase() + "%"));
            }
            if (contractId != null) {
                // Subquery to select the thirdpartyId based on the contractId
                Subquery<Long> thirdPartyIdSubquery = query.subquery(Long.class);
                Root<Contract> contractRoot = thirdPartyIdSubquery.from(Contract.class);
                thirdPartyIdSubquery.select(contractRoot.get("thirdParty").get("id"));
                thirdPartyIdSubquery.where(criteriaBuilder.equal(contractRoot.get("contractId"), contractId));

                // Main query to select cases where thirdpartyId matches the subquery result
                predicate = criteriaBuilder.and(predicate, root.get("thirdParty").get("id").in(thirdPartyIdSubquery));
            }

            if (firstnameUser != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(root.get("assignedAgent").get("firstName"), "%" + firstnameUser + "%"));
            }
            if (lastnameUser != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(root.get("assignedAgent").get("lastName"), "%" + lastnameUser + "%"));
            }
            if (userStatus != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get("assignedAgent").get("status"),   userStatus ));
            }

            return predicate;
        };
    }



    public static Specification<Case> withCriteriaOneStringForAdmin(Long statusId, String searchText) {
        return (Root<Case> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (statusId != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get("status").get("id"), statusId));
            }
            // Add your additional search conditions based on the provided searchText
            if (searchText != null && !searchText.isEmpty()) {
                String searchTextLower = searchText.toLowerCase(); // Convert search text to lowercase
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("caseId")), "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("firstName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("status").get("status")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("lastName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdParty").get("thirdPartyId")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("assignedAgent").get("lastName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("assignedAgent").get("firstName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("assignedAgent").get("status")),
                                searchTextLower ),
                        // Handle contractId using subquery
                        getContractIdPredicate(searchTextLower, root, query, criteriaBuilder)));

            }

            return predicate;
        };
    }

}
