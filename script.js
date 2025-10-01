// =======================
// Tabs
// =======================
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('[data-section]');

function showSection(id) {
  sections.forEach(s => s.hidden = s.id !== id);
  tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.target === id));
}

tabs.forEach(t => t.addEventListener('click', () => showSection(t.dataset.target)));
showSection('home');

// =======================
// Comic Reader
// =======================
const TOTAL_PAGES = 5;
let currentPageIndex = 1;
const pageIndicator = document.getElementById('page-indicator');

const pages = [
  { webp: "side-quest-balan/first-part/webp-versions/lost-sword-comic-page-1.webp", png: "side-quest-balan/first-part/png-versions/lost-sword-comic-page-1.png" },
  { webp: "side-quest-balan/first-part/webp-versions/lost-sword-comic-page-2.webp", png: "side-quest-balan/first-part/png-versions/lost-sword-comic-page-2.png" },
  { webp: "side-quest-balan/first-part/webp-versions/lost-sword-comic-page-3.webp", png: "side-quest-balan/first-part/png-versions/lost-sword-comic-page-3.png" },
  { webp: "side-quest-balan/first-part/webp-versions/lost-sword-comic-page-4.webp", png: "side-quest-balan/first-part/png-versions/lost-sword-comic-page-4.png" },
  { webp: "side-quest-balan/first-part/webp-versions/lost-sword-comic-page-5.webp", png: "side-quest-balan/first-part/png-versions/lost-sword-comic-page-5.png" }
];

function updateReader() {
  const page = pages[currentPageIndex - 1];
  const readerStage = document.getElementById('reader-stage');
  readerStage.innerHTML = `
    <picture>
      <source srcset="${page.webp}" type="image/webp">
      <img class="page" src="${page.png}" alt="comic page" loading="lazy" decoding="async">
    </picture>
  `;
  pageIndicator.textContent = `Page ${currentPageIndex} / ${TOTAL_PAGES}`;
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPageIndex > 1) currentPageIndex--;
  updateReader();
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentPageIndex < TOTAL_PAGES) currentPageIndex++;
  updateReader();
});

document.getElementById('open-comic-btn').addEventListener('click', () => {
  currentPageIndex = 1;
  showSection('reader');
  updateReader();
});

document.getElementById('open-comic').addEventListener('click', e => {
  e.preventDefault();
  currentPageIndex = 1;
  showSection('reader');
  updateReader();
});

// =======================
// Clicker / Happy Coins
// =======================
const balanPicture = document.querySelector('.balan-container picture');
const balanWebp = balanPicture.querySelector('source');
const balanImg = balanPicture.querySelector('img');
const clickCountEl = document.getElementById('click-count');
const happyCoinsEl = document.getElementById('happy-coins');
const resetBtn = document.getElementById('reset-clicks');

let clicks = Number(localStorage.getItem('balanClicks')) || 0;
// CHEAT HERE //
let happyCoins = Number(localStorage.getItem('balanHappyCoins')) || 0;

clickCountEl.textContent = clicks;
happyCoinsEl.textContent = happyCoins;

function updateHappyCoins() {
  happyCoinsEl.textContent = happyCoins;
  localStorage.setItem('balanHappyCoins', happyCoins);
}

// Sprites
const defaultSprite = { webp: "sprites/balan-balan-clicker/webp-versions/balan-sprite.webp", png: "sprites/balan-balan-clicker/png-versions/balan-sprite.png", alt: "balan balan 1" };
const clickSprite = { webp: "sprites/balan-balan-clicker/webp-versions/balan-sprite-click.webp", png: "sprites/balan-balan-clicker/png-versions/balan-sprite-click.png", alt: "balan balan click" };

const milestones = [
  { count: 100, webp: "sprites/balan-balan-clicker/webp-versions/balan-sprite-100.webp", png: "sprites/balan-balan-clicker/png-versions/balan-sprite-100.png", alt: "balan 100" },
  { count: 500, webp: "sprites/balan-balan-clicker/webp-versions/balan-sprite-500.webp", png: "sprites/balan-balan-clicker/png-versions/balan-sprite-500.png", alt: "balan 500" },
  { count: 1000, webp: "sprites/balan-balan-clicker/webp-versions/balan-sprite-1000.webp", png: "sprites/balan-balan-clicker/png-versions/balan-sprite-1000.png", alt: "balan 1000" },
  { count: 3500, webp: "sprites/balan-balan-clicker/webp-versions/balan-sprite-3500.webp", png: "sprites/balan-balan-clicker/png-versions/balan-sprite-3500.png", alt: "balan 3500" },
  { count: 7000, webp: "sprites/balan-balan-clicker/webp-versions/balan-sprite-7000.webp", png: "sprites/balan-balan-clicker/png-versions/balan-sprite-7000.png", alt: "balan 7000" }
];

