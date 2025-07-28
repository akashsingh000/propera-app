import React from 'react';
import { Overlay } from '../../styles';
import Footer from '../Footer';
import Background from './Background';
import withImageCarouselBackground from './Background';

const MainLayout = ({children}) => {
  return (
      <Overlay>
      {children}
      <Footer />
      </Overlay>
  );
};

export default withImageCarouselBackground(MainLayout);
