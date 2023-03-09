'use client'

import { useState } from 'react';
import pb from '../(lib)/pocketbase';
import { Input, Button, Grid, Card, Icon } from '@nextui-org/react';

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function handleSearch() {
    const ads = pb.collection('advertisements');
    console.log('searching for... ', searchValue);
    try {
      const results = await ads.select({
        filterByFormula: `LEFT({title}, ${searchValue.length}) = '${searchValue}'`
      });
      setSearchResults(results.docs.map(doc => doc.data()));
    } catch (error) {
      console.error(error);
  }
    
    //await ads.find((item) => item.title.toLowerCase().startsWith(searchValue.toLowerCase()));
    
    setSearchResults(results.docs.map(doc => doc.data()));
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <Grid.Container gap={3}>
      <Grid xs={24} justify="center">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          onKeyPress={handleKeyPress}
          icon={<search />}
          style={{ width: "600px" }}
        />
      </Grid>
      
      {searchResults.map((item) => (
        <Grid xs={24} md={12} lg={8} key={item.id}>
          <Card shadow>
            <Card.Body>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </Card.Body>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
}
