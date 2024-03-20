use ntex::{http, web};
use ntex_cors::Cors;
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPoolOptions, types::chrono::NaiveDateTime, FromRow, Pool, Postgres};

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
        .connect("postgres://postgres:LRZ8GPmEqe-@35.228.17.43/postgres")
        .await // TODO: handle and return error
        .unwrap()
}

#[web::post("/user/{user_id}/{username}/{email}")]
async fn create_user(path: web::types::Path<(String, String, String)>) -> impl web::Responder {
    let (user_id, username, email) = path.into_inner();

    let pool = connect_pool().await;

    let query = sqlx::query(&format!(
        "
    do
    $$
    BEGIN
        IF EXISTS (
            SELECT * FROM users WHERE id = '{user_id}'
        ) 
            THEN raise notice 'User exists';
        ELSE
            INSERT INTO users (id, username, email)
            VALUES ('{user_id}', '{username}', '{email}');
        END IF;
    end
    $$
    "
    ))
    .execute(&pool)
    .await;

    match query {
        Ok(_) => web::HttpResponse::Ok().body(format!("User {username} created or exists")),
        Err(e) => web::HttpResponse::BadRequest().body(format!("Database Err: {e}")),
    }
}

#[derive(Deserialize, Serialize)]
struct HourCode {
    code: String,
    description: String,
    hours: i32,
}

#[derive(Deserialize, Serialize)]
struct WorkDay {
    day: String,
    codes: Vec<HourCode>,
}

#[derive(Deserialize, Serialize)]
struct WorkWeek {
    week: i32,
    year: i32,
    days: Vec<WorkDay>,
}

#[web::post("/work/{user_id}")]
async fn save_work_week(
    path: web::types::Path<String>,
    work_week: web::types::Json<WorkWeek>,
) -> impl web::Responder {
    let user_id = path.into_inner();
    let week = work_week.week;
    let year = work_week.year;

    let pool = connect_pool().await;

    let stringify = serde_json::to_string(&work_week.0);

    let stringified = match stringify {
        Ok(_) => stringify.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest().body(format!("Database Err: {e}"));
        }
    };

    let query = sqlx::query(&format!(
        "insert into work_weeks (week_year, work_week, user_id)
        values
        ('{week}-{year}', '{stringified}','{user_id}')
        on conflict (week_year)
        do update set 
            week_year = '{week}-{year}', 
            work_week = '{stringified}', 
            user_id = '{user_id}';"
    ))
    .execute(&pool)
    .await;

    match query {
        Ok(_) => web::HttpResponse::Ok().body("Week updated successfully".to_owned()),
        Err(e) => web::HttpResponse::BadRequest().body(format!("Database Err: {e}")),
    }
}

#[derive(FromRow)]
struct WorkWeekResponse {
    work_week: sqlx::types::Json<WorkWeek>,
}

#[web::get("/work/{user_id}/{week}/{year}")]
async fn get_work_week(path: web::types::Path<(String, String, String)>) -> impl web::Responder {
    let (user_id, week, year) = path.into_inner();

    let pool = connect_pool().await;

    let work_week = sqlx::query_as::<_, WorkWeekResponse>(&format!(
        "SELECT work_week  
        FROM work_weeks 
        WHERE user_id = '{user_id}' 
        AND week_year = '{week}-{year}';"
    ))
    .fetch_one(&pool)
    .await;

    match work_week {
        Ok(_) => web::HttpResponse::Ok().json(&work_week.unwrap().work_week),
        Err(e) => web::HttpResponse::BadRequest().body(format!("Database Err: {e}")),
    }
}

#[derive(Serialize)]
struct GetUserByIdResponse {
    username: String,
    email: String,
}

#[allow(dead_code)]
#[derive(FromRow)]
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
                    .allowed_header(http::header::CONTENT_TYPE)
                    .allowed_methods(vec!["GET", "POST"])
                    .finish(),
            )
            .service(hello_world)
            .service(get_user_by_id)
            .service(create_user)
            .service(save_work_week)
            .service(get_work_week)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
