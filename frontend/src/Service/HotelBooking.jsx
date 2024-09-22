import React, { Component } from 'react';
import '../Style/hotel.css';
import axios from '../Configuration/AxiosConfig';
import LoadingIcons from 'react-loading-icons'; // Optional loading indicator

export class HotelBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomTypes: [],
            loading: true,
            formData: {
                name: '',
                email: '',
                checkIn: '',
                checkOut: '',
                roomType: ''
            },
            selectedRoom: null,
            isModalOpen: false
        };
    }

    getHotelBooking = async () => {
        try {
            let response = await axios.get('/room_type');
            console.log(response);
            console.log("111111đã vô vòng lặp ------------------------------------------------------")
            // Kiểm tra cấu trúc dữ liệu và mã trả về
            if (response) {
                this.setState({ roomTypes: response.result, loading: false });
                console.log("đã vô vòng lặp ------------------------------------------------------");
                // In ra thông tin của roomTypes dưới dạng text
                response.result.forEach(room => {
                    console.log(`Room ID: ${room.id}, Name: ${room.name}, Price: ${room.price.toLocaleString()} VND`);
                });
            } else {
                throw new Error("Invalid response structure or code");
            }
        } catch (error) {
            console.error("Error fetching room types:", error);
            this.setState({ loading: false, roomTypes: [] }); // Thiết lập roomTypes thành mảng rỗng nếu có lỗi
        }
    };




    componentDidMount() {
        this.getHotelBooking();
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            }
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // Logic để xử lý gửi form
        console.log('Form submitted:', this.state.formData);
    };
    setSelectedRoom = (room) => {
        this.setState({ selectedRoom: room, isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    render() {

        return (

            <div className="room-booking-container">
                {this.state.loading ? (
                    <div className="loading-container">
                        <LoadingIcons.TailSpin stroke="#000" />
                    </div>
                ) : (
                    <>
                        <div className="booking-form">
                            <h2>Book Your Stay</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={this.state.formData.name}
                                            onChange={this.handleInputChange}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <div className="input-container">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={this.state.formData.email}
                                            onChange={this.handleInputChange}
                                            placeholder="johndoe@gmail.com"
                                            required
                                            list="email-suggestions"
                                        />
                                        <datalist id="email-suggestions">
                                            <option value="@gmail.com" />
                                            <option value="@yahoo.com" />
                                            <option value="@hotmail.com" />
                                            <option value="@outlook.com" />
                                        </datalist>
                                    </div>
                                </div>
                                <div className="date-picker">
                                    <div className="form-group">
                                        <label htmlFor="checkIn">Check-in Date</label>
                                        <div className="input-container">
                                            <input
                                                type="date"
                                                id="checkIn"
                                                name="checkIn"
                                                value={this.state.formData.checkIn}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="checkOut">Check-out Date</label>
                                        <div className="input-container">
                                            <input
                                                type="date"
                                                id="checkOut"
                                                name="checkOut"
                                                value={this.state.formData.checkOut}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="roomType">Room Type</label>
                                    <div className="input-container">
                                        <select
                                            id="roomType"
                                            name="roomType"
                                            value={this.state.formData.roomType}
                                            onChange={this.handleInputChange}
                                            required
                                        >
                                            <option value="">Select a room type</option>
                                            {this.state.roomTypes.map((room) => (
                                                <option key={room.id} value={room.id}>
                                                    {room.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit">Book Now</button>
                            </form>
                        </div>

                        <div className="available-rooms">
                            <h3>Available Room Types</h3>
                            {this.state.roomTypes.map((room) => (
                                <div key={room.id} className="room-card" onClick={() => this.setSelectedRoom(room)}>
                                    <img src={`/img/room_type/${room.image}`} alt={room.name} />
                                    <div className="room-info">
                                        <h4>{room.name}</h4>
                                        <p>{room.detail}</p>
                                        <p>Price: {room.price.toLocaleString()} VND</p>
                                        <p>Max Occupancy: {room.maxOfPeople} people</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {this.state.isModalOpen && this.state.selectedRoom && (
                            <div className="modal-backdrop fade show" onClick={this.closeModal}>
                                <div className="modal custom-modal fade show" style={{ display: 'block' }} onClick={e => e.stopPropagation()}>
                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3>{this.state.selectedRoom.name}</h3>
                                                <button type="button" className="close" onClick={this.closeModal}>
                                                    &times;
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <img src={`/img/room_type/${this.state.selectedRoom.image}`} alt={this.state.selectedRoom.name} className="img-fluid" />
                                                <p><strong>Details:</strong> {this.state.selectedRoom.detail}</p>
                                                <p><strong>Price:</strong> {this.state.selectedRoom.price.toLocaleString()} VND</p>
                                                <p><strong>Max Occupancy:</strong> {this.state.selectedRoom.maxOfPeople} people</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }

}

export default HotelBooking;
