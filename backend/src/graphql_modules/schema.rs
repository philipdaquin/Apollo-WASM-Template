use super::resolvers::systemcheck::SystemQuery;
use async_graphql::{EmptySubscription, MergedObject, Schema, SchemaBuilder, EmptyMutation, futures_util::future::Shared};

/// Root for all GraphQl Queries 
#[derive(MergedObject, Default)]
pub struct Query(SystemQuery);

/// Build the GraphQL schema
pub fn build_schema() -> AppSchemaBuilder { 
    Schema::build(Query::default(), EmptyMutation, EmptySubscription)
}

pub type AppSchema = Schema<Query, EmptyMutation, EmptySubscription>;
pub type AppSchemaBuilder = SchemaBuilder<Query, EmptyMutation, EmptySubscription>;