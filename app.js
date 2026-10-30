/* ══════════════════════════════════════════
   Happy Birthday Mariya Fatima — app logic
   Plain JS, no dependencies.
═══════════════════════════════════════════ */

/* ───────────────────────────────────────────
   CONFIG — easy spots to personalise later
─────────────────────────────────────────── */

// Sweet-moments photos. Drop image files into an "images" folder and
// list them here. Leave as [] to show pretty placeholders for now.
// Example:
//   { src: 'images/moment1.jpg', caption: 'Our first trip 💕' },
const MOMENTS = [
    { src: 'images/moment1.jpeg',  caption: 'My beautiful bride 👰‍♀️✨' },
    { src: 'images/moment2.jpeg',  caption: 'The day you became mine 💍' },
    { src: 'images/moment3.jpeg',  caption: 'Our special day 💖' },
    { src: 'images/moment4.jpeg',  caption: 'Date nights with you 🍽️💕' },
    { src: 'images/moment5.jpeg',  caption: 'Sweet moments in Ooty 🍦' },
    { src: 'images/moment6.jpeg',  caption: 'Chasing waterfalls with you 💦' },
    { src: 'images/moment7.jpeg',  caption: 'Just us & the hills 🏞️' },
    { src: 'images/moment8.jpeg',  caption: 'By the lake, side by side 💚' },
    { src: 'images/moment9.jpeg',  caption: 'Blessed, together 🕋' },
    { src: 'images/moment10.jpeg', caption: 'Home is wherever you are 🏡' },
];

// The heartfelt letter (screen 6). Replace when you send me the text.
const LETTER_MESSAGE =
`1400 years ago, Imam Ali said to Fatimah Al-Zahra:
"All my worries and sadness disappear when I look at your face."

I feel the exact same, Mariya Fatima. 💖

Happy birthday to the universe that keeps me alive.`;

// The hidden-gift reveal (screen 7). Replace with the real spot later.
const GIFT_LOCATION =
`Your gift is hidden in the dressing table — first drawer! 🎁`;

/* ───────────────────────────────────────────
   SCREEN TRANSITIONS
─────────────────────────────────────────── */
const overlay = document.getElementById('transition-overlay');

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}

function nextScreen(id, emoji, delay = 900) {
    overlay.textContent = emoji || '💖';
    overlay.classList.add('show');
    setTimeout(() => {
        overlay.classList.remove('show');
        showScreen(id);
    }, delay);
}

/* ───────────────────────────────────────────
   FLOATING HEARTS BACKGROUND
─────────────────────────────────────────── */
(function spawnHearts() {
    const bg = document.getElementById('hearts-bg');
    const emojis = ['💖', '💕', '💗', '🌸', '💞'];
    for (let i = 0; i < 18; i++) {
        const h = document.createElement('span');
        h.className = 'float-heart';
        h.textContent = emojis[i % emojis.length];
        h.style.left = Math.random() * 100 + '%';
        h.style.fontSize = (12 + Math.random() * 18) + 'px';
        h.style.animationDuration = (9 + Math.random() * 9) + 's';
        h.style.animationDelay = (Math.random() * 10) + 's';
        bg.appendChild(h);
    }
})();

/* ───────────────────────────────────────────
   SCREEN 1 — the playful "No" button
─────────────────────────────────────────── */
(function setupNoButton() {
    const noBtn = document.getElementById('btn-no');
    const dodge = () => {
        const x = (Math.random() - 0.5) * 180;
        const y = (Math.random() - 0.5) * 120;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    };
    noBtn.addEventListener('mouseenter', dodge);
    noBtn.addEventListener('click', e => {
        e.preventDefault();
        dodge();
    });
})();

