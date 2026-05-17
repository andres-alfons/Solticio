const VN_PRODUCTS = [
  { name:'Aurora', price:'$450.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido largo en seda natural con bordados florales hechos a mano. Una pieza que evoca la delicadeza de un amanecer.', detail:'Confeccionado en seda 100% natural, este vestido largo presenta bordados florales realizados íntegramente a mano por artesanas locales. Forro interior de algodón para máxima comodidad. Cierre invisible en espalda.', images:[] },
  { name:'Esmeralda', price:'$380.000', tag:'Exclusivo', tagCategory:'conjuntos', desc:'Conjunto de dos piezas con detalles dorados y corte moderno. Sofisticación para la mujer contemporánea.', detail:'Blazer entallado con botones dorados y pantalón de corte recto. Tejido de gabardina premium con forro de satén. Hombreras sutiles que estilizan la silueta.', images:[] },
  { name:'Noche Eterna', price:'$520.000', tag:'Best Seller', tagCategory:'vestidos', desc:'Vestido de gala en tonos profundos, ideal para eventos nocturnos donde quieres deslumbrar.', detail:'Vestido largo en chiffon con capas superpuestas que crean un efecto etéreo. Escote en V profundo con pedrería sutil. Espalda descubierta con tirantes cruzados.', images:[] },
  { name:'Real', price:'$290.000', tag:'Edición Limitada', tagCategory:'conjuntos', desc:'Blazer estructurado con hombreras sutiles y forro de satén. Poder y elegancia.', detail:'Blazer de corte impecable en paño de lana fría. Solapas en pico, bolsillos con tapa y botonadura dorada grabada. Incluye pantalón a juego.', images:[] },
  { name:'Sol', price:'$340.000', tag:'Nuevo', tagCategory:'conjuntos', desc:'Conjunto primaveral en tonos pastel con texturas únicas. Frescura y estilo.', detail:'Top con mangas abullonadas en organza y falda midi plisada. Colores degradé que evocan un atardecer de primavera. Cintura ajustable con lazo.', images:[] },
  { name:'Luna', price:'$480.000', tag:'Exclusivo', tagCategory:'vestidos', desc:'Vestido asimétrico con caída perfecta y detalles plateados. Misterio y glamour.', detail:'Vestido asimétrico en crepé de seda con un hombro descubierto. Detalles de cristales plateados en el hombro y cintura. Forro interior y cierre invisible.', images:[] },
  { name:'Gardenia', price:'$410.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido midi con estampado floral y mangas abullonadas. Romanticismo puro.', detail:'Vestido midi en algodón egipcio con estampado floral exclusivo. Mangas abullonadas con elástico, escote corazón y falda con vuelo. Ideal para eventos diurnos.', images:[] },
  { name:'Imperio', price:'$390.000', tag:'Exclusivo', tagCategory:'conjuntos', desc:'Conjunto elegante con pantalón palazzo y top con pedrería. Realeza moderna.', detail:'Top crop con pedrería cosida a mano y pantalón palazzo en crepé fluido. Talle alto que estiliza la figura. Disponible en varios colores.', images:[] },
  { name:'Marfil', price:'$650.000', tag:'Edición Limitada', tagCategory:'gala', desc:'Vestido de alta costura en tono marfil con cristales Swarovski.', detail:'Obra maestra de alta costura. Corset estructurado con cristales Swarovski cosidos uno a uno. Falda en tul de seda con capas. Se entrega con funda de conservación.', images:[] },
  { name:'Bohemia', price:'$260.000', tag:'Nuevo', tagCategory:'casual', desc:'Conjunto casual con inspiración boho y tejidos artesanales. Libertad y estilo.', detail:'Blusa en algodón con bordados étnicos y pantalón wide leg en lino. Cintura elástica con cordón. Fresco y versátil para el día a día.', images:[] },
  { name:'Medianoche', price:'$780.000', tag:'Alta Costura', tagCategory:'gala', desc:'Vestido de gala en chiffon negro con bordados dorados hechos a mano.', detail:'Vestido de gala en chiffon negro con bordados en hilo dorado 24k. Escote halter con pedrería. Cola pequeña desmontable. Forro de seda.', images:[] },
  { name:'Amanecer', price:'$430.000', tag:'Best Seller', tagCategory:'vestidos', desc:'Vestido cóctel con degradé de colores cálidos y vuelo elegante.', detail:'Vestido cóctel con técnica de degradé artesanal. Falda con capas de tul que crean movimiento. Cintura marcada con cinturón de raso. Ideal para eventos semi-formales.', images:[] },
  { name:'Clemencia', price:'$890.000', tag:'Alta Costura', tagCategory:'alta-costura', desc:'Vestido de alta costura confeccionado completamente a mano. Una joya textil.', detail:'Alta costura en su máxima expresión. Confeccionado a mano durante 120 horas. Bordados tridimensionales, pedrería italiana y encaje francés. Pieza única numerada.', images:[] },
  { name:'Serena', price:'$280.000', tag:'Nuevo', tagCategory:'casual', desc:'Conjunto casual elegante en lino con detalles de encaje. Comodidad refinada.', detail:'Camisa de lino con detalles de encaje en cuello y puños. Pantalón relaxed fit en lino. Conjunto perfecto para eventos diurnos elegantes o trabajo.', images:[] },
  { name:'Ópalo', price:'$560.000', tag:'Exclusivo', tagCategory:'gala', desc:'Vestido de fiesta con detalles iridiscentes y transparencias. Magia visual.', detail:'Vestido con efecto iridiscente que cambia de color según la luz. Capas de organza con glitter integrado. Escote ilusión con transparencias. Espalda con lazo.', images:[] },
  { name:'Eclipse', price:'$420.000', tag:'Edición Limitada', tagCategory:'conjuntos', desc:'Conjunto monocromático con juego de texturas y cortes asimétricos.', detail:'Conjunto de dos piezas en tonos negros con diferentes texturas: piel, encaje y satén. Top asimétrico y falda lápiz con abertura lateral. Look vanguardista.', images:[] },
  { name:'Coral', price:'$350.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido veraniego con estampado tropical y escote corazón. Verano eterno.', detail:'Vestido en viscosa con estampado tropical exclusivo. Escote corazón con varillas, espalda con elástico y falda con vuelo. Ideal para eventos de día y vacaciones.', images:[] },
  { name:'Dalia', price:'$950.000', tag:'Alta Costura', tagCategory:'alta-costura', desc:'Vestido de novia en encaje francés con velo de tul bordado. Sueños hechos realidad.', detail:'Vestido de novia en encaje francés Calais. Corset con varillas internas, falda princesa en tul de seda. Velo catedral de 3 metros con bordados a juego. Incluye prueba y ajustes.', images:[] },
  { name:'Atardecer', price:'$310.000', tag:'Best Seller', tagCategory:'casual', desc:'Conjunto casual chic con pantalón wide leg y blusa fluida. Tardes doradas.', detail:'Blusa en seda lavada con cuello lazo y pantalón wide leg en crepé. Cintura alta con botones forrados. Look effortless chic para cualquier ocasión.', images:[] },
  { name:'Azalea', price:'$370.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido cóctel con apliques florales y falda plisada un sueño en rosa.', detail:'Vestido cóctel con apliques florales 3D en organza. Falda plisada tipo acordeón que crea un efecto visual único. Cintura con cinturón de raso removible.', images:[] },
  { name:'Carmín', price:'$620.000', tag:'Exclusivo', tagCategory:'gala', desc:'Vestido de fiesta en rojo intenso con escote drapeado. Pasión en cada costura.', detail:'Vestido en crepé de seda rojo intenso. Escote drapeado estilo griego con hombro descubierto. Abertura lateral con pedrería. Forro interior y cierre invisible.', images:[] },
  { name:'Magnolia', price:'$820.000', tag:'Alta Costura', tagCategory:'alta-costura', desc:'Vestido de alta costura con corset y falda de tul en capas. Obra maestra.', detail:'Corset con bordado de flores 3D en relieve. Falda en tul con más de 15 capas que crean volumen etéreo. Cintura de raso con moño. Incluye forro de seda.', images:[] },
  { name:'Valentina', price:'$550.000', tag:'Firma', tagCategory:'conjuntos', desc:'Conjunto insignia de la marca con detalles artesanales únicos. El legado.', detail:'La pieza que lleva el nombre de la casa. Conjunto de saco y pantalón en tweed dorado con detalles de pasamanería. Botones de nácar genuino. Forro de seda estampada. Numerado.', images:[] },
  { name:'Primavera', price:'$330.000', tag:'Nuevo', tagCategory:'vestidos', desc:'Vestido primaveral en colores vibrantes con vuelo romántico. Florece.', detail:'Vestido en popelina de algodón con estampado de acuarela. Escote cuadrado con elástico, mangas globo y falda amplia con bolsillos. Fresco, alegre y favorecedor.', images:[] },
  { name:'Nieves', price:'$720.000', tag:'Firma', tagCategory:'gala', desc:'Vestido de gala en blanco roto con bordados de hilo dorado. Pureza y oro.', detail:'Vestido de gala en mikado blanco roto con bordados de hilo dorado 24k en escote y mangas. Falda con volumen arquitectónico. Espalda con botones forrados. La pieza más icónica.', images:[] },
  { name:'Gala Platinum', price:'$1.200.000', tag:'Alta Costura', tagCategory:'alta-costura', desc:'Vestido de alta costura en tonos metálicos. La máxima expresión del lujo.', detail:'Nuestra pieza más exclusiva. Vestido en lamé platinum con más de 5.000 cristales cosidos a mano. Cola de 1.5 metros. Se entrega con certificado de autenticidad y caja de conservación.', images:[] },
];

