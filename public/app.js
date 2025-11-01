// ============================================================================
// COMPLETE app.js - FORMS DISPLAY AS OVERLAYS WITH FULL VISIBILITY
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
let nextIds = { recipes: 2, sops: 2, techniques: 1, notes: 1, videos: 1, links: 1, media: 1, cookbooks: 1 };
let editingItem = null;

// DASHBOARD
function renderDashboard() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <section class="welcome-section">
      <h2 class="welcome-title">Welcome to Your Kitchen Database</h2>
      <p class="welcome-subtitle">Organize your culinary knowledge, recipes, and techniques in one professional system</p>
      <div class="grid-container">
        <div class="card" onclick="switchView('recipes')"><div class="card-icon">📖</div><h3 class="card-title">Recipes</h3><p class="card-description">Recipe collection with search and filters</p><div class="card-meta">${data.recipes.length} recipes</div></div>
        <div class="card" onclick="switchView('sops')"><div class="card-icon">📋</div><h3 class="card-title">SOPs</h3><p class="card-description">Standard Operating Procedures with compliance tracking</p><div class="card-meta">${data.sops.length} SOPs</div></div>
        <div class="card" onclick="switchView('techniques')"><div class="card-icon">🎯</div><h3 class="card-title">Techniques</h3><p class="card-description">Culinary techniques library</p><div class="card-meta">${data.techniques.length} techniques</div></div>
        <div class="card" onclick="switchView('notes')"><div class="card-icon">📝</div><h3 class="card-title">Notes</h3><p class="card-description">Quick notes and culinary journal</p><div class="card-meta">${data.notes.length} notes</div></div>
        <div class="card" onclick="switchView('videos')"><div class="card-icon">🎬</div><h3 class="card-title">Videos</h3><p class="card-description">Video tutorials and resources</p><div class="card-meta">${data.videos.length} videos</div></div>
        <div class="card" onclick="switchView('links')"><div class="card-icon">🔗</div><h3 class="card-title">Links</h3><p class="card-description">Useful links and references</p><div class="card-meta">${data.links.length} links</div></div>
        <div class="card" onclick="switchView('media')"><div class="card-icon">📁</div><h3 class="card-title">Media</h3><p class="card-description">Photos, images, and documents</p><div class="card-meta">${data.media.length} items</div></div>
        <div class="card" onclick="switchView('cookbooks')"><div class="card-icon">📚</div><h3 class="card-title">Cookbooks</h3><p class="card-description">Your digital cookbook collection</p><div class="card-meta">${data.cookbooks.length} cookbooks</div></div>
      </div>
    </section>
  `;
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  renderCurrentView();
}

function renderCurrentView() {
  const content = document.getElementById('content');
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

// RENDER SECTIONS
function renderRecipes() {
  const content = document.getElementById('content');
  let html = `<div class="section-header"><h2>📖 Recipes</h2><button class="btn-add" onclick="openAddForm('recipe')">+ Add Recipe</button></div>`;
  if (!data.recipes || data.recipes.length === 0) {
    html += `<p class="empty-message">No recipes yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.recipes.forEach(r => {
      html += `<div class="item-card"><h3>${r.title}</h3><p class="meta">${r.cuisine}</p><p class="description">${r.description}</p><div class="card-footer"><button class="btn-edit" onclick="editItem('recipe', ${r.id})">Edit</button><button class="btn-delete" onclick="deleteItem('recipes', ${r.id})">Delete</button></div></div>`;
    });
    html += `</div>`;
  }
  content.innerHTML = html;
}

function renderSOPs() {
  const content = document.getElementById('content');
  let html = `<div class="section-header"><h2>📋 SOPs</h2><button class="btn-add" onclick="openAddForm('sop')">+ Add SOP</button></div>`;
  if (!data.sops || data.sops.length === 0) {
    html += `<p class="empty-message">No SOPs yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.sops.forEach(s => {
      html += `<div class="item-card"><h3>${s.title}</h3><p class="meta">${s.category}</p><p class="description">${s.description}</p><div class="card-footer"><button class="btn-edit" onclick="editItem('sop', ${s.id})">Edit</button><button class="btn-delete" onclick="deleteItem('sops', ${s.id})">Delete</button></div></div>`;
    });
    html += `</div>`;
  }
  content.innerHTML = html;
}

function renderTechniques() {
  const content = document.getElementById('content');
  let html = `<div class="section-header"><h2>🎯 Techniques</h2><button class="btn-add" onclick="openAddForm('technique')">+ Add Technique</button></div>`;
  if (!data.techniques || data.techniques.length === 0) {
    html += `<p class="empty-message">No techniques yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.techniques.forEach(t => {
      html += `<div class="item-card"><h3>${t.title}</h3><p class="meta">${t.category || 'General'}</p><p class="description">${t.description}</p><div class="card-footer"><button class="btn-edit" onclick="editItem('technique', ${t.id})">Edit</button><button class="btn-delete" onclick="deleteItem('techniques', ${t.id})">Delete</button></div></div>`;
    });
    html += `</div>`;
  }
  content.innerHTML = html;
}

