import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { LeftOutlined,RightOutlined } from '@ant-design/icons';
const Arrow = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: white; 
    cursor: pointer;
    z-index: 1;
    padding: 20px; 
    background-color: rgba(0, 0, 0, 0.5); 
    border-radius: 50%; 
    transition: background-color 0.3s ease;
    &:hover {
        background-color: white;
        color: black;
    }

    &.next {
        right: 20px; 
    }

    &.prev {
        left: 20px;
    }
`;

export const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <Arrow className="next" onClick={onClick}>
            <RightOutlined />
           
        </Arrow>
    );
};

export const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <Arrow className="prev" onClick={onClick}>
            <LeftOutlined />
        </Arrow>
    );
};

const SliderCpn = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Slider {...settings}>
            {arrImages.map((image) => (
                <Image key={image} src={image} alt="Slider" preview={false} width="100%" height="80vh" />
            ))}
        </Slider>
    );
};

export default SliderCpn;
