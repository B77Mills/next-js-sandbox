import React from 'react';
import Head from 'next/head';
import { Row, Col } from 'reactstrap';
import Layout from '../components/Layout';

export default () => (
  <Layout>
    <Head>
      <title>About Us</title>
    </Head>
    <Row>
      <Col>
        <p>This is the about page</p>
      </Col>
    </Row>
  </Layout>
);
