package org.group5.swp391.dto.response.AdminResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SubscriptionPlanResponse {
    String subscriptionPlanID;
    String name;
    String description;
    double price;
    Integer timeOfExpiration;
}
