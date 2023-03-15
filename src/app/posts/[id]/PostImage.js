'use client';
import {
  Avatar,
  Badge,
  Card,
  Col,
  Row,
  Button,
  Text,
  Grid,
  Pagination,
  Spacer,
  Divider,
  User,
  Input,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays, intervalToDuration } from 'date-fns';
import pb from '@/app/(lib)/pocketbase';
import Map from '@/app/(components)/Map';

export const PostImage = ({ post }) => {
  const picturesList = post.pictures;
  const [imageIndex, setImageIndex] = useState(0);
  const [sellerAvatar, setSellerAvatar] = useState();
  const [days, setDays] = useState(5);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 4),
      key: 'selection',
      color: '#17C964',
    },
  ]);

  useEffect(() => {
    try {
      setSellerAvatar(
        pb.getFileUrl(post.expand.seller, post.expand.seller.avatar)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Grid.Container gap={5}>
        <Grid
          sm={70}
          style={{
            width: '100%',
            maxWidth: '65%',
            height: '500px',
          }}
        >
          <Card css={{ w: '100%', h: '1500px' }}>
            <Card.Body css={{ p: 0, maxW: '100%' }}>
              <Card.Image
                src={
                  post.pictures.length != 0
                    ? `http://127.0.0.1:8090/api/files/${post.collectionName}/${post.id}/${post.pictures[imageIndex]}`
                    : '/tool.jpeg'
                }
                objectFit="cover"
                width="100%"
                height="100%"
              />
              {/* {post.pictures.lenght != 0 && (
                  <Pagination
                    loop
                    onlyDots
                    color="success"
                    total={post.pictures.length}
                    initialPage={6}
                    onChange={(page) => setImageIndex(page - 1)}
                  />
                )} */}
              <div style={{ padding: '20px' }}>
                <Badge>{post.category}</Badge>
                <Spacer y={0.5} />
                <Text h2 css={{ m: 0 }}>
                  {post.title}
                </Text>
                <Text weight="semibold" size="$sm" css={{ color: '$accents7' }}>
                  {post.price} kr per day + 100 kr base price · available today
                </Text>
                <Card.Divider />
                <Text weight="semibold">Description</Text>
                <Text weight="light">{post.description}</Text>
                <Spacer y={0.5} />
                <Text weight="semibold">Additional info</Text>

                <div style={{ display: 'flex', gap: '25px' }}>
                  <Card variant="bordered" style={{ width: '100%' }}>
                    <Card.Body css={{ p: 20 }}>
                      <Avatar src={sellerAvatar} />
                      <Text h4 style={{ margin: '15px 0px 6px 0px' }}>
                        {post.expand.seller.name}
                      </Text>
                      <Text weight="light" style={{ margin: '6px 0px' }}>
                        +47 {post.expand.seller.telephone_number}
                      </Text>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Text weight="light" style={{ margin: '6px 0px' }}>
                          Average rating:
                        </Text>
                        <Badge
                          isSquared
                          color="success"
                          css={{
                            backgroundColor: '$green200',
                            color: '$green700',
                          }}
                        >
                          5,6 / 6
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card variant="bordered" style={{ width: '100%' }}>
                    <Card.Body css={{ p: 20 }}>
                      <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,0"
                      />
                      <span
                        class="material-symbols-outlined"
                        style={{
                          fontSize: '33px',
                          color: '#0A6130                        ',
                        }}
                      >
                        location_on
                      </span>
                      <Text h4 style={{ margin: '15px 0px 6px 0px' }}>
                        Address
                      </Text>
                      <Text weight="light" style={{ margin: '6px 0px' }}>
                        {
                          post.address.match(
                            /(^[a-zA-Z0-9 ]*(?=([0-9]{4}( )[a-zA-z]+)))/
                          )[0]
                        }
                      </Text>
                      <Text weight="light" style={{ margin: '6px 0px' }}>
                        {post.address.match(/[0-9]{4}( )[a-zA-z]+$/)}
                      </Text>
                    </Card.Body>
                  </Card>
                </div>
                <Spacer y={1.5} />
                <div className="mapContainer">
                  <Map address={post.address} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Grid>
        <Grid
          sm={7}
          style={{
            maxWidth: '35%',
          }}
        >
          <Card>
            <Card.Header>
              <Text
                h3
                css={{
                  marginTop: 10,
                  marginBottom: 5,
                  marginLeft: 15,
                }}
              >
                Book equipment
              </Text>
            </Card.Header>
            <Card.Body css={{ p: 20, paddingTop: 0 }}>
              <Card.Divider />
              <DateRange
                minDate={new Date()}
                maxDate={addDays(new Date(), 90)}
                editableDateInputs={true}
                onChange={(item) => {
                  setState([item.selection]);
                  setDays(
                    intervalToDuration({
                      start: item.selection.startDate,
                      end: item.selection.endDate,
                    }).days + 1
                  );
                }}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
              <Spacer y={0.4} />
              <Button color="success">Book</Button>
              <div style={{ padding: '15px' }}>
                <Text size="$sm" style={{ textDecorationLine: 'underline' }}>
                  {days} days * {post.price}kr/day
                  <span style={{ float: 'right' }}>{post.price * days} kr</span>
                </Text>
                <Text size="$sm" style={{ textDecorationLine: 'underline' }}>
                  Base price 100 kr
                  <span style={{ float: 'right' }}>100 kr</span>
                </Text>
                <Card.Divider />
                <Text size="$sm" weight="bold">
                  Total price
                  <span style={{ float: 'right' }}>
                    {100 + post.price * days} kr
                  </span>
                </Text>
              </div>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={0.4} />
    </>
  );
};
