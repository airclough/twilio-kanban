import { List } from '../types/index';

interface GetListByStatusProp {
  lists: List[];
  status: string;
}

interface getListByStatusReturnType {
  list: List;
  listIndex: number;
}

export const getListByStatus = ( {
  lists,
  status,
}: GetListByStatusProp ): getListByStatusReturnType => {
  const listMap = lists.map( ( { id } ) => id );
  const listIndex = listMap.indexOf( status );
  const list = lists[ listIndex ];

  return { list, listIndex };
};
