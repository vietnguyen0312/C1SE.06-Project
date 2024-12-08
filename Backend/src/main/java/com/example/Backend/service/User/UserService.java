package com.example.Backend.service.User;

import com.example.Backend.dto.request.User.UserChangePasswordRequest;
import com.example.Backend.dto.request.User.UserCreationRequest;
import com.example.Backend.dto.request.User.UserUpdateRequest;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.User.UserResponse;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.User.Role;
import com.example.Backend.entity.User.User;
import com.example.Backend.enums.CustomerTypeEnum;
import com.example.Backend.enums.RoleEnum;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.User.UserMapper;
import com.example.Backend.repository.User.CustomerTypeRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserRepository userRepository;
    CustomerTypeRepository customerTypeRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreationRequest request) {

        User user = userMapper.toUser(request);
        user.setCustomerType(customerTypeRepository.findByName(CustomerTypeEnum.BRONZE.getName()));

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<Role> roles = new HashSet<>();
        roles.add(Role.builder()
                .name(RoleEnum.ROLE_CUSTOMER.getName())
                .description(RoleEnum.ROLE_CUSTOMER.getDescription())
                .build());

        user.setRoles(roles);

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.EXISTED);
        }

        return userMapper.toUserResponse(user);
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public PageResponse<UserResponse> getUsers(int page, int size, String search, String role) {
        Sort sort = Sort.by(Sort.Direction.ASC, "username").ascending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Page<User> pageData;

        var priorityRole = getPriorityRole(role.toLowerCase());

        if (StringUtils.hasLength(search))
            pageData = userRepository.findByRoles_SizeAndSearch(priorityRole, search, pageable);
        else
            pageData = userRepository.findByRoles_Size(priorityRole, pageable);
        return PageResponse.<UserResponse>builder()
                .currentPage(page)
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(userMapper::toUserResponse).toList())
                .build();
    }

    private int getPriorityRole(String role) {
        return switch (role) {
            case "employer" -> 4;
            case "manager" -> 3;
            case "employee" -> 2;
            case "customer" -> 1;
            default -> throw new IllegalArgumentException("Invalid role: " + role);
        };
    }


    public UserResponse getUser(String id) {
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public UserResponse getUserByGmail(String email) {
        return userRepository.findByEmail(email)
                .map(userMapper::toUserResponse)
                .orElse(null); // Trả về null nếu không tìm thấy
    }

    @PostAuthorize("returnObject.email == authentication.name or hasRole('MANAGER')")
    public UserResponse updateUser(String id, UserUpdateRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        userMapper.updateUser(user, request);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PostAuthorize("returnObject.email == authentication.name or hasRole('MANAGER')")
    public UserResponse changePassword(String id, UserChangePasswordRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword()))
            throw new AppException(ErrorCode.PASSWORD_INCORRECT);

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        return userMapper.toUserResponse(userRepository.save(user));
    }

}
