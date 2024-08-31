import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fff; /* Deep Forest Green */
`;
const NavDecorator = styled.nav`
    background-color: #215732;
    width: 100%;
    height: 60px;
`

const Logo = styled.h1`
     /* Clean White */
    font-size: 24px;
    font-weight: bold;
`;

const NavLinks = styled.ul`
    list-style: none;
    display: flex;
    gap: 20px;
`;

const NavLink = styled.a`
    text-decoration: none;
    font-size: 20px;
    color: #000;
    &:hover {
        text-decoration: underline;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: ${props => props.primary ? '#4CAF50' : '#FF9800'}; /* Primary Green or Earthy Orange */
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.primary ? '#388E3C' : '##fdac36'}; /* Darker shades for hover */
    }
`;

function Navbar() {
    return (
        <>
        <NavDecorator />
        <NavbarContainer>
            <Logo>HarvestShare</Logo>
            <NavLinks>
                <li><NavLink href="#features">About Us</NavLink></li>
                <li><NavLink href="#about">Our Work</NavLink></li>
                <li><NavLink href="#contact">Get Involved</NavLink></li>
                <li><NavLink href="#contact">Our Impact</NavLink></li>
            </NavLinks>
            <ButtonContainer>
                <Button primary>Register</Button>
                <Button>Login</Button>
            </ButtonContainer>
        </NavbarContainer>
        </>
    );
}

export default Navbar;