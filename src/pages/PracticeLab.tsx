import React from 'react';
import { SQLEditor } from '../components/sql/SQLEditor';
import { DatabaseSelector } from '../components/sql/DatabaseSelector';
import { BatBotChat } from '../components/tutor/BatBotChat';
import { useAppStore } from '../store/appStore';

export function PracticeLab() {
  const { currentDatabase } = useAppStore();
  const [query, setQuery] = React.useState('-- Type your SQL code here...');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-batman-yellow mb-2 batman-glow">
          Practice Lab
        </h1>
        <p className="text-batman-yellow/80">
          Interactive SQL practice environment with all sample databases
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="batman-card rounded-lg p-6">
            <DatabaseSelector />
            <div className="mt-4" style={{ height: '600px' }}>
              <SQLEditor
                database={currentDatabase}
                value={query}
                onChange={setQuery}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <BatBotChat contextLabel="Bat Bot" />
        </div>
      </div>
    </div>
  );
}
