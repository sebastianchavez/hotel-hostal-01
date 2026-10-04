/* =====================================================
   HOSTAL CASA DEL SOL · main.js
   Lógica compartida del template (Storage, Auth, Reservas, UI)
   ===================================================== */

const STORAGE_KEYS = {
  USERS: 'hs_users',
  SESSION: 'hs_session',
  RESERVAS: 'hs_reservas',
  RESERVA_DRAFT: 'hs_reserva_draft',
  PAGO_DRAFT: 'hs_pago_draft'
};

/* ============== CATALOGO ============== */
const HABITACIONES = [
  {
    id: 'h-single', tipo: 'privada', nombre: 'Habitación Single',
    descripcion: 'Acogedora habitación individual con cama queen, ideal para viajeros solos que buscan comodidad y descanso.',
    capacidad: 1, precio: 120,
    imagen: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
    amenidades: ['Wi-Fi', 'TV', 'Baño privado', 'Aire acondicionado']
  },
  {
    id: 'h-doble', tipo: 'privada', nombre: 'Habitación Doble',
    descripcion: 'Espaciosa habitación con dos camas individuales, perfecta para compartir en familia o con tu pareja de aventura.',
    capacidad: 2, precio: 180,
    imagen: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80',
    amenidades: ['Wi-Fi', 'TV', 'Baño privado', 'Aire acondicionado', 'Escritorio']
  },
  {
    id: 'h-twin', tipo: 'privada', nombre: 'Habitación Twin',
    descripcion: 'Habitación clásica con dos camas separadas, ideal para amigos o colegas que viajan juntos.',
    capacidad: 2, precio: 180,
    imagen: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80',
    amenidades: ['Wi-Fi', 'TV', 'Baño privado', 'Aire acondicionado']
  },
  {
    id: 'h-matri', tipo: 'privada', nombre: 'Habitación Matrimonial',
    descripcion: 'Romántica habitación con cama king size, decoración cálida y todas las comodidades para una estadía especial.',
    capacidad: 2, precio: 210,
    imagen: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80',
    amenidades: ['Wi-Fi', 'TV', 'Baño privado', 'Aire acondicionado', 'Balcón']
  },
  {
    id: 'h-family', tipo: 'privada', nombre: 'Habitación Familiar',
    descripcion: 'Amplia habitación para toda la familia, con capacidad hasta 4 personas y zona de estar.',
    capacidad: 4, precio: 320,
    imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
    amenidades: ['Wi-Fi', 'TV', 'Baño privado', 'Aire acondicionado', 'Sofá cama', 'Balcón']
  },
  {
    id: 'd-4mix', tipo: 'compartida', nombre: 'Dormitorio 4 Camas (Mixto)',
    descripcion: 'Dormitorio compartido moderno, literas cómodas con cortina, luz individual y locker privado.',
    capacidad: 4, precio: 60,
    imagen: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=80',
    amenidades: ['Wi-Fi', 'Locker', 'Luz individual', 'Cortina privacidad', 'Baño compartido']
  },
  {
    id: 'd-6fem', tipo: 'compartida', nombre: 'Dormitorio 6 Camas (Femenino)',
    descripcion: 'Dormitorio exclusivo para mujeres, ambiente seguro y cómodo con todas las comodidades.',
    capacidad: 6, precio: 55,
    imagen: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&q=80',
    amenidades: ['Wi-Fi', 'Locker', 'Luz individual', 'Cortina privacidad', 'Baño compartido']
  },
  {
    id: 'd-8mix', tipo: 'compartida', nombre: 'Dormitorio 8 Camas (Mixto)',
    descripcion: 'Nuestra opción más económica, ideal para mochileros. Espacios amplios y ambiente sociable.',
    capacidad: 8, precio: 45,
    imagen: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80',
    amenidades: ['Wi-Fi', 'Locker', 'Luz individual', 'Baño compartido']
  }
];

