import { routes } from './routes';
import { RouterProvider } from 'react-router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }
  html {
    scroll-behavior: smooth;
  }
  :root {
    --primary-color: #547872;
    --primary-color-hover: #476761;
    --secondary-color: #9BCEC1;
    --secondary-color-hover: #86BAA4;
    --font-color: #181d31;
    --bg-color: #f2eee1;
    --card-color: #faf7ed;
    --card-color-hover: #fdfcf6;
    --font-size-xl: 2.25rem;
    --font-size-lg: 1.25rem;
    --font-size-md: 1rem;
    --font-size-sm: 0.75rem;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
