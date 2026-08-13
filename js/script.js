// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (scrollTop) {
    if (window.scrollY > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  }
});

if (scrollTop) {
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== NAV SEARCH TOGGLE ==========
const searchToggle = document.getElementById('searchToggle');
const navSearch = document.getElementById('navSearch');
const navSearchInput = document.getElementById('navSearchInput');
const navSearchClose = document.getElementById('navSearchClose');

if (searchToggle) {
  searchToggle.addEventListener('click', () => {
    navSearch.classList.toggle('active');
    if (navSearch.classList.contains('active')) {
      navSearchInput.focus();
    }
  });
}

if (navSearchClose) {
  navSearchClose.addEventListener('click', () => {
    navSearch.classList.remove('active');
    navSearchInput.value = '';
  });
}

// Close search when pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navSearch && navSearch.classList.contains('active')) {
    navSearch.classList.remove('active');
    navSearchInput.value = '';
  }
});

// Search functionality - scroll to matching card
if (navSearchInput) {
  navSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const term = navSearchInput.value.toLowerCase().trim();
      if (!term) return;

      // Search in copa cards
      const cards = document.querySelectorAll('.copa-card');
      let found = false;
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term) && !found) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('card-highlighted');
          setTimeout(() => card.classList.remove('card-highlighted'), 2500);
          found = true;
        }
      });

      // Search in sections
      if (!found) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
          const text = section.textContent.toLowerCase();
          if (text.includes(term) && !found) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            found = true;
          }
        });
      }

      if (!found) {
        alert('Nenhum resultado encontrado para "' + navSearchInput.value + '"');
      }
    }
  });
}

// ========== MOBILE MENU ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const mobileOverlay = document.querySelector('.mobile-overlay');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (mobileOverlay) mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Mobile dropdown toggle
document.querySelectorAll('.nav-links .nav-item > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      const parent = link.parentElement;
      const dropdown = parent.querySelector('.nav-dropdown');
      if (dropdown) {
        e.preventDefault();
        parent.classList.toggle('open');
      }
    }
  });
});

// Close menu when clicking a direct link (no dropdown)
document.querySelectorAll('.nav-dropdown a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .timeline-item').forEach(el => {
  observer.observe(el);
});

// ========== SEARCH FUNCTIONALITY ==========
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.copa-card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term) ? '' : 'none';
    });
  });
}

// ========== FILTER BUTTONS ==========
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll('.copa-card');

    cards.forEach(card => {
      if (filter === 'all') {
        card.style.display = '';
      } else {
        const year = parseInt(card.dataset.year);
        const decade = parseInt(filter);
        if (year >= decade && year < decade + 10) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});

// ========== HERO PARTICLES ==========
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(particle);
  }
}

createParticles();

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  const counters = document.querySelectorAll('.hero-stat .number');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Animate counters when hero is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      heroObserver.unobserve(heroSection);
    }
  }, { threshold: 0.5 });
  heroObserver.observe(heroSection);
}

// ========== ACTIVE NAV LINK ==========
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

setActiveNavLink();

// ========== BACK BUTTON FOR DETAIL PAGES ==========
// Static back-to-menu button is now in HTML (copas/*.html)
// No JavaScript dynamic button needed

