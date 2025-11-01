// ============================================================================
// Cloud Drive Integration Functions
// For Media and Cookbooks sections to link OneDrive and Google Drive files
// ============================================================================

// OneDrive Link Format Converter
function convertOneDriveShareLink(shareLink) {
  // Convert OneDrive share link to embeddable preview
  // Example: https://1drv.ms/u/s!XXXXX -> https://onedrive.live.com/embed?resid=...
  try {
    const url = new URL(shareLink);
    if (url.hostname.includes('1drv.ms') || url.hostname.includes('onedrive.live.com')) {
      // For direct preview URLs
      return shareLink + '&em=2'; // embed mode
    }
    return shareLink;
  } catch {
    return shareLink;
  }
}

// Google Drive Link Format Converter
function convertGoogleDriveShareLink(shareLink) {
  // Convert Google Drive share link to embeddable preview
  // Example: https://drive.google.com/file/d/FILEID/view?usp=sharing
  // Convert to: https://drive.google.com/file/d/FILEID/preview
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

// Validate cloud drive links
function isValidCloudLink(url) {
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

// Get cloud provider from URL
function getCloudProvider(url) {
  if (url.includes('1drv.ms') || url.includes('onedrive.live.com') || url.includes('sharepoint')) {
    return 'OneDrive';
  }
  if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
    return 'Google Drive';
  }
  return null;
}

// Get file type from URL
function getFileTypeFromUrl(url) {
  const extension = url.split('.').pop().toLowerCase();
  if (['pdf', 'epub', 'txt', 'doc', 'docx'].includes(extension)) {
    return extension.toUpperCase();
  }
  return 'Document';
}

// ============================================================================
// ENHANCED MODALS: Media (With Cloud Support)
// ============================================================================

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
          
          <div style="background: #f0f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="font-weight: 600; margin-bottom: 10px; color: #2c3e50;">☁️ Cloud Storage Option</p>
            <p style="font-size: 13px; color: #7a8a99; margin-bottom: 12px;">
              Paste your shared link from OneDrive or Google Drive
            </p>
            <input type="url" placeholder="OneDrive or Google Drive Share Link (optional)" value="${media.cloud_link || ''}">
            <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
              💡 Get share link: Right-click file → Share → Copy link
            </p>
          </div>

          <select name="media_type">
            <option value="">Select Media Type</option>
            <option value="PDF" ${media.media_type === 'PDF' ? 'selected' : ''}>PDF Document</option>
            <option value="EPUB" ${media.media_type === 'EPUB' ? 'selected' : ''}>EPUB eBook</option>
            <option value="Image" ${media.media_type === 'Image' ? 'selected' : ''}>Image</option>
            <option value="Document" ${media.media_type === 'Document' ? 'selected' : ''}>Document</option>
            <option value="Video" ${media.media_type === 'Video' ? 'selected' : ''}>Video</option>
          </select>
          
          <textarea placeholder="Description / Notes" style="min-height: 100px;">${media.description || ''}</textarea>
          
          <textarea placeholder="Storage Location (e.g., OneDrive - My Documents, Google Drive - Cookbooks)" style="min-height: 80px;">${media.storage_location || ''}</textarea>
          
          <button type="submit">${id ? 'Update' : 'Create'} Media</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

// ============================================================================
// ENHANCED MODALS: Cookbook (With Cloud Support)
// ============================================================================

function openCookbookModal(id = null) {
  currentEditingId = id;
  const book = id ? data.cookbooks.find(b => b.id === id) : {};
  
  const modal = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal modal-large" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeModal()">×</span>
        <h2>${id ? 'Edit Cookbook' : 'Add Cookbook'}</h2>
        <form onsubmit="saveCookbook(event)">
          <input type="text" placeholder="Cookbook Title *" value="${book.title || ''}" required>
          
          <div class="form-row">
            <input type="text" placeholder="Author" value="${book.author || ''}">
            <input type="text" placeholder="ISBN" value="${book.isbn || ''}">
          </div>
          
          <input type="number" placeholder="Publication Year" value="${book.publication_year || ''}">
          
          <input type="text" placeholder="Cuisine Type (e.g., Italian, Asian)" value="${book.cuisine_type || ''}">
          
          <textarea placeholder="Description / Synopsis" style="min-height: 100px;">${book.description || ''}</textarea>

          <div style="background: #f0f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="font-weight: 600; margin-bottom: 10px; color: #2c3e50;">📂 Cloud Storage Link</p>
            <p style="font-size: 13px; color: #7a8a99; margin-bottom: 12px;">
              Link to your PDF or EPUB version stored in the cloud
            </p>
            <select name="cloud_provider" style="width: 100%; margin-bottom: 12px;">
              <option value="">Select Cloud Provider</option>
              <option value="google_drive" ${book.cloud_provider === 'google_drive' ? 'selected' : ''}>Google Drive</option>
              <option value="onedrive" ${book.cloud_provider === 'onedrive' ? 'selected' : ''}>OneDrive</option>
              <option value="both" ${book.cloud_provider === 'both' ? 'selected' : ''}>Both</option>
            </select>
            <input type="url" placeholder="Google Drive Link (optional)" value="${book.google_drive_link || ''}" style="width: 100%; margin-bottom: 10px;">
            <input type="url" placeholder="OneDrive Link (optional)" value="${book.onedrive_link || ''}" style="width: 100%;">
            <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
              💡 Get link: Right-click file → Share → Copy link → Paste above
            </p>
          </div>

          <div class="form-row">
            <input type="text" placeholder="Format (PDF, EPUB, Hardcover, etc)" value="${book.format || ''}">
            <input type="text" placeholder="Location/Library" value="${book.location || ''}">
          </div>
          
          <button type="submit">${id ? 'Update' : 'Create'} Cookbook</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

// ============================================================================
// ENHANCED RENDER: Media (With Cloud Links Display)
// ============================================================================

function renderMedia() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.resource_media.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Media & Cloud Documents</h2>
        <button class="btn-add" onclick="openMediaModal()">+ Add Media</button>
      </div>
      <p class="empty-message">No media yet. Add PDFs, EPUBs, and cloud documents!</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Media & Cloud Documents</h2>
      <button class="btn-add" onclick="openMediaModal()">+ Add Media</button>
    </div>
    <div class="items-grid">
      ${data.resource_media.map(m => `
        <div class="item-card">
          <h3>${m.filename || 'Untitled'}</h3>
          <p class="meta">${m.media_type || 'Unknown'} ${m.cloud_link ? '☁️' : ''}</p>
          <p class="description">${m.description || 'No description'}</p>
          ${m.storage_location ? `<p style="font-size: 13px; color: #7a8a99; margin: 8px 0;"><strong>Location:</strong> ${m.storage_location}</p>` : ''}
          <div class="card-footer">
            ${m.cloud_link ? `<a href="${convertCloudLink(m.cloud_link)}" target="_blank" class="badge" style="text-decoration: none;">Open ☁️</a>` : `<span class="badge">${m.file_size_kb || 'N/A'} KB</span>`}
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editMedia(${m.id})">Edit</button>
              <button class="btn-delete" onclick="deleteMedia(${m.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================================
// ENHANCED RENDER: Cookbooks (With Cloud Links Display)
// ============================================================================

function renderCookbooks() {
  const container = document.getElementById('content');
  if (!container) return;

  if (data.cookbooks.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <h2>Cookbooks & eBooks</h2>
        <button class="btn-add" onclick="openCookbookModal()">+ Add Cookbook</button>
      </div>
      <p class="empty-message">No cookbooks yet. Add your cookbook collection and link cloud versions!</p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <h2>Cookbooks & eBooks</h2>
      <button class="btn-add" onclick="openCookbookModal()">+ Add Cookbook</button>
    </div>
    <div class="items-grid">
      ${data.cookbooks.map(c => `
        <div class="item-card">
          <h3>${c.title || 'Untitled'}</h3>
          <p class="meta">${c.author || 'Unknown'} • ${c.publication_year || 'N/A'}</p>
          <p class="description">${c.description || 'No description'}</p>
          ${c.cuisine_type ? `<p style="font-size: 13px; color: #7a8a99; margin: 8px 0;"><strong>Cuisine:</strong> ${c.cuisine_type}</p>` : ''}
          ${c.google_drive_link || c.onedrive_link ? `
            <div style="margin: 12px 0; display: flex; flex-wrap: wrap; gap: 8px;">
              ${c.google_drive_link ? `<a href="${convertGoogleDriveShareLink(c.google_drive_link)}" target="_blank" style="display: inline-block; padding: 5px 12px; background: #4285f4; color: white; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: 600;">Google Drive</a>` : ''}
              ${c.onedrive_link ? `<a href="${convertOneDriveShareLink(c.onedrive_link)}" target="_blank" style="display: inline-block; padding: 5px 12px; background: #0078d4; color: white; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: 600;">OneDrive</a>` : ''}
            </div>
          ` : ''}
          <div class="card-footer">
            <span class="badge">${c.format || 'Unknown'}</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-edit" onclick="editCookbook(${c.id})">Edit</button>
              <button class="btn-delete" onclick="deleteCookbook(${c.id})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================================
// ENHANCED SAVE: Media (With Cloud Support)
// ============================================================================

async function saveMedia(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, textarea, select');
  
  const cloudLink = inputs[1].value;
  const mediaType = inputs[2].value;
  
  // Validate cloud link if provided
  if (cloudLink && !isValidCloudLink(cloudLink)) {
    alert('❌ Please provide a valid OneDrive or Google Drive link');
    return;
  }
  
  const media = {
    filename: inputs[0].value,
    cloud_link: cloudLink,
    media_type: mediaType,
    description: inputs[3].value,
    storage_location: inputs[4].value,
  };

  if (currentEditingId) {
    media.id = currentEditingId;
    await putToAPI('/resource-media', media);
  } else {
    await postToAPI('/resource-media', media);
  }
  closeModal();
  await loadAllData();
}

// ============================================================================
// ENHANCED SAVE: Cookbook (With Cloud Support)
// ============================================================================

async function saveCookbook(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('input, textarea, select');
  
  const googleDriveLink = inputs[4].value;
  const onedrivelLink = inputs[5].value;
  
  // Validate cloud links if provided
  if (googleDriveLink && !googleDriveLink.includes('drive.google.com')) {
    alert('❌ Invalid Google Drive link. Use the share link from Google Drive.');
    return;
  }
  
  if (onedrivelLink && !isValidCloudLink(onedrivelLink)) {
    alert('❌ Invalid OneDrive link. Use the share link from OneDrive.');
    return;
  }
  
  const cookbook = {
    title: inputs[0].value,
    author: inputs[1].value,
    isbn: inputs[2].value,
    publication_year: parseInt(inputs[3].value) || null,
    description: inputs[6].value,
    cuisine_type: inputs[5].value,
    cloud_provider: inputs[4].value,
    google_drive_link: googleDriveLink,
    onedrive_link: onedrivelLink,
    format: inputs[7].value,
    location: inputs[8].value,
  };

  if (currentEditingId) {
    cookbook.id = currentEditingId;
    await putToAPI('/cookbooks', cookbook);
  } else {
    await postToAPI('/cookbooks', cookbook);
  }
  closeModal();
  await loadAllData();
}

// ============================================================================
// Helper to convert cloud links for display
// ============================================================================

function convertCloudLink(link) {
  if (link.includes('drive.google.com')) {
    return convertGoogleDriveShareLink(link);
  }
  if (link.includes('1drv.ms') || link.includes('onedrive.live.com')) {
    return convertOneDriveShareLink(link);
  }
  return link;
}