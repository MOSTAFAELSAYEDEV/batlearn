import React from 'react';
import { DatabaseType } from '../../types';
import { useAppStore } from '../../store/appStore';

const databases: { value: DatabaseType; label: string }[] = [
  { value: 'salesman', label: 'Salesman & Customer' },
  { value: 'nobel', label: 'Nobel Winners' },
  { value: 'tutor', label: 'Tutor/Student System' },
  { value: 'university', label: 'University System' },
];

export function DatabaseSelector() {
  const { currentDatabase, setCurrentDatabase } = useAppStore();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Database:
      </label>
      <select
        value={currentDatabase}
        onChange={(e) => setCurrentDatabase(e.target.value as DatabaseType)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        {databases.map((db) => (
          <option key={db.value} value={db.value}>
            {db.label}
          </option>
        ))}
      </select>
    </div>
  );
}
