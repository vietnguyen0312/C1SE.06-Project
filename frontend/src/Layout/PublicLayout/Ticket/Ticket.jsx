import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { InputNumber, Pagination } from "antd";
import { Checkbox } from "antd";
import ButtonCPN from '../../../components/Button/Button';
import debounce from 'lodash/debounce';
import { CloseOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 9, 30, 0.4);
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top: 79px;
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const LinkNav = styled.p`
  color: white;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Arrow = styled.span`
  margin: 0 10px;
`;

const TicketContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  height: 100vh;
  padding: 30px 13vh 0 13vh;
  user-select: none;  
  outline: none;
`;

const TicketLeft = styled.div`
  display: flex;
  width: 73%;
  border-radius: 10px;
`;

const TicketRight = styled.div`
  background-color: #fff;
  width: 27%;
  margin-left: 10px;
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
  color: #ccc;
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
  background-image: url('../../img/ticket/chiTay.png');
  background-size: cover;
  background-position: center;
  height: 271px;
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
`;

const SearchDropdown = styled.div`
  position: absolute;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 200px;
  margin-left: 20px;
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
const BannerSection2 = styled.section`
background-image: url('/img/ticket/n2.jpg');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 55vh;
display: flex;
align-items: center;
position: relative;
z-index: 1;
user-select: none;
outline: none;

