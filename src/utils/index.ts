import { List } from '../types/index';

interface GetListByStatusProps {
  lists: List[];
  status: string;
}

interface GetListByStatusReturnType {
  list: List;
  listIndex: number;
}

export const getListByStatus = ( {
  lists,
  status,
}: GetListByStatusProps ): GetListByStatusReturnType => {
  const listMap = lists.map( ( { id } ) => id );
  const listIndex = listMap.indexOf( status );
  const list = lists[ listIndex ];

  return { list, listIndex };
};
