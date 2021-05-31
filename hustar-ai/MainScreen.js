import React from 'react';
import {Container, Header, Content} from 'native-base';
import ProductList from './ProductList';

export default function MainScreen() {
  return(
    <Container> 
      <Header />
      <Content>
        <ProductList />
      </Content>
    </Container>
  );
}
