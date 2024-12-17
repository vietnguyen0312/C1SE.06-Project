import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonCPN from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import axios from '../../Configuration/AxiosConfig';

const Container = styled.div`
    width: 70%;
    height: 45%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'LibreBaskerville';
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    &:focus {
        outline: none;
        border-color: #f8b600;
    }
`;

const Label = styled.label`
    position: absolute;
    left: 10px;
    top: ${({ isFocused }) => (isFocused ? '-10px' : '50%')};
    transform: translateY(-50%);
    font-size: ${({ isFocused }) => (isFocused ? '12px' : '16px')};
    color: ${({ isFocused }) => (isFocused ? '#f8b600' : '#aaa')};
    pointer-events: none;
    transition: all 0.2s ease;
`;

const ContainerLeft = styled.div`
    width: 30%;
    margin: 0 100px 0 30px;
    
`;
const Title1 = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ContainerRight = styled.div`
    width: 50%;
    margin-right: 30px;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;
`;

const WrapperA = styled.a`
    color: #f8b600;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none; 
    &:hover {
        color: black; 
        text-decoration: underline;
    }
`;

const Title = styled.h1`
    color: #f8b600;
    font-size: 80px;
`;

const EmailInput = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        if (!inputValue) setIsFocused(false);
    };
    const handleChange = (e) => setInputValue(e.target.value);

    const handleBack = () => {
        navigate("/authentication");
    };

    const handleContinue = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputValue) {
            if (emailPattern.test(inputValue)) {
                const response = await axios.get(`/users/verify-email`, { params: { email: inputValue } });
                if (response.result === true) {
                    navigate("/notify?email=" + inputValue);
                } else {
                    alert("Email không tồn tại");
                }
            } else {
                alert("Địa chỉ Email không hợp lệ");
            }
        } else {
            alert("Vui lòng nhập địa chỉ Email");
        }
    };

    return (
        <Container>
            <ContainerLeft>
                <Title className='Allison'>Quên mật khẩu</Title>
                <Title1>Nhập địa chỉ Email của bạn</Title1>
            </ContainerLeft>
            <ContainerRight>
                <div>
                    <div style={{ marginBottom: '30px'}}>
                        <InputContainer>
                            <Input
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={inputValue}
                                type="email"
                            />
                            <Label isFocused={isFocused || inputValue}>Email</Label>
                        </InputContainer>
                    </div>
                    <ButtonContainer>
                        <ButtonCPN text={'Quay lại'} style={{ width: '130px', backgroundColor: '#7c7c7c' }} onClick={handleBack}/>
                        <ButtonCPN text={'Tiếp tục'} style={{ width: '130px' }} onClick={handleContinue}/>
                    </ButtonContainer>
                </div>
            </ContainerRight>
        </Container>
    );
};

export default EmailInput;
