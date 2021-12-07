const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "",
    host: "localhost",
    database: "pernstack",
    port: 5432,
});

module.exports = pool;