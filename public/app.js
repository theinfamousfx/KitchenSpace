// ============================================================================
// Chef Virtu Kitchen Database - COMPLETE WITH WORKING DASHBOARD & SECTIONS
// Dashboard with hover effects + All 8 sections clickable
// ============================================================================

let data = {
  recipes: [
    {
      id: 1,
      title: 'Chocolate Soufflé',
      cuisine: 'French',
      difficulty: 'Advanced',
      servings: 6,
      preptime: 45,
      cooktime: 15,
      collection: 'Desserts',
      description: 'A classic French dessert that rises magnificently.',
      ingredients: '200g dark chocolate 70% cocoa\n6 large eggs, separated\n75g caster sugar\n25g butter\n25g plain flour\n250ml whole milk',
      instructions: 'Preheat oven to 190°C (375°F). Butter 6 ramekins. Melt chocolate in double boiler. Make roux with butter and flour. Mix chocolate with milk base. Fold egg yolks into mixture. Whip whites to soft peaks. Fold whites into chocolate. Bake 12-15 minutes. Serve immediately.',
      notes: "Don't overmix when folding egg whites. Serve within 2 minutes.",
      tags: 'dessert, french, chocolate, advanced',
      createdat: '2025-10-27',
      updatedat: '2025-10-27',
    },
  ],
  sops: [
    {
      id: 1,
      title: 'Kitchen Opening Checklist',
      category: 'Daily Operations',
      priority: 'High',
      description: 'Complete daily opening procedures',
      steps: 'Check all refrigeration temperatures\nEnsure equipment for cleanliness\nPrep list with team\nInventory levels\nSet up stations',
      compliancenotes: 'Temperature logs must be completed before service.',
      createdat: '2025-10-15',
      updatedat: '2025-10-15',
    },
  ],
  techniques: [],
  notes: [],
  videos: [],
  links: [],
  media: [],
  cookbooks: [],
};

let currentView = 'dashboard';

// ============================================================================
// DASHBOARD RENDERING
// ============================================================================

