import React from 'react';
import { ThemeProvider } from 'styled-components';
import Button from 'components/atoms/Button/Button';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';

import Heading from 'components/atoms/Heading/Heading';

function App() {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>
          <Heading>Test</Heading>
          <h1>Hello World!</h1>
          <Button>Close / Save</Button>
          <Button secondary>Remove</Button>
        </>
      </ThemeProvider>
    </div>
  );
}

export default App;
