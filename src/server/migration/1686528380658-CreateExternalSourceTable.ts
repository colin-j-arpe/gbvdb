import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExternalSourceTable1686528380658
  implements MigrationInterface
{
  name = 'CreateExternalSourceTable1686528380658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "external_source" ("id" SERIAL NOT NULL, "source" character varying NOT NULL, "identifier" integer NOT NULL, "url" character varying NOT NULL, "lastSourced" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a386c8c39845b30516eb214d980" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "external_source"`);
  }
}
