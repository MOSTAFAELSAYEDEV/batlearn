import { NormalizationProblem } from '../types';

// Normalization problems from Normalization Final Rev.pdf
export const normalizationProblems: NormalizationProblem[] = [
  {
    id: 'norm-1',
    name: 'Training Schedule',
    relation: 'Training_Schedule(CourseID, CourseName, Emp_ID, Emp_Name, Emp_Dept, St_Date, End_date, Emp_Performance)',
    tasks: ['Normalize to 3NF'],
  },
  {
    id: 'norm-2',
    name: 'Hospital Doctor-Patient',
    relation: 'Doc_Pat_Dept(DocID, Dname, Speciality, PatID, Pname, Gender, Age, Medication, D_Code, Deptname)',
    dependencies: [
      'Medication → (DocID, PatID)',
      'Dname, Speciality → DocID',
      'Pname, Gender, Age → PatID',
      'D_Code → DocID',
      'Deptname → D_Code',
    ],
    tasks: ['Find primary key', 'Normalize to 3NF with steps'],
  },
  {
    id: 'norm-3',
    name: 'Land Registry',
    relation: 'Land(Land_No, Owner Name, Owner ID, Date of Purchase, Location, area, usage type, perimeters)',
    tasks: ['Normalize to 3NF', 'Note: Land can be sold multiple times, multiple owners possible'],
  },
  {
    id: 'norm-4',
    name: 'Bank Branch',
    relation: 'Bank_Branch(CustomerID, Customername, customerphone, Accountno, Balance, AccountType, Loanno, Amount, LoanType)',
    tasks: ['Identify PK', 'Normalize to 3NF', 'Note: Customers can have multiple accounts and loans'],
  },
];
