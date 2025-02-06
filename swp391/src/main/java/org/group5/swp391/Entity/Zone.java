package org.group5.swp391.Entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Zone")
public class Zone {
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

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST }, fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductID")
    Product product;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST }, fetch = FetchType.LAZY)
    @JoinColumn(name = "StoreID")
    Store store;
}
