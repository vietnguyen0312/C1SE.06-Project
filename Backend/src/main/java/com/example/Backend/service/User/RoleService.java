package com.example.Backend.service.User;

import com.example.Backend.dto.request.User.RoleRequest;
import com.example.Backend.dto.response.User.RoleResponse;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.User.RoleMapper;
import com.example.Backend.repository.User.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    RoleMapper roleMapper;

    @PreAuthorize("hasRole('MANAGER')")
    public RoleResponse create(RoleRequest request) {
        if (roleRepository.findById(request.getName()).isPresent())
            throw new AppException(ErrorCode.EXISTED);

        var role = roleMapper.toRole(request);

        return roleMapper.toRoleResponse(roleRepository.save(role));
    }

    @PreAuthorize("hasRole('MANAGER')")
    public List<RoleResponse> getAll() {
        return roleRepository.findAll()
                .stream()
                .map(roleMapper::toRoleResponse)
                .toList();
    }
}
