import { Link } from 'react-router';
import styled from 'styled-components';

const StyledRouterLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: var(--secondary-color);
  color: var(--font-color);
  text-decoration: none;
  font-size: var(--font-size-md);
  text-transform: uppercase;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Merriweather', sans-serif;
  text-align: center;
  &:hover {
    background-color: var(--secondary-color-hover);
  }
`;
interface RouterButtonProps {
  to: string;
  children: React.ReactNode;
}

export const RouterButton = ({ to, children }: RouterButtonProps) => {
  return <StyledRouterLink to={to}>{children}</StyledRouterLink>;
};
