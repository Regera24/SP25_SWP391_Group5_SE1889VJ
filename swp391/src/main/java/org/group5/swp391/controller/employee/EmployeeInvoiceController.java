package org.group5.swp391.controller.employee;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.group5.swp391.config.RabbitMqConfig;
import org.group5.swp391.dto.employee.EmployeeInvoiceDTO;
import org.group5.swp391.dto.employee.InvoiceRequest.InvoiceDTO;
import org.group5.swp391.dto.employee.InvoiceRequest.InvoiceRequest;
import org.group5.swp391.service.impl.InvoiceServiceImpl;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/employee")
@RequiredArgsConstructor
public class EmployeeInvoiceController {
    private final InvoiceServiceImpl invoiceService;
    private final RabbitTemplate rabbitTemplate;

    @GetMapping("/invoices")
    public Page<InvoiceDTO> getEmployeeInvoices (@RequestParam("page") int page,
                                                 @RequestParam("size") int size,
                                                 @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt")String sortBy,
                                                 @RequestParam(value = "sortOrder", required = false, defaultValue = "false")boolean sortOrder,
                                                 @RequestParam(value = "phonesearch", required = false, defaultValue = "") String phonesearch ) {
        return invoiceService.getInvoicesForEmployee(phonesearch,page,size,sortBy,sortOrder);
    }

    @PostMapping("/invoice/invoice-create")
    public ResponseEntity<String> createInvoice(@RequestBody InvoiceRequest invoiceRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            log.info("controller"+authentication.getName());
            invoiceRequest.setEmployeeUsername(authentication.getName());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn chưa đăng nhập!");
        }
        rabbitTemplate.convertAndSend(RabbitMqConfig.EXCHANGE_NAME2,RabbitMqConfig.ROUTING_KEY2,invoiceRequest);
        return ResponseEntity.ok("Yêu cầu tạo hóa đơn đã được gửi vào queue!");
    }




}