const SERVICIOS_EXTRA = [
  { id: 's-desayuno', nombre: 'Desayuno buffet', descripcion: 'Desayuno buffet con productos locales y frescos.', precio: 25, icono: 'coffee' },
  { id: 's-aeropuerto', nombre: 'Traslado aeropuerto', descripcion: 'Traslado privado desde/hacia el aeropuerto.', precio: 60, icono: 'plane' },
  { id: 's-lavanderia', nombre: 'Lavandería', descripcion: 'Servicio de lavado y secado por kilogramo.', precio: 15, icono: 'wash' },
  { id: 's-equipaje', nombre: 'Custodia de equipaje', descripcion: 'Guarda tu equipaje seguro antes o después del check-in.', precio: 10, icono: 'suitcase' },
  { id: 's-tour', nombre: 'Tour por la ciudad', descripcion: 'Tour grupal por los atractivos turísticos imperdibles.', precio: 80, icono: 'map' },
  { id: 's-bicicleta', nombre: 'Alquiler de bicicleta', descripcion: 'Bicicletas disponibles para recorrer la ciudad.', precio: 20, icono: 'bike' }
];

const HORARIOS = {
  recepcion:  { abierto: true,  desde: '00:00', hasta: '23:59', detalle: 'Recepción 24/7' },
  restaurante:{ lunes:{abierto:true,desde:'07:00',hasta:'22:00'}, martes:{abierto:true,desde:'07:00',hasta:'22:00'},
               miercoles:{abierto:true,desde:'07:00',hasta:'22:00'}, jueves:{abierto:true,desde:'07:00',hasta:'22:00'},
               viernes:{abierto:true,desde:'07:00',hasta:'23:00'}, sabado:{abierto:true,desde:'07:00',hasta:'23:00'},
               domingo:{abierto:true,desde:'08:00',hasta:'21:00'}, detalle:'Restaurante' },
  desayuno:  { lunes:{abierto:true,desde:'07:00',hasta:'10:30'}, martes:{abierto:true,desde:'07:00',hasta:'10:30'},
               miercoles:{abierto:true,desde:'07:00',hasta:'10:30'}, jueves:{abierto:true,desde:'07:00',hasta:'10:30'},
               viernes:{abierto:true,desde:'07:00',hasta:'10:30'}, sabado:{abierto:true,desde:'07:00',hasta:'11:00'},
               domingo:{abierto:true,desde:'08:00',hasta:'11:00'}, detalle:'Desayuno' },
  checkin:   { desde: '14:00', hasta: '23:00', detalle: 'Check-in' },
  checkout:  { desde: '07:00', hasta: '11:00', detalle: 'Check-out' }
};

