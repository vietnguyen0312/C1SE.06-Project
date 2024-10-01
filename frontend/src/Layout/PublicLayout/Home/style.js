  import styled, { keyframes } from 'styled-components';

  export const Container = styled.div`
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 15px;
    
  `;


  export const WrapperAICD = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.15);
    padding:10px;
  `;

  export const MainMenu = styled.div`
    padding: 20px 0;
  `;

  export const NavMenu = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding-right: 15px;

  `;

  export const NavMenuItem = styled.li`
    position: relative;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  `;

  export const NavMenuLink = styled.a`
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 12px;
    transition: color 0.3s ease;
    &:hover {
      color: #007bff;
      cursor: pointer;
    }
  `;

  export const SubMenu = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    display: none;
    min-width: 200px;
    padding: 10px 0;
    
    ${NavMenuItem}:hover & {
      display: block;
    }

    ${NavMenuItem} {
      margin-right: 0;
      padding: 5px 15px;
    }
  `

  export const BannerSection = styled.section`
    background-image: url('/img/header/header1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    
  `;

  export const BannerSection2 = styled.section`
    background-image: url('/img/header/header1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 55vh;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    user-select: none;
    outline: none;
    
  `;


  export const BannerContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    user-select: none;
    outline: none;
  `;

  export const BannerLeft = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color: white;
    z-index:2;
    
  `;

  export const BannerRight = styled.div`
    width: 33%;
    margin-top: 56px;
    z-index: 9999;
  `;

  export const TabContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 5px;
  `;

  export const TabButtons = styled.div`
    display: flex;
    margin-bottom: 20px;
  `;

  export const TabButton = styled.button`
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background-color: ${props => (props.active ? '#333' : '#fff')};
    color: ${props => (props.active ? '#fff' : '#333')};
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #333;
      color: #fff;
    }
  `


  export const TabContent = styled.div`
  padding-top: 15px;
  
  `;

  export const FormInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #eee;
    font-size:13px;
    border-radius: 5px;
  `;

  export const SearchButton = styled.div`
    display:flex;
    align-items:center; 
    justify-content:center;
  `;

  export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(4, 9, 30, 0.4);
  `;


