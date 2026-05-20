/* ═══════════════════════════════════════════
   ACHI SHOP'S — script.js
   ═══════════════════════════════════════════ */

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
});

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
document.getElementById('mobileClose').addEventListener('click', () => mobileMenu.classList.remove('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ── MARQUEE ──
const marqueeItems = [
  'New Arrivals', 'Free Shipping', 'Best Fashion',
  'Exclusive Deals', 'Premium Quality', 'Top Brands',
  '50% Off Sale', 'New Collection'
];
const track = document.getElementById('marqueeTrack');
const doubled = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];
track.innerHTML = doubled.map(t =>
  `<span class="marquee-item">${t}<span class="marquee-dot"></span></span>`
).join('');

// ── PRODUCTS DATA ──
const products = [
  { name: 'Linen Blazer Set',    cat: 'Men',   price: '৳2,450', old: '৳3,200', badge: 'sale', stars: '★★★★★', emoji: '🧥', tag: 'men'   },
  { name: 'Floral Wrap Dress',   cat: 'Women', price: '৳1,890', old: '',        badge: 'new',  stars: '★★★★★', emoji: '👗', tag: 'women' },
  { name: 'Denim Co-ord Set',    cat: 'Women', price: '৳2,100', old: '৳2,800', badge: 'sale', stars: '★★★★☆', emoji: '👖', tag: 'women' },
  { name: 'Oxford Button Shirt', cat: 'Men',   price: '৳1,250', old: '',        badge: '',     stars: '★★★★★', emoji: '👔', tag: 'men'   },
  { name: 'Mini Puffer Jacket',  cat: 'Kids',  price: '৳980',   old: '৳1,400', badge: 'sale', stars: '★★★★★', emoji: '🧦', tag: 'kids'  },
  { name: 'Satin Midi Skirt',    cat: 'Women', price: '৳1,550', old: '',        badge: 'new',  stars: '★★★★★', emoji: '👘', tag: 'women' },
  { name: 'Cargo Joggers',       cat: 'Men',   price: '৳1,350', old: '৳1,800', badge: 'sale', stars: '★★★★☆', emoji: '🩲', tag: 'men'   },
  { name: 'Graphic Hoodie',      cat: 'Kids',  price: '৳850',   old: '',        badge: 'new',  stars: '★★★★★', emoji: '🧣', tag: 'kids'  },
];

// ── RENDER PRODUCTS ──
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const filtered =
    filter === 'all'  ? products :
    filter === 'sale' ? products.filter(p => p.badge === 'sale') :
                        products.filter(p => p.tag === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" data-index="${i}">
      <div class="product-img">
        <div class="product-thumb">${p.emoji}</div>
        ${p.badge ? `<div class="product-badge ${p.badge}">${p.badge === 'new' ? 'New' : 'Sale'}</div>` : ''}
        <button class="wishlist-btn" onclick="toggleWishlist(this)">🤍</button>
        <div class="quick-add" onclick="addToCart(this)">+ Quick Add</div>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <div>
            <span class="product-price">${p.price}</span>
            ${p.old ? `<span class="product-old-price">${p.old}</span>` : ''}
          </div>
          <div class="product-stars">${p.stars}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ── FILTER TABS ──
function setFilter(btn, filter) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(filter);
}

// ── WISHLIST TOGGLE ──
function toggleWishlist(btn) {
  btn.classList.toggle('active');
  btn.textContent = btn.classList.contains('active') ? '❤️' : '🤍';
}

// ── ADD TO CART ──
let cartCount = 0;
function addToCart(btn) {
  cartCount++;
  document.querySelector('.nav-cart').textContent = `🛒 Cart (${cartCount})`;
  btn.textContent = '✓ Added!';
  setTimeout(() => { btn.textContent = '+ Quick Add'; }, 1200);
}

// Initial render
renderProducts();

// ── COUNTDOWN TIMER ──
let endTime = Date.now() + (8 * 3600 + 45 * 60) * 1000;

function updateCountdown() {
  const diff = Math.max(0, endTime - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cdH').textContent = String(h).padStart(2, '0');
  document.getElementById('cdM').textContent = String(m).padStart(2, '0');
  document.getElementById('cdS').textContent = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── NEWSLETTER SUBSCRIBE ──
function subscribeNewsletter() {
  const input = document.getElementById('emailInput');
  if (!input.value.includes('@')) {
    input.style.borderColor = 'var(--rose)';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
    return;
  }
  document.getElementById('subMsg').style.display = 'block';
  input.value = '';
}

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.cat-card, .testi-card, .cd-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});
