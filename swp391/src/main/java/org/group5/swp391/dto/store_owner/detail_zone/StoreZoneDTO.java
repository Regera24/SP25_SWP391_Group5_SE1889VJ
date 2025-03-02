package org.group5.swp391.dto.store_owner.detail_zone;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.group5.swp391.entity.Product;
import org.group5.swp391.entity.Store;


import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StoreZoneDTO {
    String id;
    String name;
    String location;
    long quantity;
    long size;
    String storeID;
    String productID;
    String productName;
    String created_by;
    LocalDate created_at;
    LocalDate updated_at;
}