function setBalanSprite(sprite) {
  balanImg.src = sprite.png;
  balanImg.alt = sprite.alt;
  balanWebp.srcset = sprite.webp;
}

function checkMilestone() {
  let chosen = defaultSprite;
  for (const m of milestones) if (clicks >= m.count) chosen = m;
  setBalanSprite(chosen);
}
checkMilestone();

// Audio system
let randomVoices = shuffleArray([
  'voice-acting/balan-balan/clkr-ah-one.mp3','voice-acting/balan-balan/clkr-ah-two.mp3','voice-acting/balan-balan/clkr-ah-three.mp3',
  'voice-acting/balan-balan/clkr-eh-one.mp3','voice-acting/balan-balan/clkr-eh-two.mp3','voice-acting/balan-balan/clkr-eh-three.mp3',
  'voice-acting/balan-balan/clkr-oh-one.mp3','voice-acting/balan-balan/clkr-oh-two.mp3','voice-acting/balan-balan/clkr-oh-three.mp3'
]);
let fiftyVoices = shuffleArray([
  'voice-acting/balan-balan/clkr-mmn-one.mp3','voice-acting/balan-balan/clkr-mmn-two.mp3','voice-acting/balan-balan/clkr-mmn-three.mp3'
]);
let milestoneVoices = shuffleArray([
  'voice-acting/balan-balan/clkr-balan-one.mp3','voice-acting/balan-balan/clkr-balan-two.mp3','voice-acting/balan-balan/clkr-balan-three.mp3'
]);

let isMuted = false;
document.getElementById('mute-btn').addEventListener('click', () => {
  isMuted = !isMuted;
  document.getElementById('mute-btn').textContent = isMuted ? 'talk!' : 'shut up!';
});

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function playVoice(src) {
  if (!src || isMuted) return;
  const audio = new Audio(src);
  audio.play().catch(() => {});
}

// Infinite shuffled queue system
function createShuffler(arr) {
  let shuffled = shuffleArray([...arr]);
  let index = 0;
  return function next() {
    const value = shuffled[index];
    index++;
    if (index >= shuffled.length) {
      shuffled = shuffleArray([...arr]); // reshuffle when we finish the cycle
      index = 0;
    }
    return value;
  };
}

// Initialize shufflers
const nextRandomVoice = createShuffler(randomVoices);
const nextFiftyVoice = createShuffler(fiftyVoices);
const nextMilestoneVoice = createShuffler(milestoneVoices);


// Clicker event
balanPicture.addEventListener('click', () => {
  clicks++;
  localStorage.setItem('balanClicks', clicks);
  clickCountEl.textContent = clicks;

  // Briefly switch sprite for click feedback
  setBalanSprite(clickSprite);

  // Determine audio
  let voice = null;
	if (milestones.some(m => clicks === m.count)) voice = nextMilestoneVoice();
	else if (clicks % 50 === 0) voice = nextFiftyVoice();
	else voice = nextRandomVoice();
	playVoice(voice);

  setTimeout(checkMilestone, 200);
});

// Reset clicks -> convert to Happy Coins
resetBtn.addEventListener('click', () => {
  happyCoins += clicks;
  clicks = 0;
  localStorage.setItem('balanClicks', 0);
  updateHappyCoins();
  clickCountEl.textContent = clicks;
  setBalanSprite(defaultSprite);
});

// =======================
// Shop System
// =======================
// Define possible IDs per slot
const shopSlots = [
  { ids: ['item1A', 'item1B'] },
  { ids: ['item2A', 'item2B'] },
  { ids: ['item3A', 'item3B'] },
  { ids: ['item4A', 'item4B'] }
];

