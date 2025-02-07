package org.group5.swp391.Service.Impl;

import org.group5.swp391.Converter.InvoiceConverter;
import org.group5.swp391.DTO.StoreOwner.InvoiceDTO;
import org.group5.swp391.Repository.InvoiceRepository;
import org.group5.swp391.Service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    InvoiceConverter invoiceConverter;
    @Autowired
    InvoiceRepository invoiceRepository;

    @Override
    public List<InvoiceDTO> getInvoices(int page, int size, String sortBy, boolean descending) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return invoiceRepository.findAll(pageable).stream().map(invoiceConverter::toInvoiceDTO).collect(Collectors.toList());
    }
}
