import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.database_host,
      user: process.env.database_user,
      password: process.env.database_password,
      database: process.env.database_name,
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.database_host,
      user: process.env.database_user,
      password: process.env.database_password,
      database: process.env.database_name,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
