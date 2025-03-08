package org.group5.swp391.controller.store_owner;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.dto.customer_requirement.CustomerProductDTO;
import org.group5.swp391.dto.store_owner.detail_zone.StoreZoneDTO;
import org.group5.swp391.entity.Zone;
import org.group5.swp391.service.ProductService;
import org.group5.swp391.service.ZoneService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/store-detail")
@RequiredArgsConstructor
public class StoreController {

    private final ZoneService zoneService;
    private final ProductService productService;

    @GetMapping("/zones")
    public Page<StoreZoneDTO> getStoreZones(@RequestParam(value = "zoneName", required = false) String zoneName,
                                            @RequestParam(value = "storeID") String storeID,
                                            @RequestParam(value = "page", defaultValue = "0") int page,
                                            @RequestParam(value = "size", defaultValue = "10") int size,
                                            @RequestParam(defaultValue = "name") String sortBy,
                                            @RequestParam(defaultValue = "false") boolean descending) throws Exception {
        return zoneService.getStoreZones(zoneName, storeID, page, size, sortBy, descending);
    }

    @GetMapping("/products")
    public List<CustomerProductDTO> getProducts(@RequestParam(value = "storeID") String storeID) {
        return productService.getAllProductsByStoreID(storeID);
    }

    @GetMapping("/get-zone")
    public StoreZoneDTO getZoneById(@RequestParam(value = "zoneID") String zoneID) {
        return zoneService.getZone(zoneID);
    }

    @PostMapping("/zones")
    public void addNewZone(@RequestBody StoreZoneDTO storeZoneDTO) throws Exception {
        zoneService.addZone(storeZoneDTO);
    }

    @PutMapping("/zones/{zoneID}")
    public ResponseEntity<String> updateZone(@PathVariable String zoneID, @RequestBody StoreZoneDTO updatedZone) {
        try {
            zoneService.updateZone(zoneID, updatedZone);
            return ResponseEntity.ok("Zone updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update zone.");
        }
    }

}