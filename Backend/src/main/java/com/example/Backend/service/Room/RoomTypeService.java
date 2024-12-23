package com.example.Backend.service.Room;

import com.example.Backend.dto.request.Room.RoomTypeRequest;
import com.example.Backend.dto.response.Room.RoomTypeResponse;
import com.example.Backend.entity.Room.RoomType;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.mapper.Room.RoomTypeMapper;
import com.example.Backend.repository.Room.RoomTypeRepository;
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
public class RoomTypeService {
    RoomTypeRepository roomTypeRepository;
    RoomTypeMapper roomTypeMapper;

    @PreAuthorize("hasRole('MANAGER')")
    public RoomTypeResponse createRoomType(RoomTypeRequest request) {
        RoomType roomType = roomTypeMapper.toRoomType(request);
        RoomType savedRoomType = roomTypeRepository.save(roomType);
        return roomTypeMapper.toRoomTypeResponse(savedRoomType);
    }

    public List<RoomTypeResponse> getRoomTypesAll() {
        List<RoomType> roomTypes = roomTypeRepository.findAll();
        return roomTypes.stream()
                .map(roomTypeMapper::toRoomTypeResponse)
                .toList();
    }

    @PreAuthorize("hasRole('MANAGER')")
    public void deleteRoomType(String id) {
        // Xóa RoomType theo ID
        roomTypeRepository.deleteById(id);
    }

    public RoomTypeResponse getRoomTypeById(String id) {
        return roomTypeMapper.toRoomTypeResponse(roomTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    @PreAuthorize("hasRole('MANAGER')")
    public RoomTypeResponse updateRoomType(String id, RoomTypeRequest request) {
        RoomType existingRoomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        existingRoomType.setDetail(request.getDetail());
        existingRoomType.setPrice(request.getPrice());
        existingRoomType.setName(request.getName());
        existingRoomType.setMaxOfPeople(request.getMaxOfPeople());
        existingRoomType.setImage(request.getImage());

        RoomType updatedRoomType = roomTypeRepository.save(existingRoomType);
        return roomTypeMapper.toRoomTypeResponse(updatedRoomType);
    }
}