/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateKnowledge1629405212203 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'knowledges',
                columns: [
                    {
                        name: 'id',
                        type: 'Integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
        await queryRunner.manager.createQueryBuilder()
            .insert()
            .into('knowledges')
            .values([
                {
                    name: "Git",
                },
                {
                    name: "React"
                },
                {
                    name: "PHP",
                },
                {
                    name: "NodeJS",
                },
                {
                    name: "DevOps",
                },
                {
                    name: "Banco de dados",
                },
                {
                    name: "Typescript"
                }
            ])
            .execute()

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('knowledges');
    }

}
