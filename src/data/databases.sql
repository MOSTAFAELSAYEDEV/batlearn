-- Sample databases from curriculum
-- Database 1: Salesman & Customer

CREATE TABLE salesman (
    salesman_id INTEGER PRIMARY KEY,
    name TEXT,
    city TEXT,
    commission REAL
);

CREATE TABLE customer (
    customer_id INTEGER PRIMARY KEY,
    cust_name TEXT,
    city TEXT,
    grade INTEGER,
    salesman_id INTEGER,
    FOREIGN KEY (salesman_id) REFERENCES salesman(salesman_id)
);

-- Sample data for salesman
INSERT INTO salesman VALUES (5001, 'James Hoog', 'New York', 0.15);
INSERT INTO salesman VALUES (5002, 'Nail Knite', 'Paris', 0.13);
INSERT INTO salesman VALUES (5005, 'Pit Alex', 'London', 0.11);
INSERT INTO salesman VALUES (5006, 'Mc Lyon', 'Paris', 0.14);
INSERT INTO salesman VALUES (5007, 'Paul Adam', 'Rome', 0.13);
INSERT INTO salesman VALUES (5003, 'Lauson Hen', 'San Jose', 0.12);

-- Sample data for customer
INSERT INTO customer VALUES (3002, 'Nick Rimando', 'New York', 100, 5001);
INSERT INTO customer VALUES (3007, 'Brad Davis', 'New York', 200, 5001);
INSERT INTO customer VALUES (3005, 'Graham Zusi', 'California', 200, 5002);
INSERT INTO customer VALUES (3008, 'Julian Green', 'London', 300, 5002);
INSERT INTO customer VALUES (3004, 'Fabian Johnson', 'Paris', 300, 5006);
INSERT INTO customer VALUES (3009, 'Geoff Cameron', 'Berlin', 100, 5003);
INSERT INTO customer VALUES (3003, 'Jozy Altidor', 'Moscow', 200, 5007);
INSERT INTO customer VALUES (3001, 'Brad Guzan', 'London', NULL, 5005);

-- Database 2: Nobel Winners
CREATE TABLE nobel_win (
    year INTEGER,
    subject TEXT,
    winner TEXT,
    country TEXT,
    category TEXT
);

-- Sample data for nobel_win
INSERT INTO nobel_win VALUES (1970, 'Physics', 'Hannes Alfven', 'Sweden', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Physics', 'Louis Neel', 'France', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Chemistry', 'Luis Federico Leloir', 'France', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Physiology', 'Ulf von Euler', 'Sweden', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Physiology', 'Bernard Katz', 'Germany', 'Scientist');
INSERT INTO nobel_win VALUES (1970, 'Literature', 'Aleksandr Solzhenitsyn', 'Russia', 'Linguist');
INSERT INTO nobel_win VALUES (1970, 'Economics', 'Paul Samuelson', 'USA', 'Economist');
INSERT INTO nobel_win VALUES (1970, 'Physiology', 'Julius Axelrod', 'USA', 'Scientist');
INSERT INTO nobel_win VALUES (1971, 'Physics', 'Dennis Gabor', 'Hungary', 'Scientist');
INSERT INTO nobel_win VALUES (1971, 'Chemistry', 'Gerhard Herzberg', 'Germany', 'Scientist');
INSERT INTO nobel_win VALUES (1971, 'Peace', 'Willy Brandt', 'Germany', 'Chancellor');
INSERT INTO nobel_win VALUES (1971, 'Literature', 'Pablo Neruda', 'Chile', 'Linguist');
INSERT INTO nobel_win VALUES (1971, 'Economics', 'Simon Kuznets', 'Russia', 'Economist');
INSERT INTO nobel_win VALUES (1978, 'Peace', 'Anwar al-Sadat', 'Egypt', 'President');
INSERT INTO nobel_win VALUES (1978, 'Peace', 'Menachem Begin', 'Israel', 'Prime Minister');
INSERT INTO nobel_win VALUES (1987, 'Chemistry', 'Donald J. Cram', 'USA', 'Scientist');
INSERT INTO nobel_win VALUES (1987, 'Chemistry', 'Jean-Marie Lehn', 'France', 'Scientist');
INSERT INTO nobel_win VALUES (1987, 'Physiology', 'Susumu Tonegawa', 'Japan', 'Scientist');
INSERT INTO nobel_win VALUES (1994, 'Economics', 'Reinhard Selten', 'Germany', 'Economist');
INSERT INTO nobel_win VALUES (1994, 'Peace', 'Yitzhak Rabin', 'Israel', 'Prime Minister');
INSERT INTO nobel_win VALUES (1987, 'Physics', 'Johannes Georg Bednorz', 'Germany', 'Scientist');
INSERT INTO nobel_win VALUES (1987, 'Literature', 'Joseph Brodsky', 'Russia', 'Linguist');
INSERT INTO nobel_win VALUES (1987, 'Economics', 'Robert Solow', 'USA', 'Economist');
INSERT INTO nobel_win VALUES (1987, 'Literature', 'Derek Walcott', 'Saint Lucia', 'Linguist');
INSERT INTO nobel_win VALUES (1994, 'Economics', 'John Forbes Nash Jr.', 'USA', 'Economist');
INSERT INTO nobel_win VALUES (1994, 'Economics', 'John Harsanyi', 'USA', 'Economist');

-- Database 3: Tutor/Student System
CREATE TABLE Tutor (
    TutorID INTEGER PRIMARY KEY,
    CertDate TEXT,
    Status TEXT
);

CREATE TABLE Student (
    StudentID INTEGER PRIMARY KEY,
    Read INTEGER
);

CREATE TABLE Match_History (
    TutorID INTEGER,
    StudentID INTEGER,
    StartDate TEXT,
    EndDate TEXT,
    FOREIGN KEY (TutorID) REFERENCES Tutor(TutorID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)
);

-- Sample data for Tutor
INSERT INTO Tutor VALUES (1, '2020-01-15', 'Active');
INSERT INTO Tutor VALUES (2, '2020-02-20', 'Active');
INSERT INTO Tutor VALUES (3, '2019-12-10', 'Inactive');
INSERT INTO Tutor VALUES (4, '2020-03-05', 'Active');

-- Sample data for Student
INSERT INTO Student VALUES (101, 85);
INSERT INTO Student VALUES (102, 92);
INSERT INTO Student VALUES (103, 78);
INSERT INTO Student VALUES (104, 95);

-- Sample data for Match_History
INSERT INTO Match_History VALUES (1, 101, '2020-01-20', '2020-06-15');
INSERT INTO Match_History VALUES (2, 102, '2020-02-25', NULL);
INSERT INTO Match_History VALUES (1, 103, '2020-03-10', NULL);
INSERT INTO Match_History VALUES (4, 104, '2020-03-12', NULL);

-- Database 4: University System
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

-- Sample data for University System
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
