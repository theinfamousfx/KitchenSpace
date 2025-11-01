// ============================================================================
// Kitchen Database - Frontend Application
// Updated to fetch from PostgreSQL via Next.js API routes
// ============================================================================

// API Configuration
const API_BASE = '/api';

// Data Storage - Now loads from API instead of hardcoded
let data = {
  recipes: [],
  sops: [],
  techniques: [],
  notes: [],
  resource_videos: [],
  resource_links: [],
  resource_media: [],
  cookbooks: [],
};

// Current view state
let currentView = 'recipes';
let currentEditingId = null;

// ============================================================================
// API Fetch Functions
// ============================================================================

async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    return [];
  }
}

async function postToAPI(endpoint, payload) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to POST to ${endpoint}:`, error);
    return null;
  }
}

async function putToAPI(endpoint, payload) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to PUT to ${endpoint}:`, error);
    return null;
  }
}

async function deleteFromAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to DELETE from ${endpoint}:`, error);
    return null;
  }
}

// ============================================================================
// Data Loading Functions
// ============================================================================

async function loadAllData() {
  console.log('Loading data from API...');
  data.recipes = await fetchFromAPI('/recipes');
  data.sops = await fetchFromAPI('/sops');
  data.techniques = await fetchFromAPI('/techniques');
  data.notes = await fetchFromAPI('/notes');
  data.resource_videos = await fetchFromAPI('/resource-videos');
  data.resource_links = await fetchFromAPI('/resource-links');
  data.resource_media = await fetchFromAPI('/resource-media');
  data.cookbooks = await fetchFromAPI('/cookbooks');
  console.log('Data loaded:', data);
  renderCurrentView();
}

// ============================================================================
// UI Navigation Functions
// ============================================================================

function switchView(view) {
  currentView = view;
  renderCurrentView();
  
  // Update active button
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

function renderCurrentView() {
  const container = document.getElementById('content');
  
  switch(currentView) {
    case 'recipes':
      renderRecipes();
      break;
    case 'sops':
      renderSOPs();
      break;
    case 'techniques':
      renderTechniques();
      break;
    case 'notes':
      renderNotes();
      break;
    case 'videos':
      renderVideos();
      break;
    case 'links':
      renderLinks();
      break;
    case 'media':
      renderMedia();
      break;
    case 'cookbooks':
      renderCookbooks();
      break;
    default:
      renderRecipes();
  }
}

// ============================================================================
// Render Functions for Each Section
// ============================================================================

function renderRecipes() {
  const container = document.getElementById('content');
  if (data.recipes.length === 0) {
    container.innerHTML = '<p class="empty-message">No recipes found. Click "Add Recipe" to create one.</p>';
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Recipes</h2>
      <button class="btn-add" onclick="openRecipeModal()">+ Add Recipe</button>
    </div>
    <div class="items-grid">
      ${data.recipes.map(recipe => `
        <div class="item-card" onclick="editRecipe(${recipe.id})">
          <h3>${recipe.title}</h3>
          <p class="meta">${recipe.cuisine || 'Unknown'} • ${recipe.difficulty_level || 'N/A'}</p>
          <p class="description">${recipe.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${recipe.yield_amount} ${recipe.yield_unit}</span>
            <button class="btn-delete" onclick="deleteRecipe(${recipe.id}, event)">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSOPs() {
  const container = document.getElementById('content');
  if (data.sops.length === 0) {
    container.innerHTML = '<p class="empty-message">No SOPs found. Click "Add SOP" to create one.</p>';
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Standard Operating Procedures</h2>
      <button class="btn-add" onclick="openSOPModal()">+ Add SOP</button>
    </div>
    <div class="items-grid">
      ${data.sops.map(sop => `
        <div class="item-card" onclick="editSOP(${sop.id})">
          <h3>${sop.title}</h3>
          <p class="meta">${sop.category || 'General'} • ${sop.status || 'Active'}</p>
          <p class="description">${sop.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${sop.frequency || 'Regular'}</span>
            <button class="btn-delete" onclick="deleteSOP(${sop.id}, event)">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTechniques() {
  const container = document.getElementById('content');
  if (data.techniques.length === 0) {
    container.innerHTML = '<p class="empty-message">No techniques found. Click "Add Technique" to create one.</p>';
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Techniques</h2>
      <button class="btn-add" onclick="openTechniqueModal()">+ Add Technique</button>
    </div>
    <div class="items-grid">
      ${data.techniques.map(tech => `
        <div class="item-card" onclick="editTechnique(${tech.id})">
          <h3>${tech.title}</h3>
          <p class="meta">${tech.category || 'General'} • ${tech.difficulty_level || 'N/A'}</p>
          <p class="description">${tech.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${tech.estimated_practice_time_hours || 'N/A'} hours</span>
            <button class="btn-delete" onclick="deleteTechnique(${tech.id}, event)">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderNotes() {
  const container = document.getElementById('content');
  if (data.notes.length === 0) {
    container.innerHTML = '<p class="empty-message">No notes found. Click "Add Note" to create one.</p>';
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Notes</h2>
      <button class="btn-add" onclick="openNoteModal()">+ Add Note</button>
    </div>
    <div class="items-grid">
      ${data.notes.map(note => `
        <div class="item-card" onclick="editNote(${note.id})">
          <h3>${note.title || 'Untitled'}</h3>
          <p class="meta">${note.note_type || 'General'} • ${note.category || 'Uncategorized'}</p>
          <p class="description">${note.content || 'No content'}</p>
          <div class="card-footer">
            ${note.is_pinned ? '<span class="badge pinned">📌 Pinned</span>' : ''}
            <button class="btn-delete" onclick="deleteNote(${note.id}, event)">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderVideos() {
  const container = document.getElementById('content');
  if (data.resource_videos.length === 0) {
    container.innerHTML = '<p class="empty-message">No videos found. Click "Add Video" to create one.</p>';
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Video Resources</h2>
      <button class="btn-add" onclick="openVideoModal()">+ Add Video</button>
    </div>
    <div class="items-grid">
      ${data.resource_videos.map(video => `
        <div class="item-card" onclick="editVideo(${video.id})">
          <h3>${video.title}</h3>
          <p class="meta">${video.platform || 'Unknown'} • ${video.channel_name || 'Unknown'}</p>
          <p class="description">${video.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${video.duration_minutes || 'N/A'} min</span>
            <button class="btn-delete" onclick="deleteVideo(${video.id}, event)">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderLinks() {
  const container = document.getElementById('content');
  if (data.resource_links.length === 0) {
    container.innerHTML = '<p class="empty-message">No links found. Click "Add Link" to create one.</p>';
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Resource Links</h2>
      <button class="btn-add" onclick="openLinkModal()">+ Add Link</button>
    </div>
    <div class="items-grid">
      ${data.resource_links.map(link => `
        <div class="item-card" onclick="window.open('${link.url}', '_blank')">
          <h3>${link.title}</h3>
          <p class="meta">${link.source_website || 'Unknown'}</p>
          <p class="description">${link.description || 'No description'}</p>
          <div class="card-footer">
            <button class="btn-delete" onclick="deleteLink(${link.id}, event)">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderMedia() {
  const container = document.getElementById('content');
  if (data.resource_media.length === 0) {
    container.innerHTML = '<p class="empty-message">No media found. Click "Add Media" to create one.</p>';
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Media Files</h2>
      <button class="btn-add" onclick="openMediaModal()">+ Add Media</button>
    </div>
    <div class="items-grid">
      ${data.resource_media.map(media => `
        <div class="item-card" onclick="editMedia(${media.id})">
          <h3>${media.filename}</h3>
          <p class="meta">${media.media_type || 'Unknown'} • ${media.storage_location || 'Unknown'}</p>
          <p class="description">${media.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${media.file_size_kb || 'N/A'} KB</span>
            <button class="btn-delete" onclick="deleteMedia(${media.id}, event)">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderCookbooks() {
  const container = document.getElementById('content');
  if (data.cookbooks.length === 0) {
    container.innerHTML = '<p class="empty-message">No cookbooks found. Click "Add Cookbook" to create one.</p>';
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Cookbooks</h2>
      <button class="btn-add" onclick="openCookbookModal()">+ Add Cookbook</button>
    </div>
    <div class="items-grid">
      ${data.cookbooks.map(book => `
        <div class="item-card" onclick="editCookbook(${book.id})">
          <h3>${book.title}</h3>
          <p class="meta">${book.author || 'Unknown'} • ${book.publication_year || 'N/A'}</p>
          <p class="description">${book.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${book.format || 'Unknown'}</span>
            <button class="btn-delete" onclick="deleteCookbook(${book.id}, event)">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================================
// Modal Functions
// ============================================================================

function openRecipeModal(id = null) {
  currentEditingId = id;
  const recipe = id ? data.recipes.find(r => r.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Recipe' : 'Add Recipe'}</h2>
        <form onsubmit="saveRecipe(event)">
          <input type="text" placeholder="Recipe Title" value="${recipe.title || ''}" required>
          <textarea placeholder="Description">${recipe.description || ''}</textarea>
          <input type="text" placeholder="Cuisine" value="${recipe.cuisine || ''}">
          <input type="text" placeholder="Difficulty Level" value="${recipe.difficulty_level || ''}">
          <input type="number" placeholder="Prep Time (minutes)" value="${recipe.prep_time_minutes || ''}">
          <input type="number" placeholder="Cook Time (minutes)" value="${recipe.cook_time_minutes || ''}">
          <textarea placeholder="Instructions">${recipe.instructions || ''}</textarea>
          <input type="checkbox" id="is_favorite" ${recipe.is_favorite ? 'checked' : ''}>
          <label for="is_favorite">Favorite</label>
          <button type="submit">${id ? 'Update' : 'Create'} Recipe</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function openSOPModal(id = null) {
  currentEditingId = id;
  const sop = id ? data.sops.find(s => s.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit SOP' : 'Add SOP'}</h2>
        <form onsubmit="saveSOP(event)">
          <input type="text" placeholder="SOP Title" value="${sop.title || ''}" required>
          <textarea placeholder="Description">${sop.description || ''}</textarea>
          <input type="text" placeholder="Category" value="${sop.category || ''}">
          <textarea placeholder="Steps">${sop.steps || ''}</textarea>
          <textarea placeholder="Safety Notes">${sop.safety_notes || ''}</textarea>
          <button type="submit">${id ? 'Update' : 'Create'} SOP</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function openTechniqueModal(id = null) {
  currentEditingId = id;
  const tech = id ? data.techniques.find(t => t.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Technique' : 'Add Technique'}</h2>
        <form onsubmit="saveTechnique(event)">
          <input type="text" placeholder="Technique Title" value="${tech.title || ''}" required>
          <textarea placeholder="Description">${tech.description || ''}</textarea>
          <input type="text" placeholder="Category" value="${tech.category || ''}">
          <input type="text" placeholder="Difficulty Level" value="${tech.difficulty_level || ''}">
          <textarea placeholder="Step by Step">${tech.step_by_step || ''}</textarea>
          <textarea placeholder="Common Mistakes">${tech.common_mistakes || ''}</textarea>
          <button type="submit">${id ? 'Update' : 'Create'} Technique</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function openNoteModal(id = null) {
  currentEditingId = id;
  const note = id ? data.notes.find(n => n.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Note' : 'Add Note'}</h2>
        <form onsubmit="saveNote(event)">
          <input type="text" placeholder="Note Title" value="${note.title || ''}">
          <textarea placeholder="Content" required>${note.content || ''}</textarea>
          <input type="text" placeholder="Category" value="${note.category || ''}">
          <input type="checkbox" id="is_pinned" ${note.is_pinned ? 'checked' : ''}>
          <label for="is_pinned">Pin this note</label>
          <button type="submit">${id ? 'Update' : 'Create'} Note</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function openVideoModal(id = null) {
  currentEditingId = id;
  const video = id ? data.resource_videos.find(v => v.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Video' : 'Add Video'}</h2>
        <form onsubmit="saveVideo(event)">
          <input type="text" placeholder="Video Title" value="${video.title || ''}" required>
          <input type="url" placeholder="Video URL" value="${video.url || ''}" required>
          <input type="text" placeholder="Platform (YouTube, Vimeo, etc)" value="${video.platform || ''}">
          <input type="text" placeholder="Channel Name" value="${video.channel_name || ''}">
          <textarea placeholder="Description">${video.description || ''}</textarea>
          <button type="submit">${id ? 'Update' : 'Create'} Video</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function openLinkModal(id = null) {
  currentEditingId = id;
  const link = id ? data.resource_links.find(l => l.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Link' : 'Add Link'}</h2>
        <form onsubmit="saveLink(event)">
          <input type="text" placeholder="Link Title" value="${link.title || ''}" required>
          <input type="url" placeholder="URL" value="${link.url || ''}" required>
          <textarea placeholder="Description">${link.description || ''}</textarea>
          <input type="text" placeholder="Website" value="${link.source_website || ''}">
          <button type="submit">${id ? 'Update' : 'Create'} Link</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function openMediaModal(id = null) {
  currentEditingId = id;
  const media = id ? data.resource_media.find(m => m.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Media' : 'Add Media'}</h2>
        <form onsubmit="saveMedia(event)">
          <input type="text" placeholder="Filename" value="${media.filename || ''}" required>
          <input type="text" placeholder="Media Type" value="${media.media_type || ''}">
          <textarea placeholder="Description">${media.description || ''}</textarea>
          <button type="submit">${id ? 'Update' : 'Create'} Media</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function openCookbookModal(id = null) {
  currentEditingId = id;
  const book = id ? data.cookbooks.find(b => b.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Cookbook' : 'Add Cookbook'}</h2>
        <form onsubmit="saveCookbook(event)">
          <input type="text" placeholder="Cookbook Title" value="${book.title || ''}" required>
          <input type="text" placeholder="Author" value="${book.author || ''}">
          <input type="text" placeholder="ISBN" value="${book.isbn || ''}">
          <input type="number" placeholder="Publication Year" value="${book.publication_year || ''}">
          <textarea placeholder="Description">${book.description || ''}</textarea>
          <input type="text" placeholder="Cuisine Type" value="${book.cuisine_type || ''}">
          <button type="submit">${id ? 'Update' : 'Create'} Cookbook</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function closeModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.querySelector('.modal-overlay');
  if (modal) modal.remove();
}

// ============================================================================
// Save Functions - Submit to API
// ============================================================================

async function saveRecipe(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const recipe = {
    title: form.querySelector('input[placeholder="Recipe Title"]').value,
    description: form.querySelector('textarea[placeholder="Description"]').value,
    cuisine: form.querySelector('input[placeholder="Cuisine"]').value,
    difficulty_level: form.querySelector('input[placeholder="Difficulty Level"]').value,
    prep_time_minutes: parseInt(form.querySelector('input[placeholder="Prep Time (minutes)"]').value) || 0,
    cook_time_minutes: parseInt(form.querySelector('input[placeholder="Cook Time (minutes)"]').value) || 0,
    instructions: form.querySelector('textarea[placeholder="Instructions"]').value,
    is_favorite: form.querySelector('#is_favorite').checked,
  };

  if (currentEditingId) {
    recipe.id = currentEditingId;
    await putToAPI(`/recipes`, recipe);
  } else {
    await postToAPI(`/recipes`, recipe);
  }

  closeModal();
  await loadAllData();
}

async function saveSOP(event) {
  event.preventDefault();
  const form = event.target;
  
  const sop = {
    title: form.querySelector('input[placeholder="SOP Title"]').value,
    description: form.querySelector('textarea[placeholder="Description"]').value,
    category: form.querySelector('input[placeholder="Category"]').value,
    steps: form.querySelector('textarea[placeholder="Steps"]').value,
    safety_notes: form.querySelector('textarea[placeholder="Safety Notes"]').value,
  };

  if (currentEditingId) {
    sop.id = currentEditingId;
    await putToAPI(`/sops`, sop);
  } else {
    await postToAPI(`/sops`, sop);
  }

  closeModal();
  await loadAllData();
}

async function saveTechnique(event) {
  event.preventDefault();
  const form = event.target;
  
  const technique = {
    title: form.querySelector('input[placeholder="Technique Title"]').value,
    description: form.querySelector('textarea[placeholder="Description"]').value,
    category: form.querySelector('input[placeholder="Category"]').value,
    difficulty_level: form.querySelector('input[placeholder="Difficulty Level"]').value,
    step_by_step: form.querySelector('textarea[placeholder="Step by Step"]').value,
    common_mistakes: form.querySelector('textarea[placeholder="Common Mistakes"]').value,
  };

  if (currentEditingId) {
    technique.id = currentEditingId;
    await putToAPI(`/techniques`, technique);
  } else {
    await postToAPI(`/techniques`, technique);
  }

  closeModal();
  await loadAllData();
}

async function saveNote(event) {
  event.preventDefault();
  const form = event.target;
  
  const note = {
    title: form.querySelector('input[placeholder="Note Title"]').value,
    content: form.querySelector('textarea[placeholder="Content"]').value,
    category: form.querySelector('input[placeholder="Category"]').value,
    is_pinned: form.querySelector('#is_pinned').checked,
  };

  if (currentEditingId) {
    note.id = currentEditingId;
    await putToAPI(`/notes`, note);
  } else {
    await postToAPI(`/notes`, note);
  }

  closeModal();
  await loadAllData();
}

async function saveVideo(event) {
  event.preventDefault();
  const form = event.target;
  
  const video = {
    title: form.querySelector('input[placeholder="Video Title"]').value,
    url: form.querySelector('input[placeholder="Video URL"]').value,
    platform: form.querySelector('input[placeholder="Platform (YouTube, Vimeo, etc)"]').value,
    channel_name: form.querySelector('input[placeholder="Channel Name"]').value,
    description: form.querySelector('textarea[placeholder="Description"]').value,
  };

  if (currentEditingId) {
    video.id = currentEditingId;
    await putToAPI(`/resource-videos`, video);
  } else {
    await postToAPI(`/resource-videos`, video);
  }

  closeModal();
  await loadAllData();
}

async function saveLink(event) {
  event.preventDefault();
  const form = event.target;
  
  const link = {
    title: form.querySelector('input[placeholder="Link Title"]').value,
    url: form.querySelector('input[placeholder="URL"]').value,
    description: form.querySelector('textarea[placeholder="Description"]').value,
    source_website: form.querySelector('input[placeholder="Website"]').value,
  };

  if (currentEditingId) {
    link.id = currentEditingId;
    await putToAPI(`/resource-links`, link);
  } else {
    await postToAPI(`/resource-links`, link);
  }

  closeModal();
  await loadAllData();
}

async function saveMedia(event) {
  event.preventDefault();
  const form = event.target;
  
  const media = {
    filename: form.querySelector('input[placeholder="Filename"]').value,
    media_type: form.querySelector('input[placeholder="Media Type"]').value,
    description: form.querySelector('textarea[placeholder="Description"]').value,
  };

  if (currentEditingId) {
    media.id = currentEditingId;
    await putToAPI(`/resource-media`, media);
  } else {
    await postToAPI(`/resource-media`, media);
  }

  closeModal();
  await loadAllData();
}

async function saveCookbook(event) {
  event.preventDefault();
  const form = event.target;
  
  const cookbook = {
    title: form.querySelector('input[placeholder="Cookbook Title"]').value,
    author: form.querySelector('input[placeholder="Author"]').value,
    isbn: form.querySelector('input[placeholder="ISBN"]').value,
    publication_year: parseInt(form.querySelector('input[placeholder="Publication Year"]').value) || null,
    description: form.querySelector('textarea[placeholder="Description"]').value,
    cuisine_type: form.querySelector('input[placeholder="Cuisine Type"]').value,
  };

  if (currentEditingId) {
    cookbook.id = currentEditingId;
    await putToAPI(`/cookbooks`, cookbook);
  } else {
    await postToAPI(`/cookbooks`, cookbook);
  }

  closeModal();
  await loadAllData();
}

// ============================================================================
// Delete Functions
// ============================================================================

async function deleteRecipe(id, event) {
  event.stopPropagation();
  if (confirm('Delete this recipe?')) {
    await deleteFromAPI(`/recipes?id=${id}`);
    await loadAllData();
  }
}

async function deleteSOP(id, event) {
  event.stopPropagation();
  if (confirm('Delete this SOP?')) {
    await deleteFromAPI(`/sops?id=${id}`);
    await loadAllData();
  }
}

async function deleteTechnique(id, event) {
  event.stopPropagation();
  if (confirm('Delete this technique?')) {
    await deleteFromAPI(`/techniques?id=${id}`);
    await loadAllData();
  }
}

async function deleteNote(id, event) {
  event.stopPropagation();
  if (confirm('Delete this note?')) {
    await deleteFromAPI(`/notes?id=${id}`);
    await loadAllData();
  }
}

async function deleteVideo(id, event) {
  event.stopPropagation();
  if (confirm('Delete this video?')) {
    await deleteFromAPI(`/resource-videos?id=${id}`);
    await loadAllData();
  }
}

async function deleteLink(id, event) {
  event.stopPropagation();
  if (confirm('Delete this link?')) {
    await deleteFromAPI(`/resource-links?id=${id}`);
    await loadAllData();
  }
}

async function deleteMedia(id, event) {
  event.stopPropagation();
  if (confirm('Delete this media?')) {
    await deleteFromAPI(`/resource-media?id=${id}`);
    await loadAllData();
  }
}

async function deleteCookbook(id, event) {
  event.stopPropagation();
  if (confirm('Delete this cookbook?')) {
    await deleteFromAPI(`/cookbooks?id=${id}`);
    await loadAllData();
  }
}

// ============================================================================
// Edit Functions
// ============================================================================

function editRecipe(id) {
  openRecipeModal(id);
}

function editSOP(id) {
  openSOPModal(id);
}

function editTechnique(id) {
  openTechniqueModal(id);
}

function editNote(id) {
  openNoteModal(id);
}

function editVideo(id) {
  openVideoModal(id);
}

function editMedia(id) {
  openMediaModal(id);
}

function editCookbook(id) {
  openCookbookModal(id);
}

// ============================================================================
// Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized. Loading data...');
  loadAllData();
});
