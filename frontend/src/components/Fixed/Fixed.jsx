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
            <Up className={sticky ? 'sticky' : ''} onClick={scrollToTop} data-aos="fade-left"/>
        </>

    )
}

export default Fixed;