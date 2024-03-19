use ntex::{http, web};
use ntex_cors::Cors;
use serde::Serialize;
use sqlx::{postgres::PgPoolOptions, types::chrono::NaiveDateTime, Pool, Postgres};

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

async fn connect_pool() -> Pool<Postgres> {
    PgPoolOptions::new()
        .max_connections(5)
        // TODO: Move url to .env
        .connect("***REMOVED***")
        .await // TODO: handle and return error
        .unwrap()
}

#[derive(Serialize)]
struct GetUserByIdResponse {
    username: String,
    email: String,
}

#[allow(dead_code)]
#[derive(sqlx::FromRow)]
struct User {
    id: String,
    username: String,
    email: String,
    created_at: NaiveDateTime,
}

#[web::get("/user/{user_id}")]
async fn get_user_by_id(path: web::types::Path<String>) -> impl web::Responder {
    let user_id = path.into_inner();

    let pool = connect_pool().await;

    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(user_id)
        .fetch_one(&pool)
        .await // TODO: handle and return error
        .unwrap();

    let json_response = GetUserByIdResponse {
        username: user.username,
        email: user.email,
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
            .service(get_user_by_id)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
