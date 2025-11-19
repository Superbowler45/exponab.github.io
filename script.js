/* script.js - site behavior, products rendering, form handling */

/* -------------------------
   Products array (grouped)
   Update paths if your folders differ.
   ------------------------- */
const products = {
  fruits: [
    "alphonso-mango.png",
    "apple.png",
    "avocado.png",
    "banana.png",
    "black-grapes-(seedless).png",
    "cavendish-banana.png",
    "chikoo.png",
    "dragon-fruit.png",
    "gooseberry.png",
    "green-grapes.png",
    "guava.png",
    "kashmiri-apple.png",
    "kiwi.png",
    "lemon.png",
    "longan.png",
    "lychee.png",
    "mangosteen.png",
    "muskmelon.png",
    "orange.png",
    "papaya.png",
    "passion Fruit.png",
    "pear.png",
    "pineapple.png",
    "pomegranate.png",
    "rambutan.png",
    "raw-mango.png",
    "red-banana.jpg",
    "red-globe-grapes.png",
    "star-fruit.png",
    "strawberries.png",
    "sugarcane.png",
    "sweet-lime.png",
    "tamarind.png",
    "thompson-seedless-grapes.png",
    "watermelon.png"
  ],
  vegetables: [
    "artichoke.png",
    "asparagus.png",
    "baby-corn.png",
    "bitter-gourd.png",
    "bok-choy.png",
    "bottle-gourd.png",
    "brocolli.png",
    "brussels-sprouts.png",
    "button-mushroom.png",
    "cabbage.png",
    "cauliflower.png",
    "celery.png",
    "chinnese-cabbage.png",
    "coriander-leaf.png",
    "cucumber.png",
    "fennel-bulb.png",
    "garlic-whole-big-(white).png",
    "green-zucchini.png",
    "ivy-gourd.png",
    "king-oyester-mushroom.png",
    "knol-khol.png",
    "leeks.png",
    "maitake-(hen-of-the-woods).png",
    "onion.png",
    "oyester-mushroom.png",
    "pointed-gourd.png",
    "red-pumpkin.png",
    "ridge-gourd.png",
    "shiitake-mushrooms.png",
    "snake-gourd.png",
    "sponge-gourd.png",
    "white-pumpkin.png",
    "yellow-zucchini.png"
  ],
  staples: [
    "basmati-rice.jpg",
    "non‐basmati-milled-rice.jpg",
    "wheat.jpg",
    "millet.jpg"
  ],
  meat: [
    "chicken-meat.jpg"
  ],
  fish: [
    "cuttlefish.jpg",
    "indian-carp.jpg",
    "mackerel-fish.jpg",
    "tilapia-fish.jpg"
  ]
};

/* -------------------------
   DOM helpers & product rendering
   ------------------------- */

function createProductCard(category, filename) {
  // Friendly title from filename
  const title = filename.replace(/[-_]/g, " ").replace(/\.(png|jpg|jpeg|gif)$/i, "");
  const imgPath = `assets/products/${category}/${filename}`;
  const a = document.createElement("a");
  a.className = "product-card";
  a.href = `mailto:info@exponab.com?subject=Enquiry about ${encodeURIComponent(title)}&body=Hello%0A%0AI would like to enquire about ${encodeURIComponent(title)}.%0A%0ARegards,`;
  a.innerHTML = `
    <img loading="lazy" src="${imgPath}" alt="${title}" onerror="this.style.opacity=0.65; this.nextElementSibling && (this.nextElementSibling.textContent='Image missing')">
    <div class="product-title">${title}</div>
    <div class="product-meta">Category: ${category}</div>
  `;
  return a;
}

function renderProductsRoot() {
  const root = document.getElementById("products-root");
  if (!root) return;
  root.innerHTML = "";
  Object.keys(products).forEach(category => {
    const sec = document.createElement("section");
    sec.className = "products-section";
    sec.id = category;
    sec.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
    const grid = document.createElement("div");
    grid.className = "products-grid";

    products[category].forEach(fn => {
      grid.appendChild(createProductCard(category, fn));
    });

    sec.appendChild(grid);
    root.appendChild(sec);
  });
}

/* -------------------------
   Contact form handling
   ------------------------- */

function initContactForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    status.textContent = "";

    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();
    const company = form.querySelector("#company").value.trim();
    const role = form.querySelector("#role").value;

    if (!name || !email || !message) {
      status.textContent = "Please fill name, email and message.";
      return;
    }

    // Build mailto fallback
    const subject = `Enquiry from ${name} (${company || role})`;
    const bodyLines = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Role: ${role}`,
      `Email: ${email}`,
      ``,
      `Message:`,
      message
    ];
    const mailto = `mailto:info@exponab.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    // Attempt to use fetch to a server endpoint (not present) - if it fails, fallback to mailto.
    // Since GitHub Pages has no backend, the mailto fallback is the reliable method.
    try {
      // Example: if later you add a server endpoint, change this to real endpoint
      // let resp = await fetch('/api/enquiry', {method:'POST', body: JSON.stringify({name,email,company,role,message}), headers:{'content-type':'application/json'}});
      // if (resp.ok) { status.textContent = 'Message sent — we will reply within one business day.'; form.reset(); return; }
      // fallback to mailto now:
      window.location.href = mailto;
      status.textContent = "If your email client didn't open, please email info@exponab.com manually.";
    } catch (err) {
      // fallback
      window.location.href = mailto;
      status.textContent = "If your email client didn't open, please email info@exponab.com manually.";
    }
  });
}

/* -------------------------
  Small nav toggle
  ------------------------- */
function initNavToggle() {
  const btn = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!btn || !navLinks) return;
  btn.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  });
}

/* -------------------------
   Init on DOMContentLoaded
   ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProductsRoot();
  initContactForm();
  initNavToggle();
});
