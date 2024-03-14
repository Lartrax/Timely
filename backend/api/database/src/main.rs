use ntex::{http, web};
use ntex_cors::Cors;
use serde::Serialize;

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
