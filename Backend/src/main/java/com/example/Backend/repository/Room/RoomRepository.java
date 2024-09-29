package com.example.Backend.repository.Room;

import com.example.Backend.entity.Room.Room;
import com.example.Backend.entity.Room.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    List<Room> findAllByRoomType(RoomType RoomType);

    Page<Room> findAllByRoomType(RoomType roomType, Pageable pageable);
}
