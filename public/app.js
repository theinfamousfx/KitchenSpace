// ============================================================================
// Chef Virtu Kitchen Database - FULL VERSION WITH ALL CUSTOM FIELDS
// All form inputs, SOPs with custom fields, and complete functionality preserved
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
    {
      id: 2,
      title: 'Food Safety Protocol',
      category: 'Safety Compliance',
      priority: 'Critical',
      description: 'Essential food safety procedures',
      steps: 'Wash hands properly (20 seconds)\nCheck food temperatures\nDate and label all items\nSanitize surfaces\nReport any contamination immediately',
      compliancenotes: 'HACCP certified procedures. Non-compliance may result in health code violations.',
      createdat: '2025-10-10',
      updatedat: '2025-10-28',
    },
    {
      id: 3,
      title: 'Equipment Maintenance Schedule',
      category: 'Equipment Care',
      priority: 'Medium',
      description: 'Weekly equipment maintenance routine',
      steps: 'Deep clean all ovens\nSharpen knives\nCalibrate thermometers\nClean mixer attachments\nChange hood filters',
      compliancenotes: 'Maintenance log must be signed by shift manager.',
      createdat: '2025-10-12',
      updatedat: '2025-10-12',
    },
  ],
  techniques: [
    {
      id: 1,
      title: 'Knife Skills - Julienne',
      category: 'Knife Skills',
      difficulty: 'Intermediate',
      description: 'Master the classic julienne cut for uniform matchstick cuts.',
      steps: 'Square off the vegetable into 1/8 inch planks\nStack planks and cut into 1/8 inch strips\nCut to uniform 2-3 inch length',
      tips: 'Keep fingers curled. Use the knuckle guide. Sharp knife is essential.',
      equipmentneeded: 'Chef\'s knife, cutting board, vegetable',
      createdat: '2025-10-18',
      updatedat: '2025-10-18',
    },
    {
      id: 2,
      title: 'Sous Vide Basics',
      category: 'Modern Techniques',
      difficulty: 'Advanced',
      description: 'Precision cooking method for perfect results.',
      steps: 'Season protein\nSeal in bag\nSubmerge in water bath to target temp\nCook for specified time\nFinish with high heat',
      tips: 'Use quality vacuum sealer. Don\'t overcook. Finish with high heat for crust.',
      equipmentneeded: 'Sous vide circulator, vacuum sealer, bags',
      createdat: '2025-10-12',
      updatedat: '2025-10-12',
    },
  ],
  notes: [
    {
      id: 1,
      title: 'Seasonal Menu Ideas - Winter',
      category: 'Planning',
      content: 'Focus on braised dishes and root vegetables. Consider braised short ribs, butternut squash soup, roasted root vegetable medley. Source local winter squash from Johnson Farm. Plan wine pairings with heavier reds.',
      tags: 'seasonal, menu, winter, planning',
      createdat: '2025-10-23',
      updatedat: '2025-10-29',
    },
    {
      id: 2,
      title: 'Supplier Contact Information',
      category: 'Business',
      content: 'Meat: Anderson Butchers - 555-123-4567, weekly delivery Tuesdays/Fridays. Produce: Farm Fresh Co-op - 555-987-6543, daily delivery. Seafood: Coastal Seafood - 555-246-8135, MWF delivery.',
      tags: 'suppliers, contacts, business',
      createdat: '2025-10-20',
      updatedat: '2025-10-25',
    },
  ],
  videos: [
    {
      id: 1,
      title: 'Advanced Plating Techniques',
      url: 'https://example.com/plating',
      description: 'Professional plating methods for fine dining',
      category: 'Presentation',
      duration: '18:45',
      createdat: '2025-10-15',
    },
    {
      id: 2,
      title: 'Knife Sharpening Tutorial',
      url: 'https://example.com/sharpening',
      description: 'Complete guide to whetstone knife sharpening',
      category: 'Techniques',
      duration: '12:30',
      createdat: '2025-10-18',
    },
  ],
  links: [
    {
      id: 1,
      title: 'Food Lab - Serious Eats',
      url: 'https://www.seriouseats.com/the-food-lab',
      description: 'Science-based cooking techniques and recipes',
      category: 'Learning',
      createdat: '2025-10-10',
    },
    {
      id: 2,
      title: 'CIA Resources',
      url: 'https://www.ciachef.edu/resources',
      description: 'Culinary Institute of America educational resources',
      category: 'Education',
      createdat: '2025-10-12',
    },
  ],
  media: [
    {
      id: 1,
      title: 'Plating Reference Collection',
      type: 'Image',
      url: 'media/plating-refs.jpg',
      description: '50 professional plating examples',
      category: 'Reference',
      createdat: '2025-10-14',
    },
    {
      id: 2,
      title: 'Menu Design Templates',
      type: 'Document',
      url: 'media/menu-templates.pdf',
      description: 'Professional menu layout templates',
      category: 'Business',
      createdat: '2025-10-16',
    },
  ],
  ebooks: [
    {
      id: 1,
      title: 'The French Laundry Cookbook',
      author: 'Thomas Keller',
      cuisine: 'French',
      url: 'books/french-laundry.pdf',
      description: 'Iconic cookbook from one of America\'s greatest chefs',
      pages: 326,
      year: 1999,
      createdat: '2025-10-10',
    },
    {
      id: 2,
      title: 'Modernist Cuisine',
      author: 'Nathan Myhrvold',
      cuisine: 'Modern',
      url: 'books/modernist-cuisine.pdf',
      description: 'The art and science of cooking',
      pages: 2438,
      year: 2011,
      createdat: '2025-10-11',
    },
  ],
};

