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

// ===== Project image sliders =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lbPrev = lightbox.querySelector(".lightbox__nav--prev");
const lbNext = lightbox.querySelector(".lightbox__nav--next");
const lbClose = lightbox.querySelector(".lightbox__close");
let lbImages = [];
let lbIndex = 0;

function openLightbox(images, i) {
  lbImages = images;
  showLightbox(i);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function showLightbox(i) {
  lbIndex = (i + lbImages.length) % lbImages.length;
  const slide = lbImages[lbIndex];
  lightboxImg.src = slide.src;
  lightboxImg.alt = slide.alt || "";
  const multiple = lbImages.length > 1;
  lbPrev.style.display = multiple ? "" : "none";
  lbNext.style.display = multiple ? "" : "none";
}
function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
lbNext.addEventListener("click", () => showLightbox(lbIndex + 1));
lbPrev.addEventListener("click", () => showLightbox(lbIndex - 1));
lbClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  else if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
  else if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
});

document.querySelectorAll(".project-slider").forEach((slider) => {
  const track = slider.querySelector(".project-slider__track");
  const slides = Array.from(slider.querySelectorAll(".project-slider__slide"));

  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => openLightbox(slides, i));
  });

  if (slides.length <= 1) {
    slider.querySelectorAll(".project-slider__btn").forEach((b) => (b.style.display = "none"));
    return;
  }

  const dotsWrap = slider.querySelector(".project-slider__dots");
  const delay = parseInt(slider.dataset.autoplay, 10) || 3000;
  let index = 0;
  let timer;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "project-slider__dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
  }

  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  function start() {
    timer = setInterval(next, delay);
  }
  function stop() {
    clearInterval(timer);
  }
  function restart() {
    stop();
    start();
  }

  slider.querySelector(".project-slider__btn--next").addEventListener("click", () => {
    next();
    restart();
  });
  slider.querySelector(".project-slider__btn--prev").addEventListener("click", () => {
    prev();
    restart();
  });

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  start();
});
