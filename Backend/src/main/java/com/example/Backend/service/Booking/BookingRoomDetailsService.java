package com.example.Backend.service.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomDetailsRequest;
import com.example.Backend.dto.response.Booking.BookingRoomDetailsResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Room.Room;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Booking.BookingRoomDetailsMapper;
import com.example.Backend.repository.Booking.BookingRoomDetailsRepository;
import com.example.Backend.repository.Booking.BookingRoomRepository;
import com.example.Backend.repository.Room.RoomRepository;
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
public class BookingRoomDetailsService {
    BookingRoomDetailsRepository bookingRoomDetailsRepository;
    BookingRoomDetailsMapper bookingRoomDetailsMapper;
    RoomRepository roomRepository;
    BookingRoomRepository bookingRoomRepository;

    public BookingRoomDetailsResponse createBookingRoomDetails(BookingRoomDetailsRequest request) {
        // Tạo đối tượng BookingRoomDetails từ yêu cầu
        BookingRoomDetails bookingRoomDetails = bookingRoomDetailsMapper.toBookingRoomDetails(request);

        // Tìm đối tượng Room từ roomId trong yêu cầu
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        // Tìm đối tượng BookingRoom từ bookingId trong yêu cầu
        BookingRoom bookingRoom = bookingRoomRepository.findById(request.getBookingId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        // Thiết lập mối quan hệ cho BookingRoomDetails
        bookingRoomDetails.setRoom(room);
        bookingRoomDetails.setBookingRoom(bookingRoom);
        bookingRoomDetails.setPrice(request.getPrice());

        // Lưu BookingRoomDetails vào cơ sở dữ liệu và trả về phản hồi
        return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(bookingRoomDetailsRepository.save(bookingRoomDetails));
    }

    public List<BookingRoomDetailsResponse> getAllBookingRoomDetails() {
        List<BookingRoomDetails> bookingRoomDetailsList = bookingRoomDetailsRepository.findAll();
        return bookingRoomDetailsList.stream()
                .map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse)
                .toList();
    }

    public BookingRoomDetailsResponse getBookingRoomDetails(String id) {
        BookingRoomDetails bookingRoomDetails = bookingRoomDetailsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(bookingRoomDetails);
    }

    public void deleteBookingRoomDetails(String id) {
        if (!bookingRoomDetailsRepository.existsById(id)) {
            throw new AppException(ErrorCode.NOT_EXISTED);
        }
        bookingRoomDetailsRepository.deleteById(id);
    }

    public List<BookingRoomDetailsResponse> getBookingRoomDetailsByBookingRoom(String bookingRoomId) {
        // Tìm đối tượng BookingRoom dựa trên bookingRoomId
        BookingRoom bookingRoom = bookingRoomRepository.findById(bookingRoomId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        // Lấy danh sách BookingRoomDetails dựa trên BookingRoom và chuyển đổi nó thành phản hồi
        return bookingRoomDetailsRepository.findAllByBookingRoom(bookingRoom).stream()
                .map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse)
                .toList();
    }


    public BookingRoomDetailsResponse updateBookingRoomDetails(String id, BookingRoomDetailsRequest request) {
        // Tìm đối tượng BookingRoomDetails từ id
        BookingRoomDetails bookingRoomDetails = bookingRoomDetailsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        // Tìm đối tượng Room từ roomId trong request
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        // Tìm đối tượng BookingRoom từ bookingId trong request
        BookingRoom bookingRoom = bookingRoomRepository.findById(request.getBookingId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        // Cập nhật thông tin chi tiết
        bookingRoomDetails.setRoom(room);
        bookingRoomDetails.setBookingRoom(bookingRoom);
        bookingRoomDetails.setPrice(request.getPrice());

        // Lưu lại thông tin đã cập nhật
        BookingRoomDetails updatedBookingRoomDetails = bookingRoomDetailsRepository.save(bookingRoomDetails);

        // Trả về phản hồi đã cập nhật
        return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(updatedBookingRoomDetails);
    }

}
