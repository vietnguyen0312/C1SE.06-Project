
import React, {  useEffect } from 'react';
import {
  Container,
  BannerSection, BannerContent, BannerLeft,
  Overlay

} from './style';
import PopularDestinations from '../../../components/PopularDestinations/PopularDestinations';
import BookNow from '../../../components/BookNow/BookNow';
import OtherIssues from '../../../components/OtherIssues/OtherIssues';
import TestimonialArea from '../../../components/TestimonialArea/TestimonialArea';
import BlogArea from '../../../components/BlogArea/BlogArea';
import AOS from 'aos';
import 'aos/dist/aos.css';



function Home() {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);


  return (
    <>
      <BannerSection>
        <Container>
          <Overlay />
          <BannerContent>
            <BannerLeft >
              <div className='Allison' style={{ fontSize: '170px' }} data-aos="fade-right" data-aos-delay="500">
                Healing Eco-Tourism
              </div>
              <p style={{ fontSize: '17px', marginTop: '20px', letterSpacing: '2px' }} data-aos="fade-up" data-aos-delay="500">Chào Mừng Quý Khách Đến Với Chúng Tôi
              </p>
            </BannerLeft>
          </BannerContent>
        </Container>
      </BannerSection>
      <PopularDestinations />
      <BookNow />
      <OtherIssues />
      <BlogArea />
    </>
  );
}

export default Home;