document.addEventListener('DOMContentLoaded', () => {
  fetch('components/header.html')
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
      restoreTheme();
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
      initHeaderControls();
    })
    .catch(err => console.error(err));

  fetch('components/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });

  const form = document.getElementById("contact-form");
  const toast = document.getElementById("toast");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (toast) {
        toast.classList.remove("opacity-0", "invisible");
        toast.classList.add("opacity-100", "visible");

        setTimeout(() => {
          toast.classList.remove("opacity-100", "visible");
          toast.classList.add("opacity-0", "invisible");
        }, 4000);
      }
      form.reset();
    });
  }

  function restoreTheme() {
    const theme = localStorage.getItem("theme");
    const root = document.documentElement;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = (theme === "dark") || (!theme && prefersDark);
    if (isDark) root.classList.add("dark"); else root.classList.remove("dark");
  }

  function updateThemeIcons(isDark) {
    const moon = document.querySelector('#header-placeholder i[data-lucide="moon"]');
    const sun = document.querySelector('#header-placeholder i[data-lucide="sun"]');
    if (moon) moon.classList.toggle('hidden', isDark);
    if (sun)  sun.classList.toggle('hidden', !isDark);
  }

  function initHeaderControls() {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      const currentlyDark = document.documentElement.classList.contains('dark');
      updateThemeIcons(currentlyDark);

      themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const nowDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", nowDark ? "dark" : "light");

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
        updateThemeIcons(nowDark);
      });
    }

    const links = document.querySelectorAll('#header-placeholder .nav-link');
    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '') currentPage = 'index.html';
    links.forEach((link) => {
      try {
        const hrefName = (new URL(link.href)).pathname.split('/').pop();
        if (hrefName === currentPage) {
          link.classList.remove("text-foreground/60");
          link.classList.add("text-foreground");
        } else {
          link.classList.add("text-foreground/60");
        }
      } catch (e) {}
    });

    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        if (menuIcon) menuIcon.classList.toggle("hidden");
        if (closeIcon) closeIcon.classList.toggle("hidden");
      });
    }

    document.querySelectorAll("#mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu) mobileMenu.classList.add("hidden");
        if (menuIcon) menuIcon.classList.remove("hidden");
        if (closeIcon) closeIcon.classList.add("hidden");
      });
    });
  }
});
