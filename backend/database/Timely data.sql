

--UUID_v4
create extension if not exists "uuid-ossp";
select uuid_generate_v4();


CREATE TABLE "users" (
  "id" varchar PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "created_at" timestamp default current_timestamp
);

CREATE TABLE "work_weeks" (
  "id" varchar default uuid_generate_v4() PRIMARY KEY,
  "week" integer,
  "year" integer,
  "work_week" JSONB,
  "user_id" varchar,
  "created_at" timestamp default current_timestamp
);

CREATE TABLE "preferences" (
  "start_end_hours" JSONB,
  "hour_codes" JSONB,
  "user_id" varchar,
  "created_at" timestamp default current_timestamp
);

COMMENT ON COLUMN "work_weeks"."work_week" IS '[ { code: 1234, desc: "Working hard", hours: 7.5 }, {... ]';

COMMENT ON COLUMN "preferences"."start_end_hours" IS '{ monday: { from: "08:00", to: "15:30" }, tue... }';

COMMENT ON COLUMN "preferences"."hour_codes" IS '[ { code: 1234, desc: "Working hard" } ]';

ALTER TABLE "work_weeks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "preferences" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");


select * from users;
select * from work_weeks;
select * from preferences;

drop table work_weeks;
drop table preferences;
drop table users;


insert into users (id, username, email)
	values
	('114921769441012758740', 'Lartrax', 'lartrax909@gmail.com'),
	('214923769435912758731', 'Lars Erik Nordbø', 'larsnor2304@gmail.com')
;

delete from users where id in ('114921769441012758740', '214923769435912758731');

