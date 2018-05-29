import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import gql from 'graphql-tag';
import {
  Row,
  Col,
  Card,
  CardImgOverlay,
  CardTitle,
  CardBody,
} from 'reactstrap';
import { Query } from 'react-apollo';
import Layout from '../components/Layout';
import Imgix from '../components/Imgix';
import withApollo from '../apollo/client';

const STORY = gql`
  query Story($input: ModelIdInput!) {
    story(input: $input) {
      id
      title
      teaser
      body
      seoTitle
      primaryImage {
        path
        caption
      }
    }
  }
`;

const createMarkup = html => ({ __html: html });

const Story = ({ id }) => {
  const input = { id };
  return (
    <Layout>
      <Row>
        <Col>
          <Card>
            <Query query={STORY} variables={{ input }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return (
                    <CardBody>
                      <p>Loading...</p>
                    </CardBody>
                  );
                }
                if (error) return <p><strong>{error.message}</strong></p>;

                const { story } = data;
                const { primaryImage } = story;

                return (
                  <div>
                    <Head>
                      <title>{story.title}</title>
                      <meta name="description" content={story.seoTitle} />
                    </Head>
                    <Imgix className="card-img" path={primaryImage.path} alt={primaryImage.caption} title={story.title} w="500" />
                    <CardImgOverlay>
                      <CardTitle tag="h1" className="text-light" style={{ textShadow: '1px 1px 8px rgba(0, 0, 0, 1)' }}>{story.title}</CardTitle>
                      <CardTitle tag="h3" className="text-light" style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 1)' }}>{story.teaser}</CardTitle>
                    </CardImgOverlay>
                    <CardBody dangerouslySetInnerHTML={createMarkup(story.body)} />
                  </div>
                );
              }}
            </Query>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

Story.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { id };
};

Story.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withApollo(Story);
