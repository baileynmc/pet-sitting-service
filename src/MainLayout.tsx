import { Outlet } from 'react-router';
import { Header } from './components/Header';
import { DogShield } from './assets/DogShield';
import styled from 'styled-components';
import { RouterButton } from './components/RouterButton';

const AppContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: var(--bg-color);
  color: var(--font-color);
  font-size: var(--font-size-md);
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const MainLayout = () => {
  return (
    <AppContainer>
      <Header title="Precious Petsitting" logo={<DogShield />}>
        <RouterButton to="/admin">Admin View</RouterButton>
      </Header>

      <main>
        <Outlet />
      </main>
    </AppContainer>
  );
};
