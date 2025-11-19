/* script.js - product rendering + contact form handling */

// -------------------------------
// Sample product data
// fill this array with your real filenames (use the exact names in assets/products/...)
const products = [
  // ---------- FRUITS ----------
  { id: 'apple', title: 'Apple', image: 'assets/products/fruits/apple.png', category: 'fruits' },
  { id: 'alphonso-mango', title: 'Alphonso Mango', image: 'assets/products/fruits/alphonso-mango.png', category: 'fruits' },
  { id: 'avocado', title: 'Avocado', image: 'assets/products/fruits/avocado.png', category: 'fruits' },
  { id: 'banana', title: 'Banana', image: 'assets/products/fruits/banana.png', category: 'fruits' },
  { id: 'cavendish-banana', title: 'Cavendish Banana', image: 'assets/products/fruits/cavendish-banana.png', category: 'fruits' },
  { id: 'red-banana', title: 'Red Banana', image: 'assets/products/fruits/red-banana.jpg', category: 'fruits' },
  { id: 'black-grapes-seedless', title: 'Black Grapes (Seedless)', image: 'assets/products/fruits/black-grapes-(seedless).png', category: 'fruits' },
  { id: 'green-grapes', title: 'Green Grapes', image: 'assets/products/fruits/green-grapes.png', category: 'fruits' },
  { id: 'red-globe-grapes', title: 'Red Globe Grapes', image: 'assets/products/fruits/red-globe-grapes.png', category: 'fruits' },
  { id: 'thompson-seedless-grapes', title: 'Thompson Seedless Grapes', image: 'assets/products/fruits/thompson-seedless-grapes.png', category: 'fruits' },
  { id: 'gooseberry', title: 'Gooseberry', image: 'assets/products/fruits/gooseberry.png', category: 'fruits' },
  { id: 'guava', title: 'Guava', image: 'assets/products/fruits/guava.png', category: 'fruits' },
  { id: 'kiwi', title: 'Kiwi', image: 'assets/products/fruits/kiwi.png', category: 'fruits' },
  { id: 'lemon', title: 'Lemon', image: 'assets/products/fruits/lemon.png', category: 'fruits' },
  { id: 'longan', title: 'Longan', image: 'assets/products/fruits/longan.png', category: 'fruits' },
  { id: 'lychee', title: 'Lychee', image: 'assets/products/fruits/lychee.png', category: 'fruits' },
  { id: 'mangosteen', title: 'Mangosteen', image: 'assets/products/fruits/mangosteen.png', category: 'fruits' },
  { id: 'muskmelon', title: 'Muskmelon', image: 'assets/products/fruits/muskmelon.png', category: 'fruits' },
  { id: 'orange', title: 'Orange', image: 'assets/products/fruits/orange.png', category: 'fruits' },
  { id: 'papaya', title: 'Papaya', image: 'assets/products/fruits/papaya.png', category: 'fruits' },
  { id: 'passion-fruit', title: 'Passion Fruit', image: 'assets/products/fruits/passion Fruit.png', category: 'fruits' },
  { id: 'pear', title: 'Pear', image: 'assets/products/fruits/pear.png', category: 'fruits' },
  { id: 'pineapple', title: 'Pineapple', image: 'assets/products/fruits/pineapple.png', category: 'fruits' },
  { id: 'pomegranate', title: 'Pomegranate', image: 'assets/products/fruits/pomegranate.png', category: 'fruits' },
  { id: 'rambutan', title: 'Rambutan', image: 'assets/products/fruits/rambutan.png', category: 'fruits' },
  { id: 'raw-mango', title: 'Raw Mango', image: 'assets/products/fruits/raw-mango.png', category: 'fruits' },
  { id: 'star-fruit', title: 'Star Fruit', image: 'assets/products/fruits/star-fruit.png', category: 'fruits' },
  { id: 'strawberries', title: 'Strawberries', image: 'assets/products/fruits/strawberries.png', category: 'fruits' },
  { id: 'sweet-lime', title: 'Sweet Lime', image: 'assets/products/fruits/sweet-lime.png', category: 'fruits' },
  { id: 'tamarind', title: 'Tamarind', image: 'assets/products/fruits/tamarind.png', category: 'fruits' },
  { id: 'watermelon', title: 'Watermelon', image: 'assets/products/fruits/watermelon.png', category: 'fruits' },
  { id: 'pina', title: 'Dragon Fruit', image: 'assets/products/fruits/dragon-fruit.png', category: 'fruits' },

  // ---------- VEGETABLES ----------
  { id: 'artichoke', title: 'Artichoke', image: 'assets/products/vegetables/artichoke.png', category: 'vegetables' },
  { id: 'asparagus', title: 'Asparagus', image: 'assets/products/vegetables/asparagus.png', category: 'vegetables' },
  { id: 'baby-corn', title: 'Baby Corn', image: 'assets/products/vegetables/baby-corn.png', category: 'vegetables' },
  { id: 'bitter-gourd', title: 'Bitter Gourd', image: 'assets/products/vegetables/bitter-gourd.png', category: 'vegetables' },
  { id: 'bok-choy', title: 'Bok Choy', image: 'assets/products/vegetables/bok-choy.png', category: 'vegetables' },
  { id: 'bottle-gourd', title: 'Bottle Gourd', image: 'assets/products/vegetables/bottle-gourd.png', category: 'vegetables' },
  { id: 'brocolli', title: 'Broccoli', image: 'assets/products/vegetables/brocolli.png', category: 'vegetables' },
  { id: 'brussels-sprouts', title: 'Brussels Sprouts', image: 'assets/products/vegetables/brussels-sprouts.png', category: 'vegetables' },
  { id: 'button-mushroom', title: 'Button Mushroom', image: 'assets/products/vegetables/button-mushroom.png', category: 'vegetables' },
  { id: 'cabbage', title: 'Cabbage', image: 'assets/products/vegetables/cabbage.png', category: 'vegetables' },
  { id: 'cauliflower', title: 'Cauliflower', image: 'assets/products/vegetables/cauliflower.png', category: 'vegetables' },
  { id: 'celery', title: 'Celery', image: 'assets/products/vegetables/celery.png', category: 'vegetables' },
  { id: 'chinnese-cabbage', title: 'Chinese Cabbage', image: 'assets/products/vegetables/chinnese-cabbage.png', category: 'vegetables' },
  { id: 'coriander-leaf', title: 'Coriander Leaf', image: 'assets/products/vegetables/coriander-leaf.png', category: 'vegetables' },
  { id: 'cucumber', title: 'Cucumber', image: 'assets/products/vegetables/cucumber.png', category: 'vegetables' },
  { id: 'fennel-bulb', title: 'Fennel Bulb', image: 'assets/products/vegetables/fennel-bulb.png', category: 'vegetables' },
  { id: 'garlic-whole-big-white', title: 'Garlic (White)', image: 'assets/products/vegetables/garlic-whole-big-(white).png', category: 'vegetables' },
  { id: 'green-zucchini', title: 'Green Zucchini', image: 'assets/products/vegetables/green-zucchini.png', category: 'vegetables' },
  { id: 'yellow-zucchini', title: 'Yellow Zucchini', image: 'assets/products/vegetables/yellow-zucchini.png', category: 'vegetables' },
  { id: 'ivy-gourd', title: 'Ivy Gourd', image: 'assets/products/vegetables/ivy-gourd.png', category: 'vegetables' },
  { id: 'king-oyester-mushroom', title: 'King Oyster Mushroom', image: 'assets/products/vegetables/king-oyester-mushroom.png', category: 'vegetables' },
  { id: 'knol-khol', title: 'Knol Khol', image: 'assets/products/vegetables/knol-khol.png', category: 'vegetables' },
  { id: 'leeks', title: 'Leeks', image: 'assets/products/vegetables/leeks.png', category: 'vegetables' },
  { id: 'maitake-hen-of-the-woods', title: 'Maitake (Hen-of-the-Woods)', image: 'assets/products/vegetables/maitake-(hen-of-the-woods).png', category: 'vegetables' },
  { id: 'oyester-mushroom', title: 'Oyster Mushroom', image: 'assets/products/vegetables/oyester-mushroom.png', category: 'vegetables' },
  { id: 'pointed-gourd', title: 'Pointed Gourd', image: 'assets/products/vegetables/pointed-gourd.png', category: 'vegetables' },
  { id: 'ridge-gourd', title: 'Ridge Gourd', image: 'assets/products/vegetables/ridge-gourd.png', category: 'vegetables' },
  { id: 'red-pumpkin', title: 'Red Pumpkin', image: 'assets/products/vegetables/red-pumpkin.png', category: 'vegetables' },
  { id: 'shiitake-mushrooms', title: 'Shiitake Mushrooms', image: 'assets/products/vegetables/shiitake-mushrooms.png', category: 'vegetables' },
  { id: 'snake-gourd', title: 'Snake Gourd', image: 'assets/products/vegetables/snake-gourd.png', category: 'vegetables' },
  { id: 'sponge-gourd', title: 'Sponge Gourd', image: 'assets/products/vegetables/sponge-gourd.png', category: 'vegetables' },
  { id: 'sweet-gourd', title: 'White Pumpkin', image: 'assets/products/vegetables/white-pumpkin.png', category: 'vegetables' },

  // ---------- STAPLES (grains, rice, etc.) ----------
  { id: 'basmati-rice', title: 'Basmati rice', image: 'assets/products/staples/basmati-rice.jpg', category: 'staples' },
  { id: 'non-basmati-milled-rice', title: 'Non-Basmati milled rice', image: 'assets/products/staples/non‐basmati-milled-rice.jpg', category: 'staples' },
  { id: 'wheat', title: 'Wheat', image: 'assets/products/staples/wheat.jpg', category: 'staples' },
  { id: 'millet', title: 'Millet', image: 'assets/products/staples/millet.jpg', category: 'staples' },
  { id: 'sugarcane', title: 'Sugarcane (select formats)', image: 'assets/products/staples/sugarcane.png', category: 'staples' },

  // ---------- MEAT & FISH ----------
  { id: 'chicken-meat', title: 'Chicken', image: 'assets/products/meat/chicken-meat.jpg', category: 'meat' },
  { id: 'mutton', title: 'Mutton', image: 'assets/products/meat/mutton.jpg', category: 'meat' }, // if file exists
  { id: 'beef', title: 'Beef', image: 'assets/products/meat/beef.jpg', category: 'meat' },     // if file exists
  { id: 'cuttlefish', title: 'Cuttlefish', image: 'assets/products/meat/cuttlefish.jpg', category: 'meat' },
  { id: 'indian-carp', title: 'Indian Carp', image: 'assets/products/meat/indian-carp.jpg', category: 'meat' },
  { id: 'mackerel-fish', title: 'Mackerel', image: 'assets/products/meat/mackerel-fish.jpg', category: 'meat' },
  { id: 'tilapia-fish', title: 'Tilapia', image: 'assets/products/meat/tilapia-fish.jpg', category: 'meat' },

  // ---------- OTHER / fallback (if you have more add them) ----------
  { id: 'coriander-leaf-fallback', title: 'Coriander Leaf', image: 'assets/products/vegetables/coriander-leaf.png', category: 'vegetables' },
  { id: 'garlic-fallback', title: 'Garlic', image: 'assets/products/vegetables/garlic-whole-big-(white).png', category: 'vegetables' }
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