// Configuration
const config = {
  collections: ['Desserts', 'Main Course', 'Appetizers', 'Quick & Easy', 'Seasonal', 'Comfort Food'],
  cuisines: ['French', 'Italian', 'Japanese', 'American', 'Mexican', 'Indian', 'Chinese', 'Thai', 'Spanish', 'Greek', 'Modern', 'General'],
  difficulties: ['Beginner', 'Intermediate', 'Advanced'],
  sopCategories: ['Daily Operations', 'Safety Compliance', 'Equipment Care', 'Food Prep', 'Service'],
  sopPriorities: ['Critical', 'High', 'Medium', 'Low'],
  techniqueCategories: ['Knife Skills', 'Modern Techniques', 'Classical Techniques', 'Baking', 'Grilling'],
  noteCategories: ['Planning', 'Business', 'Recipes', 'Training', 'General'],
  resourceCategories: ['Presentation', 'Techniques', 'Learning', 'Education', 'Reference', 'Business'],
  mediaTypes: ['Image', 'Document', 'PDF', 'Video'],
};

let nextIds = {
  recipes: 2,
  sops: 4,
  techniques: 3,
  notes: 3,
  videos: 3,
  links: 3,
  media: 3,
  ebooks: 3,
};

let currentSection = 'dashboard';
let currentItem = null;
let editingItem = null;
let currentResourceTab = 'videos';

// Initialize
function init() {
  populateFilters();
  showDashboard();
}

// Navigation
function showDashboard() {
  document.querySelectorAll('.dashboard-section, .content-section').forEach(el => el.classList.remove('active'));
  document.getElementById('dashboard').classList.add('active');
  currentSection = 'dashboard';
}

function showSection(section) {
  document.querySelectorAll('.dashboard-section, .content-section').forEach(el => el.classList.remove('active'));
  document.getElementById(section).classList.add('active');
  currentSection = section;
  renderItems(section);
}

function switchResourceTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.resource-tab').forEach(t => t.classList.add('hidden'));
  event.target.classList.add('active');
  document.getElementById(tab + 'Tab').classList.remove('hidden');
  currentResourceTab = tab;
  renderItems(tab);
}

// Populate Filters
function populateFilters() {
  populateSelect('recipeCuisine', config.cuisines);
  populateSelect('recipeDifficulty', config.difficulties);
  populateSelect('sopCategory', config.sopCategories);
  populateSelect('sopPriority', config.sopPriorities);
  populateSelect('techniqueCategory', config.techniqueCategories);
  populateSelect('techniqueDifficulty', config.difficulties);
  populateSelect('noteCategory', config.noteCategories);
  populateSelect('ebookCuisine', config.cuisines);
}

function populateSelect(id, options) {
  const select = document.getElementById(id);
  if (!select) return;
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}

// Render Items
function renderItems(type) {
  const items = data[type];
  const grid = document.getElementById(type + 'Grid');
  const empty = document.getElementById(type + 'Empty');

  if (!grid) return;

  grid.innerHTML = '';

  if (!items || items.length === 0) {
    if (empty) empty.classList.remove('hidden');
    grid.classList.add('hidden');
    return;
  }

  if (empty) empty.classList.add('hidden');
  grid.classList.remove('hidden');

  items.forEach(item => {
    const card = createItemCard(type, item);
    grid.appendChild(card);
  });
}

