package org.group5.swp391.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "InvoiceDetail")
public class InvoiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "InvoiceDetailID")
    String invoiceDetailID;

    @Column(name = "Quantity", nullable = false)
    Long quantity;

    @Column(name = "Discount")
    Integer discount;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "InvoiceID")
    Invoice invoice;

    @Column(name = "ProductName")
    String productName;

    @Column(name = "ProductInformation")
    String productInformation;

    @Column(name = "ProductImage")
    String productImage;

    @Column(name = "ProductPrice")
    Double productPrice;

    @Column(name = "ProductCategoryName")
    String productCategoryName;

    @Column(name = "ProductCategoryDescription")
    String productCategoryDescription;

}
