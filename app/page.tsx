'use client';

import { useState } from 'react';
import '../styles/kitchen.css';

// Type definitions for different item types
type SOP = {
  id: number;
  title: string;
  category: string;
  priority: string;
  description: string;
  steps: string;
  compliancenotes: string;
  createdat: string;
  updatedat: string;
};

type Recipe = {
  id: number;
  title: string;
  cuisine: string;
  difficulty: string;
  servings: number;
  preptime: number;
  cooktime: number;
  description: string;
  ingredients: string;
  instructions: string;
  createdat: string;
  updatedat: string;
};

type Technique = {
  id: number;
  title: string;
  description: string;
  steps: string;
  tools: string;
  createdat: string;
  updatedat: string;
};

type Note = {
  id: number;
  title: string;
  content: string;
  category: string;
  createdat: string;
  updatedat: string;
};

// Initial data structure
const initialData = {
  SOPs: [] as SOP[],
  Recipes: [] as Recipe[],
  Techniques: [] as Technique[],
  Notes: [] as Note[],
};

export default function Home() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState<'SOPs' | 'Recipes' | 'Techniques' | 'Notes'>('SOPs');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [nextIds] = useState({
    SOPs: 1,
    Recipes: 1,
    Techniques: 1,
    Notes: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    if (!formData.title) {
      alert('Title is required');
      return;
    }

    const newData = { ...data };
    const now = new Date().toISOString().split('T')[0];

    try {
      if (activeTab === 'SOPs') {
        const newSOP: SOP = {
          id: nextIds.SOPs,
          title: formData.title,
          category: formData.category || '',
          priority: formData.priority || 'Medium',
          description: formData.description || '',
          steps: formData.steps || '',
          compliancenotes: formData.compliancenotes || '',
          createdat: now,
          updatedat: now,
        };
        newData.SOPs = [...newData.SOPs, newSOP];
      } else if (activeTab === 'Recipes') {
        const newRecipe: Recipe = {
          id: nextIds.Recipes,
          title: formData.title,
          cuisine: formData.cuisine || '',
          difficulty: formData.difficulty || 'Medium',
          servings: formData.servings ? parseInt(formData.servings) : 1,
          preptime: formData.preptime ? parseInt(formData.preptime) : 0,
          cooktime: formData.cooktime ? parseInt(formData.cooktime) : 0,
          description: formData.description || '',
          ingredients: formData.ingredients || '',
          instructions: formData.instructions || '',
          createdat: now,
          updatedat: now,
        };
        newData.Recipes = [...newData.Recipes, newRecipe];
      } else if (activeTab === 'Techniques') {
        const newTechnique: Technique = {
          id: nextIds.Techniques,
          title: formData.title,
          description: formData.description || '',
          steps: formData.steps || '',
          tools: formData.tools || '',
          createdat: now,
          updatedat: now,
        };
        newData.Techniques = [...newData.Techniques, newTechnique];
      } else if (activeTab === 'Notes') {
        const newNote: Note = {
          id: nextIds.Notes,
          title: formData.title,
          content: formData.content || '',
          category: formData.category || '',
          createdat: now,
          updatedat: now,
        };
        newData.Notes = [...newData.Notes, newNote];
      }

      setData(newData);
      setFormData({});
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Please try again.');
    }
  };

  const handleDeleteItem = (id: number) => {
    const newData = { ...data };
    if (activeTab === 'SOPs') {
      newData.SOPs = newData.SOPs.filter((item) => item.id !== id);
    } else if (activeTab === 'Recipes') {
      newData.Recipes = newData.Recipes.filter((item) => item.id !== id);
    } else if (activeTab === 'Techniques') {
      newData.Techniques = newData.Techniques.filter((item) => item.id !== id);
    } else if (activeTab === 'Notes') {
      newData.Notes = newData.Notes.filter((item) => item.id !== id);
    }
    setData(newData);
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case 'SOPs':
        return (
          <>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category || ''}
              onChange={handleInputChange}
            />
            <select name="priority" value={formData.priority || 'Medium'} onChange={handleInputChange as any}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description || ''}
              onChange={handleInputChange}
            />
            <textarea
              name="steps"
              placeholder="Steps"
              value={formData.steps || ''}
              onChange={handleInputChange}
            />
            <textarea
              name="compliancenotes"
              placeholder="Compliance Notes"
              value={formData.compliancenotes || ''}
              onChange={handleInputChange}
            />
          </>
        );

      case 'Recipes':
        return (
          <>
            <input
              type="text"
              name="cuisine"
              placeholder="Cuisine"
              value={formData.cuisine || ''}
              onChange={handleInputChange}
            />
            <select name="difficulty" value={formData.difficulty || 'Medium'} onChange={handleInputChange as any}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input
              type="number"
              name="servings"
              placeholder="Servings"
              value={formData.servings || ''}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="preptime"
              placeholder="Prep Time (minutes)"
              value={formData.preptime || ''}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="cooktime"
              placeholder="Cook Time (minutes)"
              value={formData.cooktime || ''}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description || ''}
              onChange={handleInputChange}
            />
            <textarea
              name="ingredients"
              placeholder="Ingredients (one per line)"
              value={formData.ingredients || ''}
              onChange={handleInputChange}
            />
            <textarea
              name="instructions"
              placeholder="Instructions"
              value={formData.instructions || ''}
              onChange={handleInputChange}
            />
          </>
        );

      case 'Techniques':
        return (
          <>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description || ''}
              onChange={handleInputChange}
            />
            <textarea
              name="steps"
              placeholder="Steps"
              value={formData.steps || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="tools"
              placeholder="Tools Required"
              value={formData.tools || ''}
              onChange={handleInputChange}
            />
          </>
        );

      case 'Notes':
        return (
          <>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category || ''}
              onChange={handleInputChange}
            />
            <textarea
              name="content"
              placeholder="Note Content"
              value={formData.content || ''}
              onChange={handleInputChange}
            />
          </>
        );

      default:
        return null;
    }
  };

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'SOPs':
        return data.SOPs;
      case 'Recipes':
        return data.Recipes;
      case 'Techniques':
        return data.Techniques;
      case 'Notes':
        return data.Notes;
      default:
        return [];
    }
  };

  const items = getCurrentItems();

  return (
    <main className="kitchen-container">
      <header className="kitchen-header">
        <h1>🍳 Kitchen Database</h1>
        <p>Manage your SOPs, Recipes, Techniques, and Notes</p>
      </header>

      <div className="tabs">
        {(['SOPs', 'Recipes', 'Techniques', 'Notes'] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              setFormData({});
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="form-section">
        <h2>Add New {activeTab.slice(0, -1)}</h2>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Title (required)"
            value={formData.title || ''}
            onChange={handleInputChange}
            className="form-input"
          />
          {renderFormFields()}
          <button onClick={handleAddItem} className="btn-primary">
            Add {activeTab.slice(0, -1)}
          </button>
        </div>
      </section>

      <section className="items-section">
        <h2>{activeTab}</h2>
        {items.length === 0 ? (
          <p className="empty-state">No {activeTab.toLowerCase()} yet. Add one to get started!</p>
        ) : (
          <div className="items-list">
            {items.map((item: any) => (
              <div key={item.id} className="item-card">
                <div className="item-header">
                  <h3>{item.title}</h3>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="btn-delete"
                    aria-label="Delete item"
                  >
                    ✕
                  </button>
                </div>
                <div className="item-content">
                  {Object.entries(item).map(([key, value]) => {
                    if (key === 'id' || key === 'title') return null;
                    return (
                      <p key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}