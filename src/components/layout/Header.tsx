import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Moon, Sun, Globe } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export function Header() {
  const { settings, updateSettings } = useAppStore();

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    updateSettings({ language: settings.language === 'en' ? 'ar' : 'en' });
  };

  return (
    <header className="bg-batman-dark border-b-2 border-batman-yellow shadow-lg shadow-batman-yellow/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 text-2xl font-bold text-batman-yellow hover:text-batman-yellow-dark transition-colors group">
          <div className="relative">
            <Database className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-batman-yellow/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="tracking-wider">BATLEARN</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-batman-gray-light transition-colors text-batman-yellow hover:text-batman-yellow-dark"
            title="Toggle Language"
          >
            <Globe className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-batman-gray-light transition-colors text-batman-yellow hover:text-batman-yellow-dark"
            title="Toggle Theme"
          >
            {settings.theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
