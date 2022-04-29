import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { useApp } from '../contexts/App';
import { Task as TaskInterface } from '../types/index';

const style = ( {
  draggablePropsStyle,
  isDragging,
}: {
  draggablePropsStyle: any;
  isDragging: boolean;
} ) => ( {
  ...draggablePropsStyle,
  background: isDragging ? '#f22f46' : '#fff',
  color: isDragging ? '#fff' : '#333',
  margin: '0 0 1rem 0',
  padding: '1rem',
  userSelect: 'none',
} );

const Task = ( {
  index,
  provided,
  snapshot,
  task,
}: {
  index: number;
  provided: any;
  snapshot: any;
  task: TaskInterface;
} ) => {
  const {
    description,
    name,
    status,
  } = task;
  const { draggableProps, dragHandleProps, innerRef } = provided;
  const { style: draggablePropsStyle } = draggableProps;
  const { isDragging } = snapshot;
  const { moveTask, statuses } = useApp();
  const statusIndex = statuses.indexOf( status );
  const directions = {
    left: statusIndex > 0,
    right: statusIndex < statuses.length - 1,
  };
  const { left, right } = directions;

  const onClick = ( direction: string ) => {
    if ( !directions[ direction ] ) return;

    moveTask( {
      destinationId: statuses[ direction === 'right' ? statusIndex + 1 : statusIndex - 1 ],
      sourceId: status,
      sourceIndex: index,
    } );
  };

  return (
    <div
      { ...draggableProps }
      { ...dragHandleProps }
      className="Task"
      ref={ innerRef }
      style={ style( {
        draggablePropsStyle,
        isDragging,
      } ) }
    >
      <div className="taskHeader">
        <h3>{ name }</h3>
        <div className="arrows">
          <div className="iconContainer">
            <FontAwesomeIcon
              className={ left && 'active' || '' }
              icon={ faArrowLeft }
              onClick={ () => onClick( 'left' ) }
            />
          </div>
          <div className="iconContainer">
            <FontAwesomeIcon
              className={ right && 'active' || '' }
              icon={ faArrowRight }
              onClick={ () => onClick( 'right' ) }
            />
          </div>
        </div>
      </div>
      <div>{ description }</div>
    </div>
  );
};

export default Task;
