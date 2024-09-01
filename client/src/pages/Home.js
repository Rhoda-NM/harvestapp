import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Donors from '../components/Donors';
import FoodBankList from './../components/FoodBankList';

// Hero Section
const HeroSection = styled.div`
    padding: 40px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    color: #333;
`;

const ImgContainer = styled.div`
    max-width: 75%;
    min-height: 150px;
`;

const HeroContainer = styled.div`
    margin: 10px 10px 10px 60px;
`;

const HeroTitle = styled.h1`
    font-size: 48px;
    margin-bottom: 50px;
    font-weight: 600px;
    color: #fdac36;
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
        background-color: #f57c00;
    }
`;

// Counters Section
const CountersSection = styled.section`
    padding: 50px 20px;
    display: flex;
    justify-content: space-around;
    background-color: #FFF8E1;
`;

const Counter = styled.div`
    text-align: center;
    color: #424242;
`;

const CounterNumber = styled.h2`
    font-size: 48px;
    margin-bottom: 10px;
    color: #2E7D32;
`;

const CounterLabel = styled.p`
    font-size: 18px;
`;

// Features Section
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

const FeatureTitle = styled.h2`
    font-size: 40px;
    padding: 20px 0;
`;

const FeatureText = styled.p`
    font-size: 24px;
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
    align-items: center;
`;

// About Us Section
const AboutSection = styled.section`
    padding: 50px 20px;
    background-color: #fff;
    text-align: center;
`;

const AboutText = styled.p`
    font-size: 24px;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
`;

// Testimonials Section
const TestimonialsSection = styled.section`
    padding: 50px 20px;
    background-color: #f9f9f9; /* Light Gray for contrast */
`;

const TestimonialContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
`;

const TestimonialCard = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 30px;
    width: 100%;
    max-width: 600px;
    text-align: center;
    position: relative;
`;

const AuthorImage = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
    position: absolute;
    top: -30px;
    left: calc(50% - 30px);
    border: 3px solid #fdac36; /* Match the CTA Button color */
`;

const TestimonialText = styled.p`
    font-size: 18px;
    font-style: italic;
    color: #424242;
    margin: 20px 0 10px;
`;

const TestimonialAuthor = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #2E7D32; /* Deep Forest Green */
    margin: 0;
`;

function Testimonials() {
    return (
        <TestimonialsSection>
            <SectionTitle>Testimonials</SectionTitle>
            <TestimonialContainer>
                <TestimonialCard>
                    <AuthorImage src="https://via.placeholder.com/60" alt="Jane Doe" />
                    <TestimonialText>
                        "Harvest Share has made it so easy for our restaurant to donate surplus food. Knowing that our food is going to those in need, rather than the landfill, is incredibly rewarding."
                    </TestimonialText>
                    <TestimonialAuthor>- Jane Doe, Restaurant Owner</TestimonialAuthor>
                </TestimonialCard>
                <TestimonialCard>
                    <AuthorImage src="https://via.placeholder.com/60" alt="John Smith" />
                    <TestimonialText>
                        "As a volunteer, I love being part of a community that’s making a real difference in the fight against hunger."
                    </TestimonialText>
                    <TestimonialAuthor>- John Smith, Volunteer</TestimonialAuthor>
                </TestimonialCard>
            </TestimonialContainer>
        </TestimonialsSection>
    );
}

// FAQ Section
const FaqSectionContainer = styled.section`
    padding: 50px 20px;
    background-color: #FFFFFF;
`;

const FaqItem = styled.div`
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
`;

const FaqQuestion = styled.h2`
    font-size: 18px;
    font-weight: bold;
    color: #2E7D32;
    cursor: pointer;
    margin: 0;

    &:hover {
        color: #f57c00;
    }
`;

