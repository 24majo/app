import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main'
import reportWebVitals from './reportWebVitals';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({

});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <MantineProvider theme={theme} defaultColorScheme="light">
    <React.StrictMode>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </React.StrictMode>
  </MantineProvider>  
)

reportWebVitals()
