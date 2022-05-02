import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Task from './Task';
import { useApp } from '../contexts/App';
import { getListByStatus } from '../utils/index';

interface DragAndDropProps {
  status: string;
}

const style = ( isDraggingOver: boolean ) => ( {
  background: isDraggingOver ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.05)',
  padding: '1rem',
  width: '100%',
} );

const DragAndDrop: FC<DragAndDropProps> = ( { status } ) => {
  const { lists } = useApp();
  const { list } = getListByStatus( { lists, status } );
  const { tasks } = list;

  return (
    <div className="col-3 DragAndDrop">
      <h2>{ status.replace( '_', ' ' ) }</h2>
      <Droppable droppableId={ status }>
        { ( droppableProvided, droppableSnapshot ) => (
          <div
            className="taskList"
            ref={ droppableProvided.innerRef }
            style={ style( droppableSnapshot.isDraggingOver ) }
          >
            { tasks.map( ( task, index ) => (
              <Draggable
                draggableId={ task.id }
                index={ index }
                key={ task.id }
              >
                { ( draggableProvided, draggableSnapshot ) => (
                  <Task
                    index={ index }
                    provided={ draggableProvided }
                    snapshot={ draggableSnapshot }
                    task={ task }
                  />
                ) }
              </Draggable>
            ) ) }
            { droppableProvided.placeholder }
          </div>
        ) }
      </Droppable>
    </div>
  );
};

export default DragAndDrop;
