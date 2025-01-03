import { MigrationInterface, QueryRunner } from "typeorm";

export class UsernameUnique1735915154706 implements MigrationInterface {
    name = 'UsernameUnique1735915154706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "classroom" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "className" varchar NOT NULL, "teacherId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "fullName" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT ('student'), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "user_joined_classes_classroom" ("userId" integer NOT NULL, "classroomId" integer NOT NULL, PRIMARY KEY ("userId", "classroomId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_53a738b6f9f3d88ed43b8cfa81" ON "user_joined_classes_classroom" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ccfe5b4b3605684b27d36697be" ON "user_joined_classes_classroom" ("classroomId") `);
        await queryRunner.query(`CREATE TABLE "temporary_classroom" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "className" varchar NOT NULL, "teacherId" integer, CONSTRAINT "FK_2b3c1fa62762d7d0e828c139130" FOREIGN KEY ("teacherId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_classroom"("id", "className", "teacherId") SELECT "id", "className", "teacherId" FROM "classroom"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`ALTER TABLE "temporary_classroom" RENAME TO "classroom"`);
        await queryRunner.query(`DROP INDEX "IDX_53a738b6f9f3d88ed43b8cfa81"`);
        await queryRunner.query(`DROP INDEX "IDX_ccfe5b4b3605684b27d36697be"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_joined_classes_classroom" ("userId" integer NOT NULL, "classroomId" integer NOT NULL, CONSTRAINT "FK_53a738b6f9f3d88ed43b8cfa815" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_ccfe5b4b3605684b27d36697beb" FOREIGN KEY ("classroomId") REFERENCES "classroom" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "classroomId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_joined_classes_classroom"("userId", "classroomId") SELECT "userId", "classroomId" FROM "user_joined_classes_classroom"`);
        await queryRunner.query(`DROP TABLE "user_joined_classes_classroom"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_joined_classes_classroom" RENAME TO "user_joined_classes_classroom"`);
        await queryRunner.query(`CREATE INDEX "IDX_53a738b6f9f3d88ed43b8cfa81" ON "user_joined_classes_classroom" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ccfe5b4b3605684b27d36697be" ON "user_joined_classes_classroom" ("classroomId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_ccfe5b4b3605684b27d36697be"`);
        await queryRunner.query(`DROP INDEX "IDX_53a738b6f9f3d88ed43b8cfa81"`);
        await queryRunner.query(`ALTER TABLE "user_joined_classes_classroom" RENAME TO "temporary_user_joined_classes_classroom"`);
        await queryRunner.query(`CREATE TABLE "user_joined_classes_classroom" ("userId" integer NOT NULL, "classroomId" integer NOT NULL, PRIMARY KEY ("userId", "classroomId"))`);
        await queryRunner.query(`INSERT INTO "user_joined_classes_classroom"("userId", "classroomId") SELECT "userId", "classroomId" FROM "temporary_user_joined_classes_classroom"`);
        await queryRunner.query(`DROP TABLE "temporary_user_joined_classes_classroom"`);
        await queryRunner.query(`CREATE INDEX "IDX_ccfe5b4b3605684b27d36697be" ON "user_joined_classes_classroom" ("classroomId") `);
        await queryRunner.query(`CREATE INDEX "IDX_53a738b6f9f3d88ed43b8cfa81" ON "user_joined_classes_classroom" ("userId") `);
        await queryRunner.query(`ALTER TABLE "classroom" RENAME TO "temporary_classroom"`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "className" varchar NOT NULL, "teacherId" integer)`);
        await queryRunner.query(`INSERT INTO "classroom"("id", "className", "teacherId") SELECT "id", "className", "teacherId" FROM "temporary_classroom"`);
        await queryRunner.query(`DROP TABLE "temporary_classroom"`);
        await queryRunner.query(`DROP INDEX "IDX_ccfe5b4b3605684b27d36697be"`);
        await queryRunner.query(`DROP INDEX "IDX_53a738b6f9f3d88ed43b8cfa81"`);
        await queryRunner.query(`DROP TABLE "user_joined_classes_classroom"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
    }

}
