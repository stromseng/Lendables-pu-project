/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function StandardImageList(props) {
  return (
    <ImageList sx={{ maxHeight: 500 }} cols={3} rowHeight={164}>
      {props.imageUrls.map((url) => (
        <ImageListItem key={url}>
          <img
            src={`${url}`}
            srcSet={`${url}`}
            alt=""
            loading="lazy"
            style={{
              width: 164,
              height: 164,
              objectFit: 'crop',
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
