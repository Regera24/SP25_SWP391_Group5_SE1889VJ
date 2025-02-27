package org.group5.swp391.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Invoice")
public class Invoice extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "InvoiceID")
    String invoiceID;

    @Column(name = "ProductMoney", nullable = false)
    Double productMoney;

    @Column(name = "ShipMoney", nullable = false)
    Double shipMoney;

    @Column(name = "Description", columnDefinition = "NVARCHAR(255)")
    String description;

    @Column(name = "Type", nullable = false)
    Boolean type;

    @Column(name = "Status", nullable = false)
    Boolean status;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "CustomerID")
    Customer customer;

    @Column(name = "CustomerName")
    String customerName;

    @Column(name = "CustomerPhoneNumber")
    String customerPhoneNumber;

    @OneToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST }, mappedBy = "invoice")
    List<InvoiceDetail> invoiceDetails = new ArrayList<>();

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "StoreID")
    Store store;
}
