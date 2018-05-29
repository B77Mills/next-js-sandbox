import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import PropTypes from 'prop-types';
import ActiveNavItem from '../components/ActiveNavItem';

const Layout = props => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous" />
    </Head>
    <Navbar dark color="dark" expand>
      <Link href="/" passHref>
        <NavbarBrand>Firehouse</NavbarBrand>
      </Link>
      <Nav className="mr-auto" navbar>
        <ActiveNavItem href="/" title="Home">Home</ActiveNavItem>
        <ActiveNavItem href="/about" title="About">About</ActiveNavItem>
      </Nav>
    </Navbar>
    <Container className="my-3">
      {props.children}
    </Container>
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