const SUPABASE_STORAGE_URL = 'https://lyhyvmnqvkcvoddaqusa.supabase.co/storage/v1/object/public/product-images';

async function loadProductImages() {
  try {
    const supabase = getSupabase();
    const { data: images, error } = await supabase
      .from('product_images')
      .select('product_id, image_url, sort_order, is_primary')
      .order('sort_order', { ascending: true });

    if (error || !images) return;

    const { data: products } = await supabase.from('products').select('id, name');
    if (!products) return;

    const nameToId = {};
    products.forEach(p => { nameToId[p.name.toLowerCase()] = p.id; });

    const imagesByProduct = {};
    images.forEach(img => {
      if (!imagesByProduct[img.product_id]) imagesByProduct[img.product_id] = [];
      imagesByProduct[img.product_id].push(img.image_url);
    });

    VN_PRODUCTS.forEach(product => {
      const productId = nameToId[product.name.toLowerCase()];
      if (productId && imagesByProduct[productId]) {
        product.images = imagesByProduct[productId];
      }
    });
  } catch (e) {
    console.warn('Could not load product images from Supabase:', e);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadProductImages();
  initNavbar();
  initWhatsApp();
  initScrollAnimations();
  initSearch();
  initSmoothScroll();
  initProductCards();
  initOrderTracking();
  initProductPage();
  initChatbot();
  initNotifications();
  initCart();
  updateAuthUI();
  updateProductPrices();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (!navbar || !toggle || !links) return;

  let mobileOverlay = null;

  function createOverlay() {
    if (!mobileOverlay) {
      mobileOverlay = document.createElement('div');
      mobileOverlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:998;opacity:0;transition:opacity 0.3s ease;pointer-events:none;';
      document.body.appendChild(mobileOverlay);
    }
    return mobileOverlay;
  }

  function openMobileMenu() {
    links.classList.add('active');
    const overlay = createOverlay();
    requestAnimationFrame(() => { overlay.style.opacity = '1'; overlay.style.pointerEvents = 'auto'; });
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    links.classList.remove('active');
    const overlay = createOverlay();
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';
    const mobileUserMenu = document.getElementById('mobileUserMenu');
    const mobileUserDisplay = document.getElementById('mobileUserDisplay');
    if (mobileUserMenu) mobileUserMenu.classList.remove('open');
    if (mobileUserDisplay) mobileUserDisplay.classList.remove('open');
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  toggle.addEventListener('click', () => {
    if (links.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  links.querySelectorAll('a:not(#mobileUserDisplay *)').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  const overlay = createOverlay();
  overlay.addEventListener('click', () => {
    closeMobileMenu();
  });

  const closeBtn = links.querySelector('.nav-close-mobile');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

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
  const message = encodeURIComponent('Hola Valentina Niebles, me encantaría saber más sobre tus diseños');
  const wspLink = `https://wa.me/${phone}?text=${message}`;

  const container = document.createElement('div');
  container.className = 'wsp-container';
  container.innerHTML = `
    <div class="wsp-aura"></div>
    <a href="${wspLink}" target="_blank" rel="noopener noreferrer" class="wsp-btn" aria-label="Contactar por WhatsApp">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
    card.addEventListener('click', (e) => {
      if (e.target.closest('.collection-card-add-cart')) return;
      const name = card.querySelector('h3')?.textContent || '';
      if (name) {
        window.location.href = `producto.html?p=${encodeURIComponent(name)}`;
      }
    });
  });

  document.querySelectorAll('.collection-card-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      const img = btn.dataset.img;
      const product = {
        name: name,
        finalPrice: price,
        finalPriceFormatted: '$' + price.toLocaleString('es-CO'),
        images: [img]
      };
      Cart.addItem(product, 'M', 1);
      showToast('Añadido al carrito', `${name} (Talla: M, Cant: 1)`, 'success');
    });
  });
}

async function updateProductPrices() {
  const cards = document.querySelectorAll('.collection-card');
  if (!cards.length) return;

  try {
    const supabase = getSupabase();
    const dbProducts = await DataStore.getProducts();
    if (!dbProducts || dbProducts.length === 0) return;

    const productMap = {};
    dbProducts.forEach(p => {
      productMap[p.name.toLowerCase()] = {
        price: Number(p.price),
        discount: Number(p.discount_percentage || p.discount || 0)
      };
    });

    cards.forEach(card => {
      const nameEl = card.querySelector('h3');
      if (!nameEl) return;
      const name = nameEl.textContent.trim().toLowerCase();
      const dbProduct = productMap[name];
      if (!dbProduct) return;

      const priceContainer = card.querySelector('.collection-card-price');
      const priceParagraph = card.querySelector('.collection-card-body .price');
      if (!priceContainer && !priceParagraph) return;

      const rawPrice = dbProduct.price;
      const discount = dbProduct.discount;
      const finalPrice = discount > 0 ? Math.round(rawPrice * (1 - discount / 100)) : rawPrice;

      const priceFormatted = '$' + rawPrice.toLocaleString('es-CO');
      const finalFormatted = '$' + finalPrice.toLocaleString('es-CO');

      if (discount > 0) {
        let discountBadge = card.querySelector('.collection-card-discount');
        if (!discountBadge) {
          const imgContainer = card.querySelector('.collection-card-img');
          if (imgContainer) {
            discountBadge = document.createElement('span');
            discountBadge.className = 'collection-card-discount';
            imgContainer.appendChild(discountBadge);
          }
        }
        if (discountBadge) {
          discountBadge.textContent = `-${discount}%`;
          discountBadge.style.display = '';
        }

        if (priceContainer) {
          priceContainer.innerHTML = `
            <span class="collection-card-price-original">${priceFormatted}</span>
            <span class="collection-card-price-final">${finalFormatted}</span>
          `;
        }
        if (priceParagraph) {
          priceParagraph.innerHTML = `
            <span class="collection-card-price-original" style="font-size:0.85rem;">${priceFormatted}</span>
            <span class="collection-card-price-final" style="margin-left:0.4rem;">${finalFormatted}</span>
          `;
        }
      } else {
        const discountBadge = card.querySelector('.collection-card-discount');
        if (discountBadge) discountBadge.style.display = 'none';

        if (priceContainer) {
          priceContainer.innerHTML = `<span class="collection-card-price-final" style="color:var(--gold);">${priceFormatted}</span>`;
        }
        if (priceParagraph) {
          priceParagraph.textContent = `Desde ${priceFormatted}`;
        }
      }
    });
  } catch (e) {
    console.warn('Could not update product prices from Supabase:', e.message);
  }
}

async function initProductPage() {
  const productDetail = document.getElementById('productDetail');
  if (!productDetail) return;

  const params = new URLSearchParams(window.location.search);
  const productName = params.get('p');

  let product = null;
  try {
    const supabase = getSupabase();
    const supabaseProducts = await DataStore.getProducts({ search: productName });
    if (supabaseProducts.length > 0) {
      const dbProduct = supabaseProducts.find(p => p.name.toLowerCase() === productName?.toLowerCase()) || supabaseProducts[0];
      const rawPrice = Number(dbProduct.price);
      const discount = Number(dbProduct.discount_percentage || dbProduct.discount || 0);
      const finalPrice = discount > 0 ? Math.round(rawPrice * (1 - discount / 100)) : rawPrice;

      let images = [];
      if (dbProduct.images && dbProduct.images.length > 0) {
        images = dbProduct.images;
      } else if (dbProduct.image_url) {
        images = [dbProduct.image_url];
      }

      if (dbProduct.id && supabase) {
        try {
          const { data: productImages } = await supabase
            .from('product_images')
            .select('image_url')
            .eq('product_id', dbProduct.id)
            .order('sort_order', { ascending: true });
          if (productImages && productImages.length > 0) {
            images = productImages.map(img => img.image_url);
          }
        } catch (e) {
          console.warn('Could not load product images:', e.message);
        }
      }

      product = {
        id: dbProduct.id,
        name: dbProduct.name,
        price: rawPrice,
        finalPrice: finalPrice,
        discountPercent: discount,
        priceFormatted: '$' + rawPrice.toLocaleString('es-CO'),
        finalPriceFormatted: '$' + finalPrice.toLocaleString('es-CO'),
        tag: dbProduct.tags?.[0] || dbProduct.category || '',
        tagCategory: dbProduct.category,
        desc: dbProduct.description || '',
        detail: dbProduct.description_long || '',
        images: images.length > 0 ? images : ['img/WhatsApp%20Image%202026-05-13%20at%2011.13.18%20PM%20(1).jpeg'],
        discount_percentage: discount
      };
    }
  } catch (e) { console.warn('Could not load from Supabase, falling back to local:', e.message); }

  if (!product) {
    const local = VN_PRODUCTS.find(p => p.name === productName) || VN_PRODUCTS[0];
    const rawPrice = parseInt(local.price.replace(/\D/g, ''));
    const discount = local.discount_percentage || local.discount || 0;
    const finalPrice = discount > 0 ? Math.round(rawPrice * (1 - discount / 100)) : rawPrice;
    product = {
      name: local.name,
      price: rawPrice,
      finalPrice: finalPrice,
      discountPercent: discount,
      priceFormatted: local.price,
      finalPriceFormatted: '$' + finalPrice.toLocaleString('es-CO'),
      tag: local.tag,
      tagCategory: local.tagCategory,
      desc: local.desc,
      detail: local.detail,
      images: local.images.length > 0 ? local.images : ['img/WhatsApp%20Image%202026-05-13%20at%2011.13.18%20PM%20(1).jpeg'],
      discount_percentage: discount
    };
  }

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
      <div class="p-price-container">
        ${product.discountPercent > 0 ? `<span class="p-price-original">${product.priceFormatted} COP</span>` : ''}
        <p class="p-price">${product.discountPercent > 0 ? product.finalPriceFormatted : product.priceFormatted} COP</p>
        ${product.discountPercent > 0 ? `<span class="p-discount-badge">-${product.discountPercent}%</span>` : ''}
      </div>
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
        <div class="p-buy-row">
          <button class="p-buy-btn p-buy-now" id="btnComprar"><i class="bi bi-bag-check"></i> Comprar Ahora</button>
          <button class="p-buy-btn p-buy-cart" id="btnAddCart"><i class="bi bi-cart-plus"></i></button>
        </div>
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
    if (!Auth.isLoggedIn()) {
      showToast('Iniciar sesión requerido', 'Debes iniciar sesión para realizar una compra', 'warning');
      setTimeout(() => { window.location.href = 'auth/login.html'; }, 1500);
      return;
    }
    openPaymentModal(product);
  });

  document.getElementById('btnAddCart').addEventListener('click', () => {
    const size = document.getElementById('pSize')?.value || 'M';
    Cart.addItem(product, size, qty);
    showToast('Añadido al carrito', `${product.name} (Talla: ${size}, Cant: ${qty})`, 'success');
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
            <p class="payment-summary-price">${product.discountPercent > 0 ? product.finalPriceFormatted : product.priceFormatted}</p>
            ${product.discountPercent > 0 ? `<p style="font-size:0.8rem;color:#22c55e;margin-top:2px;">Ahorras $${(product.price - product.finalPrice).toLocaleString('es-CO')} (-${product.discountPercent}%)</p>` : ''}
            <p class="payment-summary-detail">Talla: <span id="summarySize">M</span> · Cant: <span id="summaryQty">1</span></p>
          </div>
        </div>

        <form id="paymentForm" style="display:flex;flex-direction:column;gap:1.1rem;">
          <div class="modal-form-row">
            <div><label>Nombre Completo</label><input type="text" id="payName" placeholder="Tu nombre" required></div>
            <div><label>Correo</label><input type="email" id="payEmail" placeholder="tucorreo@email.com" required></div>
          </div>
          <div class="modal-form-row">
            <div>
              <label>Teléfono</label>
              <div style="display:flex;gap:6px;">
                <select id="payPhoneCode" style="width:100px;padding:10px 8px;background:var(--modal-bg, #1a1a2e);border:1px solid var(--modal-border, #333);border-radius:8px;color:var(--modal-text, #fff);font-size:13px;appearance:auto;">
                  <option value="+57">+57 🇨🇴</option>
                  <option value="+54">+54 🇦🇷</option>
                  <option value="+591">+591 🇧🇴</option>
                  <option value="+56">+56 🇨🇱</option>
                  <option value="+593">+593 🇪🇨</option>
                  <option value="+52">+52 🇲🇽</option>
                  <option value="+595">+595 🇵🇾</option>
                  <option value="+51">+51 🇵🇪</option>
                  <option value="+598">+598 🇺🇾</option>
                  <option value="+58">+58 🇻🇪</option>
                  <option value="+1">+1 🇺🇸</option>
                  <option value="+34">+34 🇪🇸</option>
                </select>
                <input type="tel" id="payPhone" placeholder="300 000 0000" maxlength="10" style="flex:1;" required>
              </div>
            </div>
            <div><label>Documento</label><input type="text" id="payDoc" placeholder="CC / NIT" required></div>
          </div>
          <div class="form-field"><label>Dirección de Envío</label><input type="text" id="payAddress" placeholder="Dirección completa" required></div>

          <div class="form-field">
            <label>Método de Pago</label>
            <div class="payment-methods" id="payMethods">
              <div class="payment-method selected" data-method="transferencia"><i class="bi bi-bank"></i> Transferencia</div>
              <div class="payment-method" data-method="nequi"><i class="bi bi-phone"></i> Nequi</div>
              <div class="payment-method" data-method="efectivo"><i class="bi bi-cash"></i> Efectivo</div>
            </div>
          </div>

          <button type="submit" class="modal-submit"><i class="bi bi-lock-fill"></i> Pagar y Confirmar Pedido</button>
        </form>

        <div class="modal-success" id="paySuccess">
          <i class="bi bi-check-circle-fill"></i>
          <h3>¡Pedido Confirmado!</h3>
          <p>Tu pedido ha sido registrado exitosamente.</p>
          <span class="order-id" id="orderIdDisplay"></span>
          <p style="font-size:0.8rem;color:var(--text-light);margin-bottom:1rem;">Te enviaremos actualizaciones a tu correo.</p>
          <a href="account/mis-pedidos.html" class="btn btn-primary"><i class="bi bi-truck"></i> Ver Mis Pedidos</a>
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
    });
  });

  overlay.querySelector('#paymentForm').addEventListener('submit', async (e) => {
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

    const currentUser = Auth.getCurrentUser();
    const orderData = {
      id: orderId,
      userId: currentUser ? currentUser.id : null,
      client: overlay.querySelector('#payName').value,
      email: currentUser ? currentUser.email : overlay.querySelector('#payEmail').value,
      phone: (overlay.querySelector('#payPhoneCode')?.value || '+57') + ' ' + (overlay.querySelector('#payPhone')?.value || ''),
      doc: overlay.querySelector('#payDoc')?.value || '',
      products: [{ name: product.name, qty: parseInt(qty), price: product.finalPrice || product.price, size, color: '' }],
      total: (product.finalPrice || product.price) * parseInt(qty),
      status: 'pendiente',
      payment,
      address: overlay.querySelector('#payAddress').value,
      notes: '',
      tracking: '',
      carrier: ''
    };

    await DataStore.createOrder(orderData);

    if (currentUser) {
      await DataStore.createNotification({
        userId: currentUser.id,
        type: 'order_update',
        title: 'Pedido Confirmado!',
        message: `Tu pedido #${orderId} de ${product.name} ha sido registrado.`,
        read: false
      });
    }

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

function updateAuthUI() {
  const loginBtn = document.querySelector('.nav-login-btn');
  const userDisplay = document.getElementById('userDisplay');
  const logoutBtn = document.getElementById('logoutBtn');

  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const mobileUserDisplay = document.getElementById('mobileUserDisplay');
  const mobileUserMenu = document.getElementById('mobileUserMenu');
  const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
  const mobileAdminLink = document.getElementById('mobileAdminLink');

  if (!userDisplay && !mobileUserDisplay) return;

  function renderNav(user) {
    if (!user) {
      if (loginBtn) {
        loginBtn.classList.remove('hidden');
        loginBtn.style.display = '';
      }
      if (userDisplay) userDisplay.classList.remove('active');
      if (mobileLoginBtn) mobileLoginBtn.style.display = '';
      if (mobileUserDisplay) mobileUserDisplay.classList.remove('active');
      if (mobileUserMenu) mobileUserMenu.classList.remove('open');
      return;
    }

    if (loginBtn) {
      loginBtn.classList.add('hidden');
      setTimeout(() => { if (loginBtn.classList.contains('hidden')) loginBtn.style.display = 'none'; }, 200);
    }
    if (userDisplay) userDisplay.classList.add('active');
    if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
    if (mobileUserDisplay) mobileUserDisplay.classList.add('active');

    const firstName = user.name.split(' ')[0];
    if (userDisplay) {
      userDisplay.querySelector('.login-name').textContent = firstName;
      const avatar = userDisplay.querySelector('.login-avatar');
      if (avatar) {
        avatar.src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=632432&color=F2E5A1&size=56`;
      }
    }
    if (mobileUserDisplay) {
      document.getElementById('mobileUserName').textContent = firstName;
      document.getElementById('mobileUserAvatar').src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=632432&color=F2E5A1&size=56`;
    }
    if (mobileAdminLink) {
      mobileAdminLink.style.display = (user.role === 'admin' || user.role === 'manager') ? '' : 'none';
    }
  }

  const currentUser = Auth.getCurrentUser();
  renderNav(currentUser);

  window.addEventListener('auth:change', (e) => {
    renderNav(e.detail.user);
    if (e.detail.user && e.detail.justLoggedIn) {
      showWelcomeOverlay(e.detail.user.name.split(' ')[0]);
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      Auth.signOut();
      setTimeout(() => window.location.href = 'index.html', 300);
    });
  }

  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      Auth.signOut();
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 300);
    });
  }

  if (userDisplay) {
    userDisplay.addEventListener('click', (e) => {
      if (e.target === logoutBtn || logoutBtn?.contains(e.target)) return;
      toggleUserDropdown();
    });

    userDisplay.querySelector('.login-avatar').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleUserDropdown();
    });

    userDisplay.querySelector('.login-name').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleUserDropdown();
    });
  }

  if (mobileUserDisplay) {
    mobileUserDisplay.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileUserDisplay.classList.toggle('open');
      mobileUserMenu.classList.toggle('open');
    });
  }
}

