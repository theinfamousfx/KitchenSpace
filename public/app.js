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
// Data Loading
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
  renderCurrentView();
}

// ============================================================================
// Navigation
// ============================================================================

function switchView(view) {
  currentView = view;
  renderCurrentView();
  
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

function renderCurrentView() {
  const container = document.getElementById('content');
  if (!container) return;
  
  switch(currentView) {
    case 'recipes': renderRecipes(); break;
    case 'sops': renderSOPs(); break;
    case 'techniques': renderTechniques(); break;
    case 'notes': renderNotes(); break;
    case 'videos': renderVideos(); break;
    case 'links': renderLinks(); break;
    case 'media': renderMedia(); break;
    case 'cookbooks': renderCookbooks(); break;
    default: renderRecipes();
  }
}

// ============================================================================
// Render Functions - RECIPES
// ============================================================================

function renderRecipes() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.recipes.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Recipes</h2>
        <button class="btn-add" onclick="openRecipeModal()">+ Add Recipe</button>
      </div>
      <p class="empty-message">No recipes found. Click "Add Recipe" to create one.</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Recipes</h2>
      <button class="btn-add" onclick="openRecipeModal()">+ Add Recipe</button>
    </div>
    <div class="items-grid">
      ${data.recipes.map(recipe => `
        <div class="item-card">
          <h3>${recipe.title || 'Untitled'}</h3>
          <p class="meta">
            ${recipe.cuisine || 'Unknown'} • 
            ${recipe.category || 'Uncategorized'} • 
            ${recipe.difficulty_level || 'N/A'}
          </p>
          <p class="description">${recipe.description || 'No description'}</p>
          
          ${recipe.yield_amount ? `<p style="font-size: 13px; color: #7a8a99; margin: 8px 0;"><strong>Yields:</strong> ${recipe.yield_amount} ${recipe.yield_unit || 'servings'}</p>` : ''}
          
          ${recipe.prep_time_minutes || recipe.cook_time_minutes ? `
            <p style="font-size: 13px; color: #7a8a99; margin: 8px 0;">
              <strong>Time:</strong> 
              ${recipe.prep_time_minutes ? `Prep ${recipe.prep_time_minutes}min` : ''} 
              ${recipe.cook_time_minutes ? `Cook ${recipe.cook_time_minutes}min` : ''}
            </p>
          ` : ''}
          
          ${recipe.tags && recipe.tags.length > 0 ? `
            <div style="margin: 12px 0; display: flex; flex-wrap: wrap; gap: 6px;">
              ${recipe.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
            </div>
          ` : ''}
          
          <div class="card-footer">
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editRecipe(${recipe.id})">Edit</button>
              <button class="btn-delete" onclick="deleteRecipe(${recipe.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================================
// Render Functions - SOPs (ENHANCED)
// ============================================================================

function renderSOPs() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.sops.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Standard Operating Procedures</h2>
        <button class="btn-add" onclick="openSOPModal()">+ Add SOP</button>
      </div>
      <p class="empty-message">No SOPs found. Click "Add SOP" to create one.</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Standard Operating Procedures</h2>
      <button class="btn-add" onclick="openSOPModal()">+ Add SOP</button>
    </div>
    <div class="items-grid">
      ${data.sops.map(sop => `
        <div class="item-card">
          <h3>${sop.title_page || 'Untitled SOP'}</h3>
          <p class="meta">Standard Operating Procedure</p>
          <p class="description">${sop.purpose || 'No purpose defined'}</p>
          
          ${sop.scope ? `<p style="font-size: 13px; color: #7a8a99; margin: 8px 0;"><strong>Scope:</strong> ${sop.scope.substring(0, 80)}${sop.scope.length > 80 ? '...' : ''}</p>` : ''}
          
          ${sop.equipment ? `<p style="font-size: 13px; color: #7a8a99; margin: 8px 0;"><strong>Equipment Listed:</strong> Yes</p>` : ''}
          
          <div class="card-footer">
            <span class="badge">SOP</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editSOP(${sop.id})">Edit</button>
              <button class="btn-delete" onclick="deleteSOP(${sop.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================================
// Render Functions - OTHER SECTIONS
// ============================================================================

function renderTechniques() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.techniques.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Techniques</h2>
        <button class="btn-add" onclick="openTechniqueModal()">+ Add Technique</button>
      </div>
      <p class="empty-message">No techniques found. Click "Add Technique" to create one.</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Techniques</h2>
      <button class="btn-add" onclick="openTechniqueModal()">+ Add Technique</button>
    </div>
    <div class="items-grid">
      ${data.techniques.map(tech => `
        <div class="item-card">
          <h3>${tech.title || 'Untitled'}</h3>
          <p class="meta">${tech.category || 'General'} • ${tech.difficulty_level || 'N/A'}</p>
          <p class="description">${tech.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${tech.estimated_practice_time_hours || 'N/A'} hours</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editTechnique(${tech.id})">Edit</button>
              <button class="btn-delete" onclick="deleteTechnique(${tech.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderNotes() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.notes.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Notes</h2>
        <button class="btn-add" onclick="openNoteModal()">+ Add Note</button>
      </div>
      <p class="empty-message">No notes found. Click "Add Note" to create one.</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Notes</h2>
      <button class="btn-add" onclick="openNoteModal()">+ Add Note</button>
    </div>
    <div class="items-grid">
      ${data.notes.map(note => `
        <div class="item-card">
          <h3>${note.title || 'Untitled'}</h3>
          <p class="meta">${note.note_type || 'General'} • ${note.category || 'Uncategorized'}</p>
          <p class="description">${note.content || 'No content'}</p>
          <div class="card-footer">
            <span class="badge">${note.is_pinned ? '📌 Pinned' : 'Note'}</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editNote(${note.id})">Edit</button>
              <button class="btn-delete" onclick="deleteNote(${note.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderVideos() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.resource_videos.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Video Resources</h2>
        <button class="btn-add" onclick="openVideoModal()">+ Add Video</button>
      </div>
      <p class="empty-message">No videos found. Click "Add Video" to create one.</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Video Resources</h2>
      <button class="btn-add" onclick="openVideoModal()">+ Add Video</button>
    </div>
    <div class="items-grid">
      ${data.resource_videos.map(video => `
        <div class="item-card">
          <h3>${video.title || 'Untitled'}</h3>
          <p class="meta">${video.platform || 'Unknown'} • ${video.channel_name || 'Unknown'}</p>
          <p class="description">${video.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${video.duration_minutes || 'N/A'} min</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editVideo(${video.id})">Edit</button>
              <button class="btn-delete" onclick="deleteVideo(${video.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderLinks() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.resource_links.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Resource Links</h2>
        <button class="btn-add" onclick="openLinkModal()">+ Add Link</button>
      </div>
      <p class="empty-message">No links found. Click "Add Link" to create one.</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Resource Links</h2>
      <button class="btn-add" onclick="openLinkModal()">+ Add Link</button>
    </div>
    <div class="items-grid">
      ${data.resource_links.map(link => `
        <div class="item-card">
          <h3>${link.title || 'Untitled'}</h3>
          <p class="meta">${link.source_website || 'Unknown'}</p>
          <p class="description">${link.description || 'No description'}</p>
          <div class="card-footer">
            <a href="${link.url}" target="_blank" class="badge" style="text-decoration: none;">Open ↗</a>
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editLink(${link.id})">Edit</button>
              <button class="btn-delete" onclick="deleteLink(${link.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderMedia() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.resource_media.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Media Files</h2>
        <button class="btn-add" onclick="openMediaModal()">+ Add Media</button>
      </div>
      <p class="empty-message">No media found. Click "Add Media" to create one.</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Media Files</h2>
      <button class="btn-add" onclick="openMediaModal()">+ Add Media</button>
    </div>
    <div class="items-grid">
      ${data.resource_media.map(media => `
        <div class="item-card">
          <h3>${media.filename || 'Untitled'}</h3>
          <p class="meta">${media.media_type || 'Unknown'}</p>
          <p class="description">${media.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${media.file_size_kb || 'N/A'} KB</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editMedia(${media.id})">Edit</button>
              <button class="btn-delete" onclick="deleteMedia(${media.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderCookbooks() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.cookbooks.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Cookbooks</h2>
        <button class="btn-add" onclick="openCookbookModal()">+ Add Cookbook</button>
      </div>
      <p class="empty-message">No cookbooks found. Click "Add Cookbook" to create one.</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Cookbooks</h2>
      <button class="btn-add" onclick="openCookbookModal()">+ Add Cookbook</button>
    </div>
    <div class="items-grid">
      ${data.cookbooks.map(book => `
        <div class="item-card">
          <h3>${book.title || 'Untitled'}</h3>
          <p class="meta">${book.author || 'Unknown'} • ${book.publication_year || 'N/A'}</p>
          <p class="description">${book.description || 'No description'}</p>
          <div class="card-footer">
            <span class="badge">${book.format || 'Unknown'}</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editCookbook(${book.id})">Edit</button>
              <button class="btn-delete" onclick="deleteCookbook(${book.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================================
// Modal Functions - RECIPES
// ============================================================================

function openRecipeModal(id = null) {
  currentEditingId = id;
  const recipe = id ? data.recipes.find(r => r.id === id) : {};
  const tagsDisplay = recipe.tags && Array.isArray(recipe.tags) ? recipe.tags.join(', ') : (recipe.tags || '');
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal modal-large" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Recipe' : 'Add Recipe'}</h2>
        <form onsubmit="saveRecipe(event)">
          <div class="form-row">
            <input type="text" placeholder="Recipe Title *" value="${recipe.title || ''}" required>
            <input type="text" placeholder="Cuisine (Italian, Asian, French)" value="${recipe.cuisine || ''}">
          </div>

          <div class="form-row">
            <input type="text" placeholder="Category (Soups, Pasta, Desserts)" value="${recipe.category || ''}">
            <select>
              <option value="">Select Difficulty</option>
              <option value="Beginner" ${recipe.difficulty_level === 'Beginner' ? 'selected' : ''}>Beginner</option>
              <option value="Intermediate" ${recipe.difficulty_level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
              <option value="Advanced" ${recipe.difficulty_level === 'Advanced' ? 'selected' : ''}>Advanced</option>
            </select>
          </div>

          <textarea placeholder="Description" style="min-height: 80px;">${recipe.description || ''}</textarea>

          <div class="form-row">
            <input type="number" placeholder="Yield Amount" value="${recipe.yield_amount || ''}" min="1">
            <input type="text" placeholder="Unit (Servings, Portions)" value="${recipe.yield_unit || ''}">
          </div>

          <div class="form-row">
            <input type="number" placeholder="Prep Time (minutes)" value="${recipe.prep_time_minutes || ''}" min="0">
            <input type="number" placeholder="Cook Time (minutes)" value="${recipe.cook_time_minutes || ''}" min="0">
          </div>

          <textarea placeholder="Ingredients (one per line)" style="min-height: 120px;">${recipe.ingredients || ''}</textarea>

          <textarea placeholder="Method / Instructions (step by step)" style="min-height: 120px;">${recipe.instructions || ''}</textarea>

          <textarea placeholder="Serving Suggestions" style="min-height: 100px;">${recipe.serving_suggestions || ''}</textarea>

          <textarea placeholder="Tags (comma-separated: Classic, Indian-Inspired, Vegetarian)" style="min-height: 80px;">${tagsDisplay}</textarea>

          <textarea placeholder="Notes (Tips, substitutions, storage)" style="min-height: 100px;">${recipe.notes || ''}</textarea>

          <button type="submit" style="margin-top: 20px;">${id ? 'Update' : 'Create'} Recipe</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

// ============================================================================
// Modal Functions - SOPs (ENHANCED WITH 7 FIELDS)
// ============================================================================

function openSOPModal(id = null) {
  currentEditingId = id;
  const sop = id ? data.sops.find(s => s.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal modal-large" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit SOP' : 'Add SOP'}</h2>
        <form onsubmit="saveSOP(event)">
          <input type="text" placeholder="Title Page / SOP Title *" value="${sop.title_page || ''}" required>
          
          <textarea placeholder="Purpose (Why this SOP exists and what it accomplishes)" style="min-height: 100px;">${sop.purpose || ''}</textarea>
          
          <textarea placeholder="Scope (Who, what, where, when this SOP applies to)" style="min-height: 100px;">${sop.scope || ''}</textarea>
          
          <textarea placeholder="Definitions and Terminology (Abbreviations, technical terms, key definitions)" style="min-height: 100px;">${sop.definitions_terminology || ''}</textarea>
          
          <textarea placeholder="Equipment (Tools, materials, and equipment needed)" style="min-height: 100px;">${sop.equipment || ''}</textarea>
          
          <textarea placeholder="Procedure Steps - Main Actions (Detailed step-by-step procedures)" style="min-height: 150px;">${sop.procedure_steps || ''}</textarea>
          
          <textarea placeholder="Notes and Clarifications (Important notes, tips, warnings)" style="min-height: 100px;">${sop.notes_clarifications || ''}</textarea>
          
          <textarea placeholder="Related Documents & References (Links to other docs, appendices)" style="min-height: 100px;">${sop.related_documents_references || ''}</textarea>
          
          <button type="submit" style="margin-top: 20px;">${id ? 'Update' : 'Create'} SOP</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

// ============================================================================
// Modal Functions - OTHER SECTIONS
// ============================================================================

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
          <select>
            <option value="">Select Difficulty</option>
            <option value="Beginner" ${tech.difficulty_level === 'Beginner' ? 'selected' : ''}>Beginner</option>
            <option value="Intermediate" ${tech.difficulty_level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
            <option value="Advanced" ${tech.difficulty_level === 'Advanced' ? 'selected' : ''}>Advanced</option>
          </select>
          <textarea placeholder="Step by Step">${tech.step_by_step || ''}</textarea>
          <textarea placeholder="Common Mistakes">${tech.common_mistakes || ''}</textarea>
          <textarea placeholder="Best Practices">${tech.best_practices || ''}</textarea>
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
          <input type="text" placeholder="Platform (YouTube, Vimeo)" value="${video.platform || ''}">
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
          <select>
            <option value="">Select Media Type</option>
            <option value="Image" ${media.media_type === 'Image' ? 'selected' : ''}>Image</option>
            <option value="PDF" ${media.media_type === 'PDF' ? 'selected' : ''}>PDF</option>
            <option value="Document" ${media.media_type === 'Document' ? 'selected' : ''}>Document</option>
            <option value="Video" ${media.media_type === 'Video' ? 'selected' : ''}>Video</option>
          </select>
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
// Save Functions - RECIPES
// ============================================================================

async function saveRecipe(event) {
  event.preventDefault();
  const form = event.target;
  const inputs = form.querySelectorAll('input, textarea, select');
  
  const tagsString = inputs[11].value;
  const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
  
  const recipe = {
    title: inputs[0].value,
    cuisine: inputs[1].value,
    category: inputs[2].value,
    difficulty_level: inputs[3].value,
    description: inputs[4].value,
    yield_amount: parseInt(inputs[5].value) || null,
    yield_unit: inputs[6].value,
    prep_time_minutes: parseInt(inputs[7].value) || 0,
    cook_time_minutes: parseInt(inputs[8].value) || 0,
    ingredients: inputs[9].value,
    instructions: inputs[10].value,
    serving_suggestions: inputs[12].value,
    tags: tags,
    notes: inputs[13].value,
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

// ============================================================================
// Save Functions - SOPs (ENHANCED WITH 7 FIELDS)
// ============================================================================

async function saveSOP(event) {
  event.preventDefault();
  const form = event.target;
  const inputs = form.querySelectorAll('input, textarea');
  
  const sop = {
    title_page: inputs[0].value,
    purpose: inputs[1].value,
    scope: inputs[2].value,
    definitions_terminology: inputs[3].value,
    equipment: inputs[4].value,
    procedure_steps: inputs[5].value,
    notes_clarifications: inputs[6].value,
    related_documents_references: inputs[7].value,
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

// ============================================================================
// Save Functions - OTHER SECTIONS
// ============================================================================

async function saveTechnique(event) {
  event.preventDefault();
  const form = event.target;
  const inputs = form.querySelectorAll('input, textarea, select');
  
  const technique = {
    title: inputs[0].value,
    description: inputs[1].value,
    category: inputs[2].value,
    difficulty_level: inputs[3].value,
    step_by_step: inputs[4].value,
    common_mistakes: inputs[5].value,
    best_practices: inputs[6].value,
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
  const inputs = form.querySelectorAll('input, textarea');
  
  const note = {
    title: inputs[0].value,
    content: inputs[1].value,
    category: inputs[2].value,
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
  const inputs = form.querySelectorAll('input, textarea');
  
  const video = {
    title: inputs[0].value,
    url: inputs[1].value,
    platform: inputs[2].value,
    channel_name: inputs[3].value,
    description: inputs[4].value,
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
  const inputs = form.querySelectorAll('input, textarea');
  
  const link = {
    title: inputs[0].value,
    url: inputs[1].value,
    description: inputs[2].value,
    source_website: inputs[3].value,
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
  const inputs = form.querySelectorAll('input, textarea, select');
  
  const media = {
    filename: inputs[0].value,
    media_type: inputs[1].value,
    description: inputs[2].value,
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
  const inputs = form.querySelectorAll('input, textarea');
  
  const cookbook = {
    title: inputs[0].value,
    author: inputs[1].value,
    isbn: inputs[2].value,
    publication_year: parseInt(inputs[3].value) || null,
    description: inputs[4].value,
    cuisine_type: inputs[5].value,
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

async function deleteRecipe(id) {
  if (confirm('Delete this recipe?')) {
    await deleteFromAPI(`/recipes?id=${id}`);
    await loadAllData();
  }
}

async function deleteSOP(id) {
  if (confirm('Delete this SOP?')) {
    await deleteFromAPI(`/sops?id=${id}`);
    await loadAllData();
  }
}

async function deleteTechnique(id) {
  if (confirm('Delete this technique?')) {
    await deleteFromAPI(`/techniques?id=${id}`);
    await loadAllData();
  }
}

async function deleteNote(id) {
  if (confirm('Delete this note?')) {
    await deleteFromAPI(`/notes?id=${id}`);
    await loadAllData();
  }
}

async function deleteVideo(id) {
  if (confirm('Delete this video?')) {
    await deleteFromAPI(`/resource-videos?id=${id}`);
    await loadAllData();
  }
}

async function deleteLink(id) {
  if (confirm('Delete this link?')) {
    await deleteFromAPI(`/resource-links?id=${id}`);
    await loadAllData();
  }
}

async function deleteMedia(id) {
  if (confirm('Delete this media?')) {
    await deleteFromAPI(`/resource-media?id=${id}`);
    await loadAllData();
  }
}

async function deleteCookbook(id) {
  if (confirm('Delete this cookbook?')) {
    await deleteFromAPI(`/cookbooks?id=${id}`);
    await loadAllData();
  }
}

// ============================================================================
// Edit Functions
// ============================================================================

function editRecipe(id) { openRecipeModal(id); }
function editSOP(id) { openSOPModal(id); }
function editTechnique(id) { openTechniqueModal(id); }
function editNote(id) { openNoteModal(id); }
function editVideo(id) { openVideoModal(id); }
function editLink(id) { openLinkModal(id); }
function editMedia(id) { openMediaModal(id); }
function editCookbook(id) { openCookbookModal(id); }

// ============================================================================
// Make functions global
// ============================================================================

window.switchView = switchView;
window.openRecipeModal = openRecipeModal;
window.openSOPModal = openSOPModal;
window.openTechniqueModal = openTechniqueModal;
window.openNoteModal = openNoteModal;
window.openVideoModal = openVideoModal;
window.openLinkModal = openLinkModal;
window.openMediaModal = openMediaModal;
window.openCookbookModal = openCookbookModal;
window.closeModal = closeModal;
window.editRecipe = editRecipe;
window.editSOP = editSOP;
window.editTechnique = editTechnique;
window.editNote = editNote;
window.editVideo = editVideo;
window.editLink = editLink;
window.editMedia = editMedia;
window.editCookbook = editCookbook;
window.deleteRecipe = deleteRecipe;
window.deleteSOP = deleteSOP;
window.deleteTechnique = deleteTechnique;
window.deleteNote = deleteNote;
window.deleteVideo = deleteVideo;
window.deleteLink = deleteLink;
window.deleteMedia = deleteMedia;
window.deleteCookbook = deleteCookbook;
window.saveRecipe = saveRecipe;
window.saveSOP = saveSOP;
window.saveTechnique = saveTechnique;
window.saveNote = saveNote;
window.saveVideo = saveVideo;
window.saveLink = saveLink;
window.saveMedia = saveMedia;
window.saveCookbook = saveCookbook;

// ============================================================================
// Initialize
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Kitchen Database App v3 Loaded');
  loadAllData();
});