const mysql = require('mysql');
const util = require('util');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'authorization'
});

conn.connect();

// const db = util.promisify(conn.query).bind(conn)

module.exports = conn;