const { MongoClient, ServerApiVersion } = require('mongodb');
const createDatabaseAndCollection = require('./setup.js');
require('dotenv').config();

const url = process.env.MONGO_URL;

// Connection
if (url == null) {
  throw Error(
    `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
  );
}

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const transfer = async (fromAccountNumber, toAccountNumber, amount, remark) => {
  // start session
  const session = client.startSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };

  try {
    //start transaction
    session.startTransaction(transactionOptions);

    const transactionCollection = client
      .db('transaction_ex_2')
      .collection('account');

    // find the accounts
    const fromAccount = await transactionCollection.findOne(
      { account_number: fromAccountNumber },
      { session }
    );
    const toAccount = await transactionCollection.findOne(
      { account_number: toAccountNumber },
      { session }
    );

    // check if the accounts exist
    if (!fromAccount || !toAccount) {
      throw new Error('Invalid account number');
    }

    if (fromAccount.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const currentDate = new Date();

    // count the number of documents
    const changeNumberFrom = fromAccount.account_changes.length + 1;
    const changeNumberTo = toAccount.account_changes.length + 1;

    // add object to the account_changes array fromAccount
    const fromAccountUpdates = await transactionCollection.updateOne(
      { ...fromAccount },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: changeNumberFrom,
            amount: amount,
            changed_date: currentDate,
            remark: `Money has been transferred to: ${remark} num: ${toAccountNumber}`,
          },
        },
      }
    );

    if (fromAccountUpdates === null) {
      throw new Error('Could not transfer money from the sender account');
    }
    // Add object to the account_changes array toAccount
    const toAccountUpdates = await transactionCollection.updateOne(
      { ...toAccount },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: changeNumberTo,
            amount: amount,
            changed_date: currentDate,
            remark: `Money had been received from: ${remark} num: ${fromAccountNumber}`,
          },
        },
      }
    );

    if (toAccountUpdates === null) {
      throw new Error('Could not receive money from the sender account');
    }

    // commit transaction
    await session.commitTransaction();

    console.log('Transaction successful');
  } catch (err) {
    console.log('Abort transaction', err);
    await session.abortTransaction();
    session.endSession();
  }
};

const main = async () => {
  // main logic
  try {
    await client.connect();
    console.log('Connected successfully to server');

    await client.db('transaction_ex_2').collection('account').deleteMany({});
    console.log('Accounts collection cleaned up');

    await createDatabaseAndCollection(client);

    await transfer(101, 102, 500, '`Hello World');
    await transfer(102, 101, 999, '`John Dove');
  } catch (err) {
    console.log('Something is wrong', err);
  } finally {
    // Always close the connection at the end
    client.close();
    console.log('Connection close');
  }
};

main();
