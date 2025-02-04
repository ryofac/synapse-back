import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPreviewUrlLesson1738626123016 implements MigrationInterface {
  name = "AddPreviewUrlLesson1738626123016";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_classroom" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "className" varchar NOT NULL, "teacherId" integer, "previewUrl" varchar, "description" varchar, CONSTRAINT "FK_2b3c1fa62762d7d0e828c139130" FOREIGN KEY ("teacherId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_classroom"("id", "className", "teacherId") SELECT "id", "className", "teacherId" FROM "classroom"`
    );
    await queryRunner.query(`DROP TABLE "classroom"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_classroom" RENAME TO "classroom"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "classroom" RENAME TO "temporary_classroom"`
    );
    await queryRunner.query(
      `CREATE TABLE "classroom" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "className" varchar NOT NULL, "teacherId" integer, CONSTRAINT "FK_2b3c1fa62762d7d0e828c139130" FOREIGN KEY ("teacherId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "classroom"("id", "className", "teacherId") SELECT "id", "className", "teacherId" FROM "temporary_classroom"`
    );
    await queryRunner.query(`DROP TABLE "temporary_classroom"`);
  }
}
