import React from 'react'

function Home() {
    
    return (
        <>
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
                                <h1 className="mb-10">Other issues we can help you with</h1>
                                <p>We all live in an age that belongs to the young at heart. Life that is.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-other-issue">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/o1.jpg" alt />
                                </div>
                                <a href="#">
                                    <h4>Rent a Car</h4>
                                </a>
                                <p>
                                    The preservation of human life is the ultimate value, a pillar of ethics and the foundation.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-other-issue">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/o2.jpg" alt />
                                </div>
                                <a href="#">
                                    <h4>Cruise Booking</h4>
                                </a>
                                <p>
                                    I was always somebody who felt quite sorry for myself, what I had not got compared.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-other-issue">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/o3.jpg" alt />
                                </div>
                                <a href="#">
                                    <h4>To Do List</h4>
                                </a>
                                <p>
                                    The following article covers a topic that has recently moved to center stage–at least it seems.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-other-issue">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/o4.jpg" alt />
                                </div>
                                <a href="#">
                                    <h4>Food Features</h4>
                                </a>
                                <p>
                                    There are many kinds of narratives and organizing principles. Science is driven by evidence.
                                </p>
                            </div>
                        </div>
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