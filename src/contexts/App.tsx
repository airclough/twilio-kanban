import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

enum Status {
  BACKLOG = 'BACKLOG',
  TO_DO = 'TO_DO',
  ONGOING = 'ONGOING',
  DONE = 'DONE',
}

interface Task {
  description: string;
  name: string;
  status: Status;
}

interface List {
  id: string;
  tasks: Task[];
}

interface App {
  lists: List[];
  setLists: ( value: List[] ) => void;
  statuses: string[];
}

interface Props {
  children: ReactNode;
};

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
    var initialLists = [];

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
