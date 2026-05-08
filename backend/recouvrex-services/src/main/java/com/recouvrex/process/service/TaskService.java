package com.recouvrex.process.service;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.Task;
import com.recouvrex.process.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface TaskService {

    public List<Task> findByCaseId(Long caseId);

    public Task save(Task task, Long caseId);

    boolean deleteTasksByIds(List<Long> ids);

    public Task update(Long id, Task task);

    List<Task>  findNewTasksByUserId(Long userId);

}
