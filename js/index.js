// Nav scroll
const navEl = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => {
    navEl.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

// Mobile nav toggle
function toggleNav(btn) {
  const mid = document.querySelector(".nav-mid");
  const isOpen = mid.style.display === "flex";
  mid.style.cssText = isOpen
    ? ""
    : "display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:#0D1220;padding:28px 5vw 36px;gap:24px;border-bottom:1px solid #1C2640;z-index:199";
}

// Scroll reveal
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// Active nav link highlight
const secs = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-mid a");
window.addEventListener(
  "scroll",
  () => {
    let cur = "";
    secs.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navAs.forEach((a) => {
      a.style.color = a.getAttribute("href") === "#" + cur ? "#C8FF57" : "";
    });
  },
  { passive: true },
);

const modal = document.getElementById("contactModal");

const openButtons = document.querySelectorAll(".open-modal");

const closeButton = document.querySelector(".close-modal");

const form = document.getElementById("contactForm");

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.add("show");
  });
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    alert("Message sent successfully!");

    form.reset();

    modal.classList.remove("show");
  } else {
    alert("Something went wrong. Please try again.");
  }
});
