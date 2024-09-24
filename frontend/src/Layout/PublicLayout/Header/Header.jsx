import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faDribbble, faBehance } from '@fortawesome/free-brands-svg-icons';
import {
  Container,
  HeaderSocial,
  HeaderTopLeftLink,
  HeaderTopLeftUL,
  HeaderTopLi,
  HeaderTopRight,
  WrapperAIC,
  WrapperHeader,
  WrapperHeaderTop,
  HeaderTopLeft,
  HeaderSocialLink,
  Logo,
  MainMenu,
  NavMenu,
  NavMenuItem,
  NavMenuLink,
  WrapperAICD
} from '../Header/style.js';
import ServiceTypeKList from '../../../Service/ServiceTypeList.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Thêm dòng này để tích hợp Bootstrap JS
import UserInfo from '../../../Service/UserInfo.jsx';
import BlogTypeList from '../../../Service/BlogTypeList.jsx'  



function Header() {
  const [isHeaderTopVisible, setIsHeaderTopVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHeaderTopVisible(currentScrollPos < 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <WrapperHeader className={isSticky ? 'sticky' : ''} >
      <WrapperHeaderTop isVisible={isHeaderTopVisible}>
        <Container>
          <WrapperAIC >
            <HeaderTopLeft>
              <HeaderTopLeftUL>
                <HeaderTopLi><HeaderTopLeftLink href="/about">Về chúng tôi</HeaderTopLeftLink></HeaderTopLi>
                <HeaderTopLi><HeaderTopLeftLink href="#">Buy Tickets</HeaderTopLeftLink></HeaderTopLi>
              </HeaderTopLeftUL>
            </HeaderTopLeft>
            <HeaderTopRight>
              <HeaderSocial>
                <HeaderSocialLink href="#"><FontAwesomeIcon icon={faFacebook} /></HeaderSocialLink>
                <HeaderSocialLink href="#"><FontAwesomeIcon icon={faTwitter} /></HeaderSocialLink>
                <HeaderSocialLink href="#"><FontAwesomeIcon icon={faDribbble} /></HeaderSocialLink>
                <HeaderSocialLink href="#"><FontAwesomeIcon icon={faBehance} /></HeaderSocialLink>
              </HeaderSocial>
            </HeaderTopRight>
          </WrapperAIC>
        </Container>
      </WrapperHeaderTop>
      <MainMenu>
        <Container>
          <WrapperAICD className={isSticky ? 'sticky' : ''}>
            <Logo>
              <a href="/">
                <img src="/image/favicon.ico" />
                <span>Healing</span>
              </a>
            </Logo>
            <nav>
              <NavMenu>
                <NavMenuItem><NavMenuLink href="/">Trang chủ</NavMenuLink></NavMenuItem>
                <NavMenuItem><NavMenuLink href="/about">Giới thiệu</NavMenuLink></NavMenuItem>
                <NavMenuItem className="nav-item dropdown" onMouseEnter={() => setActiveDropdown('service')} onMouseLeave={() => setActiveDropdown(null)}>
                  <NavMenuLink href="/services?page=1" className="nav-link dropdown-toggle" id="blogDropdown" role="button" aria-expanded={activeDropdown === 'service'}>
                    Dịch vụ
                  </NavMenuLink>
                  <ul className={`dropdown-menu ${activeDropdown === 'service' ? 'show' : ''}`} aria-labelledby="blogDropdown">
                    <ServiceTypeKList />
                  </ul>
                </NavMenuItem>
                <NavMenuItem><NavMenuLink href="/hotels">Khách sạn</NavMenuLink></NavMenuItem>
                <NavMenuItem><NavMenuLink href="/contact">Liên hệ</NavMenuLink></NavMenuItem>
                
                <NavMenuItem className="nav-item dropdown" onMouseEnter={() => setActiveDropdown('blog')} onMouseLeave={() => setActiveDropdown(null)}>
                  <NavMenuLink href="/blogs" className="nav-link dropdown-toggle" id="blogDropdown" role="button" aria-expanded={activeDropdown === 'blog'}>
                    Tin tức
                  </NavMenuLink>
                  <ul className={`dropdown-menu ${activeDropdown === 'blog' ? 'show' : ''}`} aria-labelledby="blogDropdown">
                    <BlogTypeList/>
                  </ul>
                </NavMenuItem>
                <UserInfo />
              </NavMenu>
            </nav>
          </WrapperAICD>
        </Container>
      </MainMenu>
    </WrapperHeader>
  );
}

export default Header;
