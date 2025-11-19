// script.js

document.addEventListener('DOMContentLoaded', function () {
  // form handler
  const form = document.getElementById('enquiryForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';

      const name = (form.querySelector('#name') || {}).value || '';
      const email = (form.querySelector('#email') || {}).value || '';
      const company = (form.querySelector('#company') || {}).value || '';
      const role = (form.querySelector('#role') || {}).value || '';
      const message = (form.querySelector('#message') || {}).value || '';

      if (!name.trim() || !email.trim() || !message.trim()) {
        status.textContent = 'Please fill required fields.';
        return;
      }

      // simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        status.textContent = 'Please enter a valid email.';
        return;
      }

      // Construct mailto fallback
      const to = 'info@exponab.com';
      const subject = encodeURIComponent('Website enquiry from ' + name);
      const bodyLines = [
        `Name: ${name}`,
        `Company: ${company}`,
        `Role: ${role}`,
        `Email: ${email}`,
        '',
        'Message:',
        message
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));

      // Try to open mail client (this is fallback)
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      status.textContent = 'Opening email client...';
      setTimeout(() => {
        status.textContent = 'If your email client did not open, please send an email to info@exponab.com';
      }, 3000);
    });
  }

  // if video missing, hide video player gracefully
  const video = document.querySelector('.logo-video');
  if (video && video.querySelector('source')) {
    // nothing — will show if source present
  } else if (video) {
    video.style.display = 'none';
  }
});
