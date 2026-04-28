/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  btt.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ── MOBILE MENU ── */
const toggle     = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.classList.remove('open');
  mobileMenu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

/* ── MENU TABS ── */
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) panel.classList.add('active');
  });
});

/* ── TESTIMONIAL SLIDER ── */
const slides = document.querySelectorAll('.testimonial-slide');
const dots   = document.querySelectorAll('.testimonial-dot');
let current = 0, autoplay;
function goTo(idx) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  dots[current].setAttribute('aria-selected', 'false');
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  dots[current].setAttribute('aria-selected', 'true');
}
dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));
function resetAuto() {
  clearInterval(autoplay);
  autoplay = setInterval(() => goTo(current + 1), 5000);
}
resetAuto();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

/* ── GALLERY MODAL ── */
function galleryModalOpen() {
  const modal = document.getElementById('gallery-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function galleryModalClose() {
  document.getElementById('gallery-modal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (
    e.key === 'Escape' &&
    document.getElementById('gallery-modal').classList.contains('open') &&
    !document.getElementById('lightbox').classList.contains('open')
  ) galleryModalClose();
});

/* ── LIGHTBOX ── */
let lbImages = [], lbIdx = 0;
function lbOpen(idx) {
  lbIdx = idx;
  document.getElementById('lb-img').src             = lbImages[idx].src;
  document.getElementById('lb-caption').textContent = lbImages[idx].cap;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function lbClose() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  lbIdx = (lbIdx + dir + lbImages.length) % lbImages.length;
  const img = document.getElementById('lb-img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = lbImages[lbIdx].src;
    document.getElementById('lb-caption').textContent = lbImages[lbIdx].cap;
    img.style.opacity = '1';
  }, 160);
}
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === e.currentTarget) lbClose();
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape')     lbClose();
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

