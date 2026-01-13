import { SQLProblem } from '../types';

export const sqlProblems: SQLProblem[] = [
  {
    id: 'sql-q1',
    title: 'QUESTION 1: Salesman Table',
    description: 'Based on the Salesman table, write the SQL statements to retrieve specific data.',
    database: 'salesman',
    sampleData: {
      salesman: {
        columns: ['salesman_id', 'name', 'city', 'commission'],
        rows: [
          [5001, 'James', 'Paris', 0.13],
          [5002, 'Mc Lyon', 'Rome', 0.12],
          [5003, 'Pit Alex', 'Paris', 0.14],
          [5004, 'Lauss', 'London', 0.11],
        ],
      },
    },
    parts: [
      {
        id: 'sql-q1-1',
        question: 'Write an SQL statement to display the names and commissions for all salespeople.',
        solution: 'SELECT name, commission FROM salesman;',
        explanation: 'This query selects two specific columns from the salesman table.',
        hints: ['Use SELECT', 'Specify columns separated by comma'],
      },
      {
        id: 'sql-q1-2',
        question: 'Write an SQL query to locate salespeople who live in the city of Paris. Return salesperson’s name and city.',
        solution: "SELECT name, city FROM salesman WHERE city = 'Paris';",
        explanation: 'Use the WHERE clause to filter by city.',
        hints: ["WHERE city = 'Paris'"],
      },
      {
        id: 'sql-q1-3',
        question: 'Write an SQL statement to display salesman name and commission for salespeople who take more than 0.13 commission only.',
        solution: 'SELECT name, commission FROM salesman WHERE commission > 0.13;',
        explanation: 'Use the greater than (>) operator in the WHERE clause.',
        hints: ['commission > 0.13'],
      },
    ],
  },
  {
    id: 'sql-q2',
    title: 'QUESTION 2: Nobel Winners',
    description: 'Query the nobel_win table to find specific prize winners.',
    database: 'nobel',
    sampleData: {
      nobel_win: {
        columns: ['YEAR', 'SUBJECT', 'WINNER', 'COUNTRY', 'CATEGORY'],
        rows: [
          [1970, 'Physics', 'Hannes Alfven', 'Sweden', 'Scientist'],
          [1970, 'Physics', 'Louis Neel', 'France', 'Scientist'],
          [1970, 'Chemistry', 'Luis Federico Leloir', 'France', 'Scientist'],
          [1970, 'Physiology', 'Ulf von Euler', 'Sweden', 'Scientist'],
          [1970, 'Physiology', 'Bernard Katz', 'Germany', 'Scientist'],
          [1970, 'Literature', 'Aleksandr Solzhenitsyn', 'Russia', 'Linguist'],
          [1970, 'Economics', 'Paul Samuelson', 'USA', 'Economist'],
          [1970, 'Physiology', 'Julius Axelrod', 'USA', 'Scientist'],
        ],
      },
    },
    parts: [
      {
        id: 'sql-q2-a',
        question: 'a) Write an SQL query to find the Nobel Prize winners in the field of Physics since 1950. Return winner.',
        solution: "SELECT Winner FROM nobel_win WHERE Subject = 'Physics' AND Year >= 1950;",
        explanation: 'Filter by Subject and Year using AND condition.',
        hints: ["Subject = 'Physics'", 'Year >= 1950'],
      },
      {
        id: 'sql-q2-b',
        question: 'b) Write an SQL query to find the Nobel Prize winners in Chemistry between the years 1965 and 1975 (inclusive). Return year, subject, winner, and country.',
        solution: "SELECT Year, Subject, Winner, Country FROM nobel_win WHERE Subject = 'Chemistry' AND Year BETWEEN 1965 AND 1975;",
        explanation: 'BETWEEN operator is used for range filtering.',
        hints: ['Year BETWEEN 1965 AND 1975'],
      },
      {
        id: 'sql-q2-c',
        question: 'c) Write an SQL query to display all details of the winners after 1972.',
        solution: 'SELECT * FROM nobel_win WHERE Year > 1972;',
        explanation: 'Use * to select all columns and filter by year.',
        hints: ['Year > 1972'],
      },
      {
        id: 'sql-q2-d',
        question: 'd) Write an SQL query to retrieve the details of the winners whose first name is Louis. Return year, subject, winner, country, and category.',
        solution: "SELECT Year, Subject, Winner, Country, Category FROM nobel_win WHERE Winner LIKE 'Louis%';",
        explanation: 'Use LIKE with % wildcard to search for names starting with Louis.',
        hints: ["Winner LIKE 'Louis%'"],
      },
    ],
  },
  {
    id: 'sql-q4',
    title: 'QUESTION 4: Adult Literacy Program',
    description: 'Track tutors, students, and matches in the literacy program database.',
    database: 'tutor',
    sampleData: {
      Tutor: {
        columns: ['TutorID', 'CertDate', 'Status'],
        rows: [
          [100, '2008-01-05', 'Active'],
          [101, '2008-01-05', 'Temp Stop'],
          [102, '2008-01-05', 'Dropped'],
          [103, '2008-05-22', 'Active'],
          [104, '2008-05-22', 'Active'],
          [105, '2008-05-22', 'Temp Stop'],
          [106, '2008-05-22', 'Active'],
        ],
      },
    },
    parts: [
      {
        id: 'sql-q4-10',
        question: '10) How many tutors have a status of Temp Stop?',
        solution: "SELECT COUNT(*) FROM Tutor WHERE Status = 'Temp Stop';",
        explanation: 'COUNT(*) returns the number of rows matching the criteria.',
        hints: ["Status = 'Temp Stop'"],
      },
      {
        id: 'sql-q4-11',
        question: '11) List the tutors who took the certification class in January. (Format: YYYY-MM-DD)',
        solution: "SELECT TutorID FROM Tutor WHERE CertDate BETWEEN '2008-01-01' AND '2008-01-31';",
        explanation: 'Filter CertDate for the month of January.',
        hints: ["BETWEEN '2008-01-01' AND '2008-01-31'"],
      },
      {
        id: 'sql-q4-12',
        question: '12) How many students were matched with someone in the first five months of the year?',
        solution: "SELECT COUNT(*) FROM Match_History WHERE StartDate BETWEEN '2008-01-01' AND '2008-05-31';",
        explanation: 'Count matches starting between January and May.',
        hints: ["BETWEEN '2008-01-01' AND '2008-05-31'"],
      },
      {
        id: 'sql-q4-13',
        question: '13) Which student has the highest Read score? Return StudentID and Read.',
        solution: 'SELECT StudentID, Read FROM Student ORDER BY Read DESC LIMIT 1;',
        explanation: 'Order by Read in descending order and limit to the top row.',
        hints: ['ORDER BY Read DESC', 'LIMIT 1'],
      },
    ],
  },
];
