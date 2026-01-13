// Sample databases from curriculum

export const salesmanDatabaseSQL = `
CREATE TABLE salesman (
    salesman_id INTEGER PRIMARY KEY,
    name TEXT,
    city TEXT,
    commission REAL
);

INSERT INTO salesman VALUES (5001, 'James', 'Paris', 0.13);
INSERT INTO salesman VALUES (5002, 'Mc Lyon', 'Rome', 0.12);
INSERT INTO salesman VALUES (5003, 'Pit Alex', 'Paris', 0.14);
INSERT INTO salesman VALUES (5004, 'Lauss', 'London', 0.11);
`;

export const nobelDatabaseSQL = `
CREATE TABLE nobel_win (
    year INTEGER,
    subject TEXT,
    winner TEXT,
    country TEXT,
    category TEXT
);

INSERT INTO nobel_win VALUES (1970, 'Physics', 'Hannes Alfven', 'Sweden', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Physics', 'Louis Neel', 'France', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Chemistry', 'Luis Federico Leloir', 'France', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Physiology', 'Ulf von Euler', 'Sweden', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Physiology', 'Bernard Katz', 'Germany', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Literature', 'Aleksandr Solzhenitsyn', 'Russia', 'Linguist');
INSERT INTO nobel_win VALUES (1970, 'Economics', 'Paul Samuelson', 'USA', 'Economist');
INSERT INTO nobel_win VALUES (1970, 'Physiology', 'Julius Axelrod', 'USA', 'Scientist');
`;

export const tutorDatabaseSQL = `
CREATE TABLE Tutor (
    TutorID INTEGER PRIMARY KEY,
    CertDate TEXT,
    Status TEXT
);

CREATE TABLE Student (
    StudentID INTEGER PRIMARY KEY,
    Read REAL
);

CREATE TABLE Match_History (
    MatchID INTEGER PRIMARY KEY,
    TutorID INTEGER,
    StudentID INTEGER,
    StartDate TEXT,
    EndDate TEXT,
    FOREIGN KEY (TutorID) REFERENCES Tutor(TutorID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)
);

INSERT INTO Tutor VALUES (100, '2008-01-05', 'Active');
INSERT INTO Tutor VALUES (101, '2008-01-05', 'Temp Stop');
INSERT INTO Tutor VALUES (102, '2008-01-05', 'Dropped');
INSERT INTO Tutor VALUES (103, '2008-05-22', 'Active');
INSERT INTO Tutor VALUES (104, '2008-05-22', 'Active');
INSERT INTO Tutor VALUES (105, '2008-05-22', 'Temp Stop');
INSERT INTO Tutor VALUES (106, '2008-05-22', 'Active');

INSERT INTO Student VALUES (3000, 2.3);
INSERT INTO Student VALUES (3001, 5.6);
INSERT INTO Student VALUES (3002, 1.3);
INSERT INTO Student VALUES (3003, 3.3);
INSERT INTO Student VALUES (3004, 2.7);
INSERT INTO Student VALUES (3005, 4.8);
INSERT INTO Student VALUES (3006, 7.8);
INSERT INTO Student VALUES (3007, 1.5);

INSERT INTO Match_History VALUES (1, 100, 3000, '2008-01-10', NULL);
INSERT INTO Match_History VALUES (2, 101, 3001, '2008-01-15', '2008-05-15');
INSERT INTO Match_History VALUES (3, 102, 3002, '2008-02-10', '2008-03-01');
INSERT INTO Match_History VALUES (4, 106, 3003, '2008-05-28', NULL);
INSERT INTO Match_History VALUES (5, 103, 3004, '2008-06-01', '2008-06-15');
INSERT INTO Match_History VALUES (6, 104, 3005, '2008-06-01', '2008-06-28');
INSERT INTO Match_History VALUES (7, 104, 3006, '2008-06-01', NULL);
`;

export const universityDatabaseSQL = `
CREATE TABLE Student_T (
    StudentID INTEGER PRIMARY KEY,
    StudentName TEXT
);

CREATE TABLE Faculty_T (
    FacultyID INTEGER PRIMARY KEY,
    FacultyName TEXT
);

CREATE TABLE Course_T (
    CourseID TEXT PRIMARY KEY,
    CourseName TEXT
);

CREATE TABLE Section_T (
    SectionNo INTEGER,
    Semester TEXT,
    CourseID TEXT,
    PRIMARY KEY (CourseID, SectionNo, Semester),
    FOREIGN KEY (CourseID) REFERENCES Course_T(CourseID)
);

CREATE TABLE Qualified_T (
    FacultyID INTEGER,
    CourseID TEXT,
    DateQualified TEXT,
    PRIMARY KEY (FacultyID, CourseID),
    FOREIGN KEY (FacultyID) REFERENCES Faculty_T(FacultyID),
    FOREIGN KEY (CourseID) REFERENCES Course_T(CourseID)
);

CREATE TABLE Registration_T (
    StudentID INTEGER,
    SectionNo INTEGER,
    Semester TEXT,
    CourseID TEXT,
    PRIMARY KEY (StudentID, SectionNo, Semester),
    FOREIGN KEY (StudentID) REFERENCES Student_T(StudentID),
    FOREIGN KEY (SectionNo, Semester, CourseID) 
        REFERENCES Section_T(SectionNo, Semester, CourseID)
);

INSERT INTO Student_T VALUES (1, 'Ahmed Ali');
INSERT INTO Student_T VALUES (2, 'Fatima Hassan');
INSERT INTO Student_T VALUES (3, 'Mohamed Ibrahim');

INSERT INTO Faculty_T VALUES (101, 'Dr. Smith');
INSERT INTO Faculty_T VALUES (102, 'Dr. Johnson');
INSERT INTO Faculty_T VALUES (103, 'Dr. Williams');

INSERT INTO Course_T VALUES ('CS101', 'Introduction to Computer Science');
INSERT INTO Course_T VALUES ('CS201', 'Data Structures');
INSERT INTO Course_T VALUES ('DB101', 'Database Systems');

INSERT INTO Section_T VALUES (1, 'Fall 2023', 'CS101');
INSERT INTO Section_T VALUES (2, 'Fall 2023', 'CS101');
INSERT INTO Section_T VALUES (1, 'Spring 2024', 'CS201');
INSERT INTO Section_T VALUES (1, 'Fall 2023', 'DB101');

INSERT INTO Qualified_T VALUES (101, 'CS101', '2020-01-01');
INSERT INTO Qualified_T VALUES (101, 'CS201', '2020-01-01');
INSERT INTO Qualified_T VALUES (102, 'DB101', '2020-01-01');
INSERT INTO Qualified_T VALUES (103, 'CS101', '2020-01-01');

INSERT INTO Registration_T VALUES (1, 1, 'Fall 2023', 'CS101');
INSERT INTO Registration_T VALUES (1, 1, 'Spring 2024', 'CS201');
INSERT INTO Registration_T VALUES (2, 2, 'Fall 2023', 'CS101');
INSERT INTO Registration_T VALUES (2, 1, 'Fall 2023', 'DB101');
INSERT INTO Registration_T VALUES (3, 1, 'Fall 2023', 'CS101');
`;
