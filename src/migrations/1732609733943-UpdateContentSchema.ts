import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateContentSchema1732609733943 implements MigrationInterface {
    name = 'UpdateContentSchema1732609733943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`content_version\` (\`id\` varchar(36) NOT NULL, \`version\` varchar(255) NOT NULL, \`data\` json NOT NULL, \`isLatest\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`contentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`contentTypeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_type\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`schema\` json NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`completed\` \`completed\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`content_version\` ADD CONSTRAINT \`FK_3d2d16fe9ea9872ff36a7c98ef7\` FOREIGN KEY (\`contentId\`) REFERENCES \`content\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content\` ADD CONSTRAINT \`FK_fc5d23b531c9501ddcdd0ab45f5\` FOREIGN KEY (\`contentTypeId\`) REFERENCES \`content_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`content\` DROP FOREIGN KEY \`FK_fc5d23b531c9501ddcdd0ab45f5\``);
        await queryRunner.query(`ALTER TABLE \`content_version\` DROP FOREIGN KEY \`FK_3d2d16fe9ea9872ff36a7c98ef7\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`completed\` \`completed\` tinyint(1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE \`content_type\``);
        await queryRunner.query(`DROP TABLE \`content\``);
        await queryRunner.query(`DROP TABLE \`content_version\``);
    }

}
