// script.js - small helpers for form UX
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contact-form');
  if(!form) return;

  const statusEl = document.getElementById('form-status');
  const btn = document.getElementById('send-btn');

  function showStatus(msg){
    if(statusEl) statusEl.textContent = msg;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();

    const name = (form.querySelector('#name') || {}).value?.trim() || '';
    const email = (form.querySelector('#email') || {}).value?.trim() || '';
    const message = (form.querySelector('#message') || {}).value?.trim() || '';

    if(!name || !email || !message){
      showStatus('Please fill required fields: name, email and message.');
      return;
    }

    // simple email format check
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!emailOK){
      showStatus('Please enter a valid email address.');
      return;
    }

    // visual feedback
    btn.disabled = true;
    const prevText = btn.textContent;
    btn.textContent = 'Sending...';

    // NOTE: currently this is a client-side demo only.
    // Replace with fetch() to your API or form service later.
    setTimeout(() => {
      showStatus('Thank you — your enquiry has been recorded. We will respond shortly.');
      form.reset();
      btn.disabled = false;
      btn.textContent = prevText;
    }, 900);
  });
});
