'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Load app.js for dynamic functionality
    const script = document.createElement('script');
    script.src = '/app.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleSectionClick = (view: string) => {
    if (typeof (window as any).switchView === 'function') {
      (window as any).switchView(view);
    }
  };

  return (
    <>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Chef Virtu&apos;s Kitchen Database</h1>
          <input
            type="text"
            placeholder="Search kitchen items..."
            className="search-input"
          />
        </header>

        <nav className="app-nav" id="navigation">
          <button
            className="nav-btn"
            onClick={() => handleSectionClick('recipes')}
          >
            📖 Recipes
          </button>
          <button
            className="nav-btn"
            onClick={() => handleSectionClick('sops')}
          >
            📋 SOPs
          </button>
          <button
            className="nav-btn"
            onClick={() => handleSectionClick('techniques')}
          >
            🎯 Techniques
          </button>
          <button
            className="nav-btn"
            onClick={() => handleSectionClick('notes')}
          >
            📝 Notes
          </button>
          <button
            className="nav-btn"
            onClick={() => handleSectionClick('videos')}
          >
            🎥 Videos
          </button>
          <button
            className="nav-btn"
            onClick={() => handleSectionClick('links')}
          >
            🔗 Links
          </button>
          <button
            className="nav-btn"
            onClick={() => handleSectionClick('media')}
          >
            📁 Media
          </button>
          <button
            className="nav-btn"
            onClick={() => handleSectionClick('cookbooks')}
          >
            📚 Cookbooks
          </button>
        </nav>

        <main className="main-content" id="content">
          <section className="welcome-section">
            <h2 className="welcome-title">Welcome to Your Kitchen Database</h2>
            <p className="welcome-subtitle">
              Organize your culinary knowledge, recipes, and techniques in one professional system
            </p>

            <div className="grid-container">
              <div className="card" onClick={() => handleSectionClick('recipes')}>
                <div className="card-icon">📖</div>
                <h3 className="card-title">Recipes</h3>
                <p className="card-description">Recipe collection with search and filters</p>
                <button className="card-btn">Browse, search, and manage your recipes.</button>
              </div>

              <div className="card" onClick={() => handleSectionClick('sops')}>
                <div className="card-icon">📋</div>
                <h3 className="card-title">SOPs</h3>
                <p className="card-description">Standard Operating Procedures</p>
                <button className="card-btn">Essential kitchen protocols and procedures.</button>
              </div>

              <div className="card" onClick={() => handleSectionClick('techniques')}>
                <div className="card-icon">🎯</div>
                <h3 className="card-title">Techniques</h3>
                <p className="card-description">Culinary techniques library</p>
                <button className="card-btn">Master professional cooking techniques.</button>
              </div>

              <div className="card" onClick={() => handleSectionClick('notes')}>
                <div className="card-icon">📝</div>
                <h3 className="card-title">Notes</h3>
                <p className="card-description">Quick notes and culinary journal</p>
                <button className="card-btn">Quick notes and important information.</button>
              </div>

              <div className="card" onClick={() => handleSectionClick('videos')}>
                <div className="card-icon">📚</div>
                <h3 className="card-title">Resources</h3>
                <p className="card-description">Videos, links, and media library</p>
                <button className="card-btn">Videos, links, and reference materials.</button>
              </div>

              <div className="card" onClick={() => handleSectionClick('cookbooks')}>
                <div className="card-icon">📚</div>
                <h3 className="card-title">Cookbooks</h3>
                <p className="card-description">Your digital cookbook collection</p>
                <button className="card-btn">Your digital cookbook collection.</button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #f8f9fa;
          color: #212529;
          line-height: 1.6;
        }

        .app-container {
          min-height: 100vh;
          background-color: #ffffff;
        }

        .app-header {
          padding: 24px 32px;
          border-bottom: 1px solid #e9ecef;
          background-color: #ffffff;
        }

        .app-title {
          font-size: 32px;
          font-weight: 700;
          color: #212529;
          margin-bottom: 16px;
        }

        .search-input {
          width: 100%;
          max-width: 300px;
          padding: 10px 16px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
          color: #495057;
          background-color: #ffffff;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .search-input::placeholder {
          color: #6c757d;
        }

        .app-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding: 20px 32px;
          background-color: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          background-color: #ffffff;
          color: #495057;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-btn:hover {
          background-color: #f8f9fa;
          border-color: #adb5bd;
          transform: translateY(-1px);
        }

        .nav-btn.active {
          background-color: #007bff;
          color: #ffffff;
          border-color: #007bff;
        }

        .main-content {
          padding: 48px 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .welcome-section {
          text-align: center;
        }

        .welcome-title {
          font-size: 36px;
          font-weight: 700;
          color: #212529;
          margin-bottom: 16px;
        }

        .welcome-subtitle {
          font-size: 18px;
          color: #6c757d;
          margin-bottom: 48px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .card {
          padding: 32px;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          background-color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .card:hover {
          border-color: #007bff;
          box-shadow: 0 8px 24px rgba(0, 123, 255, 0.12);
          transform: translateY(-4px);
        }

        .card-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .card-title {
          font-size: 24px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 12px;
        }

        .card-description {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .card-btn {
          width: 100%;
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          background-color: #007bff;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .card-btn:hover {
          background-color: #0056b3;
          transform: scale(1.02);
        }

        .card-btn:active {
          transform: scale(0.98);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .app-header {
            padding: 20px 16px;
          }

          .app-title {
            font-size: 24px;
          }

          .app-nav {
            padding: 16px;
            gap: 8px;
          }

          .nav-btn {
            font-size: 13px;
            padding: 8px 14px;
          }

          .main-content {
            padding: 32px 16px;
          }

          .welcome-title {
            font-size: 28px;
          }

          .welcome-subtitle {
            font-size: 16px;
          }

          .grid-container {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .card {
            padding: 24px;
          }

          .card-icon {
            font-size: 40px;
          }

          .card-title {
            font-size: 20px;
          }
        }

        /* Additional styles for dynamic content */
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }

        .item-card {
          padding: 20px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          background-color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .item-card:hover {
          border-color: #007bff;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
          transform: translateY(-2px);
        }

        .item-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 8px;
        }

        .item-card .meta {
          font-size: 13px;
          color: #6c757d;
          margin-bottom: 12px;
        }

        .item-card .description {
          font-size: 14px;
          color: #495057;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .item-card .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e9ecef;
        }

        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          background-color: #e7f3ff;
          color: #007bff;
          font-size: 12px;
          font-weight: 500;
        }

        .btn-delete {
          padding: 6px 12px;
          border: 1px solid #dc3545;
          border-radius: 4px;
          background-color: transparent;
          color: #dc3545;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-delete:hover {
          background-color: #dc3545;
          color: #ffffff;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h2 {
          font-size: 28px;
          font-weight: 600;
          color: #212529;
        }

        .btn-add {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          background-color: #28a745;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-add:hover {
          background-color: #218838;
        }

        .empty-message {
          text-align: center;
          padding: 48px 20px;
          color: #6c757d;
          font-size: 16px;
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 32px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-close {
          float: right;
          font-size: 28px;
          font-weight: 700;
          color: #6c757d;
          cursor: pointer;
          line-height: 1;
        }

        .modal-close:hover {
          color: #212529;
        }

        .modal h2 {
          font-size: 24px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 24px;
        }

        .modal form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal input,
        .modal textarea,
        .modal select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
          color: #495057;
          background-color: #ffffff;
          font-family: inherit;
        }

        .modal input:focus,
        .modal textarea:focus,
        .modal select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .modal textarea {
          resize: vertical;
          min-height: 100px;
        }

        .modal button[type="submit"] {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          background-color: #007bff;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal button[type="submit"]:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
}