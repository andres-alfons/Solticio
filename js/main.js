document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWhatsApp();
  initScrollAnimations();
  initSearch();
  initSmoothScroll();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (!navbar || !toggle || !links) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  links.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

function initWhatsApp() {
  const phone = '573245947260';
  const message = encodeURIComponent('Hola Valentina Niebles, me encantaría saber más sobre tus diseños ✨');
  const wspLink = `https://wa.me/${phone}?text=${message}`;

  const container = document.createElement('div');
  container.className = 'wsp-container';
  container.innerHTML = `
    <div class="wsp-aura"></div>
    <a href="${wspLink}" target="_blank" rel="noopener noreferrer" class="wsp-btn" aria-label="Contactar por WhatsApp">
      <img src="img/Whatsapp_icon-icons.com_66931.png" alt="WhatsApp">
    </a>
    <span class="wsp-tooltip">¿Hablamos?</span>
  `;
  document.body.appendChild(container);
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchTags = document.querySelectorAll('.search-tag');
  const cards = document.querySelectorAll('.collection-card');
  const noResults = document.getElementById('noResults');

  if (!searchInput || !cards.length) return;

  let activeTag = 'todos';

  function filterCards() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const tag = (card.dataset.tag || '').toLowerCase();
      const matchesSearch = name.includes(query);
      const matchesTag = activeTag === 'todos' || tag === activeTag;

      if (matchesSearch && matchesTag) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  searchInput.addEventListener('input', filterCards);

  searchTags.forEach(tag => {
    tag.addEventListener('click', () => {
      searchTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      activeTag = tag.dataset.tag || 'todos';
      filterCards();
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
