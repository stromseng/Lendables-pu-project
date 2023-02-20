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

/**
 * Wrapper for all pages that contain a Header, NavBar and have some padding around the content
 */
//{header && <Typography variant="h1">{header}</Typography>}

const PageLayout = ({ children }) => {
  return (
    <>
      <Container md>{children}</Container>
    </>
  );
};

export default PageLayout;
