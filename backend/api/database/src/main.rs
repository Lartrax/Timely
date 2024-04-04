use ntex::{http, web};
use ntex_cors::Cors;
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPoolOptions, Error, FromRow, Pool, Postgres};

async fn connect_pool() -> Result<Pool<Postgres>, Error> {
    PgPoolOptions::new()
        .max_connections(5)
        // TODO: Move url to .env
        .connect("postgres://postgres:LRZ8GPmEqe-@35.228.17.43/postgres")
        .await
}

#[web::post("/user/{user_id}/{username}/{email}")]
async fn create_user(path: web::types::Path<(String, String, String)>) -> impl web::Responder {
    let (user_id, username, email) = path.into_inner();

    let connection = connect_pool().await;

    let pool = match connection {
        Ok(_) => connection.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest()
                .body(format!("Unable to connoct to database: {e}"))
        }
    };

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
    hours: f32,
}

#[derive(Deserialize, Serialize)]
struct WorkDay {
    day: String,
    codes: Vec<HourCode>,
    start: String,
    end: String,
}

#[derive(Deserialize, Serialize)]
struct WorkWeek {
    week: String,
    year: String,
    days: Vec<WorkDay>,
}

#[web::post("/work/{user_id}")]
async fn save_work_week(
    path: web::types::Path<String>,
    work_week: web::types::Json<WorkWeek>,
) -> impl web::Responder {
    let user_id = path.into_inner();
    let week = &work_week.week;
    let year = &work_week.year;

    let connection = connect_pool().await;

    let pool = match connection {
        Ok(_) => connection.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest()
                .body(format!("Unable to connoct to database: {e}"))
        }
    };

    // Convert work_week to Json string
    let stringify = serde_json::to_string(&work_week.0);
    let stringified = match stringify {
        Ok(_) => stringify.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest().body(format!("Json Err: {e}"));
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

    let connection = connect_pool().await;

    let pool = match connection {
        Ok(_) => connection.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest()
                .body(format!("Unable to connoct to database: {e}"))
        }
    };

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

#[derive(Serialize, FromRow)]
struct WorkWeeksResponse {
    week_year: String,
}

#[web::get("/work/{user_id}")]
async fn get_all_work_weeks(path: web::types::Path<String>) -> impl web::Responder {
    let user_id = path.into_inner();

    let connection = connect_pool().await;

    let pool = match connection {
        Ok(_) => connection.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest()
                .body(format!("Unable to connoct to database: {e}"))
        }
    };

    let work_weeks = sqlx::query_as::<_, WorkWeeksResponse>(&format!(
        "SELECT week_year  
        FROM work_weeks 
        WHERE user_id = '{user_id}'
        ORDER BY week_year;"
    ))
    .fetch_all(&pool)
    .await;

    match work_weeks {
        Ok(_) => web::HttpResponse::Ok().json(&work_weeks.unwrap()),
        Err(e) => web::HttpResponse::BadRequest().body(format!("Database Err: {e}")),
    }
}

#[derive(Deserialize, Serialize)]
struct StartEndTime {
    start: String,
    end: String,
}
#[derive(Deserialize, Serialize, FromRow)]
struct Preferences {
    start_end_time: sqlx::types::Json<Vec<StartEndTime>>,
    time_codes: sqlx::types::Json<Vec<String>>,
}

#[web::get("/preferences/{user_id}")]
async fn get_preferences(path: web::types::Path<String>) -> impl web::Responder {
    let user_id = path.into_inner();

    let connection = connect_pool().await;

    let pool = match connection {
        Ok(_) => connection.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest()
                .body(format!("Unable to connoct to database: {e}"))
        }
    };

    let preferences = sqlx::query_as::<_, Preferences>(&format!(
        "SELECT start_end_time, time_codes 
        FROM preferences 
        WHERE user_id = '{user_id}';"
    ))
    .fetch_one(&pool)
    .await;

    match preferences {
        Ok(_) => web::HttpResponse::Ok().json(&preferences.unwrap()),
        Err(e) => web::HttpResponse::BadRequest().body(format!("Database Err: {e}")),
    }
}

#[web::post("/preferences/{user_id}")]
async fn update_preferences(
    path: web::types::Path<String>,
    prefs: web::types::Json<Preferences>,
) -> impl web::Responder {
    let user_id = path.into_inner();

    let connection = connect_pool().await;

    let pool = match connection {
        Ok(_) => connection.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest()
                .body(format!("Unable to connoct to database: {e}"))
        }
    };

    // Convert start_end_time to Json string
    let start_end_time = serde_json::to_string(&prefs.0.start_end_time);
    let str_start_end_time = match start_end_time {
        Ok(_) => start_end_time.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest().body(format!("Json Err: {e}"));
        }
    };

    // Convert time_codes to Json string
    let time_codes = serde_json::to_string(&prefs.0.time_codes);
    let str_time_codes = match time_codes {
        Ok(_) => time_codes.unwrap(),
        Err(e) => {
            return web::HttpResponse::BadRequest().body(format!("Json Err: {e}"));
        }
    };

    let query = sqlx::query(&format!(
        "insert into preferences (start_end_time , time_codes, user_id)
        values   
        ('{str_start_end_time}', '{str_time_codes}', {user_id})
        on conflict (user_id)
        do update set 
            start_end_time = '{str_start_end_time}', 
            time_codes = '{str_time_codes}';"
    ))
    .execute(&pool)
    .await;

    match query {
        Ok(_) => web::HttpResponse::Ok().body("Preferences updated successfully".to_owned()),
        Err(e) => web::HttpResponse::BadRequest().body(format!("Database Err: {e}")),
    }
}

#[ntex::main]
async fn main() -> std::io::Result<()> {
    web::HttpServer::new(|| {
        web::App::new()
            .wrap(
                Cors::new()
                    .allowed_header(http::header::ACCESS_CONTROL_ALLOW_ORIGIN)
                    .allowed_header(http::header::CONTENT_TYPE)
                    .allowed_header(http::header::ACCEPT)
                    .allowed_methods(vec!["GET", "POST"])
                    .finish(),
            )
            .service(create_user)
            .service(save_work_week)
            .service(get_work_week)
            .service(get_preferences)
            .service(update_preferences)
            .service(get_all_work_weeks)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
