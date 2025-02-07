package org.group5.swp391.DTO.StoreOwner;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvoiceDTO {
    String invoiceID;
    LocalDateTime createdAt;
    Double productMoney;
    Double shipMoney;
    String description;
    Boolean type;
    Boolean status;
    String customerName;
    String storeName;
}
