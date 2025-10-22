
// scripts.js — Simple SPA navigation + form handling
document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-links li');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  function showPage(name) {
    pages.forEach(p => p.classList.toggle('active', p.id === name));
    navItems.forEach(n => n.classList.toggle('active', n.dataset.page === name));
    // smooth scroll to top of container
    window.scrollTo({top:0, behavior:'smooth'});
  }

  document.getElementById('navLinks').addEventListener('click', (e) => {
    if (e.target && e.target.matches('li[data-page]')) {
      showPage(e.target.dataset.page);
    }
  });

  // buttons with data-page attribute
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const page = btn.dataset.page;
      if (page) { e.preventDefault(); showPage(page); }
    });
  });

  // contact form (local demo only — no backend)
  const contactForm = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    // For a demo, we'll just show a success message and log to console
    const payload = Object.fromEntries(data.entries());
    console.log('Contact form submitted (demo):', payload);
    status.textContent = 'Message sent (demo). In a real site this would be delivered by a server.';
    contactForm.reset();
  });

  document.getElementById('resetForm').addEventListener('click', () => {
    contactForm.reset(); status.textContent = '';
  });

  // sample resume download: generate a simple text resume blob
  document.getElementById('downloadResume').addEventListener('click', (e) => {
    e.preventDefault();
    const resumeText = [
      'Elijah Mcdowell',
      'Virginia State University — Computer Science',
      '',
      'Education',
      ' - B.S. Computer Science (expected)',
      '',
      'Experience',
      ' - Student Developer — Campus App Project',
      '',
      'Skills',
      ' - JavaScript, Python, React, Node, SQL'
    ].join('\n');
    const blob = new Blob([resumeText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Elijah_Mcdowell_Resume.txt';
    document.body.appendChild(a); a.click();
    a.remove(); URL.revokeObjectURL(url);
  });
});
