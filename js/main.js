const VN_PRODUCTS = [
  { name:'Aurora', price:'$450.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido largo en seda natural con bordados florales hechos a mano. Una pieza que evoca la delicadeza de un amanecer.', detail:'Confeccionado en seda 100% natural, este vestido largo presenta bordados florales realizados íntegramente a mano por artesanas locales. Forro interior de algodón para máxima comodidad. Cierre invisible en espalda.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.18%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.18%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(3).jpeg'] },
  { name:'Esmeralda', price:'$380.000', tag:'Exclusivo', tagCategory:'conjuntos', desc:'Conjunto de dos piezas con detalles dorados y corte moderno. Sofisticación para la mujer contemporánea.', detail:'Blazer entallado con botones dorados y pantalón de corte recto. Tejido de gabardina premium con forro de satén. Hombreras sutiles que estilizan la silueta.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.18%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(1).jpeg'] },
  { name:'Noche Eterna', price:'$520.000', tag:'Best Seller', tagCategory:'vestidos', desc:'Vestido de gala en tonos profundos, ideal para eventos nocturnos donde quieres deslumbrar.', detail:'Vestido largo en chiffon con capas superpuestas que crean un efecto etéreo. Escote en V profundo con pedrería sutil. Espalda descubierta con tirantes cruzados.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.59%20PM.jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(4).jpeg'] },
  { name:'Real', price:'$290.000', tag:'Edición Limitada', tagCategory:'conjuntos', desc:'Blazer estructurado con hombreras sutiles y forro de satén. Poder y elegancia.', detail:'Blazer de corte impecable en paño de lana fría. Solapas en pico, bolsillos con tapa y botonadura dorada grabada. Incluye pantalón a juego.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(4).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.56%20PM%20(1).jpeg'] },
  { name:'Sol', price:'$340.000', tag:'Nuevo', tagCategory:'conjuntos', desc:'Conjunto primaveral en tonos pastel con texturas únicas. Frescura y estilo.', detail:'Top con mangas abullonadas en organza y falda midi plisada. Colores degradé que evocan un atardecer de primavera. Cintura ajustable con lazo.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(2).jpeg'] },
  { name:'Luna', price:'$480.000', tag:'Exclusivo', tagCategory:'vestidos', desc:'Vestido asimétrico con caída perfecta y detalles plateados. Misterio y glamour.', detail:'Vestido asimétrico en crepé de seda con un hombro descubierto. Detalles de cristales plateados en el hombro y cintura. Forro interior y cierre invisible.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(4).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(4).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(1).jpeg'] },
  { name:'Gardenia', price:'$410.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido midi con estampado floral y mangas abullonadas. Romanticismo puro.', detail:'Vestido midi en algodón egipcio con estampado floral exclusivo. Mangas abullonadas con elástico, escote corazón y falda con vuelo. Ideal para eventos diurnos.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.54%20PM.jpeg'] },
  { name:'Imperio', price:'$390.000', tag:'Exclusivo', tagCategory:'conjuntos', desc:'Conjunto elegante con pantalón palazzo y top con pedrería. Realeza moderna.', detail:'Top crop con pedrería cosida a mano y pantalón palazzo en crepé fluido. Talle alto que estiliza la figura. Disponible en varios colores.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(4).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.56%20PM.jpeg'] },
  { name:'Marfil', price:'$650.000', tag:'Edición Limitada', tagCategory:'gala', desc:'Vestido de alta costura en tono marfil con cristales Swarovski.', detail:'Obra maestra de alta costura. Corset estructurado con cristales Swarovski cosidos uno a uno. Falda en tul de seda con capas. Se entrega con funda de conservación.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(1).jpeg'] },
  { name:'Bohemia', price:'$260.000', tag:'Nuevo', tagCategory:'casual', desc:'Conjunto casual con inspiración boho y tejidos artesanales. Libertad y estilo.', detail:'Blusa en algodón con bordados étnicos y pantalón wide leg en lino. Cintura elástica con cordón. Fresco y versátil para el día a día.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(3).jpeg'] },
  { name:'Medianoche', price:'$780.000', tag:'Alta Costura', tagCategory:'gala', desc:'Vestido de gala en chiffon negro con bordados dorados hechos a mano.', detail:'Vestido de gala en chiffon negro con bordados en hilo dorado 24k. Escote halter con pedrería. Cola pequeña desmontable. Forro de seda.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.59%20PM.jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(4).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM.jpeg'] },
  { name:'Amanecer', price:'$430.000', tag:'Best Seller', tagCategory:'vestidos', desc:'Vestido cóctel con degradé de colores cálidos y vuelo elegante.', detail:'Vestido cóctel con técnica de degradé artesanal. Falda con capas de tul que crean movimiento. Cintura marcada con cinturón de raso. Ideal para eventos semi-formales.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(2).jpeg'] },
  { name:'Clemencia', price:'$890.000', tag:'Alta Costura', tagCategory:'alta-costura', desc:'Vestido de alta costura confeccionado completamente a mano. Una joya textil.', detail:'Alta costura en su máxima expresión. Confeccionado a mano durante 120 horas. Bordados tridimensionales, pedrería italiana y encaje francés. Pieza única numerada.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.54%20PM.jpeg'] },
  { name:'Serena', price:'$280.000', tag:'Nuevo', tagCategory:'casual', desc:'Conjunto casual elegante en lino con detalles de encaje. Comodidad refinada.', detail:'Camisa de lino con detalles de encaje en cuello y puños. Pantalón relaxed fit en lino. Conjunto perfecto para eventos diurnos elegantes o trabajo.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.56%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(2).jpeg'] },
  { name:'Ópalo', price:'$560.000', tag:'Exclusivo', tagCategory:'gala', desc:'Vestido de fiesta con detalles iridiscentes y transparencias. Magia visual.', detail:'Vestido con efecto iridiscente que cambia de color según la luz. Capas de organza con glitter integrado. Escote ilusión con transparencias. Espalda con lazo.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(4).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(1).jpeg'] },
  { name:'Eclipse', price:'$420.000', tag:'Edición Limitada', tagCategory:'conjuntos', desc:'Conjunto monocromático con juego de texturas y cortes asimétricos.', detail:'Conjunto de dos piezas en tonos negros con diferentes texturas: piel, encaje y satén. Top asimétrico y falda lápiz con abertura lateral. Look vanguardista.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.56%20PM.jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(4).jpeg'] },
  { name:'Coral', price:'$350.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido veraniego con estampado tropical y escote corazón. Verano eterno.', detail:'Vestido en viscosa con estampado tropical exclusivo. Escote corazón con varillas, espalda con elástico y falda con vuelo. Ideal para eventos de día y vacaciones.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(2).jpeg'] },
  { name:'Dalia', price:'$950.000', tag:'Alta Costura', tagCategory:'alta-costura', desc:'Vestido de novia en encaje francés con velo de tul bordado. Sueños hechos realidad.', detail:'Vestido de novia en encaje francés Calais. Corset con varillas internas, falda princesa en tul de seda. Velo catedral de 3 metros con bordados a juego. Incluye prueba y ajustes.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM.jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.54%20PM.jpeg'] },
  { name:'Atardecer', price:'$310.000', tag:'Best Seller', tagCategory:'casual', desc:'Conjunto casual chic con pantalón wide leg y blusa fluida. Tardes doradas.', detail:'Blusa en seda lavada con cuello lazo y pantalón wide leg en crepé. Cintura alta con botones forrados. Look effortless chic para cualquier ocasión.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.56%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.56%20PM.jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(1).jpeg'] },
  { name:'Azalea', price:'$370.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido cóctel con apliques florales y falda plisada un sueño en rosa.', detail:'Vestido cóctel con apliques florales 3D en organza. Falda plisada tipo acordeón que crea un efecto visual único. Cintura con cinturón de raso removible.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.56%20PM.jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(3).jpeg'] },
  { name:'Carmín', price:'$620.000', tag:'Exclusivo', tagCategory:'gala', desc:'Vestido de fiesta en rojo intenso con escote drapeado. Pasión en cada costura.', detail:'Vestido en crepé de seda rojo intenso. Escote drapeado estilo griego con hombro descubierto. Abertura lateral con pedrería. Forro interior y cierre invisible.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(4).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM.jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(4).jpeg'] },
  { name:'Magnolia', price:'$820.000', tag:'Alta Costura', tagCategory:'alta-costura', desc:'Vestido de alta costura con corset y falda de tul en capas. Obra maestra.', detail:'Corset con bordado de flores 3D en relieve. Falda en tul con más de 15 capas que crean volumen etéreo. Cintura de raso con moño. Incluye forro de seda.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.57%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.54%20PM.jpeg'] },
  { name:'Valentina', price:'$550.000', tag:'Firma', tagCategory:'conjuntos', desc:'Conjunto insignia de la marca con detalles artesanales únicos. El legado.', detail:'La pieza que lleva el nombre de la casa. Conjunto de saco y pantalón en tweed dorado con detalles de pasamanería. Botones de nácar genuino. Forro de seda estampada. Numerado.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(4).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(2).jpeg'] },
  { name:'Primavera', price:'$330.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido primaveral en colores vibrantes con vuelo romántico. Florece.', detail:'Vestido en popelina de algodón con estampado de acuarela. Escote cuadrado con elástico, mangas globo y falda amplia con bolsillos. Fresco, alegre y favorecedor.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.16%20PM%20(2).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.58%20PM%20(3).jpeg'] },
  { name:'Nieves', price:'$720.000', tag:'Firma', tagCategory:'gala', desc:'Vestido de gala en blanco roto con bordados de hilo dorado. Pureza y oro.', detail:'Vestido de gala en mikado blanco roto con bordados de hilo dorado 24k en escote y mangas. Falda con volumen arquitectónico. Espalda con botones forrados. La pieza más icónica.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.08.55%20PM.jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.18%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.59%20PM.jpeg'] },
  { name:'Gala Platinum', price:'$1.200.000', tag:'Alta Costura', tagCategory:'alta-costura', desc:'Vestido de alta costura en tonos metálicos. La máxima expresión del lujo.', detail:'Nuestra pieza más exclusiva. Vestido en lamé platinum con más de 5.000 cristales cosidos a mano. Cola de 1.5 metros. Se entrega con certificado de autenticidad y caja de conservación.', images:['img/WhatsApp%20Image%202026-05-13%20at%2011.13.18%20PM%20(1).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(3).jpeg','img/WhatsApp%20Image%202026-05-13%20at%2011.08.59%20PM.jpeg'] },
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWhatsApp();
  initScrollAnimations();
  initSearch();
  initSmoothScroll();
  initProductCards();
  initGoogleLogin();
  initOrderTracking();
  initAuthUI();
  initProductPage();
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
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));
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

    if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
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

