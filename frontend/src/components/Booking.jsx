import React from 'react'
import BookingRoom from '../Service/BookingRoom'
import { useLocation } from 'react-router-dom'


const Booking = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const roomTypeId = searchParams.get('roomTypeId');
    return (
        <>
            <section >
                <BookingRoom roomTypeId={roomTypeId} />
            </section>
        </>
    )
}

export default Booking
