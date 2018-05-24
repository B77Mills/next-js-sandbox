import React from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout from '../components/MyLayout';

const Story = props => (
  <Layout>
    <Head>
      <title>{props.show.name}</title>
      <meta name="description" content={props.show.summary} />
    </Head>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img alt={props.show.name} src={props.show.image.medium} />
  </Layout>
);

Story.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  // eslint-disable-next-line no-console
  console.log(`Fetched show: ${show.name}`);

  return { show };
};

Story.propTypes = {
  show: PropTypes.shape({
    name: PropTypes.string,
    summary: PropTypes.string,
    image: PropTypes.shape({
      medium: PropTypes.string,
    }),
  }).isRequired,
};

export default Story;
