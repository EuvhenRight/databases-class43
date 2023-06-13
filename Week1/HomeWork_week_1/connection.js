const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
});

//Connect to the Database
db.connect((error) => {
    if (error) throw error;
    console.log("Connection established");
  });

module.exports = db;
