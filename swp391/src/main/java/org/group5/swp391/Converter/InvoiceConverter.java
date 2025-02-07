package org.group5.swp391.Converter;


import lombok.RequiredArgsConstructor;
import org.group5.swp391.DTO.StoreOwner.InvoiceDTO;
import org.group5.swp391.Entity.Invoice;
import org.group5.swp391.Repository.InvoiceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InvoiceConverter {

    private final ModelMapper modelMapper;
    private final InvoiceRepository invoiceRepository;

    public InvoiceDTO toInvoiceDTO(Invoice invoice){
        return modelMapper.map(invoice, InvoiceDTO.class);
    }
}
