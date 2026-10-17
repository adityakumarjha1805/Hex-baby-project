const state = {
  sleepiness: 87,
  awake: false,
  profileMood: 'Sleepy',
  scannerTimer: null,
  storyIndex: 0,
  generatedDreams: [],
  guestbookEntries: [],
  starGame: {
    score: 0,
    timeLeft: 15,
    timerId: null,
    active: false,
    starInterval: null,
    spawnCount: 0,
  },
};

const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.getElementById('navLinks');
const pipStatusText = document.getElementById('pipStatusText');
const pipFigure = document.getElementById('pipFigure');
const wakeButton = document.getElementById('wakeBtnHeader');
const meetBtn = document.getElementById('meetBtn');
const enterBtn = document.getElementById('enterBtn');
const scannerOutput = document.getElementById('scannerOutput');
const scanPersonalityBtn = document.getElementById('scanPersonalityBtn');
const dreamMood = document.getElementById('dreamMood');
const dreamSetting = document.getElementById('dreamSetting');
const dreamResult = document.getElementById('dreamResult');
const generateDreamBtn = document.getElementById('generateDreamBtn');
const storyCards = [...document.querySelectorAll('.story-card')];
const storyProgressBar = document.getElementById('storyProgressBar');
const storyCounter = document.getElementById('storyCounter');
const nextStoryBtn = document.getElementById('nextStoryBtn');
const prevStoryBtn = document.getElementById('prevStoryBtn');
const guestbookForm = document.getElementById('guestbookForm');
const guestbookEntries = document.getElementById('guestbookEntries');
const guestbookFeedback = document.getElementById('guestbookFeedback');
const clearGuestbookBtn = document.getElementById('clearGuestbookBtn');
const randomMessage = document.getElementById('randomMessage');
const secretBtn = document.getElementById('secretBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const visitCount = document.getElementById('visitCount');
const visitorCounterBtn = document.getElementById('visitorCounterBtn');
const pipDialogue = document.getElementById('pipDialogue');
const pipSpeechBubble = document.getElementById('pipSpeechBubble');
const dreamCounter = document.getElementById('dreamCounter');
const moonSecretBtn = document.getElementById('moonSecretBtn');
const moonSecretBadge = document.getElementById('moonSecretBadge');
const profileDialogue = document.getElementById('pipProfileDialogue');
const personalityDescription = document.getElementById('personalityDescription');
const statusGrid = document.getElementById('statusGrid');
const portraitFactBtn = document.getElementById('portraitFactBtn');
const portraitFact = document.getElementById('portraitFact');

const moodProfiles = {
  Sleepy: {
    description: 'A cozy cloud-pillow thinker who is curious, sleepy, and easily delighted.',
    dialogue: [
      '“My nightcap has a secret pocket for extra stardust.”',
      '“I am not napping. I am testing the pillow clouds.”',
      '“One tiny yawn can power a whole bedtime story.”',
    ],
    stats: { energy: 42, imagination: 88, dreamPower: 76 },
  },
  Curious: {
    description: 'A bright little question-collector who investigates every moonbeam.',
    dialogue: [
      '“What happens if I put a star in my pocket?”',
      '“I have three questions and a very small notebook.”',
      '“Is the moon made of cheese, or just excellent cake?”',
    ],
    stats: { energy: 78, imagination: 91, dreamPower: 82 },
  },
  Magical: {
    description: 'A gentle moonlight inventor who turns ordinary thoughts into wonder.',
    dialogue: [
      '“Abraca-nap! That blanket is now a flying carpet.”',
      '“I sprinkled one sparkle. Oops, now everything sparkles.”',
      '“The moon gave me a tiny wizard hat. It is mostly snacks.”',
    ],
    stats: { energy: 67, imagination: 100, dreamPower: 97 },
  },
  Chaotic: {
    description: 'A giggle-powered dream tinkerer with a plan, a spoon, and no instructions.',
    dialogue: [
      '“The dream machine made toast. I think it is learning.”',
      '“I put my socks on the moon. The moon says thanks.”',
      '“Everything is under control! Except the tiny cloud parade.”',
    ],
    stats: { energy: 94, imagination: 93, dreamPower: 86 },
  },
};

const personalityTraits = [
  {
    title: 'Sleepy Genius',
    description: 'Pip solves tricky dream puzzles while looking for the comfiest pillow.',
  },
  {
    title: 'Cloud Architect',
    description: 'Pip designs fluffy cloud castles with excellent nap-friendly hallways.',
  },
  {
    title: 'Moonlight Inventor',
    description: 'Pip turns moonbeams, buttons, and tiny ideas into brand-new dreams.',
  },
  {
    title: 'Professional Giggle Machine',
    description: 'Pip adds a surprise giggle to every dream delivery. It is very official.',
  },
];

const pipFacts = [
  'Pip keeps a tiny notebook of cloud shapes that look like snacks.',
  'Pip’s nightcap bow is tied with a moonbeam.',
  'Pip once tested a pillow so fluffy it floated into the attic.',
  'Pip names every star delivered from the Midnight Nursery.',
  'Pip’s favorite invention is a lullaby that hums itself.',
];

const randomMessages = [
  'Achievement unlocked: Professional Cloud Inspector.',
  'Oopsie! The dream machine sneezed.',
  'Warning: Too many sparkles detected.',
  'Your dream has been approved by one very sleepy baby.',
  '404: Boring website not found.',
  'Moon milk successfully delivered.',
  'Pip has entered a very serious nap posture.',
];

function updateNavState() {
  const scrollPosition = window.scrollY + 160;
  let current = sections[0]?.id || 'home';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    const matches = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', matches);
  });
}

