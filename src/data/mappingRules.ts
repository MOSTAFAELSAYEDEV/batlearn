import { MappingRule } from '../types';

// Mapping rules from Mapping Final Rev.pdf
export const mappingRules: MappingRule[] = [
  {
    id: 'simple-attribute',
    name: 'Simple Attribute',
    description: 'Maps directly to column in relation',
    example: 'StudentName → Student_T(StudentName)',
    erdElement: 'Simple attribute',
    relationalSchema: 'Direct column mapping',
  },
  {
    id: 'composite-attribute',
    name: 'Composite Attribute',
    description: 'Use only simple component attributes as columns',
    example: 'Address(Street, City, State) → Address_Street, Address_City, Address_State',
    erdElement: 'Composite attribute',
    relationalSchema: 'Component attributes as separate columns',
  },
  {
    id: 'multivalued-attribute',
    name: 'Multivalued Attribute',
    description: 'Create new relation with multivalued attribute + FK from parent entity',
    example: 'Phone numbers → Phone_T(PhoneNumber, StudentID)',
    erdElement: 'Multivalued attribute',
    relationalSchema: 'New relation with composite PK',
  },
  {
    id: 'weak-entity',
    name: 'Weak Entity',
    description: 'Separate relation with FK from strong entity. Partial identifier + PK of strong entity = Composite PK',
    example: 'Dependent → Dependent_T(DependentName, EmployeeID)',
    erdElement: 'Weak entity',
    relationalSchema: 'FK must be NOT NULL',
  },
  {
    id: 'binary-1m',
    name: 'Binary One-to-Many',
    description: 'PK from one side becomes FK on many side',
    example: 'Department → Course: Course_T(CourseID, ..., DepartmentID)',
    erdElement: '1:M relationship',
    relationalSchema: 'FK on many side',
  },
  {
    id: 'binary-mn',
    name: 'Binary Many-to-Many',
    description: 'Create new intersection relation. Both PKs become composite PK and are both FKs',
    example: 'Student ↔ Course → Registration_T(StudentID, CourseID)',
    erdElement: 'M:N relationship',
    relationalSchema: 'Intersection relation with composite PK',
  },
  {
    id: 'binary-11',
    name: 'Binary One-to-One',
    description: 'PK from mandatory side becomes FK on optional side',
    example: 'Employee → ParkingSpace: ParkingSpace_T(SpaceID, EmployeeID)',
    erdElement: '1:1 relationship',
    relationalSchema: 'FK on optional side',
  },
];
