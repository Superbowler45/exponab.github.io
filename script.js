/* script.js - product rendering + contact form handling */

// -------------------------------
// Sample product data
// fill this array with your real filenames (use the exact names in assets/products/...)
const products = [
  // staples example
  { id: 'basmati-rice', title: 'Basmati rice', image: 'assets/products/staples/basmati-rice.jpg', category: 'staples' },
  { id: 'non-basmati-milled-rice', title: 'Non-Basmati milled rice', image: 'assets/products/staples/non-basmati-milled-rice.jpg', category: 'staples' },
  { id: 'wheat', title: 'Wheat', image: 'assets/products/staples/wheat.jpg', category: 'staples' },
  { id: 'millet', title: 'Millets', image: 'assets/products/staples/millet.jpg', category: 'staples' }
  // add more items here. Use the exact path where you uploaded them.
];

// -------------------------------
// Render product sample grid on homepage
function renderProductsSample() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  // show only items with category staples for the sample hero section
  const stapleItems = products.filter(p => p.category === 'staples');
  if (stapleItems.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted)">No sample products available — add product entries to <code>script.js</code>.</p>';
    return;
  }
  grid.innerHTML = stapleItems.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.title}" onerror="this.style.opacity=.4; this.nextElementSibling && (this.nextElementSibling.style.opacity=.6)">
      <h3 style="margin:0;font-size:15px;color:#ffffff">${p.title}</h3>
    </article>
  `).join('');
}

// -------------------------------
// contact form handling - mailto fallback
function handleContactForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const company = form.company.value.trim();
    const email = form.email.value.trim();
    const role = form.role.value;
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill name, email and message before sending.');
      return;
    }

    // Validate basic email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please provide a valid email address.');
      return;
    }

    // Compose mailto
    const subject = encodeURIComponent(`Website enquiry from ${name} (${role})`);
    const body = encodeURIComponent(`Name: ${name}\nCompany: ${company}\nEmail: ${email}\nRole: ${role}\n\nMessage:\n${message}\n\n---\nSent from Exponab website`);
    const mailto = `mailto:info@exponab.com?subject=${subject}&body=${body}`;

    // Try to open mail client
    window.location.href = mailto;

    // Optional: show a thank-you message (you can also show UI)
    form.querySelector('button[type=submit]').textContent = 'Opening email…';
    setTimeout(()=> form.querySelector('button[type=submit]').textContent = 'Send enquiry', 2500);
  });
}

// -------------------------------
// mobile menu toggle
function initMenuToggle() {
  const btn = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// -------------------------------
// init
document.addEventListener('DOMContentLoaded', function () {
  renderProductsSample();
  handleContactForm();
  initMenuToggle();
});
