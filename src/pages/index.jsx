import React from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Head from 'next/head';
import gql from 'graphql-tag';
import Layout from '../components/MyLayout';
import withApollo from '../apollo/client';

const STORIES = gql`
  query AllStoriesList($input: AllStoryInput!) {
    allStories(input: $input) {
      id
      title
    }
  }
`;

const Index = () => {
  const input = { limit: 10, type: 'Article' };
  return (
    <Layout>
      <Head>
        <title>Homepage</title>
      </Head>
      <h1>Stories</h1>
      <Query query={STORIES} variables={{ input }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p><strong>{error.message}</strong></p>;

          const { allStories } = data;
          return (
            <ul>
              {allStories.map(story => (
                <li key={story.id}>
                  <Link as={`/story/${story.id}`} href={`/story?id=${story.id}`}>
                    <a>{story.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
      {/* <style jsx>
        {`
          h1, a {
            font-family: "Arial";
          }

          ul {
            padding: 0;
          }

          li {
            list-style: none;
            margin: 5px 0;
          }

          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }
        `}
      </style> */}
    </Layout>
  );
};

export default withApollo(Index);
