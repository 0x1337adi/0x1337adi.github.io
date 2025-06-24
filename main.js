// Light/Dark mode toggle
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(mode) {
  if (mode === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    toggleBtn.textContent = 'Dark Mode';
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    toggleBtn.textContent = 'Light Mode';
  }
  localStorage.setItem('theme', mode);
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
}

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.className = savedTheme === 'dark' ? 'min-h-screen dark-mode font-inter' : 'min-h-screen light-mode font-inter';
  
  // Update theme toggle icon
  updateThemeIcon(savedTheme === 'dark');
  
  themeToggle.addEventListener('click', function() {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      updateThemeIcon(false);
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      updateThemeIcon(true);
    }
  });
  
  function updateThemeIcon(isDark) {
    if (isDark) {
      themeToggle.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      `;
    } else {
      themeToggle.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      `;
    }
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all sections for fade-in animation
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-fade-in');
    observer.observe(section);
  });
  
  // Add hover effects to cards
  document.querySelectorAll('.bg-white, .dark\\:bg-gray-800').forEach(card => {
    card.classList.add('card-hover');
  });
  
  // Add hover effects to buttons
  document.querySelectorAll('a[href], button').forEach(button => {
    if (!button.classList.contains('social-link')) {
      button.classList.add('btn-hover');
    }
  });
  
  // Navigation highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'dark:text-blue-400');
      link.classList.add('text-gray-600', 'dark:text-gray-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.remove('text-gray-600', 'dark:text-gray-300');
        link.classList.add('text-blue-600', 'dark:text-blue-400');
      }
    });
  });
  
  // Typing effect for hero title (optional)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
  
  // Initialize typing effect if desired
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && window.innerWidth > 768) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 500);
  }
  
  // Counter animation for stats
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + (element.textContent.includes('+') ? '+' : '');
      }
    }
    
    updateCounter();
  }
  
  // Trigger counter animation when stats come into view
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numberElement = entry.target.querySelector('.text-2xl');
        if (numberElement) {
          const text = numberElement.textContent;
          const target = parseInt(text.replace(/\D/g, ''));
          
          if (target > 0) {
            animateCounter(numberElement, target);
          }
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  // Observe stats cards
  document.querySelectorAll('.grid.grid-cols-2').forEach(container => {
    statsObserver.observe(container);
  });
  
  // Mobile menu toggle (if needed)
  const mobileMenuButton = document.querySelector('.md\\:hidden');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Add loading state to buttons
  document.querySelectorAll('a[href="mailto:"]').forEach(button => {
    button.addEventListener('click', function() {
      this.innerHTML = '<span class="loading"></span> Opening...';
      setTimeout(() => {
        this.innerHTML = 'Say Hello';
      }, 1000);
    });
  });
  
  // Parallax effect for hero section (subtle)
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.min-h-screen');
    
    if (heroSection && scrolled < window.innerHeight) {
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });
  
  // Add focus styles for accessibility
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
}); 