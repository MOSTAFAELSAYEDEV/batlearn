import React, { useState } from 'react';
import { SQLEditor } from '../components/sql/SQLEditor';
import { DatabaseSelector } from '../components/sql/DatabaseSelector';
import { AIChat } from '../components/tutor/AIChat';
import { SQLTable } from '../components/sql/SQLTable';
import { sqlProblems } from '../data/sqlCurriculum';
import { useAppStore } from '../store/appStore';
import { CheckCircle, Circle, Lightbulb, Database, BookOpen, MessageSquare } from 'lucide-react';

export function SQLLessons() {
  const { currentDatabase, currentProblem, setCurrentProblem, sqlQueries, setSQLQuery } = useAppStore();
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<{ [key: string]: boolean }>({});

  const problem = selectedProblem
    ? sqlProblems.find((p) => p.id === selectedProblem)
    : null;

  const handleProblemSelect = (problemId: string) => {
    setSelectedProblem(problemId);
    const prob = sqlProblems.find((p) => p.id === problemId);
    if (prob) {
      setCurrentProblem({ id: problemId, category: 'sql' });
    }
  };

  const toggleSolution = (partId: string) => {
    setShowSolution((prev) => ({ ...prev, [partId]: !prev[partId] }));
  };

  return (
    <div className="min-h-screen bg-batman-dark text-gray-100 pb-20">
      <div className="bg-batman-gray/50 border-b border-batman-yellow/20 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-batman-yellow rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              <Database className="w-8 h-8 text-batman-dark" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                SQL <span className="text-batman-yellow">Fundamentals</span>
              </h1>
              <p className="text-gray-400 text-sm font-medium tracking-tight">
                Master database queries in the Batcave
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Problem List Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-batman-gray/30 rounded-2xl border border-batman-yellow/10 p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center space-x-2 mb-6">
                <BookOpen className="w-5 h-5 text-batman-yellow" />
                <h2 className="text-xl font-bold text-white uppercase tracking-widest italic">
                  Practice Rooms
                </h2>
              </div>
              <div className="space-y-3">
                {sqlProblems.map((prob) => (
                  <button
                    key={prob.id}
                    onClick={() => handleProblemSelect(prob.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${selectedProblem === prob.id
                      ? 'bg-batman-yellow border-batman-yellow shadow-[0_0_15px_rgba(255,215,0,0.2)]'
                      : 'bg-batman-dark/50 border-batman-yellow/10 text-gray-400 hover:border-batman-yellow/40 hover:bg-batman-gray/50'
                      }`}
                  >
                    <div className={`font-black uppercase tracking-tighter ${selectedProblem === prob.id ? 'text-batman-dark' : 'text-gray-200'
                      }`}>
                      {prob.title}
                    </div>
                    <div className={`text-xs mt-1 font-medium ${selectedProblem === prob.id ? 'text-batman-dark/70' : 'text-gray-500'
                      }`}>
                      {prob.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Tutor Mini-Chat in Sidebar */}
            <div className="bg-batman-gray/30 rounded-2xl border border-batman-yellow/10 p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="w-5 h-5 text-batman-yellow" />
                <h2 className="text-xl font-bold text-white uppercase tracking-widest italic">
                  AI Butler
                </h2>
              </div>
              <AIChat
                context={{
                  problemId: selectedProblem || undefined,
                  category: 'sql',
                  currentProblem: problem,
                }}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {problem ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Section */}
                <div className="bg-batman-gray/30 rounded-2xl border border-batman-yellow/10 p-8 backdrop-blur-sm shadow-2xl">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-4">
                    {problem.title}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {problem.description}
                  </p>

                  {/* Schema Display */}
                  {problem.sampleData && (
                    <div className="mt-8 space-y-6">
                      {Object.entries(problem.sampleData).map(([name, data]) => (
                        <SQLTable
                          key={name}
                          name={name}
                          columns={data.columns}
                          rows={data.rows}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Questions Section */}
                <div className="space-y-6">
                  {problem.parts.map((part, index) => (
                    <div
                      key={part.id}
                      className="bg-batman-gray/20 rounded-2xl border border-batman-yellow/5 p-8 transition-all hover:border-batman-yellow/20 group"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="inline-block px-3 py-1 bg-batman-yellow/10 rounded-full border border-batman-yellow/20 text-[10px] text-batman-yellow font-bold uppercase tracking-widest mb-3">
                            Task {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-batman-yellow transition-colors">
                            {part.question}
                          </h3>
                        </div>
                        <button
                          onClick={() => toggleSolution(part.id)}
                          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-batman-yellow/5 hover:bg-batman-yellow/10 border border-batman-yellow/10 text-batman-yellow text-sm font-bold transition-all"
                        >
                          <Lightbulb className="w-4 h-4" />
                          <span>{showSolution[part.id] ? 'HIDE' : 'SHOW'} HINT</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="rounded-xl overflow-hidden border border-batman-yellow/20 bg-batman-dark/50">
                          <SQLEditor
                            database={problem.database}
                            value={sqlQueries[`${problem.id}-${part.id}`] || '-- Type your SQL code here...'}
                            onChange={(newValue) => setSQLQuery(problem.id, part.id, newValue)}
                            correctAnswer={part.solution}
                          />
                        </div>

                        {showSolution[part.id] && (
                          <div className="bg-batman-yellow/5 rounded-xl border border-batman-yellow/20 p-6 animate-in zoom-in-95 duration-300">
                            <div className="flex items-center space-x-2 mb-4">
                              <Lightbulb className="w-5 h-5 text-batman-yellow" />
                              <span className="text-lg font-black text-batman-yellow uppercase tracking-widest italic">
                                Tactical Advantage
                              </span>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <div className="text-xs text-batman-yellow/70 uppercase font-bold tracking-tighter mb-2">Hints:</div>
                                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                  {part.hints.map((hint, idx) => (
                                    <li key={idx}>{hint}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <div className="text-xs text-batman-yellow/70 uppercase font-bold tracking-tighter mb-2">Solution Logic:</div>
                                <p className="text-sm text-gray-400">{part.explanation}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-batman-gray/20 rounded-3xl border-2 border-dashed border-batman-yellow/10 p-12 text-center group">
                <div className="w-24 h-24 bg-batman-yellow/10 rounded-full flex items-center justify-center mb-8 border border-batman-yellow/20 group-hover:scale-110 transition-transform duration-500">
                  <Database className="w-12 h-12 text-batman-yellow animate-pulse" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">
                  Awaiting Mission Objective
                </h3>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                  Select a practice room from the tactical display on the left to begin your database training.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

