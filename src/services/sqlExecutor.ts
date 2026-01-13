import initSqlJs from 'sql.js';
import type { Database } from 'sql.js';
import { DatabaseType } from '../types';
import {
  salesmanDatabaseSQL,
  nobelDatabaseSQL,
  tutorDatabaseSQL,
  universityDatabaseSQL,
} from '../data/databases';

let SQL: any = null;
const databases: Map<DatabaseType, Database> = new Map();

export async function initializeSQL() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
    });
  }
  return SQL;
}

export async function loadDatabase(type: DatabaseType): Promise<Database> {
  if (databases.has(type)) {
    return databases.get(type)!;
  }

  const SQL = await initializeSQL();
  const db = new SQL.Database();

  // Parse and execute SQL based on database type
  const sqlStatements = getSQLForDatabase(type);
  const statements = sqlStatements.split(';').filter((s) => s.trim());

  for (const statement of statements) {
    if (statement.trim()) {
      try {
        db.run(statement);
      } catch (error) {
        console.error('Error executing SQL:', statement, error);
      }
    }
  }

  databases.set(type, db);
  return db;
}

function getSQLForDatabase(type: DatabaseType): string {
  switch (type) {
    case 'salesman':
      return salesmanDatabaseSQL;
    case 'nobel':
      return nobelDatabaseSQL;
    case 'tutor':
      return tutorDatabaseSQL;
    case 'university':
      return universityDatabaseSQL;
    default:
      return salesmanDatabaseSQL;
  }
}

export async function executeQuery(
  type: DatabaseType,
  query: string
): Promise<{ columns: string[]; values: any[][] } | null> {
  try {
    const db = await loadDatabase(type);
    const result = db.exec(query);

    if (result.length === 0) {
      return null;
    }

    const { columns, values } = result[0];
    return { columns, values };
  } catch (error: any) {
    throw new Error(error.message || 'Query execution failed');
  }
}

export function closeDatabase(type: DatabaseType) {
  const db = databases.get(type);
  if (db) {
    db.close();
    databases.delete(type);
  }
}

export function closeAllDatabases() {
  databases.forEach((db) => db.close());
  databases.clear();
}
