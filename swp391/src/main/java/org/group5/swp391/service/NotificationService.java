package org.group5.swp391.service;

import org.group5.swp391.dto.notification.NotificationDTO;
import org.group5.swp391.dto.notification.SendNotificationRequest;
import org.group5.swp391.dto.request.admin_request.MarkAsReadRequest;
import org.group5.swp391.dto.response.account_response.NotificationResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NotificationService {
    public List<NotificationResponse> getNotificationsByTargetAccountId(String targetAccountID);
    public void markMultipleAsRead(MarkAsReadRequest request);
    public void sendNotification(SendNotificationRequest request);
    public NotificationDTO saveNotification(SendNotificationRequest request);
}
