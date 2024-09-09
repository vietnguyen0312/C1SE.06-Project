package com.example.Backend.mapper.Room;

import com.example.Backend.dto.request.Room.RoomCreationRequest;
import com.example.Backend.dto.request.Room.RoomUpdateRequest;
import com.example.Backend.dto.response.Room.RoomResponse;
import com.example.Backend.entity.Room.Room;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    void updateRoom(@MappingTarget Room room, RoomUpdateRequest request);

    Room toRoom(RoomCreationRequest request);

    RoomResponse toRoomResponse(Room room);
}
