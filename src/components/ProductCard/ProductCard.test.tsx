import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import ProductCard from './ProductCard';
import {Provider as ProductProvider} from '../../context/productContext';

const item = {
  id: 1,
  colour: 'Black',
  name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
  price: 10,
  img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
};

describe('ProductCard.tsx', () => {
  it('ProductCard.tsx renders correctly', () => {
    const {getByTestId} = render(<ProductCard item={item} />, {
      wrapper: ProductProvider,
    });
  });
});
