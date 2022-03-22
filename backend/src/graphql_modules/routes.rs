
use actix_web::{route, get, Responder, web};
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};
use actix_web_lab::respond::Html;
use super::schema::AppSchema;

/// GraphQL endpoint
#[route("/graphql", method = "GET", method = "POST")]
pub async fn graphql(schema: web::Data<AppSchema>, req: GraphQLRequest) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}

/// GraphiQL playground UI
#[get("/graphiql")]
pub async fn graphql_playground() -> impl Responder {
    Html(playground_source(
        GraphQLPlaygroundConfig::new("/graphql")
        .subscription_endpoint("/graphql"),
    ))
}