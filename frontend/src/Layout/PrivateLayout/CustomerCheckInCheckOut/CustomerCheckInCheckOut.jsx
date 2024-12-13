import React, { Component } from 'react';
import styled from 'styled-components';
const SearchInput = styled.input`
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 16px;
    width: 250px;
    outline: none;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &:focus {
        border-color: #4a90e2;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    &::placeholder {
        color: #aaa;
    }
`;
const InputContainer = styled.div`
    margin-top:50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
class CustomerCheckInCheckOut extends Component {
    render() {
        return (
            <InputContainer>
                <SearchInput placeholder="Id booking room" />
                <SearchInput placeholder="Nhập email" />
                <SearchInput placeholder="Nhập số điện thoại" />
            </InputContainer>
        );
    };
}
export default CustomerCheckInCheckOut;