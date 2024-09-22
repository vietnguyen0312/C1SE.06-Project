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
  WrapperAICD } from '../Header/style.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Thêm dòng này để tích hợp Bootstrap JS


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
                <HeaderTopLi><HeaderTopLeftLink href="#">Visit Us</HeaderTopLeftLink></HeaderTopLi>
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
                <img src="/image/favicon.ico"/>
                <span>Healing</span>
              </a>
            </Logo>
            <nav>
              <NavMenu>
                <NavMenuItem><NavMenuLink href="/">HOME</NavMenuLink></NavMenuItem>
                <NavMenuItem><NavMenuLink href="/about">ABOUT</NavMenuLink></NavMenuItem>
                <NavMenuItem><NavMenuLink href="/packages">PACKAGES</NavMenuLink></NavMenuItem>
                <NavMenuItem><NavMenuLink href="/hotels">HOTELS</NavMenuLink></NavMenuItem>
                <NavMenuItem><NavMenuLink href="#">INSURENCE</NavMenuLink></NavMenuItem>
                <NavMenuItem className="nav-item dropdown" onMouseEnter={() => setActiveDropdown('blog')} onMouseLeave={() => setActiveDropdown(null)}>
                  <NavMenuLink href="#" className="nav-link dropdown-toggle" id="blogDropdown" role="button" aria-expanded={activeDropdown === 'blog'}>
                    BLOG
                  </NavMenuLink>
                  <ul className={`dropdown-menu ${activeDropdown === 'blog' ? 'show' : ''}`} aria-labelledby="blogDropdown">
                    <li><NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="blogHome">Blog Home</NavMenuLink></li>
                    <li><NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="blog-single.html">Blog Single</NavMenuLink></li>
                  </ul>
                </NavMenuItem>
                <NavMenuItem className="nav-item dropdown" onMouseEnter={() => setActiveDropdown('pages')} onMouseLeave={() => setActiveDropdown(null)}>
                  <NavMenuLink href="#" className="nav-link dropdown-toggle" id="pagesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={activeDropdown === 'pages'}>
                    PAGES
                  </NavMenuLink>
                  <ul className={`dropdown-menu ${activeDropdown === 'pages' ? 'show' : ''}`} aria-labelledby="pagesDropdown">
                    <li><NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="elements.html">Elements</NavMenuLink></li>
                    <li className="dropdown-submenu">
                      <NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="#">Level 2</NavMenuLink>
                      <ul className="dropdown-menu">
                        <li><NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="#">Item One</NavMenuLink></li>
                        <li><NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="#">Item Two</NavMenuLink></li>
                      </ul>
                    </li>
                  </ul>
                </NavMenuItem>
                <NavMenuItem><NavMenuLink href="/contact">CONTACT</NavMenuLink></NavMenuItem>
              </NavMenu>
            </nav>
          </WrapperAICD>
        </Container>
      </MainMenu>
    </WrapperHeader>
  );
}

export default Header;