function setupNav() {
  navToggle?.addEventListener('click', () => {
    const isOpen = navLinksContainer.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      navToggle?.setAttribute('aria-label', 'Open menu');
    });
  });

  window.addEventListener('scroll', updateNavState);
  updateNavState();
}

function setSleepiness(nextValue, label) {
  state.sleepiness = Math.max(0, Math.min(100, nextValue));
  pipStatusText.textContent = `PIP STATUS: ${state.sleepiness}% ${label}`;
}

function updatePipDialogue(message) {
  pipDialogue.textContent = message;
  pipSpeechBubble.textContent = message;
}

function preferredScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function recordDreamDelivered() {
  const count = Number(dreamCounter.textContent) + 1;
  dreamCounter.textContent = String(count);
}

function togglePipState() {
  state.awake = !state.awake;
  pipFigure.classList.toggle('awake', state.awake);
  wakeButton.textContent = state.awake ? 'LET PIP SLEEP' : 'WAKE UP!';
  wakeButton.setAttribute('aria-pressed', String(state.awake));

  if (state.awake) {
    setSleepiness(state.sleepiness - (22 + Math.floor(Math.random() * 17)), 'AWAKE');
    updatePipDialogue('Pip says: “I am awake! Please direct me to the snack moon.”');
    document.body.classList.add('pip-dancing');
  } else {
    setSleepiness(78 + Math.floor(Math.random() * 19), 'SLEEPY');
    updatePipDialogue('Pip says: “I was absolutely not napping on the job.”');
    document.body.classList.remove('pip-dancing');
  }
}

