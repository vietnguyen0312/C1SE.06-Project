package com.example.Backend.mapper.Rating;

import com.example.Backend.dto.request.Rating.RateRoomCreationRequest;
import com.example.Backend.dto.request.Rating.RateRoomUpdateRequest;
import com.example.Backend.dto.response.Rating.RateRoomResponse;
import com.example.Backend.entity.Rating.RateRoom;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RateRoomMapper {

    RateRoomResponse toRateRoomResponse(RateRoom rateRoom);

    RateRoom toRateRoom(RateRoomCreationRequest rateRoomCreationRequest);

    void updateRateRoom(@MappingTarget RateRoom rateRoom, RateRoomUpdateRequest rateRoomUpdateRequest);
}