// ========== MATCH TABS ==========
function initMatchTabs() {
  const tabs = document.querySelectorAll('.match-tab');
  const contents = document.querySelectorAll('.match-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

initMatchTabs();

// ========== SIDE MENU ==========
const sideMenuToggle = document.getElementById('sideMenuToggle');
const sideMenu = document.getElementById('sideMenu');
const sideMenuClose = document.getElementById('sideMenuClose');

// Create overlay
const sideMenuOverlay = document.createElement('div');
sideMenuOverlay.className = 'side-menu-overlay';
document.body.appendChild(sideMenuOverlay);

function openSideMenu() {
  sideMenu.classList.add('open');
  sideMenuToggle.classList.add('hidden');
  sideMenuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSideMenu() {
  sideMenu.classList.remove('open');
  sideMenuToggle.classList.remove('hidden');
  sideMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (sideMenuToggle) {
  sideMenuToggle.addEventListener('click', openSideMenu);
}

if (sideMenuClose) {
  sideMenuClose.addEventListener('click', closeSideMenu);
}

sideMenuOverlay.addEventListener('click', closeSideMenu);

// Close side menu when clicking a link
document.querySelectorAll('.side-menu-link').forEach(link => {
  link.addEventListener('click', () => {
    closeSideMenu();
  });
});

// Scroll highlighting for side menu
function updateSideMenuHighlight() {
  const sections = ['hero', 'timeline', 'copas-grid', 'champions', 'curiosidades'];
  const scrollPos = window.scrollY + 200;

  let activeId = 'hero';

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollPos) {
      activeId = id;
    }
  });

  document.querySelectorAll('.side-menu-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === '#' + activeId) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateSideMenuHighlight);
updateSideMenuHighlight();

// ========== CULTURAL SOUNDS (Web Audio API) ==========
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(freq, duration, type, gainVal, detune) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type || 'sine';
  osc.frequency.value = freq;
  if (detune) osc.detune.value = detune;
  gain.gain.setValueAtTime(gainVal || 0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playNoise(duration, gainVal) {
  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(gainVal || 0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  source.connect(gain);
  gain.connect(audioCtx.destination);
  source.start();
}

const culturalSounds = {
  // 🏮 Candeeiro - lamp lighting shimmer
  'candeeiro': () => {
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => playNote(f, 0.6, 'sine', 0.15), i * 100);
    });
    setTimeout(() => playNote(1568, 1.0, 'sine', 0.08), 300);
  },
  // 🍕 Pizza - bite crunch
  'pizza': () => {
    playNoise(0.15, 0.25);
    setTimeout(() => playNoise(0.1, 0.15), 120);
    playNote(220, 0.2, 'sawtooth', 0.08);
  },
  // 🎻 Violino - string melody
  'violino': () => {
    playNote(440, 0.5, 'sawtooth', 0.12);
    setTimeout(() => playNote(554, 0.5, 'sawtooth', 0.12), 400);
    setTimeout(() => playNote(659, 0.8, 'sawtooth', 0.10), 800);
  },
  // 🧉 Mate - pouring/sipping sound
  'mate': () => {
    playNote(300, 0.3, 'sine', 0.1);
    playNoise(0.8, 0.06);
    setTimeout(() => playNote(400, 0.2, 'sine', 0.08), 500);
  },
  // 🍺 Cerveja - clink + fizz
  'cerveja': () => {
    playNote(2000, 0.15, 'sine', 0.2);
    playNote(2500, 0.1, 'sine', 0.15);
    setTimeout(() => {
      playNoise(0.6, 0.04);
      playNote(800, 0.3, 'sine', 0.03);
    }, 200);
  },
  // 🎭 Carnaval - samba rhythm
  'carnaval': () => {
    const bpm = [0, 150, 300, 400, 500, 600, 750];
    const freqs = [330, 440, 330, 550, 440, 330, 660];
    bpm.forEach((t, i) => setTimeout(() => playNote(freqs[i], 0.15, 'triangle', 0.2), t));
  },
  // 🪇 Maracas - shake rattle
  'maracas': () => {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => playNoise(0.12, 0.15), i * 100);
    }
  },
  // ☎️ Telefone - ring ring
  'telefone': () => {
    [800, 1000].forEach(f => playNote(f, 0.3, 'sine', 0.15));
    setTimeout(() => {
      [800, 1000].forEach(f => playNote(f, 0.3, 'sine', 0.15));
    }, 400);
  },
  // ⚽ Pelé - whistle + crowd
  'pele': () => {
    playNote(1200, 0.2, 'sine', 0.2);
    setTimeout(() => playNote(1600, 0.4, 'sine', 0.15), 250);
    setTimeout(() => playNoise(1.0, 0.05), 100);
  },
  // 🥨 Pretzel - crunch
  'pretzel': () => {
    playNoise(0.12, 0.3);
    setTimeout(() => playNoise(0.08, 0.2), 100);
    playNote(150, 0.15, 'square', 0.06);
  },
  // 💃 Tango - guitar strum + castanets
  'tango': () => {
    [330, 415, 494, 659].forEach((f, i) => {
      setTimeout(() => playNote(f, 0.4, 'sawtooth', 0.1), i * 60);
    });
    setTimeout(() => {
      playNote(2000, 0.05, 'sine', 0.15);
      setTimeout(() => playNote(2200, 0.05, 'sine', 0.12), 80);
    }, 300);
  },
  // ☕ Espresso - coffee machine
  'espresso': () => {
    playNote(180, 0.3, 'sawtooth', 0.08);
    playNoise(0.8, 0.06);
    setTimeout(() => {
      playNote(600, 0.4, 'sine', 0.05);
    }, 500);
  },
  // 🏛️ Brandemburgo - classical tone
  'brandemburgo': () => {
    playNote(262, 0.6, 'sine', 0.12);
    setTimeout(() => playNote(330, 0.6, 'sine', 0.12), 500);
    setTimeout(() => playNote(392, 0.6, 'sine', 0.12), 1000);
    setTimeout(() => playNote(523, 1.0, 'sine', 0.10), 1500);
  },
  // ✝️ Cristo - ethereal choir
  'cristo': () => {
    [262, 330, 392, 523].forEach((f, i) => {
      setTimeout(() => playNote(f, 1.5, 'sine', 0.06), i * 200);
    });
  },
  // 🗼 Eiffel - romantic accordion
  'eiffel': () => {
    [440, 554, 659, 880].forEach((f, i) => {
      setTimeout(() => playNote(f, 0.35, 'sawtooth', 0.08), i * 250);
    });
  },
  // 🥋 Capoeira - berimbau twang
  'capoeira': () => {
    playNote(150, 0.5, 'sawtooth', 0.15);
    setTimeout(() => {
      playNote(300, 0.3, 'sawtooth', 0.12);
      playNote(450, 0.3, 'sine', 0.08);
    }, 300);
  },
  // 🛵 Vespa - scooter engine
  'vespa': () => {
    playNote(120, 0.15, 'sawtooth', 0.12);
    setTimeout(() => playNote(160, 0.15, 'sawtooth', 0.12), 150);
    setTimeout(() => playNote(200, 0.15, 'sawtooth', 0.12), 300);
    setTimeout(() => playNote(180, 0.4, 'sawtooth', 0.1), 450);
    playNoise(0.6, 0.03);
  },
  // 🪭 Flamenco - guitar + palmas
  'flamenco': () => {
    [330, 392, 494, 659, 784].forEach((f, i) => {
      setTimeout(() => playNote(f, 0.25, 'sawtooth', 0.1), i * 80);
    });
    setTimeout(() => {
      playNote(1800, 0.05, 'sine', 0.2);
      setTimeout(() => playNote(2000, 0.05, 'sine', 0.18), 100);
    }, 500);
  },
  // 🚗 Autobahn - car whoosh
  'autobahn': () => {
    playNote(200, 0.2, 'sawtooth', 0.08);
    setTimeout(() => playNote(400, 0.3, 'sine', 0.1), 100);
    setTimeout(() => playNote(800, 0.2, 'sine', 0.06), 200);
    playNoise(0.5, 0.04);
  },
  // 🥐 Croissant - crunch + flaky sound
  'croissant': () => {
    playNoise(0.1, 0.2);
    setTimeout(() => playNote(500, 0.1, 'sine', 0.06), 80);
    setTimeout(() => playNoise(0.08, 0.15), 160);
  },
  // ⚽ Messi - whistle + chant
  'messi': () => {
    playNote(1400, 0.15, 'sine', 0.2);
    setTimeout(() => playNote(1800, 0.3, 'sine', 0.15), 200);
    setTimeout(() => {
      [330, 330, 440, 330, 330, 440].forEach((f, i) => {
        setTimeout(() => playNote(f, 0.15, 'triangle', 0.1), i * 120);
      });
    }, 600);
  },
  // 🎸 Guitarra - guitar strum
  'guitarra': () => {
    [196, 247, 294, 370, 494].forEach((f, i) => {
      setTimeout(() => playNote(f, 0.5, 'sawtooth', 0.1), i * 40);
    });
  }
};

