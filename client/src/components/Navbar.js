import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from "./AuthContext"; 
import { useNavigate, Link } from 'react-router-dom';

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
`;

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
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.primary ? "#4CAF50" : "#FF9800"}; /* Primary Green or Earthy Orange */
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#388E3C" : "##fdac36"}; /* Darker shades for hover */
  }
`;
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled(Button)`
  background-color: #4CAF50; /* Primary Green */
  &:hover {
    background-color: #388E3C; /* Darker shade of green */
  }
`;

const DropdownContent = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const DropdownItem = styled(Link)`
  color: #424242; /* Charcoal Gray */
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    color: #000;
    text-decoration: underline;
    text-decoration-color: #fdac36;
  }
`;

function Navbar() {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropDownOpen] = useState(false);

  const toggleDropDown = () => setDropDownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout(); // Call the logout function from your AuthContext
    navigate("/"); // Navigate to the homepage after logout
  };
  return (
    <>
      <NavDecorator />
      <NavbarContainer>
        <Logo>HarvestShare</Logo>
        <NavLinks>
        <li>
          <Link to="/"><NavLink href='#'>Home</NavLink></Link>
          </li>
          <li>
            <NavLink href="#about">About Us</NavLink>
          </li>
          <li>
            <NavLink href="#features">Features</NavLink>
          </li>
          
          <li>
            <NavLink href="#contact">Our Impact</NavLink>
          </li>
          
          
        </NavLinks>
        <ButtonContainer>
            <DropdownContainer>
                <DropdownButton onClick={toggleDropDown}>Register</DropdownButton>
                <DropdownContent isOpen={isDropdownOpen}>
                <Link><DropdownItem to="/donor/register">As Donor</DropdownItem></Link>
                <DropdownItem to="/bank/register">As Food Bank</DropdownItem>
                </DropdownContent>
            </DropdownContainer>
          {isLoggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ): (
            <Link to="/login"><Button>Login</Button></Link>
          )}
          
        </ButtonContainer>
      </NavbarContainer>
    </>
  );
}

export default Navbar;
