// Give an example of a value that can be passed as name and code that would
// take advantage of SQL-injection and ( fetch all the records in the database)

// const name: 'Ukraine OR r=r'
// const code: +38 OR 1=1

// Rewrite the function so that it is no longer vulnerable to SQL injection

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  const nameProtect = 'Ukraine';
  const codeProtect = '+38';
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '?' and code = '?'`,
    [nameProtect, codeProtect],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result[0].name);
    }
  );
}
