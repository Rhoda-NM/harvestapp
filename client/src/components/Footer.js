import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const FooterSection = ({ title, links }) => {
  return (
    <SectionFooter>
      <SectionTitle>{title}</SectionTitle>
      {links && (
        <LinkList>
          {links.map((link, index) => (
            <Item key={index}>
              <AnchorIcon href={link.href}>
                <FontAwesomeIcon icon={link.icon} />
              </AnchorIcon>
            </Item>
          ))}
        </LinkList>
      )}
    </SectionFooter>
  );
};
const Section = ({ title, links }) => {
  return (
    <SectionFooter>
      <SectionTitle>{title}</SectionTitle>
      {links && (
        <Link>
          {links.map((link, index) => (
            <LinkItem key={index}>
              <LinkAnchor href={link.href}>{link.text}</LinkAnchor>
            </LinkItem>
          ))}
        </Link>
      )}
    </SectionFooter>
  );
};

const SectionFooter = styled.div`
  display: flex;
  margin: 0 5rem;
  flex-direction: column;
  justify-content: start;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--Text, #fafafa);
  margin: 0 0 24px;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;
const Link = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 16px;
`;
const Item = styled.li`
  margin: 0 15px 16px 15px;
`;

const AnchorIcon = styled.a`
  font-size: 24px;
  font-weight: 400;
  color: var(--Text, #fafafa);
  text-decoration: none;
  &:hover {
    font-size: 32px;
  }
`;

const LinkAnchor = styled.a`
  font-size: 16px;
  font-weight: 400;
  color: var(--Text, #fafafa);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const supportLinks = [
    { text: "5th Avenue Broadway street Nrb", href: "#" },
    { text: "harveshtshare@gmail.com", href: "mailto:harvestshare@gmail.com" },
    { text: "+254-733-435-531", href: "tel:+254733435531" },
  ];

  const quickLinks = [
    { text: "Facebook", icon: faFacebookF, href: "#" },
    { text: "Instagram", icon: faInstagram, href: "#" },
    { text: "X", icon: faTwitter, href: "#" },
    { text: "Tiktok", icon: faTiktok, href: "#" },
  ];

  return (
    <FooterWrapper>
      <FooterContent>
        <Section title="Support" links={supportLinks} />
        <FooterSection title="Contact Us" links={quickLinks} />
      </FooterContent>
      <FooterDivider />
      <FooterBottom>
        <CopyrightText>
          <p>© 2024 HarvestShare. All rights reserved.</p>
        </CopyrightText>
      </FooterBottom>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #215732; /* Deep Forest Green */
  color: #ffffff; /* Clean White */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 30px 30px 5px 0;
  @media (max-width: 991px) {
    padding: 20px 15px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FooterDivider = styled.hr`
  opacity: 0.4;
  background-color: #fff;
  height: 1px;
  border: none;
  margin: 10px 0 10px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 5px;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--Primary, #fff);
  font: 400 16px Poppins, sans-serif;
`;

const CopyrightText = styled.p`
  margin: 0;
`;

export default Footer;
