import {
  createSystem,
  defaultBaseConfig,
  defineConfig,
} from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: '#008055' },
        secondary: { value: '#FFFF00' },
        dark: { value: '#141414' },
        white: { value: '#FFFFFF' },
      },
      fonts: {
        body: { value: 'var(--font-geist-sans), sans-serif' },
        heading: { value: 'var(--font-geist-sans), sans-serif' },
        mono: { value: 'var(--font-geist-mono), monospace' },
      },
      fontSizes: {
        xs: { value: '10px' },
        sm: { value: '12px' },
        md: { value: '14px' },
        lg: { value: '16px' },
        xl: { value: '18px' },
        '2xl': { value: '24px' },
        '3xl': { value: '32px' },
      },
      fontWeights: {
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
      spacing: {
        xs: { value: '4px' },
        sm: { value: '8px' },
        md: { value: '16px' },
        lg: { value: '24px' },
        xl: { value: '32px' },
      },
    },
  },
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      fontFamily: 'var(--font-geist-sans), sans-serif',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
});

export const system = createSystem(defaultBaseConfig, config);
