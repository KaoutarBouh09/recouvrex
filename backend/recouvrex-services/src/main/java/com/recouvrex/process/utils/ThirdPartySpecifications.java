package com.recouvrex.process.utils;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.Contract;
import com.recouvrex.process.model.ThirdParty;
import com.recouvrex.process.model.User;
import jakarta.persistence.criteria.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class ThirdPartySpecifications {
    public static Predicate thirdPartyByUsers(Long connectedUserId, Root<ThirdParty> root, CriteriaQuery<?> query,
                                          CriteriaBuilder criteriaBuilder) {
        Predicate userPredicate = criteriaBuilder.conjunction();

        userPredicate = criteriaBuilder.and(userPredicate,
                criteriaBuilder.equal(root.get("user").get("id"), connectedUserId));

       /* Join<Case, User> managerJoin = root.join("assignedAgent");
        userPredicate = criteriaBuilder.or(userPredicate,
                criteriaBuilder.equal(managerJoin.get("manager").get("id"), connectedUserId));
*/
        return userPredicate;
    }



    public static Specification<ThirdParty> FilterThirdPartyMultiCriteria(Long userConnectedId, String thirdPartyId, String firstnameThird,
                                                         String lastnameThird, String personalEmail, String professionalEmail, String clientType, String companyName) {
        return (Root<ThirdParty> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = thirdPartyByUsers(userConnectedId, root, query, criteriaBuilder);

            // Add your additional search conditions based on the provided criteria
            if (!StringUtils.isBlank(thirdPartyId)) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdPartyId")), "%" + thirdPartyId.toLowerCase() + "%"));
            }
            if (companyName != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("companyName")), "%" + companyName.toLowerCase() + "%"));
            }

            if (firstnameThird != null) {

                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), "%" + firstnameThird.toLowerCase() + "%"));
            }
            if (lastnameThird != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), "%" + lastnameThird.toLowerCase() + "%"));
            }


            if (professionalEmail != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("businessEmail")), "%" + professionalEmail.toLowerCase() + "%"));
            }
            if (personalEmail != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("personalEmail")), "%" + personalEmail.toLowerCase() + "%"));
            }
            if (clientType != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("tiersType")), "%" + clientType.toLowerCase() + "%"));
            }

            return predicate;
        };
    }

    ////////////// SEARCH BY ONE ARGS //////////////

    public static Specification<ThirdParty> filterThirdPartyUsingOneArg(Long userConnectedId, String searchText) {
        return (Root<ThirdParty> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = thirdPartyByUsers(userConnectedId, root, query, criteriaBuilder);

            // Add your additional search conditions based on the provided searchText
            if (searchText != null && !searchText.isEmpty()) {
                String searchTextLower = searchText.toLowerCase(); // Convert search text to lowercase
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("thirdPartyId")), "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("tiersType")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("businessEmail")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("personalEmail")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("companyName")),
                                "%" + searchTextLower + "%")
                ));

            }

            return predicate;
        };
    }







}
