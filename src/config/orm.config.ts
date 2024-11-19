import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { CreateTask1654578859820 } from '../migrations/1654578859820-CreateTask';
import { Task } from '../todo/task.entity';
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
  migrations: [CreateTask1654578859820],
  entities: [Task],
};

const testOptions: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: false,
  migrationsRun: true,
  entities: [Task],
  migrations: [CreateTask1654578859820],
  factories: [TaskFactory],
  seeds: [TaskSeeder],
};

// used by CLI commands
// export const AppDataSource = new DataSource({ ...testOptions, ...mainOptions });

export default registerAs('orm', () =>
  process.env.NODE_ENV === 'test' ? testOptions : mainOptions,
);

export const AppDataSource = new DataSource(mainOptions);