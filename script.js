// Get elements
const navLinks = document.querySelectorAll('.navlist li a');
const sections = document.querySelectorAll('section');
const buttons = document.querySelectorAll('.btn-container button');
const homepageImage = document.querySelector('.design .circle:nth-child(2)');

// Show section and hide others
function showSection(sectionId) {
  sections.forEach(sec => sec.style.display = 'none');
  const target = document.getElementById(sectionId);
  if (target) target.style.display = (sectionId === 'home') ? 'flex' : 'block';
  // Keep homepage image visible
  if (homepageImage) homepageImage.style.display = 'block';
}

// Update active nav link based on scroll
function setActiveLink() {
  let index = sections.length;
  while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
  navLinks.forEach(link => link.classList.remove('active'));
  if (navLinks[index]) navLinks[index].classList.add('active');
}

// On page load
window.addEventListener('load', () => {
  if (!window.location.hash) {
    showSection('home');
  } else {
    showSection(window.location.hash.substring(1));
  }
  setActiveLink();
});

// Nav links click
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    showSection(targetId);
    window.scrollTo({
      top: document.getElementById(targetId).offsetTop - 80,
      behavior: 'smooth'
    });
    window.history.pushState(null, null, `#${targetId}`);
  });
});

// Homepage buttons click
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (homepageImage) homepageImage.style.display = 'block';
  });
});

// Update active link on scroll
window.addEventListener('scroll', setActiveLink);

// Handle back/forward browser buttons
window.addEventListener('hashchange', () => {
  const targetId = window.location.hash.substring(1);
  showSection(targetId);
});
// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  // Change icon
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('light-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});
