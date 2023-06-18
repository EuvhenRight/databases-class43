const fs = require('fs');
const path = require('path');
const connectionDb = require('./connection');

const mainQueryExecuted = (data) => {
    return new Promise((resolve, reject) => {
        connectionDb.query(data, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

executeDataAndShow = async (data, process) => {
    try {
        const result = await mainQueryExecuted(data);
        console.log(process);

        result.forEach((row) => {
            console.log(row.Name || row.Population);
        }) 
        console.log('------------------------------')
    } catch (err) {
        console.log('Something is wrong', err);
    }
}

connectionDb.changeUser({ database: 'world' }, (error) => {
    if (error) throw error;
    console.log("Successfully changed the database");
});

runningQueries = async () => {
    try {
        await mainQueryExecuted(`CREATE DATABASE IF NOT EXISTS world`);
        console.log('Database created');

        await mainQueryExecuted(`USE world`);
        console.log('Database selected.');

// Path to the database world.sql
const sqlPathFile = path.join(__dirname, 'world.sql');
const sqlWorld = fs.readFileSync(sqlPathFile, 'utf-8');
const sqlStatements = sqlWorld.split(';')

    await sqlStatements.reduce(
        (promise, query) => promise.then(() => mainQueryExecuted(query)),
        Promise.resolve()
    )

    console.log("All SQL statements executed successfully");

    await executeDataAndShow(
        "SELECT Name FROM country WHERE Population > 8000000",
        "The countries with Population greater than 8 million");

    await executeDataAndShow(
        'SELECT Name FROM country WHERE Name LIKE "%land%"',
        "The countries with name containing 'land' ");

    await executeDataAndShow(
        "SELECT Name FROM country WHERE Population > 500000 AND Population < 1000000",
        "The countries with Population between 500000 and 1000000");

    await executeDataAndShow(
        'SELECT Name FROM country WHERE Continent = "Europe"',
        "The countries from Europe");

    await executeDataAndShow(
        'SELECT Name FROM country ORDER BY SurfaceArea DESC',
        "The countries in descending order by SurfaceArea");

    await executeDataAndShow(
        'SELECT Name FROM city WHERE CountryCode = "NLD"',
        "The all cities from Netherlands");

    await executeDataAndShow(
        'SELECT Population FROM city WHERE Name = "Rotterdam"',
        "The population of Rotterdam");

    await executeDataAndShow(
        'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10',
        "The most 10 big countries in descending order by SurfaceArea");

    await executeDataAndShow(
        'SELECT Name FROM city ORDER BY Population DESC LIMIT 10',
        "The most 10 biggest cities in descending order by Population");

    const worldPopulation = await mainQueryExecuted('SELECT SUM(Population) AS WorldPopulation FROM country')
            console.log("The total population of the world")
            console.log(worldPopulation[0].WorldPopulation);

    connectionDb.end((err) => {
        if (err) throw err
        console.log("Disconnected from MySQL server")
    })

} catch (err) {
    console.log('Something is wrong', err)
    }
}

runningQueries ();

   