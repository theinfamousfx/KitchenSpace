'use client';

import { useState } from 'react';
import '../styles/kitchen.css';

// Type definitions for different items
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
};

type SOP = {
  id: number;
  title: string;
  category: string;
  priority: string;
  description: string;
  steps: string;
  compliancenotes: string;
};

type Technique = {
  id: number;
  title: string;
  description: string;
  steps: string;
  tools: string;
};

type Note = {
  id: number;
  title: string;
  content: string;
  category: string;
};

type Resource = {
  id: number;
  title: string;
  type: string;
  url: string;
  description: string;
};

type Cookbook = {
  id: number;
  title: string;
  author: string;
  cuisine: string;
  rating: number;
  notes: string;
};

export default function Home() {
  // State management
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [sops, setSOPs] = useState<SOP[]>([]);
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [cookbooks, setCookbooks] = useState<Cookbook[]>([]);

  // Panel state
  const [showPanel, setShowPanel] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, any>>({});

  // IDs counter
  const [nextIds, setNextIds] = useState({
    recipes: 1,
    sops: 1,
    techniques: 1,
    notes: 1,
    resources: 1,
    cookbooks: 1,
  });

  // Open add panel
  const handleAddClick = (section: string) => {
    setActiveSection(section);
    setFormData({});
    setShowPanel(true);
  };

  // Close panel
  const handleClosePanel = () => {
    setShowPanel(false);
    setFormData({});
    setActiveSection('');
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle number input
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ? parseInt(value) : 0,
    }));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || formData.title.trim() === '') {
      alert('Title is required');
      return;
    }

    try {
      if (activeSection === 'Recipes') {
        const newRecipe: Recipe = {
          id: nextIds.recipes,
          title: formData.title,
          cuisine: formData.cuisine || '',
          difficulty: formData.difficulty || 'Medium',
          servings: formData.servings || 1,
          preptime: formData.preptime || 0,
          cooktime: formData.cooktime || 0,
          description: formData.description || '',
          ingredients: formData.ingredients || '',
          instructions: formData.instructions || '',
        };
        setRecipes([...recipes, newRecipe]);
        setNextIds({ ...nextIds, recipes: nextIds.recipes + 1 });
      } else if (activeSection === 'SOPs') {
        const newSOP: SOP = {
          id: nextIds.sops,
          title: formData.title,
          category: formData.category || '',
          priority: formData.priority || 'Medium',
          description: formData.description || '',
          steps: formData.steps || '',
          compliancenotes: formData.compliancenotes || '',
        };
        setSOPs([...sops, newSOP]);
        setNextIds({ ...nextIds, sops: nextIds.sops + 1 });
      } else if (activeSection === 'Techniques') {
        const newTechnique: Technique = {
          id: nextIds.techniques,
          title: formData.title,
          description: formData.description || '',
          steps: formData.steps || '',
          tools: formData.tools || '',
        };
        setTechniques([...techniques, newTechnique]);
        setNextIds({ ...nextIds, techniques: nextIds.techniques + 1 });
      } else if (activeSection === 'Notes') {
        const newNote: Note = {
          id: nextIds.notes,
          title: formData.title,
          content: formData.content || '',
          category: formData.category || '',
        };
        setNotes([...notes, newNote]);
        setNextIds({ ...nextIds, notes: nextIds.notes + 1 });
      } else if (activeSection === 'Resources') {
        const newResource: Resource = {
          id: nextIds.resources,
          title: formData.title,
          type: formData.type || 'Link',
          url: formData.url || '',
          description: formData.description || '',
        };
        setResources([...resources, newResource]);
        setNextIds({ ...nextIds, resources: nextIds.resources + 1 });
      } else if (activeSection === 'Cookbooks') {
        const newCookbook: Cookbook = {
          id: nextIds.cookbooks,
          title: formData.title,
          author: formData.author || '',
          cuisine: formData.cuisine || '',
          rating: formData.rating || 5,
          notes: formData.notes || '',
        };
        setCookbooks([...cookbooks, newCookbook]);
        setNextIds({ ...nextIds, cookbooks: nextIds.cookbooks + 1 });
      }

      handleClosePanel();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Please try again.');
    }
  };

  // Render form fields based on section
  const renderFormFields = () => {
    switch (activeSection) {
      case 'Recipes':
        return (
          <>
            <div className="form-group">
              <label>Cuisine</label>
              <input type="text" name="cuisine" placeholder="e.g., Italian, Asian" value={formData.cuisine || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Difficulty</label>
              <select name="difficulty" value={formData.difficulty || 'Medium'} onChange={handleInputChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="form-group">
              <label>Servings</label>
              <input type="number" name="servings" placeholder="4" value={formData.servings || ''} onChange={handleNumberInput} />
            </div>
            <div className="form-group">
              <label>Prep Time (minutes)</label>
              <input type="number" name="preptime" placeholder="15" value={formData.preptime || ''} onChange={handleNumberInput} />
            </div>
            <div className="form-group">
              <label>Cook Time (minutes)</label>
              <input type="number" name="cooktime" placeholder="30" value={formData.cooktime || ''} onChange={handleNumberInput} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" placeholder="Recipe description and notes..." value={formData.description || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Ingredients</label>
              <textarea name="ingredients" placeholder="List ingredients, one per line..." value={formData.ingredients || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Instructions</label>
              <textarea name="instructions" placeholder="Step-by-step instructions..." value={formData.instructions || ''} onChange={handleInputChange} />
            </div>
          </>
        );

      case 'SOPs':
        return (
          <>
            <div className="form-group">
              <label>Category</label>
              <input type="text" name="category" placeholder="e.g., Prep, Safety, Cleanup" value={formData.category || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority || 'Medium'} onChange={handleInputChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" placeholder="SOP overview..." value={formData.description || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Steps</label>
              <textarea name="steps" placeholder="Detailed steps..." value={formData.steps || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Compliance Notes</label>
              <textarea name="compliancenotes" placeholder="Compliance and safety notes..." value={formData.compliancenotes || ''} onChange={handleInputChange} />
            </div>
          </>
        );

      case 'Techniques':
        return (
          <>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" placeholder="What is this technique?" value={formData.description || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Steps</label>
              <textarea name="steps" placeholder="How to perform this technique..." value={formData.steps || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Tools Required</label>
              <input type="text" name="tools" placeholder="e.g., Knife, Whisk, Pan" value={formData.tools || ''} onChange={handleInputChange} />
            </div>
          </>
        );

      case 'Notes':
        return (
          <>
            <div className="form-group">
              <label>Category</label>
              <input type="text" name="category" placeholder="e.g., Ideas, Tips, Reminders" value={formData.category || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea name="content" placeholder="Your notes..." value={formData.content || ''} onChange={handleInputChange} rows={6} />
            </div>
          </>
        );

      case 'Resources':
        return (
          <>
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type || 'Link'} onChange={handleInputChange}>
                <option value="Link">Link</option>
                <option value="Video">Video</option>
                <option value="Article">Article</option>
                <option value="Book">Book</option>
              </select>
            </div>
            <div className="form-group">
              <label>URL</label>
              <input type="url" name="url" placeholder="https://..." value={formData.url || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" placeholder="What is this resource about?" value={formData.description || ''} onChange={handleInputChange} />
            </div>
          </>
        );

      case 'Cookbooks':
        return (
          <>
            <div className="form-group">
              <label>Author</label>
              <input type="text" name="author" placeholder="Cookbook author" value={formData.author || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Cuisine</label>
              <input type="text" name="cuisine" placeholder="e.g., French, Italian" value={formData.cuisine || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <select name="rating" value={formData.rating || 5} onChange={handleNumberInput}>
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" placeholder="Your notes about this cookbook..." value={formData.notes || ''} onChange={handleInputChange} />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // Dashboard button handler
  const handleDashboardClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="kitchen-container">
      {/* PERSISTENT STICKY HEADER */}
      <header className="sticky-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🍳 Kitchen Database</h1>
          </div>
          <div className="header-right">
            <button className="btn-dashboard" onClick={handleDashboardClick}>
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Overlay for panel */}
      {showPanel && (
        <div className="form-overlay" onClick={handleClosePanel} />
      )}

      {/* Slide-in Panel */}
      <div className={`slide-panel ${showPanel ? 'open' : ''}`}>
        <div className="panel-header">
          <h2>Add {activeSection}</h2>
          <button className="close-btn" onClick={handleClosePanel} aria-label="Close panel">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="panel-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {renderFormFields()}

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Add {activeSection?.slice(0, -1)}
            </button>
            <button type="button" className="btn-secondary" onClick={handleClosePanel}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* Recipes Section */}
        <section className="section recipes-section">
          <div className="section-header">
            <h2>📖 Recipes</h2>
            <button className="btn-add" onClick={() => handleAddClick('Recipes')}>
              + Add Recipe
            </button>
          </div>
          <div className="items-grid">
            {recipes.length === 0 ? (
              <p className="empty-state">No recipes yet. Add one to get started!</p>
            ) : (
              recipes.map((recipe) => (
                <div key={recipe.id} className="item-card">
                  <h3>{recipe.title}</h3>
                  <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                  <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                  <p><strong>Servings:</strong> {recipe.servings}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* SOPs Section */}
        <section className="section sops-section">
          <div className="section-header">
            <h2>⚙️ SOPs</h2>
            <button className="btn-add" onClick={() => handleAddClick('SOPs')}>
              + Add SOP
            </button>
          </div>
          <div className="items-grid">
            {sops.length === 0 ? (
              <p className="empty-state">No SOPs yet. Add one to get started!</p>
            ) : (
              sops.map((sop) => (
                <div key={sop.id} className="item-card">
                  <h3>{sop.title}</h3>
                  <p><strong>Category:</strong> {sop.category}</p>
                  <p><strong>Priority:</strong> {sop.priority}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Techniques Section */}
        <section className="section techniques-section">
          <div className="section-header">
            <h2>🎯 Techniques</h2>
            <button className="btn-add" onClick={() => handleAddClick('Techniques')}>
              + Add Technique
            </button>
          </div>
          <div className="items-grid">
            {techniques.length === 0 ? (
              <p className="empty-state">No techniques yet. Add one to get started!</p>
            ) : (
              techniques.map((technique) => (
                <div key={technique.id} className="item-card">
                  <h3>{technique.title}</h3>
                  <p>{technique.description}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Notes Section */}
        <section className="section notes-section">
          <div className="section-header">
            <h2>📝 Notes</h2>
            <button className="btn-add" onClick={() => handleAddClick('Notes')}>
              + Add Note
            </button>
          </div>
          <div className="items-grid">
            {notes.length === 0 ? (
              <p className="empty-state">No notes yet. Add one to get started!</p>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="item-card">
                  <h3>{note.title}</h3>
                  <p><strong>Category:</strong> {note.category}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Resources Section */}
        <section className="section resources-section">
          <div className="section-header">
            <h2>🔗 Resources</h2>
            <button className="btn-add" onClick={() => handleAddClick('Resources')}>
              + Add Resource
            </button>
          </div>
          <div className="items-grid">
            {resources.length === 0 ? (
              <p className="empty-state">No resources yet. Add one to get started!</p>
            ) : (
              resources.map((resource) => (
                <div key={resource.id} className="item-card">
                  <h3>{resource.title}</h3>
                  <p><strong>Type:</strong> {resource.type}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Cookbooks Section */}
        <section className="section cookbooks-section">
          <div className="section-header">
            <h2>📚 Cookbooks</h2>
            <button className="btn-add" onClick={() => handleAddClick('Cookbooks')}>
              + Add Cookbook
            </button>
          </div>
          <div className="items-grid">
            {cookbooks.length === 0 ? (
              <p className="empty-state">No cookbooks yet. Add one to get started!</p>
            ) : (
              cookbooks.map((cookbook) => (
                <div key={cookbook.id} className="item-card">
                  <h3>{cookbook.title}</h3>
                  <p><strong>Author:</strong> {cookbook.author}</p>
                  <p><strong>Cuisine:</strong> {cookbook.cuisine}</p>
                  <p><strong>Rating:</strong> {'⭐'.repeat(cookbook.rating)}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}