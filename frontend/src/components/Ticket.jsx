import React, { useEffect, useState } from 'react';
import { InputNumber } from "antd";
import { Checkbox } from "antd";
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import debounce from 'lodash/debounce';
import ButtonCPN from '../components/Button/Button';
import axios from '../Configuration/AxiosConfig';
import { CloseOutlined } from '@ant-design/icons';
import { getRoles } from '../Service/Login';
import { v4 as uuidv4 } from 'uuid';

const TicketContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  height: auto;
  padding: 20px 100px;
  user-select: none;  
  outline: none;
`;


const TicketList = styled.div`
  display: flex;
  width: 73%;
  border-radius: 10px;
`;
const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 200px;
  margin: 20px 0 0 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  user-select: none;
  &:focus {
    outline: none;
  }
`;

const SearchContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  margin-right: 10px;
  user-select: none;
  width: 28%;
`;

const ContainerTicket = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  width: 72%;
  height: 100%;
`;

const ServiceImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const ServiceName = styled.div`
`;

const ServiceType = styled.div`
  color: #bebebe;
`;

const ServiceContainer = styled.div`
  display: flex;
  gap: 30px;
  margin: 50px 50px 0 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
  border-radius: 4px;
`;

const ContentTicket = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  gap: 10px;
  user-select: none;  
  outline: none;
`;
const ContentTicket1 = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  gap: 10px;
  user-select: none;  
  outline: none;
  background-image: url('../../img/ticket/Ogai.png');
  background-size: cover;
  background-position: center;
  height: auto;
  width: 300px;
`;

const Soluong = styled(InputNumber)`
  width: 100px;
`;

const SelectTypeService = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 50px 30px 0 30px;
`;

const CheckboxContainer = styled(Checkbox)`
  width: 165px;
  white-space: nowrap;
`;

const SearchDropdown = styled.div`
  position: absolute;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 200px;
  margin-left: 20px;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 4px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0; 
  }
`;

export const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top: 79px;
`;


const CartItems = styled.div`
  background-color: #fff;
  width: 27%;
  margin-left: 10px;
  border-radius: 10px;
`;

const RemoveIcon = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  cursor: pointer;
  display: none;
  display: inline-block;

  background-color: #ffffff;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TicketItem = styled.div`
  margin-bottom: 10px;
  border-bottom: 2px solid #f8b600;
  padding-bottom: 10px;
  position: relative;

  &:hover .remove-icon {
    display: inline-block;
  }
