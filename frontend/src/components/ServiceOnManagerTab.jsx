import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcons from 'react-loading-icons';
import styled from "styled-components";
import axios from '../Configuration/AxiosConfig'; 
import { useEffect, useState, useRef } from "react";
import React from 'react';
import ButtonCPN from './Button/Button';
import { Form, Input, Select, Upload, Modal, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ServiceUpdate from './ServiceUpdate';

const ServiceItemWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-left: 40px;
`;

const ServiceItem = styled.div`
    background-color: #fff;
    height: 250px;
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 15px;
    flex-direction: column;
    display: flex;
`;

const ServiceImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const ServiceName = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 400;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #989595;
`;
const FormContainer = styled.div`
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
    top: 120px;
    right: 20px;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
`;

const CheckboxContainer = styled.div`
    margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
    margin-right: 15px;
`;

const SearchBar = styled.input`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    width: 300px; /* Set width for the search bar */
`;

const ServiceOnManagerTab = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState({ width: 900, height: 500 });
    const [serviceData, setServiceData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [showAddService, setShowAddService] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedServiceType, setSelectedServiceType] = useState([]);
    const [idServiceTypes, setIdServiceTypes] = useState(null);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchTimeoutRef = useRef(null);

    useEffect(() => {
        fetchServices(idServiceTypes, searchTerm);
    }, [idServiceTypes, searchTerm]);

    useEffect(() => {
        fetchServiceType();
    }, []);

    const fetchServiceType = async () => {
        const response = await axios.get('/serviceTypes');
        setServiceTypes(response.result);
        setSelectedServiceType(response.result.map(type => type.id));
    };

    const fetchServices = async (idServiceTypes, search) => {
        setTimeout(async () => {
            const response = await axios.get(`/services`, { params: { page: page, size: 25, serviceTypeId: idServiceTypes, search: search } });
            setServiceData(prevData => [...prevData, ...response.result.data]);
            setHasMore(response.result.data.length > 0);
            setPage(page + 1);
        }, 400);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleAddService = async (values) => {
        setLoading(true);

        const dataWithoutImage = {
            ...values,
            image: null
        };

        let createService = (await axios.post('/services', dataWithoutImage));

        if(values.image){
            if(values.image.fileList.length > 0){
                const newFile = values.image.fileList[0].originFileObj
                const formData = new FormData();
                formData.append('file', newFile);
                formData.append('filename', newFile.name);
                const response = await axios.post('/upload/imgService', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const newImageUrl = response.result;
                const updatedService = {
                    ...values,
                    image: newImageUrl,
                };
                const serviceId = createService.result.id;
                createService = await axios.put(`/services/${serviceId}`, updatedService);
            }
        }
        message.success('Thêm dịch vụ thành công!');
        setServiceData((prevData) => [createService.result, ...prevData]);
        setShowAddService(false);
        setLoading(false);
    };

    const updateServiceData = (updatedService) => {
        setServiceData((prevData) =>
            prevData.map((service) =>
                service.id === updatedService.id ? updatedService : service
            )
        );
    };

    const handleServiceItemClick = async (item) => {
        setModalContent(
            <ServiceUpdate service={item} onUpdate={updateServiceData} />
        );
        setIsModalVisible(true);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setServiceData([]);
        setHasMore(true);
        setPage(1);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            setSearchTerm(value);
        }, 500);
    };

return (
    <>
        <Modal visible={loading} footer={null} closable={false}>
            <Spin tip="Đang cập nhật..." />
        </Modal>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <SearchBar
                    type="text"
                    placeholder="Tìm kiếm dịch vụ..."
                    onChange={handleSearchChange}
                />
                <CheckboxContainer>
                    {serviceTypes.map((type) => (
                        <CheckboxLabel>
                            <input
                                type="checkbox"
                                value={type.id}
                                checked={selectedServiceType.includes(type.id)}
                                onChange={(event) => {
                                    const { value, checked } = event.target;
                                    let updatedServiceTypes;
                                    if (checked) {
                                        updatedServiceTypes = [...selectedServiceType, value];
                                    } else if(selectedServiceType.length > 1){
                                        updatedServiceTypes = selectedServiceType.filter((id) => id !== value);
                                    } else {
                                        return;
                                    }
                                    setSelectedServiceType(updatedServiceTypes);
                                    setIdServiceTypes(updatedServiceTypes.join(','));
                                    setServiceData([]);
                                    setHasMore(true);
                                    setPage(1);
                                }}
                            />
                            {' '}{type.name}
                        </CheckboxLabel>
                    ))}
                </CheckboxContainer>
            </div>
            <ButtonContainer>
                <ButtonCPN text="Thêm dịch vụ" style={{marginBottom:'20px'}} onClick={()=>setShowAddService(true)}></ButtonCPN>
            </ButtonContainer>
        </div>
        {showAddService && (
            <FormContainer>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Thêm mới dịch vụ</div>
                <Form layout="vertical" onFinish={handleAddService}>
                    <Form.Item
                        label="Ảnh cho dịch vụ"
                        name="image">
                        <Upload
                            listType="picture-card"
                            maxCount={1}
                            accept="image/*"
                            multiple={false}
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
                        rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
                    >
                    <Input placeholder="Nhập tên dịch vụ" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                    <Input placeholder="Nhập mô tả" />
                    </Form.Item>
                    <Form.Item
                        label="Chọn loại dịch vụ"
                        name="serviceTypeId"
                        rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ!' }]}
                    >
                    <Select placeholder="Chọn loại dịch vụ">
                        {serviceTypes.map((type) => (
                            <Option value={type.id}>{type.name}</Option>
                        ))}
                    </Select>
                    </Form.Item>
                    <div style={{display:'flex', gap:'20px'}}>
                        <ButtonCPN text="Thêm dịch vụ" type="primary" htmlType="submit" style={{width:'170px', height:'50px',fontSize:'14px'}}/>
                        <ButtonCPN text="Đóng" onClick={()=> {setShowAddService(false)}} style={{width:'170px', height:'50px',fontSize:'14px', backgroundColor:'#ababaa'}}/>
                    </div>
                </Form>
            </FormContainer>
        )}
            
        <InfiniteScroll
            dataLength={serviceData.length}
            next={() => fetchServices(idServiceTypes)}
            hasMore={hasMore}
            loader={<div className="loading-container">
                <LoadingIcons.TailSpin stroke="#000" />
            </div>}
        >
            <ServiceItemWrapper>
                {serviceData.map((service) => (
                    <ServiceItem onClick={() => handleServiceItemClick(service)}>
                        <div style={{ display: "flex", justifyContent: "space-between", }}>
                            <ServiceImage src={service.image} alt={service.name} />
                        </div>
                        <ServiceName>{service.name}</ServiceName>
                        <Description>{service.description}</Description>
                    </ServiceItem>
                ))}
            </ServiceItemWrapper>
        </InfiniteScroll>
        
        <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            centered
            width={modalSize.width}
            style={{ top: 20, borderRadius: '10px', overflow: 'hidden' }}
            closable={false}
        >
            {modalContent}
        </Modal>
    </>
    )
}

export default ServiceOnManagerTab;

