import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      title
      iconUrl {
        url
      }
      desc
      url
      category {
        id
      }
    }
  }
`;

export { GET_PRODUCTS };
