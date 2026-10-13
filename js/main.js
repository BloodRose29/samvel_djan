/* =========================================================
   Սամվել · Ծննդյան կայք / Сайт-поздравление
   ========================================================= */
(function () {
  'use strict';

  const BIRTH_YEAR  = 2006;
  const BIRTH_MONTH = 9;   // October (zero-indexed)
  const BIRTH_DAY   = 14;

  const I18N = {
    hy: {
      pageTitle: "Սամվել · Ծնունդդ շնորհավոր",
      htmlLang: "hy",
      eyebrow: "14 հոկտեմբերի 2006",
      ageLabel: "տարեկան",
      countdownLoading: "Հաշվում ենք…",
      countdownPrefix: "Մինչև տարեդարձը՝",
      unitDay: "օր",
      unitHour: "ժ",
      unitMinute: "ր",
      unitSecond: "վ",
      todayPrefix: "🎉 Այսօր քո տարեդարձն է։ ",
      todaySuffix: " տարեկան ես։",
      celebrate: "🎉 Շնորհավորում եմ",
      celebrated: "🎊 Շնորհավորո՛ւմ եմ։",
      greetingTitle: "Շնորհավորական խոսք",
      greetingText:
        "Սամվել, ծնունդդ շնորհավոր լինի, ցանկանում գործերում հաջողություն, " +
        "առողջություն, երջանկություն, երազանքներդ քո բոլոր թող կատարվեն, " +
        "նպատակներդ դու բոլոր թող հասնես, աշխարհի ամենա լավն և բարին։",
      greetingOrigSummary: "Բնագրությունը (լատինատառ)",
      cakeTitle: "Տորթ",
      cakeHint: "Սեղմիր մոմերի վրա, որ փչես։",
      cakeMsg: "🎂 Մաղթանքդ կատարվի՛։",
      nivaTitle: "Լադա Նիվա 4×4",
      nivaHint: "Ծննդյան բոնուս։ Սեղմիր կոճակը ու լսիր ձայնը։",
      honk: "📣 Բի՛փ",
      honkActive: "📣 Բի՛փ։։։",
      lights: "💡 Լույսերը",
      dayMode: "💡 Ցերեկը",
      badge: "4×4 · 1.7 · ամենագնաց",
      badgeNight: "4×4 · գիշերային ռեժիմ",
      wishesTitle: "Եվս մի քանի մաղթանք",
      wish1: "Առողջությունը թող միշտ քեզ հետ լինի։",
      wish2: "Ամեն գործ թող հաջողվի։",
      wish3: "Երազանքներդ թող իրականանան։",
      wish4: "Շատ ճամփորդիր և շատ ծիծաղիր։",
      footer: "Սիրով՝ ընկերոջդ կողմից · 14.10.2006 → 14.10.2026"
    },

    ru: {
      pageTitle: "Самвел · С днём рождения",
      htmlLang: "ru",
      eyebrow: "14 октября 2006",
      ageLabel: "лет",
      countdownLoading: "Считаем…",
      countdownPrefix: "До дня рождения осталось:",
      unitDay: "дн.",
      unitHour: "ч",
      unitMinute: "мин",
      unitSecond: "сек",
      todayPrefix: "🎉 Сегодня твой день рождения! Тебе ",
      todaySuffix: ".",
      celebrate: "🎉 Поздравляю",
      celebrated: "🎊 Поздравляю!",
      greetingTitle: "Поздравление",
      greetingText:
        "Самвел, с днём рождения! Желаю успехов в делах, здоровья, счастья, " +
        "пусть все твои мечты сбудутся, пусть ты достигнешь всех своих целей, " +
        "самого лучшего и доброго в мире!",
      greetingOrigSummary: "Оригинал (латиницей)",
      cakeTitle: "Торт",
      cakeHint: "Нажми на свечи, чтобы задуть их.",
      cakeMsg: "🎂 Пусть желание сбудется!",
      nivaTitle: "Лада Нива 4×4",
      nivaHint: "Бонус ко дню рождения. Нажми на кнопку и послушай звук.",
      honk: "📣 Бип",
      honkActive: "📣 Бип!!!",
      lights: "💡 Фары",
      dayMode: "💡 День",
      badge: "4×4 · 1.7 · внедорожник",
      badgeNight: "4×4 · ночной режим",
      wishesTitle: "Ещё несколько пожеланий",
      wish1: "Здоровье пусть всегда будет с тобой.",
      wish2: "Пусть любое дело удаётся.",
      wish3: "Пусть мечты сбываются.",
      wish4: "Путешествуй много и смейся часто.",
      footer: "С любовью от друга · 14.10.2006 → 14.10.2026"
    }
  };

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentLang = 'hy';

  function detectInitialLang() {
    let saved = null;
    try { saved = localStorage.getItem('samvel_lang'); } catch (e) {}
    if (saved === 'hy' || saved === 'ru') return saved;

    const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.indexOf('hy') === 0) return 'hy';
    if (nav.indexOf('ru') === 0) return 'ru';
    return 'hy';
  }

  function t(key) {
    const pack = I18N[currentLang] || I18N.hy;
    return pack[key] != null ? pack[key] : (I18N.hy[key] || '');
  }

  function applyStaticI18n() {
    $$('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val !== '') el.textContent = val;
    });

    document.title = t('pageTitle');
    document.documentElement.lang = t('htmlLang');

    $$('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === currentLang);
    });
  }

  function setLang(lang) {
    if (lang !== 'hy' && lang !== 'ru') lang = 'hy';
    currentLang = lang;
    try { localStorage.setItem('samvel_lang', lang); } catch (e) {}

    applyStaticI18n();
    renderCountdown();

    if (celebrateBtn) celebrateBtn.textContent = t('celebrate');
    if (honkBtn) honkBtn.textContent = t('honk');

    if (lightBtn && nivaStage) {
      lightBtn.textContent = nivaStage.classList.contains('is-night') ? t('dayMode') : t('lights');
    }
    if (nivaBadge && nivaStage) {
      nivaBadge.textContent = nivaStage.classList.contains('is-night') ? t('badgeNight') : t('badge');
    }
  }

  const ageNumEl    = $('#ageNum');
  const countdownEl = $('#countdown');

  function startOfBirthday(year) {
    return new Date(year, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0, 0);
  }

  function isBirthdayToday(now) {
    return now.getMonth() === BIRTH_MONTH && now.getDate() === BIRTH_DAY;
  }

  function renderCountdown() {
    const now = new Date();
    const ageTurning = now.getFullYear() - BIRTH_YEAR;
    if (ageNumEl) ageNumEl.textContent = String(ageTurning);

    if (!countdownEl) return;

    if (isBirthdayToday(now)) {
      countdownEl.classList.add('is-today');
      countdownEl.textContent = t('todayPrefix') + ageTurning + t('todaySuffix');
      return;
    }

    countdownEl.classList.remove('is-today');

    let target = startOfBirthday(now.getFullYear());
    if (target.getTime() <= now.getTime()) {
      target = startOfBirthday(now.getFullYear() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const totalMinutes = Math.floor(diff / 60000);
    const days    = Math.floor(totalMinutes / 1440);
    const hours   = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    const seconds = Math.floor((diff % 60000) / 1000);

    countdownEl.innerHTML =
      '<span class="countdown__label">' + t('countdownPrefix') + '</span>' +
      '<span class="countdown__part"><b>' + days    + '</b> ' + t('unitDay')    + '</span>' +
      '<span class="countdown__part"><b>' + hours   + '</b> ' + t('unitHour')   + '</span>' +
      '<span class="countdown__part"><b>' + minutes + '</b> ' + t('unitMinute') + '</span>' +
      '<span class="countdown__part"><b>' + seconds + '</b> ' + t('unitSecond') + '</span>';
  }

  const canvas = $('#confetti');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;

  const COLORS = ['#d90012', '#0033a0', '#f2a800', '#ffffff', '#14161a'];
  let particles = [];
  let dpr = 1;
  let rafId = null;

  function resizeCanvas() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = Math.floor(window.innerWidth  * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width  = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  function spawnBurst(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 8;
      particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        w: 5 + Math.random() * 7,
        h: 8 + Math.random() * 10,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 1,
        decay: 0.006 + Math.random() * 0.008
      });
    }
    startLoop();
  }

  function spawnRain(count) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 2,
        vy: 2 + Math.random() * 3,
        w: 5 + Math.random() * 7,
        h: 8 + Math.random() * 10,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.25,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 1,
        decay: 0.003 + Math.random() * 0.004
      });
    }
    startLoop();
  }

  function drawParticles() {
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.vy += 0.16;
      p.vx *= 0.995;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > window.innerHeight + 80) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (particles.length > 0) {
      rafId = window.requestAnimationFrame(drawParticles);
    } else {
      rafId = null;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  function startLoop() {
    if (rafId === null) rafId = window.requestAnimationFrame(drawParticles);
  }

  if (ctx && !reduceMotion) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  function makeBalloons() {
    const holder = $('#balloons');
    if (!holder || reduceMotion) return;

    const colors = ['#d90012', '#0033a0', '#f2a800', '#e05a6d', '#5b7bd5'];

    for (let i = 0; i < 9; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = (4 + Math.random() * 92) + '%';
      b.style.background = colors[i % colors.length];
      b.style.animationDuration = (16 + Math.random() * 14) + 's';
      b.style.animationDelay = (-Math.random() * 20) + 's';
      b.style.transform = 'scale(' + (0.65 + Math.random() * 0.6) + ')';
      holder.appendChild(b);
    }
  }

  makeBalloons();

  const celebrateBtn = $('#celebrateBtn');
  let celebrateTimer = null;

  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', function () {
      const rect = celebrateBtn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      if (!reduceMotion) {
        spawnBurst(cx, cy, 140);
        window.setTimeout(function () { spawnRain(60); }, 220);
      }

      celebrateBtn.textContent = t('celebrated');
      window.clearTimeout(celebrateTimer);
      celebrateTimer = window.setTimeout(function () {
        celebrateBtn.textContent = t('celebrate');
      }, 2400);
    });
  }

  const candles = $$('.candle');
  const cakeMsg = $('#cakeMsg');

  function allCandlesOut() {
    return candles.length > 0 && candles.every(function (c) {
      return c.classList.contains('is-out');
    });
  }

  candles.forEach(function (candle) {
    candle.addEventListener('click', function () {
      const goingOut = !candle.classList.contains('is-out');
      candle.classList.toggle('is-out', goingOut);

      if (goingOut && cakeMsg) cakeMsg.hidden = false;

      if (allCandlesOut() && !reduceMotion) {
        const rect = candle.getBoundingClientRect();
        spawnBurst(rect.left + rect.width / 2, rect.top, 80);
      }
    });
  });

  const nivaStage = document.querySelector('.niva-section .niva-stage');
  const honkBtn   = $('#honkBtn');
  const lightBtn  = $('#lightBtn');
  const nivaBadge = $('#nivaBadge');
  const roadCar   = $('#roadCar');

  function honk() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    let ctxA;
    try { ctxA = new AudioCtx(); } catch (err) { return; }

    const now = ctxA.currentTime;
    const tones = [370, 466];

    tones.forEach(function (freq) {
      const osc = ctxA.createOscillator();
      const gain = ctxA.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.02);
      gain.gain.setValueAtTime(0.09, now + 0.30);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.42);

      osc.connect(gain);
      gain.connect(ctxA.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });

    window.setTimeout(function () {
      if (ctxA.close) ctxA.close();
    }, 800);
  }

  let honkTimer = null;

  if (honkBtn) {
    honkBtn.addEventListener('click', function () {
      honk();

      if (nivaStage) {
        nivaStage.classList.add('is-driving');
        window.setTimeout(function () {
          nivaStage.classList.remove('is-driving');
        }, 1600);
      }

      honkBtn.textContent = t('honkActive');
      window.clearTimeout(honkTimer);
      honkTimer = window.setTimeout(function () {
        honkBtn.textContent = t('honk');
      }, 900);
    });
  }

  if (lightBtn && nivaStage) {
    lightBtn.addEventListener('click', function () {
      const night = nivaStage.classList.toggle('is-night');
      lightBtn.textContent = night ? t('dayMode') : t('lights');
      if (nivaBadge) {
        nivaBadge.textContent = night ? t('badgeNight') : t('badge');
      }
    });
  }

  if ('IntersectionObserver' in window && nivaStage) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        nivaStage.classList.toggle('is-driving', entry.isIntersecting);
      });
    }, { threshold: 0.35 });

    io.observe(nivaStage);
  } else if (nivaStage) {
    nivaStage.classList.add('is-driving');
  }

  if (roadCar && !reduceMotion) {
    roadCar.style.cursor = 'pointer';
    roadCar.style.pointerEvents = 'auto';
    roadCar.addEventListener('click', function () {
      const rect = roadCar.getBoundingClientRect();
      spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);
      honk();
    });
  }

  $$('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang'));
    });
  });

  setLang(detectInitialLang());
  window.setInterval(renderCountdown, 1000);

  window.addEventListener('load', function () {
    if (reduceMotion) return;
    window.setTimeout(function () { spawnRain(45); }, 500);
  });

})();