function renderNotes() {
  const content = document.getElementById('content');
  let html = `<div class="section-header"><h2>📝 Notes</h2><button class="btn-add" onclick="openAddForm('note')">+ Add Note</button></div>`;
  if (!data.notes || data.notes.length === 0) {
    html += `<p class="empty-message">No notes yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.notes.forEach(n => {
      html += `<div class="item-card"><h3>${n.title || 'Untitled'}</h3><p class="meta">${n.category || 'General'}</p><p class="description">${n.content}</p><div class="card-footer"><button class="btn-edit" onclick="editItem('note', ${n.id})">Edit</button><button class="btn-delete" onclick="deleteItem('notes', ${n.id})">Delete</button></div></div>`;
    });
    html += `</div>`;
  }
  content.innerHTML = html;
}

function renderVideos() {
  const content = document.getElementById('content');
  let html = `<div class="section-header"><h2>🎬 Videos</h2><button class="btn-add" onclick="openAddForm('video')">+ Add Video</button></div>`;
  if (!data.videos || data.videos.length === 0) {
    html += `<p class="empty-message">No videos yet.</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.videos.forEach(v => {
      html += `<div class="item-card"><h3>${v.title}</h3><p class="meta">${v.category}</p><p class="description">${v.description}</p><div class="card-footer"><button class="btn-edit" onclick="editItem('video', ${v.id})">Edit</button><button class="btn-delete" onclick="deleteItem('videos', ${v.id})">Delete</button></div></div>`;
    });
    html += `</div>`;
  }
  content.innerHTML = html;
}

function renderLinks() {
  const content = document.getElementById('content');
  let html = `<div class="section-header"><h2>🔗 Links</h2><button class="btn-add" onclick="openAddForm('link')">+ Add Link</button></div>`;
  if (!data.links || data.links.length === 0) {
    html += `<p class="empty-message">No links yet.</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.links.forEach(l => {
      html += `<div class="item-card"><h3>${l.title}</h3><p class="meta">${l.category}</p><p class="description">${l.description}</p><div class="card-footer"><button class="btn-edit" onclick="editItem('link', ${l.id})">Edit</button><button class="btn-delete" onclick="deleteItem('links', ${l.id})">Delete</button></div></div>`;
    });
    html += `</div>`;
  }
  content.innerHTML = html;
}

function renderMedia() {
  const content = document.getElementById('content');
  let html = `<div class="section-header"><h2>📁 Media</h2><button class="btn-add" onclick="openAddForm('media')">+ Add Media</button></div>`;
  if (!data.media || data.media.length === 0) {
    html += `<p class="empty-message">No media yet.</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.media.forEach(m => {
      html += `<div class="item-card"><h3>${m.filename}</h3><p class="meta">${m.media_type}</p><p class="description">${m.description}</p><div class="card-footer"><button class="btn-edit" onclick="editItem('media', ${m.id})">Edit</button><button class="btn-delete" onclick="deleteItem('media', ${m.id})">Delete</button></div></div>`;
    });
    html += `</div>`;
  }
  content.innerHTML = html;
}

