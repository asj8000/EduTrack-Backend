import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { CreateTask1654578859820 } from '../migrations/1654578859820-CreateTask';
import { CreateContentSchema1732038303591 } from '../migrations/1732038303591-CreateContentSchema';
import { Task } from '../todo/task.entity';
import { ContentType } from '../content/entities/content-type.entity';
import { Content } from '../content/entities/content.entity';
import { ContentVersion } from '../content/entities/content-version.entity';
import TaskFactory from '../todo/task.factory';
import TaskSeeder from '../todo/task.seeder';

const mainOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'edutrack',
  synchronize: false,
  migrations: [CreateTask1654578859820, CreateContentSchema1732038303591],
  entities: [Task, ContentType, Content, ContentVersion],
};

const testOptions: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: false,
  migrationsRun: true,
  entities: [Task, ContentType, Content, ContentVersion],
  migrations: [CreateTask1654578859820, CreateContentSchema1732038303591],
  factories: [TaskFactory],
  seeds: [TaskSeeder],
};

export default registerAs('orm', () =>
  process.env.NODE_ENV === 'test' ? testOptions : mainOptions,
);

export const AppDataSource = new DataSource(mainOptions);