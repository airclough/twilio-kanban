import React from 'react';

import DragAndDrop from './DragAndDrop';
import { useApp } from '../contexts/App';
import { getListByStatus } from '../utils/index';

const DragAnDropContainer = () => {
  const { lists, statuses } = useApp();

  return (
    <div className="DragAnDropContainer">
      { statuses.map( ( status, i ) => <DragAndDrop list={ getListByStatus( { lists, status } ) } status={ status } /> ) }
    </div>
  );
};

export default DragAnDropContainer;
