import React, { FC } from 'react';

import DragAnDropContainer from '../src/components/DragAndDropContainer';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';

const Index: FC = () => (
  <div className="Index">
    <Header />
    <DragAnDropContainer />
    <Footer />
  </div>
);

export default Index;
