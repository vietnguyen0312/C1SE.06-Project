package com.example.Backend.mapper.User;


import com.example.Backend.dto.request.User.UserCreationRequest;
import com.example.Backend.dto.request.User.UserUpdateRequest;
import com.example.Backend.dto.response.User.UserResponse;
import com.example.Backend.entity.User.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);

    UserResponse toUserResponse(User user);
}