/* ───────────────────────────────────────────
   SCREEN 2 — BALLOONS
─────────────────────────────────────────── */
(function setupBalloons() {
    const area = document.getElementById('balloon-area');
    const wordsEl = document.getElementById('balloon-words');
    const nextBtn = document.getElementById('balloons-next');
    const balloons = area.querySelectorAll('.balloon');
    const collected = [];
    let popped = 0;

    balloons.forEach(balloon => {
        balloon.addEventListener('click', () => {
            if (balloon.classList.contains('popped')) return;

            makeBurst(balloon);
            balloon.classList.add('popped');
            collected.push(balloon.dataset.word);
            wordsEl.textContent = collected.join(' ');
            popped++;

            if (popped === balloons.length) {
                setTimeout(() => {
                    wordsEl.textContent = 'You are so special 💖';
                    nextBtn.classList.remove('hidden');
                }, 500);
            }
        });
    });

    function makeBurst(balloon) {
        const rect = balloon.getBoundingClientRect();
        const areaRect = area.getBoundingClientRect();
        const cx = rect.left - areaRect.left + rect.width / 2;
        const cy = rect.top - areaRect.top + rect.height / 2;
        const colours = ['#e06a9a', '#8ec4f0', '#9ce0b0', '#c3a6f0', '#ffd36e', '#ff8fb0'];

        for (let i = 0; i < 14; i++) {
            const p = document.createElement('span');
            p.className = 'burst';
            p.style.left = cx + 'px';
            p.style.top = cy + 'px';
            p.style.background = colours[i % colours.length];
            const angle = (Math.PI * 2 * i) / 14;
            const dist = 50 + Math.random() * 40;
            p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
            p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
            area.appendChild(p);
            setTimeout(() => p.remove(), 750);
        }
    }
})();

/* ───────────────────────────────────────────
   SCREEN 3 — CANDLE
─────────────────────────────────────────── */
(function setupCandle() {
    const cake = document.getElementById('cake');
    const flame = document.getElementById('flame');
    const hint = document.getElementById('candle-hint');
    const wish = document.getElementById('candle-wish');
    const nextBtn = document.getElementById('candle-next');
    let blown = false;

    cake.addEventListener('click', () => {
        if (blown) return;
        blown = true;

        flame.classList.add('out');

        // puff of smoke
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        smoke.textContent = '💨';
        cake.appendChild(smoke);
        setTimeout(() => smoke.remove(), 1600);

        hint.classList.add('hidden');
        wish.classList.remove('hidden');
        setTimeout(() => nextBtn.classList.remove('hidden'), 700);
    });
})();

/* ───────────────────────────────────────────
   SCREEN 5 — SWEET MOMENTS (swipeable cards)
─────────────────────────────────────────── */
(function setupMoments() {
    const deck = document.getElementById('moments-deck');

    // Build the cards (photos if provided, else placeholders)
    const cards = MOMENTS.length ? MOMENTS : [
        { placeholder: true, caption: 'Our favourite memory 💕' },
        { placeholder: true, caption: 'That day we laughed so much 😄' },
        { placeholder: true, caption: 'Just us 🥰' },
    ];

    cards.forEach((card, i) => {
        const el = document.createElement('div');
        el.className = 'moment-card';
        el.style.zIndex = cards.length - i;
        el.style.transform = `translateY(${i * 4}px) scale(${1 - i * 0.03})`;

        if (card.placeholder) {
            el.innerHTML =
                `<div class="moment-placeholder">
                    <span class="ph-emoji">📸</span>
                    <span>Photo coming soon</span>
                 </div>
                 <div class="caption">${card.caption}</div>`;
        } else {
            el.innerHTML =
                `<img src="${card.src}" alt="${card.caption}"
                      onerror="this.parentNode.querySelector('.img-fallback').style.display='flex'; this.style.display='none';">
                 <div class="moment-placeholder img-fallback" style="display:none;">
                     <span class="ph-emoji">💖</span>
                     <span>${card.caption}</span>
                 </div>
                 <div class="caption">${card.caption}</div>`;
        }
        deck.appendChild(el);
    });

    enableSwipe(deck);
})();

