/* script.js - dynamic product rendering + contact form handling */

/* -------------------------
   Products data
   - The `image` path assumes files are under:
     assets/products/<category>/<filename>
   - filenames are normalized (lowercase, dashes)
--------------------------*/
const products = [
  // FRUITS
  { id: 'apple', title: 'Apple', category: 'fruits', image: 'assets/products/fruits/apple.png' },
  { id: 'alphonso-mango', title: 'Alphonso Mango', category: 'fruits', image: 'assets/products/fruits/alphonso-mango.png' },
  { id: 'banana', title: 'Banana', category: 'fruits', image: 'assets/products/fruits/banana.png' },
  { id: 'pineapple', title: 'Pineapple', category: 'fruits', image: 'assets/products/fruits/pineapple.png' },
  { id: 'pomegranate', title: 'Pomegranate', category: 'fruits', image: 'assets/products/fruits/pomegranate.png' },
  { id: 'guava', title: 'Guava', category: 'fruits', image: 'assets/products/fruits/guava.png' },
  { id: 'papaya', title: 'Papaya', category: 'fruits', image: 'assets/products/fruits/papaya.png' },
  { id: 'passion-fruit', title: 'Passion Fruit', category: 'fruits', image: 'assets/products/fruits/passion-fruit.png' },
  { id: 'muskmelon', title: 'Muskmelon', category: 'fruits', image: 'assets/products/fruits/muskmelon.png' },
  { id: 'watermelon', title: 'Watermelon', category: 'fruits', image: 'assets/products/fruits/watermelon.png' },
  { id: 'grapes-green', title: 'Green Grapes', category: 'fruits', image: 'assets/products/fruits/green-grapes.png' },
  { id: 'grapes-black', title: 'Black Grapes (seedless)', category: 'fruits', image: 'assets/products/fruits/black-grapes-(seedless).png' },
  { id: 'strawberries', title: 'Strawberries', category: 'fruits', image: 'assets/products/fruits/strawberries.png' },
  { id: 'lychee', title: 'Lychee', category: 'fruits', image: 'assets/products/fruits/lychee.png' },
  { id: 'kiwi', title: 'Kiwi', category: 'fruits', image: 'assets/products/fruits/kiwi.png' },
  // VEGETABLES
  { id: 'onion', title: 'Onion', category: 'vegetables', image: 'assets/products/vegetables/onion.png' },
  { id: 'tomato', title: 'Tomato', category: 'vegetables', image: 'assets/products/vegetables/tomato.png' },
  { id: 'green-chilli', title: 'Green Chilli', category: 'vegetables', image: 'assets/products/vegetables/green-chilli.png' },
  { id: 'cucumber', title: 'Cucumber', category: 'vegetables', image: 'assets/products/vegetables/cucumber.png' },
  { id: 'bottle-gourd', title: 'Bottle Gourd', category: 'vegetables', image: 'assets/products/vegetables/bottle-gourd.png' },
  { id: 'bitter-gourd', title: 'Bitter Gourd', category: 'vegetables', image: 'assets/products/vegetables/bitter-gourd.png' },
  { id: 'ridge-gourd', title: 'Ridge Gourd', category: 'vegetables', image: 'assets/products/vegetables/ridge-gourd.png' },
  { id: 'sponge-gourd', title: 'Sponge Gourd', category: 'vegetables', image: 'assets/products/vegetables/sponge-gourd.png' },
  { id: 'pointed-gourd', title: 'Pointed Gourd', category: 'vegetables', image: 'assets/products/vegetables/pointed-gourd.png' },
  { id: 'yellow-zucchini', title: 'Yellow Zucchini', category: 'vegetables', image: 'assets/products/vegetables/yellow-zucchini.png' },
  { id: 'green-zucchini', title: 'Green Zucchini', category: 'vegetables', image: 'assets/products/vegetables/green-zucchini.png' },
  { id: 'brocolli', title: 'Brocolli', category: 'vegetables', image: 'assets/products/vegetables/brocolli.png' },
  { id: 'cauliflower', title: 'Cauliflower', category: 'vegetables', image: 'assets/products/vegetables/cauliflower.png' },
  // STAPLES
  { id: 'basmati-rice', title: 'Basmati rice', category: 'staples', image: 'assets/products/staples/basmati-rice.jpg' },
  { id: 'non-basmati-milled-rice', title: 'Non-Basmati milled rice', category: 'staples', image: 'assets/products/staples/non‐basmati-milled-rice.jpg' },
  { id: 'wheat', title: 'Wheat', category: 'staples', image: 'assets/products/staples/wheat.jpg' },
  { id: 'millet', title: 'Millets', category: 'staples', image: 'assets/products/staples/millet.jpg' },
  { id: 'sugarcane', title: 'Sugarcane', category: 'staples', image: 'assets/products/staples/sugarcane.png' },
  // MEAT & FISH
  { id: 'chicken', title: 'Chicken', category: 'meat', image: 'assets/products/meat/chicken-meat.jpg' },
  { id: 'mutton', title: 'Mutton', category: 'meat', image: 'assets/products/meat/mutton.jpg' },
  { id: 'tilapia', title: 'Tilapia', category: 'meat', image: 'assets/products/meat/tilapia-fish.jpg' },
  { id: 'mackerel', title: 'Mackerel', category: 'meat', image: 'assets/products/meat/mackerel-fish.jpg' },
  { id: 'cuttlefish', title: 'Cuttlefish', category: 'meat', image: 'assets/products/meat/cuttlefish.jpg' },
];

