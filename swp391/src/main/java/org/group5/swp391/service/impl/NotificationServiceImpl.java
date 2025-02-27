package org.group5.swp391.service.impl;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.dto.request.admin_request.MarkAsReadRequest;
import org.group5.swp391.dto.response.AdminResponse.NotificationResponse;
import org.group5.swp391.entity.Notification;
import org.group5.swp391.exception.AppException;
import org.group5.swp391.exception.ErrorCode;
import org.group5.swp391.repository.NotificationRepository;
import org.group5.swp391.service.NotificationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    // lấy danh sách thông báo theo ID người nhận
    public List<NotificationResponse> getNotificationsByTargetAccountId(String targetAccountID) {
        return notificationRepository.findByTargetAccount_AccountID(targetAccountID).stream()
                .map(notification -> NotificationResponse.builder()
                        .notificationId(notification.getNotificationID())
                        .message(notification.getMessage())
                        .isRead(notification.getIsRead())
                        .createdAt(notification.getCreatedAt())
                        .createdBy(notification.getCreatedBy())
                        .accountId(notification.getSendAccount().getAccountID())
                        .targetAccountId(notification.getTargetAccount().getAccountID())
                        .build())
                .collect(Collectors.toList());
    }

    // cập nhật trạng thái đã xem thông báo
    public void markMultipleAsRead(MarkAsReadRequest request) {
        List<Notification> notifications = notificationRepository.findAllById(request.getNotificationIDs());

        if (notifications.isEmpty()) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }

        notifications.forEach(notification -> notification.setIsRead(request.getIsRead()));
        notificationRepository.saveAll(notifications);
    }

}
