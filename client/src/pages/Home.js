import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';

// Hero Section
const HeroSection = styled.div`
    padding: 40px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff; /* Primary Green */
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
    color: #fdac36
`;

const HeroSubtitle = styled.p`
    font-size: 32px;
    font-weight: 500px;
    color: #000;
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

    &:hover {
        background-color: #f57c00; /* Slightly darker orange */
    }
`;

// Counters Section
const CountersSection = styled.section`
    padding: 50px 20px;
    display: flex;
    justify-content: space-around;
    background-color: #FFF8E1; /* Soft Cream */
`;

const Counter = styled.div`
    text-align: center;
    color: #424242;
`;

const CounterNumber = styled.h2`
    font-size: 48px;
    margin-bottom: 10px;
    color: #2E7D32; /* Deep Forest Green */
`;

const CounterLabel = styled.p`
    font-size: 18px;
`;

// Features Section
const FeaturesSection = styled.section`
    padding: 50px 20px;
    background-color: #FFFFFF; /* Clean White */
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
`

const FeatureText = styled.p`
    font-size: 24px;
`

const FeatureCard = styled.div`
    background-color: #FFF8E1; /* Soft Cream */
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
    background-color: #fff; /* Light Gray */
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
    display: block;
    background-color: #FFF8E1; /* Soft Cream */
`;

const Testimonial = styled.div`
    text-align: center;
    margin-bottom: 40px;
`;

const TestimonialText = styled.p`
    font-size: 16px;
    font-style: italic;
    color: #424242;
    margin-bottom: 10px;
`;

const TestimonialAuthor = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #2E7D32; /* Deep Forest Green */
`;

// FAQ Section
const FaqSection = styled.section`
    padding: 50px 20px;
    background-color: #FFFFFF; /* Clean White */
`;

const FaqItem = styled.div`
    margin-bottom: 20px;
`;

const FaqQuestion = styled.h2`
    font-size: 18px;
    font-weight: bold;
    color: #2E7D32; /* Deep Forest Green */
`;

const FaqAnswer = styled.p`
    font-size: 16px;
    color: #424242;
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
                   
                    <HeroSubtitle>
                        Our mission is to eliminate hunger, reduce waste and <br />promote responsible consumption
                    </HeroSubtitle>
                   
                </HeroContainer>
            </HeroSection>

            <CountersSection>
                <Counter>
                    <CounterNumber>150</CounterNumber>
                    <CounterLabel>Current Food Banks</CounterLabel>
                </Counter>
                <Counter>
                    <CounterNumber>10,000</CounterNumber>
                    <CounterLabel>Available Donations</CounterLabel>
                </Counter>
            </CountersSection>

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

            <AboutSection>
                <SectionTitle>About Us</SectionTitle>
                <AboutText>
                    HarvestShare is a community-driven platform dedicated to reducing food waste and fighting hunger. We connect food donors, volunteers, and recipients to ensure that surplus food reaches those who need it most. Our mission is to create a more sustainable and equitable food distribution system that benefits everyone.
                </AboutText>
            </AboutSection>

            <TestimonialsSection>
                <SectionTitle>Testimonials</SectionTitle>
                <Testimonial>
                    <TestimonialText>
                        "HarvestShare has made it so easy for us to donate our surplus produce. Knowing that our food is going to families in need gives us immense satisfaction."
                    </TestimonialText>
                    <TestimonialAuthor>- Local Farmer</TestimonialAuthor>
                </Testimonial>
                <Testimonial>
                    <TestimonialText>
                        "As a volunteer, I feel like I'm truly making a difference. HarvestShare's platform is easy to use, and I love being part of such a meaningful cause."
                    </TestimonialText>
                    <TestimonialAuthor>- Volunteer</TestimonialAuthor>
                </Testimonial>
            </TestimonialsSection>

            <FaqSection>
                <SectionTitle>Frequently Asked Questions</SectionTitle>
                <FaqItem>
                    <FaqQuestion>How do I become a donor?</FaqQuestion>
                    <FaqAnswer>
                        You can register as a donor on our platform by clicking on the "Register" button and choosing the donor option. After registering, you'll be able to list any surplus food you have available for donation.
                    </FaqAnswer>
                </FaqItem>
                <FaqItem>
                    <FaqQuestion>How can I volunteer?</FaqQuestion>
                    <FaqAnswer>
                        To become a volunteer, simply sign up on our platform and join our network of volunteers. You can then select available tasks such as food pickup and delivery to those in need.
                    </FaqAnswer>
                </FaqItem>
                <FaqItem>
                    <FaqQuestion>Who can receive donations?</FaqQuestion>
                    <FaqAnswer>
                        Our donations are available to registered food banks, shelters, and other community organizations that serve people in need.
                    </FaqAnswer>
                </FaqItem>
            </FaqSection>

            <Footer />
        </div>
    );
}

export default Home;
