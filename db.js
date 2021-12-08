const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};
//another version of the code above
//const devConfig = `postgresql://${proccess.env.PG_USER}:${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.
//PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
//then put connection string in the Pool example below
//const pool = new Pool({connectionString : process.env.NODE_ENV === "production"? proConfig : devConfig});

const proConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addons
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};
const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);
// ({
//   user: "postgres",
//   password: "",
//   host: "localhost",
//   database: "pernstack",
//   port: 5432,
//});

module.exports = pool;
