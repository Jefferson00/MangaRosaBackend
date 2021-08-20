/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationUserKnowledge1629420466949 implements MigrationInterface {
    name = 'RelationUserKnowledge1629420466949';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`mangarosa_db\`.\`users_knowledges_knowledges\` (\`usersId\` int NOT NULL, \`knowledgesId\` int NOT NULL, INDEX \`IDX_d8da2e5427a4b32a6dbd25f83b\` (\`usersId\`), INDEX \`IDX_ce183779757305f5d093fa84df\` (\`knowledgesId\`), PRIMARY KEY (\`usersId\`, \`knowledgesId\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`mangarosa_db\`.\`users_knowledges_knowledges\` ADD CONSTRAINT \`FK_d8da2e5427a4b32a6dbd25f83bd\` FOREIGN KEY (\`usersId\`) REFERENCES \`mangarosa_db\`.\`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`mangarosa_db\`.\`users_knowledges_knowledges\` ADD CONSTRAINT \`FK_ce183779757305f5d093fa84dfe\` FOREIGN KEY (\`knowledgesId\`) REFERENCES \`mangarosa_db\`.\`knowledges\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`mangarosa_db\`.\`users_knowledges_knowledges\` DROP FOREIGN KEY \`FK_ce183779757305f5d093fa84dfe\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`mangarosa_db\`.\`users_knowledges_knowledges\` DROP FOREIGN KEY \`FK_d8da2e5427a4b32a6dbd25f83bd\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_ce183779757305f5d093fa84df\` ON \`mangarosa_db\`.\`users_knowledges_knowledges\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_d8da2e5427a4b32a6dbd25f83b\` ON \`mangarosa_db\`.\`users_knowledges_knowledges\``,
        );
        await queryRunner.query(
            `DROP TABLE \`mangarosa_db\`.\`users_knowledges_knowledges\``,
        );
    }
}
