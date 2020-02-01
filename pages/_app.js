import App from 'next/app';
import React from 'react';
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';

const cache = createCache();

Object.assign(theme, {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#7395AE',
    secondary: '#557A95',
    muted: '#379683',
    gray: '#5D5C61',
    highlight: '#51A296'
  },
});

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <Global
            styles={css`
              ${emotionNormalize}
              html,
              body {
                padding: 0;
                margin: 0;
                min-height: 100%;
                font-family: Helvetica, Arial, sans-serif;
              }
            `}
          />
          <Component {...pageProps} />
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
