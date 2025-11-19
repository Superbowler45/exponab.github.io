/* script.js - product rendering + form handling + small UI */
document.addEventListener('DOMContentLoaded', () => {
  // small mobile menu
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
  }

  // PRODUCT DATA (static arrays) - file names must match exactly (case-sensitive)
  const products = {
    fruits: [
      {name:"Pomegranate", file:"assets/products/fruits/pomegranate.png"},
      {name:"Green Grapes", file:"assets/products/fruits/green-grapes.png"},
      {name:"Black Grapes", file:"assets/products/fruits/black-grapes-(seedless).png"},
      {name:"Banana", file:"assets/products/fruits/banana.png"},
      {name:"Alphonso Mango", file:"assets/products/fruits/alphonso-mango.png"},
      {name:"Apple", file:"assets/products/fruits/apple.png"},
      {name:"Orange", file:"assets/products/fruits/orange.png"}
    ],
    vegetables: [
      {name:"Onion", file:"assets/products/vegetables/onion.png"},
      {name:"Tomato", file:"assets/products/vegetables/tomato.png"},
      {name:"Green Chilli", file:"assets/products/vegetables/green-chilli.png"},
      {name:"Lemon", file:"assets/products/vegetables/lemon.png"},
      {name:"Turmeric", file:"assets/products/staples/turmeric.png"} // example
    ],
    staples: [
      {name:"Basmati rice", file:"assets/products/staples/basmati-rice.jpg"},
      {name:"Non-basmati milled rice", file:"assets/products/staples/non‐basmati-milled-rice.jpg"},
      {name:"Wheat", file:"assets/products/staples/wheat.jpg"},
      {name:"Millets", file:"assets/products/staples/millet.jpg"},
      {name:"Sugarcane", file:"assets/products/staples/sugarcane.png"}
    ],
    meat: [
      {name:"Chicken (frozen)", file:"assets/products/meat/chicken-meat.jpg"},
      {name:"Tilapia", file:"assets/products/meat/tilapia-fish.jpg"},
      {name:"Mackerel", file:"assets/products/meat/mackerel-fish.jpg"}
    ]
  };

  // render function
  function renderGrid(list, containerId){
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      // image element
      const img = document.createElement('img');
      img.src = p.file;
      img.alt = p.name;
      img.onerror = () => { img.src = 'assets/icons/fruits.png'; img.style.objectFit='contain' };
      // text
      const h3 = document.createElement('h3'); h3.textContent = p.name;
      const desc = document.createElement('div'); desc.className='product-desc'; desc.textContent = '';
      card.append(img, h3, desc);
      container.appendChild(card);
    });
  }

  // render sample product grid on homepage (staples)
  renderGrid(products.staples, 'product-grid');

  // render each category on products page if present
  renderGrid(products.fruits, 'fruits-grid');
  renderGrid(products.vegetables, 'vegetables-grid');
  renderGrid(products.staples, 'staples-grid');
  renderGrid(products.meat, 'meat-grid');

  // ENQUIRY FORM - mailto fallback with basic validation
  const form = document.getElementById('enquiry-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const company = document.getElementById('company').value.trim();
      const role = document.getElementById('role').value;
      const message = document.getElementById('message').value.trim();

      if(!name || !email || !message){
        alert('Please fill name, email and message.');
        return;
      }

      // simple email pattern
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRe.test(email)){
        alert('Please enter a valid email.');
        return;
      }

      // prepare mailto fallback (open mail client)
      const subject = encodeURIComponent(`Enquiry from ${name} — ${role}`);
      let body = `Name: ${name}%0D%0ACompany: ${company}%0D%0AEmail: ${email}%0D%0ARole: ${role}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
      // open mail client
      const mailto = `mailto:info@exponab.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;

      // Clear form
      form.reset();
    });
  }
});