function setupWakeButtons() {
  wakeButton?.addEventListener('click', togglePipState);

  meetBtn?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: preferredScrollBehavior(), block: 'start' });
  });

  enterBtn?.addEventListener('click', () => {
    const hero = document.getElementById('home');
    const fragment = document.createDocumentFragment();
    Array.from({ length: 12 }, () => {
      const star = document.createElement('span');
      star.textContent = '✦';
      star.className = 'dream-trail-star';
      star.setAttribute('aria-hidden', 'true');
      star.style.setProperty('--start-x', `${8 + Math.random() * 84}%`);
      star.style.setProperty('--start-y', `${12 + Math.random() * 76}%`);
      star.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 150}px`);
      star.style.setProperty('--drift-y', `${-35 - Math.random() * 110}px`);
      fragment.appendChild(star);
    });
    hero.appendChild(fragment);
    hero.querySelectorAll('.dream-trail-star').forEach((star) => {
      star.addEventListener('animationend', () => star.remove(), { once: true });
    });
    recordDreamDelivered();
    updatePipDialogue('Pip says: “Dream delivery! Mind the glitter on your shoes.”');

    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: preferredScrollBehavior(), block: 'start' });
      dreamResult.textContent = 'Dreamland approved. Pip just sneezed glitter.';
      setSleepiness(Math.max(10, state.sleepiness - 3), state.awake ? 'AWAKE' : 'DREAMY');
    }, 100);
  });

  moonSecretBtn?.addEventListener('click', () => {
    moonSecretBadge.hidden = false;
    moonSecretBtn.setAttribute('aria-expanded', 'true');
    document.getElementById('moonSecretHint').textContent = 'The moon says: “Welcome to my tiny fan club.”';
    updatePipDialogue('Pip says: “You found the moon’s secret! That is extremely moon-believable.”');
  });
}

function setupRotatingDialogue() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const lines = [
    'You look like you need a nap. Respectfully.',
    'Pip says: “My pillow is on a very important mission.”',
    'Pip says: “I can fit three dreams and one cracker in this hat.”',
    'Pip says: “The moon owes me a bedtime story.”',
  ];
  let lineIndex = 0;
  let dialogueTimer;

  const startRotation = () => {
    if (prefersReducedMotion.matches || dialogueTimer) return;
    dialogueTimer = window.setInterval(() => {
      lineIndex = (lineIndex + 1) % lines.length;
      pipSpeechBubble.textContent = lines[lineIndex];
    }, 6500);
  };

  const stopRotation = () => {
    window.clearInterval(dialogueTimer);
    dialogueTimer = undefined;
  };

  startRotation();
  prefersReducedMotion.addEventListener?.('change', () => {
    if (prefersReducedMotion.matches) {
      stopRotation();
    } else {
      startRotation();
    }
  });
}

function setProfileStats(stats) {
  Object.entries(stats).forEach(([key, rawValue]) => {
    const value = Math.max(0, Math.min(100, Math.round(rawValue)));
    const statValue = document.querySelector(`[data-stat="${key}"]`);
    const meter = statValue?.nextElementSibling;
    const bar = meter?.querySelector('span');

    if (!statValue || !meter || !bar) return;
    statValue.textContent = `${value}%`;
    meter.setAttribute('aria-valuenow', String(value));
    bar.style.width = `${value}%`;
    bar.classList.add('stats-updated');
  });
}

function setProfileMood(mood) {
  const profile = moodProfiles[mood];
  if (!profile) return;

  state.profileMood = mood;
  personalityDescription.textContent = profile.description;
  profileDialogue.textContent = profile.dialogue[0];
  setProfileStats(profile.stats);

  document.querySelectorAll('.mood-option').forEach((button) => {
    const selected = button.dataset.mood === mood;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function createScannerReadout(trait, description) {
  const readout = document.createElement('div');
  readout.className = 'scanner-readout';

  const icon = document.createElement('span');
  icon.className = 'scanner-indicator';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '✦';

  const text = document.createElement('div');
  const title = document.createElement('p');
  title.className = 'scanner-trait';
  title.textContent = trait;

  const detail = document.createElement('p');
  detail.className = 'scanner-description';
  detail.textContent = description;

  text.append(title, detail);
  readout.append(icon, text);
  return readout;
}

function scanPersonality() {
  window.clearTimeout(state.scannerTimer);
  scannerOutput.replaceChildren();
  scannerOutput.classList.add('scanning');
  scannerOutput.setAttribute('aria-busy', 'true');

  const readout = document.createElement('div');
  readout.className = 'scanner-readout';
  const indicator = document.createElement('span');
  indicator.className = 'scanner-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  indicator.textContent = '✦';
  const message = document.createElement('p');
  message.textContent = 'Dream signals incoming... scanning Pip-shaped fluff.';
  readout.append(indicator, message);
  scannerOutput.appendChild(readout);

  scanPersonalityBtn.disabled = true;
  scanPersonalityBtn.textContent = 'SCANNING...';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  state.scannerTimer = window.setTimeout(() => {
    const trait = personalityTraits[Math.floor(Math.random() * personalityTraits.length)];
    scannerOutput.replaceChildren(createScannerReadout(trait.title, trait.description));
    scannerOutput.classList.remove('scanning');
    scannerOutput.removeAttribute('aria-busy');
    scanPersonalityBtn.disabled = false;
    scanPersonalityBtn.textContent = 'SCAN AGAIN';
  }, prefersReducedMotion ? 80 : 950);
}

function setupPersonalityScanner() {
  scanPersonalityBtn?.addEventListener('click', scanPersonality);

  document.querySelectorAll('.mood-option').forEach((button) => {
    button.addEventListener('click', () => setProfileMood(button.dataset.mood));
  });

  portraitFactBtn?.addEventListener('click', () => {
    const fact = pipFacts[Math.floor(Math.random() * pipFacts.length)];
    portraitFact.textContent = `Pip fact: ${fact}`;
    portraitFact.hidden = false;
    portraitFact.classList.remove('fact-pop');
    void portraitFact.offsetWidth;
    portraitFact.classList.add('fact-pop');
  });

  const portrait = portraitFactBtn?.querySelector('img');
  portrait?.addEventListener('error', () => {
    portraitFact.textContent = 'Pip is hiding behind a cloud. The profile and scanner still work!';
    portraitFact.hidden = false;
  }, { once: true });

  setProfileMood(state.profileMood);
}

function setupProfileDialogue() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let dialogueIndex = 0;
  let dialogueTimer;

  const start = () => {
    if (prefersReducedMotion.matches || dialogueTimer) return;
    dialogueTimer = window.setInterval(() => {
      const lines = moodProfiles[state.profileMood].dialogue;
      dialogueIndex = (dialogueIndex + 1) % lines.length;
      profileDialogue.textContent = lines[dialogueIndex];
    }, 6200);
  };

  const stop = () => {
    window.clearInterval(dialogueTimer);
    dialogueTimer = undefined;
  };

  prefersReducedMotion.addEventListener?.('change', () => {
    if (prefersReducedMotion.matches) stop();
    else start();
  });
  start();
}

function setupStatsAnimation() {
  if (!statusGrid) return;

  const reveal = () => statusGrid.classList.add('stats-visible');
  if (!('IntersectionObserver' in window)) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      reveal();
      observer.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(statusGrid);
}

function generateDream() {
  const mood = dreamMood.value;
  const setting = dreamSetting.value;
  const adjectives = ['sparkly', 'jellybean', 'velvet', 'cloud-soft', 'moonlit', 'fizzy'];
  const nouns = ['lullaby', 'rocket', 'pillow cloud', 'stardust kite', 'tiny moon boat', 'giggle tunnel'];
  const actions = ['bounces', 'whispers', 'dances', 'drifts', 'sings', 'floats'];
  const suffixes = ['under the sleepy stars', 'in a tiny pocket of moonlight', 'while the curtains hum', 'with a chorus of friendly fireflies'];

  const dream = `${mood} dream in the ${setting}: a ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} ${actions[Math.floor(Math.random() * actions.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}.`;
  dreamResult.textContent = dream;
  state.generatedDreams.push(dream);
  recordDreamDelivered();
}

function setupDreamGenerator() {
  generateDreamBtn?.addEventListener('click', generateDream);
}

function updateStoryDisplay() {
  storyCards.forEach((card, index) => {
    card.classList.toggle('active', index === state.storyIndex);
  });

  const progress = ((state.storyIndex + 1) / storyCards.length) * 100;
  storyProgressBar.style.width = `${progress}%`;
  storyCounter.textContent = `${state.storyIndex + 1} / ${storyCards.length}`;
}

function setupStory() {
  nextStoryBtn?.addEventListener('click', () => {
    if (state.storyIndex < storyCards.length - 1) {
      state.storyIndex += 1;
      updateStoryDisplay();
    }
  });

  prevStoryBtn?.addEventListener('click', () => {
    if (state.storyIndex > 0) {
      state.storyIndex -= 1;
      updateStoryDisplay();
    }
  });

  updateStoryDisplay();
}

function safeText(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function loadGuestbook() {
  try {
    const stored = localStorage.getItem('pip-guestbook');
    state.guestbookEntries = stored ? JSON.parse(stored) : [];
  } catch (error) {
    state.guestbookEntries = [];
    guestbookFeedback.textContent = 'Storage is a bit sleepy today. Your guestbook will still work for this session.';
  }

  renderGuestbook();
}

function saveGuestbook() {
  try {
    localStorage.setItem('pip-guestbook', JSON.stringify(state.guestbookEntries));
  } catch (error) {
    guestbookFeedback.textContent = 'Local storage had a tiny hiccup. The entry was not saved.';
  }
}

function renderGuestbook() {
  guestbookEntries.innerHTML = '';

  if (!state.guestbookEntries.length) {
    const emptyItem = document.createElement('li');
    emptyItem.innerHTML = '<strong>No magic yet.</strong><p>Be the first sleepy star to sign the guestbook.</p>';
    guestbookEntries.appendChild(emptyItem);
    return;
  }

  state.guestbookEntries.forEach((entry) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${safeText(entry.name || 'Anonymous dreamer')}</strong>
      <em>${safeText(entry.dream || 'A very cozy dream')}</em>
      <p>${safeText(entry.message)}</p>
    `;
    guestbookEntries.appendChild(item);
  });
}

function handleGuestbookSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('guestName').value.trim();
  const dream = document.getElementById('guestDream').value.trim();
  const message = document.getElementById('guestMessage').value.trim();

  if (!message) {
    guestbookFeedback.textContent = 'Oopsie! Please add a friendly message before signing.';
    guestbookFeedback.style.color = '#ff7070';
    return;
  }

  if (message.length > 220 || name.length > 40 || dream.length > 60) {
    guestbookFeedback.textContent = 'Too much sparkle! Keep the entries a little shorter, please.';
    guestbookFeedback.style.color = '#ff7070';
    return;
  }

  const newEntry = {
    name: name || 'Anonymous dreamer',
    dream: dream || 'A cozy dream',
    message,
  };

  state.guestbookEntries.unshift(newEntry);
  state.guestbookEntries = state.guestbookEntries.slice(0, 10);
  saveGuestbook();
  renderGuestbook();
  guestbookForm.reset();
  guestbookFeedback.textContent = 'Your little magic has been added to the guestbook.';
  guestbookFeedback.style.color = '#1f7a51';
}