const TESTIMONIOS = [
  { nombre: 'María Rodríguez', pais: 'Argentina', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', rating: 5, texto: 'Increíble experiencia. El hostal es precioso, la atención del personal es de primera y la ubicación es perfecta para conocer la ciudad.' },
  { nombre: 'Tomás Pereira', pais: 'Brasil', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', rating: 5, texto: 'Sin duda el mejor hostal en el que me he hospedado. Las habitaciones impecables y el ambiente muy cálido. Volveré sin pensarlo.' },
  { nombre: 'Sofía López', pais: 'Chile', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', rating: 5, texto: 'El desayuno buffet es espectacular, las habitaciones son cómodas y el personal siempre atento. Recomendado al 100%.' },
  { nombre: 'Andrés Vega', pais: 'Colombia', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', rating: 5, texto: 'Pasé una semana aquí y me sentí como en casa. La terraza es preciosa y el coworking muy cómodo para los que viajamos por trabajo.' }
];

const FAQ_ITEMS = [
  { q: '¿Cuál es el horario de check-in y check-out?', a: 'El check-in se realiza a partir de las 14:00 y el check-out hasta las 11:00. Si necesitas llegar antes o salir más tarde, consulta por nuestro servicio de custodia de equipaje gratuito.' },
  { q: '¿Ofrecen traslado desde el aeropuerto?', a: 'Sí, ofrecemos servicio de traslado privado desde y hacia el aeropuerto. Puedes agregarlo al momento de hacer tu reserva por un costo adicional de S/ 60.' },
  { q: '¿El desayuno está incluido?', a: 'El desayuno buffet tiene un costo adicional de S/ 25 por persona. Sirve todos los días de 07:00 a 10:30 (fines de semana hasta las 11:00) e incluye opciones locales, internacionales, vegetarianas y veganas.' },
  { q: '¿Tienen espacios comunes para trabajar?', a: 'Sí, contamos con un área de coworking con Wi-Fi de alta velocidad, disponible las 24 horas para todos nuestros huéspedes.' },
  { q: '¿Cuál es la política de cancelación?', a: 'Puedes cancelar sin cargo hasta 48 horas antes de la fecha de entrada. Cancelaciones posteriores tienen un cargo equivalente a la primera noche.' },
  { q: '¿Aceptan mascotas?', a: 'Sí, somos un hostal pet-friendly. Aceptamos perros y gatos pequeños con un cargo adicional de S/ 30 por mascota.' },
  { q: '¿Organizan tours y actividades?', a: 'Ofrecemos tours guiados por la ciudad, caminatas, tours gastronómicos y experiencias culturales. Consulta en recepción o al hacer tu reserva.' }
];

/* ============== STORAGE ============== */
const Storage = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { console.error('Storage error', e); }
  },
  remove(key) { localStorage.removeItem(key); }
};

/* ============== AUTH ============== */
const Auth = {
  init() {
    const users = Storage.get(STORAGE_KEYS.USERS, []);
    if (users.length === 0) {
      Storage.set(STORAGE_KEYS.USERS, [
        {
          id: 'u1', nombre: 'Ana García', email: 'ana@test.com', telefono: '+51 999 111 222',
          password: '123456',
          foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
          creado_en: '2025-01-15'
        },
        {
          id: 'u2', nombre: 'Luis Mendoza', email: 'luis@test.com', telefono: '+51 999 333 444',
          password: '123456',
          foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
          creado_en: '2025-03-22'
        }
      ]);
    }

    const reservas = Storage.get(STORAGE_KEYS.RESERVAS, []);
    if (reservas.length === 0) {
      const hoy = new Date();
      const fmt = (d) => d.toISOString().split('T')[0];
      const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

      Storage.set(STORAGE_KEYS.RESERVAS, [
        {
          id: 'HS-A1B2C3', userId: 'u1', habitacionId: 'h-matri',
          fechaEntrada: fmt(addDays(hoy, -30)), fechaSalida: fmt(addDays(hoy, -27)),
          huespedes: 2, serviciosExtra: ['s-desayuno', 's-tour'],
          total: 870, estado: 'completada',
          pago: { metodo: 'Tarjeta de crédito', referencia: 'TX-998877', fechaPago: fmt(addDays(hoy, -31)) },
          createdAt: addDays(hoy, -32).toISOString()
        },
        {
          id: 'HS-D4E5F6', userId: 'u1', habitacionId: 'd-4mix',
          fechaEntrada: fmt(addDays(hoy, 5)), fechaSalida: fmt(addDays(hoy, 8)),
          huespedes: 1, serviciosExtra: [],
          total: 180, estado: 'confirmada',
          pago: { metodo: 'Yape', referencia: 'YP-445566', fechaPago: fmt(addDays(hoy, -1)) },
          createdAt: addDays(hoy, -1).toISOString()
        },
        {
          id: 'HS-G7H8I9', userId: 'u1', habitacionId: 'h-doble',
          fechaEntrada: fmt(addDays(hoy, -10)), fechaSalida: fmt(addDays(hoy, -8)),
          huespedes: 2, serviciosExtra: ['s-desayuno'],
          total: 410, estado: 'cancelada',
          pago: null,
          motivoCancelacion: 'Cambio de planes',
          createdAt: addDays(hoy, -15).toISOString()
        }
      ]);
    }
  },

  current() {
    return Storage.get(STORAGE_KEYS.SESSION, null);
  },

  login(email, password) {
    const users = Storage.get(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, error: 'Email o contraseña incorrectos.' };
    const sessionUser = { id: user.id, nombre: user.nombre, email: user.email, telefono: user.telefono, foto: user.foto };
    Storage.set(STORAGE_KEYS.SESSION, sessionUser);
    return { ok: true, user: sessionUser };
  },

  register(data) {
    const users = Storage.get(STORAGE_KEYS.USERS, []);
    if (users.some(u => u.email === data.email)) {
      return { ok: false, error: 'Ya existe una cuenta con este email.' };
    }
    const newUser = {
      id: 'u' + Date.now(),
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      password: data.password,
      foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      creado_en: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    Storage.set(STORAGE_KEYS.USERS, users);
    const sessionUser = { id: newUser.id, nombre: newUser.nombre, email: newUser.email, telefono: newUser.telefono, foto: newUser.foto };
    Storage.set(STORAGE_KEYS.SESSION, sessionUser);
    return { ok: true, user: sessionUser };
  },

  logout() {
    Storage.remove(STORAGE_KEYS.SESSION);
  },

  updateProfile(data) {
    const session = this.current();
    if (!session) return { ok: false, error: 'No hay sesión activa.' };
    const users = Storage.get(STORAGE_KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === session.id);
    if (idx === -1) return { ok: false, error: 'Usuario no encontrado.' };
    users[idx] = { ...users[idx], ...data };
    Storage.set(STORAGE_KEYS.USERS, users);
    Storage.set(STORAGE_KEYS.SESSION, { ...session, ...data });
    return { ok: true, user: users[idx] };
  },

  recoverPassword(email) {
    const users = Storage.get(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email === email);
    if (!user) return { ok: false, error: 'No encontramos una cuenta con este email.' };
    return { ok: true };
  },

  requireAuth(redirectTo = 'inicio-sesion.html') {
    const session = this.current();
    if (!session) {
      window.location.href = redirectTo;
      return null;
    }
    return session;
  }
};

/* ============== RESERVAS ============== */
const Reservas = {
  generarId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'HS-';
    for (let i = 0; i < 6; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
    return id;
  },

  list() {
    return Storage.get(STORAGE_KEYS.RESERVAS, []);
  },

  byUser(userId) {
    return this.list().filter(r => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  byId(id) {
    return this.list().find(r => r.id === id);
  },

  calcularNoches(fechaEntrada, fechaSalida) {
    const d1 = new Date(fechaEntrada);
    const d2 = new Date(fechaSalida);
    return Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
  },

  calcularTotal(habitacionId, fechaEntrada, fechaSalida, serviciosIds = []) {
    const hab = HABITACIONES.find(h => h.id === habitacionId);
    if (!hab) return 0;
    const noches = this.calcularNoches(fechaEntrada, fechaSalida);
    let total = hab.precio * noches;
    serviciosIds.forEach(sid => {
      const srv = SERVICIOS_EXTRA.find(s => s.id === sid);
      if (srv) total += srv.precio;
    });
    return total;
  },

  validarDisponibilidad(habitacionId, fechaEntrada, fechaSalida) {
    return true;
  },

  create(data) {
    const reservas = this.list();
    const nueva = {
      id: this.generarId(),
      ...data,
      estado: 'pendiente',
      pago: null,
      createdAt: new Date().toISOString()
    };
    reservas.push(nueva);
    Storage.set(STORAGE_KEYS.RESERVAS, reservas);
    return nueva;
  },

  update(id, updates) {
    const reservas = this.list();
    const idx = reservas.findIndex(r => r.id === id);
    if (idx === -1) return null;
    reservas[idx] = { ...reservas[idx], ...updates };
    Storage.set(STORAGE_KEYS.RESERVAS, reservas);
    return reservas[idx];
  },

  confirmarPago(id, pago) {
    return this.update(id, {
      estado: 'confirmada',
      pago: { ...pago, fechaPago: new Date().toISOString().split('T')[0] }
    });
  },

  cancelar(id, motivo = '') {
    return this.update(id, {
      estado: 'cancelada',
      motivoCancelacion: motivo
    });
  },

  puedeCancelarse(reserva) {
    if (reserva.estado === 'cancelada' || reserva.estado === 'completada') return false;
    const hoy = new Date();
    const entrada = new Date(reserva.fechaEntrada);
    const horas = (entrada - hoy) / (1000 * 60 * 60);
    return horas >= 48;
  },

  requierePago(reserva) {
    return reserva.estado === 'pendiente';
  },

  estadoLabel(estado) {
    const labels = {
      pendiente: 'Pendiente de pago',
      confirmada: 'Confirmada',
      en_curso: 'En curso',
      completada: 'Completada',
      cancelada: 'Cancelada'
    };
    return labels[estado] || estado;
  }
};

/* ============== UI HELPERS ============== */
const UI = {
  formatCurrency(amount) {
    return 'S/ ' + Number(amount).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('es-PE', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  },

  formatDateShort(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
  },

  todayISO() {
    return new Date().toISOString().split('T')[0];
  },

  addDaysISO(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  },

  getURLParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  },

  Toast(message, type = 'success') {
    let el = document.querySelector('.toast-container');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast-container';
      document.body.appendChild(el);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = {
      success: '<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
      error: '<svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
      warning: '<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'
    };
    toast.innerHTML = `${icons[type] || icons.success}<span class="flex-1">${message}</span>`;
    el.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  Modal({ title, content, primaryText = 'Aceptar', secondaryText = 'Cancelar', onPrimary, onSecondary }) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop active';
    backdrop.innerHTML = `
      <div class="modal-content">
        <h3 class="font-display text-2xl font-bold text-primary mb-4">${title}</h3>
        <div class="text-muted mb-6">${content}</div>
        <div class="flex gap-3 justify-end">
          <button class="btn-ghost" data-action="close">${secondaryText}</button>
          <button class="btn-primary" data-action="primary">${primaryText}</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    const close = () => backdrop.remove();
    backdrop.querySelector('[data-action="close"]').addEventListener('click', () => {
      if (onSecondary) onSecondary();
      close();
    });
    backdrop.querySelector('[data-action="primary"]').addEventListener('click', () => {
      if (onPrimary) onPrimary();
      close();
    });
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
    return { close };
  }
};

/* ============== HEADER / FOOTER ============== */
function renderHeader() {
  const container = document.getElementById('appHeader');
  if (!container) return;
  const session = Auth.current();
  const page = document.body.dataset.page || '';

  const navItems = [
    { href: 'index.html', label: 'Inicio', key: 'index' },
    { href: 'servicios.html', label: 'Servicios', key: 'servicios' },
    { href: 'galeria.html', label: 'Galería', key: 'galeria' },
    { href: 'precios.html', label: 'Precios', key: 'precios' },
    { href: 'contacto.html', label: 'Contacto', key: 'contacto' }
  ];

  const userMenu = session ? `
    <div class="relative group">
      <button class="flex items-center gap-2 hover:bg-background-soft px-3 py-2 rounded-full transition">
        <img src="${session.foto}" alt="${session.nombre}" class="w-8 h-8 rounded-full object-cover border-2 border-accent"/>
        <span class="hidden md:inline font-medium text-sm">${session.nombre.split(' ')[0]}</span>
        <svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div class="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-soft opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 overflow-hidden z-50">
        <div class="p-3 border-b border-soft">
          <p class="font-semibold text-sm">${session.nombre}</p>
          <p class="text-xs text-muted truncate">${session.email}</p>
        </div>
        <a href="perfil.html" class="block px-4 py-2.5 text-sm hover:bg-background-soft transition">Mi perfil</a>
        <a href="perfil.html#reservas" class="block px-4 py-2.5 text-sm hover:bg-background-soft transition">Mis reservas</a>
        <button id="logoutBtn" class="w-full text-left px-4 py-2.5 text-sm hover:bg-background-soft transition border-t border-soft text-red-600">Cerrar sesión</button>
      </div>
    </div>
  ` : `
    <a href="inicio-sesion.html" class="btn-ghost">Iniciar sesión</a>
    <a href="registro.html" class="btn-primary text-sm py-2 px-5">Registrarse</a>
  `;

  container.innerHTML = `
    <header class="bg-white/95 backdrop-blur-sm sticky top-0 z-40 border-b border-soft shadow-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <a href="index.html" class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>
            </div>
            <div>
              <p class="font-display text-xl font-bold text-primary leading-tight">Casa del Sol</p>
              <p class="text-[10px] uppercase tracking-widest text-muted">Hostal & Café</p>
            </div>
          </a>

          <nav class="hidden lg:flex items-center gap-8">
            ${navItems.map(item => `
              <a href="${item.href}" class="nav-link ${page === item.key ? 'active' : ''}">${item.label}</a>
            `).join('')}
          </nav>

          <div class="flex items-center gap-2">
            <a href="reserva.html" class="hidden sm:inline-flex btn-primary text-sm py-2 px-5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Reservar
            </a>
            <div class="hidden md:flex items-center gap-2">${userMenu}</div>

            <button id="mobileMenuBtn" class="lg:hidden p-2 rounded-lg hover:bg-background-soft" aria-label="Menú">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        <div id="mobileMenu" class="hidden lg:hidden pb-4 border-t border-soft pt-4 space-y-2">
          ${navItems.map(item => `
            <a href="${item.href}" class="block px-3 py-2 rounded-lg hover:bg-background-soft transition ${page === item.key ? 'bg-background-soft text-primary font-semibold' : ''}">${item.label}</a>
          `).join('')}
          <a href="reserva.html" class="block px-3 py-2 rounded-lg hover:bg-background-soft transition font-semibold text-primary">Reservar</a>
          ${session ? `
            <a href="perfil.html" class="block px-3 py-2 rounded-lg hover:bg-background-soft transition">Mi perfil</a>
            <button id="mobileLogoutBtn" class="w-full text-left px-3 py-2 rounded-lg hover:bg-background-soft transition text-red-600">Cerrar sesión</button>
          ` : `
            <a href="inicio-sesion.html" class="block px-3 py-2 rounded-lg hover:bg-background-soft transition">Iniciar sesión</a>
            <a href="registro.html" class="block px-3 py-2 rounded-lg hover:bg-background-soft transition">Registrarse</a>
          `}
        </div>
      </div>
    </header>
  `;

  const logout = () => {
    Auth.logout();
    UI.Toast('Sesión cerrada correctamente', 'success');
    setTimeout(() => window.location.href = 'index.html', 600);
  };
  const logoutBtn = document.getElementById('logoutBtn');
  const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
  if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', logout);

  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }
}

function renderFooter() {
  const container = document.getElementById('appFooter');
  if (!container) return;
  container.innerHTML = `
    <footer class="bg-background-dark text-gray-300 pt-16 pb-8 mt-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-dark" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>
              </div>
              <div>
                <p class="font-display text-xl font-bold text-white">Casa del Sol</p>
                <p class="text-[10px] uppercase tracking-widest text-accent">Hostal & Café</p>
              </div>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">Un refugio cálido en el corazón de la ciudad. Atención personalizada, ambiente acogedor y la mejor ubicación.</p>
          </div>
          <div>
            <h4 class="font-display text-lg font-semibold text-white mb-4">Navegación</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="index.html" class="hover:text-accent transition">Inicio</a></li>
              <li><a href="servicios.html" class="hover:text-accent transition">Servicios</a></li>
              <li><a href="galeria.html" class="hover:text-accent transition">Galería</a></li>
              <li><a href="precios.html" class="hover:text-accent transition">Precios</a></li>
              <li><a href="contacto.html" class="hover:text-accent transition">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-display text-lg font-semibold text-white mb-4">Legal</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="terminos.html" class="hover:text-accent transition">Términos y condiciones</a></li>
              <li><a href="privacidad.html" class="hover:text-accent transition">Políticas de privacidad</a></li>
              <li><a href="contacto.html" class="hover:text-accent transition">Atención al cliente</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-display text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Av. Sol 245, Cusco, Perú
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                +51 84 234 567
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                hola@casadelsol.pe
              </li>
            </ul>
            <div class="flex gap-3 mt-5">
              <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-primary-dark flex items-center justify-center transition" aria-label="Facebook"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg></a>
              <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-white flex items-center justify-center transition" aria-label="Instagram"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
              <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-white flex items-center justify-center transition" aria-label="WhatsApp"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
            </div>
          </div>
        </div>
        <div class="border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>© ${new Date().getFullYear()} Hostal Casa del Sol. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `;
}

/* ============== INIT ============== */
function initApp() {
  Auth.init();
  renderHeader();
  renderFooter();
}

/* ============== UTILIDADES PARA PÁGINAS ============== */
function getDraftReserva() {
  return Storage.get(STORAGE_KEYS.RESERVA_DRAFT, null);
}
function setDraftReserva(data) {
  Storage.set(STORAGE_KEYS.RESERVA_DRAFT, data);
}
function clearDraftReserva() {
  Storage.remove(STORAGE_KEYS.RESERVA_DRAFT);
}

function getDraftPago() {
  return Storage.get(STORAGE_KEYS.PAGO_DRAFT, null);
}
function setDraftPago(data) {
  Storage.set(STORAGE_KEYS.PAGO_DRAFT, data);
}
function clearDraftPago() {
  Storage.remove(STORAGE_KEYS.PAGO_DRAFT);
}

/* ============== INIT GLOBAL ============== */
document.addEventListener('DOMContentLoaded', () => {
  initApp();

  const page = document.body.dataset.page;
  if (page === 'index')          initIndex?.();
  if (page === 'servicios')      initServicios?.();
  if (page === 'galeria')        initGaleria?.();
  if (page === 'precios')        initPrecios?.();
  if (page === 'contacto')       initContacto?.();
  if (page === 'login')          initLogin?.();
  if (page === 'registro')       initRegistro?.();
  if (page === 'recuperar')      initRecuperar?.();
  if (page === 'terminos')       initTerminos?.();
  if (page === 'privacidad')     initPrivacidad?.();
  if (page === 'reserva')        initReserva?.();
  if (page === 'confirmacion')   initConfirmacion?.();
  if (page === 'pago')           initPago?.();
  if (page === 'pago-confirmado')initPagoConfirmado?.();
  if (page === 'perfil')         initPerfil?.();
  if (page === 'detalle-reserva')initDetalleReserva?.();
});