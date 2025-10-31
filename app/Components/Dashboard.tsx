'use client';

import React from 'react';

export default function Dashboard() {
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
}
