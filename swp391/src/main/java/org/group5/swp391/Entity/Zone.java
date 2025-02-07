package org.group5.swp391.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Zone")
public class Zone extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ZoneID")
    String zoneID;

    @Column(name = "Name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String name;

    @Column(name = "Location", nullable = false, columnDefinition = "NVARCHAR(255)")
    String location;

    @Column(name = "Quantity", nullable = false)
    long quantity;

    @Column(name = "Size", nullable = false)
    long size;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "ProductID")
    Product product;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "StoreID")
    Store store;
}