function createItemCard(type, item) {
  const card = document.createElement('div');
  card.className = 'item-card';
  card.onclick = () => openDetailModal(type, item.id);

  let content = '';

  if (type === 'recipes') {
    content = `
      <div class="item-actions">
        <button class="action-btn" onclick="event.stopPropagation(); editItem('recipe', ${item.id})">Edit</button>
        <button class="action-btn delete" onclick="event.stopPropagation(); deleteItem('recipe', ${item.id})">Delete</button>
      </div>
      <div class="item-card-header">
        <div class="badge badge-primary">${item.collection}</div>
        <h3 class="item-card-title">${item.title}</h3>
        <div class="item-meta">
          <span class="meta-item">${item.cuisine}</span>
          <span class="badge badge-${getDifficultyClass(item.difficulty)}">${item.difficulty}</span>
          <span class="meta-item">${item.servings} servings</span>
          <span class="meta-item">${item.preptime + item.cooktime} min</span>
        </div>
      </div>
      <p class="item-description">${item.description}</p>
      <div class="item-tags">${item.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}</div>
    `;
  } else if (type === 'sops') {
    content = `
      <div class="item-actions">
        <button class="action-btn" onclick="event.stopPropagation(); editItem('sop', ${item.id})">Edit</button>
        <button class="action-btn delete" onclick="event.stopPropagation(); deleteItem('sop', ${item.id})">Delete</button>
      </div>
      <div class="item-card-header">
        <div class="badge badge-${getPriorityClass(item.priority)}">${item.priority}</div>
        <h3 class="item-card-title">${item.title}</h3>
        <div class="item-meta">
          <span class="meta-item">${item.category}</span>
        </div>
      </div>
      <p class="item-description">${item.description}</p>
    `;
  } else if (type === 'techniques') {
    content = `
      <div class="item-actions">
        <button class="action-btn" onclick="event.stopPropagation(); editItem('technique', ${item.id})">Edit</button>
        <button class="action-btn delete" onclick="event.stopPropagation(); deleteItem('technique', ${item.id})">Delete</button>
      </div>
      <div class="item-card-header">
        <div class="badge badge-info">${item.category}</div>
        <h3 class="item-card-title">${item.title}</h3>
        <div class="item-meta">
          <span class="badge badge-${getDifficultyClass(item.difficulty)}">${item.difficulty}</span>
        </div>
      </div>
      <p class="item-description">${item.description}</p>
    `;
  } else if (type === 'notes') {
    content = `
      <div class="item-actions">
        <button class="action-btn" onclick="event.stopPropagation(); editItem('note', ${item.id})">Edit</button>
        <button class="action-btn delete" onclick="event.stopPropagation(); deleteItem('note', ${item.id})">Delete</button>
      </div>
      <div class="item-card-header">
        <div class="badge badge-info">${item.category}</div>
        <h3 class="item-card-title">${item.title}</h3>
      </div>
      <p class="item-description">${item.content.substring(0, 150)}${item.content.length > 150 ? '...' : ''}</p>
      ${item.tags ? `<div class="item-tags">${item.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}</div>` : ''}
    `;
  } else if (type === 'videos') {
    content = `
      <div class="item-actions">
        <button class="action-btn" onclick="event.stopPropagation(); editItem('video', ${item.id})">Edit</button>
        <button class="action-btn delete" onclick="event.stopPropagation(); deleteItem('video', ${item.id})">Delete</button>
      </div>
      <div class="item-card-header">
        <div class="badge badge-primary">Video</div>
        <h3 class="item-card-title">${item.title}</h3>
        <div class="item-meta">
          <span class="meta-item">${item.category}</span>
          <span class="meta-item">${item.duration}</span>
        </div>
      </div>
      <p class="item-description">${item.description}</p>
    `;
  } else if (type === 'links') {
    content = `
      <div class="item-actions">
        <button class="action-btn" onclick="event.stopPropagation(); editItem('link', ${item.id})">Edit</button>
        <button class="action-btn delete" onclick="event.stopPropagation(); deleteItem('link', ${item.id})">Delete</button>
      </div>
      <div class="item-card-header">
        <div class="badge badge-info">Link</div>
        <h3 class="item-card-title">${item.title}</h3>
        <div class="item-meta">
          <span class="meta-item">${item.category}</span>
        </div>
      </div>
      <p class="item-description">${item.description}</p>
    `;
  } else if (type === 'media') {
    content = `
      <div class="item-actions">
        <button class="action-btn" onclick="event.stopPropagation(); editItem('media', ${item.id})">Edit</button>
        <button class="action-btn delete" onclick="event.stopPropagation(); deleteItem('media', ${item.id})">Delete</button>
      </div>
      <div class="item-card-header">
        <div class="badge badge-warning">${item.type}</div>
        <h3 class="item-card-title">${item.title}</h3>
        <div class="item-meta">
          <span class="meta-item">${item.category}</span>
        </div>
      </div>
      <p class="item-description">${item.description}</p>
    `;
  } else if (type === 'ebooks') {
    content = `
      <div class="item-actions">
        <button class="action-btn" onclick="event.stopPropagation(); editItem('ebook', ${item.id})">Edit</button>
        <button class="action-btn delete" onclick="event.stopPropagation(); deleteItem('ebook', ${item.id})">Delete</button>
      </div>
      <div class="item-card-header">
        <div class="badge badge-primary">${item.cuisine}</div>
        <h3 class="item-card-title">${item.title}</h3>
        <div class="item-meta">
          <span class="meta-item">${item.author}</span>
          <span class="meta-item">${item.pages} pages</span>
          <span class="meta-item">${item.year}</span>
        </div>
      </div>
      <p class="item-description">${item.description}</p>
    `;
  }

  card.innerHTML = content;
  return card;
}

