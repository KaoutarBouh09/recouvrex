package com.recouvrex.process.repository;

import com.recouvrex.process.model.Tutorial;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TutorialRepository extends JpaRepository <Tutorial, Long> {

	List<Tutorial> findByTitle(String title);

	@Query("SELECT t from Tutorial t WHERE t.published = :isPublished")
	List<Tutorial> findByPublished(@Param("isPublished") boolean isPublished);
}