`;

const Ticket = ({ style }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showService, setShowService] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [ticketStates, setTicketStates] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isUpdateCart, setIsUpdateCart] = useState(true);
    const [isEmployee, setIsEmployee] = useState(false);
    const [nameCustomer, setNameCustomer] = useState('');
    const [phoneCustomer, setPhoneCustomer] = useState('');
    const [filteredCustomer, setFilteredCustomer] = useState([]);
    const [showModalPaymentChoice, setShowModalPaymentChoice] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const roles = getRoles(token);
        setIsEmployee(roles.includes('EMPLOYEE'));
    }, []);

    useEffect(() => {
        if (selectedTicket) {
            setTicketStates(selectedTicket.value.map((ticketValue) => ({ checked: false, quantity: 1, price: ticketValue.price, id: ticketValue.id })));
        }
    }, [selectedTicket]);

    useEffect(() => {
        const total = ticketStates.reduce((acc, state, index) => {
            if (state.checked) {
                return acc + (selectedTicket.value[index].price * state.quantity);
            }
            return acc;
        }, 0);
        setTotalPrice(total);
    }, [ticketStates, selectedTicket]);

    const handleSelectedTicketType = (index, checked) => {
        const newTicketStates = [...ticketStates];
        newTicketStates[index].checked = checked;
        setTicketStates(newTicketStates);
    };

    const handleQuantityChange = (index, quantity) => {
        const newTicketStates = [...ticketStates];
        newTicketStates[index].quantity = quantity;
        setTicketStates(newTicketStates);
    };

    const isAnyTicketSelected = ticketStates.some(state => state.checked);

    useEffect(() => {
        const fetchTickets = async () => {
            if (selectedService) {
                const response = await axios.get(`/tickets/getByIdService/${selectedService.id}`);
                setSelectedTicket(response.result);

                setSearchTerm('');
                setFilteredTickets([]);

                setShowService(false);

                setTimeout(() => {
                    setShowService(true);
                    AOS.refresh();
                }, 0);
            }
        };

        fetchTickets();
    }, [selectedService]);

    const handleSearchCustomer = async (name, phoneNumber) => {
        let searchByName = [];
        let searchByPhoneNumber = [];

        if (name !== '') {
            const responseByName = await axios.get('/users', { params: { search: name.toLowerCase() } });
            searchByName = responseByName.result.data;
        }

        if (phoneNumber !== '') {
            const responseByPhoneNumber = await axios.get('/users', { params: { search: phoneNumber.toLowerCase() } });
            searchByPhoneNumber = responseByPhoneNumber.result.data;
        }

        if (name === '' && phoneNumber !== '') {
            setFilteredCustomer(searchByPhoneNumber);
        } else if (phoneNumber === '' && name !== '') {
            setFilteredCustomer(searchByName);
        } else {
            const combinedResults = searchByName.filter(nameItem => 
                searchByPhoneNumber.some(phoneItem => phoneItem.id === nameItem.id)
            );
            setFilteredCustomer(combinedResults);
        }
    };

    useEffect(() => {
        const debounceSearchCustomer = debounce(() => {
            handleSearchCustomer(nameCustomer, phoneCustomer);
        }, 700);

        debounceSearchCustomer();

        return () => {
            debounceSearchCustomer.cancel();
        };
    }, [nameCustomer, phoneCustomer]);

    const handleSearch = async (searchValue) => {
        if (searchValue === '') {
            setFilteredTickets([]);
        } else {
            const response = await axios.get('/tickets', { params: { search: searchValue.toLowerCase() } });
            setFilteredTickets(response.result);
        }
    };

    useEffect(() => {
        const debounceSearch = debounce(() => {
            handleSearch(searchTerm);
        }, 700);

        debounceSearch();

        return () => {
            debounceSearch.cancel();
        };
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    useEffect(() => {
        if (isUpdateCart) {
            const fetchCartItems = async () => {
                const response = await axios.get('/cart-items');
                setCartItems(response.result);
                setIsUpdateCart(false); // Đặt lại isUpdateCart để tránh gọi API liên tục
            };

            fetchCartItems();
        }
    }, [isUpdateCart]);

    const handleBooking = async () => {
        const cartItemsRequests = ticketStates.filter(item => item.checked).map(item => ({
            idTicket: item.id,
            quantity: item.quantity,
            total: item.price * item.quantity
        }));

        // Gửi yêu cầu đến API cho mỗi mục được chọn
        await Promise.all(cartItemsRequests.map(item => axios.post('/cart-items', item)));

        setIsUpdateCart(true);
    }

    const handleRemoveTicket = async (cartItemId) => {
        await axios.delete(`/cart-items/${cartItemId}`);
        setIsUpdateCart(true);

    };

    const handlePayment = async (paymentMethod) => {
        const total = cartItems.reduce((acc, cartItem) => acc + cartItem.value.reduce((acc, ticketBooking) => acc + ticketBooking.total, 0), 0);

        let bill;
        if(isEmployee == true){
            if(selectedCustomer){
                bill = await axios.post('/bill-ticket', { total: total, user: selectedCustomer });
            } else {
                const email = nameCustomer.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '') + '-' + uuidv4() + '@gmail.com';
                const customer = await axios.post('/users', { username: nameCustomer,
                     phoneNumber: phoneCustomer, password: phoneCustomer, email: email });
                bill = await axios.post('/bill-ticket', { total: total, user: customer.result });
            }
        } else {
            bill = await axios.post('/bill-ticket', { total: total });
        }

        cartItems.forEach(cartItem => {
            cartItem.value.forEach(ticketBooking => {
                axios.post('/bill-ticket-detail', { 
                    idBillTicket: bill.result.id,
                    idTicket: ticketBooking.ticket.id,
                    quantity: ticketBooking.quantity, 
                    total: ticketBooking.total
                });
            });
        });

        cartItems.forEach(cartItem => {
            cartItem.value.forEach(ticketBooking => {
                axios.delete(`/cart-items/${ticketBooking.id}`);
            });
        });
        setCartItems([]);

        let paymentUrl;
        if(paymentMethod == "tiền mặt"){
            paymentUrl = "http://localhost:3000/checkout?vnp_OrderInfo=m" + bill.result.id;
        } else if(paymentMethod == "chuyển khoản"){
            const res = await axios.get('/payment/vn-pay', {
                params: { 
                  amount: total, 
                  orderInfo: `t${bill.result.id}`
                } 
              });
              paymentUrl = res.result;
        }
        
        if(paymentUrl){
            window.location.href = paymentUrl;
        }
    }
    return (
        <>
            <TicketContainer style={style}>
                <TicketList>
                    <SearchContainer>
                        <SearchInput
                            placeholder="Tìm kiếm vé"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {filteredTickets.length > 0 && (
                            <SearchDropdown>
                                {filteredTickets.map((ticket, index) => (
                                    <DropdownItem key={index} onClick={() => setSelectedService(ticket.key)}>
                                        <ServiceImg src={`${ticket.key.image}`} alt={ticket.key.name} style={{ width: '60px', height: '60px' }} />
                                        <div style={{ marginLeft: '10px' }}>
                                            <ServiceName>{ticket.key.name}</ServiceName>
                                            <ServiceType>{ticket.key.serviceType.name}</ServiceType>
                                        </div>
                                    </DropdownItem>
                                ))}
                            </SearchDropdown>
                        )}
                    </SearchContainer>

                    <ContainerTicket>
                        {isEmployee === true && (
                            <>
                                <div style={{ marginTop: '20px' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px',
                                            border: '1px solid #ccc',
                                            padding: '15px',
                                            borderRadius: '10px',
                                            maxWidth: '100%',
                                            margin: '0 auto',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
                                                Họ và Tên:
                                            </label>
                                            <input
                                                value={nameCustomer}
                                                onChange={(e) => setNameCustomer(e.target.value)}
                                                type="text"
                                                placeholder="Nhập họ và tên"
                                                style={{
                                                    padding: '8px',
                                                    fontSize: '14px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '5px',
                                                    minWidth: '150px',
                                                }}
                                                disabled={selectedCustomer !== null}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
                                                Số điện thoại:
                                            </label>
                                            <input
                                                value={phoneCustomer}
                                                onChange={(e) => setPhoneCustomer(e.target.value)}
                                                type="text"
                                                placeholder="Nhập số điện thoại"
                                                style={{
                                                    padding: '8px',
                                                    fontSize: '14px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '5px',
                                                    minWidth: '150px',
                                                }}
                                                disabled={selectedCustomer !== null}
                                            />
                                        </div>
                                        <div>
                                            <ButtonCPN
                                                text='Reset'
                                                style={{ marginTop: '20px', width: '150px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                onClick={() => {
                                                    setSelectedCustomer(null);
                                                    setNameCustomer('');
                                                    setPhoneCustomer('');
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {filteredCustomer.length > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <SearchDropdown style={{ width: '300px' }}>
                                                {filteredCustomer.map((customer, index) => (
                                                    <DropdownItem key={index} onClick={() => {
                                                        setSelectedCustomer(customer);
                                                        setNameCustomer(customer.username);
                                                        setPhoneCustomer(customer.phoneNumber);
                                                        setFilteredCustomer([]);
                                                    }}>
                                                        <ServiceImg src={`${customer.avatar}`} style={{ width: '60px', height: '60px' }} />
                                                        <div style={{ marginLeft: '10px' }}>
                                                            <ServiceName>{customer.username}</ServiceName>
                                                            <ServiceType>{customer.phoneNumber}</ServiceType>
                                                        </div>
                                                    </DropdownItem>
                                                ))}
                                            </SearchDropdown>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {selectedTicket && showService ? (
                            <>
                                <ServiceContainer data-aos="fade-in">
                                    <ServiceImg src={`${selectedTicket.key.image}`} />
                                    <ContentTicket>
                                        <ServiceName>Tên dịch vụ: {selectedTicket.key.name}</ServiceName>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            Loại dịch vụ: <ServiceType>{selectedTicket.key.serviceType.name}</ServiceType>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', borderRadius: '10px', padding: '10px', }}>
                                                Giá vé
                                            </div>
                                            <div style={{ display: 'table', width: '100%', borderCollapse: 'collapse' }}>
                                                {selectedTicket.value.map((ticketValue) => (
                                                    <div key={ticketValue.id} style={{ display: 'table-row', borderBottom: '1px solid #ddd' }}>
                                                        <div style={{ display: 'table-cell', width: '50%', textAlign: 'right', padding: '8px', whiteSpace: 'nowrap', borderRight: '1px solid #ddd' }}>
                                                            {ticketValue.ticketType.name}
                                                        </div>
                                                        <div style={{ display: 'table-cell', width: '50%', textAlign: 'left', padding: '8px' }}>
                                                            {ticketValue.price.toLocaleString()} VND
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </ContentTicket>
                                </ServiceContainer>
                            </>
                        ) : (
                            <div>
                                <ContentTicket1 style={{ textAlign: 'center', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                </ContentTicket1>
                            </div>
                        )}
                        <SelectTypeService>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {selectedTicket && selectedTicket.value.map((ticketValue, index) => (
                                    <div key={ticketValue.id}>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <CheckboxContainer
                                                checked={ticketStates[index]?.checked}
                                                onChange={(e) => handleSelectedTicketType(index, e.target.checked)}
                                                disabled={ticketValue.quantity === 0}
                                            >
                                                {ticketValue.ticketType.name}
                                            </CheckboxContainer> {ticketValue.quantity === 0 ? <div style={{ color: 'red' }}>Hết vé</div> : null}
                                            <div>Số lượng vé: <Soluong
                                                min={1}
                                                max={ticketValue.quantity}
                                                value={ticketStates[index]?.quantity}
                                                onChange={(value) => handleQuantityChange(index, value)}
                                                disabled={!ticketStates[index]?.checked}
                                            /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', marginTop: '30px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                                <div style={{ color: 'red' }}>
                                    Giá: {totalPrice.toLocaleString()} VND
                                </div>
                                <ButtonCPN
                                    text='Đặt vé'
                                    style={{ width: '140px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    onClick={handleBooking}
                                    disabled={!isAnyTicketSelected}
                                />
                            </div>
                        </SelectTypeService>
                    </ContainerTicket>
                </TicketList>
                <CartItems>
                    {cartItems.length > 0 ? (
                        <div style={{ padding: '20px' }}>
                            <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc', borderRadius: '10px', padding: '10px' }}>
                                Vé đã đặt
                            </p>
                            <div style={{ maxHeight: '400px', overflowY: 'auto', borderRadius: '10px', padding: '10px', cursor: 'pointer' }}>
                                {cartItems.map((cartItem) => (
                                    <TicketItem key={cartItem.id}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img
                                                src={`${cartItem.key.image}`}
                                                alt={cartItem.key.name}
                                                style={{ width: '50px', height: '50px', borderRadius: '5px' }}
                                                onClick={() => setSelectedService(cartItem.key)}
                                            />
                                            <div style={{width: '100%'}}>
                                                <div style={{ fontWeight: 'bold' }}>{cartItem.key.name}</div>
                                                {cartItem.value.map((ticketBooking, idx) => (
                                                    <div key={idx} style={{ borderTop: '1px solid #ccc', paddingTop: '10px', position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                                                        <div>
                                                            <div>Vé: {ticketBooking.ticket.ticketType.name}</div>
                                                            <div>Số lượng: {ticketBooking.quantity}</div>
                                                            <div style={{ color: 'red' }}>Giá: {(ticketBooking.total).toLocaleString()} VND</div>
                                                        </div>
                                                        <div style={{ borderRadius: '10px', padding: '5px', cursor: 'pointer', marginLeft: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <RemoveIcon
                                                                onClick={() => handleRemoveTicket(ticketBooking.id)}
                                                                className="remove-icon"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TicketItem>
                                ))}
                            </div>

                            <div style={{ marginTop: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Tổng giá: {cartItems.reduce((acc, cartItem) => acc + cartItem.value.reduce((acc, ticketBooking) => acc + ticketBooking.total, 0), 0).toLocaleString()} VND
                            </div>
                            <ButtonCPN
                                text='Thanh toán'
                                style={{ width: '100%', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}
                                onClick={() => {
                                    if(isEmployee == true){
                                        if(phoneCustomer.length !== 10){
                                            alert('Số điện thoại không đúng');
                                            return;
                                        }
                                        setShowModalPaymentChoice(true);
                                    } else {
                                        handlePayment("chuyển khoản");
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <p>Chưa có vé nào được đặt.</p>
                        </div>
                    )}
                </CartItems>
                {showModalPaymentChoice && (
                    <div
                        onClick={() => setShowModalPaymentChoice(false)}
                        style={{
                            position: "fixed",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: "white",
                                padding: "20px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                borderRadius: "8px",
                                textAlign: "center",
                            }}
                        >
                            <p>Bạn muốn thanh toán bằng tiền mặt hay chuyển khoản?</p>
                            <button
                                onClick={() => handlePayment("tiền mặt")}
                                style={{ margin: "10px", backgroundColor: "#f8b600", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
                            >
                                Tiền mặt
                            </button>
                            <button
                                onClick={() => handlePayment("chuyển khoản")}
                                style={{ margin: "10px", backgroundColor: "#f8b600", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
                            >
                                Chuyển khoản
                            </button>
                        </div>
                    </div>
                )}
            </TicketContainer>
        </>
    )
}

export default Ticket;