function getDifficultyClass(difficulty) {
  if (difficulty === 'Beginner') return 'success';
  if (difficulty === 'Intermediate') return 'warning';
  return 'danger';
}

function getPriorityClass(priority) {
  if (priority === 'Critical') return 'danger';
  if (priority === 'High') return 'warning';
  if (priority === 'Medium') return 'info';
  return 'success';
}

// Filter Items
function filterItems(type) {
  const searchId = type + 'Search';
  const searchTerm = document.getElementById(searchId)?.value.toLowerCase() || '';
  let filtered = [...data[type]];

  if (searchTerm) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      (item.description && item.description.toLowerCase().includes(searchTerm)) ||
      (item.tags && item.tags.toLowerCase().includes(searchTerm))
    );
  }

  if (type === 'recipes' || type === 'ebooks') {
    const cuisine = document.getElementById(type + 'Cuisine')?.value;
    if (cuisine) filtered = filtered.filter(item => item.cuisine === cuisine);
  }

  if (type === 'recipes' || type === 'techniques') {
    const difficulty = document.getElementById(type + 'Difficulty')?.value;
    if (difficulty) filtered = filtered.filter(item => item.difficulty === difficulty);
  }

  if (type === 'sops') {
    const category = document.getElementById('sopCategory')?.value;
    const priority = document.getElementById('sopPriority')?.value;
    if (category) filtered = filtered.filter(item => item.category === category);
    if (priority) filtered = filtered.filter(item => item.priority === priority);
  }

  if (type === 'techniques' || type === 'notes') {
    const category = document.getElementById(type + 'Category')?.value;
    if (category) filtered = filtered.filter(item => item.category === category);
  }

  renderFilteredItems(type, filtered);
}

