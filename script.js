// Simple scroll-in animation using IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const animated = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animated.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything
    animated.forEach((el) => el.classList.add("in-view"));
  }

  // Auto-update year if element exists
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
