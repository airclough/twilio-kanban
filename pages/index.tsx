import { gql, useLazyQuery } from '@apollo/client';
import React, { FC, useEffect } from 'react';

import DragAnDropContainer from '../src/components/DragAndDropContainer';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import { useApp } from '../src/contexts/App';

const Index: FC = () => {
  const { setTasks } = useApp();
  const tasksQuery = gql`
    query ( $numTasks: Int! ) {
      getTasks ( numTasks: $numTasks ) {
        description,
        id,
        name,
        status
      }
    }
  `;
  const [ getTasks, { data, error } ] = useLazyQuery( tasksQuery, { fetchPolicy: 'no-cache' } );

  useEffect( () => {
    const min = 8;
    const max = 12;
    const numTasks = Math.floor( Math.random() * ( max - min + 1 ) + min );

    getTasks( { variables: { numTasks } } );
  }, [] );

  useEffect( () => {
    console.log( { data, error } );
    if ( !data ) return;
    const { getTasks: tasks } = data;

    setTasks( tasks );
  }, [ data, error ] );

  return (
    <div className="Index">
      <Header />
      <DragAnDropContainer />
      <Footer />
    </div>
  );
};

export default Index;
