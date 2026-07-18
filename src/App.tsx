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
  :root {
    --primary-color: #678983;
    --primary-color-hover: #54726C;
    --secondary-color: #9BCEC1;
    --secondary-color-hover: #86BAA4;
    --font-color: #181d31;
    --bg-color: #f2eee1;
    --font-size-xl: 1.75rem;
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