function initProductCards() {
  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('h3')?.textContent || '';
      if (name) {
        window.location.href = `producto.html?p=${encodeURIComponent(name)}`;
      }
    });
  });
}

function initProductPage() {
  const productDetail = document.getElementById('productDetail');
  if (!productDetail) return;

  const params = new URLSearchParams(window.location.search);
  const productName = params.get('p');
  const product = VN_PRODUCTS.find(p => p.name === productName) || VN_PRODUCTS[0];

  document.title = `${product.name} | Valentina Niebles`;

  const galleryHTML = product.images.map((img, i) => `
    <div class="p-gallery-item ${i === 0 ? 'active' : ''}" data-idx="${i}">
      <img src="${img}" alt="${product.name} - Imagen ${i + 1}">
    </div>
  `).join('');

  const thumbsHTML = product.images.map((img, i) => `
    <div class="p-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
      <img src="${img}" alt="Miniatura ${i + 1}">
    </div>
  `).join('');

  productDetail.innerHTML = `
    <div class="container">
    <div class="p-gallery-container">
      <div class="p-gallery">${galleryHTML}</div>
      <div class="p-thumbs">${thumbsHTML}</div>
    </div>
    <div class="p-info">
      <p class="p-breadcrumb"><a href="coleccion.html">Colección</a> / <span>${product.name}</span></p>
      <span class="p-tag">${product.tag}</span>
      <h1>${product.name}</h1>
      <p class="p-price">${product.price} COP</p>
      <p class="p-desc">${product.desc}</p>
      <p class="p-detail">${product.detail}</p>

      <div class="p-form">
        <div class="p-form-row">
          <div class="p-form-group">
            <label>Talla</label>
            <select id="pSize">
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M" selected>M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="Personalizada">A Medida</option>
            </select>
          </div>
          <div class="p-form-group">
            <label>Cantidad</label>
            <div class="p-qty">
              <button type="button" id="qtyMinus"><i class="bi bi-dash"></i></button>
              <input type="number" id="pQty" value="1" min="1" max="10" readonly>
              <button type="button" id="qtyPlus"><i class="bi bi-plus"></i></button>
            </div>
          </div>
        </div>
        <button class="p-buy-btn" id="btnComprar"><i class="bi bi-bag-check"></i> Comprar Ahora</button>
        <button class="p-wsp-btn" onclick="window.open('https://wa.me/573245947260?text=Hola%20Valentina,%20quiero%20info%20sobre%20${encodeURIComponent(product.name)}','_blank')"><i class="bi bi-whatsapp"></i> Consultar por WhatsApp</button>
      </div>
    </div>
    </div>
  `;

  document.querySelectorAll('.p-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = thumb.dataset.idx;
      document.querySelectorAll('.p-gallery-item, .p-thumb').forEach(el => el.classList.remove('active'));
      document.querySelector(`.p-gallery-item[data-idx="${idx}"]`)?.classList.add('active');
      thumb.classList.add('active');
    });
  });

  let qty = 1;
  document.getElementById('qtyMinus').addEventListener('click', () => { if (qty > 1) { qty--; document.getElementById('pQty').value = qty; } });
  document.getElementById('qtyPlus').addEventListener('click', () => { if (qty < 10) { qty++; document.getElementById('pQty').value = qty; } });

  document.getElementById('btnComprar').addEventListener('click', () => {
    openPaymentModal(product);
  });
}

