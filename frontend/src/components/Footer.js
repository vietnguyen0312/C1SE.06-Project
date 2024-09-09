import React from 'react'

function Footer() {
    return (
        <>
            <footer className="footer-area section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3  col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h6>About Agency</h6>
                                <p>
                                    The world has become so fast paced that people don’t want to stand by reading a page of information, they would much rather look at a presentation and understand the message. It has come to a point
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h6>Navigation Links</h6>
                                <div className="row">
                                    <div className="col">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#">Feature</a></li>
                                            <li><a href="#">Services</a></li>
                                            <li><a href="#">Portfolio</a></li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li><a href="#">Team</a></li>
                                            <li><a href="#">Pricing</a></li>
                                            <li><a href="#">Blog</a></li>
                                            <li><a href="#">Contact</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3  col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h6>Newsletter</h6>
                                <p>
                                    For business professionals caught between high OEM price and mediocre print and graphic output.
                                </p>
                                <div id="mc_embed_signup">
                                    <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01" method="get" className="subscription relative">
                                        <div className="input-group d-flex flex-row">
                                            <input name="EMAIL" placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address '" required type="email" />
                                            <button className="btn bb-btn"><span className="lnr lnr-location" /></button>
                                        </div>
                                        <div className="mt-10 info" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3  col-md-6 col-sm-6">
                            <div className="single-footer-widget mail-chimp">
                                <h6 className="mb-20">InstaFeed</h6>
                                <ul className="instafeed d-flex flex-wrap">
                                    <li><img src="img/i1.jpg" alt /></li>
                                    <li><img src="img/i2.jpg" alt /></li>
                                    <li><img src="img/i3.jpg" alt /></li>
                                    <li><img src="img/i4.jpg" alt /></li>
                                    <li><img src="img/i5.jpg" alt /></li>
                                    <li><img src="img/i6.jpg" alt /></li>
                                    <li><img src="img/i7.jpg" alt /></li>
                                    <li><img src="img/i8.jpg" alt /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row footer-bottom d-flex justify-content-between align-items-center">
                        <p className="col-lg-8 col-sm-12 footer-text m-0">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                            Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
                        <div className="col-lg-4 col-sm-12 footer-social">
                            <a href="#"><i className="fa fa-facebook" /></a>
                            <a href="#"><i className="fa fa-twitter" /></a>
                            <a href="#"><i className="fa fa-dribbble" /></a>
                            <a href="#"><i className="fa fa-behance" /></a>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer