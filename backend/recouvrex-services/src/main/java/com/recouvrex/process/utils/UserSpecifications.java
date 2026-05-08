package com.recouvrex.process.utils;


import com.recouvrex.process.model.User;
import com.recouvrex.process.model.enums.UserStatusEnum;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecifications {
    public static Predicate managerUsers(Long connectedUserId, Root<User> root, CriteriaQuery<?> query,
                                         CriteriaBuilder criteriaBuilder) {
        Predicate userPredicate = criteriaBuilder.conjunction();

        userPredicate = criteriaBuilder.and(userPredicate,
                criteriaBuilder.equal(root.get("manager").get("id"), connectedUserId));

        // Predicate for user status being "ACTIVE"
        userPredicate = criteriaBuilder.and(userPredicate,
                criteriaBuilder.equal(root.get("status"), UserStatusEnum.ACTIVE));

        return userPredicate;
    }



    public static Specification<User> FilterUserByMultiCriteria(Long userConnectedId, String userId, String firstnameUser,
                                                                          String lastnameUser ) {
        return (Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = managerUsers(userConnectedId, root, query, criteriaBuilder);

            // Add your additional search conditions based on the provided criteria
            if (!StringUtils.isBlank(firstnameUser)) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), "%" + firstnameUser.toLowerCase() + "%"));
            }


            if (lastnameUser != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), "%" + lastnameUser.toLowerCase() + "%"));
            }


            if (userId != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("identificationNumber")), "%" + userId.toLowerCase() + "%"));
            }


            return predicate;
        };
    }

    ////////////// SEARCH BY ONE ARGS //////////////

    public static Specification<User> filterUsersUsingOneArg(Long userConnectedId, String searchText) {
        return (Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = managerUsers(userConnectedId, root, query, criteriaBuilder);

            // Add your additional search conditions based on the provided searchText
            if (searchText != null && !searchText.isEmpty()) {
                String searchTextLower = searchText.toLowerCase(); // Convert search text to lowercase
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("identificationNumber")), "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")),
                                "%" + searchTextLower + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")),
                                "%" + searchTextLower + "%")
                ));

            }

            return predicate;
        };
    }
}
