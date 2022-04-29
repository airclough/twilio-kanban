import React from 'react';

import { Task as TaskInterface } from '../types/index';

const style = ( {
  draggablePropsStyle,
  isDragging,
}: {
  draggablePropsStyle: any;
  isDragging: boolean;
} ) => ( {
  ...draggablePropsStyle,
  background: isDragging ? 'red' : '#fff',
  color: isDragging ? '#fff' : '#ccc',
  margin: '0 0 16px 0',
  padding: '0 1.5rem 0 1rem',
  userSelect: 'none',
} );

const Task = ( {
  provided,
  snapshot,
  task,
}: {
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
  const onMouseEnter = () => {

  };

  return (
    <div
      { ...draggableProps }
      { ...dragHandleProps }
      onMouseEnter={ onMouseEnter }
      ref={ innerRef }
      style={ style( {
        draggablePropsStyle,
        isDragging,
      } ) }
    >
      <div>{ name }</div>
      <div>{ description }</div>
    </div>
  );
};

export default Task;
