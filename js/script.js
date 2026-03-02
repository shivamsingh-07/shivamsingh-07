// ===== Navigation Scroll Effect =====
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Mobile Menu Toggle =====
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ===== Smooth Scrolling (Optimized for 60fps) =====
let isScrolling = false;
let scrollAnimationId = null;

function smoothScrollTo(targetPosition, duration = 1500) {
  // Cancel any existing scroll animation
  if (scrollAnimationId !== null) {
    cancelAnimationFrame(scrollAnimationId);
  }

  const startPosition = window.pageYOffset || window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now(); // Use performance.now() for better accuracy

  function animation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1); // Clamp between 0 and 1

    // Ease-in-out cubic for smooth 60fps animation
    const easedProgress = easeInOutCubic(progress);
    const currentPosition = startPosition + distance * easedProgress;

    window.scrollTo(0, currentPosition);

    if (progress < 1) {
      scrollAnimationId = requestAnimationFrame(animation);
    } else {
      // Ensure we end exactly at target position
      window.scrollTo(0, targetPosition);
      isScrolling = false;
      scrollAnimationId = null;
    }
  }

  function easeInOutCubic(t) {
    // Optimized ease-in-out cubic for 60fps
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  isScrolling = true;
  scrollAnimationId = requestAnimationFrame(animation);
}

// Detect mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;

      // Use normal scroll for mobile, custom smooth scroll for desktop
      if (isMobileDevice()) {
        window.scrollTo({
          top: offsetTop,
          behavior: "auto", // Normal instant scroll on mobile
        });
      } else {
        smoothScrollTo(offsetTop); // Custom smooth scroll for desktop
      }
    }
  });
});

// ===== Typing Animation =====
const typingText = document.querySelector(".typing-text");
const texts = ["Operational Engineer", "DevOps Engineer", "SRE Enthusiast", "Cloud Engineer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeText, typeSpeed);
}

// Start typing animation
if (typingText) {
  typeText();
}

// ===== Scroll Animations (AOS) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate");
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el);
});

// ===== Parallax Effect for Hero Orbs =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll(".gradient-orb");

  orbs.forEach((orb, index) => {
    const speed = 0.5 + index * 0.1;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== Floating Cards Animation =====
const floatingCards = document.querySelectorAll(".floating-card");
floatingCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.5}s`;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll("section[id]");

function highlightNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavLink);

// ===== Skill Tags Hover Effect =====
const skillTags = document.querySelectorAll(".skill-tag");
skillTags.forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px) scale(1.05)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// ===== Project Cards Tilt Effect =====
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ===== Scroll Progress Indicator =====
function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = windowHeight > 0 ? (window.pageYOffset / windowHeight) * 100 : 0;
    progressBar.style.width = scrolled + "%";
  });
}

createScrollProgress();

// ===== Cursor Trail Effect (Optional) =====
let cursorTrail = [];
const trailLength = 20;

document.addEventListener("mousemove", (e) => {
  cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

  if (cursorTrail.length > trailLength) {
    cursorTrail.shift();
  }

  // Remove old trail points
  cursorTrail = cursorTrail.filter((point) => Date.now() - point.time < 500);
});

// ===== Initialize on Load =====
window.addEventListener("load", () => {
  // Add loaded class for fade-in animations
  document.body.classList.add("loaded");

  // Trigger initial animations
  const heroText = document.querySelector(".hero-text");
  if (heroText) {
    heroText.classList.add("fade-in");
  }
});

// ===== Performance Optimization: Debounce Scroll Events =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
  highlightNavLink();
}, 10);

window.addEventListener("scroll", debouncedScroll);

// ===== Update Copyright Year Dynamically =====
const currentYearElement = document.getElementById("current-year");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}
