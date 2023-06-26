const mysql = require('mysql');

const connectionDb = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week_3',
});

//Connect to the Database
connectionDb.connect((error) => {
  if (error) throw error;
  console.log('Connection established...');
});

module.exports = connectionDb;
