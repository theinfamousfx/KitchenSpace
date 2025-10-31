'use client';

import React from 'react';

export default function KitchenOverview() {
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
}
