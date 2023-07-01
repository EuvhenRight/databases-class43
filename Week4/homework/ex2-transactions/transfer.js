const { MongoClient, ServerApiVersion } = require('mongodb');
const createDatabaseAndCollection = require('./setup.js');

const MONGODB_URL =
  'mongodb+srv://YevhenRight:azsxdc12345@cluster0.j9imenb.mongodb.net/?retryWrites=true&w=majority';

const transfer = async (fromAccountNumber, toAccountNumber, amount, remark) => {
  if (MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  await client.connect();

  const session = client.startSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };

  try {
    session.startTransaction(transactionOptions);

    const transactionCollection = client
      .db('transaction_ex_2')
      .collection('account');

    const fromAccount = await transactionCollection.findOne(
      { account_number: fromAccountNumber },
      { session }
    );
    const toAccount = await transactionCollection.findOne(
      { account_number: toAccountNumber },
      { session }
    );

    if (!fromAccount || !toAccount) {
      throw new Error('Invalid account number');
    }

    if (fromAccount.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const currentDate = new Date();

    const transaction = {
      change_number: 3,
      amount: amount,
      changed_date: currentDate,
      remark: `${remark}: ${toAccountNumber}`,
    };

    await transactionCollection.updateOne(
      { account_number: fromAccountNumber },
      { $push: { account_changes: { $each: [transaction] } } },
      { session }
    );

    const updatedFromAccount = {
      ...fromAccount,
      balance: fromAccount.balance - amount,
    };

    const updatedToAccount = {
      ...toAccount,
      balance: toAccount.balance + amount,
    };

    await transactionCollection.updateOne(
      { account_number: fromAccountNumber },
      { $set: updatedFromAccount },
      { session }
    );

    await transactionCollection.updateOne(
      { account_number: toAccountNumber },
      { $set: updatedToAccount },
      { session }
    );

    await session.commitTransaction();

    console.log('Transaction successful');
  } catch (err) {
    console.log('Abort transaction', err);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};

const main = async () => {
  if (MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }

  const client = new MongoClient(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    console.log('Connected successfully to server');

    await client.db('transaction_ex_2').collection('account').deleteMany({});
    console.log('Accounts collection cleaned up');

    await createDatabaseAndCollection(client);

    await transfer(101, 102, 1000, 'Transfer test');
  } catch (err) {
    console.log('Something is wrong', err);
  } finally {
    // Always close the connection at the end
    client.close();
    console.log('Connection close');
  }
};

main();
