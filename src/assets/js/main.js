// Scroll animation system (production-grade lightweight AOS)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el);
});

// Active nav highlighting
const path = window.location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === path) {
    link.classList.add("text-blue-500");
  }
});