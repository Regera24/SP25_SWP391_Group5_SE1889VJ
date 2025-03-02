package org.group5.swp391.controller.store_owner;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.dto.store_owner.detail_zone.StoreZoneDTO;
import org.group5.swp391.service.ZoneService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/store-manager")
@RequiredArgsConstructor
public class StoreController {

    private final ZoneService zoneService;

    @GetMapping("/zones")
    public Page<StoreZoneDTO> getStoreZones(@RequestParam("storeID") String storeID,
                                            @RequestParam(value = "page", defaultValue = "0") int page,
                                            @RequestParam(value = "size", defaultValue = "10") int size,
                                            @RequestParam(defaultValue = "name") String sortBy,
                                            @RequestParam(defaultValue = "false") boolean descending) {
        return zoneService.getStoreZones(storeID, page, size, sortBy, descending);
    }

}
