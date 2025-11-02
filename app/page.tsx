'use client';

import { useState } from 'react';
import './styles/kitchen.css';

type ItemRecord = Record<string, any>;

interface FormData {
  [key: string]: string;
}

export default function KitchenDatabase() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>('');
  const [editingItem, setEditingItem] = useState<ItemRecord | null>(null);

  const [data, setData] = useState<Record<string, ItemRecord[]>>({
    recipes: [
      {
        id: 1,
        title: 'Chocolate Soufflé',
        cuisine: 'French',
        difficulty: 'Advanced',
        servings: 6,
        preptime: 45,
        cooktime: 15,
        description: 'A classic French dessert that rises magnificently.',
        ingredients: '200g dark chocolate, 6 eggs, 75g sugar',
        instructions: 'Mix and bake at 190°C',
      },
    ],
    sops: [
      {
        id: 1,
        title: 'Kitchen Opening',
        category: 'Daily Operations',
        priority: 'High',
        description: 'Complete daily opening procedures',
        steps: 'Check temps, clean equipment, prep stations',
        compliancenotes: 'Temperature logs required before service',
      },
    ],
    techniques: [],
    notes: [],
    videos: [],
    links: [],
    media: [],
    cookbooks: [],
  });

  const [nextIds, setNextIds] = useState<Record<string, number>>({
    recipes: 2,
    sops: 2,
    techniques: 1,
    notes: 1,
    videos: 1,
    links: 1,
    media: 1,
    cookbooks: 1,
  });

  // Open form for adding
  const openAddForm = (type: string) => {
    setFormType(type);
    setEditingItem(null);
    setIsFormOpen(true);
  };

  // Open form for editing
  const openEditForm = (type: string, id: number) => {
    const typeMap: Record<string, string> = {
      recipe: 'recipes',
      sop: 'sops',
      technique: 'techniques',
      note: 'notes',
      video: 'videos',
      link: 'links',
      media: 'media',
      cookbook: 'cookbooks',
    };

    const actualType = typeMap[type];
    const item = data[actualType]?.find((i: ItemRecord) => i.id === id);

    setFormType(type);
    setEditingItem(item || null);
    setIsFormOpen(true);
  };

  // Close form
  const closeForm = () => {
    setIsFormOpen(false);
    setFormType('');
    setEditingItem(null);
  };

  // Save item
  const saveItem = (formData: FormData) => {
    const typeMap: Record<string, string> = {
      recipe: 'recipes',
      sop: 'sops',
      technique: 'techniques',
      note: 'notes',
      video: 'videos',
      link: 'links',
      media: 'media',
      cookbook: 'cookbooks',
    };

    const actualType = typeMap[formType];

    setData((prevData) => {
      const newData = { ...prevData };

      if (editingItem) {
        const index = newData[actualType].findIndex((i: ItemRecord) => i.id === editingItem.id);
        if (index !== -1) {
          newData[actualType][index] = {
            ...newData[actualType][index],
            ...formData,
          };
        }
      } else {
        const newItem: ItemRecord = {
          id: nextIds[actualType] || 1,
          ...formData,
        };
        newData[actualType].push(newItem);

        setNextIds((prev) => ({
          ...prev,
          [actualType]: (prev[actualType] || 0) + 1,
        }));
      }

      return newData;
    });

    closeForm();
  };

  // Delete item
  const deleteItem = (section: string, id: number) => {
    if (confirm('Delete this item?')) {
      setData((prevData) => ({
        ...prevData,
        [section]: prevData[section].filter((item: ItemRecord) => item.id !== id),
      }));
    }
  };

  // Render dashboard
  const renderDashboard = () => (
    <div className="content-section">
      <h2>📊 Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card" onClick={() => setCurrentView('recipes')} style={{ cursor: 'pointer' }}>
          <h3>Recipes</h3>
          <p className="stat-number">{data.recipes.length}</p>
        </div>
        <div className="stat-card" onClick={() => setCurrentView('sops')} style={{ cursor: 'pointer' }}>
          <h3>SOPs</h3>
          <p className="stat-number">{data.sops.length}</p>
        </div>
        <div className="stat-card" onClick={() => setCurrentView('techniques')} style={{ cursor: 'pointer' }}>
          <h3>Techniques</h3>
          <p className="stat-number">{data.techniques.length}</p>
        </div>
        <div className="stat-card" onClick={() => setCurrentView('notes')} style={{ cursor: 'pointer' }}>
          <h3>Notes</h3>
          <p className="stat-number">{data.notes.length}</p>
        </div>
        <div className="stat-card" onClick={() => setCurrentView('videos')} style={{ cursor: 'pointer' }}>
          <h3>Videos</h3>
          <p className="stat-number">{data.videos.length}</p>
        </div>
        <div className="stat-card" onClick={() => setCurrentView('links')} style={{ cursor: 'pointer' }}>
          <h3>Links</h3>
          <p className="stat-number">{data.links.length}</p>
        </div>
        <div className="stat-card" onClick={() => setCurrentView('media')} style={{ cursor: 'pointer' }}>
          <h3>Media</h3>
          <p className="stat-number">{data.media.length}</p>
        </div>
        <div className="stat-card" onClick={() => setCurrentView('cookbooks')} style={{ cursor: 'pointer' }}>
          <h3>Cookbooks</h3>
          <p className="stat-number">{data.cookbooks.length}</p>
        </div>
      </div>
    </div>
  );

  // Render items list
  const renderItems = (section: string, title: string, type: string) => (
    <div className="content-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{title}</h2>
        <button className="btn btn-primary" onClick={() => openAddForm(type)}>
          + Add {title.slice(0, -1)}
        </button>
      </div>

      {!data[section] || data[section].length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>No items yet. Click the button to add one!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {data[section].map((item: ItemRecord) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', color: '#2C3E50' }}>{item.title}</h3>
              <p style={{ color: '#999', fontSize: '0.85rem', margin: '0 0 8px 0' }}>
                {item.category || item.cuisine || 'General'}
              </p>
              <p style={{ color: '#666', margin: '8px 0', minHeight: '40px' }}>
                {item.description || 'No description'}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button
                  className="btn"
                  style={{ backgroundColor: '#2196f3', color: 'white', padding: '8px 12px', flex: 1 }}
                  onClick={() => openEditForm(type, item.id)}
                >
                  Edit
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: '#E74C3C', color: 'white', padding: '8px 12px', flex: 1 }}
                  onClick={() => deleteItem(section, item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render current view
  const renderContent = () => {
    switch (currentView) {
      case 'recipes':
        return renderItems('recipes', 'Recipes', 'recipe');
      case 'sops':
        return renderItems('sops', 'SOPs', 'sop');
      case 'techniques':
        return renderItems('techniques', 'Techniques', 'technique');
      case 'notes':
        return renderItems('notes', 'Notes', 'note');
      case 'videos':
        return renderItems('videos', 'Videos', 'video');
      case 'links':
        return renderItems('links', 'Links', 'link');
      case 'media':
        return renderItems('media', 'Media', 'media');
      case 'cookbooks':
        return renderItems('cookbooks', 'Cookbooks', 'cookbook');
      default:
        return renderDashboard();
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">👨‍🍳</span>
              <h1 className="logo-text">Chef Virtu's Kitchen DB</h1>
            </div>
            <input type="search" placeholder="Search recipes, notes..." className="search-input" />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="main-nav">
        <div className="container">
          <ul className="nav-list">
            <button
              className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-link ${currentView === 'recipes' ? 'active' : ''}`}
              onClick={() => setCurrentView('recipes')}
            >
              📖 Recipes
            </button>
            <button
              className={`nav-link ${currentView === 'sops' ? 'active' : ''}`}
              onClick={() => setCurrentView('sops')}
            >
              📋 SOPs
            </button>
            <button
              className={`nav-link ${currentView === 'techniques' ? 'active' : ''}`}
              onClick={() => setCurrentView('techniques')}
            >
              🎯 Techniques
            </button>
            <button
              className={`nav-link ${currentView === 'notes' ? 'active' : ''}`}
              onClick={() => setCurrentView('notes')}
            >
              📝 Notes
            </button>
            <button
              className={`nav-link ${currentView === 'videos' ? 'active' : ''}`}
              onClick={() => setCurrentView('videos')}
            >
              🎬 Videos
            </button>
            <button
              className={`nav-link ${currentView === 'links' ? 'active' : ''}`}
              onClick={() => setCurrentView('links')}
            >
              🔗 Links
            </button>
            <button
              className={`nav-link ${currentView === 'media' ? 'active' : ''}`}
              onClick={() => setCurrentView('media')}
            >
              📁 Media
            </button>
            <button
              className={`nav-link ${currentView === 'cookbooks' ? 'active' : ''}`}
              onClick={() => setCurrentView('cookbooks')}
            >
              📚 Cookbooks
            </button>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">{renderContent()}</div>
      </main>

      {/* Slide-in Panel */}
      <FormPanel
        isOpen={isFormOpen}
        type={formType}
        item={editingItem}
        onClose={closeForm}
        onSave={saveItem}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Chef Virtu's Kitchen Database. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// FormPanel Component
interface FormPanelProps {
  isOpen: boolean;
  type: string;
  item: ItemRecord | null;
  onClose: () => void;
  onSave: (formData: FormData) => void;
}

function FormPanel({ isOpen, type, item, onClose, onSave }: FormPanelProps) {
  const [formData, setFormData] = useState<FormData>(item || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
          transition: 'background 0.3s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 999,
        }}
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '100%',
          maxWidth: '500px',
          background: 'white',
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Panel Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            background: '#f9f9f9',
            borderBottom: '1px solid #e0e0e0',
            flexShrink: 0,
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#2C3E50', fontWeight: 600 }}>
            {item ? 'Edit' : 'Add'} {type}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              color: '#999',
              cursor: 'pointer',
              padding: 0,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            ✕
          </button>
        </div>

        {/* Panel Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 500 }}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: 'white',
                color: '#333',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 500 }}>
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category || formData.cuisine || ''}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: 'white',
                color: '#333',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 500 }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: 'white',
                color: '#333',
                resize: 'vertical',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 500 }}>
              Content / Steps
            </label>
            <textarea
              name="content"
              value={formData.content || formData.steps || ''}
              onChange={handleChange}
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: 'white',
                color: '#333',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Panel Actions */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              marginTop: '24px',
              paddingTop: '24px',
              background: '#f9f9f9',
              borderTop: '1px solid #e0e0e0',
              marginLeft: '-24px',
              marginRight: '-24px',
              marginBottom: '-24px',
              padding: '24px',
            }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: '10px 24px',
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn"
              style={{
                padding: '10px 24px',
                backgroundColor: '#999',
                color: 'white',
              }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}