function openPaymentModal(product) {
  removeExistingModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal payment-modal">
      <button class="modal-close"><i class="bi bi-x-lg"></i></button>
      <div class="payment-container">
        <p class="section-subtitle" style="text-align:left;">Finalizar Compra</p>
        <h2 style="font-size:2rem;margin-bottom:1.5rem;">Datos de Pago</h2>

        <div class="payment-summary">
          <img src="${product.images[0]}" alt="${product.name}">
          <div>
            <h4>${product.name}</h4>
            <p class="payment-summary-price">${product.price}</p>
            <p class="payment-summary-detail">Talla: <span id="summarySize">M</span> · Cant: <span id="summaryQty">1</span></p>
          </div>
        </div>

        <form id="paymentForm" style="display:flex;flex-direction:column;gap:0.9rem;">
          <div class="modal-form-row">
            <div><label>Nombre Completo</label><input type="text" id="payName" placeholder="Tu nombre" required></div>
            <div><label>Correo</label><input type="email" id="payEmail" placeholder="tucorreo@email.com" required></div>
          </div>
          <div class="modal-form-row">
            <div><label>Teléfono</label><input type="tel" id="payPhone" placeholder="+57 300 000 0000" required></div>
            <div><label>Documento</label><input type="text" id="payDoc" placeholder="CC / NIT" required></div>
          </div>
          <div><label>Dirección de Envío</label><input type="text" id="payAddress" placeholder="Dirección completa" required></div>

          <label>Método de Pago</label>
          <div class="payment-methods" id="payMethods">
            <div class="payment-method selected" data-method="transferencia"><i class="bi bi-bank"></i> Transferencia</div>
            <div class="payment-method" data-method="nequi"><i class="bi bi-phone"></i> Nequi</div>
            <div class="payment-method" data-method="efectivo"><i class="bi bi-cash"></i> Efectivo</div>
            <div class="payment-method" data-method="tarjeta"><i class="bi bi-credit-card"></i> Tarjeta</div>
          </div>

          <div id="cardFields" style="display:none;flex-direction:column;gap:0.8rem;">
            <div><label>Número de Tarjeta</label><input type="text" id="cardNumber" placeholder="0000 0000 0000 0000"></div>
            <div class="modal-form-row">
              <div><label>Vencimiento</label><input type="text" id="cardExpiry" placeholder="MM/AA"></div>
              <div><label>CVV</label><input type="text" id="cardCVV" placeholder="123"></div>
            </div>
            <div><label>Titular</label><input type="text" id="cardHolder" placeholder="Nombre en la tarjeta"></div>
          </div>

          <button type="submit" class="modal-submit"><i class="bi bi-lock-fill"></i> Pagar y Confirmar Pedido</button>
        </form>

        <div class="modal-success" id="paySuccess">
          <i class="bi bi-check-circle-fill"></i>
          <h3>¡Pedido Confirmado!</h3>
          <p>Tu pedido ha sido registrado exitosamente.</p>
          <span class="order-id" id="orderIdDisplay"></span>
          <p style="font-size:0.8rem;color:var(--text-light);margin-bottom:1rem;">Te enviaremos actualizaciones a tu correo.</p>
          <a href="pedidos.html" class="btn btn-primary"><i class="bi bi-truck"></i> Ver Mis Pedidos</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => overlay.classList.add('active'));

  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);

  const summarySize = overlay.querySelector('#summarySize');
  const summaryQty = overlay.querySelector('#summaryQty');

  try {
    const sizeEl = document.getElementById('pSize');
    const qtyEl = document.getElementById('pQty');
    if (sizeEl) summarySize.textContent = sizeEl.value;
    if (qtyEl) summaryQty.textContent = qtyEl.value;
  } catch(e) {}

  overlay.querySelectorAll('#payMethods .payment-method').forEach(method => {
    method.addEventListener('click', () => {
      overlay.querySelectorAll('#payMethods .payment-method').forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');
      const cardFields = overlay.querySelector('#cardFields');
      cardFields.style.display = method.dataset.method === 'tarjeta' ? 'flex' : 'none';
    });
  });

  overlay.querySelector('#paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const payment = overlay.querySelector('#payMethods .payment-method.selected')?.dataset.method || 'transferencia';
    const orderId = 'VN-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2,6).toUpperCase();

    let size = 'M', qty = '1';
    try {
      const sizeEl = document.getElementById('pSize');
      const qtyEl = document.getElementById('pQty');
      if (sizeEl) size = sizeEl.value;
      if (qtyEl) qty = qtyEl.value;
    } catch(e) {}

    const order = {
      id: orderId,
      product: product.name,
      img: product.images[0],
      price: product.price,
      name: overlay.querySelector('#payName').value,
      email: overlay.querySelector('#payEmail').value,
      size, qty,
      address: overlay.querySelector('#payAddress').value,
      payment,
      status: 'recibido',
      statusStep: 0,
      date: new Date().toISOString(),
      estimatedDays: payment === 'tarjeta' ? 7 + Math.floor(Math.random()*5) : 10 + Math.floor(Math.random()*8),
    };

    const orders = JSON.parse(localStorage.getItem('vn_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('vn_orders', JSON.stringify(orders));

    overlay.querySelector('#paymentForm').style.display = 'none';
    const success = overlay.querySelector('#paySuccess');
    success.classList.add('active');
    overlay.querySelector('#orderIdDisplay').textContent = '#' + orderId;

    const msg = `Hola Valentina! Acabo de realizar un pedido:\n- ${product.name}\n- Pedido: #${orderId}\n- Pago: ${payment}`;
    window.open(`https://wa.me/573245947260?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 400);
  }
}

function removeExistingModal() {
  const existing = document.querySelector('.modal-overlay');
  if (existing) { existing.parentNode.removeChild(existing); document.body.style.overflow = ''; }
}

function initGoogleLogin() {
  const loginBtn = document.getElementById('googleLoginBtn');
  if (!loginBtn) return;
  loginBtn.addEventListener('click', () => googleLogin());
  const savedUser = JSON.parse(localStorage.getItem('vn_user') || 'null');
  if (savedUser) updateLoginUI(savedUser);
}

function googleLogin() {
  if (typeof google !== 'undefined' && google.accounts) {
    const clientId = '726831035289-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com';
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId, scope: 'email profile',
      callback: (response) => {
        if (response.access_token) {
          fetch('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${response.access_token}` } })
          .then(res => res.json()).then(data => {
            const user = { name: data.name, email: data.email, picture: data.picture };
            localStorage.setItem('vn_user', JSON.stringify(user));
            updateLoginUI(user);
          }).catch(() => simulateLogin());
        }
      },
      error_callback: () => simulateLogin()
    });
    tokenClient.requestAccessToken();
  } else { simulateLogin(); }
}

