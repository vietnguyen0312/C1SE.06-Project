import React from 'react';
import styled from 'styled-components';
import ButtonCPN from './Button/Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
`;

const ModalContent = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Xác nhận", 
    message = "Bạn có chắc chắn muốn thực hiện hành động này?",
    confirmText = "Xác nhận",
    cancelText = "Hủy" 
}) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <ModalHeader>{title}</ModalHeader>
                <ModalContent>{message}</ModalContent>
                <ButtonContainer>
                    <ButtonCPN
                        onClick={onConfirm}
                        text={confirmText}
                        style={{
                            width: "100px",
                            padding: "8px 16px",
                            backgroundColor: "#dc3545",
                            color: "white"
                        }}
                    />
                    <ButtonCPN
                        onClick={onClose}
                        text={cancelText}
                        style={{
                            width: "100px",
                            padding: "8px 16px",
                            backgroundColor: "#6c757d",
                            color: "white"
                        }}
                    />
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default ConfirmModal;