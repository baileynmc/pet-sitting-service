import styled from 'styled-components';

export const Footer = styled.div`
  display: flex;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 50px;
  box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--secondary-color);
  padding: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: var(--font-size-md);
  font-weight: 600;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 55%;
  @media (max-width: 992px) {
    width: 90%;
  }
`;
