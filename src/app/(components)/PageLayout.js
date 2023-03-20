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

const PageLayout = ({ children }) => {
  return (
    <>
      <Container md>{children}</Container>
    </>
  );
};

export default PageLayout;
