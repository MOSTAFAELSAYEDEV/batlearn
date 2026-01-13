import { ERDProblem } from '../types';

// ERD curriculum content - to be populated with exact content from ERD Final Rev.pdf
export const erdProblems: ERDProblem[] = [
  {
    id: 'erd-1',
    title: 'University Database',
    description: 'Design an ERD for a university system. Create a "Student" entity with "StudentID" (PK), "Name", and "Email". Create a "Course" entity with "CourseID" (PK) and "Title". Connect them with an "Enrolled_In" relationship (M:N).',
    entities: [],
    relationships: [],
    solution: {
      entities: [
        {
          id: 'ent-student',
          name: 'Student',
          type: 'strong',
          attributes: [
            { id: 'attr-sid', name: 'StudentID', type: 'simple', isKey: true },
            { id: 'attr-sname', name: 'Name', type: 'simple', isKey: false },
            { id: 'attr-semail', name: 'Email', type: 'simple', isKey: false },
          ],
        },
        {
          id: 'ent-course',
          name: 'Course',
          type: 'strong',
          attributes: [
            { id: 'attr-cid', name: 'CourseID', type: 'simple', isKey: true },
            { id: 'attr-ctitle', name: 'Title', type: 'simple', isKey: false },
          ],
        },
      ],
      relationships: [
        {
          id: 'rel-enroll',
          name: 'Enrolled_In',
          type: 'binary',
          entities: ['ent-student', 'ent-course'],
          cardinality: 'M:N',
          participation: {
            'ent-student': 'mandatory',
            'ent-course': 'mandatory',
          },
        },
      ],
    },
  },
];