function clearGuestbookEntries() {
  const confirmed = window.confirm('Delete all guestbook entries from this browser?');
  if (!confirmed) return;

  state.guestbookEntries = [];
  try {
    localStorage.removeItem('pip-guestbook');
    renderGuestbook();
    guestbookFeedback.textContent = 'All guestbook entries have been softly erased.';
    guestbookFeedback.style.color = '#1f7a51';
  } catch (error) {
    guestbookFeedback.textContent = 'The guestbook refused to clear. Please try again.';
    guestbookFeedback.style.color = '#ff7070';
  }
}

function setupGuestbook() {
  guestbookForm?.addEventListener('submit', handleGuestbookSubmit);
  clearGuestbookBtn?.addEventListener('click', clearGuestbookEntries);
  loadGuestbook();
}

function randomizeMessage() {
  const random = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  randomMessage.textContent = random;
}

function revealSecret() {
  const secret = document.createElement('div');
  secret.textContent = 'SECRET: Pip hides all the best dreams in the clouds.';
  secret.style.position = 'fixed';
  secret.style.left = '50%';
  secret.style.top = '50%';
  secret.style.transform = 'translate(-50%, -50%)';
  secret.style.background = 'linear-gradient(135deg, var(--yellow), var(--pink))';
  secret.style.border = '3px solid var(--plum)';
  secret.style.borderRadius = '18px';
  secret.style.padding = '1rem 1.25rem';
  secret.style.zIndex = '300';
  secret.style.fontWeight = '900';
  secret.style.color = '#2b1d2f';
  secret.style.boxShadow = '0 16px 0 rgba(87,39,71,0.12)';
  document.body.appendChild(secret);

  setTimeout(() => secret.remove(), 2200);
}