function renderFilteredItems(type, filtered) {
  const grid = document.getElementById(type + 'Grid');
  const empty = document.getElementById(type + 'Empty');
  if (!grid) return;

  grid.innerHTML = '';
  if (filtered.length === 0) {
    if (empty) empty.classList.remove('hidden');
    grid.classList.add('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');
  grid.classList.remove('hidden');

  filtered.forEach(item => {
    const card = createItemCard(type, item);
    grid.appendChild(card);
  });
}

// Modal Functions
function openDetailModal(type, id) {
  const typeMap = { recipe: 'recipes', sop: 'sops', technique: 'techniques', note: 'notes', video: 'videos', link: 'links', media: 'media', ebook: 'ebooks' };
  const actualType = typeMap[type] || type;
  const item = data[actualType].find(i => i.id === id);
  if (!item) return;

  currentItem = { type: actualType, id };
  document.getElementById('modalTitle').textContent = item.title;

  let content = '';

  if (actualType === 'recipes') {
    const ingredients = item.ingredients.split('\n').map((i, idx) => `<li>${i}</li>`).join('');
    const instructions = item.instructions.split('\n').map((i, idx) => `<li>${i}</li>`).join('');
    content = `
      <div class="detail-meta">
        <div class="detail-meta-item"><span class="detail-meta-label">Cuisine</span><span class="detail-meta-value">${item.cuisine}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Difficulty</span><span class="detail-meta-value"><span class="badge badge-${getDifficultyClass(item.difficulty)}">${item.difficulty}</span></span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Servings</span><span class="detail-meta-value">${item.servings}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Prep Time</span><span class="detail-meta-value">${item.preptime} min</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Cook Time</span><span class="detail-meta-value">${item.cooktime} min</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Collection</span><span class="detail-meta-value">${item.collection}</span></div>
      </div>
      <div class="detail-section"><p>${item.description}</p></div>
      <div class="detail-section"><h3>Ingredients</h3><ul>${ingredients}</ul></div>
      <div class="detail-section"><h3>Instructions</h3><ol>${instructions}</ol></div>
      <div class="detail-section"><h3>Chef's Notes</h3><p>${item.notes}</p></div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="editItem('recipe', ${id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteItem('recipe', ${id})">Delete</button>
      </div>
    `;
  } else if (actualType === 'sops') {
    const steps = item.steps.split('\n').map((s, idx) => `<li>${s}</li>`).join('');
    content = `
      <div class="detail-meta">
        <div class="detail-meta-item"><span class="detail-meta-label">Category</span><span class="detail-meta-value">${item.category}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Priority</span><span class="detail-meta-value"><span class="badge badge-${getPriorityClass(item.priority)}">${item.priority}</span></span></div>
      </div>
      <div class="detail-section"><h3>Description</h3><p>${item.description}</p></div>
      <div class="detail-section"><h3>Procedure Steps</h3><ol>${steps}</ol></div>
      <div class="detail-section"><h3>Compliance Notes</h3><p>${item.compliancenotes}</p></div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="editItem('sop', ${id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteItem('sop', ${id})">Delete</button>
      </div>
    `;
  } else if (actualType === 'techniques') {
    const steps = item.steps.split('\n').map(s => `<li>${s}</li>`).join('');
    content = `
      <div class="detail-meta">
        <div class="detail-meta-item"><span class="detail-meta-label">Category</span><span class="detail-meta-value">${item.category}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Difficulty</span><span class="detail-meta-value"><span class="badge badge-${getDifficultyClass(item.difficulty)}">${item.difficulty}</span></span></div>
      </div>
      <div class="detail-section"><h3>Description</h3><p>${item.description}</p></div>
      <div class="detail-section"><h3>Steps</h3><ol>${steps}</ol></div>
      <div class="detail-section"><h3>Tips</h3><p>${item.tips}</p></div>
      <div class="detail-section"><h3>Equipment Needed</h3><p>${item.equipmentneeded}</p></div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="editItem('technique', ${id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteItem('technique', ${id})">Delete</button>
      </div>
    `;
  } else if (actualType === 'notes') {
    content = `
      <div class="detail-meta">
        <div class="detail-meta-item"><span class="detail-meta-label">Category</span><span class="detail-meta-value">${item.category}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Created</span><span class="detail-meta-value">${item.createdat}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Updated</span><span class="detail-meta-value">${item.updatedat}</span></div>
      </div>
      <div class="detail-section"><h3>Content</h3><p>${item.content}</p></div>
      ${item.tags ? `<div class="detail-section"><h3>Tags</h3><div class="item-tags">${item.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}</div></div>` : ''}
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="editItem('note', ${id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteItem('note', ${id})">Delete</button>
      </div>
    `;
  } else if (actualType === 'videos' || actualType === 'links') {
    content = `
      <div class="detail-meta">
        <div class="detail-meta-item"><span class="detail-meta-label">Category</span><span class="detail-meta-value">${item.category}</span></div>
        ${item.duration ? `<div class="detail-meta-item"><span class="detail-meta-label">Duration</span><span class="detail-meta-value">${item.duration}</span></div>` : ''}
      </div>
      <div class="detail-section"><h3>Description</h3><p>${item.description}</p></div>
      <div class="detail-section"><h3>URL</h3><p><a href="${item.url}" target="_blank">${item.url}</a></p></div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="editItem('${actualType === 'videos' ? 'video' : 'link'}', ${id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteItem('${actualType === 'videos' ? 'video' : 'link'}', ${id})">Delete</button>
      </div>
    `;
  } else if (actualType === 'media') {
    content = `
      <div class="detail-meta">
        <div class="detail-meta-item"><span class="detail-meta-label">Type</span><span class="detail-meta-value">${item.type}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Category</span><span class="detail-meta-value">${item.category}</span></div>
      </div>
      <div class="detail-section"><h3>Description</h3><p>${item.description}</p></div>
      <div class="detail-section"><h3>File Path</h3><p>${item.url}</p></div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="editItem('media', ${id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteItem('media', ${id})">Delete</button>
      </div>
    `;
  } else if (actualType === 'ebooks') {
    content = `
      <div class="detail-meta">
        <div class="detail-meta-item"><span class="detail-meta-label">Author</span><span class="detail-meta-value">${item.author}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Cuisine</span><span class="detail-meta-value">${item.cuisine}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Pages</span><span class="detail-meta-value">${item.pages}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">Year</span><span class="detail-meta-value">${item.year}</span></div>
      </div>
      <div class="detail-section"><h3>Description</h3><p>${item.description}</p></div>
      <div class="detail-section"><h3>File Path</h3><p>${item.url}</p></div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="editItem('ebook', ${id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteItem('ebook', ${id})">Delete</button>
      </div>
    `;
  }

  document.getElementById('modalContent').innerHTML = content;
  document.getElementById('itemModal').classList.add('active');
}

function openAddModal(type) {
  editingItem = null;
  document.getElementById('modalTitle').textContent = `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  const form = createForm(type);
  document.getElementById('modalContent').innerHTML = form;
  document.getElementById('itemModal').classList.add('active');
}

function editItem(type, id) {
  const typeMap = { recipe: 'recipes', sop: 'sops', technique: 'techniques', note: 'notes', video: 'videos', link: 'links', media: 'media', ebook: 'ebooks' };
  const actualType = typeMap[type] || type;
  const item = data[actualType].find(i => i.id === id);
  if (!item) return;

  editingItem = { type: actualType, id };
  closeModal();
  setTimeout(() => {
    document.getElementById('modalTitle').textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const form = createForm(type, item);
    document.getElementById('modalContent').innerHTML = form;
    document.getElementById('itemModal').classList.add('active');
  }, 300);
}

function createForm(type, item = null) {
  let fields = '';

  if (type === 'recipe') {
    fields = `
      <div class="form-group"><label class="form-label">Title</label><input type="text" id="formTitle" class="form-input" value="${item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Cuisine</label><select id="formCuisine" class="form-select" required>${config.cuisines.map(c => `<option value="${c}" ${item?.cuisine === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Difficulty</label><select id="formDifficulty" class="form-select" required>${config.difficulties.map(d => `<option value="${d}" ${item?.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Collection</label><select id="formCollection" class="form-select" required>${config.collections.map(c => `<option value="${c}" ${item?.collection === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Servings</label><input type="number" id="formServings" class="form-input" value="${item?.servings || 1}" min="1"></div>
        <div class="form-group"><label class="form-label">Prep Time (min)</label><input type="number" id="formPrepTime" class="form-input" value="${item?.preptime || 0}" min="0"></div>
        <div class="form-group"><label class="form-label">Cook Time (min)</label><input type="number" id="formCookTime" class="form-input" value="${item?.cooktime || 0}" min="0"></div>
      </div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="formDescription" class="form-textarea">${item?.description || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Ingredients (one per line)</label><textarea id="formIngredients" class="form-textarea" rows="6">${item?.ingredients || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Instructions (one per line)</label><textarea id="formInstructions" class="form-textarea" rows="8">${item?.instructions || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Chef's Notes</label><textarea id="formNotes" class="form-textarea" rows="3">${item?.notes || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Tags (comma separated)</label><input type="text" id="formTags" class="form-input" value="${item?.tags || ''}"></div>
    `;
  } else if (type === 'sop') {
    fields = `
      <div class="form-group"><label class="form-label">Title</label><input type="text" id="formTitle" class="form-input" value="${item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Category</label><select id="formCategory" class="form-select" required>${config.sopCategories.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Priority</label><select id="formPriority" class="form-select" required>${config.sopPriorities.map(p => `<option value="${p}" ${item?.priority === p ? 'selected' : ''}>${p}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="formDescription" class="form-textarea" rows="3">${item?.description || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Procedure Steps (one per line)</label><textarea id="formSteps" class="form-textarea" rows="8" required>${item?.steps || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Compliance Notes</label><textarea id="formCompliance" class="form-textarea" rows="3">${item?.compliancenotes || ''}</textarea></div>
    `;
  } else if (type === 'technique') {
    fields = `
      <div class="form-group"><label class="form-label">Title</label><input type="text" id="formTitle" class="form-input" value="${item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Category</label><select id="formCategory" class="form-select" required>${config.techniqueCategories.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Difficulty</label><select id="formDifficulty" class="form-select" required>${config.difficulties.map(d => `<option value="${d}" ${item?.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="formDescription" class="form-textarea" rows="3">${item?.description || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Steps (one per line)</label><textarea id="formSteps" class="form-textarea" rows="8" required>${item?.steps || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Tips</label><textarea id="formTips" class="form-textarea" rows="3">${item?.tips || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Equipment Needed</label><input type="text" id="formEquipment" class="form-input" value="${item?.equipmentneeded || ''}"></div>
    `;
  } else if (type === 'note') {
    fields = `
      <div class="form-group"><label class="form-label">Title</label><input type="text" id="formTitle" class="form-input" value="${item?.title || ''}" required></div>
      <div class="form-group"><label class="form-label">Category</label><select id="formCategory" class="form-select" required>${config.noteCategories.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Content</label><textarea id="formContent" class="form-textarea" rows="10" required>${item?.content || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Tags (comma separated)</label><input type="text" id="formTags" class="form-input" value="${item?.tags || ''}"></div>
    `;
  } else if (type === 'video') {
    fields = `
      <div class="form-group"><label class="form-label">Title</label><input type="text" id="formTitle" class="form-input" value="${item?.title || ''}" required></div>
      <div class="form-group"><label class="form-label">URL</label><input type="url" id="formUrl" class="form-input" value="${item?.url || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Category</label><select id="formCategory" class="form-select" required>${config.resourceCategories.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Duration</label><input type="text" id="formDuration" class="form-input" value="${item?.duration || ''}" placeholder="e.g., 12:30"></div>
      </div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="formDescription" class="form-textarea" rows="4">${item?.description || ''}</textarea></div>
    `;
  } else if (type === 'link') {
    fields = `
      <div class="form-group"><label class="form-label">Title</label><input type="text" id="formTitle" class="form-input" value="${item?.title || ''}" required></div>
      <div class="form-group"><label class="form-label">URL</label><input type="url" id="formUrl" class="form-input" value="${item?.url || ''}" required></div>
      <div class="form-group"><label class="form-label">Category</label><select id="formCategory" class="form-select" required>${config.resourceCategories.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="formDescription" class="form-textarea" rows="4">${item?.description || ''}</textarea></div>
    `;
  } else if (type === 'media') {
    fields = `
      <div class="form-group"><label class="form-label">Title</label><input type="text" id="formTitle" class="form-input" value="${item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Type</label><select id="formType" class="form-select" required>${config.mediaTypes.map(t => `<option value="${t}" ${item?.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Category</label><select id="formCategory" class="form-select" required>${config.resourceCategories.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label class="form-label">File Path/URL</label><input type="text" id="formUrl" class="form-input" value="${item?.url || ''}" required></div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="formDescription" class="form-textarea" rows="4">${item?.description || ''}</textarea></div>
    `;
  } else if (type === 'ebook') {
    fields = `
      <div class="form-group"><label class="form-label">Title</label><input type="text" id="formTitle" class="form-input" value="${item?.title || ''}" required></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Author</label><input type="text" id="formAuthor" class="form-input" value="${item?.author || ''}" required></div>
        <div class="form-group"><label class="form-label">Cuisine</label><select id="formCuisine" class="form-select" required>${config.cuisines.map(c => `<option value="${c}" ${item?.cuisine === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Pages</label><input type="number" id="formPages" class="form-input" value="${item?.pages || ''}" min="1"></div>
        <div class="form-group"><label class="form-label">Year</label><input type="number" id="formYear" class="form-input" value="${item?.year || ''}" min="1900" max="2100"></div>
      </div>
      <div class="form-group"><label class="form-label">File Path/URL</label><input type="text" id="formUrl" class="form-input" value="${item?.url || ''}" required></div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="formDescription" class="form-textarea" rows="4">${item?.description || ''}</textarea></div>
    `;
  }

  return `<form onsubmit="saveItem(event, '${type}')">
    ${fields}
    <div class="modal-actions">
      <button type="submit" class="btn btn-primary">Save</button>
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    </div>
  </form>`;
}

function saveItem(event, type) {
  event.preventDefault();
  const now = new Date().toISOString().split('T')[0];
  let itemData = { title: document.getElementById('formTitle').value };

  if (type === 'recipe') {
    itemData = { ...itemData, cuisine: document.getElementById('formCuisine').value, difficulty: document.getElementById('formDifficulty').value, collection: document.getElementById('formCollection').value, servings: parseInt(document.getElementById('formServings').value) || 1, preptime: parseInt(document.getElementById('formPrepTime').value) || 0, cooktime: parseInt(document.getElementById('formCookTime').value) || 0, description: document.getElementById('formDescription').value, ingredients: document.getElementById('formIngredients').value, instructions: document.getElementById('formInstructions').value, notes: document.getElementById('formNotes').value, tags: document.getElementById('formTags').value };
  } else if (type === 'sop') {
    itemData = { ...itemData, category: document.getElementById('formCategory').value, priority: document.getElementById('formPriority').value, description: document.getElementById('formDescription').value, steps: document.getElementById('formSteps').value, compliancenotes: document.getElementById('formCompliance').value };
  } else if (type === 'technique') {
    itemData = { ...itemData, category: document.getElementById('formCategory').value, difficulty: document.getElementById('formDifficulty').value, description: document.getElementById('formDescription').value, steps: document.getElementById('formSteps').value, tips: document.getElementById('formTips').value, equipmentneeded: document.getElementById('formEquipment').value };
  } else if (type === 'note') {
    itemData = { ...itemData, category: document.getElementById('formCategory').value, content: document.getElementById('formContent').value, tags: document.getElementById('formTags').value };
  } else if (type === 'video') {
    itemData = { ...itemData, url: document.getElementById('formUrl').value, category: document.getElementById('formCategory').value, duration: document.getElementById('formDuration').value, description: document.getElementById('formDescription').value };
  } else if (type === 'link') {
    itemData = { ...itemData, url: document.getElementById('formUrl').value, category: document.getElementById('formCategory').value, description: document.getElementById('formDescription').value };
  } else if (type === 'media') {
    itemData = { ...itemData, type: document.getElementById('formType').value, url: document.getElementById('formUrl').value, category: document.getElementById('formCategory').value, description: document.getElementById('formDescription').value };
  } else if (type === 'ebook') {
    itemData = { ...itemData, author: document.getElementById('formAuthor').value, cuisine: document.getElementById('formCuisine').value, url: document.getElementById('formUrl').value, description: document.getElementById('formDescription').value, pages: parseInt(document.getElementById('formPages').value) || 0, year: parseInt(document.getElementById('formYear').value) || new Date().getFullYear() };
  }

  const typeMap = { recipe: 'recipes', sop: 'sops', technique: 'techniques', note: 'notes', video: 'videos', link: 'links', media: 'media', ebook: 'ebooks' };
  const actualType = typeMap[type];

  if (editingItem) {
    const index = data[actualType].findIndex(i => i.id === editingItem.id);
    if (index !== -1) {
      data[actualType][index] = { ...data[actualType][index], ...itemData, updatedat: now };
    }
  } else {
    const newItem = { id: nextIds[actualType]++, ...itemData, createdat: now, updatedat: now };
    data[actualType].push(newItem);
  }

  closeModal();
  renderItems(actualType);
  showSuccess(editingItem ? 'Item updated successfully!' : 'Item added successfully!');
}

function deleteItem(type, id) {
  if (!confirm('Are you sure you want to delete this item?')) return;

  const typeMap = { recipe: 'recipes', sop: 'sops', technique: 'techniques', note: 'notes', video: 'videos', link: 'links', media: 'media', ebook: 'ebooks' };
  const actualType = typeMap[type];

  data[actualType] = data[actualType].filter(i => i.id !== id);
  closeModal();
  renderItems(actualType);
  showSuccess('Item deleted successfully!');
}

function closeModal(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('itemModal').classList.remove('active');
  currentItem = null;
  editingItem = null;
}

function showSuccess(message) {
  const success = document.createElement('div');
  success.className = 'success-message';
  success.textContent = message;
  document.body.appendChild(success);
  setTimeout(() => success.remove(), 3000);
}

window.onload = init;

// Global exports
window.showDashboard = showDashboard;
window.showSection = showSection;
window.switchResourceTab = switchResourceTab;
window.filterItems = filterItems;
window.openDetailModal = openDetailModal;
window.openAddModal = openAddModal;
window.editItem = editItem;
window.saveItem = saveItem;
window.deleteItem = deleteItem;
window.closeModal = closeModal;