/* ── CART ── */
let cart = [];
function cartOpen() {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function cartClose() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function cartAdd(name, price, priceText) {
  const ex = cart.find(i => i.name === name);
  if (ex) ex.qty++; else cart.push({ name, price, priceText, qty: 1 });
  cartRender();
}
function cartRemove(name) {
  const ex = cart.find(i => i.name === name);
  if (!ex) return;
  ex.qty--;
  if (ex.qty <= 0) cart = cart.filter(i => i.name !== name);
  cartRender();
}
function cartRender() {
  const body    = document.getElementById('cart-body');
  const foot    = document.getElementById('cart-foot');
  const badge   = document.getElementById('cart-badge');
  const totalEl = document.getElementById('cart-total-val');
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = totalQty;
  badge.classList.toggle('show', totalQty > 0);
  foot.style.display = cart.length ? 'block' : 'none';
  if (!cart.length) {
    body.innerHTML = '<p class="cart-empty-msg">No items added yet.'
      + '<span>Browse the menu and tap "Add to Order".</span></p>';
    return;
  }
  const totalAmt = cart.reduce((s, i) => s + i.price * i.qty, 0);
  totalEl.textContent = '$' + totalAmt.toLocaleString();
  body.innerHTML = cart.map(i => {
    const safeName = i.name.replace(/'/g, "\\'");
    const safePx   = i.priceText.replace(/'/g, "\\'");
    return '<div class="cart-item">'
      + '<div>'
      + '<div class="cart-item-name">' + i.name     + '</div>'
      + '<div class="cart-item-px">'   + i.priceText + '</div>'
      + '</div>'
      + '<div class="cart-qty-ctrl">'
      + '<button class="cart-qty-btn" onclick="cartRemove(\'' + safeName + '\')">'
      + '&#x2212;'
      + '</button>'
      + '<span class="cart-qty-num">' + i.qty + '</span>'
      + '<button class="cart-qty-btn" onclick="cartAdd(\'' + safeName + '\',' + i.price + ',\'' + safePx + '\')">'
      + '+'
      + '</button>'
      + '</div>'
      + '</div>';
  }).join('');
}
function cartCheckout() {
  if (!cart.length) return;
  const lines = cart.map(i => '• ' + i.name + (i.qty > 1 ? ' x' + i.qty : '')).join('%0A');
  window.open(
    'https://wa.me/13467142255?text=Hello%20Barry\'s%20Kitchen!%20I\'d%20like%20to%20order:%0A%0A'
    + lines
    + '%0A%0APlease%20confirm%20availability%20and%20pan%20sizes.%20Thank%20you!',
    '_blank'
  );
}

document.addEventListener('DOMContentLoaded', () => {
  /* Gallery lightbox — wire cells inside the modal grid */
  document.querySelectorAll('.gallery-grid .gallery-cell').forEach((cell, i) => {
    const img   = cell.querySelector('img');
    const label = cell.querySelector('.gallery-label');
    if (!img) return;
    lbImages.push({ src: img.src, cap: label ? label.textContent : '' });
    cell.addEventListener('click', () => lbOpen(i));
  });

  document.getElementById('cart-open-btn').addEventListener('click', cartOpen);
  document.getElementById('cart-close-btn').addEventListener('click', cartClose);
  document.getElementById('cart-overlay').addEventListener('click', cartClose);

  document.querySelectorAll('.menu-item').forEach(item => {
    const nameEl = item.querySelector('.menu-item-name');
    if (!nameEl) return;
    const name      = nameEl.textContent.trim();
    const sizesAttr = item.dataset.sizes;
    if (!sizesAttr) return;
    const sizes = sizesAttr.split('|').map(s => {
      const parts = s.split(':');
      return { label: parts[0].trim(), price: parseFloat(parts[1]) };
    });
    if (sizes.length === 1) {
      const btn = document.createElement('button');
      btn.className   = 'add-to-order-btn';
      btn.textContent = 'Add to Order';
      btn.addEventListener('click', () => {
        cartAdd(name, sizes[0].price, sizes[0].label);
        btn.textContent = '✓ Added';
        btn.classList.add('added');
        setTimeout(() => {
          btn.textContent = 'Add to Order';
          btn.classList.remove('added');
        }, 1500);
        cartOpen();
      });
      item.appendChild(btn);
    } else {
      const row = document.createElement('div');
      row.className = 'size-btn-row';
      sizes.forEach(({ label, price }) => {
        const btn = document.createElement('button');
        btn.className   = 'size-btn';
        btn.textContent = label;
        btn.addEventListener('click', () => {
          cartAdd(name + ' — ' + label, price, '$' + price + ' / ' + label);
          const orig = btn.textContent;
          btn.textContent = '✓';
          btn.classList.add('added');
          setTimeout(() => {
            btn.textContent = orig;
            btn.classList.remove('added');
          }, 1500);
          cartOpen();
        });
        row.appendChild(btn);
      });
      item.appendChild(row);
    }
  });
});

/* ── REVIEW FORM ── */
let reviewRating = 0;
(function () {
  const stars = document.querySelectorAll('.star-btn');
  function paint(n) {
    stars.forEach(s => s.classList.toggle('lit', parseInt(s.dataset.val) <= n));
  }
  stars.forEach(s => {
    s.addEventListener('click',      () => { reviewRating = parseInt(s.dataset.val); paint(reviewRating); });
    s.addEventListener('mouseenter', () => paint(parseInt(s.dataset.val)));
    s.addEventListener('mouseleave', () => paint(reviewRating));
  });
})();
function submitReview() {
  const name = document.getElementById('review-name').value.trim();
  const text = document.getElementById('review-text').value.trim();
  if (!text) { document.getElementById('review-text').focus(); return; }
  const stars      = reviewRating > 0 ? '⭐'.repeat(reviewRating) : '';
  const namePart   = name  ? '*' + name + '* says:%0A' : '';
  const ratingPart = stars ? 'Rating: ' + stars + '%0A' : '';
  const msg = 'Hello Barry\'s Kitchen! I\'d like to leave a review:%0A%0A'
    + namePart
    + ratingPart
    + '%0A"'
    + encodeURIComponent(text)
    + '"';
  window.open('https://wa.me/13467142255?text=' + msg, '_blank');
  document.getElementById('review-form-area').style.display = 'none';
  document.getElementById('review-success').style.display   = 'block';
}

/* ── CONTACT FORM ── */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const required = ['fname', 'lname', 'email', 'service', 'message'];
  let valid = true;
  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) { el.style.borderColor = '#c0392b'; valid = false; }
    else el.style.borderColor = '';
  });
  if (!valid) return;
  const success = document.getElementById('form-success');
  success.classList.add('visible');
  success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  this.reset();
  this.style.opacity       = '.4';
  this.style.pointerEvents = 'none';
  setTimeout(() => {
    success.classList.remove('visible');
    this.style.opacity       = '';
    this.style.pointerEvents = '';
  }, 7000);
});
