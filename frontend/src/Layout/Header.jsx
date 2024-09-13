import React, { useState, useEffect } from 'react';
import ServiceTypeList from '../Service/ServiceTypeList';
import axios from '../Service/axios-customize';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token !== null) {
                localStorage.removeItem('token');
                const response = await axios.post('/auth/introspect', { token });
                if (response.result.valid === true) {
                    localStorage.setItem('token', token);
                    getMyInfo();
                } else {
                    try {
                        const refreshToken = await axios.post('/auth/refresh', { token });
                        localStorage.setItem('token', refreshToken.result.token);
                        getMyInfo();
                    } catch (error) {
                        handleLogout();
                    }
                }
            }
        };

        fetchUser();
    }, []);

    const getMyInfo = async () => {
        const userInfo = await axios.get('/users/myInfo');
        setUser(userInfo.result);
    }

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            localStorage.removeItem('token');
            await axios.post('/auth/logout', { token });
            setUser(null);
            console.log('Logout successful, navigating to home page');
            navigate('/');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    }

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
                                {user ? (
                                    <>
                                        <img src={`img/${user.avatar}`} alt="" />
                                        <li>{user.username}</li>
                                        <li><a onClick={handleLogout}>Đăng xuất</a></li>
                                    </>
                                ) : (
                                    <li><a href="/authenticate">Đăng nhập</a></li>
                                )}
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
                        <div className="col-lg-4 col-md-6 banner-right">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="flight-tab" data-toggle="tab" href="#flight" role="tab" aria-controls="flight" aria-selected="true">Flights</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="hotel-tab" data-toggle="tab" href="#hotel" role="tab" aria-controls="hotel" aria-selected="false">Hotels</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="holiday-tab" data-toggle="tab" href="#holiday" role="tab" aria-controls="holiday" aria-selected="false">Holidays</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="flight" role="tabpanel" aria-labelledby="flight-tab">
                                    <form className="form-wrap">
                                        <input type="text" className="form-control" name="name" placeholder="From " onfocus="this.placeholder = ''" onblur="this.placeholder = 'From '" />
                                        <input type="text" className="form-control" name="to" placeholder="To " onfocus="this.placeholder = ''" onblur="this.placeholder = 'To '" />
                                        <input type="text" className="form-control date-picker" name="start" placeholder="Start " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Start '" />
                                        <input type="text" className="form-control date-picker" name="return" placeholder="Return " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Return '" />
                                        <input type="number" min={1} max={20} className="form-control" name="adults" placeholder="Adults " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Adults '" />
                                        <input type="number" min={1} max={20} className="form-control" name="child" placeholder="Child " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Child '" />
                                        <a href="#" className="primary-btn text-uppercase">Search flights</a>
                                    </form>
                                </div>
                                <div className="tab-pane fade" id="hotel" role="tabpanel" aria-labelledby="hotel-tab">
                                    <form className="form-wrap">
                                        <input type="text" className="form-control" name="name" placeholder="From " onfocus="this.placeholder = ''" onblur="this.placeholder = 'From '" />
                                        <input type="text" className="form-control" name="to" placeholder="To " onfocus="this.placeholder = ''" onblur="this.placeholder = 'To '" />
                                        <input type="text" className="form-control date-picker" name="start" placeholder="Start " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Start '" />
                                        <input type="text" className="form-control date-picker" name="return" placeholder="Return " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Return '" />
                                        <input type="number" min={1} max={20} className="form-control" name="adults" placeholder="Adults " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Adults '" />
                                        <input type="number" min={1} max={20} className="form-control" name="child" placeholder="Child " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Child '" />
                                        <a href="#" className="primary-btn text-uppercase">Search Hotels</a>
                                    </form>
                                </div>
                                <div className="tab-pane fade" id="holiday" role="tabpanel" aria-labelledby="holiday-tab">
                                    <form className="form-wrap">
                                        <input type="text" className="form-control" name="name" placeholder="From " onfocus="this.placeholder = ''" onblur="this.placeholder = 'From '" />
                                        <input type="text" className="form-control" name="to" placeholder="To " onfocus="this.placeholder = ''" onblur="this.placeholder = 'To '" />
                                        <input type="text" className="form-control date-picker" name="start" placeholder="Start " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Start '" />
                                        <input type="text" className="form-control date-picker" name="return" placeholder="Return " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Return '" />
                                        <input type="number" min={1} max={20} className="form-control" name="adults" placeholder="Adults " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Adults '" />
                                        <input type="number" min={1} max={20} className="form-control" name="child" placeholder="Child " onfocus="this.placeholder = ''" onblur="this.placeholder = 'Child '" />
                                        <a href="#" className="primary-btn text-uppercase">Search Holidays</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Header;