// Reusable drag/swipe-to-dismiss for the top card; dismissed cards
// go to the back so the deck loops forever.
function enableSwipe(deck) {
    let startX = 0, dragging = false, card = null;

    function getTop() {
        // highest z-index visible card
        let best = null, bestZ = -1;
        deck.querySelectorAll('.moment-card').forEach(c => {
            const z = +c.style.zIndex || 0;
            if (z > bestZ) { bestZ = z; best = c; }
        });
        return best;
    }

    function onDown(e) {
        card = getTop();
        if (!card) return;
        dragging = true;
        startX = (e.touches ? e.touches[0].clientX : e.clientX);
        card.style.transition = 'none';
        card.style.cursor = 'grabbing';
    }
    function onMove(e) {
        if (!dragging || !card) return;
        const x = (e.touches ? e.touches[0].clientX : e.clientX);
        const dx = x - startX;
        card.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`;
    }
    function onUp(e) {
        if (!dragging || !card) return;
        dragging = false;
        card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        const x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
        const dx = x - startX;

        if (Math.abs(dx) > 90) {
            // fling off then send to back of deck
            const dir = dx > 0 ? 1 : -1;
            card.style.transform = `translateX(${dir * 500}px) rotate(${dir * 30}deg)`;
            card.style.opacity = '0';
            const sent = card;
            setTimeout(() => {
                // move to back: lowest z-index
                let minZ = Infinity;
                deck.querySelectorAll('.moment-card').forEach(c => { minZ = Math.min(minZ, +c.style.zIndex || 0); });
                sent.style.zIndex = minZ - 1;
                sent.style.transition = 'none';
                sent.style.opacity = '1';
                sent.style.transform = 'translateY(0) scale(0.94)';
                restack();
            }, 400);
        } else {
            restack();
        }
        card = null;
    }

    function restack() {
        // order cards by z-index desc, apply gentle offset
        const cards = [...deck.querySelectorAll('.moment-card')]
            .sort((a, b) => (+b.style.zIndex || 0) - (+a.style.zIndex || 0));
        cards.forEach((c, i) => {
            c.style.transition = 'transform 0.35s ease';
            c.style.transform = `translateY(${i * 4}px) scale(${1 - i * 0.03})`;
        });
    }

    deck.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    deck.addEventListener('touchstart', onDown, { passive: true });
    deck.addEventListener('touchmove', onMove, { passive: true });
    deck.addEventListener('touchend', onUp);
}

/* ───────────────────────────────────────────
   SCREEN 6 — ENVELOPE / MESSAGE
─────────────────────────────────────────── */
(function setupEnvelope() {
    const env = document.getElementById('envelope');
    const hint = document.getElementById('envelope-hint');
    const letter = document.getElementById('letter');
    const body = document.getElementById('letter-body');
    const nextBtn = document.getElementById('envelope-next');
    let opened = false;

    body.textContent = LETTER_MESSAGE;

    env.addEventListener('click', () => {
        if (opened) return;
        opened = true;
        env.classList.add('open');
        hint.classList.add('hidden');
        setTimeout(() => {
            letter.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        }, 650);
    });
})();

/* ───────────────────────────────────────────
   SCREEN 7 — GIFT REVEAL
─────────────────────────────────────────── */
function revealGift() {
    const box = document.getElementById('gift-box');
    const reveal = document.getElementById('gift-reveal');
    const loc = document.getElementById('gift-location');
    if (box.classList.contains('opening')) return;

    loc.textContent = GIFT_LOCATION;
    box.classList.add('opening');

    // confetti burst
    confetti();

    setTimeout(() => {
        box.classList.add('hidden');
        reveal.classList.remove('hidden');
    }, 500);
}

function confetti() {
    const emojis = ['🎉', '🎊', '💖', '✨', '🌸', '🎈'];
    for (let i = 0; i < 40; i++) {
        const c = document.createElement('span');
        c.textContent = emojis[i % emojis.length];
        c.style.position = 'fixed';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top = '-30px';
        c.style.fontSize = (14 + Math.random() * 16) + 'px';
        c.style.zIndex = 200;
        c.style.pointerEvents = 'none';
        c.style.transition = 'transform 2.4s ease-in, opacity 2.4s ease-in';
        document.body.appendChild(c);
        requestAnimationFrame(() => {
            c.style.transform = `translateY(110vh) rotate(${Math.random() * 720}deg)`;
            c.style.opacity = '0';
        });
        setTimeout(() => c.remove(), 2500);
    }
}