function setupFooter() {
  secretBtn?.addEventListener('click', revealSecret);
  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: preferredScrollBehavior() }));
  visitorCounterBtn?.addEventListener('click', () => {
    const nextCount = Number(visitCount.textContent) + 1;
    visitCount.textContent = String(nextCount);
    localStorage.setItem('pip-visits', String(nextCount));
    randomizeMessage();
  });

  const storedVisits = Number(localStorage.getItem('pip-visits') || 0);
  visitCount.textContent = String(storedVisits);
  visitorCounterBtn.setAttribute('aria-label', `Visitor interaction count: ${storedVisits}`);
  randomizeMessage();
  setInterval(randomizeMessage, 12000);
}

function createBubbleBursts() {
  const area = document.querySelector('.hero-art');
  if (!area) return;

  for (let i = 0; i < 8; i += 1) {
    const bubble = document.createElement('span');
    bubble.className = 'bubble-pop';
    bubble.style.left = `${Math.random() * 80 + 10}%`;
    bubble.style.top = `${Math.random() * 70 + 18}%`;
    bubble.style.animationDelay = `${Math.random() * 0.4}s`;
    area.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1600);
  }
}

function releaseBubbles() {
  createBubbleBursts();
}

function showSillyMessage() {
  const sillyMessages = [
    'Pip has declared the moon to be absolutely tiny and unfairly dramatic.',
    'The dream machine sneezed in a very stylish way.',
    'Jellybeans are now part of the emergency plan.',
    'Everything is 31% more sparkly than before.'
  ];
  const message = sillyMessages[Math.floor(Math.random() * sillyMessages.length)];
  dreamResult.textContent = message;
}

