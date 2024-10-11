import styled from 'styled-components';

export const NavMenuLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 10px 15px;
  display: block;

  &:hover {
    color: #f8b600;
    
  }
`;

export const SubMenu = styled.ul`
  position: absolute;
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  top: 100%;
  left: 0;
  min-width: 200px;
  padding: 10px 0;
  display: none;
  z-index: 9999;
  border-radius: 4px;

  ${NavMenuLink} {
    color: #333;
    padding: 8px 15px;
    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

export const WrapperHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  transition: all 0.7s;
  z-index: 2;
  background: none;
  user-select: none;
  outline: none;

  &.sticky {
    background: #333;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const WrapperHeaderTop = styled.div`
  font-size: 12px;
  transition: all 0.3s ease;
  max-height: ${props => props.isVisible ? '50px' : '0'};
  overflow: hidden;
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

export const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

export const WrapperAIC = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

export const WrapperAICD = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.15);
  padding: 15px;

  &.sticky {
    background: none;
  }
`;

export const HeaderTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 24px;
  }

  img {
    height: 40px;
    width: auto;
    margin-right: 10px;
  }

  span {
    letter-spacing: 1px;
    color: white;
    font-family: fantasy;
    font-size: 33px; 
    font-weight: bold;
  }
`;

export const HeaderTopLeftUL = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const HeaderTopLi = styled.li`
  margin-right: 15px;

  &:last-child {
    margin-right: 0;
  }
`;

export const HeaderTopLeftLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #f8b600;
  }
`;

export const HeaderTopRight = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderSocial = styled.div`
  display: flex;
`;

export const HeaderSocialLink = styled.a`
  color: white;
  font-size: 16px;
  margin-left: 15px;
  transition: color 0.3s ease;

  &:hover {
    color: #f8b600;
  }
`;

export const MainMenu = styled.div``;

export const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding-right: 15px;
`;

export const NavMenuItem = styled.li`
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  font-size: 12px;
  font-weight: bold;

  &:hover > ${SubMenu} {
    display: block;
  }
`;

export const FormInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  top: 100%;
  left: 0;
  min-width: 200px;
  padding: 10px 0;
  display: none;
  z-index: 9999;
  border-radius: 4px;
`;

export const DropdownSubMenu = styled.ul`
  position: absolute;
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 100%;
  margin-top: -1px;
  border-radius: 0 0.25rem 0.25rem 0.25rem;
  padding: 10px 0;
  display: none;
  z-index: 9999;
`;

export const DropdownItem = styled.li`
  ${NavMenuLink} {
    color: #333;
    padding: 8px 15px;
    text-decoration: none;

    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

export const DropdownSubMenuItem = styled.li`
  ${NavMenuLink} {
    color: #333;
    padding: 8px 15px;
    text-decoration: none;

    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

export const NavMenuItemDropdown = styled(NavMenuItem)`
  &.dropdown:hover > ${DropdownMenu} {
    display: block;
  }

  &.dropdown-submenu:hover > ${DropdownSubMenu} {
    display: block;
  }
`;
