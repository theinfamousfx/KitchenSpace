'use client';

import React from 'react';

interface HeaderProps {
  onNavigate: (view: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  return (
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
}