function applyMagicButtonActions() {
  document.querySelectorAll('.magic-btn').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('star-burst')) {
        document.body.classList.add('magic-burst');
        setTimeout(() => document.body.classList.remove('magic-burst'), 500);
        createBubbleBursts();
      }

      if (button.classList.contains('theme-shift')) {
        document.body.classList.toggle('theme-shifted');
      }

      if (button.classList.contains('dance-pip')) {
        document.body.classList.add('pip-dancing');
        setTimeout(() => document.body.classList.remove('pip-dancing'), 1500);
      }

      if (button.classList.contains('silly-message')) {
        showSillyMessage();
      }

      if (button.classList.contains('bubble-burst')) {
        releaseBubbles();
      }

      if (button.classList.contains('surprise')) {
        document.body.classList.add('surprise-mode');
        setTimeout(() => document.body.classList.remove('surprise-mode'), 1200);
      }
    });
  });

  document.getElementById('resetMagicBtn')?.addEventListener('click', () => {
    document.body.classList.remove('theme-shifted', 'pip-dancing', 'surprise-mode');
    dreamResult.textContent = 'The factory has been reset. No one is dizzy anymore.';
  });
}

function startStarGame() {
  if (state.starGame.active) return;

  state.starGame.active = true;
  state.starGame.score = 0;
  state.starGame.timeLeft = 15;
  document.getElementById('starScore').textContent = '0';
  document.getElementById('starTimer').textContent = '15';

  const area = document.getElementById('starGameArea');
  area.innerHTML = '';

  function spawnStar() {
    if (!state.starGame.active) return;
    const star = document.createElement('button');
    star.type = 'button';
    star.className = 'star-item';
    star.textContent = '✦';
    star.setAttribute('aria-label', 'Collect a star');
    const x = Math.random() * (area.clientWidth - 34);
    const y = Math.random() * (area.clientHeight - 34);
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.addEventListener('click', () => {
      state.starGame.score += 1;
      document.getElementById('starScore').textContent = String(state.starGame.score);
      star.remove();
      spawnStar();
    });
    area.appendChild(star);
  }

  spawnStar();
  state.starGame.starInterval = setInterval(spawnStar, 820);

  state.starGame.timerId = setInterval(() => {
    state.starGame.timeLeft -= 1;
    document.getElementById('starTimer').textContent = String(state.starGame.timeLeft);

    if (state.starGame.timeLeft <= 0) {
      clearInterval(state.starGame.timerId);
      clearInterval(state.starGame.starInterval);
      state.starGame.active = false;
      const final = document.createElement('div');
      final.textContent = `Time's up! Final score: ${state.starGame.score}`;
      final.style.position = 'absolute';
      final.style.inset = '0';
      final.style.display = 'grid';
      final.style.placeItems = 'center';
      final.style.fontWeight = '900';
      final.style.color = '#2b1d2f';
      final.style.background = 'rgba(255,255,255,0.6)';
      area.appendChild(final);
    }
  }, 1000);
}

