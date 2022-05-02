import React from 'react';
import ReactTopBarProgressIndicator from 'react-topbar-progress-indicator';

import { useApp } from '../contexts/App';

ReactTopBarProgressIndicator.config( {
  barColors: {
    0: '#f22f46',
    1: '#f22f46',
  },
  barThickness: 2,
  shadowBlur: 0,
  shadowColor: '#000',
} );

const ProgressBar = () => {
  const { loading } = useApp();

  return (
    <div className="ProgressBar">
      { loading && <ReactTopBarProgressIndicator /> }
    </div>
  );
};

export default ProgressBar;
