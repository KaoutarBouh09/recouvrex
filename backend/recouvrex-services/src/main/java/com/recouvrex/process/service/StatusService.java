package com.recouvrex.process.service;

import com.recouvrex.process.model.Status;
import com.recouvrex.process.utils.CountCasesStatus;

import java.util.List;
import java.util.Objects;

public interface StatusService {
     Status save(Status status);

     List<Status> listStatus();
     List<CountCasesStatus> findStatusCounts(Long userId);

     List<CountCasesStatus> findStatusCountsAll();

}
