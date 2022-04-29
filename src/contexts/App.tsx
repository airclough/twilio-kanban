import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { List, Status } from '../types/index.d';
import { getListByStatus } from '../utils/index';

interface App {
  lists: List[];
  moveTask: ( arg0: any ) => void;
  setLists: ( value: List[] ) => void;
  statuses: string[];
}

interface Props {
  children: ReactNode;
}

const hipsterIpsum = 'Fanny pack neutra VHS jianbing tattooed before they sold out glossier waistcoat echo park pitchfork godard lumbersexual hell of meh. Next level listicle pickled, meh letterpress organic 90\'s waistcoat keffiyeh tbh paleo fashion axe church-key. Meditation street art readymade, tumblr skateboard hoodie mlkshk lomo. Raclette post-ironic put a bird on it everyday carry mustache, fanny pack tattooed small batch. Normcore pickled truffaut, sartorial tumblr portland post-ironic fingerstache.'.split( ' ' );
const { length: hipsterIpsumLength } = hipsterIpsum;

const AppContext = createContext<App | undefined>( undefined );

export const AppProvider = ( { children }: Props ) => {
  const [ lists, setLists ] = useState<App[ 'lists' ]>( [] );
  const [ statuses ] = useState<App[ 'statuses' ]>( [
    'BACKLOG',
    'TO_DO',
    'ONGOING',
    'DONE',
  ] );
  const moveTask = ( {
    destinationId,
    sourceId,
    sourceIndex,
  } ) => {
    const listsClone = [ ...lists ];
    const {
      list: sourceList,
      listIndex: sourceListIndex
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
    const initialLists = [];

    statuses.forEach( ( status, i ) => {
      const tasks = Array
        .from( { length: Math.floor( Math.random() * 5 ) + 1 } )
        .map( ( _, j ) => {
          const randomIndex = Math.floor( Math.random() * hipsterIpsumLength );
          const description = hipsterIpsum
            .slice( randomIndex, Math.floor( Math.random() * hipsterIpsumLength ) + randomIndex );
          const [ name ] = description;

          return {
            description: description.join( ' ' ),
            id: `${ i }${ j }`,
            name,
            status,
          };
        } );

      initialLists.push( { id: status, tasks } );
    } );

    setLists( initialLists );
  }, [] );

  return (
    <AppContext.Provider
      value={ {
        lists,
        moveTask,
        setLists,
        statuses,
      } }
    >
      { children }
    </AppContext.Provider>
  );
};

export const useApp = () => useContext( AppContext );
