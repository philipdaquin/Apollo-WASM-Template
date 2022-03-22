use actix_web::HttpResponse;
use async_graphql::Object;
#[derive(Default)]
pub struct SystemQuery;

#[Object]
impl SystemQuery { 
    /// Returns 'true' to signify that the GraphQL Server 
    async fn check_system(&self) -> String { 
        String::from("Hello!")
    }
}