var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_bagchia',
  password        : '5203',
  database        : 'cs361_bagchia',
  multipleStatements: true
});

module.exports.pool = pool;