const connectionDb = require('./connect');

const mainQueryExecuted = (data, description) => {
  return new Promise((resolve, reject) => {
    connectionDb.query(data, description, (err, results) => {
      if (err) reject(err);
      resolve(results);
      console.log(description || 'Loading...');
    });
  });
};

runningQueries = async () => {
  try {
    await mainQueryExecuted(`
    DROP DATABASE IF EXISTS week_2`);

    await mainQueryExecuted(
      `
    CREATE DATABASE IF NOT EXISTS week_2`,
      'Database created...'
    );

    await mainQueryExecuted(
      `
    USE week_2`,
      'Database selected...'
    );

    await mainQueryExecuted(
      `
    CREATE TABLE IF NOT EXISTS authors (
      author_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      author_name VARCHAR(255),
      university VARCHAR(255),
      date_of_birth DATE,
      h_index INT,
      gender VARCHAR(10)
      )`,
      'Create the table authors'
    );

    await mainQueryExecuted(`
    ALTER TABLE authors
    ADD COLUMN mentor INT,
    ADD CONSTRAINT fk_mentor
    FOREIGN KEY (mentor)
    REFERENCES authors(author_id)
  `);

    await mainQueryExecuted(
      `
    CREATE TABLE IF NOT EXISTS research_Papers (
      paper_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
      paper_title VARCHAR(255), 
      conference VARCHAR(255), 
      publish_date DATE
      )`,
      'Create the table research_Papers'
    );

    await mainQueryExecuted(
      `
    CREATE TABLE IF NOT EXISTS authors_and_research_Papers (
      author_id INT,
      paper_id INT,
      PRIMARY KEY (author_id, paper_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id),
      FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
    )`,
      'Create the table authors_and_research_Papers'
    );

    await mainQueryExecuted(`
  INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
  VALUES
  ('Luke Skywalker', 'Jedi Academy', '1977-05-25', 10, 'Male', 1),
  ('Leia Organa', 'Alderaan University', '1977-05-25', 8, 'Female', 1),
  ('Han Solo', 'Smuggler University', '1977-05-25', 12, 'Male', 1),
  ('Anakin Skywalker', 'Jedi Temple', '1977-05-25', 7, 'Male', 1),
  ('Padmé Amidala', 'Naboo University', '1977-05-25', 9, 'Female', 3),
  ('Obi-Wan Kenobi', 'Jedi Academy', '1977-05-25', 11, 'Male', 3),
  ('Yoda', 'Dagobah University', '1977-05-25', 6, 'Male', 3),
  ('Darth Vader', 'Sith Academy', '1977-05-25', 13, 'Male', 5),
  ('Mace Windu', 'Jedi Temple', '1977-05-25', 8, 'Male', 5),
  ('Boba Fett', 'Bounty Hunter Institute', '1977-05-25', 15, 'Male', 5),
  ('Lando Calrissian', 'Cloud City University', '1977-05-25', 9, 'Male', 4),
  ('Qui-Gon Jinn', 'Jedi Temple', '1977-05-25', 12, 'Male', 4),
  ('Rey Skywalker', 'Jedi Academy', '1977-05-25', 7, 'Female', 4),
  ('Finn', 'Resistance Academy', '1977-05-25', 10, 'Male', 2),
  ('Poe Dameron', 'Resistance Academy', '1977-05-25', 7, 'Male', 2)
`);

    await mainQueryExecuted(
      `
  INSERT INTO research_Papers (paper_title, conference, publish_date)
    VALUES
    ('The Force and Its Influence', 'Jedi Conference', '2022-01-01 09:00:00'),
    ('Lightsabers: A Comprehensive Study', 'Jedi Academy Symposium', '2022-02-03 14:30:00'),
    ('The Dark Side: Origins and Effects', 'Sith Summit', '2022-03-12 10:45:00'),
    ('The Clone Wars: Strategies and Tactics', 'Republic Defense Forum', '2022-04-15 16:20:00'),
    ('The Rise and Fall of the Galactic Empire', 'Historical Perspectives Conference', '2022-05-21 11:30:00'),
    ('The Prophecy of the Chosen One', 'Jedi Prophecy Symposium', '2022-06-18 13:45:00'),
    ('The Millennium Falcon: A Legend in Space Travel', 'Starship Expo', '2022-07-02 08:15:00'),
    ('Holography: Communication of the Future', 'Galactic Communications Summit', '2022-08-09 12:00:00'),
    ('The Jedi Code: Principles and Applications', 'Jedi Philosophy Conference', '2022-09-18 16:15:00'),
    ('The Legacy of Darth Vader', 'Sith Legacy Symposium', '2022-10-24 10:30:00'),
    ('The Rebellion Against the Empire', 'Resistance History Symposium', '2022-11-30 15:45:00'),
    ('The Force Awakens: New Possibilities', 'Force Awakening Conference', '2022-12-25 11:00:00'),
    ('The Mandalorian: A Journey Through the Outer Rim', 'Outer Rim Exploration Symposium', '2023-01-31 14:30:00'),
    ('The Battle of Endor: Turning Point in the Galactic Civil War', 'Galactic Warfare Symposium', '2023-02-28 09:45:00'),
    ('The Wisdom of Master Yoda', 'Yoda Wisdom Retreat', '2023-03-31 12:15:00'),
    ('The Art of Lightsaber Dueling', 'Lightsaber Combat Workshop', '2023-04-30 16:30:00'),
    ('The Force and Its Connection to Life', 'Force and Life Conference', '2023-05-31 10:00:00'),
    ('The Secrets of the Sith Holocron', 'Sith Artefacts Exhibition', '2023-06-30 14:45:00'),
    ('The Resistance: Defending Freedom', 'Resistance Strategy Summit', '2023-07-31 11:30:00'),
    ('The Star Wars Saga: A Cinematic Masterpiece', 'Film Studies Symposium', '2023-08-31 15:00:00'),
    ('The Clone Troopers: Engineering and Training', 'Clone Trooper Forum', '2023-09-30 10:45:00'),
    ('The Jedi Temple: History and Architecture', 'Jedi Temple Study Group', '2023-10-31 13:30:00'),
    ('The Dark Side: Temptations and Consequences', 'Dark Side Seminar', '2023-11-30 17:15:00'),
    ('The Rise of the First Order', 'First Order Symposium', '2023-12-31 11:30:00'),
    ('The Droids of Star Wars', 'Droid Expo', '2024-01-31 15:45:00'),
    ('The Legacy of Luke Skywalker', 'Jedi Legacy Symposium', '2024-02-29 10:00:00'),
    ('The Battle of Hoth: Strategies and Outcomes', 'Hoth Battle Analysis', '2024-03-31 12:30:00'),
    ('The Star Destroyer: The Pride of the Empire', 'Star Destroyer Showcase', '2024-04-30 16:45:00'),
    ('The Path to Redemption: Anakin Skywalker', 'Redemption Seminar', '2024-05-31 11:15:00'),
    ('The Force Ghosts: Beyond Mortality', 'Force Ghost Symposium', '2024-06-30 14:30:00')
`,
      'Add values to table research_Papers'
    );

    await mainQueryExecuted(`
  INSERT INTO authors_and_research_Papers (author_id, paper_id)
    VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (5, 4),
    (5, 5),
    (6, 6),
    (6, 7),
    (3, 8),
    (3, 9),
    (3, 10),
    (10, 11),
    (10, 12),
    (12, 13),
    (12, 14),
    (13, 15),
    (2, 16),
    (2, 17),
    (2, 18),
    (4, 19),
    (4, 20),
    (4, 21),
    (7, 22),
    (9, 23),
    (9, 24),
    (9, 25),
    (11, 26),
    (12, 27),
    (15, 28),
    (15, 29),
    (15, 30)
`);

    const queries1 = await mainQueryExecuted(
      `
  SELECT author_name AS author, mentor
  FROM authors;`,
      '1. Write a query that prints names of all authors and their corresponding mentors.'
    );
    console.table(queries1);

    const queries2 = await mainQueryExecuted(
      `
  SELECT authors.author_name AS author, COALESCE(research_Papers.paper_title, 'No papers') AS papers
  FROM authors
  LEFT JOIN authors_and_research_Papers AS aarP ON authors.author_id	= aarP.author_id
  LEFT JOIN research_Papers ON research_Papers.paper_id	= aarP.paper_id;`,
      `2. Write a query that prints all columns of authors and their published paper_title. 
  If there is an author without any research_Papers, print the information of that author too.`
    );

    console.table(queries2);

    const queries3 = await mainQueryExecuted(
      `
  SELECT research_Papers.paper_title AS papers, authors.author_name AS authors
  FROM research_Papers
  INNER JOIN authors_and_research_Papers AS aarP ON research_Papers.paper_id	= aarP.paper_id
  INNER JOIN authors ON authors.author_id	= aarP.author_id;`,
      `3. All research papers and the number of authors that wrote that paper.`
    );

    console.table(queries3);

    const queries4 = await mainQueryExecuted(
      `
      SELECT
      COUNT(DISTINCT research_Papers.paper_id) AS total_female_papers
    FROM
      research_Papers
    INNER JOIN authors_and_research_Papers AS aarP ON research_Papers.paper_id = aarP.paper_id
    INNER JOIN authors ON authors.author_id = aarP.author_id
    WHERE
      authors.gender = 'Female';
  `,
      '4. All research papers and the number of authors that wrote that paper.'
    );

    console.table(queries4);

    const queries5 = await mainQueryExecuted(
      `
  SELECT authors.university AS university,
  AVG(authors.h_index) AS average_h_index
  FROM authors
  GROUP BY authors.university;`,
      '5. Average of the h-index of all authors per university.'
    );

    console.table(queries5);

    const queries6 = await mainQueryExecuted(
      `
      SELECT
      authors.university AS university,
      COUNT(research_Papers.paper_id) AS total_research_papers
    FROM
      research_Papers
    INNER JOIN authors_and_research_Papers AS aarP ON research_Papers.paper_id = aarP.paper_id
    INNER JOIN authors ON authors.author_id = aarP.author_id
    GROUP BY authors.university;
  `,
      '6. Sum of the research papers of the authors per university.'
    );

    console.table(queries6);

    const queries7 = await mainQueryExecuted(
      `
  SELECT authors.university AS university,
    MIN(authors.h_index) AS min_h_index,
    MAX(authors.h_index) AS max_h_index
  FROM authors
  GROUP BY authors.university;`,
      '7. Minimum and maximum of the h-index of all authors per university.'
    );

    console.table(queries7);

    connectionDb.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });
  } catch (err) {
    console.log('Error, something is wrong', err);
  }
};

runningQueries();
