import { executeQuery } from './sqlExecutor';
import { DatabaseType } from '../types';

/**
 * Normalizes SQL query for comparison (removes whitespace, converts to lowercase)
 */
function normalizeSQL(sql: string): string {
  return sql
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/;\s*$/, '')
    .replace(/\s*\(/g, '(')
    .replace(/\s*\)/g, ')')
    .replace(/\s*,/g, ',')
    .replace(/,\s*/g, ', ');
}

/**
 * Compares two SQL queries by executing both and comparing results
 */
export async function validateSQL(
  userQuery: string,
  correctQuery: string,
  database: DatabaseType
): Promise<{
  isCorrect: boolean;
  userResults: { columns: string[]; values: any[][] } | null;
  correctResults: { columns: string[]; values: any[][] } | null;
  error?: string;
}> {
  try {
    // Execute both queries
    const userResults = await executeQuery(database, userQuery);
    const correctResults = await executeQuery(database, correctQuery);

    // Compare results
    if (!userResults && !correctResults) {
      return { isCorrect: true, userResults: null, correctResults: null };
    }

    if (!userResults || !correctResults) {
      return {
        isCorrect: false,
        userResults,
        correctResults,
        error: 'Query returned different number of result sets',
      };
    }

    // Compare columns
    if (userResults.columns.length !== correctResults.columns.length) {
      return {
        isCorrect: false,
        userResults,
        correctResults,
        error: 'Column count mismatch',
      };
    }

    // Compare column names (case-insensitive)
    const userCols = userResults.columns.map((c) => c.toLowerCase());
    const correctCols = correctResults.columns.map((c) => c.toLowerCase());
    const columnsMatch = userCols.every((col, idx) => col === correctCols[idx]);

    if (!columnsMatch) {
      return {
        isCorrect: false,
        userResults,
        correctResults,
        error: 'Column names do not match',
      };
    }

    // Compare row count
    if (userResults.values.length !== correctResults.values.length) {
      return {
        isCorrect: false,
        userResults,
        correctResults,
        error: `Row count mismatch: Expected ${correctResults.values.length}, got ${userResults.values.length}`,
      };
    }

    // Compare values (normalize for comparison)
    const normalizeValue = (val: any): string => {
      if (val === null || val === undefined) return 'NULL';
      return String(val).toLowerCase().trim();
    };

    const userValues = userResults.values.map((row) =>
      row.map(normalizeValue).join('|')
    );
    const correctValues = correctResults.values.map((row) =>
      row.map(normalizeValue).join('|')
    );

    // Sort for comparison (in case order differs but ORDER BY wasn't specified)
    const userSorted = [...userValues].sort();
    const correctSorted = [...correctValues].sort();

    const valuesMatch =
      userSorted.length === correctSorted.length &&
      userSorted.every((val, idx) => val === correctSorted[idx]);

    return {
      isCorrect: valuesMatch,
      userResults,
      correctResults,
      error: valuesMatch ? undefined : 'Result values do not match',
    };
  } catch (error: any) {
    return {
      isCorrect: false,
      userResults: null,
      correctResults: null,
      error: error.message || 'Query execution failed',
    };
  }
}

/**
 * Simple string-based comparison (for exact match)
 */
export function compareSQLStrings(userQuery: string, correctQuery: string): boolean {
  const normalizedUser = normalizeSQL(userQuery);
  const normalizedCorrect = normalizeSQL(correctQuery);
  return normalizedUser === normalizedCorrect;
}
