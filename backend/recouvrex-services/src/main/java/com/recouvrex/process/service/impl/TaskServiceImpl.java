package com.recouvrex.process.service.impl;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.Task;
import com.recouvrex.process.model.User;
import com.recouvrex.process.repository.CaseRepository;
import com.recouvrex.process.repository.TaskRepository;
import com.recouvrex.process.service.TaskService;
import com.recouvrex.process.utils.IdentificationTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CaseRepository caseRepository;

    @Override
    public List<Task> findByCaseId(Long caseId) {
        return taskRepository.findByCaseId(caseId);
    }

    public List<Task> findByCaseIdAndUserId(Long caseId, Long userId) {
        return taskRepository.findByCaseIdAndUserId(caseId, userId);
    }

    @Override
    public Task save(Task task, Long caseId) {
        Case cas = caseRepository.findById(caseId).orElse(null);
        task.setCas(cas);
        task.setIsNew(true);
        return taskRepository.save(task);
    }

    @Override
    @Transactional
    public boolean deleteTasksByIds(List<Long> ids) {
        // Check if the number of tasks with the given IDs matches the number of IDs
        // provided
        int count = taskRepository.countByIds(ids);
        if (count != ids.size()) {
            return false;
        }
        taskRepository.deleteAllByIdInBatch(ids);
        return true;
    }

    @Override
    public Task update(Long id, Task taskDetails) {
        return taskRepository.findById(id).map(task -> {
            task.setType(taskDetails.getType());
            task.setStartDate(taskDetails.getStartDate());
            task.setEnDate(taskDetails.getEnDate());
            task.setCreatedOn(taskDetails.getCreatedOn());
            task.setScheduledTo(taskDetails.getScheduledTo());
            task.setTaskObject(taskDetails.getTaskObject());
            task.setTaskDescription(taskDetails.getTaskDescription());
            task.setSendNotification(taskDetails.getSendNotification());
            task.setAchievement(taskDetails.getAchievement());
            task.setOwner(taskDetails.getOwner()); // Update relationships if necessary
            task.setIsNew(taskDetails.getIsNew());
            return taskRepository.save(task);
        }).orElse(null);
    }

    @Override
    public List<Task> findNewTasksByUserId(Long userId) {
       return  taskRepository.findNewTasksByUserId(userId);
    }

}