function simulateLogin() {
  const user = { name: 'Cliente Especial', email: 'cliente@email.com', picture: 'https://ui-avatars.com/api/?name=Cliente+Especial&background=632432&color=F2E5A1&size=80&font-size=0.4' };
  localStorage.setItem('vn_user', JSON.stringify(user));
  updateLoginUI(user);
}

function updateLoginUI(user) {
  const loginBtn = document.getElementById('googleLoginBtn');
  const userDisplay = document.getElementById('userDisplay');
  if (!loginBtn || !userDisplay) return;
  loginBtn.style.display = 'none';
  userDisplay.classList.add('active');
  userDisplay.querySelector('.login-name').textContent = user.name;
  const avatar = userDisplay.querySelector('.login-avatar');
  if (avatar && user.picture) avatar.src = user.picture;
}

function initAuthUI() {
  const savedUser = JSON.parse(localStorage.getItem('vn_user') || 'null');
  if (savedUser) {
    const loginBtn = document.getElementById('googleLoginBtn');
    const userDisplay = document.getElementById('userDisplay');
    if (loginBtn && userDisplay) updateLoginUI(savedUser);
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('#logoutBtn')) {
      localStorage.removeItem('vn_user');
      const loginBtn = document.getElementById('googleLoginBtn');
      const userDisplay = document.getElementById('userDisplay');
      if (loginBtn && userDisplay) { loginBtn.style.display = ''; userDisplay.classList.remove('active'); }
    }
  });
}

