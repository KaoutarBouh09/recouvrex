package com.recouvrex.process.service.impl;

import com.recouvrex.process.model.Tutorial;
import com.recouvrex.process.repository.TutorialRepository;
import com.recouvrex.process.service.TutorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutorialServiceImpl implements TutorialService {

	@Autowired
	TutorialRepository tutorialRepository;

	@Override
	public List<Tutorial> findAll() {
		return tutorialRepository.findAll();
	}

	@Override
	public List<Tutorial> findByTitleContaining(String title) {
		return tutorialRepository.findByTitle(title);
	}

	@Override
	public Optional<Tutorial> findById(long id) {
		return tutorialRepository.findById(id);
	}

	@Override
	public Tutorial save(Tutorial tutorial) {
		return tutorialRepository.save(tutorial);
	}

	@Override
	public void deleteById(long id) {
		 tutorialRepository.deleteById(id);
	}

	@Override
	public void deleteAll() {
    tutorialRepository.deleteAll();
	}

	@Override
	public List<Tutorial> findByPublished(boolean isPublished) {
		return tutorialRepository.findByPublished(isPublished);
	}
}
