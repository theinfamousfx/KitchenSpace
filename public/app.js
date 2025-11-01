// ============================================================================
// Kitchen Database - MOCK VERSION (No Database Needed)
// This version works WITHOUT a database connection
// ============================================================================

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

let currentView = 'recipes';
let currentEditingId = null;

// ============================================================================
// Cloud Drive Utilities
// ============================================================================

function convertGoogleDriveShareLink(shareLink) {
  try {
    const fileIdMatch = shareLink.match(/\/d\/([\w-]+)\//);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return shareLink;
  } catch {
    return shareLink;
  }
}

function isValidCloudLink(url) {
  if (!url) return true;
  const onedriveDomains = ['1drv.ms', 'onedrive.live.com', 'sharepoint.com'];
  const googleDomains = ['drive.google.com', 'docs.google.com'];
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    return onedriveDomains.concat(googleDomains).some(domain => hostname.includes(domain));
  } catch {
    return false;
  }
}

// ============================================================================
// Navigation & Rendering
// ============================================================================

function switchView(view) {
  console.log('✅ Switching to view:', view);
  currentView = view;
  renderCurrentView();
}

function renderCurrentView() {
  console.log('✅ Rendering view:', currentView);
  
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
// Render Functions
// ============================================================================

function renderRecipes() {
  const container = document.getElementById('content');
  if (!container) return;

  let html = `<div class="section-header"><h2>Recipes</h2><button class="btn-add" onclick="openRecipeModal()">+ Add Recipe</button></div>`;
  
  if (!data.recipes || data.recipes.length === 0) {
    html += `<p class="empty-message">No recipes yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.recipes.forEach(r => {
      html += `<div class="item-card">
        <h3>${r.title || 'Untitled'}</h3>
        <p class="meta">${r.cuisine || 'Unknown'} • ${r.category || 'General'}</p>
        <p class="description">${r.description || 'No description'}</p>
        <div class="card-footer">
          <div style="display: flex; gap: 8px;">
            <button class="btn-edit" onclick="editRecipe(${r.id})">Edit</button>
            <button class="btn-delete" onclick="deleteRecipe(${r.id})">Delete</button>
          </div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  
  container.innerHTML = html;
}

function renderSOPs() {
  const container = document.getElementById('content');
  if (!container) return;

  let html = `<div class="section-header"><h2>Standard Operating Procedures</h2><button class="btn-add" onclick="openSOPModal()">+ Add SOP</button></div>`;
  
  if (!data.sops || data.sops.length === 0) {
    html += `<p class="empty-message">No SOPs yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.sops.forEach(s => {
      html += `<div class="item-card">
        <h3>${s.title_page || 'Untitled SOP'}</h3>
        <p class="description">${s.purpose || 'No purpose defined'}</p>
        <div class="card-footer">
          <div style="display: flex; gap: 8px;">
            <button class="btn-edit" onclick="editSOP(${s.id})">Edit</button>
            <button class="btn-delete" onclick="deleteSOP(${s.id})">Delete</button>
          </div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  
  container.innerHTML = html;
}

function renderTechniques() {
  const container = document.getElementById('content');
  if (!container) return;

  let html = `<div class="section-header"><h2>Techniques</h2><button class="btn-add" onclick="openTechniqueModal()">+ Add Technique</button></div>`;
  
  if (!data.techniques || data.techniques.length === 0) {
    html += `<p class="empty-message">No techniques yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.techniques.forEach(t => {
      html += `<div class="item-card">
        <h3>${t.title || 'Untitled'}</h3>
        <p class="meta">${t.category || 'General'}</p>
        <p class="description">${t.description || 'No description'}</p>
        <div class="card-footer">
          <div style="display: flex; gap: 8px;">
            <button class="btn-edit" onclick="editTechnique(${t.id})">Edit</button>
            <button class="btn-delete" onclick="deleteTechnique(${t.id})">Delete</button>
          </div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  
  container.innerHTML = html;
}

function renderNotes() {
  const container = document.getElementById('content');
  if (!container) return;

  let html = `<div class="section-header"><h2>Notes</h2><button class="btn-add" onclick="openNoteModal()">+ Add Note</button></div>`;
  
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
          <div style="display: flex; gap: 8px;">
            <button class="btn-edit" onclick="editNote(${n.id})">Edit</button>
            <button class="btn-delete" onclick="deleteNote(${n.id})">Delete</button>
          </div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  
  container.innerHTML = html;
}

function renderVideos() {
  const container = document.getElementById('content');
  if (!container) return;

  let html = `<div class="section-header"><h2>Videos</h2><button class="btn-add" onclick="openVideoModal()">+ Add Video</button></div>`;
  
  if (!data.resource_videos || data.resource_videos.length === 0) {
    html += `<p class="empty-message">No videos yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.resource_videos.forEach(v => {
      html += `<div class="item-card">
        <h3>${v.title || 'Untitled'}</h3>
        <p class="meta">${v.platform || 'Unknown'}</p>
        <p class="description">${v.description || 'No description'}</p>
        <div class="card-footer">
          <div style="display: flex; gap: 8px;">
            <button class="btn-edit" onclick="editVideo(${v.id})">Edit</button>
            <button class="btn-delete" onclick="deleteVideo(${v.id})">Delete</button>
          </div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  
  container.innerHTML = html;
}

function renderLinks() {
  const container = document.getElementById('content');
  if (!container) return;

  let html = `<div class="section-header"><h2>Links</h2><button class="btn-add" onclick="openLinkModal()">+ Add Link</button></div>`;
  
  if (!data.resource_links || data.resource_links.length === 0) {
    html += `<p class="empty-message">No links yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.resource_links.forEach(l => {
      html += `<div class="item-card">
        <h3>${l.title || 'Untitled'}</h3>
        <p class="meta">${l.source_website || 'Unknown'}</p>
        <p class="description">${l.description || 'No description'}</p>
        <div class="card-footer">
          <a href="${l.url}" target="_blank" class="badge" style="text-decoration: none;">Open ↗</a>
          <div style="display: flex; gap: 8px;">
            <button class="btn-edit" onclick="editLink(${l.id})">Edit</button>
            <button class="btn-delete" onclick="deleteLink(${l.id})">Delete</button>
          </div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  
  container.innerHTML = html;
}

function renderMedia() {
  const container = document.getElementById('content');
  if (!container) return;

  let html = `<div class="section-header"><h2>Media & Cloud Documents</h2><button class="btn-add" onclick="openMediaModal()">+ Add Media</button></div>`;
  
  if (!data.resource_media || data.resource_media.length === 0) {
    html += `<p class="empty-message">No media yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.resource_media.forEach(m => {
      html += `<div class="item-card">
        <h3>${m.filename || 'Untitled'}</h3>
        <p class="meta">${m.media_type || 'Unknown'} ${m.cloud_link ? '☁️' : ''}</p>
        <p class="description">${m.description || 'No description'}</p>
        <div class="card-footer">
          ${m.cloud_link ? `<a href="${m.cloud_link.includes('drive.google.com') ? convertGoogleDriveShareLink(m.cloud_link) : m.cloud_link}" target="_blank" class="badge" style="text-decoration: none; background: #4285f4;">Open ☁️</a>` : `<span class="badge">${m.file_size_kb || 'N/A'} KB</span>`}
          <div style="display: flex; gap: 8px;">
            <button class="btn-edit" onclick="editMedia(${m.id})">Edit</button>
            <button class="btn-delete" onclick="deleteMedia(${m.id})">Delete</button>
          </div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  
  container.innerHTML = html;
}

function renderCookbooks() {
  const container = document.getElementById('content');
  if (!container) return;

  let html = `<div class="section-header"><h2>Cookbooks & eBooks</h2><button class="btn-add" onclick="openCookbookModal()">+ Add Cookbook</button></div>`;
  
  if (!data.cookbooks || data.cookbooks.length === 0) {
    html += `<p class="empty-message">No cookbooks yet. Click the button to add one!</p>`;
  } else {
    html += `<div class="items-grid">`;
    data.cookbooks.forEach(c => {
      html += `<div class="item-card">
        <h3>${c.title || 'Untitled'}</h3>
        <p class="meta">${c.author || 'Unknown'} • ${c.publication_year || 'N/A'}</p>
        <p class="description">${c.description || 'No description'}</p>
        ${c.google_drive_link || c.onedrive_link ? `<div style="margin: 12px 0; display: flex; flex-wrap: wrap; gap: 8px;">
          ${c.google_drive_link ? `<a href="${convertGoogleDriveShareLink(c.google_drive_link)}" target="_blank" style="display: inline-block; padding: 5px 12px; background: #4285f4; color: white; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: 600;">Google Drive</a>` : ''}
          ${c.onedrive_link ? `<a href="${c.onedrive_link}" target="_blank" style="display: inline-block; padding: 5px 12px; background: #0078d4; color: white; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: 600;">OneDrive</a>` : ''}
        </div>` : ''}
        <div class="card-footer">
          <span class="badge">${c.format || 'Unknown'}</span>
          <div style="display: flex; gap: 8px;">
            <button class="btn-edit" onclick="editCookbook(${c.id})">Edit</button>
            <button class="btn-delete" onclick="deleteCookbook(${c.id})">Delete</button>
          </div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  
  container.innerHTML = html;
}

// ============================================================================
// MODALS
// ============================================================================

function openRecipeModal(id = null) {
  currentEditingId = id;
  const recipe = id ? data.recipes.find(r => r.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal modal-large" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Recipe' : 'Add Recipe'}</h2>
        <form onsubmit="saveRecipe(event)">
          <input type="text" placeholder="Recipe Title *" value="${recipe.title || ''}" required>
          <input type="text" placeholder="Cuisine" value="${recipe.cuisine || ''}">
          <input type="text" placeholder="Category" value="${recipe.category || ''}">
          <textarea placeholder="Description">${recipe.description || ''}</textarea>
          <textarea placeholder="Ingredients">${recipe.ingredients || ''}</textarea>
          <textarea placeholder="Instructions">${recipe.instructions || ''}</textarea>
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
      <div class="modal modal-large" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit SOP' : 'Add SOP'}</h2>
        <form onsubmit="saveSOP(event)">
          <input type="text" placeholder="Title *" value="${sop.title_page || ''}" required>
          <textarea placeholder="Purpose">${sop.purpose || ''}</textarea>
          <textarea placeholder="Scope">${sop.scope || ''}</textarea>
          <textarea placeholder="Procedure Steps">${sop.procedure_steps || ''}</textarea>
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
          <input type="text" placeholder="Title *" value="${tech.title || ''}" required>
          <textarea placeholder="Description">${tech.description || ''}</textarea>
          <textarea placeholder="Step by Step">${tech.step_by_step || ''}</textarea>
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
          <textarea placeholder="Content *" required>${note.content || ''}</textarea>
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
          <input type="text" placeholder="Title *" value="${video.title || ''}" required>
          <input type="url" placeholder="URL *" value="${video.url || ''}" required>
          <input type="text" placeholder="Platform" value="${video.platform || ''}">
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
          <input type="text" placeholder="Title *" value="${link.title || ''}" required>
          <input type="url" placeholder="URL *" value="${link.url || ''}" required>
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
      <div class="modal modal-large" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Media' : 'Add Media'}</h2>
        <form onsubmit="saveMedia(event)">
          <input type="text" placeholder="Filename *" value="${media.filename || ''}" required>
          <input type="url" placeholder="Cloud Link (Google Drive or OneDrive)" value="${media.cloud_link || ''}">
          <select>
            <option value="">Select Media Type</option>
            <option value="PDF" ${media.media_type === 'PDF' ? 'selected' : ''}>PDF</option>
            <option value="EPUB" ${media.media_type === 'EPUB' ? 'selected' : ''}>EPUB</option>
            <option value="Image" ${media.media_type === 'Image' ? 'selected' : ''}>Image</option>
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
      <div class="modal modal-large" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Cookbook' : 'Add Cookbook'}</h2>
        <form onsubmit="saveCookbook(event)">
          <input type="text" placeholder="Title *" value="${book.title || ''}" required>
          <input type="text" placeholder="Author" value="${book.author || ''}">
          <input type="number" placeholder="Year" value="${book.publication_year || ''}">
          <input type="text" placeholder="Cuisine" value="${book.cuisine_type || ''}">
          <textarea placeholder="Description">${book.description || ''}</textarea>
          <input type="url" placeholder="Google Drive Link" value="${book.google_drive_link || ''}">
          <input type="url" placeholder="OneDrive Link" value="${book.onedrive_link || ''}">
          <input type="text" placeholder="Format (PDF, EPUB, etc)" value="${book.format || ''}">
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
// SAVE FUNCTIONS (Store in Memory Only)
// ============================================================================

function saveRecipe(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, textarea');
  const recipe = {
    id: currentEditingId || Date.now(),
    title: inputs[0].value,
    cuisine: inputs[1].value,
    category: inputs[2].value,
    description: inputs[3].value,
    ingredients: inputs[4].value,
    instructions: inputs[5].value,
  };
  
  if (currentEditingId) {
    const idx = data.recipes.findIndex(r => r.id === currentEditingId);
    if (idx !== -1) data.recipes[idx] = recipe;
  } else {
    data.recipes.push(recipe);
  }
  
  console.log('✅ Recipe saved:', recipe);
  closeModal();
  renderRecipes();
}

function saveSOP(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, textarea');
  const sop = {
    id: currentEditingId || Date.now(),
    title_page: inputs[0].value,
    purpose: inputs[1].value,
    scope: inputs[2].value,
    procedure_steps: inputs[3].value,
  };
  
  if (currentEditingId) {
    const idx = data.sops.findIndex(s => s.id === currentEditingId);
    if (idx !== -1) data.sops[idx] = sop;
  } else {
    data.sops.push(sop);
  }
  
  console.log('✅ SOP saved:', sop);
  closeModal();
  renderSOPs();
}

function saveTechnique(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, textarea');
  const technique = {
    id: currentEditingId || Date.now(),
    title: inputs[0].value,
    description: inputs[1].value,
    step_by_step: inputs[2].value,
  };
  
  if (currentEditingId) {
    const idx = data.techniques.findIndex(t => t.id === currentEditingId);
    if (idx !== -1) data.techniques[idx] = technique;
  } else {
    data.techniques.push(technique);
  }
  
  console.log('✅ Technique saved:', technique);
  closeModal();
  renderTechniques();
}

function saveNote(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, textarea');
  const note = {
    id: currentEditingId || Date.now(),
    title: inputs[0].value,
    content: inputs[1].value,
    category: inputs[2].value,
  };
  
  if (currentEditingId) {
    const idx = data.notes.findIndex(n => n.id === currentEditingId);
    if (idx !== -1) data.notes[idx] = note;
  } else {
    data.notes.push(note);
  }
  
  console.log('✅ Note saved:', note);
  closeModal();
  renderNotes();
}

function saveVideo(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, textarea');
  const video = {
    id: currentEditingId || Date.now(),
    title: inputs[0].value,
    url: inputs[1].value,
    platform: inputs[2].value,
    description: inputs[3].value,
  };
  
  if (currentEditingId) {
    const idx = data.resource_videos.findIndex(v => v.id === currentEditingId);
    if (idx !== -1) data.resource_videos[idx] = video;
  } else {
    data.resource_videos.push(video);
  }
  
  console.log('✅ Video saved:', video);
  closeModal();
  renderVideos();
}

function saveLink(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, textarea');
  const link = {
    id: currentEditingId || Date.now(),
    title: inputs[0].value,
    url: inputs[1].value,
    description: inputs[2].value,
    source_website: inputs[3].value,
  };
  
  if (currentEditingId) {
    const idx = data.resource_links.findIndex(l => l.id === currentEditingId);
    if (idx !== -1) data.resource_links[idx] = link;
  } else {
    data.resource_links.push(link);
  }
  
  console.log('✅ Link saved:', link);
  closeModal();
  renderLinks();
}

function saveMedia(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, select, textarea');
  const media = {
    id: currentEditingId || Date.now(),
    filename: inputs[0].value,
    cloud_link: inputs[1].value,
    media_type: inputs[2].value,
    description: inputs[3].value,
  };
  
  if (currentEditingId) {
    const idx = data.resource_media.findIndex(m => m.id === currentEditingId);
    if (idx !== -1) data.resource_media[idx] = media;
  } else {
    data.resource_media.push(media);
  }
  
  console.log('✅ Media saved:', media);
  closeModal();
  renderMedia();
}

function saveCookbook(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, textarea');
  const cookbook = {
    id: currentEditingId || Date.now(),
    title: inputs[0].value,
    author: inputs[1].value,
    publication_year: parseInt(inputs[2].value) || null,
    cuisine_type: inputs[3].value,
    description: inputs[4].value,
    google_drive_link: inputs[5].value,
    onedrive_link: inputs[6].value,
    format: inputs[7].value,
  };
  
  if (currentEditingId) {
    const idx = data.cookbooks.findIndex(b => b.id === currentEditingId);
    if (idx !== -1) data.cookbooks[idx] = cookbook;
  } else {
    data.cookbooks.push(cookbook);
  }
  
  console.log('✅ Cookbook saved:', cookbook);
  closeModal();
  renderCookbooks();
}

// ============================================================================
// DELETE & EDIT
// ============================================================================

function deleteRecipe(id) { if (confirm('Delete?')) { data.recipes = data.recipes.filter(r => r.id !== id); renderRecipes(); } }
function deleteSOP(id) { if (confirm('Delete?')) { data.sops = data.sops.filter(s => s.id !== id); renderSOPs(); } }
function deleteTechnique(id) { if (confirm('Delete?')) { data.techniques = data.techniques.filter(t => t.id !== id); renderTechniques(); } }
function deleteNote(id) { if (confirm('Delete?')) { data.notes = data.notes.filter(n => n.id !== id); renderNotes(); } }
function deleteVideo(id) { if (confirm('Delete?')) { data.resource_videos = data.resource_videos.filter(v => v.id !== id); renderVideos(); } }
function deleteLink(id) { if (confirm('Delete?')) { data.resource_links = data.resource_links.filter(l => l.id !== id); renderLinks(); } }
function deleteMedia(id) { if (confirm('Delete?')) { data.resource_media = data.resource_media.filter(m => m.id !== id); renderMedia(); } }
function deleteCookbook(id) { if (confirm('Delete?')) { data.cookbooks = data.cookbooks.filter(b => b.id !== id); renderCookbooks(); } }

function editRecipe(id) { openRecipeModal(id); }
function editSOP(id) { openSOPModal(id); }
function editTechnique(id) { openTechniqueModal(id); }
function editNote(id) { openNoteModal(id); }
function editVideo(id) { openVideoModal(id); }
function editLink(id) { openLinkModal(id); }
function editMedia(id) { openMediaModal(id); }
function editCookbook(id) { openCookbookModal(id); }

// ============================================================================
// GLOBAL EXPORTS
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
window.saveRecipe = saveRecipe;
window.saveSOP = saveSOP;
window.saveTechnique = saveTechnique;
window.saveNote = saveNote;
window.saveVideo = saveVideo;
window.saveLink = saveLink;
window.saveMedia = saveMedia;
window.saveCookbook = saveCookbook;
window.deleteRecipe = deleteRecipe;
window.deleteSOP = deleteSOP;
window.deleteTechnique = deleteTechnique;
window.deleteNote = deleteNote;
window.deleteVideo = deleteVideo;
window.deleteLink = deleteLink;
window.deleteMedia = deleteMedia;
window.deleteCookbook = deleteCookbook;
window.editRecipe = editRecipe;
window.editSOP = editSOP;
window.editTechnique = editTechnique;
window.editNote = editNote;
window.editVideo = editVideo;
window.editLink = editLink;
window.editMedia = editMedia;
window.editCookbook = editCookbook;

// ============================================================================
// INIT
// ============================================================================

console.log('✅ Kitchen Database MOCK VERSION READY (No Database)');
switchView('recipes');