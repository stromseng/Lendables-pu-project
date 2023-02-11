import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PropTypes from 'prop-types';

//Takes in an array of image urls and displays them in an ImageList
export default function StandardImageList(props) {
  const imageUrls = props.imageUrls;
  return (
    <ImageList sx={{ maxHeight: 500 }} cols={3} rowHeight={164}>
      {imageUrls.map((url) => (
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

StandardImageList.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};
