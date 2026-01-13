import React, { useState, useEffect, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { DatabaseType } from '../../types';
import { useDatabase } from '../../hooks/useDatabase';
import { validateSQL } from '../../services/sqlValidator';

interface SQLEditorProps {
  database: DatabaseType;
  value: string;
  onChange: (value: string) => void;
  onExecute?: (results: any) => void;
  correctAnswer?: string; // SQL solution to compare against
  onValidation?: (isCorrect: boolean) => void; // Callback for validation result
}

export function SQLEditor({
  database,
  value,
  onChange,
  onExecute,
  correctAnswer,
  onValidation,
}: SQLEditorProps) {
  const [results, setResults] = useState<{ columns: string[]; values: any[][] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [executing, setExecuting] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isCorrect: boolean;
    correctAnswer?: string;
    error?: string;
  } | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { runQuery, loading, error: dbError } = useDatabase(database);

  const handleExecute = async () => {
    if (!value.trim()) return;

    setExecuting(true);
    setError(null);
    setResults(null);
    setValidationResult(null);

    try {
      console.log('Executing query:', value);
      const result = await runQuery(value);
      console.log('Execution result:', result);
      setResults(result);
      if (onExecute && result) {
        onExecute(result);
      }
    } catch (err: any) {
      console.error('Execution error:', err);
      setError(err.message || 'Query execution failed');
    } finally {
      setExecuting(false);
    }
  };

  const handleClear = () => {
    onChange('-- Type your SQL code here...');
    setResults(null);
    setError(null);
    setValidationResult(null);
  };

  const handleCheckAnswer = async () => {
    if (!value.trim() || !correctAnswer) return;

    setValidating(true);
    setError(null);
    setValidationResult(null);

    try {
      console.log('Validating query:', value);
      const validation = await validateSQL(value, correctAnswer, database);
      console.log('Validation result:', validation);
      setValidationResult({
        isCorrect: validation.isCorrect,
        correctAnswer: correctAnswer,
        error: validation.error,
      });

      if (onValidation) {
        onValidation(validation.isCorrect);
      }

      // Show results even if validation succeeded/failed
      if (validation.userResults) {
        setResults(validation.userResults);
      } else if (!validation.isCorrect && validation.correctResults) {
        setResults(validation.correctResults);
      }
    } catch (err: any) {
      console.error('Validation error:', err);
      setValidationResult({
        isCorrect: false,
        correctAnswer: correctAnswer,
        error: err.message || 'Validation failed',
      });
    } finally {
      setValidating(false);
    }
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Add keyboard shortcut for Ctrl+Enter
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, async () => {
      const currentQuery = editor.getValue();
      if (!currentQuery.trim()) return;

      setExecuting(true);
      setError(null);
      setResults(null);
      setValidationResult(null);

      try {
        console.log('Executing query via shortcut:', currentQuery);
        const result = await runQuery(currentQuery);
        console.log('Execution result via shortcut:', result);
        setResults(result);
        onChange(currentQuery);
        if (onExecute && result) {
          onExecute(result);
        }
      } catch (err: any) {
        console.error('Execution error via shortcut:', err);
        setError(err.message || 'Query execution failed');
      } finally {
        setExecuting(false);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4 bg-batman-dark/50 rounded-xl border border-batman-yellow/10">
        <div className="w-12 h-12 border-4 border-batman-yellow/20 border-t-batman-yellow rounded-full animate-spin"></div>
        <div className="text-batman-yellow font-bold uppercase tracking-widest animate-pulse">Initializing Database...</div>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 text-center bg-red-900/20 rounded-xl border border-red-500/50">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <div className="text-red-400 font-bold uppercase mb-2">Database Error</div>
        <div className="text-sm text-red-300/70">{dbError}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-bold"
        >
          RETRY MISSION
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-batman-dark/50 border border-batman-yellow/10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-batman-yellow/10 bg-batman-gray/50">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExecute}
            disabled={executing || !value.trim() || value.trim() === '-- Type your SQL code here...'}
            className="flex items-center space-x-2 px-6 py-2.5 bg-batman-yellow text-batman-dark rounded-lg hover:bg-batman-yellow/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(255,215,0,0.3)] active:scale-95"
          >
            {executing ? (
              <div className="w-4 h-4 border-3 border-batman-dark/20 border-t-batman-dark rounded-full animate-spin"></div>
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            <span>{executing ? 'RUNNING...' : 'EXECUTE'}</span>
          </button>

          {correctAnswer && (
            <button
              onClick={handleCheckAnswer}
              disabled={validating || !value.trim() || value.trim() === '-- Type your SQL code here...'}
              className="flex items-center space-x-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-black uppercase tracking-tighter shadow-[0_0_15px_rgba(34,197,94,0.3)] active:scale-95 border border-green-400/30"
            >
              {validating ? (
                <div className="w-4 h-4 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              <span>{validating ? 'VERIFYING...' : 'CHECK ANSWER'}</span>
            </button>
          )}
        </div>

        <button
          onClick={handleClear}
          className="flex items-center space-x-2 px-3 py-2 bg-batman-gray/30 text-gray-500 rounded-lg hover:bg-batman-gray hover:text-batman-yellow transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-batman-yellow/30"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET</span>
        </button>
      </div>

      <div className="relative h-[350px] border-b border-batman-yellow/5">
        <Editor
          height="100%"
          language="sql"
          value={value}
          onChange={(v) => onChange(v || '')}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            suggestOnTriggerCharacters: true,
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Message and Result area - This part will now be visible because the parent doesn't have overflow-hidden or fixed height */}
      <div className="flex flex-col">
        {validationResult && (
          <div className={`p-6 border-b animate-in slide-in-from-top-4 duration-500 ${validationResult.isCorrect
              ? 'bg-green-500/10 border-green-500/20'
              : 'bg-red-500/10 border-red-500/20'
            }`}>
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl shadow-lg ${validationResult.isCorrect
                  ? 'bg-green-600 shadow-green-500/20'
                  : 'bg-red-600 shadow-red-500/20'
                }`}>
                {validationResult.isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <XCircle className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className={`text-2xl font-black uppercase italic tracking-tighter mb-1 ${validationResult.isCorrect ? 'text-green-400' : 'text-red-400'
                  }`}>
                  {validationResult.isCorrect ? 'Mission Accomplished' : 'Tactical Deficiency'}
                </div>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  {validationResult.isCorrect
                    ? 'The sequence is correct. Your query successfully retrieved the target intelligence payload.'
                    : 'The output does not match the mission requirements. Adjust your tactics and try again.'}
                </p>

                {!validationResult.isCorrect && (
                  <div className="mt-6 space-y-4">
                    {validationResult.error && (
                      <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-xl">
                        <div className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">Error Log:</div>
                        <div className="text-sm text-red-200 font-mono italic">{validationResult.error}</div>
                      </div>
                    )}

                    <div className="p-5 bg-batman-dark/80 rounded-xl border border-batman-yellow/20 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CheckCircle className="w-12 h-12 text-batman-yellow" />
                      </div>
                      <div className="text-[10px] font-black text-batman-yellow uppercase tracking-[0.2em] mb-3 flex items-center">
                        <span className="w-2 h-2 bg-batman-yellow rounded-full mr-2 animate-pulse"></span>
                        Decrypted Target Objective
                      </div>
                      <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
                        {validationResult.correctAnswer}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {error && !validationResult && (
          <div className="p-6 bg-red-900/20 border-b border-red-500/30 animate-in shake-in-h duration-300">
            <div className="flex items-center space-x-3 text-red-500 font-black uppercase tracking-widest italic mb-3">
              <XCircle className="w-5 h-5" />
              <span>System Interruption: Syntax Error</span>
            </div>
            <div className="p-4 bg-batman-dark/40 rounded-lg border border-red-500/20 font-mono text-sm text-red-300">
              {error}
            </div>
          </div>
        )}

        {results && (
          <div className="p-6 bg-batman-dark/30 animate-in fade-in duration-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4 bg-batman-yellow rounded-full"></div>
                <div className="text-[10px] font-black text-batman-yellow uppercase tracking-[0.3em]">Retrieved Datasets</div>
              </div>
              <div className="px-3 py-1 bg-batman-yellow/10 rounded-full border border-batman-yellow/20 text-[10px] text-batman-yellow font-bold">
                {results.values.length} RECORD{results.values.length !== 1 ? 'S' : ''}
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-batman-yellow/10 shadow-2xl">
              <table className="min-w-full divide-y divide-batman-yellow/10">
                <thead className="bg-batman-yellow/5">
                  <tr>
                    {results.columns.map((col, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-4 text-left text-[10px] font-black text-batman-yellow uppercase tracking-[0.2em] italic"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-batman-yellow/5 bg-batman-dark/40">
                  {results.values.length > 0 ? (
                    results.values.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="hover:bg-batman-yellow/5 transition-colors duration-200 group"
                      >
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className="px-6 py-4 text-gray-300 font-medium whitespace-nowrap group-hover:text-white transition-colors"
                          >
                            {cell === null ? (
                              <span className="text-gray-600 italic tracking-widest text-xs uppercase underline decoration-dotted">NULL</span>
                            ) : (
                              String(cell)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={results.columns.length} className="px-6 py-12 text-center text-gray-500 italic uppercase tracking-widest text-xs">
                        Query executed successfully but returned no records.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
