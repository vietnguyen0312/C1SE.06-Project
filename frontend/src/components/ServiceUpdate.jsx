import styled from "styled-components";
import axios from '../Configuration/AxiosConfig'; 
import { useEffect, useState } from "react";
import { Form, Input, Select, Upload, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import ButtonCPN from './Button/Button';
import { message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcons from 'react-loading-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import TicketUpdate from './TicketUpdate';

const FormContainer = styled.div`
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;

export const RatingItem = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  
`;

export const RatingImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RatingContent = styled.div`
  flex: 1;
`;

export const RatingText = styled.p`
  margin: 10px 0;
  font-size: 15px;
  color: #555;
`;

export const RatingAuthor = styled.h4`
  margin-bottom: 5px;
  font-size: 18px;
  color: #333;
`;

export const StarRating = styled.div`
  color: #ffc107;
`;

export const TotalRating = styled.div`
  font-size: 15px;
  color: #333;
  display: flex;
  align-items: center;
  gap:5px;
`;

const Time = styled.div`
    margin: 4px 0 0 10px;

    font-size: 14px;
`

const ServiceUpdate = ({ service, onUpdate }) => {
    const [serviceSelected, setServiceSelected] = useState(service);
    const [tickets, setTickets] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [isEditingService, setIsEditingService] = useState(false);
    const [isEditingTicket, setIsEditingTicket] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ratingsOfSelectedService, setRatingsOfSelectedService] = useState([]);
    const [hasMoreRating, setHasMoreRating] = useState(true);
    const [pageRating, setPageRating] = useState(1);
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);

    useEffect(() => {
        setServiceSelected(service);
        setPageRating(1);
        setRatingsOfSelectedService([]);
        setHasMoreRating(true);
        setTotalRatings(0);
    }, [service]);

    useEffect(() => {
        fetchTicketByServiceId(serviceSelected.id);
        fetchServiceTypes();
        setIsEditingService(false);
        setIsEditingTicket(false);
        fetchRatingsService();
        fetchAverageRating();
    }, [serviceSelected.id]);

    const fetchRatingsService = async () => {
        setTimeout(async () => {
            const response = await axios.get(`/rate-services`, {params: {serviceId: service.id, page: pageRating, size: 10}});
            setRatingsOfSelectedService(prevData => [...prevData, ...response.result.data]);
            setHasMoreRating(response.result.data.length === 10);
            setPageRating(pageRating + 1);
            setTotalRatings(response.result.totalElements);
        }, 400);
    }

    const fetchAverageRating = async () => {
        const response = await axios.get(`/rate-services/get-AVG-Score/${service.id}`);
        setAverageRating(response.result);
    }

    const fetchServiceTypes = async () => {
        const response = await axios.get('/serviceTypes');
        setServiceTypes(response.result);
    }

    const fetchTicketByServiceId = async (serviceId) => {
        const response = await axios.get(`/tickets/getByIdService/${serviceId}`);
        setTickets(response.result.value);
    }

    const handleDeleteRating = async (ratingId) => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn xóa bình luận không?",
            onOk: async () => {
                await axios.delete(`/rate-services/${ratingId}`);
                setRatingsOfSelectedService(prevRatings => prevRatings.filter(rating => rating.id !== ratingId));
                message.success('Xóa bình luận thành công!');
          },
          okButtonProps: {
          style: { backgroundColor: '#f8b600', borderColor: '#f8b600' },
          },
      });
    }

    const handleUpdateService = async (values) => {
        console.log(values);
        setLoading(true);
        let serviceUpdate;
        if(values.image === serviceSelected.image){
            serviceUpdate = await axios.put(`/services/${service.id}`, values);
        } else {
            let currentFilename = '';
            if(serviceSelected.image !== null){
                currentFilename = serviceSelected.image.split('/').pop().replace(/\.[^/.]+$/, "");
            }
            if(values.image.fileList.length > 0){
                const newFile = values.image.fileList[0].originFileObj
                const formData = new FormData();
                formData.append('file', newFile);
                formData.append('filename', currentFilename === '' ? newFile.name : currentFilename);
                const response = await axios.put('/upload/imgService', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const newImageUrl = response.result;
                const updatedService = {
                    ...values,
                    image: newImageUrl,
                };
                serviceUpdate = await axios.put(`/services/${service.id}`, updatedService);
            } else {
                if(currentFilename !== ''){
                    axios.delete(`/upload/imgService/${currentFilename}`);
                }
                const updateService = {
                    ...values,
                    image: null
                };
                serviceUpdate = await axios.put(`/services/${service.id}`, updateService);
            }
        }
        message.success('Cập nhật dịch vụ thành công!');
        onUpdate(serviceUpdate.result);
        setIsEditingService(false);
        setIsEditingTicket(false);
        setServiceSelected(serviceUpdate.result);
        setLoading(false);
    }

    return (
        <>
            <Modal visible={loading} footer={null} closable={false}>
                <Spin tip="Đang cập nhật..." />
            </Modal>
            <div style= {{marginBottom: "20px"}}>
                {!isEditingService && !isEditingTicket && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonCPN text="Chỉnh sửa" onClick={() => {setIsEditingService(true); setIsEditingTicket(false)}} />
                    </div>
                )}
                {(isEditingService || isEditingTicket) && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonCPN text="Quay lại" onClick={() => {setIsEditingService(false); setIsEditingTicket(false)}} />
                        <ButtonCPN text="Chỉnh sửa dịch vụ"
                            style={{ backgroundColor: isEditingService ? 'green' : '#f8b600', borderColor: isEditingService ? '#f8b600' : '#f8b600',
                                marginLeft: "10px" }}
                        onClick={() => {setIsEditingService(true); setIsEditingTicket(false)}} />
                        <ButtonCPN text="Chỉnh sửa vé"
                            style={{ backgroundColor: isEditingTicket ? 'green' : '#f8b600', borderColor: isEditingTicket ? '#f8b600' : '#f8b600',
                            marginLeft: "10px" }}
                        onClick={() => {setIsEditingService(false); setIsEditingTicket(true)}} />
                    </div>
                )}
            </div>
            
            <div>
                {!isEditingService && !isEditingTicket && (
                    <>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center",padding: "20px 0"}}>
                            <img src={serviceSelected.image} alt={serviceSelected.name} 
                                style={{ width: '500px', height: '300px', borderRadius: '10px',
                                display: "flex", justifyContent: "center", alignItems: "center" }} />
                            <h2>{serviceSelected.name}</h2>
                            <h3 style={{ fontSize: '16px', fontWeight: '400', color: '#333' }}>{serviceSelected.serviceType.name}</h3>
                            <p style={{marginTop: "10px",color: "#989595"}}>{serviceSelected.description}</p>
                        </div>

                        <div style={{borderTop: "1px solid #ddd",paddingTop: "20px"}}>
                            {tickets.length > 0 ? (
                                <>
                                    <div style={{marginTop: "20px", fontSize: "18px", fontWeight: "600", color: "#1b60d8"}}>Số lượng vé còn lại</div>
                                    <div style={{ display: 'table', width: '50%', borderCollapse: 'collapse' }}>
                                        <div style={{ display: 'table-row', borderBottom: '1px solid #ddd' }}>
                                            {Array.isArray(tickets) && tickets.map((ticket) => (
                                                <React.Fragment >
                                                    <div style={{ display: 'table-row' }}>
                                                        <div style={{ display: 'table-cell', width: '50%', textAlign: 'right', padding: '8px', whiteSpace: 'nowrap', borderRight: '1px solid #ddd' }}>
                                                            Vé {ticket.ticketType.name}
                                                        </div>
                                                        <div style={{ display: 'table-cell', width: '50%', textAlign: 'left', padding: '8px' }}>
                                                            {ticket.quantity}
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div style={{marginTop: "20px", fontSize: "18px", fontWeight: "600", color: "#1b60d8"}}>Chưa có vé</div>
                            )}
                        </div>

                        <div style={{borderTop: "1px solid #ddd",marginTop: "20px"}}>
                            <RatingContainer>
                                <h5>Đánh giá dịch vụ ({totalRatings})</h5>
                                <TotalRating>
                                    {averageRating} <div style={{ color: '#787878' }}>/ 5</div>
                                    <StarRating style={{ marginLeft: '5px' }}>
                                        {[...Array(5)].map((_, i) => {
                                            if (i < Math.floor(averageRating)) {
                                                return (
                                                    <FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />
                                                );
                                            } else if (i === Math.floor(averageRating)) {
                                                const decimalPart = averageRating % 1;
                                                if (decimalPart <= 0.2) {
                                                    return (
                                                        <FontAwesomeIcon key={i} icon={faStar} color="#e4e5e9" />
                                                    );
                                                } else if (decimalPart >= 0.3 && decimalPart < 0.8) {
                                                    return (
                                                        <FontAwesomeIcon key={i} icon={faStarHalf} color="#ffc107" />
                                                    );
                                                } else {
                                                    return (
                                                        <FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />
                                                    );
                                                }
                                            } else {
                                                return (
                                                    <FontAwesomeIcon key={i} icon={faStar} color="#e4e5e9" />
                                                );
                                            }
                                        })}
                                    </StarRating>
                                </TotalRating>
                                <div style={{ marginTop: '20px' }}>
                                    <InfiniteScroll
                                        dataLength={ratingsOfSelectedService.length}
                                        next={() => fetchRatingsService()}
                                        hasMore={hasMoreRating}
                                        loader={<div className="loading-container">
                                            <LoadingIcons.TailSpin stroke="#000" />
                                        </div>}
                                    >
                                        {ratingsOfSelectedService.length > 0 ? (
                                            ratingsOfSelectedService.map((rating, index) => (
                                                <div key={index} style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                                                    <RatingItem>
                                                        <div>
                                                            <RatingImage src={`${rating.user.avatar}`} />
                                                        </div>
                                                        <RatingContent>
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                <RatingAuthor>{rating.user.username}</RatingAuthor>
                                                                <button 
                                                                    style={{ background: 'red', border: 'none', fontWeight: 'bold', color: '#fff', cursor: 'pointer', padding: '5px 10px', borderRadius: '5px' }}
                                                                    onClick={() => handleDeleteRating(rating.id)}
                                                                >
                                                                    Xóa
                                                                </button>
                                                            </div>
                                                            <StarRating>
                                                                {[...Array(5)].map((_, i) => (
                                                                    <FontAwesomeIcon
                                                                        key={i}
                                                                        icon={faStar}
                                                                        color={i < rating.score ? "#ffc107" : "#e4e5e9"}
                                                                    />
                                                                ))}
                                                            </StarRating>
                                                            <RatingText>{rating.comment}</RatingText>
                                                        </RatingContent>
                                                    </RatingItem>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#9a9a9a' }}>
                                                        <Time>{rating.formatDate}</Time>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-ratings" style={{ textAlign: 'center', marginTop: '20px' }}>
                                                Không có bình luận nào.
                                            </div>
                                        )}
                                    </InfiniteScroll>
                                </div>
                            </RatingContainer>
                        </div>
                    </>
                )}

                {isEditingService && (
                    <>
                        <FormContainer>
                            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Chỉnh sửa dịch vụ</div>
                            <Form layout="vertical" onFinish={handleUpdateService}>
                                <Form.Item
                                    label="Ảnh cho dịch vụ"
                                    name="image"
                                    initialValue={serviceSelected.image}>
                                    <Upload
                                        listType="picture-card"
                                        maxCount={1}
                                        accept="image/*"
                                        multiple={false}
                                        defaultFileList={
                                            serviceSelected.image
                                                ? [
                                                    {
                                                        url: serviceSelected.image,
                                                    },
                                                ]
                                                : []
                                        }

                                        beforeUpload={() => false}
                                        onChange={(info) => {
                                            const file = info.fileList;
                                            if (file.length > 0) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    message.success(`${info.file.name} đã tải lên thành công.`);
                                                };
                                                reader.readAsDataURL(info.file);
                                            }
                                        }}
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                                <Form.Item
                                    label="Tên dịch vụ"
                                    name="name"
                                    initialValue={serviceSelected.name}
                                    rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
                                >
                                    <Input placeholder="Nhập tên dịch vụ" />
                                </Form.Item>
                                <Form.Item
                                    label="Mô tả"
                                    name="description"
                                    initialValue={serviceSelected.description}
                                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                                >
                                    <Input.TextArea placeholder="Nhập mô tả" autoSize={{ minRows: 3, maxRows: 8 }} />
                                </Form.Item>
                                <Form.Item
                                    label="Chọn loại dịch vụ"
                                    name="serviceTypeId"
                                    rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ!' }]}
                                    initialValue={serviceSelected.serviceType.id}
                                >
                                <Select placeholder="Chọn loại dịch vụ">
                                    {serviceTypes.map((type) => (
                                        <Option value={type.id}>{type.name}</Option>
                                    ))}
                                </Select>
                                </Form.Item>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <ButtonCPN text="Xác nhận" type="primary" htmlType="submit" style={{ marginLeft: '10px' }} />
                                </div>
                            </Form>
                        </FormContainer>
                    </>
                )}

                

                {isEditingTicket && (
                    <TicketUpdate serviceId={serviceSelected.id} />
                )}
            </div>
        </>
    )
}

export default ServiceUpdate;