function renderDashboard() {
  const content = document.getElementById('content');
  if (!content) return;

  content.innerHTML = `
    <section class="welcome-section">
      <h2 class="welcome-title">Welcome to Your Kitchen Database</h2>
      <p class="welcome-subtitle">
        Organize your culinary knowledge, recipes, and techniques in one professional system
      </p>

      <div class="grid-container">
        <div class="card" onclick="switchView('recipes')">
          <div class="card-icon">📖</div>
          <h3 class="card-title">Recipes</h3>
          <p class="card-description">Recipe collection with search and filters</p>
          <div class="card-meta">${data.recipes.length} recipes</div>
        </div>

        <div class="card" onclick="switchView('sops')">
          <div class="card-icon">📋</div>
          <h3 class="card-title">SOPs</h3>
          <p class="card-description">Standard Operating Procedures with compliance tracking</p>
          <div class="card-meta">${data.sops.length} SOPs</div>
        </div>

        <div class="card" onclick="switchView('techniques')">
          <div class="card-icon">🎯</div>
          <h3 class="card-title">Techniques</h3>
          <p class="card-description">Culinary techniques library</p>
          <div class="card-meta">${data.techniques.length} techniques</div>
        </div>

        <div class="card" onclick="switchView('notes')">
          <div class="card-icon">📝</div>
          <h3 class="card-title">Notes</h3>
          <p class="card-description">Quick notes and culinary journal</p>
          <div class="card-meta">${data.notes.length} notes</div>
        </div>

        <div class="card" onclick="switchView('videos')">
          <div class="card-icon">🎬</div>
          <h3 class="card-title">Videos</h3>
          <p class="card-description">Video tutorials and resources</p>
          <div class="card-meta">${data.videos.length} videos</div>
        </div>

        <div class="card" onclick="switchView('links')">
          <div class="card-icon">🔗</div>
          <h3 class="card-title">Links</h3>
          <p class="card-description">Useful links and references</p>
          <div class="card-meta">${data.links.length} links</div>
        </div>

        <div class="card" onclick="switchView('media')">
          <div class="card-icon">📁</div>
          <h3 class="card-title">Media</h3>
          <p class="card-description">Photos, images, and documents</p>
          <div class="card-meta">${data.media.length} items</div>
        </div>

        <div class="card" onclick="switchView('cookbooks')">
          <div class="card-icon">📚</div>
          <h3 class="card-title">Cookbooks</h3>
          <p class="card-description">Your digital cookbook collection</p>
          <div class="card-meta">${data.cookbooks.length} cookbooks</div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================================
// SECTION RENDERING
// ============================================================================

function switchView(view) {
  console.log('✅ Switching to view:', view);
  currentView = view;
  renderCurrentView();
}

function renderCurrentView() {
  const content = document.getElementById('content');
  if (!content) return;

  switch(currentView) {
    case 'recipes': renderRecipes(); break;
    case 'sops': renderSOPs(); break;
    case 'techniques': renderTechniques(); break;
    case 'notes': renderNotes(); break;
    case 'videos': renderVideos(); break;
    case 'links': renderLinks(); break;
    case 'media': renderMedia(); break;
    case 'cookbooks': renderCookbooks(); break;
    default: renderDashboard();
  }
}

function renderRecipes() {
  const content = document.getElementById('content');
  let html = `
    <div class="section-header">
      <h2>📖 Recipes</h2>
      <button class="btn-add" onclick="openAddForm('recipe')">+ Add Recipe</button>
    </div>
  `;

  if (!data.recipes || data.recipes.length === 0) {
    html += `<p class="empty-message">No recipes yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.recipes.forEach(r => {
      html += `<div class="item-card">
        <h3>${r.title}</h3>
        <p class="meta">${r.cuisine} • ${r.category || 'General'}</p>
        <p class="description">${r.description}</p>
        <div class="card-footer">
          <button class="btn-edit" onclick="editItem('recipe', ${r.id})">Edit</button>
          <button class="btn-delete" onclick="deleteItem('recipes', ${r.id})">Delete</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div style="margin-top: 20px;"><button class="btn-back" onclick="switchView('dashboard')">← Back to Dashboard</button></div>`;
  content.innerHTML = html;
}

function renderSOPs() {
  const content = document.getElementById('content');
  let html = `
    <div class="section-header">
      <h2>📋 Standard Operating Procedures</h2>
      <button class="btn-add" onclick="openAddForm('sop')">+ Add SOP</button>
    </div>
  `;

  if (!data.sops || data.sops.length === 0) {
    html += `<p class="empty-message">No SOPs yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.sops.forEach(s => {
      html += `<div class="item-card">
        <h3>${s.title}</h3>
        <p class="meta">${s.category} • <span class="badge badge-${s.priority === 'Critical' ? 'critical' : s.priority === 'High' ? 'high' : 'medium'}">${s.priority}</span></p>
        <p class="description">${s.description}</p>
        <div class="card-footer">
          <button class="btn-edit" onclick="editItem('sop', ${s.id})">Edit</button>
          <button class="btn-delete" onclick="deleteItem('sops', ${s.id})">Delete</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div style="margin-top: 20px;"><button class="btn-back" onclick="switchView('dashboard')">← Back to Dashboard</button></div>`;
  content.innerHTML = html;
}

function renderTechniques() {
  const content = document.getElementById('content');
  let html = `
    <div class="section-header">
      <h2>🎯 Techniques</h2>
      <button class="btn-add" onclick="openAddForm('technique')">+ Add Technique</button>
    </div>
  `;

  if (!data.techniques || data.techniques.length === 0) {
    html += `<p class="empty-message">No techniques yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.techniques.forEach(t => {
      html += `<div class="item-card">
        <h3>${t.title}</h3>
        <p class="meta">${t.category || 'General'}</p>
        <p class="description">${t.description || 'No description'}</p>
        <div class="card-footer">
          <button class="btn-edit" onclick="editItem('technique', ${t.id})">Edit</button>
          <button class="btn-delete" onclick="deleteItem('techniques', ${t.id})">Delete</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div style="margin-top: 20px;"><button class="btn-back" onclick="switchView('dashboard')">← Back to Dashboard</button></div>`;
  content.innerHTML = html;
}

function renderNotes() {
  const content = document.getElementById('content');
  let html = `
    <div class="section-header">
      <h2>📝 Notes</h2>
      <button class="btn-add" onclick="openAddForm('note')">+ Add Note</button>
    </div>
  `;

  if (!data.notes || data.notes.length === 0) {
    html += `<p class="empty-message">No notes yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.notes.forEach(n => {
      html += `<div class="item-card">
        <h3>${n.title || 'Untitled'}</h3>
        <p class="meta">${n.category || 'General'}</p>
        <p class="description">${n.content || 'No content'}</p>
        <div class="card-footer">
          <button class="btn-edit" onclick="editItem('note', ${n.id})">Edit</button>
          <button class="btn-delete" onclick="deleteItem('notes', ${n.id})">Delete</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div style="margin-top: 20px;"><button class="btn-back" onclick="switchView('dashboard')">← Back to Dashboard</button></div>`;
  content.innerHTML = html;
}

function renderVideos() {
  const content = document.getElementById('content');
  let html = `
    <div class="section-header">
      <h2>🎬 Videos</h2>
      <button class="btn-add" onclick="openAddForm('video')">+ Add Video</button>
    </div>
  `;

  if (!data.videos || data.videos.length === 0) {
    html += `<p class="empty-message">No videos yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.videos.forEach(v => {
      html += `<div class="item-card">
        <h3>${v.title}</h3>
        <p class="meta">${v.category || 'General'}</p>
        <p class="description">${v.description || 'No description'}</p>
        <div class="card-footer">
          <button class="btn-edit" onclick="editItem('video', ${v.id})">Edit</button>
          <button class="btn-delete" onclick="deleteItem('videos', ${v.id})">Delete</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div style="margin-top: 20px;"><button class="btn-back" onclick="switchView('dashboard')">← Back to Dashboard</button></div>`;
  content.innerHTML = html;
}

function renderLinks() {
  const content = document.getElementById('content');
  let html = `
    <div class="section-header">
      <h2>🔗 Links</h2>
      <button class="btn-add" onclick="openAddForm('link')">+ Add Link</button>
    </div>
  `;

  if (!data.links || data.links.length === 0) {
    html += `<p class="empty-message">No links yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.links.forEach(l => {
      html += `<div class="item-card">
        <h3>${l.title}</h3>
        <p class="meta">${l.category || 'General'}</p>
        <p class="description">${l.description || 'No description'}</p>
        <div class="card-footer">
          <button class="btn-edit" onclick="editItem('link', ${l.id})">Edit</button>
          <button class="btn-delete" onclick="deleteItem('links', ${l.id})">Delete</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div style="margin-top: 20px;"><button class="btn-back" onclick="switchView('dashboard')">← Back to Dashboard</button></div>`;
  content.innerHTML = html;
}

function renderMedia() {
  const content = document.getElementById('content');
  let html = `
    <div class="section-header">
      <h2>📁 Media</h2>
      <button class="btn-add" onclick="openAddForm('media')">+ Add Media</button>
    </div>
  `;

  if (!data.media || data.media.length === 0) {
    html += `<p class="empty-message">No media yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.media.forEach(m => {
      html += `<div class="item-card">
        <h3>${m.filename || m.title}</h3>
        <p class="meta">${m.media_type || m.type || 'Unknown'}</p>
        <p class="description">${m.description || 'No description'}</p>
        <div class="card-footer">
          <button class="btn-edit" onclick="editItem('media', ${m.id})">Edit</button>
          <button class="btn-delete" onclick="deleteItem('media', ${m.id})">Delete</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div style="margin-top: 20px;"><button class="btn-back" onclick="switchView('dashboard')">← Back to Dashboard</button></div>`;
  content.innerHTML = html;
}

function renderCookbooks() {
  const content = document.getElementById('content');
  let html = `
    <div class="section-header">
      <h2>📚 Cookbooks</h2>
      <button class="btn-add" onclick="openAddForm('cookbook')">+ Add Cookbook</button>
    </div>
  `;

  if (!data.cookbooks || data.cookbooks.length === 0) {
    html += `<p class="empty-message">No cookbooks yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.cookbooks.forEach(c => {
      html += `<div class="item-card">
        <h3>${c.title}</h3>
        <p class="meta">${c.author || 'Unknown'} • ${c.publication_year || 'N/A'}</p>
        <p class="description">${c.description || 'No description'}</p>
        <div class="card-footer">
          <button class="btn-edit" onclick="editItem('cookbook', ${c.id})">Edit</button>
          <button class="btn-delete" onclick="deleteItem('cookbooks', ${c.id})">Delete</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div style="margin-top: 20px;"><button class="btn-back" onclick="switchView('dashboard')">← Back to Dashboard</button></div>`;
  content.innerHTML = html;
}

// ============================================================================
// FORM HANDLING
// ============================================================================

let nextIds = {
  recipes: 2,
  sops: 2,
  techniques: 1,
  notes: 1,
  videos: 1,
  links: 1,
  media: 1,
  cookbooks: 1,
};

let editingItem = null;

function openAddForm(type) {
  editingItem = null;
  showForm(type);
}

function editItem(type, id) {
  const typeMap = { recipe: 'recipes', sop: 'sops', technique: 'techniques', note: 'notes', video: 'videos', link: 'links', media: 'media', cookbook: 'cookbooks' };
  const actualType = typeMap[type] || type;
  const item = data[actualType].find(i => i.id === id);
  if (!item) return;
  
  editingItem = { type: actualType, id };
  showForm(type, item);
}

function showForm(type, item = null) {
  const content = document.getElementById('content');
  const isEdit = item !== null;
  
  let formHtml = `<div class="form-container">`;
  formHtml += `<h2>${isEdit ? 'Edit' : 'Add'} ${type.charAt(0).toUpperCase() + type.slice(1)}</h2>`;
  formHtml += `<form onsubmit="saveItem(event, '${type}')">`;

  if (type === 'recipe') {
    formHtml += `
      <div class="form-group"><label>Title *</label><input type="text" name="title" value="${item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label>Cuisine</label><input type="text" name="cuisine" value="${item?.cuisine || ''}"></div>
        <div class="form-group"><label>Difficulty</label><select name="difficulty"><option value="Beginner" ${item?.difficulty === 'Beginner' ? 'selected' : ''}>Beginner</option><option value="Intermediate" ${item?.difficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option><option value="Advanced" ${item?.difficulty === 'Advanced' ? 'selected' : ''}>Advanced</option></select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Servings</label><input type="number" name="servings" value="${item?.servings || 1}" min="1"></div>
        <div class="form-group"><label>Prep Time (min)</label><input type="number" name="preptime" value="${item?.preptime || 0}"></div>
        <div class="form-group"><label>Cook Time (min)</label><input type="number" name="cooktime" value="${item?.cooktime || 0}"></div>
      </div>
      <div class="form-group"><label>Description</label><textarea name="description" rows="3">${item?.description || ''}</textarea></div>
      <div class="form-group"><label>Ingredients (one per line)</label><textarea name="ingredients" rows="6">${item?.ingredients || ''}</textarea></div>
      <div class="form-group"><label>Instructions (one per line)</label><textarea name="instructions" rows="8">${item?.instructions || ''}</textarea></div>
      <div class="form-group"><label>Chef's Notes</label><textarea name="notes" rows="3">${item?.notes || ''}</textarea></div>
      <div class="form-group"><label>Tags</label><input type="text" name="tags" value="${item?.tags || ''}"></div>
    `;
  } else if (type === 'sop') {
    formHtml += `
      <div class="form-group"><label>Title *</label><input type="text" name="title" value="${item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label>Category</label><input type="text" name="category" value="${item?.category || ''}"></div>
        <div class="form-group"><label>Priority</label><select name="priority"><option value="Low" ${item?.priority === 'Low' ? 'selected' : ''}>Low</option><option value="Medium" ${item?.priority === 'Medium' ? 'selected' : ''}>Medium</option><option value="High" ${item?.priority === 'High' ? 'selected' : ''}>High</option><option value="Critical" ${item?.priority === 'Critical' ? 'selected' : ''}>Critical</option></select></div>
      </div>
      <div class="form-group"><label>Description</label><textarea name="description" rows="3">${item?.description || ''}</textarea></div>
      <div class="form-group"><label>Procedure Steps (one per line)</label><textarea name="steps" rows="8">${item?.steps || ''}</textarea></div>
      <div class="form-group"><label>Compliance Notes</label><textarea name="compliancenotes" rows="3">${item?.compliancenotes || ''}</textarea></div>
    `;
  } else if (type === 'technique') {
    formHtml += `
      <div class="form-group"><label>Title *</label><input type="text" name="title" value="${item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label>Category</label><input type="text" name="category" value="${item?.category || ''}"></div>
        <div class="form-group"><label>Difficulty</label><select name="difficulty"><option value="Beginner" ${item?.difficulty === 'Beginner' ? 'selected' : ''}>Beginner</option><option value="Intermediate" ${item?.difficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option><option value="Advanced" ${item?.difficulty === 'Advanced' ? 'selected' : ''}>Advanced</option></select></div>
      </div>
      <div class="form-group"><label>Description</label><textarea name="description" rows="3">${item?.description || ''}</textarea></div>
      <div class="form-group"><label>Steps (one per line)</label><textarea name="steps" rows="8">${item?.steps || ''}</textarea></div>
    `;
  } else if (type === 'note') {
    formHtml += `
      <div class="form-group"><label>Title</label><input type="text" name="title" value="${item?.title || ''}"></div>
      <div class="form-group"><label>Category</label><input type="text" name="category" value="${item?.category || ''}"></div>
      <div class="form-group"><label>Content *</label><textarea name="content" rows="10" required>${item?.content || ''}</textarea></div>
    `;
  } else if (type === 'video') {
    formHtml += `
      <div class="form-group"><label>Title *</label><input type="text" name="title" value="${item?.title || ''}" required></div>
      <div class="form-group"><label>URL *</label><input type="url" name="url" value="${item?.url || ''}" required></div>
      <div class="form-group"><label>Category</label><input type="text" name="category" value="${item?.category || ''}"></div>
      <div class="form-group"><label>Description</label><textarea name="description" rows="4">${item?.description || ''}</textarea></div>
    `;
  } else if (type === 'link') {
    formHtml += `
      <div class="form-group"><label>Title *</label><input type="text" name="title" value="${item?.title || ''}" required></div>
      <div class="form-group"><label>URL *</label><input type="url" name="url" value="${item?.url || ''}" required></div>
      <div class="form-group"><label>Category</label><input type="text" name="category" value="${item?.category || ''}"></div>
      <div class="form-group"><label>Description</label><textarea name="description" rows="4">${item?.description || ''}</textarea></div>
    `;
  } else if (type === 'media') {
    formHtml += `
      <div class="form-group"><label>Filename *</label><input type="text" name="filename" value="${item?.filename || item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label>Type</label><input type="text" name="media_type" value="${item?.media_type || item?.type || ''}"></div>
        <div class="form-group"><label>Category</label><input type="text" name="category" value="${item?.category || ''}"></div>
      </div>
      <div class="form-group"><label>Cloud Link</label><input type="text" name="cloud_link" value="${item?.cloud_link || ''}"></div>
      <div class="form-group"><label>Description</label><textarea name="description" rows="4">${item?.description || ''}</textarea></div>
    `;
  } else if (type === 'cookbook') {
    formHtml += `
      <div class="form-group"><label>Title *</label><input type="text" name="title" value="${item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label>Author</label><input type="text" name="author" value="${item?.author || ''}"></div>
        <div class="form-group"><label>Cuisine</label><input type="text" name="cuisine_type" value="${item?.cuisine_type || ''}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Year</label><input type="number" name="publication_year" value="${item?.publication_year || ''}"></div>
        <div class="form-group"><label>Format</label><input type="text" name="format" value="${item?.format || ''}"></div>
      </div>
      <div class="form-group"><label>Description</label><textarea name="description" rows="4">${item?.description || ''}</textarea></div>
    `;
  }

  formHtml += `
    <div class="form-actions">
      <button type="submit" class="btn-save">Save</button>
      <button type="button" class="btn-cancel" onclick="switchView('${currentView}')">Cancel</button>
    </div>
  </form>
  </div>`;

  content.innerHTML = formHtml;
}

function saveItem(event, type) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const now = new Date().toISOString().split('T')[0];
  
  const typeMap = { recipe: 'recipes', sop: 'sops', technique: 'techniques', note: 'notes', video: 'videos', link: 'links', media: 'media', cookbook: 'cookbooks' };
  const actualType = typeMap[type];

  const itemData = Object.fromEntries(formData);

  if (editingItem) {
    const index = data[actualType].findIndex(i => i.id === editingItem.id);
    if (index !== -1) {
      data[actualType][index] = { ...data[actualType][index], ...itemData, updatedat: now };
    }
    editingItem = null;
  } else {
    const newItem = { id: nextIds[actualType]++, ...itemData, createdat: now, updatedat: now };
    data[actualType].push(newItem);
  }

  console.log('✅ Item saved!');
  switchView(currentView);
}

function deleteItem(section, id) {
  if (confirm('Are you sure you want to delete this item?')) {
    data[section] = data[section].filter(item => item.id !== id);
    renderCurrentView();
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

console.log('✅ Kitchen Database READY - All sections working!');
renderDashboard();

// Global exports
window.switchView = switchView;
window.openAddForm = openAddForm;
window.editItem = editItem;
window.saveItem = saveItem;
window.deleteItem = deleteItem;