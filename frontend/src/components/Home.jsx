import React from 'react'
import ServiceList from './Api/ServiceList'

function Home() {

    return (
        <>
            {/* End banner Area */}
            {/* Start popular-destination Area */}
            <section className="popular-destination-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-70 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">Popular Destinations</h1>
                                <p>We all live in an age that belongs to the young at heart. Life that is becoming extremely fast, day.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="single-destination relative">
                                <div className="thumb relative">
                                    <div className="overlay overlay-bg" />
                                    <img className="img-fluid" src="img/d1.jpg" alt />
                                </div>
                                <div className="desc">
                                    <a href="#" className="price-btn">$150</a>
                                    <h4>Mountain River</h4>
                                    <p>Paraguay</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-destination relative">
                                <div className="thumb relative">
                                    <div className="overlay overlay-bg" />
                                    <img className="img-fluid" src="img/d2.jpg" alt />
                                </div>
                                <div className="desc">
                                    <a href="#" className="price-btn">$250</a>
                                    <h4>Dream City</h4>
                                    <p>Paris</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-destination relative">
                                <div className="thumb relative">
                                    <div className="overlay overlay-bg" />
                                    <img className="img-fluid" src="img/d3.jpg" alt />
                                </div>
                                <div className="desc">
                                    <a href="#" className="price-btn">$350</a>
                                    <h4>Cloud Mountain</h4>
                                    <p>Sri Lanka</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End popular-destination Area */}
            {/* Start price Area */}
            <section className="price-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-70 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">We Provide Affordable Prices</h1>
                                <p>Well educated, intellectual people, especially scientists at all times demonstrate considerably.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="single-price">
                                <h4>Cheap Packages</h4>
                                <ul className="price-list">
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>New York</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Maldives</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Sri Lanka</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Nepal</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Thiland</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Singapore</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-price">
                                <h4>Luxury Packages</h4>
                                <ul className="price-list">
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>New York</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Maldives</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Sri Lanka</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Nepal</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Thiland</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Singapore</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-price">
                                <h4>Camping Packages</h4>
                                <ul className="price-list">
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>New York</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Maldives</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Sri Lanka</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Nepal</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Thiland</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Singapore</span>
                                        <a href="#" className="price-btn">$1500</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End price Area */}
            {/* Start other-issue Area */}
            <section className="other-issue-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-70 col-lg-9">
                            <div className="title text-center">
                                <h1 className="mb-10">Dịch Vụ Nổi Bật Của Chúng Tôi</h1>
                                <p>Khám phá những dịch vụ đặc biệt chúng tôi cung cấp để nâng cao trải nghiệm du lịch của bạn</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <ServiceList limit={3} />
                        <a href="/services" style={{textDecoration: 'none', color: 'green'}}>Xem Tất Cả &gt;&gt;</a>
                    </div>
                </div>
            </section>
            {/* End other-issue Area */}
            {/* Start testimonial Area */}
            <section className="testimonial-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-70 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">Testimonial from our Clients</h1>
                                <p>The French Revolution constituted for the conscience of the dominant aristocratic class a fall from </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="active-testimonial">
                            <div className="single-testimonial item d-flex flex-row">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/elements/user1.png" alt />
                                </div>
                                <div className="desc">
                                    <p>
                                        Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills, the bigger the payoff you.
                                    </p>
                                    <h4>Harriet Maxwell</h4>
                                    <div className="star">
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star" />
                                    </div>
                                </div>
                            </div>
                            <div className="single-testimonial item d-flex flex-row">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/elements/user2.png" alt />
                                </div>
                                <div className="desc">
                                    <p>
                                        A purpose is the eternal condition for success. Every former smoker can tell you just how hard it is to stop smoking cigarettes. However.
                                    </p>
                                    <h4>Carolyn Craig</h4>
                                    <div className="star">
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star" />
                                        <span className="fa fa-star" />
                                    </div>
                                </div>
                            </div>
                            <div className="single-testimonial item d-flex flex-row">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/elements/user1.png" alt />
                                </div>
                                <div className="desc">
                                    <p>
                                        Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills, the bigger the payoff you.
                                    </p>
                                    <h4>Harriet Maxwell</h4>
                                    <div className="star">
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star" />
                                    </div>
                                </div>
                            </div>
                            <div className="single-testimonial item d-flex flex-row">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/elements/user2.png" alt />
                                </div>
                                <div className="desc">
                                    <p>
                                        A purpose is the eternal condition for success. Every former smoker can tell you just how hard it is to stop smoking cigarettes. However.
                                    </p>
                                    <h4>Carolyn Craig</h4>
                                    <div className="star">
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star" />
                                        <span className="fa fa-star" />
                                    </div>
                                </div>
                            </div>
                            <div className="single-testimonial item d-flex flex-row">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/elements/user1.png" alt />
                                </div>
                                <div className="desc">
                                    <p>
                                        Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills, the bigger the payoff you.
                                    </p>
                                    <h4>Harriet Maxwell</h4>
                                    <div className="star">
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star" />
                                    </div>
                                </div>
                            </div>
                            <div className="single-testimonial item d-flex flex-row">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/elements/user2.png" alt />
                                </div>
                                <div className="desc">
                                    <p>
                                        A purpose is the eternal condition for success. Every former smoker can tell you just how hard it is to stop smoking cigarettes. However.
                                    </p>
                                    <h4>Carolyn Craig</h4>
                                    <div className="star">
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star" />
                                        <span className="fa fa-star" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End testimonial Area */}
            {/* Start home-about Area */}
            <section className="home-about-area">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-end">
                        <div className="col-lg-6 col-md-12 home-about-left">
                            <h1>
                                Did not find your Package? <br />
                                Feel free to ask us. <br />
                                We‘ll make it for you
                            </h1>
                            <p>
                                inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards especially in the workplace. That’s why it’s crucial that, as women, our behavior on the job is beyond reproach. inappropriate behavior is often laughed.
                            </p>
                            <a href="#" className="primary-btn text-uppercase">request custom price</a>
                        </div>
                        <div className="col-lg-6 col-md-12 home-about-right no-padding">
                            <img className="img-fluid" src="img/about-img.jpg" alt />
                        </div>
                    </div>
                </div>
            </section>
            {/* End home-about Area */}
            {/* Start blog Area */}
            <section className="recent-blog-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-60 col-lg-9">
                            <div className="title text-center">
                                <h1 className="mb-10">Latest from Our Blog</h1>
                                <p>With the exception of Nietzsche, no other madman has contributed so much to human sanity as has.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="active-recent-blog-carusel">
                            <div className="single-recent-blog-post item">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/b1.jpg" alt />
                                </div>
                                <div className="details">
                                    <div className="tags">
                                        <ul>
                                            <li>
                                                <a href="#">Travel</a>
                                            </li>
                                            <li>
                                                <a href="#">Life Style</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="#"><h4 className="title">Low Cost Advertising</h4></a>
                                    <p>
                                        Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer.
                                    </p>
                                    <h6 className="date">31st January,2018</h6>
                                </div>
                            </div>
                            <div className="single-recent-blog-post item">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/b2.jpg" alt />
                                </div>
                                <div className="details">
                                    <div className="tags">
                                        <ul>
                                            <li>
                                                <a href="#">Travel</a>
                                            </li>
                                            <li>
                                                <a href="#">Life Style</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="#"><h4 className="title">Creative Outdoor Ads</h4></a>
                                    <p>
                                        Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer.
                                    </p>
                                    <h6 className="date">31st January,2018</h6>
                                </div>
                            </div>
                            <div className="single-recent-blog-post item">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/b3.jpg" alt />
                                </div>
                                <div className="details">
                                    <div className="tags">
                                        <ul>
                                            <li>
                                                <a href="#">Travel</a>
                                            </li>
                                            <li>
                                                <a href="#">Life Style</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="#"><h4 className="title">It's Classified How To Utilize Free</h4></a>
                                    <p>
                                        Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer.
                                    </p>
                                    <h6 className="date">31st January,2018</h6>
                                </div>
                            </div>
                            <div className="single-recent-blog-post item">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/b1.jpg" alt />
                                </div>
                                <div className="details">
                                    <div className="tags">
                                        <ul>
                                            <li>
                                                <a href="#">Travel</a>
                                            </li>
                                            <li>
                                                <a href="#">Life Style</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="#"><h4 className="title">Low Cost Advertising</h4></a>
                                    <p>
                                        Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer.
                                    </p>
                                    <h6 className="date">31st January,2018</h6>
                                </div>
                            </div>
                            <div className="single-recent-blog-post item">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/b2.jpg" alt />
                                </div>
                                <div className="details">
                                    <div className="tags">
                                        <ul>
                                            <li>
                                                <a href="#">Travel</a>
                                            </li>
                                            <li>
                                                <a href="#">Life Style</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="#"><h4 className="title">Creative Outdoor Ads</h4></a>
                                    <p>
                                        Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer.
                                    </p>
                                    <h6 className="date">31st January,2018</h6>
                                </div>
                            </div>
                            <div className="single-recent-blog-post item">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/b3.jpg" alt />
                                </div>
                                <div className="details">
                                    <div className="tags">
                                        <ul>
                                            <li>
                                                <a href="#">Travel</a>
                                            </li>
                                            <li>
                                                <a href="#">Life Style</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="#"><h4 className="title">It's Classified How To Utilize Free</h4></a>
                                    <p>
                                        Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer.
                                    </p>
                                    <h6 className="date">31st January,2018</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home