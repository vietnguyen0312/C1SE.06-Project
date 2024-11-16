import React, { useState } from 'react';
import styled from 'styled-components';
import { DashboardContainer, Header, HeaderItem, DateStyle } from '../Dashboard';
import { RetweetOutlined } from '@ant-design/icons';
import ButtonCPN from '../../../components/Button/Button';
import Employee from './Employee';
import Customer from './Customer';
const ProfileContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;



const EmployeeAndCustomerList = () => {
    const [isEmployee, setIsEmployee] = useState(true);
    return (
        <ProfileContainer>
            <DashboardContainer>
                <div>
                    <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Danh sách nhân viên và khách hàng</div>
                    <ButtonContainer>
                        <ButtonCPN 
                            text='Employee' 
                            onClick={() => {
                                setIsEmployee(true);
                            }} 
                            style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px'  }}
                        />
                         <ButtonCPN 
                            text='Customer' 
                            onClick={() => {
                                setIsEmployee(false);
                            }} 
                            style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        />
                    </ButtonContainer>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <RetweetOutlined />
                    <DateStyle>Nov 9, 2024 - Nov 15, 2024</DateStyle>
                </div>
            </DashboardContainer>
            <div style={{ marginTop: '20px' }}>
            {isEmployee ? <Employee /> : <Customer />}
            </div>
        </ProfileContainer>
    );
};

export default EmployeeAndCustomerList;
