const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-site-nav]");
const tabs = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("[data-category]");
const header = document.querySelector("[data-header]");
const navLinks = document.querySelectorAll(".site-nav a");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    projects.forEach((project) => {
      project.hidden = filter !== "todos" && project.dataset.category !== filter;
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const target = link.getAttribute("href");
        link.classList.toggle("is-active", target === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: `-${header?.offsetHeight ?? 72}px 0px -65% 0px`,
    threshold: 0.1,
  }
);

["apresentacao", "projetos", "formacao", "contatos"].forEach((id) => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});
