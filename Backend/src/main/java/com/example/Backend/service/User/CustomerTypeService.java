package com.example.Backend.service.User;

import com.example.Backend.dto.request.User.CustomerTypeRequest;
import com.example.Backend.dto.response.User.CustomerTypeResponse;
import com.example.Backend.entity.User.CustomerType;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.User.CustomerTypeMapper;
import com.example.Backend.repository.User.CustomerTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CustomerTypeService {
    CustomerTypeRepository customerTypeRepository;
    CustomerTypeMapper customerTypeMapper;

    @PreAuthorize("hasRole('MANAGER')")
    public CustomerTypeResponse createCustomerType(CustomerTypeRequest request) {
        if (customerTypeRepository.existsByName(request.getName()))
            throw new AppException(ErrorCode.EXISTED);

        CustomerType customerType = customerTypeMapper.toCustomerType(request);
        return customerTypeMapper.toCustomerTypeResponse(customerTypeRepository.save(customerType));
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<CustomerType> getAllCustomerTypes() {
        return customerTypeRepository.findAll();
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public CustomerTypeResponse getCustomerTypeById(String id) {
        return customerTypeMapper.toCustomerTypeResponse(customerTypeRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }
}