function initOrderTracking() {
  const trackingList = document.getElementById('trackingList');
  if (!trackingList) return;

  const orders = JSON.parse(localStorage.getItem('vn_orders') || '[]');

  if (orders.length === 0) {
    trackingList.innerHTML = `<div class="no-orders"><i class="bi bi-inbox"></i><h3>Aún no tienes pedidos</h3><p>Explora nuestra colección y haz tu primer pedido.</p><a href="coleccion.html" class="btn btn-primary"><i class="bi bi-grid"></i> Ver Colección</a></div>`;
    return;
  }

  const statuses = [
    { label: 'Recibido', icon: 'bi-inbox' },
    { label: 'En Proceso', icon: 'bi-gear' },
    { label: 'Confección', icon: 'bi-scissors' },
    { label: 'Envío', icon: 'bi-truck' },
    { label: 'Entregado', icon: 'bi-box-seam' }
  ];
  const statusClasses = ['status-recibido','status-proceso','status-confeccion','status-enviado','status-entregado'];

  trackingList.innerHTML = orders.map(order => {
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    const currentStep = order.statusStep || 0;
    const estDelivery = new Date(orderDate.getTime() + order.estimatedDays * 86400000);
    const formattedEst = estDelivery.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    const timelineHTML = statuses.map((status, i) => {
      let stepClass = i < currentStep ? 'completed' : i === currentStep ? 'current' : '';
      return `<div class="timeline-step ${stepClass}"><div class="timeline-dot"><i class="bi ${status.icon}"></i></div><span class="timeline-label">${status.label}</span></div>`;
    }).join('');

    return `<div class="tracking-card fade-in">
      <div class="tracking-card-header"><div><h3>${order.product}</h3><span class="tracking-order-id">#${order.id}</span></div><span class="tracking-status-badge ${statusClasses[currentStep]}">${statuses[currentStep].label}</span></div>
      <div class="tracking-timeline">${timelineHTML}</div>
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:0.8rem;color:var(--text-medium);"><span><i class="bi bi-box"></i> Talla: ${order.size} · Cant: ${order.qty}</span><span><i class="bi bi-credit-card"></i> Pago: ${order.payment}</span><span><i class="bi bi-calendar"></i> Pedido: ${formattedDate}</span></div>
      <div class="tracking-estimate"><i class="bi bi-clock"></i> Entrega estimada: <strong>${formattedEst}</strong> (${order.estimatedDays} días hábiles)</div>
    </div>`;
  }).join('');
}
