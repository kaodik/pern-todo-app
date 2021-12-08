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
  connectionString:
    "postgres://taqldwbjguwxid:f0cf26ab7c27ee3469b0b1c2c7f19388bcd2699c0986f91d8def0c499c71df8f@ec2-34-195-69-118.compute-1.amazonaws.com:5432/d31hogbkd10pq2", //heroku addons
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