// Map cultural icon class to sound key
const culturalSoundMap = {
  'cultural-swing': 'candeeiro',
  'cultural-wobble': 'pizza',
  'cultural-vibrate': 'violino',
  'cultural-steam': 'mate',
  'cultural-clink': 'cerveja',
  'cultural-sparkle': 'carnaval',
  'cultural-shake': 'maracas',
  'cultural-ring': 'telefone',
  'cultural-bounce': 'pele',
  'cultural-glow': 'brandemburgo',
  'cultural-dance': 'tango',
  'cultural-spin': 'capoeira',
  'cultural-drive': 'vespa',
  'cultural-fan': 'flamenco',
  'cultural-strum': 'guitarra'
};

// Some icons share classes, map by title/name for unique sounds
const culturalTitleSoundMap = {
  'Candeeiro': 'candeeiro',
  'Pizza': 'pizza',
  'Violino': 'violino',
  'Mate': 'mate',
  'Cerveja': 'cerveja',
  'Carnaval': 'carnaval',
  'Maracas': 'maracas',
  'Telefone': 'telefone',
  'Pelé': 'pele',
  'Pretzel': 'pretzel',
  'Tango': 'tango',
  'Espresso': 'espresso',
  'Brandemburgo': 'brandemburgo',
  'Cristo': 'cristo',
  'Eiffel': 'eiffel',
  'Capoeira': 'capoeira',
  'Vespa': 'vespa',
  'Flamenco': 'flamenco',
  'Autobahn': 'autobahn',
  'Croissant': 'croissant',
  'Messi': 'messi',
  'Guitarra': 'guitarra'
};