function toggleUserDropdown() {
  const existing = document.getElementById('userDropdown');
  if (existing) {
    existing.remove();
    return;
  }

  const user = Auth.getCurrentUser();
  if (!user) return;

  const dropdown = document.createElement('div');
  dropdown.id = 'userDropdown';
  dropdown.className = 'user-dropdown';
  dropdown.innerHTML = `
    <div class="user-dropdown-header">
      <img src="${user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=632432&color=F2E5A1&size=56`}" alt="">
      <div>
        <span class="user-dropdown-name">${user.name}</span>
        <span class="user-dropdown-email">${user.email}</span>
      </div>
    </div>
    <div class="user-dropdown-menu">
      <a href="account/index.html"><i class="bi bi-person"></i> Mi Cuenta</a>
      <a href="account/mis-pedidos.html"><i class="bi bi-truck"></i> Mis Pedidos</a>
      <a href="account/mis-compras.html"><i class="bi bi-bag"></i> Mis Compras</a>
      <a href="account/mis-citas.html"><i class="bi bi-calendar-check"></i> Mis Citas</a>
      ${user.role === 'admin' || user.role === 'manager' ? `<a href="admin/index.html"><i class="bi bi-shield-check"></i> Panel Admin</a>` : ''}
    </div>
    <div class="user-dropdown-footer">
      <button id="dropdownLogout"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</button>
    </div>
  `;

  document.querySelector('.nav-login').appendChild(dropdown);
  requestAnimationFrame(() => dropdown.classList.add('active'));

  document.getElementById('dropdownLogout').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.remove();
    Auth.signOut();
    setTimeout(() => window.location.href = 'index.html', 300);
  });

  setTimeout(() => {
    document.addEventListener('click', function closeDropdown(ev) {
      if (!dropdown.contains(ev.target) && !ev.target.closest('.login-user')) {
        dropdown.classList.remove('active');
        setTimeout(() => dropdown.remove(), 200);
      }
      document.removeEventListener('click', closeDropdown);
    });
  }, 10);
}

function showWelcomeOverlay(firstName) {
  const existing = document.querySelector('.welcome-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'welcome-overlay';
  overlay.innerHTML = `
    <div class="welcome-content">
      <div class="welcome-icon">✨</div>
      <h2>¡Bienvenida, ${firstName}!</h2>
      <p>Tu sesión ha sido iniciada correctamente</p>
    </div>
  `;
  document.body.appendChild(overlay);

  requestAnimationFrame(() => overlay.classList.add('active'));

  setTimeout(() => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 500);
  }, 2500);
}

function initChatbot() {
  if (typeof VNChatbot !== 'undefined') {
    VNChatbot.init();
  }
}

async function initNotifications() {
  const notifBell = document.getElementById('notifBell');
  const notifBellDesktop = document.getElementById('notifBellDesktop');
  const notifBadge = document.getElementById('notifBadge');
  const notifBadgeDesktop = document.getElementById('notifBadgeDesktop');
  const mobileNotifBell = document.getElementById('mobileNotifBell');
  const mobileNotifBadge = document.getElementById('mobileNotifBadge');
  if (!notifBell && !mobileNotifBell && !notifBellDesktop) return;

  async function updateBadges() {
    const user = Auth.getCurrentUser();
    if (!user) {
      if (notifBadge) notifBadge.style.display = 'none';
      if (notifBadgeDesktop) notifBadgeDesktop.style.display = 'none';
      if (mobileNotifBadge) mobileNotifBadge.style.display = 'none';
      return;
    }
    const count = await DataStore.getUnreadCount(user.id);
    const displayCount = count > 0 ? (count > 9 ? '9+' : count) : '';
    if (notifBadge) {
      notifBadge.textContent = displayCount;
      notifBadge.style.display = count > 0 ? 'flex' : 'none';
    }
    if (notifBadgeDesktop) {
      notifBadgeDesktop.textContent = displayCount;
      notifBadgeDesktop.style.display = count > 0 ? 'flex' : 'none';
    }
    if (mobileNotifBadge) {
      mobileNotifBadge.textContent = displayCount;
      mobileNotifBadge.style.display = count > 0 ? '' : 'none';
    }
  }

  await new Promise(resolve => {
    if (Auth.isLoggedIn()) return resolve();
    window.addEventListener('auth:change', resolve, { once: true });
    setTimeout(resolve, 3000);
  });

  updateBadges();
  window.addEventListener('auth:change', () => updateBadges());

  function handleNotifClick() {
    if (cartPanelOpen) return;
    const user = Auth.getCurrentUser();
    if (!user) {
      window.location.href = 'auth/login.html?redirect=' + encodeURIComponent(window.location.pathname);
      return;
    }
    showNotificationsDropdown(user);
    closeMobileMenu();
  }

  if (notifBell) notifBell.addEventListener('click', handleNotifClick);
  if (mobileNotifBell) mobileNotifBell.addEventListener('click', handleNotifClick);
  if (notifBellDesktop) notifBellDesktop.addEventListener('click', handleNotifClick);
}

async function showNotificationsDropdown(user) {
  const existing = document.getElementById('notifDropdown');
  if (existing) existing.remove();

  closeCartPanel();

  const allNotifs = await DataStore.getNotifications(user.id);
  const userNotifs = allNotifs.sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date));

  const dropdown = document.createElement('div');
  dropdown.id = 'notifDropdown';
  dropdown.className = 'notif-dropdown';
  dropdown.innerHTML = `
    <div class="notif-header">
      <h3>Notificaciones</h3>
      <button id="markAllRead"><i class="bi bi-check-all"></i> Marcar todo leido</button>
    </div>
    <div class="notif-list">
      ${userNotifs.length === 0 ? '<p class="notif-empty">No tienes notificaciones</p>' : userNotifs.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
          <div class="notif-icon">${getNotifIcon(n.type)}</div>
          <div class="notif-content">
            <strong>${n.title}</strong>
            <p>${n.message}</p>
            <span class="notif-time">${timeAgo(n.created_at || n.date)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.body.appendChild(dropdown);
  requestAnimationFrame(() => dropdown.classList.add('active'));
  notifPanelOpen = true;

  dropdown.querySelector('#markAllRead')?.addEventListener('click', async () => {
    await DataStore.markAllNotificationsRead(user.id);
    initNotifications();
    dropdown.remove();
    notifPanelOpen = false;
  });

  dropdown.querySelectorAll('.notif-item').forEach(item => {
    item.addEventListener('click', async () => {
      const id = parseInt(item.dataset.id);
      const notif = userNotifs.find(n => n.id === id);
      if (notif && !notif.read) {
        await DataStore.markNotificationRead(id);
        initNotifications();
      }
      if (notif?.link) window.location.href = notif.link;
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#notifBell') && !e.target.closest('#notifDropdown') && !e.target.closest('#mobileNotifBell') && !e.target.closest('#notifBellDesktop')) {
      dropdown.classList.remove('active');
      setTimeout(() => { dropdown.remove(); notifPanelOpen = false; }, 300);
    }
  }, { once: true });
}

function getNotifIcon(type) {
  const icons = {
    order_update: '<i class="bi bi-bag-check"></i>',
    delivery_update: '<i class="bi bi-truck"></i>',
    appointment_reminder: '<i class="bi bi-calendar-check"></i>',
    promotion: '<i class="bi bi-gift"></i>',
    new_arrival: '<i class="bi bi-star"></i>'
  };
  return icons[type] || '<i class="bi bi-bell"></i>';
}

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'Hace un momento';
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `Hace ${Math.floor(diff / 86400)}d`;
  return date.toLocaleDateString('es-CO');
}

async function initOrderTracking() {
  const trackingList = document.getElementById('trackingList');
  if (!trackingList) return;

  await new Promise(resolve => {
    if (Auth.isLoggedIn()) return resolve();
    window.addEventListener('auth:change', resolve, { once: true });
    setTimeout(resolve, 3000);
  });

  const currentUser = Auth.getCurrentUser();
  if (!currentUser) {
    window.location.href = 'auth/login.html?redirect=' + encodeURIComponent(window.location.pathname);
    return;
  }

  const orders = await DataStore.getOrders({ userId: currentUser.id });

  if (orders.length === 0) {
    trackingList.innerHTML = `<div class="no-orders"><i class="bi bi-inbox"></i><h3>Aún no tienes pedidos</h3><p>Explora nuestra colección y haz tu primer pedido.</p><a href="coleccion.html" class="btn btn-primary"><i class="bi bi-grid"></i> Ver Colección</a></div>`;
    return;
  }

  const statusMap = {
    'pendiente': { label: 'Recibido', icon: 'bi-inbox', step: 0 },
    'confirmado': { label: 'En Proceso', icon: 'bi-gear', step: 1 },
    'en_produccion': { label: 'Confección', icon: 'bi-scissors', step: 2 },
    'enviado': { label: 'Envío', icon: 'bi-truck', step: 3 },
    'entregado': { label: 'Entregado', icon: 'bi-box-seam', step: 4 }
  };
  const statusClasses = ['status-recibido','status-proceso','status-confeccion','status-enviado','status-entregado'];

  const statuses = [
    { label: 'Recibido', icon: 'bi-inbox' },
    { label: 'En Proceso', icon: 'bi-gear' },
    { label: 'Confección', icon: 'bi-scissors' },
    { label: 'Envío', icon: 'bi-truck' },
    { label: 'Entregado', icon: 'bi-box-seam' }
  ];

  trackingList.innerHTML = orders.map(order => {
    const orderDate = new Date(order.created_at);
    const formattedDate = orderDate.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    const statusInfo = statusMap[order.status] || statusMap['pendiente'];
    const currentStep = statusInfo.step;
    const estDelivery = new Date(orderDate.getTime() + 14 * 86400000);
    const formattedEst = estDelivery.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    const products = order.products || [];
    const productNames = products.map(p => p.name).join(', ');
    const productQty = products.reduce((sum, p) => sum + (p.qty || 1), 0);
    const productSize = products[0]?.size || 'N/A';

    const timelineHTML = statuses.map((status, i) => {
      let stepClass = i < currentStep ? 'completed' : i === currentStep ? 'current' : '';
      return `<div class="timeline-step ${stepClass}"><div class="timeline-dot"><i class="bi ${status.icon}"></i></div><span class="timeline-label">${status.label}</span></div>`;
    }).join('');

    return `<div class="tracking-card fade-in">
      <div class="tracking-card-header"><div><h3>${productNames}</h3><span class="tracking-order-id">#${order.id}</span></div><span class="tracking-status-badge ${statusClasses[currentStep]}">${statusInfo.label}</span></div>
      <div class="tracking-timeline">${timelineHTML}</div>
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:0.8rem;color:var(--text-medium);"><span><i class="bi bi-box"></i> Talla: ${productSize} · Cant: ${productQty}</span><span><i class="bi bi-credit-card"></i> Pago: ${order.payment}</span><span><i class="bi bi-calendar"></i> Pedido: ${formattedDate}</span></div>
      <div class="tracking-estimate"><i class="bi bi-clock"></i> Entrega estimada: <strong>${formattedEst}</strong> (14 días hábiles)</div>
    </div>`;
  }).join('');
}

/* ======================== CART ======================== */
let cartPanelOpen = false;
let notifPanelOpen = false;

function initCart() {
  const cartBell = document.getElementById('cartBell');
  const cartBellDesktop = document.getElementById('cartBellDesktop');
  const mobileCartBell = document.getElementById('mobileCartBell');
  if (!cartBell && !cartBellDesktop && !mobileCartBell) return;

  updateCartBadge();

  window.addEventListener('cart:change', () => updateCartBadge());

  if (cartBell) {
    cartBell.addEventListener('click', () => {
      if (notifPanelOpen) return;
      toggleCartPanel();
    });
  }

  if (cartBellDesktop) {
    cartBellDesktop.addEventListener('click', () => {
      if (notifPanelOpen) return;
      toggleCartPanel();
    });
  }

  if (mobileCartBell) {
    mobileCartBell.addEventListener('click', () => {
      if (notifPanelOpen) return;
      toggleCartPanel();
      closeMobileMenu();
    });
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const badgeDesktop = document.getElementById('cartBadgeDesktop');
  const mobileBadge = document.getElementById('mobileCartBadge');
  const count = Cart.getCount();
  if (badge) {
    badge.textContent = count > 9 ? '9+' : count;
    badge.style.display = count > 0 ? '' : 'none';
  }
  if (badgeDesktop) {
    badgeDesktop.textContent = count > 9 ? '9+' : count;
    badgeDesktop.style.display = count > 0 ? '' : 'none';
  }
  if (mobileBadge) {
    mobileBadge.textContent = count > 9 ? '9+' : count;
    mobileBadge.style.display = count > 0 ? '' : 'none';
  }

  const dropdown = document.getElementById('cartDropdown');
  if (dropdown) {
    refreshCartPanel();
  }
}

function refreshCartPanel() {
  const dropdown = document.getElementById('cartDropdown');
  if (!dropdown) return;

  const items = Cart.getItems();
  const total = Cart.getTotal();

  const header = dropdown.querySelector('.cart-header h3');
  if (header) header.textContent = `Mi Carrito (${Cart.getCount()})`;

  const clearBtn = dropdown.querySelector('#clearCart');
  const headerEl = dropdown.querySelector('.cart-header');
  if (items.length > 0 && !clearBtn && headerEl) {
    const btn = document.createElement('button');
    btn.id = 'clearCart';
    btn.innerHTML = '<i class="bi bi-trash"></i> Vaciar';
    headerEl.appendChild(btn);
    btn.addEventListener('click', () => Cart.clear());
  } else if (items.length === 0 && clearBtn) {
    clearBtn.remove();
  }

  const list = dropdown.querySelector('.cart-list');
  if (list) {
    if (items.length === 0) {
      list.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    } else {
      list.innerHTML = items.map(item => `
        <div class="cart-item" data-product="${item.productId}" data-size="${item.size}">
          <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.style.background='linear-gradient(135deg,#632432,#D4AF37)';this.src='';">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-details">Talla: ${item.size} · ${item.priceFormatted}</div>
            <div class="cart-item-actions">
              <button class="cart-qty-btn cart-minus" data-id="${item.productId}" data-size="${item.size}"><i class="bi bi-dash"></i></button>
              <span class="cart-qty">${item.qty}</span>
              <button class="cart-qty-btn cart-plus" data-id="${item.productId}" data-size="${item.size}"><i class="bi bi-plus"></i></button>
              <span class="cart-item-price">$${(item.price * item.qty).toLocaleString('es-CO')}</span>
              <button class="cart-item-remove" data-id="${item.productId}" data-size="${item.size}"><i class="bi bi-x"></i></button>
            </div>
          </div>
        </div>
      `).join('');

      list.querySelectorAll('.cart-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          const size = btn.dataset.size;
          const item = Cart.getItems().find(i => i.productId === id && i.size === size);
          if (item) Cart.updateQty(id, size, item.qty - 1);
        });
      });

      list.querySelectorAll('.cart-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          const size = btn.dataset.size;
          const item = Cart.getItems().find(i => i.productId === id && i.size === size);
          if (item) Cart.updateQty(id, size, Math.min(item.qty + 1, 10));
        });
      });

      list.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          Cart.removeItem(btn.dataset.id, btn.dataset.size);
        });
      });

      list.querySelectorAll('.cart-item').forEach(item => {
        item.addEventListener('click', () => {
          const name = item.querySelector('.cart-item-name')?.textContent;
          if (name) window.location.href = `producto.html?p=${encodeURIComponent(name)}`;
        });
      });
    }
  }

  const footer = dropdown.querySelector('.cart-footer');
  if (items.length > 0 && !footer) {
    const footerEl = document.createElement('div');
    footerEl.className = 'cart-footer';
    footerEl.innerHTML = `
      <div class="cart-total">
        <span class="cart-total-label">Total</span>
        <span class="cart-total-value">$${total.toLocaleString('es-CO')}</span>
      </div>
      <button class="cart-checkout-btn" id="cartCheckoutBtn"><i class="bi bi-lock-fill"></i> Proceder con el Pago</button>
    `;
    dropdown.appendChild(footerEl);
    footerEl.querySelector('#cartCheckoutBtn')?.addEventListener('click', () => {
      closeCartPanel();
      setTimeout(() => openCartCheckout(), 350);
    });
  } else if (items.length > 0 && footer) {
    const totalEl = footer.querySelector('.cart-total-value');
    if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-CO')}`;
  } else if (items.length === 0 && footer) {
    footer.remove();
  }
}