const shopItems = [
  { id: 'item1A', price: 1, lockedSrc: 'sprites/shop/webp-shop-sprites/cardboard-box.webp', unlockedSrc: 'sprites/shop/webp-shop-sprites/cardboard-box-unlocked.webp', fullSrc: 'sprites/shop/sellables/the-silk-road-demon.png' }, 
  { id: 'item2A', price: 1, lockedSrc: 'sprites/shop/webp-shop-sprites/cardboard-box.webp', unlockedSrc: 'sprites/shop/webp-shop-sprites/cardboard-box-unlocked.webp', fullSrc: 'sprites/shop/sellables/the-silk-road-demon.png' },
  { id: 'item3A', price: 1, lockedSrc: 'sprites/shop/webp-shop-sprites/cardboard-box.webp', unlockedSrc: 'sprites/shop/webp-shop-sprites/cardboard-box-unlocked.webp', fullSrc: 'sprites/shop/sellables/the-silk-road-demon.png' },
  { id: 'item4A', price: 1, lockedSrc: 'sprites/shop/webp-shop-sprites/cardboard-box.webp', unlockedSrc: 'sprites/shop/webp-shop-sprites/cardboard-box-unlocked.webp', fullSrc: 'sprites/shop/sellables/the-silk-road-demon.png' }
];

// Clean up previous week's owned item IDs
shopSlots.forEach((slot, idx) => {
  const currentID = shopItems[idx].id;
  const otherID = slot.ids.find(id => id !== currentID);
  localStorage.removeItem(otherID);
});

const shopLeftContainer = document.getElementById('shop-left-container');
const shopRightContainer = document.getElementById('shop-right-container');

function renderShop(items, container) {
  container.innerHTML = '';
  items.forEach(item => {
    const owned = localStorage.getItem(item.id) === 'owned';
    // Use image with data-fullsrc for modal, not <a download>
    const imgHTML = owned
      ? `<img id="${item.id}-img" class="shop-unlocked-img" src="${item.unlockedSrc}" data-fullsrc="${item.fullSrc}" alt="Unlocked">`
      : `<img id="${item.id}-img" src="${item.lockedSrc}" alt="Locked">`;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('shop-item');
    itemDiv.dataset.id = item.id;
    itemDiv.innerHTML = `
      <div class="shop-image">
        ${imgHTML}
      </div>
      <button class="buy-btn" ${owned ? 'disabled' : ''}>${owned ? 'Owned ✅' : `Buy for ${item.price} `}</button>
    `;
    container.appendChild(itemDiv);

    // Buy button
    itemDiv.querySelector('.buy-btn').addEventListener('click', () => {
      if (owned) return;
      if (happyCoins >= item.price) {
        happyCoins -= item.price;
        happyCoinsEl.textContent = happyCoins;

        // Replace locked image with unlocked image for modal
        const imgEl = document.getElementById(item.id + '-img');
        imgEl.outerHTML = `<img id="${item.id}-img" class="shop-unlocked-img" src="${item.unlockedSrc}" data-fullsrc="${item.fullSrc}" alt="Unlocked">`;

        const btn = itemDiv.querySelector('.buy-btn');
        btn.disabled = true;
        btn.textContent = 'Owned ✅';

        localStorage.setItem(item.id, 'owned');
      } else {
        alert('Not enough Happy Coins!');
      }
    });
  });
}

// Render shop items
renderShop(shopItems.slice(0,2), shopLeftContainer);
renderShop(shopItems.slice(2,4), shopRightContainer);

// =======================
// Modal Logic for Shop Full Image
// =======================
// In script.js
const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalDownloadBtn = document.getElementById('modal-download-btn');

// Show modal on image click
document.body.addEventListener('click', function(e) {
  if (e.target.classList.contains('shop-unlocked-img')) {
    const fullSrc = e.target.getAttribute('data-fullsrc');
    modalImg.src = fullSrc;
    modalDownloadBtn.setAttribute('data-download', fullSrc);
    imageModal.hidden = false;
    e.preventDefault();
  }
});

// Direct download logic for modal button (this is your fix!)
modalDownloadBtn.addEventListener('click', function() {
  const url = modalDownloadBtn.getAttribute('data-download');
  const link = document.createElement('a');
  link.href = url;
  link.download = ''; // Optionally set a filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Close modal logic
imageModal.addEventListener('click', function(e) {
  if (e.target === imageModal) {
    imageModal.hidden = true;
    modalImg.src = '';
  }
});
window.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    imageModal.hidden = true;
    modalImg.src = '';
  }
});