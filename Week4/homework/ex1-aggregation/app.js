const { MongoClient, ServerApiVersion } = require('mongodb');
const csvtojson = require('csvtojson');
const csvFilePath =
  '/Users/macbook/Documents/MySql/MySql_HW_week_4/databases-class43/Week4/homework/ex1-aggregation/population_pyramid_1950-2022.csv';

const MONGODB_URL =
  'mongodb+srv://YevhenRight:azsxdc12345@cluster0.j9imenb.mongodb.net/?retryWrites=true&w=majority';

const csvToJsonStarting = async (client) => {
  const jsonArray = await csvtojson().fromFile(csvFilePath);

  const collection = client.db('databaseWeek4').collection('HYF');

  const count = await collection.countDocuments();

  if (count === 0) {
    const dataCsvToJsonResult = await collection.insertMany(jsonArray);

    console.log(
      `${dataCsvToJsonResult.insertedCount} documents inserted successfully.`
    );
  }
};

async function main() {
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
    await csvToJsonStarting(client);
    console.log('Data is ready...');

    await client.connect();
    console.log('Connecting...');
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
    console.log('Connection close');
  }
}

main();
