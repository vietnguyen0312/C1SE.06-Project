import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonCPN from '../../../components/Button/Button';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Container = styled.div`
    width: 50%;
    height: auto;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 0;
`;

const InputContainer = styled.div`
    position: relative;
    margin-bottom: 30px;
    width: 70%;
    display: flex;
    justify-content: center;
`;

const Input = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px 10px 5px; 
    &:focus {
        outline: none;
        border-color: #f8b600;
    }
`;

const Label = styled.label`
    position: absolute;
    left: 15px;
    top: ${({ isFocused, value }) => (isFocused || value ? '-20px' : '15px')};
    font-size: ${({ isFocused, value }) => (isFocused || value ? '12px' : '16px')};
    color: ${({ isFocused }) => (isFocused ? '#f8b600' : '#aaa')};
    pointer-events: none;
    transition: all 0.2s ease;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
`;

const Title = styled.h1`
    color: #f8b600;
    font-size: 70px;
    display: flex;
    justify-content: center;
`;

const InputContainer1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
`;
const Message = styled.p`
    color: red;
    display: flex;
    justify-content: center;
`
 const PasswordInput = ({ label, value, onChange, onFocus, onBlur, isFocused }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <InputContainer>
            <Input
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder=' '
            />
            <Label isFocused={isFocused} value={value}>{label}</Label>
            <button onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '10px', border: 'none', background: 'none' }}>
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
        </InputContainer>
    );
};

const ForgotPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [isConfirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = () =>{
        if(password !== confirmPassword){
            setMessage('Mật khẩu không khớp')
        }else{
            setMessage('')
        }
    }

    return (
        <Container>
            <Title className='Allison'>Nhập lại mật khẩu</Title>
            <InputContainer1>
                <PasswordInput
                    label='Mật khẩu mới'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    isFocused={isPasswordFocused}
                />
                <PasswordInput
                    label='Nhập lại mật khẩu'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setConfirmPasswordFocused(true)}
                    onBlur={() => setConfirmPasswordFocused(false)}
                    isFocused={isConfirmPasswordFocused}
                />
            </InputContainer1>
            <Message>{message}</Message>
            <ButtonContainer>
                <ButtonCPN onClick={handleSubmit} text={'Gửi'} style={{ width: '130px', height: '50px' }} />
            </ButtonContainer>
        </Container>
    );
};

export default ForgotPassword;
