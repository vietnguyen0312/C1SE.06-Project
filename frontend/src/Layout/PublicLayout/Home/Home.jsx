
import React, { useState,useEffect } from 'react'; 
import { 
  Container, 
  BannerSection,BannerContent,BannerLeft,BannerRight,TabContainer,TabContent,FormInput,SearchButton,
  Overlay

} from './style';
import PopularDestinations from '../../../components/PopularDestinations/PopularDestinations';
import PriceArea from '../../../components/PriceArea/PriceArea';
import OtherIssues from '../../../components/OtherIssues/OtherIssues';
import TestimonialArea from '../../../components/TestimonialArea/TestimonialArea';
import HomeAbout from '../../../components/HomeAbout/HomeAbout';
import BlogArea from '../../../components/BlogArea/BlogArea';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ButtonCPN from '../../../components/Button/Button';

function Home() {
  useEffect(()=>{
    AOS.init({duration:2000});
  },[]);

	const [activeTab, setActiveTab] = useState('flight');

	const renderTabContent = () => {
	  const inputs = [
		{ name: 'from', placeholder: 'From' },
		{ name: 'to', placeholder: 'To' },
		{ name: 'start', placeholder: 'Start Date', type: 'date' },
		{ name: 'return', placeholder: 'Return Date', type: 'date' },
		{ name: 'adults', placeholder: 'Adults', type: 'number', min: 1 },
		{ name: 'child', placeholder: 'Children', type: 'number', min: 0 },
	  ];
  
	  return (
		<form>
		  {inputs.map((input, index) => (
			<FormInput key={index} {...input} />
		  ))}
      <SearchButton>
        <ButtonCPN type="submit" text="SEARCH"/>
      </SearchButton>
		</form>
	  );
	};
 
  return (
	<>
    <BannerSection>
        <Container>
        <Overlay/>
          <BannerContent>
            <BannerLeft data-aos="fade-right" >
              <h1>Discover Amazing Places</h1>
              <p>Plan your perfect getaway with our travel services</p>
            </BannerLeft>
            <BannerRight className="col-md-4">
              <TabContainer data-aos="fade-up">
                <ul className="nav nav-tabs">
                  {['FLIGHT', 'HOTEL', 'HOLIDAY'].map((tab) => (
                    <li className="nav-item" key={tab}>
                     <button
                      className={`btn btn-light nav-link ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                      style={{ color: activeTab === tab ? '#f8b600' : 'black' }} 
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>

                    </li>
                  ))}
                </ul>
                <TabContent>
                  {renderTabContent()}
                </TabContent>
              </TabContainer>
            </BannerRight>
          </BannerContent>
        </Container>
      </BannerSection>
    <PopularDestinations/>
	  <PriceArea/>
	  <OtherIssues/>
	  <TestimonialArea/>
	  <HomeAbout />
	  <BlogArea/>
	</>
  );
}

export default Home;