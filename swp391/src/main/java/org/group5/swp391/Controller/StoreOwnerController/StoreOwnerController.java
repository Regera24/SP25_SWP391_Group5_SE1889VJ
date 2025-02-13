package org.group5.swp391.Controller.StoreOwnerController;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.DTO.StoreOwnerDTO.InvoiceDTO;
import org.group5.swp391.DTO.StoreOwnerDTO.ProductDTO;
import org.group5.swp391.DTO.StoreOwnerDTO.StoreDTO;
import org.group5.swp391.Service.Impl.StoreOwnerImpl.InvoiceServiceImpl;
import org.group5.swp391.Service.Impl.StoreOwnerImpl.ProductServiceImpl;
import org.group5.swp391.Service.Impl.StoreOwnerImpl.StoreServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/store-owner")
@RequiredArgsConstructor
public class StoreOwnerController {
    private final InvoiceServiceImpl invoiceService;
    private final StoreServiceImpl storeService;
    private final ProductServiceImpl productService;

    @GetMapping("/invoices")
    public Page<InvoiceDTO> getInvoices(
            @RequestParam String phoneNumber,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending
    ) {
        return invoiceService.getInvoices(phoneNumber, page, size, sortBy, descending);
    }

    @GetMapping("/stores")
    public Page<StoreDTO> getStores(
            @RequestParam String storeName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending
    ) {
        return storeService.getStores(storeName, page, size, sortBy, descending);
    }

    @GetMapping("/products")
    public Page<ProductDTO> getProducts(
            @RequestParam String productName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending
    ) {
        return productService.getProducts(productName, page, size, sortBy, descending);
    }
}
