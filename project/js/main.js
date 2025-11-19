document.addEventListener('DOMContentLoaded', () => {
  //FIXME - Header nenacitava s theme buttonom
  /*fetch('components/header.html')
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
      lucide.createIcons();
      initTheme();
      initActiveNav();
      initMobileMenu();
    })
    .catch(err => console.error(err));*/

  fetch('components/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
      lucide.createIcons();
    });

  lucide.createIcons();
      const themeToggle = document.getElementById("theme-toggle");
      if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark");
      }
      themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
        lucide.createIcons();
      });

      let currentPage = window.location.pathname.split('/').pop();
      if (currentPage === '') currentPage = 'index.html';

      document.querySelectorAll(".nav-link").forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.remove("text-foreground/60");
          link.classList.add("text-foreground");
        }
      });

      const mobileMenuBtn = document.getElementById("mobile-menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");
      const menuIcon = document.getElementById("menu-icon");
      const closeIcon = document.getElementById("close-icon");

      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        menuIcon.classList.toggle("hidden");
        closeIcon.classList.toggle("hidden");
      });

      document.querySelectorAll("#mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          menuIcon.classList.remove("hidden");
          closeIcon.classList.add("hidden");
        });
      });

      const form = document.getElementById("contact-form");
      const toast = document.getElementById("toast");

      form.addEventListener("submit", (e) => {
        e.preventDefault();        
        toast.classList.remove("opacity-0", "invisible");
        toast.classList.add("opacity-100", "visible");

        setTimeout(() => {
          toast.classList.remove("opacity-100", "visible");
          toast.classList.add("opacity-0", "invisible");
        }, 4000);
        form.reset();
      });
});