package org.group5.swp391.service;

import org.group5.swp391.dto.employee.InvoiceRequest.InvoiceDTO;
import org.group5.swp391.dto.employee.InvoiceRequest.InvoiceRequest;
import org.group5.swp391.dto.store_owner.all_invoice.StoreInvoiceDTO;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public interface InvoiceService {
    public Page<StoreInvoiceDTO> getInvoices(String phoneNumber, int page, int size, String sortBy, boolean descending, String typeStr, String statusStr);
    public void CreateInvoice(InvoiceRequest invoiceRequest);
    public Page<InvoiceDTO>getInvoicesForEmployee(String phoneNumber, String name, int page, int size,
                                                  String sortBy, boolean descending,
                                                  Long minAmount,
                                                  Long maxAmount, Long minShipping, Long maxShipping,
                                                  LocalDateTime startDate, LocalDateTime endDate);

}