package org.group5.swp391.Controller.StoreOwnerController;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.DTO.StoreOwnerDTO.*;
import org.group5.swp391.Service.*;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/store-owner")
@RequiredArgsConstructor
public class StoreOwnerController {
    private final InvoiceService invoiceService;
    private final StoreService storeService;
    private final ProductService productService;
    private final InvoiceDetailService invoiceDetailService;
    private final EmployeeService employeeService;
    private final StatisticsService statisticsService;

    @GetMapping("/invoices")
    public Page<StoreInvoiceDTO> getInvoices(
            @RequestParam String phoneNumber,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending,
            @RequestParam(defaultValue = "false") String type,
            @RequestParam(defaultValue = "false") String status
    ) {
        return invoiceService.getInvoices(phoneNumber, page, size, sortBy, descending, type, status);
    }

    @GetMapping("/invoice-details")
    public List<StoreInvoiceDetailDTO> getInvoiceDetails(@RequestParam String invoiceId) {
        return invoiceDetailService.getInvoiceDetailsByInvoice(invoiceId);
    }

    @GetMapping("/stores")
    public Page<StoreInfoDTO> getStores(
            @RequestParam String storeName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending
    ) {
        return storeService.getStores(storeName, page, size, sortBy, descending);
    }

    @GetMapping("/products")
    public Page<StoreProductDTO> getProducts(
            @RequestParam String productName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending
    ) {
        return productService.getProducts(productName, page, size, sortBy, descending);
    }

    @GetMapping("/employees")
    public Page<StoreEmployeeDTO> getEmployees(
            @RequestParam(defaultValue = "") String employeeName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "employeeID") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending,
            @RequestParam(defaultValue = "all") String gender
    ) {
        return employeeService.getEmployees(employeeName, page, size, sortBy, descending, gender);
    }
    @GetMapping("/statistics")
    public Page<StoreStatisticDTO> getStatistics(
            @RequestParam String storeName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "false") boolean descending
    ) {
        return statisticsService.getStatistics(storeName, page, size, sortBy, descending);
    }
}
