package com.example.Backend.service.Rating;

import com.example.Backend.dto.request.Rating.RateRoomCreationRequest;
import com.example.Backend.dto.request.Rating.RateRoomUpdateRequest;
import com.example.Backend.dto.response.Rating.RateRoomResponse;
import com.example.Backend.entity.Rating.RateRoom;
import com.example.Backend.entity.Room.Room;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Rating.RateRoomMapper;
import com.example.Backend.repository.Rating.RateRoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RateRoomService {
    RateRoomRepository rateRoomRepository;
    RateRoomMapper rateRoomMapper;

    public RateRoomResponse createRateRoom(RateRoomCreationRequest request) {

        RateRoom rateRoom = rateRoomMapper.toRateRoom(request);

        return rateRoomMapper.toRateRoomResponse(rateRoomRepository.save(rateRoom));
    }

    public RateRoomResponse updateRateRoom(String id, RateRoomUpdateRequest request) {
        RateRoom rateRoom = rateRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        rateRoomMapper.updateRateRoom(rateRoom, request);
        return rateRoomMapper.toRateRoomResponse(rateRoomRepository.save(rateRoom));
    }

    public void deleteRateRoom(String id) {
        if (!rateRoomRepository.existsById(id)) {
            throw new AppException(ErrorCode.NOT_EXISTED);
        }
        rateRoomRepository.deleteById(id);
    }

    public List<RateRoomResponse> getRateRoomByRoom(Room room) {
        return rateRoomRepository.findAllByRoom(room).stream().map(rateRoomMapper::toRateRoomResponse).toList();
    }
}
