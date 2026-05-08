package com.recouvrex.process.repository;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.ThirdParty;
import com.recouvrex.process.model.User;
import com.recouvrex.process.model.enums.StatusEnum;
import com.recouvrex.process.model.enums.UserStatusEnum;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository <User, Long> , JpaSpecificationExecutor<User> {

	//List<User> findAll();

	@Query(value = "SELECT * FROM user u WHERE  u.profile_id = :profileId", nativeQuery = true)
	List<User> findByProfile(Long profileId);

	@Query("SELECT u FROM User u WHERE u.manager.id = :managerId AND u.status = :status")
	List<User> findByManagerIdAndStatus(@Param("managerId") Long managerId, @Param("status") UserStatusEnum status);


	@Query(value = "SELECT COUNT(*) FROM collect_case c WHERE c.user_id = :userId",nativeQuery = true)
	Long  countCaseByUser(Long userId);


	User findByUserName(String userName);
    User findByEmail(String email);
}
