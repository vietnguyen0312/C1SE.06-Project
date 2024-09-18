package com.example.Backend.service.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomCreationRequest;
import com.example.Backend.dto.request.Booking.BookingRoomUpdateRequest;
import com.example.Backend.dto.response.Booking.BookingRoomResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.User.User;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Booking.BookingRoomMapper;
import com.example.Backend.repository.Booking.BookingRoomRepository;
import com.example.Backend.repository.User.UserRepository;
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
public class BookingRoomService {
    BookingRoomRepository bookingRoomRepository;
    BookingRoomMapper bookingRoomMapper;
    UserRepository userRepository;

    public BookingRoomResponse createBookingRoom(BookingRoomCreationRequest request) {
        // Tạo đối tượng BookingRoom từ yêu cầu
        BookingRoom bookingRoom = bookingRoomMapper.toBookingRoom(request);

        // Tìm đối tượng User từ ID trong yêu cầu
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        // Thiết lập mối quan hệ cho BookingRoom
        bookingRoom.setUser(user);

        // Lưu BookingRoom vào cơ sở dữ liệu và trả về phản hồi
        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.save(bookingRoom));
    }

    public List<BookingRoomResponse> getBookingRooms() {
        return bookingRoomRepository.findAll().stream().map(bookingRoomMapper::toBookingRoomResponse).toList();
    }

    public BookingRoomResponse getBookingRoom(String id) {
        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public BookingRoomResponse updateBookingRoom(String id, BookingRoomUpdateRequest request) {
        BookingRoom bookingRoom = bookingRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        bookingRoomMapper.updateBookingRoom(bookingRoom, request);

        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.save(bookingRoom));
    }

    public void deleteBookingRoom(String id) {
        bookingRoomRepository.deleteById(id);
    }

    public List<BookingRoomResponse> getBookingRoomsByUser(String userId) {
        // Kiểm tra xem User có tồn tại hay không
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        // Tìm tất cả các BookingRoom có liên kết với User đó
        List<BookingRoom> bookingRooms = bookingRoomRepository.findByUser(user);

        // Chuyển đổi từ danh sách BookingRoom sang BookingRoomResponse
        return bookingRooms.stream()
                .map(bookingRoomMapper::toBookingRoomResponse)
                .toList();
    }
}
