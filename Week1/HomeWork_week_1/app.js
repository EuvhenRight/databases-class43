const db = require('./connection.js');

//create a database

    db.query('DROP DATABASE IF EXISTS meetup',(err) => {
        if (err) throw err
        console.log('Database dropped');
    });

const createSqlDb = `CREATE DATABASE IF NOT EXISTS meetup`;
    db.query(createSqlDb, (err) => {
        if(err) throw err 
            console.log('Database created')
    });

// Select the database

    db.query('USE meetup', (err) => {
    if(err) throw err 
            console.log('Database selected.');
    });

// Create table Invitee
const inviteeTableQuery = `
    CREATE TABLE IF NOT EXISTS Invitee (
        invitee_no INT PRIMARY KEY AUTO_INCREMENT,
        invitee_name VARCHAR(255),
        invitee_by VARCHAR(255)
    )
    `;

    db.query(inviteeTableQuery, (err) => {
        if(err) throw err 
            console.log('Invitee Table created');
    });

// Create table Room
const roomTableQuery = `
    CREATE TABLE IF NOT EXISTS Room (
        room_no INT PRIMARY KEY AUTO_INCREMENT,
        room_name VARCHAR(255),
        floor_number INT
    )
    `;

    db.query(roomTableQuery, (err) => {
    if(err) throw err
        console.log('Room Table created');
        });

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

    db.query(meetingTableQuery, (err) => {
    if(err) throw err
        console.log('Meeting Table created');
        });    

// Insert values into Invitee

const insertValuesInvitee = `INSERT INTO Invitee (invitee_name, invitee_by) 
    VALUES 
    ('PERSON_1', 'COMPANY_1'), 
    ('PERSON_2', 'COMPANY_2'),
    ('PERSON_3', 'COMPANY_3'), 
    ('PERSON_4', 'COMPANY_4'), 
    ('PERSON_5', 'COMPANY_5')`;

    db.query(insertValuesInvitee, (err) => {
        if(err) throw err 
            console.log('Invitee values added');
        });

        // Insert values into Room

const insertValuesRoom = `INSERT INTO Room (room_name, floor_number)
    VALUES 
    ('ROOM_1', 1), 
    ('ROOM_2', 2), 
    ('ROOM_3', 3), 
    ('ROOM_4', 4), 
    ('ROOM_5', 5)`;

    db.query(insertValuesRoom, (err) => {
    if(err) throw err
        console.log('Room values added');
        });

// Insert values into Meeting
const insertValuesMeeting = `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
    VALUES 
    ('MEETING_1', '09:00:00', '10:00:00', 1), 
    ('MEETING_2', '10:00:00', '11:00:00', 2), 
    ('MEETING_3', '11:00:00', '12:00:00', 3), 
    ('MEETING_4', '12:00:00', '13:00:00', 4), 
    ('MEETING_5', '13:00:00', '14:00:00', 5)`;

    db.query(insertValuesMeeting, (err) => {
    if(err) throw err
        console.log('Meeting values added');
        });

//Show table Invitee
const selectInveeeTable = `SELECT * FROM Invitee`;
    db.query(selectInveeeTable, (err, result) => {
        if(err) throw err 
            console.log('Table invitee retrieved');
            console.log(result); // Display the retrieved data
        });

// Show table Room
const selectRoomQuery = `SELECT * FROM Room`;
    db.query(selectRoomQuery, (err,result) => {
    if (err) throw err
        console.log('Table room retrieved');
        console.log(result); // Display the retrieved data
        });
    
//Show table Meeting
const selectQuery = `SELECT * FROM Meeting`;
db.query(selectQuery, (err, result) => {
    if (err) throw err;
    console.log('Table meeting retrieved');
    console.log(result); // Display the retrieved data
});

    db.end((err) => {
    if (err) throw err
        console.log("Database connection closed")
        })