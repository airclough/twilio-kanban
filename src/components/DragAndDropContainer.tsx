import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import DragAndDrop from './DragAndDrop';
import { useApp } from '../contexts/App';
import { List, Status } from '../types/index.d';
import { getListByStatus } from '../utils/index';

const DragAnDropContainer = () => {
  const { lists, setLists, statuses } = useApp();
  const reorderTasks = ( {
    destinationIndex,
    sourceIndex,
    sourceList,
  }: {
    destinationIndex: number;
    sourceIndex: number;
    sourceList: List;
  } ): List => {
    const { tasks } = sourceList;
    const reorderedTasks = [ ...tasks ];
    const [ item ] = reorderedTasks.splice( sourceIndex, 1 );

    reorderedTasks.splice( destinationIndex, 0, item );

    return { ...sourceList, tasks: reorderedTasks };
  };
  const moveTask = ( {
    destinationId,
    destinationIndex,
    destinationList,
    sourceIndex,
    sourceList,
  }: {
    destinationId: string;
    destinationIndex: number;
    destinationList: List;
    sourceIndex: number;
    sourceList: List;
  } ): List[] => {
    const { tasks: destinationTasks } = destinationList;
    const destinationTasksClone = [ ...destinationTasks ];
    const { tasks: sourceTasks } = sourceList;
    const sourceTasksClone = [ ...sourceTasks ];
    const [ task ] = sourceTasksClone.splice( sourceIndex, 1 );
    const updatedTask = { ...task, status: Status[ destinationId ] };

    destinationTasksClone.splice( destinationIndex, 0, updatedTask );

    return [ { ...sourceList, tasks: sourceTasksClone }, { ...destinationList, tasks: destinationTasksClone } ];
  };
  const onDragEnd = ( result: any ) => {
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
      } );

      listsClone[ sourceListIndex ] = newList;
      setLists( listsClone );
    } else {
      const {
        list: destinationList,
        listIndex: destinationListIndex,
      } = getListByStatus( { lists, status: destinationId } );
      const [ newSourceList, newDestinationList ] = moveTask( {
        destinationId,
        destinationIndex,
        destinationList,
        sourceIndex,
        sourceList,
      } );

      listsClone[ sourceListIndex ] = newSourceList;
      listsClone[ destinationListIndex ] = newDestinationList;
      setLists( listsClone );
    }
  };

  return lists.length && statuses.length ? (
    <div className="DragAnDropContainer">
      <div className="container">
        <div className="row">
          <DragDropContext onDragEnd={ onDragEnd }>
            { statuses.map( ( status ) => <DragAndDrop key={ status } status={ status } /> ) }
          </DragDropContext>
        </div>
      </div>
    </div>
  ) : ( <></> );
};

export default DragAnDropContainer;
