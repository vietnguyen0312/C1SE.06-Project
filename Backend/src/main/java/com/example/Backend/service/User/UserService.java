package com.example.Backend.service.User;

import com.example.Backend.dto.request.User.UserChangePasswordRequest;
import com.example.Backend.dto.request.User.UserCreationRequest;
import com.example.Backend.dto.request.User.UserUpdateRequest;
import com.example.Backend.dto.response.User.UserResponse;
import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.User.Role;
import com.example.Backend.entity.User.User;
import com.example.Backend.enums.CustomerTypeEnum;
import com.example.Backend.enums.RoleEnum;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.User.UserMapper;
import com.example.Backend.repository.Cart.CartRepository;
import com.example.Backend.repository.User.CustomerTypeRepository;
import com.example.Backend.repository.User.RoleRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    RoleRepository roleRepository;
    UserRepository userRepository;
    CartRepository cartRepository;
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
            cartRepository.save(Cart.builder()
                    .user(user)
                    .build());

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
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    public UserResponse getUser(String id) {
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
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

        if (StringUtils.hasLength(user.getPassword()))
            user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

}
