import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReleaseAndSongsTables1686528613333
  implements MigrationInterface
{
  name = 'CreateReleaseAndSongsTables1686528613333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "song" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "artist" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "releaseId" integer, "externalSourceId" integer NOT NULL, CONSTRAINT "REL_5f52717516f6e0a06dbd7f8c90" UNIQUE ("externalSourceId"), CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "release" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "artist" character varying NOT NULL, "releaseDate" TIMESTAMP, "label" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "externalSourceId" integer NOT NULL, CONSTRAINT "REL_bd3ffbdb533433f0de248419df" UNIQUE ("externalSourceId"), CONSTRAINT "PK_1a2253436964eea9c558f9464f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "song" ADD CONSTRAINT "FK_c538724139e7c58ca8618af2621" FOREIGN KEY ("releaseId") REFERENCES "release"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "song" ADD CONSTRAINT "FK_5f52717516f6e0a06dbd7f8c903" FOREIGN KEY ("externalSourceId") REFERENCES "external_source"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD CONSTRAINT "FK_bd3ffbdb533433f0de248419df4" FOREIGN KEY ("externalSourceId") REFERENCES "external_source"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "release" DROP CONSTRAINT "FK_bd3ffbdb533433f0de248419df4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "song" DROP CONSTRAINT "FK_5f52717516f6e0a06dbd7f8c903"`,
    );
    await queryRunner.query(
      `ALTER TABLE "song" DROP CONSTRAINT "FK_c538724139e7c58ca8618af2621"`,
    );
    await queryRunner.query(`DROP TABLE "release"`);
    await queryRunner.query(`DROP TABLE "song"`);
  }
}
