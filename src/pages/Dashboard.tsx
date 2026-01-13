import React from 'react';
import { Link } from 'react-router-dom';
import { Database, GitBranch, Network, Layers, FlaskConical, TrendingUp } from 'lucide-react';
import { useAppStore } from '../store/appStore';

const categories = [
  {
    name: 'SQL Fundamentals',
    href: '/sql',
    icon: Database,
    description: 'Learn SQL queries, DDL, DML commands',
    color: 'bg-batman-yellow',
  },
  {
    name: 'ERD',
    href: '/erd',
    icon: GitBranch,
    description: 'Entity Relationship Diagrams',
    color: 'bg-batman-yellow',
  },
  {
    name: 'ERD Mapping',
    href: '/mapping',
    icon: Network,
    description: 'Map ERD to Relational Schema',
    color: 'bg-batman-yellow',
  },
  {
    name: 'Normalization',
    href: '/normalization',
    icon: Layers,
    description: '1NF, 2NF, 3NF concepts',
    color: 'bg-batman-yellow',
  },
  {
    name: 'Practice Lab',
    href: '/practice',
    icon: FlaskConical,
    description: 'Interactive practice environment',
    color: 'bg-batman-yellow',
  },
];

export function Dashboard() {
  const { progress } = useAppStore();

  const totalCompleted =
    progress.sql.completed.length +
    progress.erd.completed.length +
    progress.mapping.completed.length +
    progress.normalization.completed.length;

  const totalProblems =
    progress.sql.total +
    progress.erd.total +
    progress.mapping.total +
    progress.normalization.total;

  const overallProgress = totalProblems > 0 ? (totalCompleted / totalProblems) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-batman-yellow mb-2 batman-glow">
          Welcome to BATLEARN
        </h1>
        <h2 className="text-2xl font-bold text-batman-yellow/80 mb-2">
          FOR COURSE MIS372
        </h2>
        <p className="text-lg text-batman-yellow/80">
          Your comprehensive database learning platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="batman-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-batman-yellow">
              Overall Progress
            </h3>
            <TrendingUp className="w-6 h-6 text-batman-yellow" />
          </div>
          <div className="text-3xl font-bold text-batman-yellow mb-2">
            {Math.round(overallProgress)}%
          </div>
          <div className="w-full bg-batman-gray rounded-full h-2">
            <div
              className="bg-batman-yellow h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-sm text-batman-yellow/80 mt-2">
            {totalCompleted} of {totalProblems} problems completed
          </p>
        </div>

        <div className="batman-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-batman-yellow mb-4">
            SQL Progress
          </h3>
          <div className="text-2xl font-bold text-batman-yellow mb-2">
            {progress.sql.completed.length} / {progress.sql.total || '?'}
          </div>
          <div className="w-full bg-batman-gray rounded-full h-2">
            <div
              className="bg-batman-yellow h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progress.sql.total > 0
                    ? (progress.sql.completed.length / progress.sql.total) * 100
                    : 0
                  }%`,
              }}
            />
          </div>
        </div>

        <div className="batman-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-batman-yellow mb-4">
            ERD Progress
          </h3>
          <div className="text-2xl font-bold text-batman-yellow mb-2">
            {progress.erd.completed.length} / {progress.erd.total || '?'}
          </div>
          <div className="w-full bg-batman-gray rounded-full h-2">
            <div
              className="bg-batman-yellow h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progress.erd.total > 0
                    ? (progress.erd.completed.length / progress.erd.total) * 100
                    : 0
                  }%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-batman-yellow mb-4">
          Learning Modules
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              to={category.href}
              className="batman-card rounded-lg p-6 hover:border-batman-yellow/60 group"
            >
              <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform batman-glow`}>
                <Icon className="w-6 h-6 text-batman-dark" />
              </div>
              <h3 className="text-xl font-semibold text-batman-yellow mb-2">
                {category.name}
              </h3>
              <p className="text-batman-yellow/80">{category.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
