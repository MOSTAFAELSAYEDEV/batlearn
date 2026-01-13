// Core types for the application

export type DatabaseType = 'salesman' | 'nobel' | 'tutor' | 'university';

export interface SQLProblem {
  id: string;
  title: string;
  description: string;
  database: DatabaseType;
  parts: SQLProblemPart[];
  sampleData?: {
    [tableName: string]: {
      columns: string[];
      rows: any[][];
    };
  };
}

export interface SQLProblemPart {
  id: string;
  question: string;
  solution: string;
  explanation: string;
  hints: string[];
}

export interface ERDProblem {
  id: string;
  title: string;
  description: string;
  entities: ERDEntity[];
  relationships: ERDRelationship[];
  solution?: ERDSolution;
}

export interface ERDEntity {
  id: string;
  name: string;
  type: 'strong' | 'weak' | 'associative';
  attributes: ERDAttribute[];
  position?: { x: number; y: number };
}

export interface ERDAttribute {
  id: string;
  name: string;
  type: 'simple' | 'composite' | 'multivalued';
  isKey: boolean;
  isPartialKey?: boolean;
}

export interface ERDRelationship {
  id: string;
  name: string;
  type: 'unary' | 'binary' | 'ternary';
  entities: string[]; // Entity IDs
  cardinality: '1:1' | '1:M' | 'M:N';
  participation: {
    [entityId: string]: 'mandatory' | 'optional';
  };
}

export interface ERDSolution {
  entities: ERDEntity[];
  relationships: ERDRelationship[];
}

export interface MappingRule {
  id: string;
  name: string;
  description: string;
  example: string;
  erdElement: string;
  relationalSchema: string;
}

export interface NormalizationProblem {
  id: string;
  name: string;
  relation: string;
  dependencies?: string[];
  tasks: string[];
  solution?: NormalizationSolution;
}

export interface NormalizationSolution {
  primaryKey: string;
  steps: {
    nf: '1NF' | '2NF' | '3NF';
    violations: string[];
    normalized: string[];
  }[];
}

export interface TutorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: {
    problemId?: string;
    category?: 'sql' | 'erd' | 'mapping' | 'normalization';
  };
}

export interface Progress {
  sql: {
    completed: string[];
    total: number;
  };
  erd: {
    completed: string[];
    total: number;
  };
  mapping: {
    completed: string[];
    total: number;
  };
  normalization: {
    completed: string[];
    total: number;
  };
}

export interface UserSettings {
  id: string;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  fontSize: number;
}
