package com.recouvrex.process.service;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.User;
import com.recouvrex.process.model.enums.FollowingActionEnum;
import com.recouvrex.process.model.enums.ProcessingActionEnum;
import com.recouvrex.process.model.enums.StatusEnum;
import com.recouvrex.process.model.enums.UserStatusEnum;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface CaseService {

	List<Case> findAll();

	List<Case> findByCaseId(String caseId);

	Optional<Case> findById(long id);

	Case save(Case cas);

	void deleteById(long id);

	void deleteAll();

	List<Case> findByStatus(StatusEnum status);

	Case createCase(Case cas);

	Case decideOnAction(String caseId, FollowingActionEnum followingAction, Long statusId);

	List<Case> filterCase(Long userConnectedId, String caseId, String firstnameThird, String lastnameThird,
						  String firstnameUser, String lastnameUser, String contractId, String status, UserStatusEnum userStatus);

	List<Case> filterCaseOneCriteria(Long userConnected, Long statusId, String searchText);

	Case processCollectAction(String caseId, ProcessingActionEnum processingAction, Long statusId);

	Case processCollectAction(String caseId, Long procedureId, Long statusId, ProcessingActionEnum processingAction);

	List<Case> filterCaseByUserId(Long userId);

	List<Case> createMultipleCases(List<Case> cases);

	void updateCaseUserId(List<Long> casesId , Long userId);

	Long numberOfCasesForUser(Long userId) ;

	Long caseAmountTotalByStatus(String status , Long userId);

	List<Case> findAllByOrderByIdDesc();

	List<Case> FilterWithCriteriaForAdmin( String caseId, String firstnameThird, String lastnameThird,
										  String firstnameUser, String lastnameUser,
										   String contractId, String status, UserStatusEnum userStatus);


	List<Case> filterCaseOneCriteriaForAdmin(Long statusId, String searchText);

}


