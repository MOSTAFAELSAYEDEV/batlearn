import React from 'react';
import { AIChat } from '../components/tutor/AIChat';
import { mappingRules } from '../data/mappingRules';

export function MappingLessons() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          ERD to Relational Mapping
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Learn how to map ERD elements to relational database schemas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {mappingRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {rule.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{rule.description}</p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Example:
              </div>
              <code className="text-sm text-gray-600 dark:text-gray-400">{rule.example}</code>
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-700 dark:text-gray-300">ERD Element:</div>
              <div className="text-gray-600 dark:text-gray-400">{rule.erdElement}</div>
              <div className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
                Relational Schema:
              </div>
              <div className="text-gray-600 dark:text-gray-400">{rule.relationalSchema}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <AIChat context={{ category: 'mapping' }} />
      </div>
    </div>
  );
}
