import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { List, Status, Task } from '../types/index';

interface App {
  lists: List[];
  setLists: ( value: List[] ) => void;
  statuses: string[];
}

interface Props {
  children: ReactNode;
}

const AppContext = createContext<App | undefined>( undefined );

export const AppProvider = ( { children }: Props ) => {
  const [ lists, setLists ] = useState<App[ 'lists' ]>( [] );
  const [ statuses ] = useState<App[ 'statuses' ]>( [
    'BACKLOG',
    'TO_DO',
    'ONGOING',
    'DONE',
  ] );

  useEffect( () => {
    const initialLists = [];

    statuses.forEach( ( status ) => {
      initialLists.push( { id: status, tasks: [] } );
    } );

    setLists( initialLists );
  }, [] );

  return (
    <AppContext.Provider
      value={ {
        lists,
        setLists,
        statuses,
      } }
    >
      { children }
    </AppContext.Provider>
  );
};

export const useApp = () => useContext( AppContext );
