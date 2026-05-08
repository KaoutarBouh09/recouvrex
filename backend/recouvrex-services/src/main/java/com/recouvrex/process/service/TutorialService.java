package com.recouvrex.process.service;

import com.recouvrex.process.model.Tutorial;

import java.util.List;
import java.util.Optional;

public interface TutorialService {

		 List<Tutorial> findAll();
		 List<Tutorial> findByTitleContaining(String title);
	   Optional<Tutorial> findById(long id);
		 Tutorial save(Tutorial tutorial);
		 void deleteById(long id);
		 void deleteAll();
		 List<Tutorial> findByPublished(boolean isPublished);

}
