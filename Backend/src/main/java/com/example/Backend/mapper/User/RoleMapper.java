package com.example.Backend.mapper.User;

import com.example.Backend.dto.request.User.RoleRequest;
import com.example.Backend.dto.response.User.RoleResponse;
import com.example.Backend.entity.User.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
