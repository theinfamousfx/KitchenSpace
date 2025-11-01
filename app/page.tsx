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
              </div>

              <div className="card" onClick={() => handleSectionClick('sops')}>
                <div className="card-icon">📋</div>
                <h3 className="card-title">SOPs</h3>
                <p className="card-description">Standard Operating Procedures</p>
              </div>

              <div className="card" onClick={() => handleSectionClick('techniques')}>
                <div className="card-icon">🎯</div>
                <h3 className="card-title">Techniques</h3>
                <p className="card-description">Culinary techniques library</p>
              </div>

              <div className="card" onClick={() => handleSectionClick('notes')}>
                <div className="card-icon">📝</div>
                <h3 className="card-title">Notes</h3>
                <p className="card-description">Quick notes and culinary journal</p>
              </div>

              <div className="card" onClick={() => handleSectionClick('videos')}>
                <div className="card-icon">🎬</div>
                <h3 className="card-title">Resources</h3>
                <p className="card-description">Videos, links, and media library</p>
              </div>

              <div className="card" onClick={() => handleSectionClick('cookbooks')}>
                <div className="card-icon">📚</div>
                <h3 className="card-title">Cookbooks</h3>
                <p className="card-description">Your digital cookbook collection</p>
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
          font-family: 'Georgia', 'Garamond', serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: linear-gradient(135deg, #f0cf92 0%, #f5dba8 100%);
          color: #2c3e50;
          line-height: 1.6;
          min-height: 100vh;
        }

        html {
          background: linear-gradient(135deg, #f0cf92 0%, #f5dba8 100%);
        }

        .app-container {
          min-height: 100vh;
          background: transparent;
        }

        .app-header {
          padding: 32px 48px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 2px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .app-title {
          font-size: 42px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }

        .search-input {
          width: 100%;
          max-width: 320px;
          padding: 12px 18px;
          border: 2px solid #e8d4b0;
          border-radius: 8px;
          font-size: 15px;
          color: #5a6c7d;
          background: linear-gradient(135deg, #ffffff 0%, #fafaf8 100%);
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .search-input:focus {
          outline: none;
          border-color: #d4a574;
          box-shadow: 0 0 0 4px rgba(212, 165, 116, 0.1);
          background: #ffffff;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .app-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding: 24px 48px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border: 1.5px solid #e8d4b0;
          border-radius: 8px;
          background: linear-gradient(135deg, #ffffff 0%, #fafaf8 100%);
          color: #5a6c7d;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .nav-btn:hover {
          border-color: #d4a574;
          background: linear-gradient(135deg, #fefdf9 0%, #ffffff 100%);
          box-shadow: 0 4px 12px rgba(212, 165, 116, 0.15);
          transform: translateY(-2px);
        }

        .nav-btn.active {
          background: linear-gradient(135deg, #d4a574 0%, #c89560 100%);
          color: #ffffff;
          border-color: #c89560;
          box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
        }

        .main-content {
          padding: 56px 48px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .welcome-section {
          text-align: center;
        }

        .welcome-title {
          font-size: 44px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .welcome-subtitle {
          font-size: 18px;
          color: #5a6c7d;
          margin-bottom: 56px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 400;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
          margin-top: 32px;
        }

        .card {
          padding: 40px 32px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-align: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .card:hover::before {
          left: 100%;
        }

        .card:hover {
          border-color: #d4a574;
          box-shadow: 0 16px 40px rgba(212, 165, 116, 0.25);
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.98);
        }

        .card-icon {
          font-size: 56px;
          margin-bottom: 20px;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .card:hover .card-icon {
          transform: scale(1.15) rotateZ(5deg);
        }

        .card-title {
          font-size: 26px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 12px;
          letter-spacing: -0.3px;
        }

        .card-description {
          font-size: 15px;
          color: #7a8a99;
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .card-btn {
          width: 100%;
          padding: 14px 24px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #d4a574 0%, #c89560 100%);
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
          letter-spacing: 0.3px;
        }

        .card-btn:hover {
          background: linear-gradient(135deg, #c89560 0%, #b8854d 100%);
          box-shadow: 0 6px 20px rgba(212, 165, 116, 0.4);
          transform: translateY(-2px);
        }

        .card-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(212, 165, 116, 0.25);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .app-header {
            padding: 28px 32px;
          }

          .app-nav {
            padding: 20px 32px;
          }

          .main-content {
            padding: 40px 32px;
          }

          .app-title {
            font-size: 36px;
          }

          .welcome-title {
            font-size: 36px;
          }

          .grid-container {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .app-header {
            padding: 20px 20px;
          }

          .app-title {
            font-size: 28px;
            margin-bottom: 16px;
          }

          .search-input {
            max-width: 100%;
          }

          .app-nav {
            padding: 16px 20px;
            gap: 8px;
          }

          .nav-btn {
            font-size: 13px;
            padding: 9px 16px;
          }

          .main-content {
            padding: 32px 20px;
          }

          .welcome-title {
            font-size: 28px;
          }

          .welcome-subtitle {
            font-size: 16px;
            margin-bottom: 36px;
          }

          .grid-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .card {
            padding: 32px 24px;
          }

          .card-icon {
            font-size: 48px;
            margin-bottom: 16px;
          }

          .card-title {
            font-size: 22px;
          }

          .card-description {
            font-size: 14px;
            margin-bottom: 20px;
          }

          .card-btn {
            padding: 12px 20px;
            font-size: 14px;
          }
        }

        /* Additional styles for dynamic content */
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 28px;
        }

        .item-card {
          padding: 24px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .item-card:hover {
          border-color: #d4a574;
          box-shadow: 0 8px 20px rgba(212, 165, 116, 0.15);
          transform: translateY(-4px);
        }

        .item-card h3 {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
        }

        .item-card .meta {
          font-size: 13px;
          color: #9ca3af;
          margin-bottom: 12px;
        }

        .item-card .description {
          font-size: 14px;
          color: #5a6c7d;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .item-card .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .badge {
          display: inline-block;
          padding: 5px 14px;
          border-radius: 20px;
          background: linear-gradient(135deg, #f0cf92 0%, #f5dba8 100%);
          color: #2c3e50;
          font-size: 12px;
          font-weight: 600;
        }

        .btn-delete {
          padding: 7px 14px;
          border: 1.5px solid #e57373;
          border-radius: 6px;
          background: transparent;
          color: #e57373;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-delete:hover {
          background: #ffebee;
          border-color: #ef5350;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .section-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #2c3e50;
        }

        .btn-add {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #d4a574 0%, #c89560 100%);
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
        }

        .btn-add:hover {
          background: linear-gradient(135deg, #c89560 0%, #b8854d 100%);
          box-shadow: 0 6px 16px rgba(212, 165, 116, 0.4);
        }

        .empty-message {
          text-align: center;
          padding: 56px 24px;
          color: #9ca3af;
          font-size: 16px;
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal {
          background: linear-gradient(135deg, #ffffff 0%, #fafaf8 100%);
          border-radius: 16px;
          padding: 40px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
          border: 2px solid rgba(212, 165, 116, 0.2);
        }

        .modal-close {
          float: right;
          font-size: 32px;
          font-weight: 700;
          color: #9ca3af;
          cursor: pointer;
          line-height: 1;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          color: #2c3e50;
          transform: rotate(90deg);
        }

        .modal h2 {
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 28px;
          letter-spacing: -0.3px;
        }

        .modal form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .modal input,
        .modal textarea,
        .modal select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e8d4b0;
          border-radius: 8px;
          font-size: 14px;
          color: #5a6c7d;
          background: rgba(255, 255, 255, 0.95);
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .modal input:focus,
        .modal textarea:focus,
        .modal select:focus {
          outline: none;
          border-color: #d4a574;
          box-shadow: 0 0 0 4px rgba(212, 165, 116, 0.1);
          background: #ffffff;
        }

        .modal textarea {
          resize: vertical;
          min-height: 120px;
        }

        .modal button[type="submit"] {
          padding: 14px 28px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #d4a574 0%, #c89560 100%);
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
          letter-spacing: 0.3px;
        }

        .modal button[type="submit"]:hover {
          background: linear-gradient(135deg, #c89560 0%, #b8854d 100%);
          box-shadow: 0 6px 20px rgba(212, 165, 116, 0.4);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}