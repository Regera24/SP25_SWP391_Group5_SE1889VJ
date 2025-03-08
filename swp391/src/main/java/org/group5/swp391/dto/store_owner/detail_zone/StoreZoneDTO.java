package org.group5.swp391.dto.store_owner.detail_zone;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StoreZoneDTO {
    @JsonInclude()
    String id;

    @NotBlank(message = "Tên khu không được để trống")
    @Size(max = 100, message = "Tên khu không được vượt quá 100 ký tự")
    String name;

    @NotBlank(message = "Vị trí không được để trống")
    @Size(max = 50, message = "Vị trí không được vượt quá 50 ký tự")
    String location;

    @Min(value = 1, message = "Số lượng phải lớn hơn 0")
    long quantity;

    @Min(value = 1, message = "Kích thước phải lớn hơn 0")
    long size;

    @NotBlank(message = "ID cửa hàng không được để trống")
    String storeID;

    @NotBlank(message = "ID sản phẩm không được để trống")
    String productID;

    @JsonInclude
    String productName;

    @JsonInclude
    String createdBy;

    @JsonInclude
    LocalDateTime createdAt;

    @JsonInclude
    LocalDateTime updatedAt;
}