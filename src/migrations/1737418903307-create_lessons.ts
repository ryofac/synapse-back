import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLessons1737418903307 implements MigrationInterface {
    name = 'CreateLessons1737418903307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lesson" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ownerId" integer NOT NULL, "date" datetime NOT NULL, "subject" varchar NOT NULL, "description" varchar NOT NULL, "classroomId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_lesson" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ownerId" integer NOT NULL, "date" datetime NOT NULL, "subject" varchar NOT NULL, "description" varchar NOT NULL, "classroomId" integer, CONSTRAINT "FK_8b6d946af64cde1e7408012f6d6" FOREIGN KEY ("classroomId") REFERENCES "classroom" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_lesson"("id", "ownerId", "date", "subject", "description", "classroomId") SELECT "id", "ownerId", "date", "subject", "description", "classroomId" FROM "lesson"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`ALTER TABLE "temporary_lesson" RENAME TO "lesson"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" RENAME TO "temporary_lesson"`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ownerId" integer NOT NULL, "date" datetime NOT NULL, "subject" varchar NOT NULL, "description" varchar NOT NULL, "classroomId" integer)`);
        await queryRunner.query(`INSERT INTO "lesson"("id", "ownerId", "date", "subject", "description", "classroomId") SELECT "id", "ownerId", "date", "subject", "description", "classroomId" FROM "temporary_lesson"`);
        await queryRunner.query(`DROP TABLE "temporary_lesson"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
    }

}
