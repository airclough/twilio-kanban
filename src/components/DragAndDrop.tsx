import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Task from './Task';
import { List } from '../types/index';

interface DragAndDropProps {
  list: List;
  status: string;
}

const style = ( isDraggingOver: boolean ) => ( {
  background: isDraggingOver ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,0)',
  padding: '1rem',
  width: '100%',
} );

const DragAndDrop: FC<DragAndDropProps> = ( { list, status } ) => {
  const { tasks } = list;
  if ( !tasks.length ) return <></>;

  return (
    <div className="DragAndDrop">
      <Droppable droppableId="dragAndDropDroppable">
        { ( droppableProvided, droppableSnapshot ) => (
          <ul
            className="lineupList"
            ref={ droppableProvided.innerRef }
            style={ style( droppableSnapshot.isDraggingOver ) }
          >
            { tasks.map( ( task, index ) => (
              <Draggable
                draggableId={ task.name }
                index={ index }
                key={ task.name }
              >
                { ( draggableProvided, draggableSnapshot ) => (
                  <Task
                    provided={ draggableProvided }
                    snapshot={ draggableSnapshot }
                    task={ task }
                  />
                ) }
              </Draggable>
            ) ) }
            { droppableProvided.placeholder }
          </ul>
        ) }
      </Droppable>
    </div>
  );
};

export default DragAndDrop;
