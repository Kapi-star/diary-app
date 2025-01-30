import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1738274621352 implements MigrationInterface {
    name = 'InitialMigrations1738274621352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "title" character varying(30) NOT NULL, "todoDetail" text, "startDate" TIMESTAMP, "timeRequired" integer, "isFinished" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id")); COMMENT ON COLUMN "todo"."userId" IS 'ユーザーID'; COMMENT ON COLUMN "todo"."title" IS 'タイトル'; COMMENT ON COLUMN "todo"."todoDetail" IS '内容'; COMMENT ON COLUMN "todo"."startDate" IS '始める日'; COMMENT ON COLUMN "todo"."timeRequired" IS 'かける時間（分）'; COMMENT ON COLUMN "todo"."isFinished" IS '完了したか'`);
        await queryRunner.query(`CREATE TABLE "diary" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "date" TIMESTAMP NOT NULL, "title" character varying(30) NOT NULL, "todo" text array, "timeSchedule" jsonb, "timeScheduleResult" jsonb, "pros" character varying array, "cons" text array, "improvements" text array, "freeComment" text, CONSTRAINT "PK_7422c55a0908c4271ff1918437d" PRIMARY KEY ("id")); COMMENT ON COLUMN "diary"."userId" IS 'ユーザーID'; COMMENT ON COLUMN "diary"."date" IS '始める日'; COMMENT ON COLUMN "diary"."title" IS 'タイトル'; COMMENT ON COLUMN "diary"."todo" IS '今日のタスク'; COMMENT ON COLUMN "diary"."timeSchedule" IS '今日のタイムスケジュール予定'; COMMENT ON COLUMN "diary"."timeScheduleResult" IS '今日のタイムスケジュール結果'; COMMENT ON COLUMN "diary"."pros" IS '良かった点'; COMMENT ON COLUMN "diary"."cons" IS '良くなかった点'; COMMENT ON COLUMN "diary"."improvements" IS '改善点'; COMMENT ON COLUMN "diary"."freeComment" IS 'コメント'`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(20) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "user"."username" IS 'ユーザー名'; COMMENT ON COLUMN "user"."email" IS 'メールアドレス'; COMMENT ON COLUMN "user"."password" IS 'パスワード'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "diary"`);
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
