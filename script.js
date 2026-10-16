const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = siteMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
