'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import {createTheme} from './theme';
import { useMediaQuery } from '@mui/material';


export default function ThemeRegister({ children }: { children: React.ReactNode }) {

  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  const theme = React.useMemo(
    () => createTheme({ prefersLightMode }),
    [prefersLightMode]
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
