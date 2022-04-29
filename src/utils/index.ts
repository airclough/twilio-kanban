import { List } from '../types/index';

interface GetListByStatusProp {
  lists: List[];
  status: string;
}

export const getListByStatus = ( {
  lists,
  status,
}: GetListByStatusProp ): List => {
  const listMap = lists.map( ( { id } ) => id );
  const index = listMap.indexOf( status );

  return lists[ index ];
};
