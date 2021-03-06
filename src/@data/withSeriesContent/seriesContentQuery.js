import gql from 'graphql-tag';

export default gql`
  query getSeriesSingle($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          channelId
        }
        content {
          isLiked
          description
          tags
          isLight
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
          video {
            embedUrl
          }
          colors {
            value
            description
          }
        }
        children(channels: ["sermons"]) {
          id
          title
          channelName
          parent {
            id
          }
          meta {
            date
            urlTitle
          }
          content {
            speaker
          }
        }
      }
    }
  }
`;
