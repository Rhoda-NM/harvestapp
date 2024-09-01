import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const ImpactPageContainer = styled.div`
  padding: 50px;
  background-color: #f7f7f7;
  color: #333;
`;

const Section = styled.section`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #2e7d32; /* Deep Forest Green */
  margin-bottom: 20px;
`;

const SectionSubtitle = styled.h3`
  font-size: 28px;
  color: #4caf50; /* Primary Green */
  margin-bottom: 15px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const HighlightedText = styled.span`
  color: #ff9800; /* Earthy Orange */
  font-weight: bold;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const StatBox = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-right: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  &:last-child {
    margin-right: 0;
  }
`;

const StatNumber = styled.h4`
  font-size: 32px;
  color: #2e7d32; /* Deep Forest Green */
  margin-bottom: 10px;
`;

const StatLabel = styled.p`
  font-size: 18px;
  color: #555;
`;

const Testimonial = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-size: 18px;
  font-style: italic;
  color: #555;
  margin-bottom: 10px;
`;

const TestimonialAuthor = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #4caf50; /* Primary Green */
`;

const ImpactPage = () => {
  return (
    <>
    <Navbar />
    <ImpactPageContainer>
      <Section>
        <SectionTitle>Impact of HarvestShare</SectionTitle>
        <Paragraph>
          At HarvestShare, our mission is to reduce food waste and combat hunger by connecting surplus food from donors directly to those in need. We believe that no one should go hungry, especially when there is enough food to go around.
        </Paragraph>
      </Section>

      <Section>
        <SectionSubtitle>By the Numbers</SectionSubtitle>
        <StatsContainer>
          <StatBox>
            <StatNumber>100,000+</StatNumber>
            <StatLabel>Meals Donated</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>500+</StatNumber>
            <StatLabel>Active Food Banks</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>10,000+</StatNumber>
            <StatLabel>Registered Donors</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>95%</StatNumber>
            <StatLabel>Reduction in Food Waste</StatLabel>
          </StatBox>
        </StatsContainer>
      </Section>

      <Section>
        <SectionSubtitle>Stories of Change</SectionSubtitle>
        <Testimonial>
          <TestimonialText>
            "As a single mother of three, I struggled to put food on the table. HarvestShare has been a lifesaver. Through their platform, I connected with a local food bank that provided fresh, nutritious meals for my children. I can’t express how grateful I am for this support."
          </TestimonialText>
          <TestimonialAuthor>– Jane, HarvestShare beneficiary</TestimonialAuthor>
        </Testimonial>

        <Testimonial>
          <TestimonialText>
            "Before HarvestShare, we had no way to efficiently donate our surplus produce. Now, every extra tomato, potato, and carrot from our farm goes directly to a food bank that feeds hundreds of families. Knowing that our food is making a difference instead of going to waste is incredibly rewarding."
          </TestimonialText>
          <TestimonialAuthor>– Mike, Local Farmer</TestimonialAuthor>
        </Testimonial>

        <Testimonial>
          <TestimonialText>
            "Volunteering with HarvestShare has been an eye-opening experience. It’s amazing to see the direct impact we can have on reducing hunger in our community."
          </TestimonialText>
          <TestimonialAuthor>– Sarah, HarvestShare Volunteer</TestimonialAuthor>
        </Testimonial>
      </Section>

      <Section>
        <SectionSubtitle>Our Vision for the Future</SectionSubtitle>
        <Paragraph>
          At HarvestShare, we’re committed to continuing our fight against hunger and food waste. Our vision is to expand our network to every corner of the country, ensuring that no food goes to waste and no person goes hungry.
        </Paragraph>
      </Section>

      <Section>
        <SectionSubtitle>Join Us in Making a Difference</SectionSubtitle>
        <Paragraph>
          The impact of HarvestShare is made possible by the collective efforts of our donors, volunteers, and partners. Whether you’re a business looking to donate surplus food, a food bank in need of resources, or an individual who wants to volunteer, there’s a place for you at HarvestShare.
        </Paragraph>
        <Paragraph>
          <HighlightedText>Get Involved Today</HighlightedText>: Help us reduce waste and feed those in need by donating surplus food, volunteering, or partnering with us.
        </Paragraph>
      </Section>
    </ImpactPageContainer>
    <Footer/>
    </>
  );
};

export default ImpactPage;
