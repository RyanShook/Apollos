import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import get from 'lodash/get';
import Client from '@data/Client';
import { withProtectedFunction } from '@ui/NativeWebRouter';

const contentCard = gql`
  fragment ContentCard on Content {
    __typename
    id
    content {
      isLiked
    }
  }
`;

const groupCard = gql`
  fragment GroupCard on Group {
    __typename
    id
    isLiked
  }
`;

// TODO: groups cannot be liked yet
// NOTE: id is the calculated hash of
// the real ID and the type of object.
export const MUTATION = gql`
  mutation ToggleLike($id: String!) {
    toggleLike(nodeId: $id) {
      like {
        ... ContentCard
        ... GroupCard
      }
    }
  }
  ${contentCard}
  ${groupCard}
`;

// TODO: Need to update optimisticResponse to work with groups
export default compose(
  graphql(MUTATION, {
    props: ({ mutate }) => ({
      toggleLike: (id) => {
        const state = Client.readFragment({
          id: `Content:${id}`,
          fragment: contentCard,
        });

        return mutate({
          variables: {
            id,
          },
          refetchQueries: ['UserLikes', 'RecentlyLiked'],
          optimisticResponse: {
            toggleLike: {
              __typename: 'LikesMutationResponse',
              like: {
                __typename: 'Content',
                id,
                content: {
                  __typename: 'ContentData',
                  isLiked: !get(state, 'content.isLiked'),
                },
              },
            },
          },
        });
      },
    }),
  }),
  withProtectedFunction((protect, { toggleLike }) => ({
    toggleLike: id => protect(() => toggleLike(id)),
  })),
);
