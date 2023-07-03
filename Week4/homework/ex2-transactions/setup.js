const createDatabaseAndCollection = async (client) => {
  const newDataTransaction = await client
    .db('transaction_ex_2')
    .collection('account')
    .insertMany([
      {
        account_number: 101,
        balance: 5000,
        account_changes: [],
      },
      {
        account_number: 102,
        balance: 2000,
        account_changes: [],
      },
    ]);
  console.log(`Create account and values`);
  return newDataTransaction;
};

module.exports = createDatabaseAndCollection;
