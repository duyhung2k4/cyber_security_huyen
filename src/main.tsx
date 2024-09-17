import App from './App.tsx';
import './index.css';
import '@mantine/core/styles.css';
import themeOverride from './theme/overrideTheme.ts';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={themeOverride}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </StrictMode>,
)
