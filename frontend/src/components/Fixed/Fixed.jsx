import { UpOutlined, CloseOutlined, FullscreenOutlined, FullscreenExitOutlined, SendOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from '../../Configuration/AxiosConfig';
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
`;

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

const ChatWindow = styled.div`
  position: fixed;
  bottom: 20px;
  left: 80px;
  width: ${({ isExpanded }) => (isExpanded ? '620px' : '300px')};
  height: ${({ isExpanded }) => (isExpanded ? '600px' : '400px')};
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);  
  display: ${({ show }) => (show ? 'flex' : 'none')};
  z-index: 1001;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease, height 0.3s ease;
`;

const ChatHeader = styled.div`
  background: linear-gradient(to right, #528B8B, #79CDCD);
  padding: 20px;
  border-radius: 10px 10px 0 0;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const ChatInputWrapper = styled.div`
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Close = styled(CloseOutlined)`
  &:hover {
    color: #DDAA5D;
  }
`

const Send = styled(SendOutlined)`
  font-size: 20px;  
  cursor: pointer;
  padding: 10px;
  background: linear-gradient(to right, #528B8B, #79CDCD);
  border-radius: 10px;
  margin-left: 10px;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #79CDCD, #528B8B); 
    transform: scale(1.1); 
  }

  &:active {
    transform: scale(0.95);
    background: linear-gradient(to right, #3a6e6e, #69a1a1);
  }
`;

const Fixed = () => {
  const [sticky, setSticky] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const chatWindowRef = useRef(null);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (event) => {
    if (chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
      setChatOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [messages, setMessages] = useState([]);
  const initialMessages = [
    { id: 1, text: 'Chào bạn! Tôi là bot, bạn cần giúp gì?', sender: 'bot' },
  ];
  useEffect(() => {
    setMessages(initialMessages);
  }, []);



  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const userMessage = event.target.value.trim();
      if (userMessage) {
        handleSendMessage(userMessage);
        event.target.value = '';
      }
    }
  };

  const handleSendMessage = async (messageOrEvent) => {
    let message;
    if (typeof messageOrEvent === 'string') {
      message = messageOrEvent;
    } else {
      const input = messageOrEvent.target.previousElementSibling;
      message = input.value.trim();
      input.value = '';
    }

    if (message) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser: true },
      ]);

      try {
        const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
          sender: '20240921-013310-antique-mole',
          message: message,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = response;

        if (data && data.length > 0) {
          const botMessage = data[0].text;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botMessage, isUser: false },
          ]);
        }
      } catch (error) {
        console.error('Error connecting to Rasa:', error);
      }
    }
  };


  // Cuộn xuống cuối khi messages thay đổi
  const chatBodyRef = useRef(null);
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <>
      <Container data-aos="fade-right">
        <Ticket>
          <a href='/ticket'>
            <img src={('/img/ticket/Ticket.png')} alt='ticket' />
          </a>
        </Ticket>
        <ChatBox onClick={toggleChat}>
          <a>
            <img src={('/img/ticket/robot.png')} alt='chatBox' />
          </a>
        </ChatBox>
      </Container>

      <ChatWindow ref={chatWindowRef} show={chatOpen} isExpanded={isExpanded}>
        <ChatHeader>
          <div>Chat Box</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <FullscreenOutlined onClick={toggleExpand} style={{ display: isExpanded ? 'none' : 'block'}} />
            <FullscreenExitOutlined onClick={toggleExpand} style={{ display: isExpanded ? 'block' : 'none' }} />
            <Close onClick={toggleChat} />
          </div>
        </ChatHeader>
        <ChatBody ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} style={{ margin: '5px 0' }}>
              {msg.isUser ? null : <div style={{ marginBottom: '5px', color: '#44cbcb',opacity: '0.7',fontSize: '14px'}}>Bot</div>}
              <div style={{
                display: 'flex',
                justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: msg.isUser ? '#79CDCD' : '#f1f1f1',
                  maxWidth: '60%',
                  wordWrap: 'break-word',
                  color: msg.isUser ? 'white' : 'black',
                }}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </ChatBody>
        <ChatInputWrapper>
  <ChatInput placeholder="Nhập tin nhắn..." onKeyDown={handleKeyDown} />
  <Send onClick={(event) => handleSendMessage(event)} /> {/* Gọi với event */}
</ChatInputWrapper>
      </ChatWindow>

      <Up className={sticky ? 'sticky' : ''} onClick={scrollToTop} data-aos="fade-left" />
    </>
  );
};

export default Fixed;
