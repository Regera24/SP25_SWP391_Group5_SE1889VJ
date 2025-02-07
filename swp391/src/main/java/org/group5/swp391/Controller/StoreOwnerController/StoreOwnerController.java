package org.group5.swp391.Controller.StoreOwnerController;

import org.group5.swp391.DTO.StoreOwner.InvoiceDTO;
import org.group5.swp391.DTO.StoreOwner.StoreDTO;
import org.group5.swp391.Service.Impl.InvoiceServiceImpl;
import org.group5.swp391.Service.Impl.StoreServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/storeowner")
public class StoreOwnerController {
    @Autowired
    InvoiceServiceImpl invoiceService;
    @Autowired
    StoreServiceImpl storeService;

    @GetMapping("/invoices")
    public List<InvoiceDTO> getInvoices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending
    ) {
        return invoiceService.getInvoices(page, size, sortBy, descending);
    }

    @GetMapping("/stores")
    public List<StoreDTO> getStores(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending
    ) {
        return storeService.getStores(page, size, sortBy, descending);
    }
}
