const createDatabaseAndCollection = async (client) => {
  const currentDate = new Date();

  const newDataTransaction = await client
    .db('transaction_ex_2')
    .collection('account')
    .insertMany([
      {
        account_number: 101,
        balance: 5000,
      },
      {
        account_number: 102,
        balance: 2000,
      },
      {
        account_changes: [
          {
            change_number: 1,
            amount: 1000,
            changed_date: currentDate,
            remark: 'transaction from account: 102',
          },
          {
            change_number: 2,
            amount: -1000,
            changed_date: currentDate,
            remark: 'transaction to account: 101',
          },
        ],
      },
    ]);
  console.log(`Create account and values`);
  return newDataTransaction;
};

module.exports = createDatabaseAndCollection;
