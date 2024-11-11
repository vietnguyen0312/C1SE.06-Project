import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const DropdownContainer = styled.div`
    padding: 15px 0;
    border-bottom: 1px solid #e5e5e5;
`;

const Dashboard = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    transition: all 0.5s ease;
    &:hover {
        color: #f8b600;
    }
`;

const DropdownContent = styled.div`
    padding: 10px;
    border-radius: 5px;
    margin-top: 5px;
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
        color: #f8b600;
    }
`;

const IconWrapper = styled.div`
    transition: transform 1s ease;
    ${({ isActive }) => isActive ? css`transform: rotate(90deg);` : css`transform: rotate(0);`}
`;

const StyledImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const DropdownMenu = ({ icon, label, content, isActive, onClick, icon2, img, imgSize }) => {
    const [iconActive, setIconActive] = useState(false);

    const handleIconClick = () => {
        setIconActive(!iconActive);
        onClick();
    };

    return (
        <DropdownContainer>
            <Dashboard onClick={handleIconClick}>
                {img && <StyledImg src={img} alt="icon" />}
                {icon}
                {label}
                <IconWrapper isActive={iconActive}>
                    {icon2}
                </IconWrapper>
            </Dashboard>
            {isActive && <DropdownContent>{content}</DropdownContent>}
        </DropdownContainer>
    );
};

export default DropdownMenu;
