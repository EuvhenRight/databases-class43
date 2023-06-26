const connectionDb = require('./connection');
const {
  createTableAccount,
  createTableAccount_changes,
} = require('./transactions-create-tables');

const {
  insertValuesTables,
  insertValuesTransaction,
  updateValues,
} = require('./transactions-insert-values');

const queryExecuted = (data, description) => {
  return new Promise((resolve, reject) => {
    connectionDb.query(data, (err, result) => {
      if (err) reject(err);
      resolve(result);
      console.log(description || 'Loading...');
    });
  });
};

const runningTransaction = async () => {
  // breakpoints transaction
  const beginTransaction = () => {
    return queryExecuted('START TRANSACTION', 'Start transaction...');
  };

  const commitTransaction = () => {
    return queryExecuted('COMMIT');
  };

  const rollbackTransaction = () => {
    return queryExecuted('ROLLBACK', 'ROLLBACK');
  };

  try {
    await queryExecuted('DROP DATABASE IF EXISTS week_3');

    await queryExecuted(
      'CREATE DATABASE IF NOT EXISTS week_3',
      'Database created...'
    );

    await queryExecuted('USE week_3', 'Database selected...');

    await queryExecuted(createTableAccount, 'Create Table Account');

    await queryExecuted(
      createTableAccount_changes,
      'Create Table Account_changes'
    );

    // Add value into the table Account
    await queryExecuted(insertValuesTables, 'Add values into the table');

    // Start transaction
    await beginTransaction();

    // Insert new values into table
    await queryExecuted(insertValuesTransaction(101, 102, 1000), 'Process...');

    // Update the first table with a new value
    await queryExecuted(updateValues(101, 102, 1000), 'Update wallet');

    // Save changes transaction
    await commitTransaction();

    console.log('Transaction executed successfully');
  } catch (err) {
    console.log('Something went wrong:', err);
    // comeback transaction if we have an error
    await rollbackTransaction();
  } finally {
    connectionDb.end();
    console.log('Disconnected from MySQL server');
  }
};

runningTransaction();
