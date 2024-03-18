use ntex::{http, web};
use ntex_cors::Cors;
use serde::Serialize;
use sqlx::postgres::PgPoolOptions;

#[derive(Serialize)]
struct HelloWorldResponse {
    greeting: String,
}

#[web::get("/hello/{world}")]
async fn hello_world(path: web::types::Path<String>) -> impl web::Responder {
    let recipient = path.into_inner();

    let json_response = HelloWorldResponse {
        greeting: format!("Hello {}!", recipient),
    };

    web::HttpResponse::Ok()
        .content_type("application/json")
        .json(&json_response)
}

#[derive(Serialize)]
struct GetUserByIdResponse {
    username: String,
    email: String,
}

#[web::get("/user/{user_id}")]
async fn get_user_by_id(path: web::types::Path<String>) -> impl web::Responder {
    let user_id = path.into_inner();

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect("postgres://LRZ8GPmEqe-@35.228.17.43/postgres")
        .await;

    let rows = sqlx::query_as("SELECT * FROM users WHERE id = $1")
        .bind(user_id)
        .fetch_one(&pool)
        .await;

    let json_response = GetUserByIdResponse {
        username: "Lars Erik".to_string(),
        email: "lartrax909@gmail.com".to_string(),
    };

    web::HttpResponse::Ok()
        .content_type("application/json")
        .json(&json_response)
}

#[ntex::main]
async fn main() -> std::io::Result<()> {
    web::HttpServer::new(|| {
        web::App::new()
            .wrap(
                Cors::new()
                    .allowed_header(http::header::ACCESS_CONTROL_ALLOW_ORIGIN)
                    .finish(),
            )
            .service(hello_world)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
