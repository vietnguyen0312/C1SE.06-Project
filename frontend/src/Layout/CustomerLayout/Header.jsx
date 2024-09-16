import React from 'react';
import ServiceTypeList from '../../Service/ServiceTypeList';
import Authorization from '../../Service/Authorization';

function Header() {
    return (
        <>
            <header id="header">
                <div className="header-top">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-sm-6 col-6 header-top-left">
                                <ul>
                                    <li><a href="#">Về chúng tôi</a></li>
                                    <li><a href="#">Mua vé</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-6 header-top-right">
                                <div className="header-social">
                                    <a href="#"><i className="fa fa-facebook" /></a>
                                    <a href="#"><i className="fa fa-twitter" /></a>
                                    <a href="#"><i className="fa fa-dribbble" /></a>
                                    <a href="#"><i className="fa fa-behance" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container main-menu">
                    <div className="row align-items-center justify-content-between d-flex">
                        <div id="logo">
                            <a href="/"><img src="img/logo.png" alt title /></a>
                        </div>
                        <nav id="nav-menu-container">
                            <ul className="nav-menu">
                                <li><a href="/">Trang chủ</a></li>
                                <li className="menu-has-children"><a href="/services">Dịch vụ</a>
                                    <ul>
                                        <ServiceTypeList />
                                    </ul>
                                </li>
                                <li><a href="/hotels">Khách sạn</a></li>
                                <li><a href="/contact">Liên hệ</a></li>
                                <li><a href="/news">Tin tức</a></li>
                                <Authorization />
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            {/* start banner Area */}
            <section className="banner-area relative">
                <div className="overlay overlay-bg" />
                <div className="container">
                    <div className="row fullscreen align-items-center justify-content-between">
                        <div className="col-lg-6 col-md-6 banner-left">
                            <h6 className="text-white">Away from monotonous life</h6>
                            <h1 className="text-white">Magical Travel</h1>
                            <p className="text-white">
                                If you are looking at blank cassettes on the web, you may be very confused at the difference in price. You may see some for as low as $.17 each.
                            </p>
                            <a href="#" className="primary-btn text-uppercase">Get Started</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Header;