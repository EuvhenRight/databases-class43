const { MongoClient, ServerApiVersion } = require('mongodb');
const csvtojson = require('csvtojson');
require('dotenv').config();
const csvFilePath =
  '/Users/macbook/Documents/MySql/MySql_HW_week_4/databases-class43/Week4/homework/ex1-aggregation/population_pyramid_1950-2022.csv';

const csvToJsonStarting = async (client) => {
  const connectionToData = client.db('databaseWeek4').collection('HYF');
  const jsonArray = await csvtojson().fromFile(csvFilePath);

  const count = await connectionToData.countDocuments();

  if (count === 0) {
    const dataCsvToJsonResult = await connectionToData.insertMany(jsonArray);

    console.log(
      `${dataCsvToJsonResult.insertedCount} documents inserted successfully.`
    );
  }
};

const totalPopulationCountry = async (client, country) => {
  const resultSearchCountry = await client
    .db('databaseWeek4')
    .collection('HYF')
    .aggregate([
      { $match: { Country: country } },
      {
        $group: {
          _id: '$Year',
          countPopulation: {
            $sum: { $add: [{ $toInt: '$M' }, { $toInt: '$F' }] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ])
    .toArray();
  console.log(resultSearchCountry);
};

const totalPopulationContinent = async (client, year, age) => {
  const resultSearchContinent = await client
    .db('databaseWeek4')
    .collection('HYF')
    .aggregate([
      {
        $match: {
          Country: { $regex: '^[A-Z]+$' },
          Age: age,
          Year: year,
        },
      },
      {
        $addFields: {
          countPopulation: {
            $sum: { $add: [{ $toInt: '$M' }, { $toInt: '$F' }] },
          },
        },
      },
    ])
    .toArray();
  console.log(resultSearchContinent);
};

async function main() {
  const url = process.env.MONGODB_URL;
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

  try {
    await csvToJsonStarting(client);
    console.log('Data is ready...');

    await client.connect();
    console.log('Connecting...');

    await totalPopulationCountry(client, 'Afghanistan');

    await totalPopulationContinent(client, '2020', '100+');
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
    console.log('Connection close');
  }
}

main();
