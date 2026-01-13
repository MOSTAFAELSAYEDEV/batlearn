import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Database,
  GitBranch,
  Network,
  Layers,
  FlaskConical,
  Home,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'SQL Fundamentals', href: '/sql', icon: Database },
  { name: 'ERD', href: '/erd', icon: GitBranch },
  { name: 'ERD Mapping', href: '/mapping', icon: Network },
  { name: 'Normalization', href: '/normalization', icon: Layers },
  { name: 'Practice Lab', href: '/practice', icon: FlaskConical },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-batman-dark border-r-2 border-batman-yellow/30 h-full overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-batman-yellow text-batman-dark shadow-lg shadow-batman-yellow/50 font-bold'
                  : 'text-batman-yellow/80 hover:bg-batman-gray hover:text-batman-yellow hover:shadow-md hover:shadow-batman-yellow/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
