import React from 'react';
import { Query } from 'react-apollo';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import Link from 'next/link';
import Head from 'next/head';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import withApollo from '../apollo/client';

const STORIES = gql`
  query AllStoriesList($input: AllStoryInput!) {
    allStories(input: $input) {
      id
      title
      slug
      primarySection {
        id
        alias
      }
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
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h1" className="mb-0">Stories</CardTitle>
            </CardBody>
            <Query query={STORIES} variables={{ input }}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p><strong>{error.message}</strong></p>;

                const { allStories } = data;
                return (
                  <ListGroup flush>
                    {allStories.map(story => (
                      <Link key={story.id} as={`/story/${story.primarySection.alias}/${story.slug}/${story.id}`} href={`/story?id=${story.id}`} passHref>
                        <ListGroupItem tag="a" action>{story.title}</ListGroupItem>
                      </Link>
                    ))}
                  </ListGroup>
                );
              }}
            </Query>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default withApollo(Index);
