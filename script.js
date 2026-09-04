/* ==========================================================================
   KitchenNotes - Interactive Culinary Ratio Simulator & Laboratory Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('kitchennotes-theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Parchment Light';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('kitchennotes-theme', 'light');
        themeToggleBtn.textContent = 'Cast Iron Dark';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('kitchennotes-theme', 'dark');
        themeToggleBtn.textContent = 'Parchment Light';
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileMenuBtn.innerHTML = navMenu.classList.contains('open') ? '&times;' : '&#9776;';
    });
  }

  // Reading Progress Bar
  const progressBar = document.getElementById('readingProgressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = progress + '%';
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body = item.querySelector('.faq-body');
    if (trigger && body) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => {
          i.classList.remove('active');
          const b = i.querySelector('.faq-body');
          if (b) b.style.maxHeight = null;
        });
        if (!isActive) {
          item.classList.add('active');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    }
  });

  // Interactive Ratio Calculator Engine
  const ratioData = {
    vinaigrette: {
      name: "Classical Vinaigrette Emulsion",
      formula: "3 Parts Cold-Pressed Oil : 1 Part Acid / Verjus",
      baseGrams: 100,
      ingredients: [
        { item: "Cold-Pressed Extra Virgin Olive Oil", ratio: 0.75, unit: "g" },
        { item: "Aged Apple Cider Vinegar or Verjus", ratio: 0.25, unit: "g" },
        { item: "Stoneground Dijon Mustard (Emulsifier)", ratio: 0.05, unit: "g" },
        { item: "Fine Sea Salt & Fresh Herb Mince", ratio: 0.02, unit: "g" }
      ]
    },
    sourdough: {
      name: "Artisan Sourdough Hydration",
      formula: "100% Flour : 72% Water : 20% Leaven : 2% Salt",
      baseGrams: 500,
      ingredients: [
        { item: "Stone-Ground Heritage Bread Flour", ratio: 1.00, unit: "g" },
        { item: "Filtered Well Water (26°C)", ratio: 0.72, unit: "g" },
        { item: "Active Wild Yeast Leaven (100% Hydration)", ratio: 0.20, unit: "g" },
        { item: "Unrefined Mineral Sea Salt", ratio: 0.02, unit: "g" }
      ]
    },
    brine: {
      name: "Equilibrium Vegetable Brine",
      formula: "2.5% Saline Equilibrium (Produce + Water Weight)",
      baseGrams: 1000,
      ingredients: [
        { item: "Fresh Seasonal Root Vegetables / Produce", ratio: 0.60, unit: "g" },
        { item: "Filtered Non-Chlorinated Water", ratio: 0.40, unit: "g" },
        { item: "Pure Kosher Salt (2.5% Total Weight)", ratio: 0.025, unit: "g" },
        { item: "Cracked Coriander & Wild Botanical Seeds", ratio: 0.005, unit: "g" }
      ]
    },
    roux: {
      name: "Classical Velouté Roux Base",
      formula: "1 Part Flour : 1 Part Clarified Butter / Fat",
      baseGrams: 100,
      ingredients: [
        { item: "Clarified Butter or Cultured Oil", ratio: 0.50, unit: "g" },
        { item: "All-Purpose Wheat Flour", ratio: 0.50, unit: "g" },
        { item: "Simmering Vegetable Broth / Hydro-Infusion", ratio: 5.00, unit: "g" }
      ]
    }
  };

  let currentRatioKey = 'vinaigrette';
  const ratioButtons = document.querySelectorAll('.ratio-btn');
  const ratioTitle = document.getElementById('ratioTitle');
  const ratioFormula = document.getElementById('ratioFormula');
  const ratioSlider = document.getElementById('ratioSlider');
  const ratioSliderVal = document.getElementById('ratioSliderVal');
  const ingredientsTableBody = document.getElementById('ingredientsTableBody');

  function renderRatio() {
    const data = ratioData[currentRatioKey];
    if (!data) return;
    if (ratioTitle) ratioTitle.textContent = data.name;
    if (ratioFormula) ratioFormula.textContent = data.formula;
    
    const baseWeight = ratioSlider ? parseInt(ratioSlider.value, 10) : data.baseGrams;
    if (ratioSliderVal) ratioSliderVal.textContent = baseWeight + 'g';

    if (ingredientsTableBody) {
      ingredientsTableBody.innerHTML = '';
      data.ingredients.forEach(ing => {
        const tr = document.createElement('tr');
        const calculatedWeight = Math.round(baseWeight * ing.ratio * 10) / 10;
        tr.innerHTML = `
          <td>${ing.item}</td>
          <td>${calculatedWeight} ${ing.unit}</td>
        `;
        ingredientsTableBody.appendChild(tr);
      });
    }
  }

  if (ratioButtons.length > 0) {
    ratioButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        ratioButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRatioKey = btn.getAttribute('data-ratio');
        renderRatio();
      });
    });
  }

  if (ratioSlider) {
    ratioSlider.addEventListener('input', renderRatio);
  }

  renderRatio();

  // Blog Live Search & Category Filter
  const blogSearchInput = document.getElementById('blogSearchInput');
  const categoryFilterBtns = document.querySelectorAll('.category-filter-btn');
  const blogCards = document.querySelectorAll('.journal-post-card');

  function filterPosts() {
    const query = blogSearchInput ? blogSearchInput.value.toLowerCase().trim() : '';
    const activeCatBtn = document.querySelector('.category-filter-btn.active');
    const selectedCategory = activeCatBtn ? activeCatBtn.getAttribute('data-category') : 'all';

    blogCards.forEach(card => {
      const cardTitle = card.querySelector('.post-card-title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.post-card-excerpt')?.textContent.toLowerCase() || '';
      const cardCat = card.getAttribute('data-category') || '';

      const matchesQuery = !query || cardTitle.includes(query) || cardDesc.includes(query);
      const matchesCategory = selectedCategory === 'all' || cardCat === selectedCategory;

      if (matchesQuery && matchesCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', filterPosts);
  }

  if (categoryFilterBtns.length > 0) {
    categoryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterPosts();
      });
    });
  }
});