function toggleCartPanel() {
  const existing = document.getElementById('cartDropdown');
  if (existing) {
    closeCartPanel();
    return;
  }
  openCartPanel();
}

function openCartPanel() {
  const existing = document.getElementById('cartDropdown');
  if (existing) {
    existing.remove();
  }

  const notifExisting = document.getElementById('notifDropdown');
  if (notifExisting) {
    notifExisting.remove();
    notifPanelOpen = false;
  }

  const items = Cart.getItems();
  const total = Cart.getTotal();

  const dropdown = document.createElement('div');
  dropdown.id = 'cartDropdown';
  dropdown.className = 'cart-dropdown';
  dropdown.innerHTML = `
    <div class="cart-header">
      <h3>Mi Carrito (${Cart.getCount()})</h3>
      ${items.length > 0 ? `<button id="clearCart"><i class="bi bi-trash"></i> Vaciar</button>` : ''}
    </div>
    <div class="cart-list">
      ${items.length === 0 ? '<p class="cart-empty">Tu carrito está vacío</p>' : items.map(item => `
        <div class="cart-item" data-product="${item.productId}" data-size="${item.size}">
          <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.style.background='linear-gradient(135deg,#632432,#D4AF37)';this.src='';">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-details">Talla: ${item.size} · ${item.priceFormatted}</div>
            <div class="cart-item-actions">
              <button class="cart-qty-btn cart-minus" data-id="${item.productId}" data-size="${item.size}"><i class="bi bi-dash"></i></button>
              <span class="cart-qty">${item.qty}</span>
              <button class="cart-qty-btn cart-plus" data-id="${item.productId}" data-size="${item.size}"><i class="bi bi-plus"></i></button>
              <span class="cart-item-price">$${(item.price * item.qty).toLocaleString('es-CO')}</span>
              <button class="cart-item-remove" data-id="${item.productId}" data-size="${item.size}"><i class="bi bi-x"></i></button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    ${items.length > 0 ? `
      <div class="cart-footer">
        <div class="cart-total">
          <span class="cart-total-label">Total</span>
          <span class="cart-total-value">$${total.toLocaleString('es-CO')}</span>
        </div>
        <button class="cart-checkout-btn" id="cartCheckoutBtn"><i class="bi bi-lock-fill"></i> Proceder con el Pago</button>
      </div>
    ` : ''}
  `;

  document.body.appendChild(dropdown);
  requestAnimationFrame(() => dropdown.classList.add('active'));
  cartPanelOpen = true;

  dropdown.querySelectorAll('.cart-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const size = btn.dataset.size;
      const item = Cart.getItems().find(i => i.productId === id && i.size === size);
      if (item) Cart.updateQty(id, size, item.qty - 1);
    });
  });

  dropdown.querySelectorAll('.cart-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const size = btn.dataset.size;
      const item = Cart.getItems().find(i => i.productId === id && i.size === size);
      if (item) Cart.updateQty(id, size, Math.min(item.qty + 1, 10));
    });
  });

  dropdown.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      Cart.removeItem(btn.dataset.id, btn.dataset.size);
    });
  });

  dropdown.querySelectorAll('.cart-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.cart-item-name')?.textContent;
      if (name) window.location.href = `producto.html?p=${encodeURIComponent(name)}`;
    });
  });

  document.getElementById('clearCart')?.addEventListener('click', () => {
    Cart.clear();
  });

  document.getElementById('cartCheckoutBtn')?.addEventListener('click', () => {
    closeCartPanel();
    setTimeout(() => openCartCheckout(), 350);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#cartBell') && !e.target.closest('#cartDropdown') && !e.target.closest('#mobileCartBell') && !e.target.closest('#cartBellDesktop')) {
      closeCartPanel();
    }
  }, { once: true });
}

function closeCartPanel() {
  const dropdown = document.getElementById('cartDropdown');
  if (dropdown) {
    dropdown.classList.remove('active');
    setTimeout(() => {
      const el = document.getElementById('cartDropdown');
      if (el) el.remove();
      cartPanelOpen = false;
    }, 300);
  } else {
    cartPanelOpen = false;
  }
}

function openCartCheckout() {
  const items = Cart.getItems();
  if (items.length === 0) return;

  const total = Cart.getTotal();

  removeExistingModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal payment-modal">
      <button class="modal-close"><i class="bi bi-x-lg"></i></button>
      <div class="payment-container">
        <p class="section-subtitle" style="text-align:left;">Finalizar Compra</p>
        <h2 style="font-size:2rem;margin-bottom:1.5rem;">Datos de Pago</h2>

        <div class="payment-summary" style="flex-direction:column;align-items:flex-start;">
          ${items.map(item => `
            <div style="display:flex;gap:0.8rem;align-items:center;width:100%;${items.indexOf(item) < items.length - 1 ? 'padding-bottom:0.8rem;border-bottom:1px solid rgba(212,175,55,0.2);margin-bottom:0.8rem;' : ''}">
              <img src="${item.image}" alt="${item.name}" onerror="this.style.background='linear-gradient(135deg,#632432,#D4AF37)';this.src='';" style="width:50px;height:65px;object-fit:cover;border-radius:6px;">
              <div style="flex:1;">
                <h4 style="font-size:0.9rem;">${item.name}</h4>
                <p style="font-size:0.75rem;color:var(--text-light);margin:0;">Talla: ${item.size} · Cant: ${item.qty}</p>
              </div>
              <span style="color:var(--gold);font-weight:700;font-size:0.85rem;">$${(item.price * item.qty).toLocaleString('es-CO')}</span>
            </div>
          `).join('')}
          <div style="display:flex;justify-content:space-between;width:100%;margin-top:0.5rem;padding-top:0.5rem;border-top:2px solid rgba(212,175,55,0.3);">
            <span style="font-weight:700;font-size:0.9rem;">Total</span>
            <span style="color:var(--gold);font-weight:700;font-size:1.1rem;">$${total.toLocaleString('es-CO')}</span>
          </div>
        </div>

        <form id="paymentForm" style="display:flex;flex-direction:column;gap:1.1rem;">
          <div class="modal-form-row">
            <div><label>Nombre Completo</label><input type="text" id="payName" placeholder="Tu nombre" required></div>
            <div><label>Correo</label><input type="email" id="payEmail" placeholder="tucorreo@email.com" required></div>
          </div>
          <div class="modal-form-row">
            <div>
              <label>Teléfono</label>
              <div style="display:flex;gap:6px;">
                <select id="payPhoneCode" style="width:100px;padding:10px 8px;background:var(--modal-bg, #1a1a2e);border:1px solid var(--modal-border, #333);border-radius:8px;color:var(--modal-text, #fff);font-size:13px;appearance:auto;">
                  <option value="+57">+57 🇨🇴</option>
                  <option value="+54">+54 🇦🇷</option>
                  <option value="+591">+591 🇧🇴</option>
                  <option value="+56">+56 🇨🇱</option>
                  <option value="+593">+593 🇪🇨</option>
                  <option value="+52">+52 🇲🇽</option>
                  <option value="+595">+595 🇵🇾</option>
                  <option value="+51">+51 🇵🇪</option>
                  <option value="+598">+598 🇺🇾</option>
                  <option value="+58">+58 🇻🇪</option>
                  <option value="+1">+1 🇺🇸</option>
                  <option value="+34">+34 🇪🇸</option>
                </select>
                <input type="tel" id="payPhone" placeholder="300 000 0000" maxlength="10" style="flex:1;" required>
              </div>
            </div>
            <div><label>Documento</label><input type="text" id="payDoc" placeholder="CC / NIT" required></div>
          </div>
          <div class="form-field"><label>Dirección de Envío</label><input type="text" id="payAddress" placeholder="Dirección completa" required></div>

          <div class="form-field">
            <label>Método de Pago</label>
            <div class="payment-methods" id="payMethods">
              <div class="payment-method selected" data-method="transferencia"><i class="bi bi-bank"></i> Transferencia</div>
              <div class="payment-method" data-method="nequi"><i class="bi bi-phone"></i> Nequi</div>
              <div class="payment-method" data-method="efectivo"><i class="bi bi-cash"></i> Efectivo</div>
            </div>
          </div>

          <div class="form-field">
            <label>Cupón de Descuento (opcional)</label>
            <div style="display:flex;gap:8px;">
              <input type="text" id="payCoupon" placeholder="Ingresa tu código" style="flex:1;text-transform:uppercase;">
              <button type="button" id="applyCouponBtn" style="padding:10px 16px;background:var(--burgundy);color:white;border:none;border-radius:8px;cursor:pointer;font-size:0.8rem;font-weight:600;white-space:nowrap;">Aplicar</button>
            </div>
            <div id="couponMessage" style="font-size:0.75rem;margin-top:6px;display:none;"></div>
          </div>

          <button type="submit" class="modal-submit"><i class="bi bi-lock-fill"></i> Pagar y Confirmar Pedido</button>
        </form>

        <div class="modal-success" id="paySuccess">
          <i class="bi bi-check-circle-fill"></i>
          <h3>¡Pedido Confirmado!</h3>
          <p>Tu pedido ha sido registrado exitosamente.</p>
          <span class="order-id" id="orderIdDisplay"></span>
          <p style="font-size:0.8rem;color:var(--text-light);margin-bottom:1rem;">Te enviaremos actualizaciones a tu correo.</p>
          <a href="account/mis-pedidos.html" class="btn btn-primary"><i class="bi bi-truck"></i> Ver Mis Pedidos</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => overlay.classList.add('active'));

  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);

  // Coupon logic
  let appliedCoupon = null;
  let discountAmount = 0;

  overlay.querySelector('#applyCouponBtn')?.addEventListener('click', async () => {
    const code = overlay.querySelector('#payCoupon')?.value.trim().toUpperCase();
    const msg = overlay.querySelector('#couponMessage');
    if (!code) return;

    const validCoupons = { 'MINOVIA15': 15, 'MINOVIA20': 20 };
    if (validCoupons[code]) {
      appliedCoupon = { code, discount: validCoupons[code] };
      discountAmount = Math.round(total * (validCoupons[code] / 100));
      const newTotal = total - discountAmount;
      msg.style.display = 'block';
      msg.style.color = '#22c55e';
      msg.textContent = `¡${validCoupons[code]}% aplicado! Ahorras $${discountAmount.toLocaleString('es-CO')}`;
      overlay.querySelector('.payment-summary div:last-child span:last-child').textContent = `$${newTotal.toLocaleString('es-CO')}`;
    } else {
      msg.style.display = 'block';
      msg.style.color = '#ef4444';
      msg.textContent = 'Código inválido';
    }
  });

  overlay.querySelectorAll('#payMethods .payment-method').forEach(method => {
    method.addEventListener('click', () => {
      overlay.querySelectorAll('#payMethods .payment-method').forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');
    });
  });

  overlay.querySelector('#paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payment = overlay.querySelector('#payMethods .payment-method.selected')?.dataset.method || 'transferencia';
    const orderId = 'VN-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2,6).toUpperCase();

    const cartItems = Cart.getItems();
    const products = cartItems.map(item => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
      size: item.size,
      color: ''
    }));

    const currentUser = Auth.getCurrentUser();
    const finalTotal = appliedCoupon ? total - discountAmount : total;
    const orderData = {
      id: orderId,
      userId: currentUser ? currentUser.id : null,
      client: overlay.querySelector('#payName').value,
      email: currentUser ? currentUser.email : overlay.querySelector('#payEmail').value,
      phone: (overlay.querySelector('#payPhoneCode')?.value || '+57') + ' ' + (overlay.querySelector('#payPhone')?.value || ''),
      doc: overlay.querySelector('#payDoc')?.value || '',
      products: products,
      total: finalTotal,
      status: 'pendiente',
      payment,
      address: overlay.querySelector('#payAddress').value,
      notes: appliedCoupon ? `Pedido desde carrito · Cupón: ${appliedCoupon.code} (-${appliedCoupon.discount}%)` : 'Pedido desde carrito',
      tracking: '',
      carrier: ''
    };

    await DataStore.createOrder(orderData);

    // Mark coupon as used in Supabase
    if (currentUser && appliedCoupon) {
      await DataStore.markCouponUsed(currentUser.id, orderId);
    }

    if (currentUser) {
      await DataStore.createNotification({
        userId: currentUser.id,
        type: 'order_update',
        title: 'Pedido Confirmado!',
        message: `Tu pedido #${orderId} ha sido registrado.`,
        read: false
      });
    }

    Cart.clear();

    overlay.querySelector('#paymentForm').style.display = 'none';
    const success = overlay.querySelector('#paySuccess');
    success.classList.add('active');
    overlay.querySelector('#orderIdDisplay').textContent = '#' + orderId;

    const productNames = products.map(p => p.name).join(', ');
    const msg = `Hola Valentina! Acabo de realizar un pedido:\n- ${productNames}\n- Pedido: #${orderId}\n- Pago: ${payment}\n- Total: $${total.toLocaleString('es-CO')}`;
    window.open(`https://wa.me/573245947260?text=${encodeURIComponent(msg)}`, '_blank');
  });
}
