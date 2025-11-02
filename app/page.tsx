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

  const deleteItem = (section: string, id: number) => {
    if (confirm('Delete this item?')) {
      setData((prevData) => ({
        ...prevData,
        [section]: prevData[section].filter((item: ItemRecord) => item.id !== id),
      }));
    }
  };

  const renderDashboard = () => (
    <div>
      <h2 style={{ fontSize: '2.5rem', color: '#1A3A3F', marginBottom: '8px', fontWeight: 700 }}>
        Welcome to Your Kitchen
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '40px', lineHeight: '1.6' }}>
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
              background: 'white',
              border: '2px solid #E8DCC4',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = '#21808D';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(33, 128, 141, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#E8DCC4';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
            <h3 style={{ margin: '0 0 8px 0', color: '#21808D', fontSize: '1.2rem', fontWeight: 600 }}>
              {item.title}
            </h3>
            <p style={{ margin: 0, color: '#999', fontSize: '1.1rem', fontWeight: 500 }}>
              {data[item.section].length}
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
          borderBottom: '2px solid #E8DCC4',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '2rem', color: '#1A3A3F', fontWeight: 700 }}>{title}</h2>
        <button
          onClick={() => openAddForm(type)}
          style={{
            background: '#21808D',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1D7480';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(33, 128, 141, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#21808D';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          + Add
        </button>
      </div>

      {!data[section] || data[section].length === 0 ? (
        <div style={{ textAlign: 'center', color: '#999', padding: '60px 20px' }}>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>No items yet. Click the button to add one!</p>
        </div>
      ) : (
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
                background: 'white',
                border: '1px solid #E8DCC4',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', color: '#21808D', fontSize: '1.15rem', fontWeight: 600 }}>
                {item.title}
              </h3>
              <p style={{ color: '#999', fontSize: '0.85rem', margin: '0 0 12px 0' }}>
                {item.category || item.cuisine || 'General'}
              </p>
              <p style={{ color: '#666', margin: '12px 0', minHeight: '50px', lineHeight: '1.5' }}>
                {item.description || 'No description'}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button
                  onClick={() => openEditForm(type, item.id)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1976d2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#2196f3';
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(section, item.id)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#E74C3C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#C0392B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#E74C3C';
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
    <div style={{ background: '#F0CF92', minHeight: '100vh' }}>
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(135deg, #21808D 0%, #1D7480 100%)',
          color: 'white',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
                border: 'none',
                borderRadius: '6px',
                width: '250px',
                fontSize: '14px',
              }}
            />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        style={{
          background: 'white',
          borderBottom: '2px solid #E8DCC4',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
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
                  background: currentView === tab.id ? 'white' : 'transparent',
                  color: currentView === tab.id ? '#21808D' : '#666',
                  borderBottom: currentView === tab.id ? '3px solid #21808D' : '3px solid transparent',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: currentView === tab.id ? 600 : 500,
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (currentView !== tab.id) {
                    e.currentTarget.style.color = '#21808D';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentView !== tab.id) {
                    e.currentTarget.style.color = '#666';
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
          background: '#21808D',
          color: 'white',
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
  const [formData, setFormData] = useState<FormData>(item || {});

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
          background: 'white',
          boxShadow: '-2px 0 12px rgba(0, 0, 0, 0.15)',
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
            background: 'linear-gradient(135deg, #21808D 0%, #1D7480 100%)',
            color: 'white',
            flexShrink: 0,
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
            {item ? '✏️ Edit' : '➕ Add'} {type}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
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
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 600, fontSize: '0.95rem' }}>
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
                border: '1px solid #E8DCC4',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: '#fafaf8',
                color: '#333',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#21808D';
                e.currentTarget.style.background = 'white';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E8DCC4';
                e.currentTarget.style.background = '#fafaf8';
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 600, fontSize: '0.95rem' }}>
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
                border: '1px solid #E8DCC4',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: '#fafaf8',
                color: '#333',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#21808D';
                e.currentTarget.style.background = 'white';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E8DCC4';
                e.currentTarget.style.background = '#fafaf8';
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 600, fontSize: '0.95rem' }}>
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
                border: '1px solid #E8DCC4',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: '#fafaf8',
                color: '#333',
                resize: 'vertical',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#21808D';
                e.currentTarget.style.background = 'white';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E8DCC4';
                e.currentTarget.style.background = '#fafaf8';
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 600, fontSize: '0.95rem' }}>
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
                border: '1px solid #E8DCC4',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: '#fafaf8',
                color: '#333',
                resize: 'vertical',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#21808D';
                e.currentTarget.style.background = 'white';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E8DCC4';
                e.currentTarget.style.background = '#fafaf8';
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
                background: '#21808D',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1D7480';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#21808D';
                e.currentTarget.style.transform = 'translateY(0)';
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
                background: '#E8DCC4',
                color: '#333',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E0D1B5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#E8DCC4';
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