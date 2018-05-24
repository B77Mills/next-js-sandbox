import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Layout from '../components/MyLayout';

const Index = props => (
  <Layout>
    <h1>Stories</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link as={`/story/${show.id}`} href={`/story?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>
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
    </style>
  </Layout>
);

Index.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  // eslint-disable-next-line no-console
  console.info(`Show data fetched. Count: ${data.length}`);

  return { shows: data };
};

export default Index;