const FaqAnswer = styled.p`
    font-size: 16px;
    color: #424242;
    margin: 10px 0 0;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

function FaqItemComponent({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <FaqItem>
            <FaqQuestion onClick={() => setIsOpen(!isOpen)}>
                {question}
            </FaqQuestion>
            <FaqAnswer isOpen={isOpen}>{answer}</FaqAnswer>
        </FaqItem>
    );
}

function FaqSection() {
    return (
        <FaqSectionContainer>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <FaqItemComponent
                question="How do I become a donor?"
                answer="You can register as a donor on our platform by clicking on the 'Register' button and choosing the donor option. After registering, you'll be able to list any surplus food you have available for donation."
            />
            <FaqItemComponent
                question="How can I volunteer?"
                answer="To become a volunteer, simply sign up on our platform and join our network of volunteers. You can then select available tasks such as food pickup and delivery to those in need."
            />
            <FaqItemComponent
                question="Who can receive donations?"
                answer="Our donations are available to registered food banks, shelters, and other community organizations that serve people in need."
            />
        </FaqSectionContainer>
    );
}

// Available Donors Section
const DonorsSection = styled.section`
    padding: 50px 20px;
    background-color: #FFFFFF;
`;

const DonorsSectionTitle = styled.h3`
    font-size: 48px;
    margin-bottom: 30px;
    text-align: center;
`;

function AvailableDonors() {
    return (
        <DonorsSection>
            <DonorsSectionTitle>Available Donors</DonorsSectionTitle>
            <Donors />
        </DonorsSection>
    );
}

// Available Food Banks Section
const FoodBanksSection = styled.section`
    padding: 50px 20px;
    background-color: #FFF8E1;
`;

const FoodBanksSectionTitle = styled.h3`
    font-size: 48px;
    margin-bottom: 30px;
    text-align: center;
`;

function AvailableFoodBanks() {
    return (
        <FoodBanksSection>
            <FoodBanksSectionTitle>Available Food Banks</FoodBanksSectionTitle>
            <FoodBankList />
        </FoodBanksSection>
    );
}

// Footer Section
const FooterContainer = styled.footer`
    background-color: #2E7D32;
    padding: 20px 0;
    color: #fff;
    text-align: center;
`;

const FooterText = styled.p`
    margin: 0;
    font-size: 16px;
`;

// Home Component
function Home() {
    
    return (
        <>
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
                    <HeroSubtitle>
                        Our mission is to eliminate hunger, reduce waste and <br />promote responsible consumption
                    </HeroSubtitle>
                </HeroContainer>
            </HeroSection>

            <CountersSection>
                <Counter>
                    <CounterNumber>200+</CounterNumber>
                    <CounterLabel>Donors</CounterLabel>
                </Counter>
                <Counter>
                    <CounterNumber>150+</CounterNumber>
                    <CounterLabel>Food Banks</CounterLabel>
                </Counter>
                <Counter>
                    <CounterNumber>500+</CounterNumber>
                    <CounterLabel>Donations Made</CounterLabel>
                </Counter>
            </CountersSection>
            <FeaturesSection>
                <SectionTitle>Our Key Features</SectionTitle>
                <FeaturesGrid>
                    <FeatureCard>
                        <FeatureTitle>Easy Donations</FeatureTitle>
                        <FeatureText>Quickly list your surplus food items and connect with local food banks.</FeatureText>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>Community Impact</FeatureTitle>
                        <FeatureText>Join a network of donors and volunteers making a difference.</FeatureText>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>Efficient Management</FeatureTitle>
                        <FeatureText>Track your donations and manage your profiles with ease.</FeatureText>
                    </FeatureCard>
                </FeaturesGrid>
            </FeaturesSection>
            <AboutSection>
                <SectionTitle>About Us</SectionTitle>
                <AboutText>
                    Harvest Share is dedicated to reducing food waste and fighting hunger. Our platform connects generous donors with local food banks and shelters, making it easy to give surplus food to those who need it most.
                </AboutText>
            </AboutSection>
            <AvailableDonors />
            <AvailableFoodBanks />
            <Testimonials />
            <FaqSection />
            <FooterContainer>
                <FooterText>&copy; 2024 Harvest Share. All rights reserved.</FooterText>
                <FooterText>Contact us at: support@harvestshare.org</FooterText>
            </FooterContainer>
        </>
    );
}

export default Home;
