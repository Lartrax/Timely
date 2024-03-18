CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "created_at" timestamp
);

CREATE TABLE "work_weeks" (
  "id" varchar PRIMARY KEY,
  "week" integer,
  "year" integer,
  "work_week" JSONB,
  "user_id" integer,
  "created_at" timestamp
);

CREATE TABLE "preferences" (
  "id" varchar PRIMARY KEY,
  "start_end_hours" JSONB,
  "hour_codes" JSONB,
  "user_id" integer,
  "created_at" timestamp
);

COMMENT ON COLUMN "work_weeks"."work_week" IS '[ { code: 1234, desc: "Working hard", hours: 7.5 }, {... ]';

COMMENT ON COLUMN "preferences"."start_end_hours" IS '{ monday: { from: "08:00", to: "15:30" }, tue... }';

COMMENT ON COLUMN "preferences"."hour_codes" IS '[ { code: 1234, desc: "Working hard" } ]';

ALTER TABLE "work_weeks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "preferences" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
