'use client';

import { useState } from 'react';

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard');

  // Header Component
  const Header = () => (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🍳</span>
            <h1 className="logo-text">Chef Virtu's Kitchen Database</h1>
          </div>
          <div className="header-actions">
            <input
              type="search"
              id="global-search"
              placeholder="Search kitchen items..."
              className="search-input"
            />
          </div>
        </div>
      </div>
    </header>
  );

  // Dashboard Component
  const Dashboard = () => {
    const cards = [
      { id: 'recipes', title: 'Recipes', icon: '📖', description: 'Recipe collection with search and filters' },
      { id: 'sops', title: 'SOPs', icon: '📋', description: 'Standard Operating Procedures' },
      { id: 'techniques', title: 'Techniques', icon: '🔪', description: 'Culinary techniques library' },
      { id: 'notes', title: 'Notes', icon: '📝', description: 'Quick notes and culinary journal' },
      { id: 'resources', title: 'Resources', icon: '📚', description: 'Videos, links, and media library' },
      { id: 'ebooks', title: 'eBooks', icon: '📕', description: 'Cloud-linked cookbook collection' },
    ];

    return (
      <div className="view active">
        <div className="welcome-section">
          <h2 className="section-title">Welcome to Your Kitchen Database</h2>
          <p className="section-description">
            Organize your culinary knowledge, recipes, and techniques in one professional system
          </p>
        </div>

        <div className="container">
          <div className="dashboard-grid">
            {cards.map((card) => (
              <div key={card.id} className="dashboard-card" data-section={card.id}>
                <div className="card-icon">{card.icon}</div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Kitchen Overview Component
  const KitchenOverview = () => {
    const stats = [
      { label: 'Recipes', value: '3', icon: '📖' },
      { label: 'SOPs', value: '3', icon: '📋' },
      { label: 'Techniques', value: '3', icon: '🔪' },
      { label: 'Notes', value: '2', icon: '📝' },
    ];

    return (
      <div className="view active">
        <div className="view-header">
          <h2 className="section-title">Kitchen Overview</h2>
        </div>

        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="content-section">
            <h3 className="subsection-title">Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">✅</span>
                <span className="activity-text">Added recipe <strong>Chocolate Soufflé</strong></span>
                <span className="activity-time">2 days ago</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">✍️</span>
                <span className="activity-text">Created note <strong>Tasting Notes - Local Tomatoes</strong></span>
                <span className="activity-time">6 days ago</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">🔄</span>
                <span className="activity-text">Updated SOP <strong>Food Safety Protocol</strong></span>
                <span className="activity-time">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="main-content">
      <Header />
      
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'overview' && <KitchenOverview />}
      
      <footer className="app-footer">
        <p>Chef Virtu Kitchen Database v2.1 © 2025</p>
      </footer>
    </main>
  );
}
