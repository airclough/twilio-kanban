import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import DragAndDrop from './DragAndDrop';
import { useApp } from '../contexts/App';
import { List } from '../types/index';
import { getListByStatus } from '../utils/index';

const DragAnDropContainer = () => {
  const { lists, setLists, statuses } = useApp();
  console.log( { lists, statuses } );
  const reorderTasks = ( {
    destinationIndex,
    sourceIndex,
    sourceList,
    sourceListIndex,
  }: {
    destinationIndex: number;
    sourceIndex: number;
    sourceList: List;
    sourceListIndex: number;
  } ): List => {
    const { tasks } = sourceList;
    const reorderedTasks = [ ...tasks ];
    const [ item ] = reorderedTasks.splice( sourceIndex, 1 );

    reorderedTasks.splice( destinationIndex, 0, item );

    return { ...sourceList, tasks: reorderedTasks };
  };
  const onDragEnd = ( result: any ) => {
    console.log( { result } );
    const { destination, source } = result;
    if ( !destination ) return;
    const { droppableId: destinationId, index: destinationIndex } = destination;
    const { droppableId: sourceId, index: sourceIndex } = source;
    if ( sourceId === destinationId && sourceIndex === destinationIndex ) return;
    const listsClone = [ ...lists ];
    const { list: sourceList, listIndex: sourceListIndex } = getListByStatus( { lists, status: sourceId } );

    if ( sourceId === destinationId ) {
      const newList = reorderTasks( {
        destinationIndex,
        sourceIndex,
        sourceList,
        sourceListIndex,
      } );

      listsClone[ sourceListIndex ] = newList;
      setLists( listsClone );
    } else {
      //
    }
  };

  return lists.length && statuses.length ? (
    <div className="DragAnDropContainer">
      <div className="container">
        <div className="row">
          <DragDropContext onDragEnd={ onDragEnd }>
            { statuses.map( ( status ) => <DragAndDrop status={ status } /> ) }
          </DragDropContext>
        </div>
      </div>
    </div>
  ) : ( <></> );
};

export default DragAnDropContainer;
