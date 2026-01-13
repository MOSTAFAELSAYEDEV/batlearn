import { useState, useEffect, useCallback } from 'react';
import { DatabaseType } from '../types';
import { loadDatabase, executeQuery, closeDatabase } from '../services/sqlExecutor';

export function useDatabase(type: DatabaseType) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    loadDatabase(type)
      .then(() => {
        setReady(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    return () => {
      closeDatabase(type);
    };
  }, [type]);

  const runQuery = useCallback(
    async (query: string) => {
      if (!ready) {
        throw new Error('Database not ready');
      }
      try {
        return await executeQuery(type, query);
      } catch (err: any) {
        throw new Error(err.message || 'Query execution failed');
      }
    },
    [type, ready]
  );

  return { loading, error, ready, runQuery };
}
