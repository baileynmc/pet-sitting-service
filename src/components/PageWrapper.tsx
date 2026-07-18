import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15%;
  padding-top: 2%;
  padding-bottom: 5%;

  @media (max-width: 992px) {
    padding: 5%;
  }
`;
