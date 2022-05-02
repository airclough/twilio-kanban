import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { List, Status, Task } from '../types/index.d';
import { getListByStatus } from '../utils/index';

interface App {
  lists: List[];
  moveTask: ( arg0: any ) => void;
  setLists: ( value: List[] ) => void;
  setTasks: ( value: Task[] ) => void;
  statuses: string[];
  tasks: Task[];
}

interface Props {
  children: ReactNode;
}

const AppContext = createContext<App | undefined>( undefined );

export const AppProvider = ( { children }: Props ) => {
  const [ statuses ] = useState<App[ 'statuses' ]>( [
    'BACKLOG',
    'TO_DO',
    'ONGOING',
    'DONE',
  ] );
  const statusMap = {};
  const initialLists = statuses.map( ( status, i ) => {
    statusMap[ status ] = i;

    return { id: status, tasks: [] };
  } );
  const [ lists, setLists ] = useState<App[ 'lists' ]>( initialLists );
  const [ tasks, setTasks ] = useState<App[ 'tasks' ]>( [] );
  const moveTask = ( {
    destinationId,
    sourceId,
    sourceIndex,
  } ) => {
    const listsClone = [ ...lists ];
    const {
      list: sourceList,
      listIndex: sourceListIndex,
    } = getListByStatus( { lists, status: sourceId } );
    const {
      list: destinationList,
      listIndex: destinationListIndex,
    } = getListByStatus( { lists, status: destinationId } );
    const { tasks: destinationTasks } = destinationList;
    const destinationTasksClone = [ ...destinationTasks ];
    const { tasks: sourceTasks } = sourceList;
    const sourceTasksClone = [ ...sourceTasks ];
    const [ task ] = sourceTasksClone.splice( sourceIndex, 1 );
    const updatedTask = { ...task, status: Status[ destinationId ] };

    destinationTasksClone.push( updatedTask );

    listsClone[ sourceListIndex ] = { ...sourceList, tasks: sourceTasksClone };
    listsClone[ destinationListIndex ] = { ...destinationList, tasks: destinationTasksClone };
    setLists( listsClone );
  };

  useEffect( () => {
    if ( !tasks.length ) return;
    const listsClone = [ ...lists ];

    tasks.forEach( ( task: Task ) => {
      const { status } = task;

      lists[ statusMap[ status ] ]
        .tasks
        .push( task );
    } );

    setLists( listsClone );
  }, [ tasks ] );

  return (
    <AppContext.Provider
      value={ {
        lists,
        moveTask,
        setLists,
        setTasks,
        statuses,
        tasks,
      } }
    >
      { children }
    </AppContext.Provider>
  );
};

export const useApp = () => useContext( AppContext );
