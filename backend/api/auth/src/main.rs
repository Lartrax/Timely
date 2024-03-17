use google_oauth::GoogleAccessTokenPayload;
use ntex::{http, web};
use ntex_cors::Cors;
use oauth2::{
    basic::BasicClient, AuthUrl, ClientId, ClientSecret, CsrfToken, RedirectUrl, Scope, TokenUrl,
};
use reqwest::{Client, Error};
use serde::Serialize;

#[derive(Serialize)]
struct RedirectResponse {
    url: String,
}

#[web::get("/generate_redirect/{redirect_url}")]
async fn generate_redirect(path: web::types::Path<String>) -> impl web::Responder {
    let client_id = ClientId::new(
        "301953730716-ilnc1ft7f935ut9na9l3i6muho53miv9.apps.googleusercontent.com".to_string(),
    );

    let client_secret = ClientSecret::new("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".to_string());

    let auth_url = AuthUrl::new("https://accounts.google.com/o/oauth2/v3/auth".to_string())
        .expect("Invalid authorization endpoint URL");

    let token_url = TokenUrl::new("https://www.googleapis.com/oauth2/v3/token".to_string())
        .expect("Invalid token endpoint URL");

    let redirect_url =
        RedirectUrl::new(format!("https://{}", path.into_inner())).expect("Invalid redirect URL");

    let client = BasicClient::new(client_id, Some(client_secret), auth_url, Some(token_url))
        .set_redirect_uri(redirect_url);

    let (auth_url, _csrf_token) = client
        .authorize_url(CsrfToken::new_random)
        .add_scope(Scope::new(
            "openid https://www.googleapis.com/auth/userinfo.email".to_string(),
        ))
        .add_scope(Scope::new(
            "openid https://www.googleapis.com/auth/userinfo.profile".to_string(),
        ))
        .add_scope(Scope::new("openid".to_string()))
        .use_implicit_flow()
        .url();

    let json_response = RedirectResponse {
        url: format!("{}", auth_url),
    };

    web::HttpResponse::Ok()
        .content_type("application/json")
        .json(&json_response)
}

#[derive(Serialize)]
struct GetUserResponse {
    user_id: String,
    name: String,
    email: String,
    profile_picture: String,
}

#[web::get("/get_user/{access_token}")]
async fn get_user(path: web::types::Path<String>) -> impl web::Responder {
    let access_token = path.into_inner();

    let payload = authenticate_access_token(access_token).await.unwrap();

    let json_response = GetUserResponse {
        user_id: payload.sub,
        name: payload.name.expect("User is missing name"),
        email: payload.email.expect("User is missing email"),
        profile_picture: payload.picture.expect("User is missing profile picture"),
    };

    web::HttpResponse::Ok()
        .content_type("application/json")
        .json(&json_response)
}

async fn authenticate_access_token(
    access_token: String,
) -> Result<GoogleAccessTokenPayload, Error> {
    let url = format!(
        "https://www.googleapis.com/oauth2/v3/userinfo?access_token={}",
        access_token
    );
    let client = Client::builder()
        .danger_accept_invalid_certs(true)
        .build()?;

    let response = client
        .get(&url)
        .send()
        .await?
        .json::<GoogleAccessTokenPayload>()
        .await?;

    Ok(response)
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
            .service(generate_redirect)
            .service(get_user)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
