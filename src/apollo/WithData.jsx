import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import initApollo from './init';

const getDisplayName = Component => Component.displayName || Component.name || 'Unknown';

export default apolloConfig => {
  return ComposedComponent => {
    return class WithData extends React.Component {
      /**
       * Generate the composed component name.
       */
      static displayName = `WithData(${getDisplayName(ComposedComponent)})`;

      static propTypes = {
        serverState: PropTypes.object.isRequired,
      };

      static async getInitalProps(context) {
        console.info('getInitialProps context', context);
        const serverState = { apollo: {} };
        const {
          req,
          query,
          pathname,
          asPath,
        } = context;

        // Await the composed components initial props.
        let composedProps = {};
        if (ComposedComponent.getInitalProps) {
          composedProps = await ComposedComponent.getInitalProps(context);
        }

        // Run all GraphQL queries in tree and extract their data.
        if (!process.browser) {
          const apollo = initApollo(apolloConfig, null, req);
          const url = { query, pathname };

          try {
            // Run queries in the tree.
            await getDataFromTree(
              <ApolloProvider client={apollo}>
                <ComposedComponent
                  url={url}
                  context={context}
                  {...composedProps}
                />
              </ApolloProvider>,
              { router: { asPath, pathname, query } }
            );
          } catch (e) {
            // Prevent errors from crashing SSR.
            // Handle the error in components via data.error prop.
          }
        }
        return { serverState, ...composedProps };
      }

      constructor(props) {
        super(props);
        const { serverState } = this.props;
        this.apollo = initApollo(apolloConfig, serverState.apollo.data);
      }

      render() {
        return (
          <ApolloProvider client={this.apollo}>
            <ComposedComponent {...this.props} />
          </ApolloProvider>
        );
      }
    }
  }
};