/* ---------- rendering logic ---------- */
function createCard(p) {
  const a = document.createElement('div');
  a.className = 'product-card';
  const img = document.createElement('img');
  img.loading = 'lazy';
  img.alt = p.title;
  img.src = p.image;
  img.onerror = () => {
    img.src = 'assets/products/placeholder.png'; // add placeholder image to assets for safety
  };
  const title = document.createElement('h4');
  title.textContent = p.title;
  const el = document.createElement('div');
  el.appendChild(img);
  el.appendChild(title);
  return el;
}

function renderProducts() {
  const fruitsGrid = document.getElementById('fruitsGrid');
  const vegGrid = document.getElementById('vegetablesGrid');
  const staplesGrid = document.getElementById('staplesGrid');
  const meatGrid = document.getElementById('meatGrid');

  if (!fruitsGrid) return; // only on products page

  products.forEach(p => {
    const card = createCard(p);
    if (p.category === 'fruits') fruitsGrid.appendChild(card);
    else if (p.category === 'vegetables') vegGrid.appendChild(card);
    else if (p.category === 'staples') staplesGrid.appendChild(card);
    else if (p.category === 'meat') meatGrid.appendChild(card);
  });
}

/* --------- Contact form handling (simple) --------- */
function handleContactForm() {
  // On the contact page we expect a <form id="contactForm"> with fields:
  // name, company, email, role (buyer/supplier), message, submit
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Please complete name, email and message.');
      return;
    }

    // If you have a backend endpoint, replace this with a fetch() POST to it.
    // For now: mailto fallback:
    const subject = encodeURIComponent('Product enquiry from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nCompany: ${form.querySelector('[name="company"]').value}\nRole: ${form.querySelector('[name="role"]').value}\n\nMessage:\n${message}`);
    // open mail client
    window.location.href = `mailto:info@exponab.com?subject=${subject}&body=${body}`;

    // show basic confirmation (also useful if client email blocked)
    setTimeout(() => {
      alert('If your mail client did not open, please send the message to info@exponab.com directly. We will respond within one working day.');
    }, 500);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  handleContactForm();

  // ensure logo is visible and not tiny
  const logo = document.getElementById('siteLogo') || document.getElementById('siteLogo2');
  if (logo) logo.style.display = 'block';
});
