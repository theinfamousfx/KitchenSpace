'use client';

import { useState, useEffect } from 'react';
import './styles/kitchen.css';

type ItemRecord = Record<string, any>;

interface FormData {
  [key: string]: string;
}

// Color Palette - All Solid
const colors = {
  primary: '#0492C2',      // Bright Blue
  accent: '#FAEFDA',       // Cream White
  light: '#F0CF92',        // Light Tan (Background)
  medium: '#BFB195',       // Medium Tan
  dark: '#A08A61',         // Dark Tan
  text: '#1A1A1A',         // Very Dark (Text)
  lightText: '#FFFFFF',    // White Text
  danger: '#E74C3C',       // Red
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// API Service Functions
const api = {
  async fetchItems(type: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/${type}`);
      if (!response.ok) throw new Error(`Failed to fetch ${type}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return [];
    }
  },

  async createItem(type: string, data: ItemRecord) {
    try {
      const response = await fetch(`${API_BASE_URL}/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to create ${type}`);
      return await response.json();
    } catch (error) {
      console.error(`Error creating ${type}:`, error);
      throw error;
    }
  },

  async updateItem(type: string, id: number, data: ItemRecord) {
    try {
      const response = await fetch(`${API_BASE_URL}/${type}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to update ${type}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      throw error;
    }
  },

  async deleteItem(type: string, id: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/${type}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Failed to delete ${type}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      throw error;
    }
  },
};

export default function KitchenDatabase() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>('');
  const [editingItem, setEditingItem] = useState<ItemRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<Record<string, ItemRecord[]>>({
    recipes: [],
    sops: [],
    techniques: [],
    notes: [],
    videos: [],
    links: [],
    media: [],
    cookbooks: [],
  });

  // Fetch all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const types = ['recipes', 'sops', 'techniques', 'notes', 'videos', 'links', 'media', 'cookbooks'];
      const results = await Promise.all(types.map((type) => api.fetchItems(type)));

      const newData: Record<string, ItemRecord[]> = {};
      types.forEach((type, index) => {
        newData[type] = results[index];
      });

      setData(newData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = (type: string) => {
    setFormType(type);
    setEditingItem(null);
    setIsFormOpen(true);
  };

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

  const closeForm = () => {
    setIsFormOpen(false);
    setFormType('');
    setEditingItem(null);
  };

  const saveItem = async (formData: FormData) => {
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

    try {
      setLoading(true);

      if (editingItem) {
        // Update existing item
        await api.updateItem(actualType, editingItem.id, formData);
      } else {
        // Create new item
        await api.createItem(actualType, formData);
      }

      // Reload data
      await loadAllData();
      closeForm();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (section: string, id: number) => {
    if (!confirm('Delete this item?')) return;

    try {
      setLoading(true);
      await api.deleteItem(section, id);
      await loadAllData();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderDashboard = () => (
    <div>
      <h2 style={{ fontSize: '2.8rem', color: colors.primary, marginBottom: '8px', fontWeight: 700 }}>
        Welcome to Your Kitchen
      </h2>
      <p style={{ fontSize: '1.1rem', color: colors.dark, marginBottom: '40px', lineHeight: '1.6' }}>
        Organize your culinary knowledge, recipes, and techniques in one place
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginTop: '30px',
        }}
      >
        {[
          { section: 'recipes', icon: '📖', title: 'Recipes' },
          { section: 'sops', icon: '📋', title: 'SOPs' },
          { section: 'techniques', icon: '🎯', title: 'Techniques' },
          { section: 'notes', icon: '📝', title: 'Notes' },
          { section: 'videos', icon: '🎬', title: 'Videos' },
          { section: 'links', icon: '🔗', title: 'Links' },
          { section: 'media', icon: '📁', title: 'Media' },
          { section: 'cookbooks', icon: '📚', title: 'Cookbooks' },
        ].map((item) => (
          <div
            key={item.section}
            onClick={() => setCurrentView(item.section)}
            style={{
              background: colors.accent,
              border: `2px solid ${colors.medium}`,
              borderRadius: '14px',
              padding: '28px 20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ fontSize: '2.8rem', marginBottom: '12px' }}>{item.icon}</div>
            <h3 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '1.2rem', fontWeight: 700 }}>
              {item.title}
            </h3>
            <p style={{ margin: 0, color: colors.dark, fontSize: '1rem', fontWeight: 600 }}>
              {data[item.section].length} {item.title.toLowerCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderItems = (section: string, title: string, type: string) => (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: `3px solid ${colors.medium}`,
        }}
      >
        <h2 style={{ margin: 0, fontSize: '2.2rem', color: colors.primary, fontWeight: 700 }}>{title}</h2>
        <button
          onClick={() => openAddForm(type)}
          disabled={loading}
          style={{
            background: colors.primary,
            color: colors.lightText,
            border: 'none',
            padding: '12px 28px',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '0.95rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            opacity: loading ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
          }}
        >
          + Add {title.slice(0, -1)}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: colors.dark }}>
          <p>Loading...</p>
        </div>
      )}

      {!loading && (!data[section] || data[section].length === 0) && (
        <div style={{ textAlign: 'center', color: colors.dark, padding: '60px 20px' }}>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>No items yet. Click the button to add one!</p>
        </div>
      )}

      {!loading && data[section] && data[section].length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {data[section].map((item: ItemRecord) => (
            <div
              key={item.id}
              style={{
                background: colors.accent,
                border: `1px solid ${colors.medium}`,
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '1.15rem', fontWeight: 700 }}>
                {item.title}
              </h3>
              <p style={{ color: colors.dark, fontSize: '0.85rem', margin: '0 0 12px 0', fontWeight: 500 }}>
                {item.category || item.cuisine || 'General'}
              </p>
              <p style={{ color: colors.text, margin: '12px 0', minHeight: '50px', lineHeight: '1.5' }}>
                {item.description || 'No description'}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button
                  onClick={() => openEditForm(type, item.id)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: colors.primary,
                    color: colors.lightText,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.opacity = '1';
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(section, item.id)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: colors.danger,
                    color: colors.lightText,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.opacity = '1';
                  }}
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

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'recipes', label: '📖 Recipes' },
    { id: 'sops', label: '📋 SOPs' },
    { id: 'techniques', label: '🎯 Techniques' },
    { id: 'notes', label: '📝 Notes' },
    { id: 'videos', label: '🎬 Videos' },
    { id: 'links', label: '🔗 Links' },
    { id: 'media', label: '📁 Media' },
    { id: 'cookbooks', label: '📚 Cookbooks' },
  ];

  return (
    <div style={{ background: colors.light, minHeight: '100vh' }}>
      {/* Header */}
      <header
        style={{
          background: colors.primary,
          color: colors.lightText,
          padding: '24px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '2.5rem' }}>👨‍🍳</span>
              <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700 }}>Chef Virtu's Kitchen</h1>
            </div>
            <input
              type="search"
              placeholder="Search recipes, notes..."
              style={{
                padding: '10px 15px',
                border: `2px solid ${colors.accent}`,
                borderRadius: '8px',
                width: '250px',
                fontSize: '14px',
                background: colors.accent,
                color: colors.text,
              }}
            />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        style={{
          background: colors.accent,
          borderBottom: `3px solid ${colors.primary}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 80,
          zIndex: 99,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                style={{
                  padding: '16px 20px',
                  border: 'none',
                  background: currentView === tab.id ? colors.light : 'transparent',
                  color: currentView === tab.id ? colors.primary : colors.dark,
                  borderBottom: currentView === tab.id ? `3px solid ${colors.primary}` : '3px solid transparent',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: currentView === tab.id ? 700 : 600,
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (currentView !== tab.id) {
                    e.currentTarget.style.color = colors.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentView !== tab.id) {
                    e.currentTarget.style.color = colors.dark;
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 16px', minHeight: 'calc(100vh - 280px)' }}>
        {renderContent()}
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
      <footer
        style={{
          background: colors.primary,
          color: colors.lightText,
          textAlign: 'center',
          padding: '24px',
          marginTop: '40px',
        }}
      >
        <p style={{ margin: 0 }}>&copy; 2025 Chef Virtu's Kitchen Database. All rights reserved.</p>
      </footer>
    </div>
  );
}

interface FormPanelProps {
  isOpen: boolean;
  type: string;
  item: ItemRecord | null;
  onClose: () => void;
  onSave: (formData: FormData) => void;
}

function FormPanel({ isOpen, type, item, onClose, onSave }: FormPanelProps) {
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({});
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({});
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
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
      />

      {/* Slide Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '100%',
          maxWidth: '480px',
          background: colors.accent,
          boxShadow: '0 0 16px rgba(0,0,0,0.15)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            background: colors.primary,
            color: colors.lightText,
            flexShrink: 0,
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            {item ? '✏️ Edit' : '➕ Add'} {type}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: colors.lightText,
              fontSize: '1.8rem',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '28px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: colors.primary, fontWeight: 700, fontSize: '0.95rem' }}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              placeholder="Enter title"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${colors.medium}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: colors.lightText,
                color: colors.text,
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(4, 146, 194, 0.15)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.medium;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: colors.primary, fontWeight: 700, fontSize: '0.95rem' }}>
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category || formData.cuisine || ''}
              onChange={handleChange}
              placeholder="e.g., French, Daily Operations"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${colors.medium}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: colors.lightText,
                color: colors.text,
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(4, 146, 194, 0.15)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.medium;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: colors.primary, fontWeight: 700, fontSize: '0.95rem' }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Add a description..."
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${colors.medium}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: colors.lightText,
                color: colors.text,
                resize: 'vertical',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(4, 146, 194, 0.15)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.medium;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: colors.primary, fontWeight: 700, fontSize: '0.95rem' }}>
              Content / Details
            </label>
            <textarea
              name="content"
              value={formData.content || formData.steps || ''}
              onChange={handleChange}
              rows={5}
              placeholder="Add content, steps, or additional details..."
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${colors.medium}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: colors.lightText,
                color: colors.text,
                resize: 'vertical',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(4, 146, 194, 0.15)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.medium;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                background: colors.primary,
                color: colors.lightText,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                background: colors.medium,
                color: colors.lightText,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}