import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Donors from './components/Donors';
import FoodBankList from './../components/FoodBankList';

// Hero Section
const HeroSection = styled.div`
    padding: 40px 20px;
    display: flex;
    justify-content: space-between;

const ImgContainer = styled.div`
    max-width: 75%;
    min-height: 150px;
`;

const HeroContainer = styled.div`
    margin: 50px 30px 10px 30px;
`
const HeroTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
    font-size: 32px;
    font-weight: 500px;
    color: #000;
    margin-bottom: 30px;
`;

const CtaButton = styled.button`
    padding: 10px 20px;
    background-color: #fdac36;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #fdac36; /* Slightly darker orange */
    }
`;

const FeaturesSection = styled.section`
    padding: 50px 20px;
    background-color: #FFFFFF;
`;

const SectionTitle = styled.h3`
    font-size: 48px;
    margin-bottom: 30px;
    text-align: center;

`;

const FeaturesGrid = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const FeatureCard = styled.div`
    background-color: #FFF8E1;
    border-radius: 10px;
    padding: 40px;
    width: 400px;
    height: 300px;
    color: #424242;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`;



function Home() {
    return (
        <div>
            <Navbar />
            <HeroSection>
                <ImgContainer>
                    <img
                        alt="hero"
                        src="https://img.freepik.com/free-vector/tiny-people-standing-near-box-donation-food-delivery-volunteers-giving-healthy-grocery-goods-charity-flat-vector-illustration-social-support-humanitarian-help-community-sharing-concept_74855-21023.jpg"
                        style={{ width: '150%', borderRadius: '50px' }}
                    />
                </ImgContainer>
                <HeroContainer>
                    <HeroTitle>Harvest Share</HeroTitle>
                    <HeroSubtitle>
                        Zero Waste | Zero Hunger
                    </HeroSubtitle>
                    <HeroTitle>Our Vision</HeroTitle>
                    <HeroSubtitle>
                        Our mission is to eliminate hunger, reduce waste and <br />promote responsible consumption
                    </HeroSubtitle>
                   
                </HeroContainer>
            </HeroSection>

            <FeaturesSection>
                <SectionTitle>Our Features</SectionTitle>
                <FeaturesGrid>
                    <FeatureCard>
                        <FeatureTitle>Food Donation</FeatureTitle>
                        <FeatureText>By donating surplus food, you can help create social and environmental well-being</FeatureText>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>Receive Food</FeatureTitle>
                        <FeatureText>We'd love to partner with your charity to ensure that surplus food reaches every family in need</FeatureText>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>Smart Matching</FeatureTitle>
                        <FeatureText>Our smart algorithm matches food donations with those in need.</FeatureText>
                    </FeatureCard>
                </FeaturesGrid>
            </FeaturesSection>

            <Footer />
        </div>
    );
}

export default Home;