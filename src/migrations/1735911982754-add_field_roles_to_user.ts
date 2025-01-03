import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldRolesToUser1735911982754 implements MigrationInterface {
  name = "AddFieldRolesToUser1735911982754";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "fullName" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT ('student'))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "username", "fullName", "password") SELECT "id", "username", "fullName", "password" FROM "user"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "fullName" varchar NOT NULL, "password" varchar NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "fullName", "password") SELECT "id", "username", "fullName", "password" FROM "temporary_user"`
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
  }
}
