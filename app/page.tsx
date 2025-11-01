'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    // Define switchView on window before loading app.js
    (window as any).switchView = (view: string) => {
      console.log('Switching to view:', view);
      const content = document.getElementById('content');
      if (content) {
        // Call the app.js switchView function if it exists
        if (typeof (window as any).switchView === 'function') {
          (window as any).switchView(view);
        }
      }
    };

    // Dynamically load the app.js script
    const script = document.createElement('script');
    script.src = '/app.js';
    script.async = true;
    script.onload = () => {
      setAppLoaded(true);
      console.log('app.js loaded');
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleNavClick = (view: string) => {
    (window as any).switchView(view);
  };

  return (
    <>
      <header style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ margin: '0 0 15px 0', fontSize: '28px' }}>Chef Virtu's Kitchen Database</h1>
        <input
          type="text"
          placeholder="Search kitchen items..."
          style={{
            padding: '8px 12px',
            width: '100%',
            maxWidth: '200px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
      </header>

      <nav
        id="navigation"
        style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        <button
          className="nav-btn"
          onClick={() => handleNavClick('recipes')}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          📖 Recipes
        </button>
        <button
          className="nav-btn"
          onClick={() => handleNavClick('sops')}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          📋 SOPs
        </button>
        <button
          className="nav-btn"
          onClick={() => handleNavClick('techniques')}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          🎯 Techniques
        </button>
        <button
          className="nav-btn"
          onClick={() => handleNavClick('notes')}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          📝 Notes
        </button>
        <button
          className="nav-btn"
          onClick={() => handleNavClick('videos')}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          🎥 Videos
        </button>
        <button
          className="nav-btn"
          onClick={() => handleNavClick('links')}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          🔗 Links
        </button>
        <button
          className="nav-btn"
          onClick={() => handleNavClick('media')}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          📁 Media
        </button>
        <button
          className="nav-btn"
          onClick={() => handleNavClick('cookbooks')}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          📚 Cookbooks
        </button>
      </nav>

      <main
        id="content"
        style={{
          padding: '40px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Welcome to Your Kitchen Database</h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
            Organize your culinary knowledge, recipes, and techniques in one professional system
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleNavClick('recipes')}
            >
              <h3 style={{ marginBottom: '8px' }}>📖 Recipes</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Recipe collection with search and filters</p>
              <button style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Browse, search, and manage your recipes.
              </button>
            </div>

            <div
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleNavClick('sops')}
            >
              <h3 style={{ marginBottom: '8px' }}>📋 SOPs</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Standard Operating Procedures</p>
              <button style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Essential kitchen protocols and procedures.
              </button>
            </div>

            <div
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleNavClick('techniques')}
            >
              <h3 style={{ marginBottom: '8px' }}>🎯 Techniques</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Culinary techniques library</p>
              <button style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Master professional cooking techniques.
              </button>
            </div>

            <div
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleNavClick('notes')}
            >
              <h3 style={{ marginBottom: '8px' }}>📝 Notes</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Quick notes and culinary journal</p>
              <button style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Quick notes and important information.
              </button>
            </div>

            <div
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleNavClick('videos')}
            >
              <h3 style={{ marginBottom: '8px' }}>🎥 Resources</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Videos, links, and media library</p>
              <button style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Videos, links, and reference materials.
              </button>
            </div>

            <div
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleNavClick('cookbooks')}
            >
              <h3 style={{ marginBottom: '8px' }}>📚 Cookbooks</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Your digital cookbook collection</p>
              <button style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Your digital cookbook collection.
              </button>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Georgia, serif;
          background-color: #ffffff;
          color: #333;
          line-height: 1.6;
        }

        h1, h2, h3 {
          font-family: Georgia, serif;
        }

        button:hover {
          opacity: 0.9;
        }

        .nav-btn.active {
          background-color: #007bff !important;
          color: white !important;
        }
      `}</style>
    </>
  );
}