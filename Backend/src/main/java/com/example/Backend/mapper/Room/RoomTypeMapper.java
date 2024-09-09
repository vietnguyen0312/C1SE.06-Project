package com.example.Backend.mapper.Room;

import com.example.Backend.dto.request.Room.RoomTypeRequest;
import com.example.Backend.dto.response.Room.RoomTypeResponse;
import com.example.Backend.entity.Room.RoomType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomTypeMapper {
    RoomTypeResponse toRoomTypeResponse(RoomType roomType);

    RoomType toRoomType(RoomTypeRequest roomTypeRequest);
}
