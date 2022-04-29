import { config, dom } from '@fortawesome/fontawesome-svg-core';
import NextHead from 'next/head';
import React, { FC } from 'react';

config.autoAddCss = false;

const Head: FC = () => (
  <NextHead>
    <title>Twilio Kanban</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <style>{ dom.css() }</style>
  </NextHead>
);

export default Head;
