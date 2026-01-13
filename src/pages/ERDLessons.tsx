import React, { useState } from 'react';
import { AIChat } from '../components/tutor/AIChat';
import { ERDBuilder } from '../components/erd/ERDBuilder';
import { erdProblems } from '../data/erdCurriculum';

export function ERDLessons() {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  const problem = selectedProblem
    ? erdProblems.find((p) => p.id === selectedProblem)
    : null;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          ERD (Entity Relationship Diagrams)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Learn to design and understand Entity Relationship Diagrams
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Problem List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Problems
            </h2>
            <div className="space-y-2">
              {erdProblems.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => setSelectedProblem(prob.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedProblem === prob.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="font-medium">{prob.title}</div>
                  <div className="text-sm opacity-75">{prob.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ERD Builder */}
        <div className="lg:col-span-2">
          {problem ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {problem.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{problem.description}</p>
              <div style={{ height: '600px' }}>
                <ERDBuilder
                  correctSolution={problem.solution}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Select a problem from the list to get started
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <AIChat context={{ category: 'erd', problemId: selectedProblem || undefined }} />
      </div>
    </div>
  );
}
