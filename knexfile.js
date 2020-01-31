// Update with your config settings.
const sqlite = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
}

module.exports = {

  dev: {
    ...sqlite, 
    connection: {
      filename: './data/dev.sqlite3'
    }, 
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      },
    },
  },

  test: {
    ...sqlite,
    connection: {
      filename: './data/test.sqlite3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      },
    },
  },

  production: {
    client: 'pg',
    connection:'process.env.DATABASE_URL',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