function renderCookbooks() {
  const content = document.getElementById('content');
  let html = `<div class="section-header"><h2>📚 Cookbooks</h2><button class="btn-add" onclick="openAddForm('cookbook')">+ Add Cookbook</button></div>`;
  if (!data.cookbooks || data.cookbooks.length === 0) {
    html += `<p class="empty-message">No cookbooks yet.</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.cookbooks.forEach(c => {
      html += `<div class="item-card"><h3>${c.title}</h3><p class="meta">${c.author}</p><p class="description">${c.description}</p><div class="card-footer"><button class="btn-edit" onclick="editItem('cookbook', ${c.id})">Edit</button><button class="btn-delete" onclick="deleteItem('cookbooks', ${c.id})">Delete</button></div></div>`;
    });
    html += `</div>`;
  }
  content.innerHTML = html;
}

// FORMS - DISPLAY IN OVERLAY
function openAddForm(type) {
  editingItem = null;
  showForm(type);
}

function editItem(type, id) {
  const typeMap = { recipe: 'recipes', sop: 'sops', technique: 'techniques', note: 'notes', video: 'videos', link: 'links', media: 'media', cookbook: 'cookbooks' };
  const actualType = typeMap[type];
  const item = data[actualType].find(i => i.id === id);
  editingItem = { type: actualType, id };
  showForm(type, item);
}

function showForm(type, item = null) {
  const isEdit = item !== null;
  let html = `<div class="form-overlay" id="formOverlay"><div class="form-dialog">`;
  html += `<div class="form-top"><h2>${isEdit ? 'Edit' : 'Add'} ${type.charAt(0).toUpperCase() + type.slice(1)}</h2><button class="form-close" onclick="closeForm()">&times;</button></div>`;
  html += `<form onsubmit="saveItem(event, '${type}')">`;

  if (type === 'recipe') {
    html += `<input type="text" placeholder="Title *" name="title" value="${item?.title || ''}" required>`;
    html += `<input type="text" placeholder="Cuisine" name="cuisine" value="${item?.cuisine || ''}">`;
    html += `<input type="text" placeholder="Difficulty" name="difficulty" value="${item?.difficulty || ''}">`;
    html += `<textarea placeholder="Description" name="description">${item?.description || ''}</textarea>`;
    html += `<textarea placeholder="Ingredients" name="ingredients">${item?.ingredients || ''}</textarea>`;
    html += `<textarea placeholder="Instructions" name="instructions">${item?.instructions || ''}</textarea>`;
  } else if (type === 'sop') {
    html += `<input type="text" placeholder="Title *" name="title" value="${item?.title || ''}" required>`;
    html += `<input type="text" placeholder="Category" name="category" value="${item?.category || ''}">`;
    html += `<input type="text" placeholder="Priority" name="priority" value="${item?.priority || ''}">`;
    html += `<textarea placeholder="Description" name="description">${item?.description || ''}</textarea>`;
    html += `<textarea placeholder="Steps" name="steps">${item?.steps || ''}</textarea>`;
    html += `<textarea placeholder="Compliance Notes" name="compliancenotes">${item?.compliancenotes || ''}</textarea>`;
  } else if (type === 'technique') {
    html += `<input type="text" placeholder="Title *" name="title" value="${item?.title || ''}" required>`;
    html += `<input type="text" placeholder="Category" name="category" value="${item?.category || ''}">`;
    html += `<textarea placeholder="Description" name="description">${item?.description || ''}</textarea>`;
    html += `<textarea placeholder="Steps" name="steps">${item?.steps || ''}</textarea>`;
  } else if (type === 'note') {
    html += `<input type="text" placeholder="Title" name="title" value="${item?.title || ''}">`;
    html += `<input type="text" placeholder="Category" name="category" value="${item?.category || ''}">`;
    html += `<textarea placeholder="Content *" name="content" required>${item?.content || ''}</textarea>`;
  } else if (type === 'video') {
    html += `<input type="text" placeholder="Title *" name="title" value="${item?.title || ''}" required>`;
    html += `<input type="url" placeholder="URL *" name="url" value="${item?.url || ''}" required>`;
    html += `<input type="text" placeholder="Category" name="category" value="${item?.category || ''}">`;
    html += `<textarea placeholder="Description" name="description">${item?.description || ''}</textarea>`;
  } else if (type === 'link') {
    html += `<input type="text" placeholder="Title *" name="title" value="${item?.title || ''}" required>`;
    html += `<input type="url" placeholder="URL *" name="url" value="${item?.url || ''}" required>`;
    html += `<input type="text" placeholder="Category" name="category" value="${item?.category || ''}">`;
    html += `<textarea placeholder="Description" name="description">${item?.description || ''}</textarea>`;
  } else if (type === 'media') {
    html += `<input type="text" placeholder="Filename *" name="filename" value="${item?.filename || ''}" required>`;
    html += `<input type="text" placeholder="Type" name="media_type" value="${item?.media_type || ''}">`;
    html += `<input type="text" placeholder="Category" name="category" value="${item?.category || ''}">`;
    html += `<textarea placeholder="Description" name="description">${item?.description || ''}</textarea>`;
  } else if (type === 'cookbook') {
    html += `<input type="text" placeholder="Title *" name="title" value="${item?.title || ''}" required>`;
    html += `<input type="text" placeholder="Author" name="author" value="${item?.author || ''}">`;
    html += `<input type="text" placeholder="Cuisine" name="cuisine_type" value="${item?.cuisine_type || ''}">`;
    html += `<textarea placeholder="Description" name="description">${item?.description || ''}</textarea>`;
  }

  html += `<div class="form-buttons"><button type="submit" class="btn-save">Save</button><button type="button" class="btn-cancel" onclick="closeForm()">Cancel</button></div>`;
  html += `</form></div></div>`;

  const existing = document.getElementById('formOverlay');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', html);
}

function closeForm() {
  const overlay = document.getElementById('formOverlay');
  if (overlay) overlay.remove();
}

function saveItem(event, type) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const now = new Date().toISOString().split('T')[0];
  const typeMap = { recipe: 'recipes', sop: 'sops', technique: 'techniques', note: 'notes', video: 'videos', link: 'links', media: 'media', cookbook: 'cookbooks' };
  const actualType = typeMap[type];
  const itemData = Object.fromEntries(formData);

  if (editingItem) {
    const index = data[actualType].findIndex(i => i.id === editingItem.id);
    if (index !== -1) data[actualType][index] = { ...data[actualType][index], ...itemData, updatedat: now };
  } else {
    data[actualType].push({ id: nextIds[actualType]++, ...itemData, createdat: now, updatedat: now });
  }

  closeForm();
  renderCurrentView();
}

function deleteItem(section, id) {
  if (confirm('Delete this item?')) {
    data[section] = data[section].filter(i => i.id !== id);
    renderCurrentView();
  }
}

renderDashboard();
window.switchView = switchView;
window.openAddForm = openAddForm;
window.editItem = editItem;
window.saveItem = saveItem;
window.deleteItem = deleteItem;
window.closeForm = closeForm;