const connectionDb = require('./connection.js');


const mainQuery = (data) => {
    connectionDb.query(data,(err) => {
        if (err) throw err
    })
};

//create a database

mainQuery('DROP DATABASE IF EXISTS meetup')
    console.log('Database dropped');

mainQuery(`CREATE DATABASE IF NOT EXISTS meetup`)
    console.log('Database created');

// Select the database

mainQuery('USE meetup')
    console.log('Database selected');

// Create table Invitee
const inviteeTableQuery = `
    CREATE TABLE IF NOT EXISTS Invitee (
        invitee_no INT PRIMARY KEY AUTO_INCREMENT,
        invitee_name VARCHAR(255),
        invitee_by VARCHAR(255)
    )
    `;

mainQuery(inviteeTableQuery)
    console.log('Invitee Table created');

// Create table Room
const roomTableQuery = `
    CREATE TABLE IF NOT EXISTS Room (
        room_no INT PRIMARY KEY AUTO_INCREMENT,
        room_name VARCHAR(255),
        floor_number INT
    )
    `;

mainQuery(roomTableQuery)
    console.log('Room Table created');

// Create table Meeting
const meetingTableQuery = `
    CREATE TABLE IF NOT EXISTS Meeting (
        meeting_no INT PRIMARY KEY AUTO_INCREMENT,
        meeting_title VARCHAR(255),
        starting_time TIME,
        ending_time TIME,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
    )
    `;

mainQuery(meetingTableQuery)
    console.log('Meeting Table created');

// Insert values into Invitee

const insertValuesInvitee = `INSERT INTO Invitee (invitee_name, invitee_by) 
    VALUES 
    ('PERSON_1', 'COMPANY_1'), 
    ('PERSON_2', 'COMPANY_2'),
    ('PERSON_3', 'COMPANY_3'), 
    ('PERSON_4', 'COMPANY_4'), 
    ('PERSON_5', 'COMPANY_5')`;

mainQuery(insertValuesInvitee)
    console.log('Invitee values added');

        // Insert values into Room

const insertValuesRoom = `INSERT INTO Room (room_name, floor_number)
    VALUES 
    ('ROOM_1', 1), 
    ('ROOM_2', 2), 
    ('ROOM_3', 3), 
    ('ROOM_4', 4), 
    ('ROOM_5', 5)`;

  mainQuery(insertValuesRoom)
    console.log('Room values added');

// Insert values into Meeting
const insertValuesMeeting = `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
    VALUES 
    ('MEETING_1', '09:00:00', '10:00:00', 1), 
    ('MEETING_2', '10:00:00', '11:00:00', 2), 
    ('MEETING_3', '11:00:00', '12:00:00', 3), 
    ('MEETING_4', '12:00:00', '13:00:00', 4), 
    ('MEETING_5', '13:00:00', '14:00:00', 5)`;

mainQuery(insertValuesMeeting)
    console.log('Meeting values added');

//Show table Invitee
const selectInviteeTable = `SELECT * FROM Invitee`;
    connectionDb.query(selectInviteeTable, (err, result) => {
        if(err) throw err 
            console.log('Table invitee');
            console.table(result); // Display the retrieved data
        });

// Show table Room
const selectRoomQuery = `SELECT * FROM Room`;
    connectionDb.query(selectRoomQuery, (err,result) => {
    if (err) throw err
        console.log('Table room');
        console.table(result); // Display the retrieved data
        });
    
//Show table Meeting
const selectQuery = `SELECT * FROM Meeting`;
connectionDb.query(selectQuery, (err, result) => {
    if (err) throw err;
    console.log('Table meeting');
    console.table(result); // Display the retrieved data
});

    connectionDb.end((err) => {
    if (err) throw err
        console.log("Database connection closed")
        });