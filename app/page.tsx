// ============================================================================
// COMPLETE app.tsx - SLIDE-IN PANEL FOR ADDING/EDITING ITEMS
// Works with Next.js App Router
// ============================================================================

'use client';

import { useState } from 'react';
import '../kitchen.css';

interface Item {
  id: number;
  title: string;
  [key: string]: any;
}

interface FormData {
  [key: string]: string;
}

export default function KitchenDatabase() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const [data, setData] = useState({
    recipes: [
      {
        id: 1,
        title: 'Chocolate Soufflé',
        cuisine: 'French',
        difficulty: 'Advanced',
        servings: 6,
        preptime: 45,
        cooktime: 15,
        description: 'A classic French dessert.',
        ingredients: 'Chocolate, eggs, sugar',
        instructions: 'Mix and bake',
      },
    ],
    sops: [
      {
        id: 1,
        title: 'Kitchen Opening',
        category: 'Daily Operations',
        priority: 'High',
        description: 'Morning opening procedures',
        steps: 'Check temps, clean equipment',
        compliancenotes: 'Temperature logs required',
      },
    ],
    techniques: [] as Item[],
    notes: [] as Item[],
    videos: [] as Item[],
    links: [] as Item[],
    media: [] as Item[],
    cookbooks: [] as Item[],
  });

  const [nextIds, setNextIds] = useState({
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
    const typeMap: { [key: string]: keyof typeof data } = {
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
    const item = data[actualType].find((i: Item) => i.id === id);

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
    const typeMap: { [key: string]: keyof typeof data } = {
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
        const index = newData[actualType].findIndex((i: Item) => i.id === editingItem.id);
        if (index !== -1) {
          newData[actualType][index] = {
            ...newData[actualType][index],
            ...formData,
            updatedat: new Date().toISOString().split('T')[0],
          };
        }
      } else {
        if (actualType === 'SOPs') {
  newData.SOPs.push({
    id: nextIds.SOPs,
    title: formData.title || '',
    category: formData.category || '',
    priority: formData.priority || '',
    description: formData.description || '',
    steps: formData.steps || '',
    compliancenotes: formData.compliancenotes || '',
    createdat: new Date().toISOString().split('T')[0],
    updatedat: new Date().toISOString().split('T')[0],
  })
} else if (actualType === 'Recipes') {
  newData.Recipes.push({
    id: nextIds.Recipes,
    title: formData.title || '',
    cuisine: formData.cuisine || '',
    difficulty: formData.difficulty || 'Medium',
    servings: formData.servings ? parseInt(formData.servings) : 1,
    preptime: formData.preptime ? parseInt(formData.preptime) : 0,
    cooktime: formData.cooktime ? parseInt(formData.cooktime) : 0,
    description: formData.description || '',
    ingredients: formData.ingredients || '',
    instructions: formData.instructions || '',
    createdat: new Date().toISOString().split('T')[0],
    updatedat: new Date().toISOString().split('T')[0],
  })
} else if (actualType === 'Techniques') {
  // Handle Techniques with their own fields
  newData.Techniques.push({
    // ... add Technique-specific fields
  })
}
;

        setNextIds((prev) => ({
          ...prev,
          [actualType]: prev[actualType as keyof typeof prev] + 1,
        }));
      }

      return newData;
    });

    closeForm();
  };

  // Delete item
  const deleteItem = (section: keyof typeof data, id: number) => {
    if (confirm('Delete this item?')) {
      setData((prevData) => ({
        ...prevData,
        [section]: prevData[section].filter((item: Item) => item.id !== id),
      }));
    }
  };

  // Render dashboard
  const renderDashboard = () => (
    <section className="welcome-section">
      <h2 className="welcome-title">Welcome to Your Kitchen Database</h2>
      <p className="welcome-subtitle">Organize your culinary knowledge in one place</p>
      <div className="grid-container">
        <div className="card" onClick={() => setCurrentView('recipes')}>
          <div className="card-icon">📖</div>
          <h3 className="card-title">Recipes</h3>
          <p className="card-description">Recipe collection</p>
          <div className="card-meta">{data.recipes.length} recipes</div>
        </div>
        <div className="card" onClick={() => setCurrentView('sops')}>
          <div className="card-icon">📋</div>
          <h3 className="card-title">SOPs</h3>
          <p className="card-description">Standard Operating Procedures</p>
          <div className="card-meta">{data.sops.length} SOPs</div>
        </div>
        <div className="card" onClick={() => setCurrentView('techniques')}>
          <div className="card-icon">🎯</div>
          <h3 className="card-title">Techniques</h3>
          <p className="card-description">Culinary techniques</p>
          <div className="card-meta">{data.techniques.length} techniques</div>
        </div>
        <div className="card" onClick={() => setCurrentView('notes')}>
          <div className="card-icon">📝</div>
          <h3 className="card-title">Notes</h3>
          <p className="card-description">Quick notes</p>
          <div className="card-meta">{data.notes.length} notes</div>
        </div>
        <div className="card" onClick={() => setCurrentView('videos')}>
          <div className="card-icon">🎬</div>
          <h3 className="card-title">Videos</h3>
          <p className="card-description">Video tutorials</p>
          <div className="card-meta">{data.videos.length} videos</div>
        </div>
        <div className="card" onClick={() => setCurrentView('links')}>
          <div className="card-icon">🔗</div>
          <h3 className="card-title">Links</h3>
          <p className="card-description">Useful links</p>
          <div className="card-meta">{data.links.length} links</div>
        </div>
        <div className="card" onClick={() => setCurrentView('media')}>
          <div className="card-icon">📁</div>
          <h3 className="card-title">Media</h3>
          <p className="card-description">Photos & documents</p>
          <div className="card-meta">{data.media.length} items</div>
        </div>
        <div className="card" onClick={() => setCurrentView('cookbooks')}>
          <div className="card-icon">📚</div>
          <h3 className="card-title">Cookbooks</h3>
          <p className="card-description">Digital cookbook collection</p>
          <div className="card-meta">{data.cookbooks.length} cookbooks</div>
        </div>
      </div>
    </section>
  );

  // Render items list
  const renderItems = (section: keyof typeof data, icon: string, title: string, type: string) => (
    <div>
      <div className="section-header">
        <h2>{icon} {title}</h2>
        <button className="btn-add" onClick={() => openAddForm(type)}>
          + Add {title.slice(0, -1)}
        </button>
      </div>

      {data[section].length === 0 ? (
        <p className="empty-message">No items yet. Click the button to add one!</p>
      ) : (
        <div className="items-grid">
          {data[section].map((item: Item) => (
            <div key={item.id} className="item-card">
              <h3>{item.title}</h3>
              <p className="meta">{item.category || item.cuisine || 'General'}</p>
              <p className="description">{item.description || 'No description'}</p>
              <div className="card-footer">
                <button className="btn-edit" onClick={() => openEditForm(type, item.id)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => deleteItem(section, item.id)}>
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
        return renderItems('recipes', '📖', 'Recipes', 'recipe');
      case 'sops':
        return renderItems('sops', '📋', 'SOPs', 'sop');
      case 'techniques':
        return renderItems('techniques', '🎯', 'Techniques', 'technique');
      case 'notes':
        return renderItems('notes', '📝', 'Notes', 'note');
      case 'videos':
        return renderItems('videos', '🎬', 'Videos', 'video');
      case 'links':
        return renderItems('links', '🔗', 'Links', 'link');
      case 'media':
        return renderItems('media', '📁', 'Media', 'media');
      case 'cookbooks':
        return renderItems('cookbooks', '📚', 'Cookbooks', 'cookbook');
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">👨‍🍳</span>
              <h1 className="logo-text">Chef Virtu's Kitchen Database</h1>
            </div>
            <input type="search" placeholder="Search..." className="search-input" />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-tab ${currentView === 'recipes' ? 'active' : ''}`}
          onClick={() => setCurrentView('recipes')}
        >
          📖 Recipes
        </button>
        <button
          className={`nav-tab ${currentView === 'sops' ? 'active' : ''}`}
          onClick={() => setCurrentView('sops')}
        >
          📋 SOPs
        </button>
        <button
          className={`nav-tab ${currentView === 'techniques' ? 'active' : ''}`}
          onClick={() => setCurrentView('techniques')}
        >
          🎯 Techniques
        </button>
        <button
          className={`nav-tab ${currentView === 'notes' ? 'active' : ''}`}
          onClick={() => setCurrentView('notes')}
        >
          📝 Notes
        </button>
        <button
          className={`nav-tab ${currentView === 'videos' ? 'active' : ''}`}
          onClick={() => setCurrentView('videos')}
        >
          🎬 Videos
        </button>
        <button
          className={`nav-tab ${currentView === 'links' ? 'active' : ''}`}
          onClick={() => setCurrentView('links')}
        >
          🔗 Links
        </button>
        <button
          className={`nav-tab ${currentView === 'media' ? 'active' : ''}`}
          onClick={() => setCurrentView('media')}
        >
          📁 Media
        </button>
        <button
          className={`nav-tab ${currentView === 'cookbooks' ? 'active' : ''}`}
          onClick={() => setCurrentView('cookbooks')}
        >
          📚 Cookbooks
        </button>
      </nav>

      {/* Main Content */}
      <main>
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
    </div>
  );
}

// FormPanel Component
interface FormPanelProps {
  isOpen: boolean;
  type: string;
  item: Item | null;
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
      <div className={`form-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

      {/* Slide-in Panel */}
      <div className={`slide-panel ${isOpen ? 'open' : ''}`}>
        <div className="panel-header">
          <h2>{item ? 'Edit' : 'Add'} {type}</h2>
          <button className="panel-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="panel-form">
          <input
            type="text"
            placeholder="Title *"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Category / Cuisine"
            name="category"
            value={formData.category || formData.cuisine || ''}
            onChange={handleChange}
          />
          <textarea
            placeholder="Description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows={4}
          />
          <textarea
            placeholder="Content"
            name="content"
            value={formData.content || ''}
            onChange={handleChange}
            rows={6}
          />

          <div className="panel-actions">
            <button type="submit" className="btn-save">
              Save
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}