function setupStarGame() {
  document.getElementById('replayStarGameBtn')?.addEventListener('click', startStarGame);
  startStarGame();
}

function buildDream() {
  const imagination = Number(document.getElementById('imaginationRange').value);
  const sleepiness = Number(document.getElementById('sleepinessRange').value);
  const sparkle = Number(document.getElementById('sparkleRange').value);

  let type;
  if (imagination > 66 && sparkle > 66) {
    type = 'A dazzling comet-nap with confetti clouds';
  } else if (sleepiness > 66 && imagination < 34) {
    type = 'A sleepy marshmallow moon drift';
  } else if (sparkle < 34 && sleepiness < 34) {
    type = 'A tidy little pocket of dreaming stillness';
  } else if (imagination > 50 && sleepiness > 50) {
    type = 'A rainbow-whisper dream factory';
  } else {
    type = 'A cozy cloud pillow with tiny giggle rockets';
  }

  document.getElementById('dreamMachineOutput').textContent = type;
}

function setupDreamMachine() {
  document.getElementById('buildDreamBtn')?.addEventListener('click', buildDream);
  [
    document.getElementById('imaginationRange'),
    document.getElementById('sleepinessRange'),
    document.getElementById('sparkleRange')
  ].forEach((input) => {
    input?.addEventListener('input', () => {
      const output = document.getElementById('dreamMachineOutput');
      output.textContent = 'Machine settings are wobbling...';
    });
  });
}

function setupProjectInteractions() {
  const demoMapping = {
    lullaby: () => {
      dreamResult.textContent = 'The lullaby box is softly humming a moonbeam melody.';
      const moods = ['Cozy', 'Drowsy', 'Pinky', 'Sparkly'];
      const mood = moods[Math.floor(Math.random() * moods.length)];
      randomMessage.textContent = `Lullaby mood: ${mood} and slightly dramatic.`;
    },
    nightlight: () => {
      const colors = ['#79E6FF', '#FFB6D5', '#8AFFC1', '#FFE66D'];
      document.body.style.setProperty('--sky', colors[Math.floor(Math.random() * colors.length)]);
      dreamResult.textContent = 'The nightlight is glowing like a tiny moon with opinions.';
    },
    delivery: () => {
      const destinations = ['Moonberry Rooftop', 'Cotton Cloud Market', 'Pillow Hill', 'Wishwell Avenue'];
      const target = destinations[Math.floor(Math.random() * destinations.length)];
      dreamResult.textContent = `Dream delivery routed to ${target}. Tiny stars are already there.`;
    },
    blocks: () => {
      dreamResult.textContent = 'The blocks are busy learning how to be a very good castle.';
    },
    storybook: () => {
      const stories = ['The Sneezing Star', 'The Blanket Boat', 'The Giggle Garden'];
      dreamResult.textContent = `Story time: ${stories[Math.floor(Math.random() * stories.length)]}.`;
    },
    growth: () => {
      const badge = ['Super Sleepy Expert', 'Moon Ladder Pro', 'Cloud Cushion Architect'];
      randomMessage.textContent = `Achievement unlocked: ${badge[Math.floor(Math.random() * badge.length)]}.`;
      dreamResult.textContent = 'Pip is officially measuring excellent on the adorable scale.';
    },
  };

  document.querySelectorAll('.demo-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.demo;
      demoMapping[key]?.();
    });
  });
}

function init() {
  setupNav();
  setupWakeButtons();
  setupRotatingDialogue();
  setupPersonalityScanner();
  setupProfileDialogue();
  setupStatsAnimation();
  setupDreamGenerator();
  setupStory();
  setupGuestbook();
  setupFooter();
  applyMagicButtonActions();
  setupStarGame();
  setupDreamMachine();
  setupProjectInteractions();
  updateNavState();
  setSleepiness(87, 'SLEEPY');
  wakeButton.setAttribute('aria-pressed', 'false');

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.body.classList.remove('surprise-mode', 'theme-shifted', 'pip-dancing');
      navLinksContainer.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      navToggle?.setAttribute('aria-label', 'Open menu');
    }
  });
}

window.addEventListener('DOMContentLoaded', init);
