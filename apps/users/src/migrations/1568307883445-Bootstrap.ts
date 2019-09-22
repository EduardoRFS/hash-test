import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bootstrap1568307883445 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE "user" (
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "first_name" text NOT NULL,
        "last_name" text NOT NULL,
        "date_of_birth" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760"
        PRIMARY KEY ("id")
      );
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', '527f5437-c770-4336-b6bd-9e954aa54a35', 'User 0', 'Square 0', '2019-06-01 03:28:45.262');
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', '89edb0af-6a8f-4b4b-bac1-6bf556c7f5a4', 'User 1', 'Square 1', '2001-06-21 01:35:07.815');
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', 'f9769296-4e1e-483e-acb6-f92b246a51fc', 'User 2', 'Square 4', '2015-11-17 23:55:11.256');
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', '6ae95ea5-2132-49b3-9298-8883cea27ec7', 'User 3', 'Square 9', '1989-05-16 18:11:20.249');
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', '7459e394-3828-41b3-a907-31d3dcf1fd7d', 'User 4', 'Square 16', '2010-03-04 09:10:06.637');
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', '19ae7139-a080-4f14-9fca-a1f99511ee38', 'User 5', 'Square 25', '2004-08-11 17:13:42.745');
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', 'd0831283-ad93-48e7-90f6-cebc7ba84cb5', 'User 6', 'Square 36', '2007-11-07 22:54:25.929');
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', 'cf101e24-0698-4b71-a206-6b657d67d866', 'User 7', 'Square 49', '2014-11-21 15:44:24.091');
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', '3f045e1b-3ff7-429c-9ca1-e4e7585b48a6', 'User 8', 'Square 64', '2003-01-20 15:20:46.377');
      INSERT INTO "user" (created_at, id, first_name, last_name, date_of_birth) VALUES('2019-09-20 22:42:04.837', 'b9ca41e9-9ce9-4852-8b11-c6386cfb0e25', 'User 9', 'Square 81', '2019-01-21 22:00:31.273');
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
