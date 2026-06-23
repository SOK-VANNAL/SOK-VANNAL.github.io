// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Theme toggle =====
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  root.setAttribute("data-theme", "light");
}
themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ===== Nav: scrolled state + mobile menu =====
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const navBurger = document.getElementById("navBurger");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

navBurger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navBurger.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navBurger.classList.remove("open");
  })
);

// ===== Typed role effect =====
const roles = [
  "Full Stack Web Developer",
  "Freelancer",
];
const typedEl = document.getElementById("typed");
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  typedEl.textContent = current.slice(0, charIdx);
  if (!deleting && charIdx < current.length) {
    charIdx++;
    setTimeout(typeLoop, 80);
  } else if (deleting && charIdx > 0) {
    charIdx--;
    setTimeout(typeLoop, 40);
  } else {
    if (!deleting) {
      deleting = true;
      setTimeout(typeLoop, 1600);
    } else {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeLoop, 300);
    }
  }
}
typeLoop();

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

// ===== Animated counters =====
const counters = document.querySelectorAll("[data-count]");
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      let n = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const tick = () => {
        n = Math.min(target, n + step);
        el.textContent = n + suffix;
        if (n < target) requestAnimationFrame(tick);
      };
      tick();
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach((el) => countObserver.observe(el));

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("section[id]");
const navAnchors = navLinks.querySelectorAll("a");
const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach((a) =>
          a.style.setProperty("color", a.getAttribute("href") === `#${id}` ? "var(--text)" : "")
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => spyObserver.observe(s));