`;
const Ticket = () => {
  const allServices = [
    { img: './img/service/Buffet.jpg', nameService: 'Buffet', typeService: 'Ăn uống', priceService: 100000, availableTickets: ['childUnder1m', 'adult'] },
    { img: './img/service/Camping.png', nameService: 'Camping', typeService: 'Du lịch', priceService: 200000, availableTickets: ['childUnder1m', 'child1to1_3m', 'adult'] },
    { img: './img/service/Concert.jpg', nameService: 'Concert', typeService: 'Sự kiện', priceService: 300000, availableTickets: ['childUnder1m', 'child1to1_3m', 'adult'] },
    { img: './img/service/Trượt thác.jpg', nameService: 'Trượt thác', typeService: 'Vui chơi', priceService: 400000, availableTickets: ['adult'] },
    { img: './img/service/Trượt thác.jpg', nameService: 'Trượt thác', typeService: 'Vui chơi', priceService: 400000, availableTickets: ['adult'] },
    { img: './img/service/Trượt thác.jpg', nameService: 'Trượt thác', typeService: 'Vui chơi', priceService: 400000, availableTickets: ['adult'] },
  ];


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isChildChecked, setIsChildChecked] = useState(false);
  const [isAdultChecked, setIsAdultChecked] = useState(false);
  const [isChildChecked1, setIsChildChecked1] = useState(false);
  const [showService, setShowService] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [childQuantity, setChildQuantity] = useState(1);
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childQuantity1, setChildQuantity1] = useState(1);
  const [selectedTickets, setSelectedTickets] = useState([]);


  useEffect(() => {
    let price = 0;
    if (isChildChecked1 && selectedService) {
      price += (selectedService.priceService * 0) * childQuantity1;
    }
    if (isChildChecked && selectedService) {
      price += (selectedService.priceService * 0.5) * childQuantity;
    }
    if (isAdultChecked && selectedService) {
      price += selectedService.priceService * adultQuantity;
    }
    setTotalPrice(price);
  }, [isChildChecked, isAdultChecked, childQuantity, adultQuantity, selectedService]);


  const handleServiceSelect = (service) => {
    setSelectedService({
      ...service,
      availableTickets: allServices.find(s => s.nameService === service.nameService)?.availableTickets || []
    });
    setSearchTerm(service.nameService);
    setFilteredServices([]);

    setShowService(false);
    setTimeout(() => {
      setShowService(true);
      AOS.refresh();
    }, 100);
  };

  const handleChildCheck = (e) => {
    setIsChildChecked(e.target.checked);
  };

  const handleAdultCheck = (e) => {
    setIsAdultChecked(e.target.checked);
  };

  const handleChildCheck1 = (e) => {
    setIsChildChecked1(e.target.checked);
  };

  const handleSearch = debounce((searchValue) => {
    if (searchValue === '') {
      setFilteredServices([]);
    } else {
      const filtered = allServices.filter(service =>
        service.nameService.toLowerCase().startsWith(searchValue.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, 300);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);


  const handleBooking = () => {
    if (!selectedService) return;

    const existingService = selectedTickets.find(
      (ticket) => ticket.nameService === selectedService.nameService
    );

    const tickets = { ...existingService };

    if (!tickets.nameService) {
      tickets.nameService = selectedService.nameService;
      tickets.img = selectedService.img;
      tickets.types = [];
    }

    if (selectedService.availableTickets.includes('childUnder1m') && isChildChecked1 && childQuantity1 > 0) {
      const childTicket1 = {
        type: 'Trẻ em dưới 1m',
        quantity: childQuantity1,
        price: 0,
      };
      const existingChildTicket1 = tickets.types.find(
        (type) => type.type === childTicket1.type
      );
      if (existingChildTicket1) {
        existingChildTicket1.quantity += childQuantity1;
      } else {
        tickets.types.push(childTicket1);
      }
    }

    if (selectedService.availableTickets.includes('child1to1_3m') && isChildChecked && childQuantity > 0) {
      const childTicket = {
        type: 'Trẻ em từ 1-1,3m',
        quantity: childQuantity,
        price: selectedService.priceService * 0.5,
      };
      const existingChildTicket = tickets.types.find(
        (type) => type.type === childTicket.type
      );
      if (existingChildTicket) {
        existingChildTicket.quantity += childQuantity;
      } else {
        tickets.types.push(childTicket);
      }
    }

    if (selectedService.availableTickets.includes('adult') && isAdultChecked && adultQuantity > 0) {
      const adultTicket = {
        type: 'Người lớn',
        quantity: adultQuantity,
        price: selectedService.priceService,
      };
      const existingAdultTicket = tickets.types.find(
        (type) => type.type === adultTicket.type
      );
      if (existingAdultTicket) {
        existingAdultTicket.quantity += adultQuantity;
      } else {
        tickets.types.push(adultTicket);
      }
    }

    setSelectedTickets((prev) => {
      if (existingService) {
        return prev.map((ticket) =>
          ticket.nameService === selectedService.nameService ? tickets : ticket
        );
      }
      return [...prev, tickets];
    });
  };


  const handleRemoveTicket = (ticketIndex, typeIndex) => {
    setSelectedTickets(prevTickets => {
      const newTickets = [...prevTickets];
      newTickets[ticketIndex].types.splice(typeIndex, 1);

      if (newTickets[ticketIndex].types.length === 0) {
        newTickets.splice(ticketIndex, 1);
      }

      return newTickets;
    });
  };

  return (
    <>
      <BannerSection2>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <Title style={{ fontSize: '25px', fontWeight: 'none' }}>Tận Hưởng Những Trải Nghiệm Tuyệt Vời, Đặt Vé Ngay!</Title>
            </AboutContent>
          </Row>
        </Container>
      </BannerSection2>

      <TicketContainer>
        <TicketLeft>
          <SearchContainer>
            <SearchInput
              placeholder="Tìm kiếm loại vé"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {filteredServices.length > 0 && (
              <SearchDropdown>
                {filteredServices.map((service, index) => (
                  <DropdownItem key={index} onClick={() => handleServiceSelect(service)}>
                    <ServiceImg src={service.img} alt={service.nameService} style={{ width: '60px', height: '60px' }} />
                    <div style={{ marginLeft: '10px' }}>
                      <ServiceName>{service.nameService}</ServiceName>
                      <ServiceType>{service.typeService}</ServiceType>
                    </div>
                  </DropdownItem>
                ))}
              </SearchDropdown>
            )}

          </SearchContainer>
          <ContainerTicket>
            {selectedService && showService ? (
              <ServiceContainer data-aos="fade-in">
                <ServiceImg src={selectedService.img} alt={selectedService.nameService} />
                <ContentTicket>
                  <ServiceName>Tên dịch vụ: {selectedService.nameService}</ServiceName>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    Loại dịch vụ: <ServiceType>{selectedService.typeService}</ServiceType>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', borderRadius: '10px', padding: '10px', }}>
                      Giá vé
                    </div>
                    {selectedService.availableTickets.includes('childUnder1m') && (
                      <div>Trẻ em dưới 1m: free</div>
                    )}
                    {selectedService.availableTickets.includes('child1to1_3m') && (
                      <div>
                        Trẻ em từ 1-1,3m: {(selectedService.priceService * 0.5).toLocaleString()} VND
                      </div>
                    )}
                    {selectedService.availableTickets.includes('adult') && (
                      <div>
                        Người lớn: {selectedService.priceService.toLocaleString()} VND
                      </div>
                    )}
                  </div>
                </ContentTicket>
              </ServiceContainer>
            ) : (
              <div>
                <ContentTicket1 style={{ textAlign: 'center', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '70px' }}>
              </ContentTicket1>
              <div>
                  <p style={{fontSize:'20px',justifyContent:'center',alignItems:'center',display:'flex',color:'black'}}>Vui lòng tìm vé</p>
                </div>
              </div>
              
            )}
            <SelectTypeService>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedService && selectedService.availableTickets.map((ticketType) => {
                  switch (ticketType) {
                    case 'childUnder1m':
                      return (
                        <div key={ticketType}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <CheckboxContainer onChange={handleChildCheck1}>Vé Trẻ em dưới 1m</CheckboxContainer>
                            <div>Số lượng vé: <Soluong min={1} max={10} value={childQuantity1} onChange={setChildQuantity1} disabled={!isChildChecked1} /></div>
                          </div>
                        </div>
                      );
                    case 'child1to1_3m':
                      return (
                        <div key={ticketType}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <CheckboxContainer onChange={handleChildCheck}>Vé Trẻ em từ 1-1,3m</CheckboxContainer>
                            <div>Số lượng vé: <Soluong min={1} max={10} value={childQuantity} onChange={setChildQuantity} disabled={!isChildChecked} /></div>
                          </div>
                        </div>
                      );
                    case 'adult':
                      return (
                        <div key={ticketType}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <CheckboxContainer onChange={handleAdultCheck}>Vé Người lớn</CheckboxContainer>
                            <div>Số lượng vé: <Soluong min={1} max={10} value={adultQuantity} onChange={setAdultQuantity} disabled={!isAdultChecked} /></div>
                          </div>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', marginTop: '30px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                <div style={{ color: 'red' }}>
                  Giá: {totalPrice.toLocaleString()} VND
                </div>
                <ButtonCPN
                  text='Đặt vé'
                  style={{ width: '140px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={handleBooking}
                  disabled={!isChildChecked1 && !isChildChecked && !isAdultChecked}
                />
              </div>
            </SelectTypeService>
          </ContainerTicket>
        </TicketLeft>
        <TicketRight>
          {selectedTickets.length > 0 ? (
            <div style={{ padding: '20px' }}>
              <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc', borderRadius: '10px', padding: '10px' }}>
                Vé đã đặt
              </p>
              <div style={{ maxHeight: '400px', overflowY: 'auto', borderRadius: '10px', padding: '10px', cursor: 'pointer' }}>
                {selectedTickets.map((ticket, index) => (
                  <TicketItem key={index}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={ticket.img}
                        alt={ticket.nameService}
                        style={{ width: '50px', height: '50px', borderRadius: '5px' }}
                        onClick={() => handleServiceSelect({
                          img: ticket.img,
                          nameService: ticket.nameService,
                          typeService: selectedService?.typeService,
                          priceService: selectedService?.priceService
                        })}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{ticket.nameService}</div>
                        {ticket.types.map((type, idx) => (
                          <div key={idx} style={{ borderTop: '1px solid #ccc', paddingTop: '10px', position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                              <div>Vé: {type.type}</div>
                              <div>Số lượng: {type.quantity}</div>
                              <div style={{ color: 'red' }}>Giá: {(type.price * type.quantity).toLocaleString()} VND</div>
                            </div>
                            <div style={{ borderRadius: '10px', padding: '5px', cursor: 'pointer', marginLeft: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <RemoveIcon
                                onClick={() => handleRemoveTicket(index, idx)}
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
                Tổng giá: {selectedTickets.reduce((acc, ticket) => acc + ticket.types.reduce((acc, type) => acc + type.price * type.quantity, 0), 0).toLocaleString()} VND
              </div>
              <ButtonCPN text='Thanh toán' style={{ width: '100%', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }} />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <p>Chưa có vé nào được đặt.</p>
            </div>
          )}
        </TicketRight>
      </TicketContainer>
    </>
  );
};

export default Ticket;
