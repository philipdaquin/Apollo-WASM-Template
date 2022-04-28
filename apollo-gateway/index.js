const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource, 
    IntrospectAndCompose } = require('@apollo/gateway');


// Each incoming request to the gateway includes 'Authorization' header
// The gateway sets the shared 'context' for an operation by pulling the value of that 
// header and using it to fetch the associated user's id 
// class AuthenticatedDataSource extends RemoteGraphQLDataSource {
//     willSendRequest({ request, context }) { 
//         // Pass the user's id from the context to each subgraph 
//         //  as a header called 'user_id'
//         if (context.authHeaderValue) { 
//             request.http.headers.set('Authorization', context.authHeaderValue);
//         }
//     }
// }
//  Intialise an ApolloGateway instance and pass it 
//  the supergraph schema 
const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            { name: 'accounts', url: 'http://localhost:4001/graphql '},
        ],
        // buildService({name, url}) {
        //     return new AuthenticatedDataSource({url});
        // },
        // Experimental: Enabling this enables the query plan view in Playground.
        __exposeQueryPlanExperimental: false,
    })
});

//  We initialise an 'ApolloServer' instance and pass it our gateway via the gateway optiomn
//  Pass the ApolloGateway to the ApolloServer constructor 
(async () => {
  const server = new ApolloServer({
    gateway,

    // Apollo Graph Manager (previously known as Apollo Engine)
    // When enabled and an `ENGINE_API_KEY` is set in the environment,
    // provides metrics, schema management and trace reporting.
    engine: false,

    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
