use ntex::{http, web};
use ntex_cors::Cors;
use oauth2::{basic::BasicClient, AuthUrl, ClientId, ClientSecret, CsrfToken, TokenUrl};
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

#[derive(Serialize)]
struct RedirectResponse {
    url: String,
}

#[web::get("/generate_redirect")]
async fn generate_redirect() -> impl web::Responder {
    let client_id = ClientId::new(
        "***REMOVED***".to_string(),
    );

    let client_secret = ClientSecret::new("***REMOVED***".to_string());

    let auth_url = AuthUrl::new("https://accounts.google.com/o/oauth2/v2/auth".to_string())
        .expect("Invalid authorization endpoint URL");

    let token_url = TokenUrl::new("https://www.googleapis.com/oauth2/v3/token".to_string())
        .expect("Invalid token endpoint URL");

    let client = BasicClient::new(client_id, Some(client_secret), auth_url, Some(token_url));

    let (auth_url, csrf_token) = client
        .authorize_url(CsrfToken::new_random)
        .use_implicit_flow()
        .url();

    let json_response = RedirectResponse {
        url: format!("{}", auth_url),
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
            .service(generate_redirect)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
