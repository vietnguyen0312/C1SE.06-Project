package com.example.Backend.mapper.User;

import com.example.Backend.dto.request.User.CustomerTypeRequest;
import com.example.Backend.dto.response.User.CustomerTypeResponse;
import com.example.Backend.entity.User.CustomerType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerTypeMapper {
    CustomerType toCustomerType(CustomerTypeRequest request);

    CustomerTypeResponse toCustomerTypeResponse(CustomerType customerType);
}