function getCulturalSound(el) {
  const nameEl = el.querySelector('.cultural-name');
  const name = nameEl ? nameEl.textContent.trim() : '';
  if (culturalTitleSoundMap[name]) return culturalTitleSoundMap[name];
  const icon = el.querySelector('.cultural-icon');
  if (icon) {
    for (const cls of icon.classList) {
      if (culturalSoundMap[cls]) return culturalSoundMap[cls];
    }
  }
  return null;
}

// ========== CULTURAL ELEMENTS INTERACTION ==========
document.querySelectorAll('.copa-card-cultural').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Resume AudioContext if suspended (browser autoplay policy)
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const icon = el.querySelector('.cultural-icon');
    const name = el.querySelector('.cultural-name');

    // Play sound
    const soundKey = getCulturalSound(el);
    if (soundKey && culturalSounds[soundKey]) {
      culturalSounds[soundKey]();
    }

    // Add pop animation
    icon.style.animation = 'none';
    icon.offsetHeight;
    icon.style.animation = 'pop 0.3s ease';

    // Show name briefly
    name.style.opacity = '1';
    name.style.transform = 'translateY(0)';

    setTimeout(() => {
      name.style.opacity = '';
      name.style.transform = '';
    }, 1500);
  });

  el.addEventListener('touchstart', (e) => {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const soundKey = getCulturalSound(el);
    if (soundKey && culturalSounds[soundKey]) {
      culturalSounds[soundKey]();
    }

    const name = el.querySelector('.cultural-name');
    name.style.opacity = '1';
    name.style.transform = 'translateY(0)';

    setTimeout(() => {
      name.style.opacity = '';
      name.style.transform = '';
    }, 2000);
  }, { passive: true });
});

// ========== SCROLL TO CARD FROM SIDE MENU ==========
document.querySelectorAll('.side-menu-link.copa-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#card-')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetCard = document.getElementById(targetId);
      
      if (targetCard) {
        closeSideMenu();
        
        // Scroll to card
        setTimeout(() => {
          const cardRect = targetCard.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = scrollTop + cardRect.top - 100;
          
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
          
          // Highlight effect
          targetCard.classList.add('card-highlighted');
          setTimeout(() => {
            targetCard.classList.remove('card-highlighted');
          }, 2000);
        }, 300);
      }
    }
  });
});

// ========== FLOATING SCORE TRACKER ==========
let totalScore = 0;
let totalCorrect = 0;
let totalAnswered = 0;
const TOTAL_ALL_QUESTIONS = 64; // 8 quizzes x 8 questions

function createFloatingScore() {
  const el = document.createElement('div');
  el.id = 'floatingScore';
  el.innerHTML = `
    <div class="fs-icon">⚽</div>
    <div class="fs-info">
      <span class="fs-label">Pontuação Geral</span>
      <span class="fs-value" id="fsValue">0</span>
      <span class="fs-detail" id="fsDetail">0/${TOTAL_ALL_QUESTIONS} acertos</span>
    </div>
  `;
  document.body.appendChild(el);
}

