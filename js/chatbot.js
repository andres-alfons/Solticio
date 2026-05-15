/**
 * CHATBOT ASISTENTE VIRTUAL - VALENTINA NIEBLES v2
 * Premium Fashion AI Assistant - Conversational Intelligence
 */

(function() {
  'use strict';

  const BRAND = {
    name: "Valentina Niebles",
    phone: "+573245947260",
    email: "valentina@niebles.com",
    location: "Barranquilla, Colombia"
  };

  const PRODUCTS = [
    { id: 1, nombre: "Aurora", tipo: "Vestido largo", precio: 450000, precioStr: "$450.000", desc: "Vestido largo en seda natural con bordados florales hechos a mano.", img: "img/WhatsApp%20Image%202026-05-13%20at%2011.13.18%20PM%20(3).jpeg", tags: ["vestido","fiesta","gala","elegante","seda","largo","floral","romantico"], colores: ["champagne","rosa","dorado"], silueta: "A-line", ocasiones: ["gala","boda","fiesta formal"], temporada: "todo" },
    { id: 2, nombre: "Esmeralda", tipo: "Conjunto", precio: 380000, precioStr: "$380.000", desc: "Conjunto de dos piezas con detalles dorados y corte moderno.", img: "img/WhatsApp%20Image%202026-05-13%20at%2011.13.18%20PM%20(2).jpeg", tags: ["conjunto","moderno","dorado","casual","elegante","dos piezas"], colores: ["verde","dorado","negro"], silueta: "recta", ocasiones: ["coctel","casual elegante","evento diurno"], temporada: "todo" },
    { id: 3, nombre: "Noche Eterna", tipo: "Vestido de gala", precio: 520000, precioStr: "$520.000", desc: "Vestido de gala en tonos profundos, ideal para eventos nocturnos.", img: "img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(3).jpeg", tags: ["vestido","gala","noche","fiesta","elegante","formal","statement"], colores: ["negro","azul marino","burdeos"], silueta: "sirena", ocasiones: ["gala","boda","fiesta nocturna","evento formal"], temporada: "todo" },
    { id: 4, nombre: "Real", tipo: "Blazer", precio: 290000, precioStr: "$290.000", desc: "Blazer estructurado con hombreras sutiles y forro de satén.", img: "img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(1).jpeg", tags: ["blazer","formal","oficina","elegante","estructurado","power"], colores: ["negro","blanco","beige"], silueta: "estructurada", ocasiones: ["oficina","corporativo","casual elegante"], temporada: "todo" },
    { id: 5, nombre: "Sol", tipo: "Conjunto", precio: 340000, precioStr: "$340.000", desc: "Conjunto primaveral en tonos pastel con texturas únicas.", img: "img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(2).jpeg", tags: ["conjunto","primavera","pastel","casual","fresco","romantico","ligero"], colores: ["rosa pastel","lavanda","crema","melocoton"], silueta: "fluida", ocasiones: ["casual","brunch","dia de campo","evento diurno"], temporada: "primavera-verano" },
    { id: 6, nombre: "Luna", tipo: "Vestido", precio: 480000, precioStr: "$480.000", desc: "Vestido asimétrico con caída perfecta y detalles plateados.", img: "img/WhatsApp%20Image%202026-05-13%20at%2011.13.17%20PM%20(4).jpeg", tags: ["vestido","asimetrico","elegante","fiesta","plateado","moderno","unico"], colores: ["plateado","gris","azul hielo"], silueta: "asimetrica", ocasiones: ["fiesta","coctel","gala","evento nocturno"], temporada: "todo" }
  ];

  const STYLE_PROFILES = {
    romantica: { desc: "Te encantan los detalles delicados, telas fluidas y colores suaves. Eres femenina y soñadora.", productos: [1, 5], colores: ["rosa pastel","lavanda","champagne","crema"], telas: ["seda","chiffon","tul"], siluetas: ["A-line","fluida","evasé"] },
    moderna: { desc: "Amas las líneas limpias, cortes arquitectónicos y lo minimalista. Eres audaz y contemporánea.", productos: [2, 6], colores: ["negro","blanco","plateado","gris"], telas: ["crepe","satén","neopreno"], siluetas: ["recta","asimetrica","estructurada"] },
    clasica: { desc: "Prefieres la elegancia atemporal, piezas que nunca pasan de moda. Eres sofisticada y refinada.", productos: [3, 4], colores: ["negro","marino","burdeos","dorado"], telas: ["seda","lana","satén"], siluetas: ["sirena","estructurada","A-line"] },
    bohemia: { desc: "Te atraen las texturas naturales, estampados orgánicos y la libertad de movimiento. Eres libre y artística.", productos: [5, 2], colores: ["terracota","verde oliva","mostaza","crema"], telas: ["lino","algodon","crochet"], siluetas: ["fluida","evasé","holgada"] },
    power: { desc: "Te encanta proyectar fuerza y confianza. Las prendas estructuradas son tu debilidad.", productos: [4, 3], colores: ["negro","rojo","blanco","marino"], telas: ["lana","crepe","satén"], siluetas: ["estructurada","recta","sirena"] }
  };

  const BODY_TYPES = {
    reloj: { desc: "Tu busto y cadera son proporcionales con cintura definida", tips: "Los vestidos entallados, cortes sirena y prendas que marquen la cintura te favorecen enormemente. ¡Tienes la silueta más buscada en la moda!", productos: [3, 6, 1], evitar: "Prendas demasiado holgadas que oculten tu cintura" },
    triangulo: { desc: "Tu cadera es más ancha que tu busto", tips: "Te favorecen los tops con detalles, escotes llamativos y faldas A-line. El objetivo es equilibrar la parte superior con la inferior.", productos: [1, 4, 5], evitar: "Faldas muy ajustadas o con volumen en la cadera" },
    trianguloInv: { desc: "Tu busto es más ancho que tu cadera", tips: "Los pantalones y faldas con volumen, colores claros abajo y detalles en la parte inferior te favorecen.", productos: [5, 2, 6], evitar: "Hombreras marcadas o mucho volumen arriba" },
    rectangulo: { desc: "Tus medidas son bastante proporcionales sin cintura muy marcada", tips: "Crea curvas con cinturones, faldas evasé y prendas que definan la cintura. Los cortes imperio te favorecen.", productos: [1, 5, 6], evitar: "Cortes demasiado rectos sin definición" },
    oval: { desc: "Tienes volumen en la zona media del cuerpo", tips: "Los vestidos imperio, cortes A-line y telas fluidas te favorecen. Busca prendas que caigan sin apretar la zona media.", productos: [1, 3, 6], evitar: "Prendas muy ajustadas en la cintura" }
  };

  const COLOR_SEASONS = {
    primavera: { desc: "Tu piel tiene tonos cálidos y dorados", colores: ["coral","melocoton","verde manzana","dorado","crema","rosa calido"], evitar: ["negro puro","gris oscuro"], metales: "Dorado", mejores: [5, 2] },
    verano: { desc: "Tu piel tiene tonos fríos suaves", colores: ["rosa polvo","lavanda","azul cielo","gris perla","verde salvia"], evitar: ["naranja fuerte","amarillo brillante"], metales: "Plateado", mejores: [6, 5] },
    otono: { desc: "Tu piel tiene tonos cálidos profundos", colores: ["terracota","mostaza","verde oliva","burdeos","camel","chocolate"], evitar: ["rosa chillón","azul eléctrico"], metales: "Dorado/Cobre", mejores: [1, 2] },
    invierno: { desc: "Tu piel tiene tonos fríos intensos", colores: ["negro","blanco puro","rojo intenso","azul marino","esmeralda","fucsia"], evitar: ["tonos apagados","beige"], metales: "Plateado", mejores: [3, 4] }
  };

  const MATERIALS = {
    seda: { desc: "Premium, suave, brillante. Ideal para gala y alta costura.", cuidado: "Lavado en seco, planchar a baja temperatura", precio: "premium" },
    algodon: { desc: "Natural, transpirable, cómodo. Perfecto para uso diario.", cuidado: "Lavado a máquina, planchar medio", precio: "accesible" },
    lino: { desc: "Fresco, elegante, textura rústica-chic. Ideal para climas cálidos.", cuidado: "Lavado suave, planchar húmedo", precio: "medio" },
    saten: { desc: "Brillo sofisticado, caída fluida. Perfecto para noche.", cuidado: "Lavado delicado, no secadora", precio: "premium" },
    terciopelo: { desc: "Lujo puro, textura aterciopelada. Pieza statement.", cuidado: "Lavado en seco exclusivamente", precio: "premium" },
    chiffon: { desc: "Ligero, etéreo, romántico. Ideal para capas y vuelos.", cuidado: "Lavado a mano, no retorcer", precio: "medio" },
    crepe: { desc: "Textura granulada, elegante, no se arruga fácil.", cuidado: "Lavado delicado, planchar bajo", precio: "medio-alto" }
  };

  const OUTFITS = {
    bodaInvitada: { piezas: [1, 4], msg: "Para ser la invitada perfecta: el vestido Aurora como pieza principal con el blazer Real para la ceremonia. Elegante sin opacar a la novia." },
    galaCompleta: { piezas: [3, 4], msg: "Look de gala total: Noche Eterna como pieza statement. Si el evento es en espacio con aire acondicionado, el blazer Real te da un toque power." },
    coctel: { piezas: [6, 2], msg: "Para un cóctel: Luna con su asimetría única es perfecta. Si quieres algo más casual, Esmeralda en dos piezas te da versatilidad." },
    oficina: { piezas: [4, 2], msg: "Power look para oficina: Blazer Real como base, combinado con piezas de Esmeralda. Profesional pero con estilo." },
    casual: { piezas: [5, 2], msg: "Casual chic: Sol es perfecto para el día a día con estilo. Fresco, cómodo y con esa elegancia natural." },
    fiestaNoche: { piezas: [3, 6], msg: "Para la noche: Noche Eterna si quieres drama y elegancia, o Luna si prefieres algo más moderno y asimétrico. Ambas te harán brillar." }
  };

  const state = {
    isOpen: false,
    messages: [],
    context: {
      userPreferences: {},
      currentFlow: null,
      flowStep: 0,
      conversationHistory: [],
      detectedStyle: null,
      detectedBodyType: null,
      detectedColorSeason: null,
      budget: null,
      lastProducts: [],
      cartAbandoned: false,
      isReturningClient: false,
      conversationCount: 0,
      topicsDiscussed: [],
      sentiment: 'neutral'
    },
    clientData: {
      name: null,
      email: null,
      phone: null,
      preferences: [],
      orderHistory: [],
      appointments: []
    }
  };

  function loadState() {
    try {
      const saved = localStorage.getItem('vn_chatbot_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state.context, parsed.context || {});
        Object.assign(state.clientData, parsed.clientData || {});
      }
    } catch(e) {}
  }

  function saveState() {
    try {
      localStorage.setItem('vn_chatbot_v2', JSON.stringify({
        context: state.context,
        clientData: state.clientData,
        timestamp: Date.now()
      }));
    } catch(e) {}
  }

  let chatbotEl, toggleBtn, panel, messagesEl, inputEl, sendBtn, quickRepliesEl, minimizeBtn;

  function initDOM() {
    chatbotEl = document.getElementById('vn-chatbot');
    toggleBtn = document.getElementById('vn-chat-toggle');
    panel = document.getElementById('vn-chat-panel');
    messagesEl = document.getElementById('vn-chat-messages');
    inputEl = document.getElementById('vn-chat-input');
    sendBtn = document.getElementById('vn-chat-send');
    quickRepliesEl = document.getElementById('vn-chat-quick-replies');
    minimizeBtn = document.getElementById('vn-chat-minimize');
  }

  function toggleChat() {
    state.isOpen = !state.isOpen;
    chatbotEl.classList.toggle('vn-chatbot-open', state.isOpen);
    if (state.isOpen) {
      inputEl.focus();
      const badge = toggleBtn.querySelector('.vn-notification-badge');
      if (badge) badge.style.display = 'none';
      if (messagesEl.children.length === 0) showWelcome();
    }
  }

  function showWelcome() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";
    const name = state.clientData.name;
    const isReturning = state.context.isReturningClient;

    if (isReturning && name) {
      const prefs = state.context.userPreferences;
      let personal = "";
      if (prefs.style) personal += `Recuerdo que tu estilo es *${prefs.style}*. `;
      if (prefs.colorSeason) personal += `Tus colores ideales son los de temporada *${prefs.colorSeason}*. `;
      if (prefs.bodyType) personal += `Y por tu tipo de cuerpo, tengo recomendaciones perfectas para ti. `;

      addBotMessage(`${greeting}, ${name} ✨\n\n¡Qué alegría que volviste! ${personal || ''}¿En qué te puedo ayudar hoy?`);
      showQuickReplies(["Ver colección", "Mi asesoría personal", "Prenda personalizada", "Agendar cita", "Novedades"]);
    } else {
      addBotMessage(`${greeting} ✨ Bienvenida al atelier de Valentina Niebles.\n\nSoy tu asesora de moda personal con IA. Puedo ayudarte a encontrar la prenda perfecta analizando tu estilo, tipo de cuerpo y colores ideales.\n\n¿Cómo te llamas?`);
      state.context.currentFlow = 'ask_name';
      state.context.flowStep = 0;
    }
  }

  function addBotMessage(text, extra = null) {
    const time = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    const formatted = text.replace(/\n/g, '<br>').replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    const msgEl = document.createElement('div');
    msgEl.className = 'vn-message vn-message-bot';
    msgEl.innerHTML = `<div class="vn-message-bubble"><div>${formatted}</div>${extra || ''}<span class="vn-message-time">${time}</span></div>`;
    messagesEl.appendChild(msgEl);
    scrollToBottom();
    state.messages.push({ role: 'bot', text, time });
    state.context.conversationHistory.push({ role: 'bot', text, time });
  }

  function addUserMessage(text) {
    const time = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    const msgEl = document.createElement('div');
    msgEl.className = 'vn-message vn-message-user';
    msgEl.innerHTML = `<div class="vn-message-bubble"><div>${escapeHtml(text)}</div><span class="vn-message-time">${time}</span></div>`;
    messagesEl.appendChild(msgEl);
    scrollToBottom();
    state.messages.push({ role: 'user', text, time });
    state.context.conversationHistory.push({ role: 'user', text, time });
    state.context.conversationCount++;
  }

  function showTyping() {
    removeTyping();
    const el = document.createElement('div');
    el.className = 'vn-message vn-message-bot';
    el.id = 'vn-typing';
    el.innerHTML = '<div class="vn-typing"><div class="vn-typing-dot"></div><div class="vn-typing-dot"></div><div class="vn-typing-dot"></div></div>';
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function hideTyping() { removeTyping(); }
  function removeTyping() { const el = document.getElementById('vn-typing'); if (el) el.remove(); }

  function showQuickReplies(replies) {
    quickRepliesEl.innerHTML = '';
    replies.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'vn-quick-reply';
      btn.textContent = r;
      btn.addEventListener('click', () => { handleUserInput(r); quickRepliesEl.innerHTML = ''; });
      quickRepliesEl.appendChild(btn);
    });
  }

  function scrollToBottom() { setTimeout(() => { messagesEl.scrollTop = messagesEl.scrollHeight; }, 50); }
  function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  function normalize(t) { return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); }

  function renderProductCard(p) {
    return `<div class="vn-product-card"><img class="vn-product-card-img" src="${p.img}" alt="${p.nombre}" onerror="this.style.background='linear-gradient(135deg,#c9a96e,#a07d3f)';this.style.minHeight='140px';"><div class="vn-product-card-body"><p class="vn-product-card-title">${p.nombre}</p><p style="font-size:12px;color:#6b6b6b;margin:0 0 4px;">${p.tipo}</p><p class="vn-product-card-price">${p.precioStr}</p><a href="producto.html?id=${p.id}" class="vn-product-card-btn">Ver Detalles</a></div></div>`;
  }

  function renderDiscountCard(promo) {
    return `<div class="vn-discount-card"><p style="margin:0;font-size:13px;color:#2d2d2d;">🎁 ${promo.desc}</p><div class="vn-discount-code" onclick="navigator.clipboard.writeText('${promo.codigo}');this.textContent='¡Copiado!';">${promo.codigo}</div><p style="margin:0;font-size:11px;color:#6b6b6b;">${promo.descuento} OFF${promo.minCompra ? ' | compras + ' + promo.minCompra : ''}</p></div>`;
  }

  function renderOrderStatus(o) {
    const progress = { 'Pendiente': 25, 'Confirmado': 40, 'En producción': 60, 'Enviado': 80, 'Entregado': 100, 'Cancelado': 0 };
    const bc = { 'Pendiente': 'pending', 'Confirmado': 'processing', 'En producción': 'processing', 'Enviado': 'shipped', 'Entregado': 'delivered', 'Cancelado': 'pending' };
    return `<div class="vn-order-status"><div class="vn-order-header"><span class="vn-order-id">${o.id}</span><span class="vn-order-badge ${bc[o.estado]||'pending'}">${o.estado}</span></div><div class="vn-order-progress"><div class="vn-order-progress-bar" style="width:${progress[o.estado]||0}%"></div></div><p style="font-size:12px;color:#6b6b6b;margin:0;">${o.producto} · ${o.fecha}</p></div>`;
  }

  function renderScheduleSlots() {
    const today = new Date();
    const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    let html = '<div class="vn-schedule-card"><p class="vn-schedule-title">📅 Selecciona un día:</p><div class="vn-schedule-slots">';
    for (let i = 1; i <= 5; i++) {
      const d = new Date(today); d.setDate(d.getDate() + i);
      if (d.getDay() === 0) continue;
      html += `<button class="vn-schedule-slot" data-day="${dias[d.getDay()]} ${d.getDate()}">${dias[d.getDay()]} ${d.getDate()}</button>`;
    }
    html += '</div></div>';
    return html;
  }

  function renderTimeSlots() {
    const times = ["9:00 AM","10:00 AM","11:00 AM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
    let html = '<div class="vn-schedule-card"><p class="vn-schedule-title">🕐 Selecciona hora:</p><div class="vn-schedule-slots">';
    times.forEach(t => { html += `<button class="vn-schedule-slot" data-time="${t}">${t}</button>`; });
    html += '</div></div>';
    return html;
  }

  // ============================================
  // INTELLIGENT CONVERSATION ENGINE
  // ============================================
  function processInput(input) {
    const raw = input.trim();
    const text = normalize(raw);
    state.context.lastInput = text;
    state.context.lastRawInput = raw;

    // Active flow handling
    if (state.context.currentFlow) {
      const flowResult = handleActiveFlow(text, raw);
      if (flowResult) return flowResult;
    }

    // Multi-intent detection
    const intents = detectIntents(text, raw);
    return generateResponse(intents, text, raw);
  }

  function detectIntents(text, raw) {
    const intents = [];

    if (/^(hola|hi|hey|buenos|buenas|saludos|que tal|ola|epa|hello)/.test(text)) intents.push('greeting');
    if (/coleccion|catalogo|ver todo|muestrame todo|ver ropa|ver productos/.test(text)) intents.push('view_all');
    if (/vestido/.test(text)) intents.push('vestidos');
    if (/conjunto/.test(text)) intents.push('conjuntos');
    if (/blazer/.test(text)) intents.push('blazers');
    if (/personaliz|custom|a medida|crear|disenar|confeccion|hecho a mano|unico/.test(text)) intents.push('custom');
    if (/cita|agendar|reservar|appointment|turno|consulta/.test(text)) intents.push('appointment');
    if (/pedido|orden|compra|seguimiento|rastrear|donde va|estado|tracking|mi pedido/.test(text)) intents.push('order_tracking');
    if (/talla|medida|tamano|size|cual soy|que talla|mi talla/.test(text)) intents.push('size_help');
    if (/material|tela|genero|textil/.test(text)) {
      if (/seda/.test(text)) intents.push('material_seda');
      else if (/algodon/.test(text)) intents.push('material_algodon');
      else if (/lino/.test(text)) intents.push('material_lino');
      else if (/sat/.test(text)) intents.push('material_saten');
      else if (/terciopelo/.test(text)) intents.push('material_terciopelo');
      else intents.push('materials');
    }
    if (/envio|entrega|despacho|shipping|llega|cuando llega/.test(text)) intents.push('shipping');
    if (/pago|pagar|tarjeta|paypal|transfer|contra entrega|cuanto es|precio|costo|valor/.test(text)) intents.push('payment');
    if (/devolucion|cambio|garantia|reembolso|return/.test(text)) intents.push('returns');
    if (/tendencia|trend|moda|nuevo|nueva coleccion|que se usa|actual|lo ultimo/.test(text)) intents.push('trends');
    if (/outfit|combinar|combinacion|look|conjunto completo|que me pongo|como combino|armar look/.test(text)) intents.push('outfit');
    if (/fiesta|boda|matrimonio|gala|evento|graduacion|formal|noche|quince/.test(text)) intents.push('event');
    if (/color|colores|favorecen|tono de piel|piel calida|piel fria|estacion/.test(text)) intents.push('color_analysis');
    if (/descuento|promo|cupon|oferta|codigo|barato|rebaja/.test(text)) intents.push('discount');
    if (/whatsapp|contacto|comunicar|llamar|email|correo|telefono|donde estan/.test(text)) intents.push('contact');
    if (/horario|hora|atienden|abierto|cuando|direccion|ubicacion/.test(text)) intents.push('info');
    if (/gracias|thank|genial|perfecto|excelente|maravilloso|increible|me encanta/.test(text)) intents.push('thanks');
    if (/chao|adios|bye|hasta luego|nos vemos|me voy|hasta pronto/.test(text)) intents.push('goodbye');
    if (/me recomiend|que me queda|que me sirve|cual me favorece|cual escojo|ayudame a elegir|que me pongo|suger|asesor/.test(text)) intents.push('recommendation');
    if (/tipo de cuerpo|mi cuerpo|mi figura|silueta|reloj|triangulo|rectangulo/.test(text)) intents.push('body_analysis');
    if (/mi estilo|que estilo|estilo personal|como me describo|personalidad de moda/.test(text)) intents.push('style_quiz');
    if (/presupuesto|budget|cuanto tengo|barato|economico|accesible|rango/.test(text)) intents.push('budget');
    if (/asesoria|asesor|personal shopper|consultoria/.test(text)) intents.push('personal_shopper');
    if (/noviedad|nuevo lanzamiento|recien llegado|ultima coleccion/.test(text)) intents.push('new_arrivals');

    if (intents.length === 0) {
      // Try to understand conversational input
      if (/si|claro|por supuesto|dale|vamos|ok|bueno|perfecto|me gusta|si porfa/.test(text)) intents.push('affirmative');
      else if (/no|nop|negativo|no quiero|no gracias|mejor no/.test(text)) intents.push('negative');
      else if (/no se|no estoy segura|no tengo idea|ayudame|orientame/.test(text)) intents.push('needs_help');
      else intents.push('general');
    }

    return intents;
  }

  function generateResponse(intents, text, raw) {
    // Priority handling
    if (intents.includes('greeting')) return handleGreeting();
    if (intents.includes('recommendation')) return handleSmartRecommendation(text, raw);
    if (intents.includes('body_analysis')) return startBodyAnalysis();
    if (intents.includes('style_quiz')) return startStyleQuiz();
    if (intents.includes('color_analysis')) return startColorAnalysis();
    if (intents.includes('personal_shopper')) return handlePersonalShopper();
    if (intents.includes('outfit')) return handleOutfitBuilder(text);
    if (intents.includes('event')) return handleEventRecommendation(text);
    if (intents.includes('custom')) return handleCustomClothing();
    if (intents.includes('appointment')) return handleAppointment();
    if (intents.includes('order_tracking')) return handleOrderTracking();
    if (intents.includes('size_help')) return handleSizeHelp();
    if (intents.includes('view_all')) return handleViewAll();
    if (intents.includes('vestidos')) return handleCategory('vestido');
    if (intents.includes('conjuntos')) return handleCategory('conjunto');
    if (intents.includes('blazers')) return handleCategory('blazer');
    if (intents.includes('trends')) return handleTrends();
    if (intents.includes('budget')) return handleBudget(text);
    if (intents.includes('new_arrivals')) return handleNewArrivals();
    if (intents.includes('discount')) return handleDiscount();
    if (intents.includes('contact')) return handleContact();
    if (intents.includes('info')) return handleInfo(text);
    if (intents.includes('shipping')) return handleShipping();
    if (intents.includes('payment')) return handlePayment();
    if (intents.includes('returns')) return handleReturns();
    if (intents.includes('thanks')) return handleThanks();
    if (intents.includes('goodbye')) return handleGoodbye();
    if (intents.includes('affirmative')) return handleAffirmative();
    if (intents.includes('negative')) return handleNegative();
    if (intents.includes('needs_help')) return handleNeedsHelp();

    // Material intents
    if (intents.some(i => i.startsWith('material_'))) return handleSpecificMaterial(text);
    if (intents.includes('materials')) return handleMaterials();

    return handleConversational(raw);
  }

  // ============================================
  // ACTIVE FLOW HANDLER
  // ============================================
  function handleActiveFlow(text, raw) {
    const flow = state.context.currentFlow;
    const step = state.context.flowStep;

    switch(flow) {
      case 'ask_name':
        state.clientData.name = raw;
        state.context.isReturningClient = true;
        state.context.currentFlow = null;
        saveState();
        return { message: `¡Encantada, ${raw}! 💫\n\nAhora puedo personalizar todo para ti. Para darte las mejores recomendaciones, me gustaría conocerte un poco mejor.\n\n¿Te gustaría que haga un análisis rápido de tu estilo y te diga qué te favorece más?`, quickReplies: ["Sí, analízame", "Solo ver la colección", "Tengo una pregunta"] };

      case 'body_bust':
        const bust = parseInt(text) || 0;
        if (bust < 60 || bust > 140) return { message: "Esa medida parece fuera de rango. ¿Podrías verificarla? Generalmente el busto mide entre 75-110 cm." };
        state.context.userPreferences.bust = bust;
        state.context.currentFlow = 'body_waist';
        return { message: "Perfecto 📝\n\n2️⃣ Ahora tu cintura: mide en la parte más estrecha, generalmente a la altura del ombligo." };

      case 'body_waist':
        const waist = parseInt(text) || 0;
        if (waist < 50 || waist > 130) return { message: "Revisa esa medida. La cintura usualmente mide entre 55-100 cm." };
        state.context.userPreferences.waist = waist;
        state.context.currentFlow = 'body_hip';
        return { message: "Genial ✨\n\n3️⃣ Por último, tu cadera: mide en la parte más ancha." };

      case 'body_hip':
        const hip = parseInt(text) || 0;
        if (hip < 70 || waist > 140) return { message: "Verifica la medida de cadera. Usualmente entre 80-120 cm." };
        state.context.userPreferences.hip = hip;
        state.context.currentFlow = null;
        const bodyResult = analyzeBodyType(state.context.userPreferences.bust, waist, hip);
        state.context.userPreferences.bodyType = bodyResult.type;
        state.context.detectedBodyType = bodyResult.type;
        saveState();
        return buildBodyAnalysisResponse(bodyResult);

      case 'style_q1':
        state.context.userPreferences.styleAnswers = state.context.userPreferences.styleAnswers || {};
        state.context.userPreferences.styleAnswers.q1 = text;
        state.context.currentFlow = 'style_q2';
        return { message: "Interesante elección 🎨\n\n2️⃣ Para una salida con amigas, ¿qué prefieres?\n\n• Vestido llamativo que robe miradas\n• Conjunto cool y cómodo\n• Jeans + blusa especial\n• Algo diferente que nadie tenga" };

      case 'style_q2':
        state.context.userPreferences.styleAnswers.q2 = text;
        state.context.currentFlow = 'style_q3';
        return { message: "Me estás dando buenas pistas ✨\n\n3️⃣ ¿Qué frase te define más?\n\n• \"Menos es más\"\n• \"Más es más\"\n• \"La comodidad es primero\"\n• \"Quiero que me recuerden\"" };

      case 'style_q3':
        state.context.userPreferences.styleAnswers.q3 = text;
        state.context.currentFlow = 'style_q4';
        return { message: "Última pregunta 💫\n\n4️⃣ Tu bolso ideal es:\n\n• Pequeño y elegante\n• Grande y práctico\n• Con detalles únicos\n• Minimalista y chic" };

      case 'style_q4':
        state.context.userPreferences.styleAnswers.q4 = text;
        state.context.currentFlow = null;
        const styleResult = analyzeStyle(state.context.userPreferences.styleAnswers);
        state.context.userPreferences.style = styleResult.type;
        state.context.detectedStyle = styleResult.type;
        saveState();
        return buildStyleAnalysisResponse(styleResult);

      case 'color_q1':
        state.context.userPreferences.colorAnswers = {};
        state.context.userPreferences.colorAnswers.q1 = text;
        state.context.currentFlow = 'color_q2';
        return { message: "Buena referencia 🌟\n\n2️⃣ Cuando te bronceas, ¿qué pasa?\n\n• Me doy rápido, tono dorado\n• Me cuesta, me pongo roja primero\n• No me bronceo fácil\n• Siempre tengo el mismo tono" };

      case 'color_q2':
        state.context.userPreferences.colorAnswers.q2 = text;
        state.context.currentFlow = 'color_q3';
        return { message: "Perfecto ✨\n\n3️⃣ ¿Qué joyas te favorecen más?\n\n• Doradas\n• Plateadas\n• Ambas por igual\n• No uso joyas" };

      case 'color_q3':
        state.context.userPreferences.colorAnswers.q3 = text;
        state.context.currentFlow = null;
        const colorResult = analyzeColorSeason(state.context.userPreferences.colorAnswers);
        state.context.userPreferences.colorSeason = colorResult.season;
        state.context.detectedColorSeason = colorResult.season;
        saveState();
        return buildColorAnalysisResponse(colorResult);

      case 'custom_color':
        state.context.userPreferences.customColor = raw;
        state.context.currentFlow = 'custom_occasion';
        return { message: `¡${raw} es una elección hermosa! 🎨\n\n¿Para qué ocasión necesitas esta prenda?\n\n• Boda / Matrimonio\n• Gala / Evento formal\n• Fiesta / Cóctel\n• Uso diario / Casual\n• Trabajo / Oficina\n• Quinceañera\n• Otra` };

      case 'custom_occasion':
        state.context.userPreferences.customOccasion = raw;
        state.context.currentFlow = 'custom_budget';
        return { message: "Entendido ✨\n\n¿Cuál es tu rango de presupuesto?\n\n• $200.000 - $400.000\n• $400.000 - $600.000\n• $600.000 - $900.000\n• Más de $900.000\n• Sin límite, quiero lo mejor" };

      case 'custom_budget':
        state.context.userPreferences.customBudget = raw;
        state.context.currentFlow = 'custom_details';
        return { message: "Perfecto 💫\n\nCuéntame más detalles sobre lo que imaginas:\n\n• ¿Largo de la prenda? (corto, midi, largo)\n• ¿Alguna tela que prefieras?\n• ¿Detalles especiales? (bordados, piedras, etc.)\n• ¿Algo que NO quieras?\n\nEscribe todo lo que tengas en mente." };

      case 'custom_details':
        state.context.userPreferences.customDetails = raw;
        state.context.currentFlow = null;
        const summary = buildCustomSummary();
        saveState();
        return { message: `✨ ¡Tu diseño personalizado está listo para cotizar!\n\n${summary}\n\nPara finalizar tu diseño, Valentina necesita revisar los detalles personalmente. ¿Quieres agendar una cita de diseño?`, quickReplies: ["Sí, agendar cita", "Solo quiero cotizar", "Modificar algo"] };

      case 'appt_type':
        const types = [
          { key: "diseno", label: "Diseño Personalizado", dur: "60 min" },
          { key: "medidas", label: "Toma de Medidas", dur: "30 min" },
          { key: "asesoria", label: "Asesoría de Moda", dur: "45 min" },
          { key: "prueba", label: "Prueba de Vestuario", dur: "45 min" }
        ];
        const found = types.find(t => text.includes(t.key) || raw.toLowerCase().includes(t.label.toLowerCase().split(' ')[0]));
        if (found) {
          state.context.apptType = found;
          state.context.currentFlow = 'appt_day';
          return { message: `Perfecto: ${found.label} (${found.dur})\n\nSelecciona el día:`, extra: renderScheduleSlots() };
        }
        return { message: "¿Cuál tipo de cita prefieres?", quickReplies: ["Diseño Personalizado", "Toma de Medidas", "Asesoría de Moda", "Prueba de Vestuario"] };

      case 'appt_day':
        state.context.apptDay = raw;
        state.context.currentFlow = 'appt_time';
        return { message: `📅 ${raw}\n\nAhora la hora:`, extra: renderTimeSlots() };

      case 'appt_time':
        state.context.apptTime = raw;
        state.context.currentFlow = null;
        const appt = { type: state.context.apptType?.label || '', day: state.context.apptDay, time: raw, client: state.clientData.name || 'Cliente', status: 'confirmada' };
        state.clientData.appointments.push(appt);
        saveState();
        return { message: `✨ ¡Cita confirmada!\n\n📋 ${appt.type}\n📅 ${appt.day}\n🕐 ${appt.time}\n👤 ${appt.client}\n\nTe enviaremos recordatorio. ¿Necesitas algo más?`, quickReplies: ["Ver colección", "Otra consulta", "Gracias"] };

      case 'size_bust':
        const b = parseInt(text) || 0;
        if (b < 60 || b > 140) return { message: "Verifica esa medida. ¿Puedes medirla de nuevo?" };
        state.context.userPreferences.bust = b;
        state.context.currentFlow = 'size_waist';
        return { message: "Perfecto 📝\n\n2️⃣ Cintura (parte más estrecha):" };

      case 'size_waist':
        const w = parseInt(text) || 0;
        if (w < 50 || w > 130) return { message: "Revisa esa medida." };
        state.context.userPreferences.waist = w;
        state.context.currentFlow = 'size_hip';
        return { message: "Genial ✨\n\n3️⃣ Cadera (parte más ancha):" };

      case 'size_hip':
        const h = parseInt(text) || 0;
        if (h < 70 || h > 140) return { message: "Verifica la medida." };
        state.context.userPreferences.hip = h;
        state.context.currentFlow = null;
        const talla = calcSize(state.context.userPreferences.bust, w, h);
        saveState();
        return { message: `📏 Tu talla ideal:\n\n• Busto: ${state.context.userPreferences.bust} cm\n• Cintura: ${state.context.userPreferences.waist} cm\n• Cadera: ${state.context.userPreferences.hip} cm\n\n👗 Talla recomendada: *${talla}*\n\nEn Valentina Niebles cada prenda se ajusta a ti. ¿Quieres ver prendas en tu talla?`, quickReplies: ["Ver en mi talla", "Prenda personalizada", "Análisis de cuerpo"] };

      case 'budget_range':
        state.context.budget = raw;
        state.context.currentFlow = null;
        const budgetProducts = filterByBudget(raw);
        if (budgetProducts.length > 0) {
          let msg = `💰 Con ese presupuesto, te recomiendo:\n\n`;
          let extra = '';
          budgetProducts.forEach(p => { msg += `• *${p.nombre}* - ${p.precioStr}\n  ${p.desc}\n\n`; extra += renderProductCard(p); });
          return { message: msg, extra, quickReplies: ["Más detalles", "Otro rango", "Prenda personalizada"] };
        }
        return { message: "Para ese rango, te recomiendo nuestras prendas personalizadas donde podemos ajustar el precio según los detalles. ¿Quieres explorar esa opción?", quickReplies: ["Prenda personalizada", "Ver toda la colección"] };
    }

    return null;
  }

  // ============================================
  // ANALYSIS ENGINES
  // ============================================
  function analyzeBodyType(bust, waist, hip) {
    const bustHipDiff = Math.abs(bust - hip);
    const waistDiff = bust - waist;

    if (bustHipDiff <= 5 && waistDiff >= 15) return { type: 'reloj', ...BODY_TYPES.reloj };
    if (hip > bust + 5) return { type: 'triangulo', ...BODY_TYPES.triangulo };
    if (bust > hip + 5) return { type: 'trianguloInv', ...BODY_TYPES.trianguloInv };
    if (waistDiff < 10) return { type: 'rectangulo', ...BODY_TYPES.rectangulo };
    return { type: 'oval', ...BODY_TYPES.oval };
  }

  function buildBodyAnalysisResponse(result) {
    const prods = result.productos.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    let extra = '';
    prods.forEach(p => extra += renderProductCard(p));

    return {
      message: `📐 *Análisis de tu tipo de cuerpo:*\n\nTu silueta es tipo *${result.type.toUpperCase()}*\n\n${result.desc}\n\n💡 *Consejos para ti:*\n${result.tips}\n\n🚫 *Evitar:* ${result.evitar}\n\nBasado en tu tipo de cuerpo, estas prendas te favorecen especialmente:`,
      extra,
      quickReplies: ["Análisis de estilo", "Análisis de colores", "Ver más prendas", "Prenda personalizada"]
    };
  }

  function analyzeStyle(answers) {
    if (!answers) return { type: 'clasica', ...STYLE_PROFILES.clasica };
    const q1 = normalize(answers.q1 || '');
    const q2 = normalize(answers.q2 || '');
    const q3 = normalize(answers.q3 || '');
    const q4 = normalize(answers.q4 || '');

    let scores = { romantica: 0, moderna: 0, clasica: 0, bohemia: 0, power: 0 };

    // Q1 - Color preference
    if (/pastel|suave|rosa|lavanda|crema/.test(q1)) scores.romantica += 2;
    if (/negro|blanco|neutro|oscuro/.test(q1)) scores.moderna += 2;
    if (/clasico|atemporal|elegante|neutro/.test(q1)) scores.clasica += 2;
    if (/tierra|natural|verde|terracota/.test(q1)) scores.bohemia += 2;
    if (/rojo|fuerte|llamativo|intenso/.test(q1)) scores.power += 2;

    // Q2 - Outing preference
    if (/vestido|llamativo|robar/.test(q2)) scores.romantica += 2;
    if (/conjunto|cool/.test(q2)) scores.moderna += 2;
    if (/jeans|blusa/.test(q2)) scores.bohemia += 2;
    if (/diferente|unico/.test(q2)) scores.power += 2;

    // Q3 - Philosophy
    if (/menos/.test(q3)) scores.moderna += 2;
    if (/mas es/.test(q3)) scores.romantica += 2;
    if (/comodidad/.test(q3)) scores.bohemia += 2;
    if (/recuerden/.test(q3)) scores.power += 2;

    // Q4 - Bag
    if (/pequeno|elegante/.test(q4)) scores.clasica += 2;
    if (/grande|practico/.test(q4)) scores.bohemia += 2;
    if (/detalles|unico/.test(q4)) scores.romantica += 2;
    if (/minimalista/.test(q4)) scores.moderna += 2;

    const maxType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return { type: maxType, ...STYLE_PROFILES[maxType] };
  }

  function buildStyleAnalysisResponse(result) {
    const prods = result.productos.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    let extra = '';
    prods.forEach(p => extra += renderProductCard(p));

    return {
      message: `🎨 *Tu estilo de moda:*\n\nEres *${result.type.toUpperCase()}*\n\n${result.desc}\n\n🎯 *Tus colores ideales:* ${result.colores.join(', ')}\n🧵 *Tus telas perfectas:* ${result.telas.join(', ')}\n✂️ *Siluetas que te favorecen:* ${result.siluetas.join(', ')}\n\nEstas piezas son perfectas para ti:`,
      extra,
      quickReplies: ["Análisis de colores", "Análisis de cuerpo", "Outfit completo", "Prenda personalizada"]
    };
  }

  function analyzeColorSeason(answers) {
    if (!answers) return { season: 'otono', ...COLOR_SEASONS.otono };
    const q1 = normalize(answers.q1 || '');
    const q2 = normalize(answers.q2 || '');
    const q3 = normalize(answers.q3 || '');

    let scores = { primavera: 0, verano: 0, otono: 0, invierno: 0 };

    // Q1 - Vein color
    if (/verde/.test(q1)) { scores.primavera += 2; scores.otono += 1; }
    if (/azul|morado/.test(q1)) { scores.verano += 2; scores.invierno += 1; }
    if (/ambos|no se/.test(q1)) scores.verano += 1;

    // Q2 - Tanning
    if (/rapido|dorado/.test(q2)) { scores.primavera += 2; scores.otono += 1; }
    if (/roja|cuesta/.test(q2)) { scores.verano += 2; scores.invierno += 1; }
    if (/no bronceo/.test(q2)) scores.invierno += 2;

    // Q3 - Jewelry
    if (/dorad/.test(q3)) { scores.primavera += 2; scores.otono += 2; }
    if (/platead/.test(q3)) { scores.verano += 2; scores.invierno += 2; }
    if (/ambas/.test(q3)) { scores.primavera += 1; scores.verano += 1; }

    const maxSeason = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return { season: maxSeason, ...COLOR_SEASONS[maxSeason] };
  }

  function buildColorAnalysisResponse(result) {
    const prods = result.mejores.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    let extra = '';
    prods.forEach(p => extra += renderProductCard(p));

    return {
      message: `🌈 *Tu estación de color:*\n\nEres temporada *${result.season.toUpperCase()}*\n\n${result.desc}\n\n✨ *Tus mejores colores:*\n${result.colores.map(c => `• ${c}`).join('\n')}\n\n💎 *Metal que te favorece:* ${result.metales}\n🚫 *Evitar:* ${result.evitar.join(', ')}\n\nEstas prendas lucirán increíble en ti:`,
      extra,
      quickReplies: ["Análisis de estilo", "Análisis de cuerpo", "Ver colección completa", "Prenda personalizada"]
    };
  }

  function calcSize(bust, waist, hip) {
    const avg = (bust + waist + hip) / 3;
    if (avg <= 78) return 'XS';
    if (avg <= 84) return 'S';
    if (avg <= 90) return 'M';
    if (avg <= 98) return 'L';
    return 'XL';
  }

  function filterByBudget(range) {
    let min = 0, max = Infinity;
    if (/200.*400/.test(range)) { min = 0; max = 400000; }
    else if (/400.*600/.test(range)) { min = 400000; max = 600000; }
    else if (/600.*900/.test(range)) { min = 600000; max = 900000; }
    else if (/900|sin limite|mejor/.test(range)) { min = 900000; }
    return PRODUCTS.filter(p => p.precio >= min && p.precio <= max);
  }

  function buildCustomSummary() {
    const p = state.context.userPreferences;
    return `📋 *Diseño Personalizado:*\n\n🎨 Color: ${p.customColor || 'Por definir'}\n🎯 Ocasión: ${p.customOccasion || 'Por definir'}\n💰 Presupuesto: ${p.customBudget || 'Por definir'}\n📝 Detalles: ${p.customDetails || 'Por definir'}\n\n⏱️ Tiempo estimado: 2-4 semanas`;
  }

  // ============================================
  // RESPONSE HANDLERS
  // ============================================
  function handleGreeting() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";
    const name = state.clientData.name ? `, ${state.clientData.name}` : '';
    return {
      message: `${greeting}${name} ✨\n\n¡Bienvenida al atelier de Valentina Niebles! Soy tu asesora de moda personal. ¿En qué puedo ayudarte hoy?`,
      quickReplies: ["Ver colección", "Mi asesoría personal", "Prenda personalizada", "Agendar cita", "¿Qué está en tendencia?"]
    };
  }

  function handleSmartRecommendation(text, raw) {
    const prefs = state.context.userPreferences;
    const hasProfile = prefs.style || prefs.bodyType || prefs.colorSeason;

    if (hasProfile) {
      let msg = "💫 *Basándome en lo que sé de ti:*\n\n";
      if (prefs.style) msg += `Tu estilo es *${prefs.style}*. `;
      if (prefs.bodyType) msg += `Tu tipo de cuerpo es *${prefs.bodyType}*. `;
      if (prefs.colorSeason) msg += `Tu estación de color es *${prefs.colorSeason}*. `;
      msg += "\n\nCon todo esto, estas son MIS recomendaciones personales para ti:\n\n";

      // Score each product
      const scored = PRODUCTS.map(p => {
        let score = 0;
        if (prefs.style && STYLE_PROFILES[prefs.style]) {
          const sp = STYLE_PROFILES[prefs.style];
          if (sp.productos.includes(p.id)) score += 3;
          if (p.colores.some(c => sp.colores.includes(c))) score += 2;
          if (p.silueta && sp.siluetas.includes(p.silueta)) score += 2;
        }
        if (prefs.bodyType && BODY_TYPES[prefs.bodyType]) {
          if (BODY_TYPES[prefs.bodyType].productos.includes(p.id)) score += 3;
        }
        if (prefs.colorSeason && COLOR_SEASONS[prefs.colorSeason]) {
          if (COLOR_SEASONS[prefs.colorSeason].mejores.includes(p.id)) score += 2;
          if (p.colores.some(c => COLOR_SEASONS[prefs.colorSeason].colores.includes(c))) score += 1;
        }
        return { ...p, score };
      }).sort((a, b) => b.score - a.score);

      const top = scored.slice(0, 3);
      let extra = '';
      top.forEach(p => {
        msg += `💎 *${p.nombre}* (${p.tipo}) - ${p.precioStr}\n${p.desc}\n\n`;
        extra += renderProductCard(p);
      });

      msg += "Estas piezas fueron seleccionadas específicamente para ti. ¿Cuál te gusta más?";

      return { message: msg, extra, quickReplies: ["Más detalles", "Outfit completo", "Prenda personalizada", "Otra consulta"] };
    }

    // No profile yet - offer analysis
    return {
      message: "💫 ¡Me encantaría darte recomendaciones personalizadas!\n\nPara hacerlo bien, puedo analizar:\n\n📐 *Tu tipo de cuerpo* - qué siluetas te favorecen\n🎨 *Tu estilo personal* - qué vibra tienes\n🌈 *Tu estación de color* - qué colores te iluminan\n\n¿Por cuál empezamos?",
      quickReplies: ["Analizar mi cuerpo", "Analizar mi estilo", "Analizar mis colores", "Solo ver la colección"]
    };
  }

  function startBodyAnalysis() {
    state.context.currentFlow = 'body_bust';
    return { message: "📐 *Análisis de tipo de cuerpo*\n\nVoy a determinar tu silueta para recomendarte las prendas perfectas.\n\nNecesito 3 medidas (en cm):\n\n1️⃣ *Busto:* Mide alrededor de la parte más amplia, con la cinta recta.\n\n¿Cuánto mide tu busto en cm?" };
  }

  function startStyleQuiz() {
    state.context.currentFlow = 'style_q1';
    return { message: "🎨 *Quiz de Estilo Personal*\n\n4 preguntas rápidas para descubrir tu estilo:\n\n1️⃣ Si tu clóset ideal tuviera un color predominante, ¿cuál sería?\n\n• Pasteles suaves (rosa, lavanda, crema)\n• Neutros (negro, blanco, beige)\n• Tonos tierra (camel, verde, terracota)\n• Colores intensos (rojo, azul eléctrico, fucsia)" };
  }

  function startColorAnalysis() {
    state.context.currentFlow = 'color_q1';
    return { message: "🌈 *Análisis de Estación de Color*\n\nDescubriré qué colores te favorecen según tu tono de piel.\n\n1️⃣ Mira las venas de tu muñeca con luz natural. ¿De qué color se ven?\n\n• Verdes\n• Azules o moradas\n• No puedo distinguir / ambas" };
  }

  function handlePersonalShopper() {
    return {
      message: "👗 *Asesoría Personal de Moda*\n\nComo tu personal shopper, puedo ayudarte con:\n\n✨ *Outfit completo* - armo looks desde cero\n📐 *Análisis de cuerpo* - qué siluetas te favorecen\n🎨 *Análisis de estilo* - tu personalidad de moda\n🌈 *Análisis de color* - tu paleta ideal\n🎯 *Para eventos* - qué usar según la ocasión\n💰 *Por presupuesto* - opciones en tu rango\n\n¿Qué necesitas?",
      quickReplies: ["Armar outfit", "Analizar mi cuerpo", "Analizar mi estilo", "Analizar mis colores", "Para un evento"]
    };
  }

  function handleOutfitBuilder(text) {
    const t = normalize(text);
    let outfitKey = null;

    if (/boda|matrimonio/.test(t)) outfitKey = 'bodaInvitada';
    else if (/gala|formal/.test(t)) outfitKey = 'galaCompleta';
    else if (/coctel/.test(t)) outfitKey = 'coctel';
    else if (/oficina|trabajo|corporativo/.test(t)) outfitKey = 'oficina';
    else if (/casual|dia a dia|diario/.test(t)) outfitKey = 'casual';
    else if (/fiesta|noche/.test(t)) outfitKey = 'fiestaNoche';

    if (outfitKey && OUTFITS[outfitKey]) {
      const outfit = OUTFITS[outfitKey];
      const piezas = outfit.piezas.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
      let extra = '';
      let msg = `👗 *Outfit: ${outfitKey.charAt(0).toUpperCase() + outfitKey.slice(1)}*\n\n${outfit.msg}\n\n`;
      piezas.forEach(p => { msg += `✨ *${p.nombre}* - ${p.precioStr}\n${p.desc}\n\n`; extra += renderProductCard(p); });
      const total = piezas.reduce((sum, p) => sum + p.precio, 0);
      msg += `💰 Total del outfit: *$${total.toLocaleString('es-CO')}*`;
      return { message: msg, extra, quickReplies: ["Me encanta", "Otro outfit", "Prenda personalizada"] };
    }

    // Generic outfit builder
    return {
      message: "👗 *Armemos tu outfit perfecto*\n\n¿Para qué ocasión lo necesitas?\n\n• Boda / Matrimonio\n• Gala / Formal\n• Cóctel\n• Oficina / Trabajo\n• Casual / Día a día\n• Fiesta / Noche",
      quickReplies: ["Boda", "Gala", "Cóctel", "Oficina", "Casual", "Fiesta"]
    };
  }

  function handleEventRecommendation(text) {
    const t = normalize(text);
    let event = 'fiesta';
    if (/boda|matrimonio/.test(t)) event = 'boda';
    else if (/gala|formal/.test(t)) event = 'gala';
    else if (/graduacion/.test(t)) event = 'graduacion';
    else if (/quince/.test(t)) event = 'quince';

    const recs = {
      boda: { msg: "💒 *Para una boda:*\n\nComo invitada, busca vestidos largos o midi en seda o satén. Evita el blanco (es de la novia).\n\nTonos ideales: champagne, rosa viejo, azul marino, verde esmeralda.\n\nNuestro *Aurora* en seda con bordados es perfecto para este tipo de evento.", filter: ["gala","elegante","seda"] },
      gala: { msg: "✨ *Para una gala:*\n\nApuesta por un vestido statement. Cortes sirena o asimétricos con detalles especiales.\n\nColores oscuros con toques metálicos son siempre un acierto.\n\n*Noche Eterna* y *Luna* son nuestras estrellas para galas.", filter: ["gala","elegante","noche"] },
      graduacion: { msg: "🎓 *Para tu graduación:*\n\nUn vestido midi o conjunto elegante son perfectos. Algo que puedas volver a usar.\n\nTonos pastel o colores vibrantes según tu estilo.\n\n*Esmeralda* y *Sol* son ideales para celebrar.", filter: ["elegante","moderno","casual"] },
      quince: { msg: "👑 *Para quinceañera:*\n\nVestidos largos con detalles especiales. Puedes ir por algo romántico o moderno.\n\nTonos rosa, dorado o los colores de la fiesta.\n\nPodemos crear algo completamente personalizado.", filter: ["fiesta","elegante","romantico"] },
      fiesta: { msg: "🎉 *Para una fiesta:*\n\nDependiendo del tipo de fiesta:\n\n• Formal: *Noche Eterna* o *Luna*\n• Casual: *Esmeralda* o *Sol*\n• Cóctel: *Luna* con su asimetría única\n\n¿Qué tipo de fiesta es?", filter: ["fiesta","elegante"] }
    };

    const rec = recs[event] || recs.fiesta;
    const filtered = PRODUCTS.filter(p => p.tags.some(tg => rec.filter.includes(tg)));
    let extra = '';
    filtered.slice(0, 3).forEach(p => extra += renderProductCard(p));

    return { message: rec.msg, extra, quickReplies: ["Ver más", "Outfit completo", "Prenda personalizada", "Asesoría de estilo"] };
  }

  function handleCustomClothing() {
    state.context.currentFlow = 'custom_color';
    return {
      message: "✂️ *Diseño Personalizado*\n\n¡Me encanta que quieras algo único! En Valentina Niebles creamos piezas exclusivas solo para ti.\n\nEmpecemos:\n\n🎨 ¿Qué color o colores imaginas para tu prenda?",
      quickReplies: ["Tonos neutros", "Colores vibrantes", "Pasteles", "Metálicos", "No estoy segura"]
    };
  }

  function handleAppointment() {
    state.context.currentFlow = 'appt_type';
    return {
      message: "📅 *Agendar Cita*\n\n¿Qué tipo de cita necesitas?\n\n• Diseño Personalizado (60 min)\n• Toma de Medidas (30 min)\n• Asesoría de Moda (45 min)\n• Prueba de Vestuario (45 min)",
      quickReplies: ["Diseño Personalizado", "Toma de Medidas", "Asesoría de Moda", "Prueba de Vestuario"]
    };
  }

  function handleOrderTracking() {
    const orders = state.clientData.orderHistory;
    if (orders.length > 0) {
      let msg = "📦 *Tus pedidos:*\n\n";
      let extra = '';
      orders.forEach(o => { msg += `• ${o.id} - ${o.estado}\n`; extra += renderOrderStatus(o); });
      return { message: msg, extra };
    }
    return {
      message: "📦 Para rastrear tu pedido, necesito tu número de orden.\n\nLo encuentras en el email de confirmación.\n\n¿Cuál es tu número?",
      quickReplies: ["No lo tengo", "Contactar por WhatsApp"]
    };
  }

  function handleSizeHelp() {
    state.context.currentFlow = 'size_bust';
    return {
      message: "📏 *Encontrar tu talla*\n\nTe guío paso a paso:\n\n1️⃣ *Busto:* Mide alrededor de la parte más amplia, con cinta métrica ajustada pero sin apretar.\n\n¿Cuánto mide en cm?",
      quickReplies: ["No tengo cinta métrica", "Ver tabla de tallas"]
    };
  }

  function handleViewAll() {
    let msg = "✨ *Colección Completa*\n\nCada pieza es única y diseñada con amor:\n\n";
    let extra = '';
    PRODUCTS.forEach(p => { msg += `💎 *${p.nombre}* - ${p.precioStr}\n${p.desc}\n\n`; extra += renderProductCard(p); });
    msg += "¿Cuál te llama la atención? Puedo darte recomendaciones personalizadas.";
    return { message: msg, extra, quickReplies: ["Mi asesoría personal", "Prenda personalizada", "Outfit completo", "Descuentos"] };
  }

  function handleCategory(cat) {
    const filtered = PRODUCTS.filter(p => p.tags.includes(cat) || p.tipo.toLowerCase().includes(cat));
    if (filtered.length === 0) return { message: "Déjame mostrarte lo mejor ✨", quickReplies: ["Ver toda la colección", "Vestidos", "Conjuntos"] };

    let msg = `💎 *${cat.charAt(0).toUpperCase() + cat.slice(1)}:*\n\n`;
    let extra = '';
    filtered.forEach(p => { msg += `• *${p.nombre}* - ${p.precioStr}\n${p.desc}\n\n`; extra += renderProductCard(p); });
    return { message: msg, extra, quickReplies: ["Más detalles", "Combinar con...", "Prenda personalizada"] };
  }

  function handleTrends() {
    return {
      message: "✨ *Tendencias 2026:*\n\n🍂 Tonos tierra - beige, terracota, chocolate\n✂️ Cortes asimétricos - irregulares y modernos\n✨ Detalles metálicos sutiles - dorado y plateado\n🌿 Telas naturales - lino, algodón orgánico, seda\n💫 Minimalismo elegante - menos es más\n👗 Siluetas fluidas - comodidad con estilo\n\nNuestra colección refleja estas tendencias. ¿Quieres ver las piezas más trending?",
      quickReplies: ["Ver trending", "Vestidos de gala", "Outfit completo", "Prenda personalizada"]
    };
  }

  function handleBudget(text) {
    state.context.currentFlow = 'budget_range';
    return { message: "💰 *Buscar por presupuesto*\n\n¿Cuál es tu rango?\n\n• $200.000 - $400.000\n• $400.000 - $600.000\n• $600.000 - $900.000\n• Más de $900.000\n• Sin límite", quickReplies: ["$200-400K", "$400-600K", "$600-900K", "$900K+", "Sin límite"] };
  }

  function handleNewArrivals() {
    const newProds = PRODUCTS.filter(p => p.tags.includes('nuevo') || p.id <= 2);
    let msg = "🆕 *Recién Llegados:*\n\n";
    let extra = '';
    newProds.slice(0, 3).forEach(p => { msg += `✨ *${p.nombre}* - ${p.precioStr}\n${p.desc}\n\n`; extra += renderProductCard(p); });
    return { message: msg, extra, quickReplies: ["Más detalles", "Ver toda la colección", "Prenda personalizada"] };
  }

  function handleDiscount() {
    const promos = [
      { codigo: "MINOVIA15", descuento: "15%", desc: "Primera compra", minCompra: "$200.000" },
      { codigo: "VIP20", descuento: "20%", desc: "Clientas frecuentes", minCompra: "$350.000" },
      { codigo: "NUEVA2026", descuento: "10%", desc: "Nueva colección", minCompra: "" }
    ];
    let msg = "🎁 *Promociones Activas:*\n\n";
    let extra = '';
    promos.forEach(p => { msg += `• ${p.desc}: ${p.descuento} OFF\n`; extra += renderDiscountCard(p); });
    return { message: msg, extra, quickReplies: ["Ver colección", "Comprar ahora"] };
  }

  function handleContact() {
    return {
      message: `💬 *Contacto:*\n\n📱 WhatsApp: ${BRAND.phone}\n📧 Email: ${BRAND.email}\n📍 ${BRAND.location}\n🕐 Lun-Vie 9AM-6PM, Sáb 10AM-3PM\n\n¡Estoy aquí 24/7 para ti! ¿En qué te ayudo?`,
      quickReplies: ["WhatsApp", "Agendar cita", "Ver colección"]
    };
  }

  function handleInfo(text) {
    if (/horario|hora|abierto/.test(text)) return { message: "🕐 *Horario:*\n\nLun-Vie: 9:00 AM - 6:00 PM\nSábados: 10:00 AM - 3:00 PM\nDomingos: Cerrado\n\nPero yo estoy aquí 24/7 ✨", quickReplies: ["Agendar cita", "Ver colección"] };
    if (/ubicacion|donde|direccion/.test(text)) return { message: `📍 Estamos en ${BRAND.location}.\n\nTambién ofrecemos citas virtuales para asesorías de moda. ¿Quieres agendar una?`, quickReplies: ["Cita virtual", "Cita presencial"] };
    return { message: "¿Qué información necesitas?", quickReplies: ["Horarios", "Ubicación", "Contacto"] };
  }

  function handleShipping() {
    return {
      message: "📦 *Envíos:*\n\n🇨🇴 Nacional: 5-8 días hábiles\n🌍 Internacional: 10-15 días\n⚡ Express: 2-3 días (+$25.000)\n\n💡 ¡Envío GRATIS en compras +$300.000!",
      quickReplies: ["Rastrear pedido", "Ver colección"]
    };
  }

  function handlePayment() {
    return {
      message: "💳 *Pagos:*\n\n• Tarjetas (Visa, MC, Amex)\n• PayPal\n• Transferencia bancaria\n• Contra entrega (ciudades principales)\n\n100% seguro. ¿Tienes otra duda?",
      quickReplies: ["Ver colección", "Finalizar compra"]
    };
  }

  function handleReturns() {
    return {
      message: "🔄 *Cambios y Devoluciones:*\n\n• 30 días para cambios/devoluciones\n• Prenda sin uso con etiquetas\n• Personalizados: ajustes gratuitos\n• Reembolso: 5-7 días hábiles\n\nTu satisfacción es prioridad 💫",
      quickReplies: ["Necesito cambio", "Ver colección"]
    };
  }

  function handleSpecificMaterial(text) {
    const t = normalize(text);
    let mat = null;
    if (/seda/.test(t)) mat = 'seda';
    else if (/algodon/.test(t)) mat = 'algodon';
    else if (/lino/.test(t)) mat = 'lino';
    else if (/sat/.test(t)) mat = 'saten';
    else if (/terciopelo/.test(t)) mat = 'terciopelo';
    else if (/chiffon/.test(t)) mat = 'chiffon';
    else if (/crepe/.test(t)) mat = 'crepe';

    if (mat && MATERIALS[mat]) {
      const m = MATERIALS[mat];
      const related = PRODUCTS.filter(p => p.tags.includes(mat) || p.desc.toLowerCase().includes(mat));
      let msg = `🧵 *${mat.charAt(0).toUpperCase() + mat.slice(1)}*\n\n${m.desc}\n\n🧼 Cuidado: ${m.cuidado}\n💎 Nivel: ${m.precio}`;
      if (related.length > 0) {
        msg += "\n\nPrendas en este material:";
        let extra = '';
        related.forEach(p => extra += renderProductCard(p));
        return { message: msg, extra, quickReplies: ["Ver prendas", "Otro material"] };
      }
      return { message: msg, quickReplies: ["Ver materiales", "Prenda personalizada"] };
    }
    return handleMaterials();
  }

  function handleMaterials() {
    return {
      message: "🧵 *Nuestros Materiales:*\n\n• *Seda* - Premium, gala, alta costura\n• *Satén* - Sofisticado, noche\n• *Terciopelo* - Lujo puro\n• *Lino* - Fresco, elegante\n• *Algodón* - Cómodo, diario\n• *Chiffon* - Ligero, romántico\n• *Crepe* - Elegante, práctico\n\n¿Cuál te interesa?",
      quickReplies: ["Seda", "Satén", "Lino", "Algodón", "Terciopelo"]
    };
  }

  function handleThanks() {
    return {
      message: "¡Ha sido un placer! 💫\n\nEstoy aquí 24/7. ¡Que tengas un día tan hermoso como tú! ✨",
      quickReplies: ["Ver colección", "Agendar cita"]
    };
  }

  function handleGoodbye() {
    const name = state.clientData.name ? `, ${state.clientData.name}` : '';
    return { message: `¡Hasta pronto${name}! 💕\n\nEn Valentina Niebles siempre tendrás un lugar especial. ¡Que la moda te acompañe! ✨`, quickReplies: [] };
  }

  function handleAffirmative() {
    return { message: "¡Perfecto! 😊 ¿En qué te puedo ayudar?", quickReplies: ["Ver colección", "Mi asesoría personal", "Prenda personalizada", "Agendar cita"] };
  }

  function handleNegative() {
    return { message: "Sin problema ✨ Si cambias de opinión, aquí estaré. ¿Hay algo más en lo que pueda ayudarte?", quickReplies: ["Ver colección", "Otra consulta"] };
  }

  function handleNeedsHelp() {
    return {
      message: "¡Tranquila, para eso estoy! 💕\n\nPuedo ayudarte a:\n\n✨ Encontrar la prenda perfecta\n📐 Saber qué te favorece según tu cuerpo\n🎨 Descubrir tus colores ideales\n👗 Armar outfits completos\n✂️ Crear una prenda personalizada\n📅 Agendar una cita\n\n¿Por dónde quieres empezar?",
      quickReplies: ["Mi asesoría personal", "Ver colección", "Prenda personalizada", "Agendar cita"]
    };
  }

  function handleConversational(raw) {
    const t = normalize(raw);
    const prefs = state.context.userPreferences;

    // Context-aware responses
    if (/soy|tengo|mido|peso|mi/.test(t)) {
      return {
        message: `Gracias por compartir eso conmigo 💕\n\nCada detalle me ayuda a darte mejores recomendaciones. ¿Te gustaría que haga un análisis completo de qué prendas te favorecen más?`,
        quickReplies: ["Sí, analízame", "Solo ver ropa", "Tengo otra pregunta"]
      };
    }

    if (/bonita|bonito|hermosa|linda|me gusta|quiero|amo|encanta/.test(t)) {
      return {
        message: "¡Tienes un gusto increíble! ✨\n\nEsa pieza es una de nuestras favoritas también. ¿Quieres que te sugiera cómo combinarla o ver piezas similares?",
        quickReplies: ["Cómo combinarla", "Piezas similares", "Ver más"]
      };
    }

    if (/caro|costoso|precio alto|no puedo/.test(t)) {
      return {
        message: "Entiendo perfectamente 💕\n\nTenemos opciones en diferentes rangos. También podemos crear una prenda personalizada ajustada a tu presupuesto.\n\n¿Cuánto tienes en mente?",
        quickReplies: ["$200-400K", "$400-600K", "Prenda personalizada", "Ver descuentos"]
      };
    }

    if (/urgente|rapido|pronto|necesito ya|para manana/.test(t)) {
      return {
        message: "⚡ Para entregas urgentes:\n\n• Prendas de colección: envío express 2-3 días\n• Personalizadas: mínimo 2 semanas\n\n¿Para cuándo lo necesitas exactamente? Así te digo qué es posible.",
        quickReplies: ["Esta semana", "En 2 semanas", "Sin urgencia"]
      };
    }

    // Default conversational
    const responses = [
      `Entiendo lo que dices 💫 Para darte la mejor asesoría, ¿te gustaría que analicemos tu estilo y tipo de cuerpo? Así te recomiendo exactamente lo que te favorece.`,
      `¡Me encanta que estés aquí! 🌟 Cuéntame más: ¿buscas algo para un evento especial o para tu día a día?`,
      `Buena pregunta ✨ Como tu asesora personal, puedo ayudarte con recomendaciones basadas en tu estilo, cuerpo y colores. ¿Empezamos con un análisis rápido?`
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      quickReplies: ["Mi asesoría personal", "Ver colección", "Prenda personalizada", "Agendar cita"]
    };
  }

  // ============================================
  // MAIN HANDLER
  // ============================================
  function handleUserInput(text) {
    if (!text.trim()) return;
    addUserMessage(text);
    quickRepliesEl.innerHTML = '';
    showTyping();

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      hideTyping();
      const response = processInput(text);
      if (response) {
        addBotMessage(response.message, response.extra || null);
        if (response.quickReplies && response.quickReplies.length > 0) {
          setTimeout(() => showQuickReplies(response.quickReplies), 300);
        }
      }
      saveState();
    }, delay);
  }

  function setupEventListeners() {
    toggleBtn.addEventListener('click', toggleChat);
    minimizeBtn.addEventListener('click', toggleChat);
    sendBtn.addEventListener('click', () => {
      const t = inputEl.value.trim();
      if (t) { inputEl.value = ''; handleUserInput(t); }
    });
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const t = inputEl.value.trim();
        if (t) { inputEl.value = ''; handleUserInput(t); }
      }
    });
    messagesEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('vn-schedule-slot')) {
        const v = e.target.dataset.day || e.target.dataset.time;
        if (v) handleUserInput(v);
      }
    });
    let cartTimer;
    document.addEventListener('mousemove', () => {
      clearTimeout(cartTimer);
      cartTimer = setTimeout(() => {
        if (!state.context.cartAbandoned && !state.isOpen) {
          state.context.cartAbandoned = true;
          saveState();
          const badge = toggleBtn.querySelector('.vn-notification-badge');
          if (badge) { badge.style.display = 'flex'; badge.textContent = '1'; }
        }
      }, 300000);
    });
  }

  function init() {
    loadState();
    initDOM();
    setupEventListeners();
    if (state.context.isReturningClient) {
      const badge = toggleBtn.querySelector('.vn-notification-badge');
      if (badge) { badge.style.display = 'flex'; badge.textContent = '✨'; }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.VNChatbot = {
    init: () => {},
    open: () => { if (!state.isOpen) toggleChat(); },
    close: () => { if (state.isOpen) toggleChat(); },
    sendMessage: (t) => handleUserInput(t),
    getState: () => state,
    setClientData: (d) => { Object.assign(state.clientData, d); saveState(); },
    resetProfile: () => { state.context.userPreferences = {}; state.context.detectedStyle = null; state.context.detectedBodyType = null; state.context.detectedColorSeason = null; saveState(); }
  };

})();
