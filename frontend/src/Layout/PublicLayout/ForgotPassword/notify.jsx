import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ButtonCPN from '../../../components/Button/Button';
import { FaSpinner } from 'react-icons/fa';

const Container = styled.div`
    width: 70%;
    height: 45%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
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

const ContainerLeft = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const ContainerRight = styled.div`
    width: 50%;
    margin-right: 30px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    justify-content:center;
    margin-top: 30px;
`;

const Title = styled.h1`
    color: #f8b600;
    font-size: 80px;
`;
const Title1 = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EmailText = styled.p`
    color: #478b8b;
    margin: 0 5px;
`
const Spinner = styled(FaSpinner)`
    animation: spinner 1s linear infinite;
    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`
const Spin = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`
const Notify = () => {

    const formatEmail = (email) => {
        if (!email) return '';
        const [name, domain] = email.split('@');
        const maskedName = name.slice(0, 2).padEnd(name.length, '*');
        return `${maskedName}@${domain}`;
    };

    const maskedEmail = formatEmail("john.doe@email.com");
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const handleResend = () => {
        setLoading(true);
        let counter = 5;
        const interval = setInterval(() => {
            setCountdown(counter);
            if (counter === 1) {
                clearInterval(interval);
                setLoading(false);
                setCountdown(5);
            }
            counter--;
        }, 1000);
    };

    useEffect(() => {
        handleResend();
    }, []);
    return (
        <Container>
            <ContainerLeft>
                <Title className='Allison'>Xác nhận Email</Title>
            </ContainerLeft>
            <ContainerRight>
                <Title1>Chúng tôi vừa gửi một mã đến <EmailText>{maskedEmail}</EmailText> để </Title1>
                <Title1>giúp bạn đăng nhập</Title1>
                <ButtonContainer>
                    <ButtonCPN 
                    text={loading ? <Spin>{countdown}<Spinner/></Spin> : 'Gửi lại'} 
                    style={{ width: '130px' }} 
                    onClick={handleResend}
                    disabled={loading}
                    />
                </ButtonContainer>
            </ContainerRight>
        </Container>
    );
};

export default Notify;
