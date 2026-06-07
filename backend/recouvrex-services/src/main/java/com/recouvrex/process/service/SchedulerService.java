package com.recouvrex.process.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class SchedulerService {

    @Autowired
    private ReminderService reminderService;

    // Tous les jours à 3h
   @Scheduled(cron = "0 */2 * * * ?")
    public void scheduleDailyReminder() {
        reminderService.sendOverdueReminders();
        reminderService.sendInstallmentReminders();
        reminderService.triggerChatbotForOverdue();
    }
}
