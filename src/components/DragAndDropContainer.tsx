import React from 'react';

import DragAndDrop from './DragAndDrop';
import { useApp } from '../contexts/App';
import { getListByStatus } from '../utils/index';

const DragAnDropContainer = () => {
  const { lists, statuses } = useApp();

  return (
    <div className="DragAnDropContainer">
      <div className="container">
        <div className="row">
          { statuses.map( ( status ) => <DragAndDrop list={ getListByStatus( { lists, status } ) } status={ status } /> ) }
        </div>
      </div>
    </div>
  );
};

export default DragAnDropContainer;
