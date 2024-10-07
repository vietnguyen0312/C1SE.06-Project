import { UpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Up = styled(UpOutlined)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  width: 55px;
  height: 55px;
  z-index: 1000; 
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  &.sticky {
    opacity: 1;
    visibility: visible;    
  }
`;

const Container = styled.div`
    position: fixed;
    bottom: 20px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 999999;
`
const ChatBox = styled.div`
  padding: 10px 20px;
  background-color: #DDAA5D;
  border-radius: 50%;
  cursor: pointer;
  width: 55px;
  height: 55px;
  z-index: 1000; 
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  animation: pulse 1.5s infinite; 
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(6, 141, 219, 0.7);
  }
  70% {
    box-shadow: 0 0 0 30px rgba(255, 165, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
    }
  }
  a img {
    width: 60px;
    height: 60px;
    animation: swing 0.5s infinite; 
    border-radius: 50%;
  }

  @keyframes swing {
    0% { transform: rotate(0deg); }
    20% { transform: rotate(10deg); }
    40% { transform: rotate(-30deg); }
    60% { transform: rotate(5deg); }
    80% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  } 
`;
const Ticket = styled.div`
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-radius: 50%;
  cursor: pointer;
  width: 60px;
  height: 60px;
  z-index: 1000; 
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  animation: pulse2 1.5s infinite; 
@keyframes pulse2 {
  0% {
    box-shadow: 0 0 0 0 rgba(93, 93, 93, 0.7);
  }
  70% {
    box-shadow: 0 0 0 30px rgba(255, 165, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
    }
  }
  a img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    animation: swing 0.5s infinite; 
  }
`;
const Fixed = () => {
    const [sticky, setSticky] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 20) {
            setSticky(true)
        }
        else {
            setSticky(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    useEffect(()=>{
        AOS.init({duration:2000});
    },[])
    return (
        <>
            <Container data-aos="fade-right">
                <Ticket>
                    <a href='/ticket'>
                        <img src={('/img/ticket/Ticket.png')} alt='ticket' />
                    </a>
                </Ticket>
                <ChatBox>
                    <a>
                        <img src={('/img/ticket/robot.png')} alt='chatBox' />
                    </a>
                </ChatBox>
            </Container>
            <Up className={sticky ? 'sticky' : ''} onClick={scrollToTop} data-aos="fade-left"/>
        </>

    )
}

export default Fixed;