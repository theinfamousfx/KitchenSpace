'use client';

import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import KitchenOverview from './components/KitchenOverview';

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <main className="main-content">
      <Header onNavigate={setCurrentView} />
      
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'overview' && <KitchenOverview />}
      
      <footer className="app-footer">
        <p>Chef Virtu Kitchen Database v2.1 © 2025</p>
      </footer>
    </main>
  );
}
