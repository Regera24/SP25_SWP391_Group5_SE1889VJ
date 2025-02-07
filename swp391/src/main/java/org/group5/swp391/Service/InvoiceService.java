package org.group5.swp391.Service;

import org.group5.swp391.DTO.StoreOwner.InvoiceDTO;
import org.group5.swp391.Entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InvoiceService {
    public List<InvoiceDTO> getInvoices(int page, int size, String sortBy, boolean descending);

}
