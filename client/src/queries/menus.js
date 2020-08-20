import { gql } from '@apollo/client';

const GET_MENUS = gql`
  query($limit: Int, $start: Int, $sort: String, $where: JSON) {
    menus(limit: $limit, start: $start, sort: $sort, where: $where) {
      id,
      label,
      icon,
      categories {
        id,
        label,
        icon,
        path
      }
    }
  }
`;

export { GET_MENUS };
