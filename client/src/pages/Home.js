import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';

const HeroSection = styled.div`
    padding: 40px 20px;
    display: flex;
    justify-content: space-between;

`;
const ImgCotainer = styled.div`
    max-width: 50%;
`
const HeroContainer = styled.div`
    margin: 50px 30px 10px 30px;
`
const HeroTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
    font-size: 16px;
    margin-bottom: 30px;
`;

const CtaButton = styled.button`
    padding: 10px 20px;
    background-color: #fdac36; /* Earthy Orange */
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100px;

    &:hover {
        background-color: #fdac36; /* Slightly darker orange */
    }
`;

const FeaturesSection = styled.section`
    padding: 50px 20px;
    background-color: #FFFFFF; /* Clean White */
`;

const SectionTitle = styled.h3`
    font-size: 28px;
    margin-bottom: 30px;
    text-align: center;
`;

const FeaturesGrid = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const FeatureCard = styled.div`
    background-color: #FFF8E1; /* Soft Cream */
    border-radius: 10px;
    padding: 20px;
    width: 300px;
    color: #424242;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`;



function Home() {
    return (
        <div>
            <Navbar />
            <HeroSection>
                <ImgCotainer>
                    <img alt="hero" src="https://st.depositphotos.com/4425337/56671/i/450/depositphotos_566719524-stock-photo-food-donation-concept-cardboard-box.jpg" />
                </ImgCotainer>
                <HeroContainer>
                    <HeroTitle>Connecting Communities to Fight Food Insecurity</HeroTitle>
                    <HeroSubtitle>
                        HarvestShare helps distribute surplus food to those in need, reducing waste and supporting sustainable practices.
                    </HeroSubtitle>
                    <HeroTitle>Our Vision</HeroTitle>
                    <HeroSubtitle>
                       Reduce Waste | Feed the Hungry | Promote Responsible Consumption
                    </HeroSubtitle>
                </HeroContainer>
            </HeroSection>

            <FeaturesSection>
                <SectionTitle>Our Features</SectionTitle>
                <FeaturesGrid>
                    <FeatureCard>
                        <h4>Food Donation</h4>
                        <p>Connect with local farms and donors to share surplus food.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <h4>Volunteer Network</h4>
                        <p>Join our network of volunteers to help distribute food.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <h4>Smart Matching</h4>
                        <p>Our smart algorithm matches food donations with those in need.</p>
                    </FeatureCard>
                </FeaturesGrid>
            </FeaturesSection>

            <Footer />
        </div>
    );
}

export default Home;