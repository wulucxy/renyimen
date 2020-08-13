import { gql } from '@apollo/client';

const GET_BANNERS = gql`
  query {
    banners {
      id,
      title,
      url,
      img {
        url
      }
    }
  }
`;

export { GET_BANNERS };


