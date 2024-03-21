

--UUID_v4
create extension if not exists "uuid-ossp";
select uuid_generate_v4();


CREATE TABLE "users" (
  "id" varchar PRIMARY KEY,
  "username" varchar,
  "email" varchar UNIQUE,
  "created_at" timestamp default current_timestamp
);

CREATE TABLE "work_weeks" (
  "week_year" varchar UNIQUE PRIMARY KEY,
  "work_week" JSONB,
  "user_id" varchar,
  "created_at" timestamp default current_timestamp
);

CREATE TABLE "preferences" (
  "start_end_hours" JSONB,
  "hour_codes" JSONB,
  "user_id" varchar UNIQUE,
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

select start_end_hours, hour_codes from preferences where user_id = '114921769441012758740';

select week_year from work_weeks;

insert into preferences (start_end_hours , hour_codes, user_id)
	values
	('[]', '[]', '114921769441012758740')
;

delete from work_weeks where true;

insert into users (id, username, email)
	values
	('114921769441012758740', 'Lartrax', 'lartrax909@gmail.com'),
	('214923769435912758731', 'Lars Erik Nordbø', 'larsnor2304@gmail.com')
;

delete from users where id in ('114921769441012758740', '214923769435912758731');

do
$$
BEGIN
	IF EXISTS (
		select * FROM users WHERE id = '114921769441012758740'
	) 
		THEN raise notice 'User exists';
	ELSE
		INSERT INTO users (id, username, email)
		VALUES ('114921769441012758740', 'Lartrax', 'lartrax909@gmail.com');
	END IF;
end
$$
;

insert into work_weeks (week_year, work_week, user_id)
	values
	('12-2024', '{"week": 12, "year": 2024, "days": []}','114921769441012758740')
	on conflict (week_year)
	do update set 
		week_year = '12-2024', 
		work_week = '{"week": 12, "year": 2024, "days": []}', 
		user_id = '114921769441012758740'
;

delete from work_weeks where true;

SELECT work_week  FROM work_weeks WHERE user_id = '114921769441012758740' and week_year = '12-2024';