(function () {

    const SECTIONS = [
        { id: 'about', href: '#about' },
        { id: 'values', href: '#values' },
        { id: 'projects', href: '#projects' },
        { id: 'whychooseus', href: '#whychooseus' },
        { id: 'testimonials', href: '#testimonials' },
        { id: 'contact', href: '#contact' },
    ];

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    let ticking = false;
    
  function scrollToSection(id) {
    const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function updateURL(hash) {
    const newURL = hash
      ? window.location.pathname + hash
      : window.location.pathname;
      history.replaceState(null, '', newURL);
  }

  function setActiveLink(hash) {
    navLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href') === hash) {
          link.classList.add('nav-active');
        }
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const scrollY      = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }


      let currentSection = null;

      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.1) {
            currentSection = id;
          }
      });

      if (scrollY < 100) {
        updateURL('');
          setActiveLink(null);
      } else if (currentSection) {
        updateURL('#' + currentSection);
          setActiveLink('#' + currentSection);
      }

        ticking = false;
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1);
          scrollToSection(id);
          updateURL(href);
          setActiveLink(href);
        }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
          scrollToSection(href.slice(1));
        }
    });
  });

  window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => scrollToSection(hash.slice(1)), 100);
      }
  });

  window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();
})();