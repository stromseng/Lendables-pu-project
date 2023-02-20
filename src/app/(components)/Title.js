'use client';
import React, { FunctionComponent } from 'react';
import {
  Grid,
  Card,
  Text,
  Container,
  Row,
  Col,
  Spacer,
} from '@nextui-org/react';

const Title = ({ children }) => {
  return (
    <>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $green600 30%, $yellow600 100%',
          textAlign: 'center',
        }}
        weight="bold"
      >
        {children}
      </Text>
    </>
  );
};

export default Title;
