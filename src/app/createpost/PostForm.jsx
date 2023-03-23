'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import {
  Button,
  Card,
  Container,
  Dropdown,
  Input,
  Spacer,
  Text,
  Textarea,
  useTheme,
  Image,
} from '@nextui-org/react';

//Import pocketbase
import pb from '../(lib)/pocketbase';

//React Hook Form
import { useForm } from 'react-hook-form';

//Custom hooks
import useCoords from '../(hooks)/useCoords';

import { PaperPlus } from 'react-iconly';

function getFirstItemOfSet(set) {
  for (let item of set) {
    if (item) {
      return item;
    }
  }
  return undefined;
}

export default function PostForm() {
  //Form Hooks
  const [selectedCategory, setSelectedCategory] = React.useState('Category');
  const [city, setCity] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');
  const { theme } = useTheme();

  //Google maps
  const { getCoords } = useCoords();

  //Router Hook
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    resetField,
  } = useForm();

  function retriveZipaddress(zipcode) {
    setZipcode(zipcode);
    if (zipcode.length === 4) {
      getCoords(`${zipcode} Norway`).then((data) => {
        try {
          setCity(
            data.formatted_address.match(
              /[ÆØÅæøåa-zA-Z]+(?=(, Norway|, Norge))/
            )[0]
          );
        } catch (error) {
          console.log(error);
        }
      });
    } else setCity(' ');
  }

  //Create record from form data and selected files
  const pbCreateAd = async (data, selectedCategory, city) => {
    const formData = new FormData();
    //Append form data to formData
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('seller', pb.authStore.model.id);
    let category = getFirstItemOfSet(selectedCategory);
    formData.append('category', category);
    formData.append('streetAddress', data.streetAddress);
    formData.append('zipcode', data.zipcode);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    //For each file, append to formData
    for (let i = 0; i < data.pictures.length; i++) {
      formData.append('pictures', data.pictures[i]);
    }
    //Append city to formData
    formData.append('city', city);
    console.log('Form Data before sending to pb:', formData);
    //Try to create record in pocketbase
    const result = await pb.collection('advertisements').create(formData);
    return result;
  };

  //Handle form submit
  const onSubmit = (data) => {
    console.log('Form Data:', data);
    console.log('Form Data:', {
      Title: data.title,
      Category: { selectedCategory },
      Description: data.description,
      Price: data.price,
      streetAddress: data.streetAddress,
      Zipcode: data.zipcode,
    });
    pbCreateAd(data, selectedCategory, city)
      .then((result) => {
        // success...
        console.log('Result:', result);
        router.push(`/posts/${result.id}`);
      })
      .catch((error) => {
        // error...
        console.log('Error:', error);
        console.log('Data:', error.data);
        let errorMessages = new Set();
        for (const [key, value] of Object.entries(error.data.data)) {
          console.log(key, value.message);
          errorMessages.add(key + ':' + value.message + ' ');
        }
      });
  };

  //Needed in order to check for zipcode error, as well as retrive zipcode area name from Google Geocode API
  const customZipcodeRegister = register('zipcode', {
    required: 'Zipcode is required.',
    pattern: {
      value: /^[0-9]{4}$/i,
      message: 'Not a valid zipcode.',
    },
  });

  const customPictureRegister = register('pictures');

  return (
    <>
      <Container xs css={{ p: 30, width: 500 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card css={{ width: '100%' }}>
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '25px',
                padding: '25px',
              }}
            >
              <Text
                h2
                css={{
                  as: 'center',
                  m: 0,
                }}
              >
                Create Post
              </Text>
              <Input
                clearable
                bordered
                fullWidth
                size="lg"
                label="Title"
                {...register('title', {
                  required: 'Title is required.',
                })}
                helperText={errors.title?.message}
                helperColor={'error'}
              ></Input>
              <div>
                <Text
                  css={{
                    marginTop: '0.2rem',
                    marginBottom: '0.375rem',
                  }}
                >
                  Category
                </Text>
                <Dropdown>
                  <Dropdown.Button
                    color={'success'}
                    flat
                    css={{
                      width: '100%',
                    }}
                  >
                    {selectedCategory}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={selectedCategory}
                    onSelectionChange={setSelectedCategory}
                  >
                    <Dropdown.Item key="Electronics">Electronics</Dropdown.Item>
                    <Dropdown.Item key="Tools">Tools</Dropdown.Item>
                    <Dropdown.Item key="Cars">Cars</Dropdown.Item>
                    <Dropdown.Item key="Power Tools">Power Tools</Dropdown.Item>
                    <Dropdown.Item key="Hobby">Hobby</Dropdown.Item>
                    <Dropdown.Item key="Other">Other</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Textarea
                clearable
                bordered
                fullWidth
                size="lg"
                label="Description"
                {...register('description', {
                  required: 'Description is required.',
                })}
                helperText={errors.description?.message}
                helperColor={'error'}
              ></Textarea>
              <Input
                clearable
                bordered
                fullWidth
                size="lg"
                label="Price"
                placeholder="Kr."
                {...register('price', {
                  required: 'Price is required.',
                })}
                helperText={errors.price?.message}
                helperColor={'error'}
              ></Input>
              <div>
                <Text>Pictures</Text>
                <Card variant="bordered">
                  <Card.Body css={{ p: 10 }}>
                    {watch('pictures')?.length >= 1 ? (
                      Array.from(watch('pictures')).map((picture, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            gap: '20px',
                            margin: '7px',
                          }}
                        >
                          <div style={{ height: '50px', width: '50px' }}>
                            <Image
                              src={URL.createObjectURL(picture)}
                              alt="Default Image"
                              objectFit
                              width={50}
                              height={50}
                              style={{ borderRadius: '15px' }}
                              css={{ m: 0, marginInline: 0, display: '' }}
                            />
                          </div>
                          <Text size="$sm" weight="light" css={{ m: 0 }}>
                            {picture.name}
                          </Text>
                        </div>
                      ))
                    ) : (
                      <Text
                        size="$sm"
                        weight="light"
                        css={{ textAlign: 'center' }}
                      >
                        No pictures uploaded
                      </Text>
                    )}
                  </Card.Body>
                </Card>
                <Spacer y={1} />
                <label class="custom-file-upload">
                  <input
                    {...customPictureRegister}
                    type="file"
                    multiple
                    onChange={(e) => {
                      customPictureRegister.onChange(e);
                    }}
                  />
                  <PaperPlus
                    set="bold"
                    primaryColor={theme.colors.green600.value}
                  />
                  <Text
                    b
                    size={'$sm'}
                    css={{ color: '$green600', whiteSpace: 'nowrap' }}
                  >
                    Upload pictures
                  </Text>
                </label>
              </div>

              <Input
                {...register('phone')}
                clearable
                bordered
                fullWidth
                size="lg"
                label="Phone Number"
                labelLeft="+47"
              ></Input>
              <Input
                {...register('email')}
                clearable
                bordered
                fullWidth
                size="lg"
                label="Email"
              ></Input>
              <Input
                clearable
                bordered
                fullWidth
                size="lg"
                label="Street Address"
                {...register('streetAddress', {
                  required: 'Street Address is required.',
                })}
                helperText={errors.streetAddress?.message}
                helperColor={'error'}
              ></Input>
              <div style={{ display: 'flex', gap: '15px' }}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  size="lg"
                  label="Zipcode"
                  {...customZipcodeRegister}
                  helperText={errors.zipcode?.message}
                  helperColor={'error'}
                  onChange={(e) => {
                    customZipcodeRegister.onChange(e);
                    retriveZipaddress(e.target.value);
                  }}
                ></Input>
                <Input
                  readOnly
                  fullWidth
                  size="lg"
                  value={city}
                  label="City"
                  css={{
                    $$inputColor: theme.colors.accents1.value,
                    '& input': { color: '$accents7' },
                  }}
                ></Input>
              </div>
              <Spacer y={0.2} />
              <Button
                color={'success'}
                type="submit"
                css={{
                  width: '100%',
                }}
              >
                Create Post
              </Button>
            </Card.Body>
          </Card>
        </form>
      </Container>
    </>
  );
}
