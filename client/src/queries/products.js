import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      title
      icon
      desc
      url
      category {
        id
      }
    }
  }
`;

export { GET_PRODUCTS };
