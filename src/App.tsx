import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Dashboard } from './pages/Dashboard';
import { SQLLessons } from './pages/SQLLessons';
import { ERDLessons } from './pages/ERDLessons';
import { MappingLessons } from './pages/MappingLessons';
import { NormalizationLessons } from './pages/NormalizationLessons';
import { PracticeLab } from './pages/PracticeLab';
import { useAppStore } from './store/appStore';
import './App.css';

function App() {
  const { settings, updateSettings } = useAppStore();

  useEffect(() => {
    // Always use dark mode for Batman theme
    document.documentElement.classList.add('dark');
    updateSettings({ theme: 'dark' });
  }, [updateSettings]);

  return (
    <Router>
      <div className="min-h-screen bg-batman-dark flex flex-col batman-theme">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sql" element={<SQLLessons />} />
              <Route path="/erd" element={<ERDLessons />} />
              <Route path="/mapping" element={<MappingLessons />} />
              <Route path="/normalization" element={<NormalizationLessons />} />
              <Route path="/practice" element={<PracticeLab />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
