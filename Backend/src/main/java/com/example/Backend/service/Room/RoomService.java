package com.example.Backend.service.Room;

import com.example.Backend.dto.request.Room.RoomCreationRequest;

import com.example.Backend.dto.request.Room.RoomUpdateRequest;
import com.example.Backend.dto.response.Room.RoomResponse;

import com.example.Backend.entity.Room.Room;
import com.example.Backend.entity.Room.RoomType;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Room.RoomMapper;
import com.example.Backend.repository.Room.RoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomService {
    RoomRepository roomRepository;
    RoomMapper roomMapper;

    public RoomResponse createRoom(RoomCreationRequest request) {

        Room room = roomMapper.toRoom(request);

        return roomMapper.toRoomResponse(roomRepository.save(room));
    }

    public RoomResponse updateRoom(String id, RoomUpdateRequest request) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        roomMapper.updateRoom(room, request);

        return roomMapper.toRoomResponse(roomRepository.save(room));
    }

    public RoomResponse getRoomById(String id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return roomMapper.toRoomResponse(room);
    }

    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(roomMapper::toRoomResponse)
                .collect(Collectors.toList());
    }

    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }

    public List<RoomResponse> getRoomByRoomType(RoomType RoomType) {
        return roomRepository.findAllByRoomType(RoomType).stream().map(roomMapper::toRoomResponse).toList();
    }

}
