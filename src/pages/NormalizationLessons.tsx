import React from 'react';
import { AIChat } from '../components/tutor/AIChat';
import { normalizationProblems } from '../data/normalizationProblems';

export function NormalizationLessons() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Normalization
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Learn 1NF, 2NF, and 3NF with practice problems from your curriculum
        </p>
      </div>

      <div className="space-y-6 mb-6">
        {normalizationProblems.map((problem) => (
          <div
            key={problem.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {problem.name}
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Relation:
              </div>
              <code className="text-sm text-gray-600 dark:text-gray-400">{problem.relation}</code>
            </div>
            {problem.dependencies && problem.dependencies.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Functional Dependencies:
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {problem.dependencies.map((dep, idx) => (
                    <li key={idx}>{dep}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tasks:
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {problem.tasks.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <AIChat context={{ category: 'normalization' }} />
      </div>
    </div>
  );
}
