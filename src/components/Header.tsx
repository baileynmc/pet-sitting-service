import { Link } from 'react-router';
import styled from 'styled-components';

interface HeaderProps {
  title: string;
  logo: React.ReactNode;
  children: React.ReactNode;
}

const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #e6ddc4;
  border-bottom: 1px solid #e0e0e0;
  height: 80px;
`;

const HeaderLogo = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  max-height: 50px;
  align-items: center;
  text-decoration: none;
  color: var(--font-color);
`;

const HeaderTitle = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: bold;
`;

export const Header = ({ title, logo, children }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderLogo to="/">
        {logo}
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderLogo>
      {children}
    </HeaderContainer>
  );
};
