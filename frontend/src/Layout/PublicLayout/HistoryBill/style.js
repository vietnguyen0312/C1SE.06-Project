import styled from "styled-components";
import { Modal } from 'react-bootstrap';

export const ModalWrapper = styled(Modal)`
  .modal-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh; 
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  }
  
  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const ModalTitle = styled.span`
    font-size: 20px;
    font-weight: 600;
    color: #5f5f5f;
`;

export const ModalHeader = styled(Modal.Header)`
    border-bottom: 1px solid #e0e0e0;
`;

export const ModalBody = styled(Modal.Body)`
    padding: 20px;
    
`;

export const ModalFooter = styled(Modal.Footer)`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

export const WriteRating = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
`;


export const TableExtend = styled.table`
    width: 100%;
    color: white;
    th {
        text-align: center; 
        background-color: #84b0ca;
        padding: 5px 0;
    }
    td {
        text-align: center; 
        color: black;
        padding: 5px 0;
    }
`;