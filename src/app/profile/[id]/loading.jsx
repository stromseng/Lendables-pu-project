'use client';
import { Card } from '@nextui-org/react';
import { Text } from '@nextui-org/react';
import Rating from '@mui/material/Rating';
import { Grid } from '@nextui-org/react';

export default function Loading() {
  return (
    <>
      <Card>
        <Card.Header>
          <Grid.Container alignItems="center">
            <Grid xs={12}>
              <Text h3>Loading...</Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Divider />
        <Card.Body></Card.Body>
        <Card.Divider />
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
}