function updateFloatingScore() {
  const val = document.getElementById('fsValue');
  const det = document.getElementById('fsDetail');
  if (val) val.textContent = totalScore;
  if (det) det.textContent = `${totalAnswered}/${TOTAL_ALL_QUESTIONS} respondidas`;
}

function animateScorePopup(x, y) {
  const popup = document.createElement('div');
  popup.className = 'score-popup';
  popup.textContent = '+1';
  popup.style.left = x + 'px';
  popup.style.top = y + 'px';
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 800);
}

// ========== QUIZ FUNCTIONALITY ==========
function initQuizzes() {
  createFloatingScore();

  const quizCards = document.querySelectorAll('.quiz-card');
  
  quizCards.forEach(card => {
    const quizNumber = card.dataset.quiz;
    const scoreElement = card.querySelector('.score-value');
    const restartButton = card.querySelector('.quiz-restart');
    const options = card.querySelectorAll('.quiz-option');
    let score = 0;
    let answered = 0;
    const totalQuestions = 8;
    
    options.forEach(option => {
      option.addEventListener('click', function() {
        const question = this.closest('.quiz-question');
        if (question.classList.contains('answered')) return;
        
        question.classList.add('answered');
        answered++;
        totalAnswered++;
        
        const isCorrect = this.dataset.correct === 'true';
        
        const allOptions = question.querySelectorAll('.quiz-option');
        allOptions.forEach(opt => {
          opt.classList.add('disabled');
          if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
          }
        });
        
        if (!isCorrect) {
          this.classList.add('incorrect');
        } else {
          score++;
          totalScore++;
          totalCorrect++;
          scoreElement.textContent = score;
        }

        // Animate floating score
        updateFloatingScore();
        const rect = this.getBoundingClientRect();
        animateScorePopup(rect.left + rect.width / 2, rect.top);

        // Pulse the floating score badge
        const fs = document.getElementById('floatingScore');
        if (fs) {
          fs.classList.add('pulse');
          setTimeout(() => fs.classList.remove('pulse'), 400);
        }
        
        if (answered === totalQuestions) {
          restartButton.style.display = 'inline-block';
          if (score >= 6) {
            celebrate(score, totalQuestions);
          }
        }
      });
    });
    
    restartButton.addEventListener('click', function() {
      // Subtract this quiz's score from totals
      totalScore -= score;
      totalCorrect -= score;
      totalAnswered -= answered;

      score = 0;
      answered = 0;
      scoreElement.textContent = '0';
      this.style.display = 'none';
      
      card.querySelectorAll('.quiz-question').forEach(q => {
        q.classList.remove('answered');
        q.querySelectorAll('.quiz-option').forEach(opt => {
          opt.classList.remove('correct', 'incorrect', 'disabled');
        });
      });

      updateFloatingScore();
    });
  });
}

// Celebration effect
function celebrate(score, total) {
  const percentage = (score / total) * 100;
  let message = '';
  
  if (percentage === 100) {
    message = '🏆 PERFEITO! Você é um expert em Copas do Mundo!';
  } else if (percentage >= 75) {
    message = '🥇 EXCELENTE! Você conhece muito sobre Copas!';
  } else if (percentage >= 50) {
    message = '🥈 BOM! Continue estudando sobre as Copas!';
  } else {
    message = '📚 Continue tentando! Você vai melhorar!';
  }
  
  // Create celebration element
  const celebration = document.createElement('div');
  celebration.className = 'quiz-celebration';
  celebration.innerHTML = `
    <div class="celebration-content">
      <span class="celebration-emoji">${percentage === 100 ? '🏆' : percentage >= 75 ? '🥇' : percentage >= 50 ? '🥈' : '📚'}</span>
      <p>${message}</p>
      <p class="celebration-score">${score}/${total} (${Math.round(percentage)}%)</p>
    </div>
  `;
  
  document.body.appendChild(celebration);
  
  // Remove after 3 seconds
  setTimeout(() => {
    celebration.remove();
  }, 3000);
}

// Initialize quizzes when DOM is loaded
document.addEventListener('DOMContentLoaded', initQuizzes);
