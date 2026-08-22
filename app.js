/* IRIS — ساخته شده توسط مبین.آ */
(() => {
  const $ = (id) => document.getElementById(id);
  const SRC = "https://iptv-org.github.io/iptv/index.m3u";
  const PAGE = 80;
  const COUNTRIES = [
    { cc: "", fa: "جهان", en: "World" },
    { cc: "IR", fa: "ایران", en: "Iran" },
    { cc: "DE", fa: "آلمان", en: "Germany" },
    { cc: "US", fa: "آمریکا", en: "USA" },
    { cc: "GB", fa: "بریتانیا", en: "UK" },
    { cc: "FR", fa: "فرانسه", en: "France" },
    { cc: "TR", fa: "ترکیه", en: "Turkey" },
    { cc: "ES", fa: "اسپانیا", en: "Spain" },
    { cc: "IT", fa: "ایتالیا", en: "Italy" },
    { cc: "NL", fa: "هلند", en: "Netherlands" },
    { cc: "BE", fa: "بلژیک", en: "Belgium" },
    { cc: "AT", fa: "اتریش", en: "Austria" },
    { cc: "CH", fa: "سوئیس", en: "Switzerland" },
    { cc: "SE", fa: "سوئد", en: "Sweden" },
    { cc: "NO", fa: "نروژ", en: "Norway" },
    { cc: "PL", fa: "لهستان", en: "Poland" },
    { cc: "PT", fa: "پرتغال", en: "Portugal" },
    { cc: "GR", fa: "یونان", en: "Greece" },
    { cc: "JP", fa: "ژاپن", en: "Japan" },
    { cc: "KR", fa: "کره", en: "Korea" },
    { cc: "CN", fa: "چین", en: "China" },
    { cc: "IN", fa: "هند", en: "India" },
    { cc: "PK", fa: "پاکستان", en: "Pakistan" },
    { cc: "AF", fa: "افغانستان", en: "Afghanistan" },
    { cc: "IQ", fa: "عراق", en: "Iraq" },
    { cc: "AE", fa: "امارات", en: "UAE" },
    { cc: "SA", fa: "عربستان", en: "Saudi" },
    { cc: "QA", fa: "قطر", en: "Qatar" },
    { cc: "EG", fa: "مصر", en: "Egypt" },
    { cc: "BR", fa: "برزیل", en: "Brazil" },
    { cc: "AR", fa: "آرژانتین", en: "Argentina" },
    { cc: "MX", fa: "مکزیک", en: "Mexico" },
    { cc: "CA", fa: "کانادا", en: "Canada" },
    { cc: "AU", fa: "استرالیا", en: "Australia" },
    { cc: "RU", fa: "روسیه", en: "Russia" },
    { cc: "ID", fa: "اندونزی", en: "Indonesia" },
  ];
  const CATS = [
    "news", "sports", "music", "movies", "documentary", "kids",
    "entertainment", "general", "culture", "science", "weather", "series", "travel", "business",
  ];
  const THEMES = ["dark", "oled", "cinema", "light"];
  const ADULT = /xxx|nsfw|adult|erotic|18\+|porn/i;

  const state = {
    lang: localStorage.getItem("iris-lang") || "en",
    theme: localStorage.getItem("iris-theme") || "dark",
    vol: clampVol(localStorage.getItem("iris-vol")),
    muted: localStorage.getItem("iris-mute") === "1",
    all: [],
    view: [],
    shown: 0,
    q: "",
    cc: "",
    cat: "",
    mode: "browse",
    favs: safeParse("iris-favs", []),
    recents: safeParse("iris-recents", []),
    current: null,
    playing: false,
    status: "",
    playGen: 0,
    fails: 0,
    hls: null,
    connectTimer: 0,
    chromeTimer: 0,
    chromeOn: true,
    deferredInstall: null,
  };

  function clampVol(v) {
    const n = Number(v);
    if (!isFinite(n)) return 1;
    return Math.min(1, Math.max(0, n));
  }
  function safeParse(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }
  function dict() {
    const pack = window.I18N || {};
    return pack[state.lang] || pack.en || {};
  }
  function t(key) {
    const v = dict()[key];
    return typeof v === "function" ? v : v || key;
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function flag(cc) {
    if (!cc || cc.length !== 2) return "";
    return [...cc.toUpperCase()].map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join("");
  }
  function initials(name) {
    const p = String(name || "IR").trim().split(/\s+/);
    return ((p[0] ? p[0][0] : "I") + (p[1] ? p[1][0] : "")).toUpperCase();
  }

  function applyI18n() {
    const d = dict();
    document.documentElement.lang = d.htmlLang || "en";
    document.documentElement.dir = d.dir || "ltr";
    document.title = d.title || "IRIS";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (typeof d[el.dataset.i18n] === "string") el.textContent = d[el.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = d[el.dataset.i18nPlaceholder] || "";
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const label = d[el.dataset.i18nAria];
      if (typeof label === "string") el.setAttribute("aria-label", label);
    });
    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.classList.toggle("on", b.dataset.lang === state.lang);
    });
    renderCountries();
    renderCats();
    renderThemes();
    renderWall();
    renderDock();
  }
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    try { localStorage.setItem("iris-theme", state.theme); } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", state.theme === "light" ? "#f4f4f5" : "#07070b");
    renderThemes();
  }
  function applyAudio() {
    const video = $("vid");
    video.volume = state.vol;
    video.muted = state.muted || state.vol === 0;
    const slider = $("d-vol");
    if (slider) slider.value = String(state.vol);
    document.querySelectorAll("[data-act='mute']").forEach((b) => {
      b.classList.toggle("muted", video.muted);
      b.setAttribute("aria-label", video.muted ? t("unmute") : t("mute"));
    });
    try {
      localStorage.setItem("iris-vol", String(state.vol));
      localStorage.setItem("iris-mute", video.muted ? "1" : "0");
    } catch (_) {}
  }

  function parseM3U(text) {
    const out = [];
    const lines = text.split(/\r?\n/);
    let meta = null;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("#EXTINF")) {
        const name = line.split(",").slice(1).join(",").trim();
        const id = (line.match(/tvg-id="([^"]*)"/) || [])[1] || "";
        const logo = (line.match(/tvg-logo="([^"]*)"/) || [])[1] || "";
        const groups = ((line.match(/group-title="([^"]*)"/) || [])[1] || "")
          .split(";")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);
        const cc = ((id.match(/\.([a-z]{2})(?:@|$)/i) || [])[1] || "").toUpperCase();
        meta = { name, id, logo, groups, cc };
      } else if (meta && line && !line.startsWith("#")) {
        if (
          line.startsWith("https://") &&
          !ADULT.test(meta.name) &&
          !meta.groups.some((g) => ADULT.test(g))
        ) {
          out.push({
            id: meta.id || line,
            name: meta.name || "Channel",
            logo: meta.logo,
            groups: meta.groups,
            cc: meta.cc,
            url: line,
          });
        }
        meta = null;
      }
    }
    const seen = new Set();
    return out.filter((c) => {
      const k = c.id || c.url;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  function filtered() {
    if (state.mode === "fav") return state.favs.slice();
    if (state.mode === "recent") return state.recents.slice();
    const q = state.q.trim().toLowerCase();
    return state.all.filter((c) => {
      if (state.cc && c.cc !== state.cc) return false;
      if (state.cat && c.groups.indexOf(state.cat) < 0) return false;
      if (q && (c.name + " " + c.cc + " " + c.groups.join(" ")).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }
  function applyFilter() {
    state.view = filtered();
    state.shown = 0;
    renderWall();
    const w = $("wall");
    if (w) w.scrollTop = 0;
    const more = $("clear-btn");
    if (more) more.hidden = !(state.cc || state.cat || state.q.trim() || state.mode !== "browse");
    $("filters-btn").classList.toggle("hot", !!(state.cc || state.cat || state.mode !== "browse"));
    $("fav-btn").classList.toggle("on", state.mode === "fav");
    $("rec-btn").classList.toggle("on", state.mode === "recent");
  }

  function uniqueCountries() {
    const seen = new Set();
    return COUNTRIES.filter((c) => {
      const k = c.cc || "WORLD";
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }
  function renderCountries() {
    $("countries").innerHTML = uniqueCountries().map((c) => {
      const on = state.mode === "browse" && c.cc === state.cc ? "on" : "";
      const label = (c.cc ? flag(c.cc) + " " : "") + (state.lang === "fa" ? c.fa : c.en);
      return `<button type="button" class="${on}" data-cc="${c.cc}">${label}</button>`;
    }).join("");
  }
  function renderCats() {
    $("cats").innerHTML =
      `<button type="button" class="${!state.cat ? "on" : ""}" data-cat="">${t("world")}</button>` +
      CATS.map((id) => {
        const on = state.cat === id ? "on" : "";
        return `<button type="button" class="${on}" data-cat="${id}">${t(id)}</button>`;
      }).join("");
  }
  function renderThemes() {
    const box = $("themes");
    if (!box) return;
    box.innerHTML = THEMES.map((id) => {
      return `<button type="button" class="${state.theme === id ? "on" : ""}" data-theme="${id}">${t(id)}</button>`;
    }).join("");
  }
  function card(c) {
    const on = state.current && state.current.id === c.id ? "on" : "";
    const logo = c.logo
      ? `<img class="logo" src="${esc(c.logo)}" alt="" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false;"><div class="ph" hidden>${esc(initials(c.name))}</div>`
      : `<div class="ph">${esc(initials(c.name))}</div>`;
    const cat = c.groups[0] ? t(c.groups[0]) : "";
    return `<button type="button" class="card ${on}" data-play="${esc(c.id)}">
      ${logo}
      <div class="nm">${esc(c.name)}</div>
      <div class="meta">${c.cc ? flag(c.cc) + " " : ""}${esc(c.cc)} ${cat ? "· " + esc(cat) : ""}</div>
    </button>`;
  }
  function renderWall() {
    const box = $("wall");
    const cfn = dict().count;
    $("count-line").textContent = typeof cfn === "function" ? cfn(state.view.length) : String(state.view.length);
    if (!state.view.length) {
      box.innerHTML = `<div class="card empty">${t("empty")}</div>`;
      return;
    }
    const keep = box.scrollTop;
    state.shown = Math.max(state.shown, PAGE);
    const slice = state.view.slice(0, state.shown);
    box.innerHTML = slice.map(card).join("") + '<div id="tail" class="tail"></div>';
    box.scrollTop = keep;
    watchTail();
  }
  function more() {
    if (state.shown >= state.view.length) return;
    state.shown += PAGE;
    renderWall();
  }
  let tailObs = null;
  function watchTail() {
    const tail = $("tail");
    const root = $("wall");
    if (!tail || !root || typeof IntersectionObserver === "undefined") return;
    if (!tailObs) {
      tailObs = new IntersectionObserver(
        (ents) => {
          if (ents.some((e) => e.isIntersecting)) more();
        },
        { root, rootMargin: "400px" }
      );
    }
    tailObs.disconnect();
    tailObs.observe(tail);
  }

  function findCh(id) {
    return (
      state.view.find((c) => c.id === id) ||
      state.all.find((c) => c.id === id) ||
      state.favs.find((c) => c.id === id) ||
      state.recents.find((c) => c.id === id) ||
      null
    );
  }
  function isFav(id) {
    return state.favs.some((c) => c.id === id);
  }
  function toggleFav() {
    const c = state.current;
    if (!c) return;
    if (isFav(c.id)) state.favs = state.favs.filter((x) => x.id !== c.id);
    else state.favs = [c, ...state.favs].slice(0, 200);
    try { localStorage.setItem("iris-favs", JSON.stringify(state.favs)); } catch (_) {}
    if (state.mode === "fav") applyFilter();
    renderDock();
  }

  function stopHls() {
    if (state.hls) {
      try { state.hls.destroy(); } catch (_) {}
      state.hls = null;
    }
    if (state.connectTimer) {
      clearTimeout(state.connectTimer);
      state.connectTimer = 0;
    }
  }
  function armConnect(gen) {
    if (state.connectTimer) clearTimeout(state.connectTimer);
    state.connectTimer = setTimeout(() => {
      if (gen !== state.playGen || state.playing) return;
      failSkip();
    }, 14000);
  }
  function play(ch) {
    if (!ch) return;
    const video = $("vid");
    state.playGen += 1;
    const gen = state.playGen;
    state.current = ch;
    state.playing = false;
    state.status = t("connecting");
    state.recents = [ch, ...state.recents.filter((x) => x.id !== ch.id)].slice(0, 40);
    try { localStorage.setItem("iris-recents", JSON.stringify(state.recents)); } catch (_) {}
    stopHls();
    video.pause();
    try { video.removeAttribute("src"); video.load(); } catch (_) {}
    applyAudio();
    renderDock();
    markCurrent();
    showChrome();
    const url = ch.url;
    const onReady = () => {
      if (gen !== state.playGen) return;
      video.play().then(() => {
        if (gen !== state.playGen) return;
        state.playing = true;
        state.status = "";
        state.fails = 0;
        if (state.connectTimer) { clearTimeout(state.connectTimer); state.connectTimer = 0; }
        renderDock();
        hideChromeSoon();
      }).catch((err) => {
        if (err && err.name === "NotAllowedError") {
          state.playing = false;
          state.status = t("tap");
          renderDock();
          return;
        }
        failSkip();
      });
    };
    armConnect(gen);
    if (window.Hls && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        maxBufferLength: 30,
        fragLoadingTimeOut: 15000,
        manifestLoadingTimeOut: 12000,
        xhrSetup: (xhr) => { xhr.withCredentials = false; },
      });
      state.hls = hls;
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, onReady);
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (gen !== state.playGen || !data) return;
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          try { hls.startLoad(); } catch (_) { failSkip(); }
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          try { hls.recoverMediaError(); } catch (_) { failSkip(); }
        } else {
          failSkip();
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("loadedmetadata", onReady, { once: true });
    } else {
      failSkip();
    }
    openStage();
  }
  function failSkip() {
    state.fails += 1;
    state.playing = false;
    state.status = t("failed");
    renderDock();
    toast(t("failed"));
    if (state.fails < 3) setTimeout(() => playRel(1), 500);
  }
  function playRel(dir) {
    const list = state.view.length ? state.view : state.all;
    if (!list.length) return;
    if (!state.current) {
      play(list[0]);
      return;
    }
    const i = list.findIndex((c) => c.id === state.current.id);
    const n = ((i < 0 ? 0 : i) + dir + list.length) % list.length;
    play(list[n]);
  }
  function toggle() {
    const video = $("vid");
    if (!state.current) {
      if (state.view[0]) play(state.view[0]);
      return;
    }
    if (state.playing) {
      video.pause();
      state.playing = false;
      showChrome();
    } else {
      video.play().then(() => {
        state.playing = true;
        state.status = "";
        renderDock();
        hideChromeSoon();
      }).catch((err) => {
        if (err && err.name === "NotAllowedError") {
          state.status = t("tap");
          renderDock();
          return;
        }
        failSkip();
      });
    }
    renderDock();
  }
  function toggleMute() {
    if (state.muted || state.vol === 0) {
      state.muted = false;
      if (state.vol === 0) state.vol = 0.7;
    } else {
      state.muted = true;
    }
    applyAudio();
  }
  function setVol(v) {
    state.vol = clampVol(v);
    state.muted = state.vol === 0;
    applyAudio();
  }
  function pip() {
    const video = $("vid");
    if (!document.pictureInPictureEnabled || !video.src && !state.hls) {
      toast(t("pip"));
      return;
    }
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {});
    } else {
      video.requestPictureInPicture().catch(() => toast(t("pip")));
    }
  }
  function markCurrent() {
    document.querySelectorAll(".card[data-play]").forEach((el) => {
      el.classList.toggle("on", state.current && el.dataset.play === state.current.id);
    });
  }
  function renderDock() {
    const c = state.current;
    const dock = $("dock");
    const stage = $("stage");
    dock.classList.toggle("on", state.playing);
    stage.classList.toggle("on", state.playing);
    document.body.classList.toggle("playing", state.playing);
    document.querySelectorAll(".fav-btn").forEach((b) => b.classList.toggle("on", !!(c && isFav(c.id))));
    $("d-kick").textContent = state.status || t("live");
    applyAudio();
    if (!c) {
      $("d-name").textContent = "IRIS";
      $("s-name").textContent = "IRIS";
      $("d-sub").textContent = "";
      $("s-sub").textContent = "";
      return;
    }
    $("d-name").textContent = c.name;
    $("s-name").textContent = c.name;
    const sub = [flag(c.cc), c.cc, c.groups[0] ? t(c.groups[0]) : ""].filter(Boolean).join(" · ");
    $("d-sub").textContent = sub;
    $("s-sub").textContent = sub;
    const img = $("d-logo");
    const ph = $("d-ph");
    if (c.logo) {
      img.hidden = false;
      ph.hidden = true;
      if (img.getAttribute("src") !== c.logo) img.src = c.logo;
    } else {
      img.hidden = true;
      ph.hidden = false;
      ph.textContent = initials(c.name);
    }
  }
  function showChrome() {
    state.chromeOn = true;
    $("stage").classList.remove("chrome-off");
    if (state.chromeTimer) clearTimeout(state.chromeTimer);
  }
  function hideChromeSoon() {
    if (state.chromeTimer) clearTimeout(state.chromeTimer);
    state.chromeTimer = setTimeout(() => {
      if (!state.playing) return;
      state.chromeOn = false;
      $("stage").classList.add("chrome-off");
    }, 2800);
  }
  function toggleChrome() {
    if (state.chromeOn) {
      state.chromeOn = false;
      $("stage").classList.add("chrome-off");
      if (state.chromeTimer) clearTimeout(state.chromeTimer);
    } else {
      showChrome();
      if (state.playing) hideChromeSoon();
    }
  }
  function openStage() {
    $("stage").hidden = false;
    document.body.classList.add("stage-open");
    showChrome();
    if (state.playing) hideChromeSoon();
  }
  function closeStage() {
    $("stage").hidden = true;
    document.body.classList.remove("stage-open");
    showChrome();
  }
  function fullscreen() {
    const el = $("stage");
    if (!document.fullscreenElement) el.requestFullscreen && el.requestFullscreen();
    else document.exitFullscreen && document.exitFullscreen();
  }
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.hidden = true; }, 1600);
  }
  function toggleFilters() {
    const el = $("filters");
    const open = el.hidden;
    if (open) closeSettings();
    el.hidden = !open;
    $("filters-btn").classList.toggle("on", open);
  }
  function closeFilters() {
    $("filters").hidden = true;
    $("filters-btn").classList.remove("on");
  }
  function toggleSettings() {
    const el = $("settings");
    const open = el.hidden;
    if (open) closeFilters();
    el.hidden = !open;
    $("settings-btn").classList.toggle("on", open);
  }
  function closeSettings() {
    $("settings").hidden = true;
    $("settings-btn").classList.remove("on");
  }
  function clearFilters() {
    state.mode = "browse";
    state.cc = "";
    state.cat = "";
    state.q = "";
    if ($("q")) $("q").value = "";
    renderCountries();
    renderCats();
    applyFilter();
  }
  async function install() {
    if (state.deferredInstall) {
      state.deferredInstall.prompt();
      try { await state.deferredInstall.userChoice; } catch (_) {}
      state.deferredInstall = null;
      return;
    }
    toast(t("installed"));
  }

  function bind() {
    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.addEventListener("click", () => {
        state.lang = b.dataset.lang === "fa" ? "fa" : "en";
        try { localStorage.setItem("iris-lang", state.lang); } catch (_) {}
        applyI18n();
      });
    });
    $("search-form").addEventListener("submit", (e) => {
      e.preventDefault();
      state.q = $("q").value || "";
      state.mode = "browse";
      applyFilter();
    });
    let st = 0;
    $("q").addEventListener("input", () => {
      clearTimeout(st);
      st = setTimeout(() => {
        state.q = $("q").value || "";
        state.mode = "browse";
        applyFilter();
      }, 280);
    });
    $("countries").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cc]");
      if (!btn) return;
      state.mode = "browse";
      state.cc = btn.dataset.cc;
      renderCountries();
      applyFilter();
    });
    $("cats").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      state.mode = "browse";
      state.cat = btn.dataset.cat;
      renderCats();
      applyFilter();
    });
    $("themes").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-theme]");
      if (!btn) return;
      state.theme = btn.dataset.theme;
      applyTheme();
    });
    $("wall").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-play]");
      if (!btn) return;
      const ch = findCh(btn.dataset.play);
      if (ch) play(ch);
    });
    $("wall").addEventListener("scroll", () => {
      const el = $("wall");
      if (el.scrollTop + el.clientHeight > el.scrollHeight - 400) more();
    });
    $("d-vol").addEventListener("input", (e) => setVol(e.target.value));
    $("stage").addEventListener("pointerdown", (e) => {
      if (e.target.closest("button, input, a")) return;
      toggleChrome();
    });
    $("stage").addEventListener("mousemove", () => {
      if (!$("stage").hidden) {
        showChrome();
        if (state.playing) hideChromeSoon();
      }
    });
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act], [data-mode]");
      if (!btn) return;
      if (btn.dataset.mode) {
        state.mode = btn.dataset.mode;
        applyFilter();
        return;
      }
      const act = btn.dataset.act;
      if (act === "toggle") toggle();
      else if (act === "prev") playRel(-1);
      else if (act === "next") playRel(1);
      else if (act === "fav") toggleFav();
      else if (act === "expand") openStage();
      else if (act === "collapse") closeStage();
      else if (act === "fs") fullscreen();
      else if (act === "mute") toggleMute();
      else if (act === "pip") pip();
      else if (act === "install") install();
      else if (act === "filters") toggleFilters();
      else if (act === "settings") toggleSettings();
      else if (act === "clearf") clearFilters();
    });
    $("filters").addEventListener("click", (e) => { if (e.target.id === "filters") closeFilters(); });
    $("settings").addEventListener("click", (e) => { if (e.target.id === "settings") closeSettings(); });
    $("about-btn").addEventListener("click", () => { $("about").hidden = false; });
    $("about-close").addEventListener("click", () => { $("about").hidden = true; });
    $("about").addEventListener("click", (e) => { if (e.target.id === "about") $("about").hidden = true; });
    $("vid").addEventListener("play", () => { state.playing = true; state.status = ""; renderDock(); hideChromeSoon(); });
    $("vid").addEventListener("pause", () => { state.playing = false; renderDock(); showChrome(); });
    $("vid").addEventListener("error", () => failSkip());
    $("vid").addEventListener("volumechange", () => {
      state.vol = $("vid").volume;
      state.muted = $("vid").muted;
      applyAudio();
    });
    addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      state.deferredInstall = e;
    });
    addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.code === "Space") { e.preventDefault(); toggle(); }
      if (e.key === "Escape") { closeStage(); closeFilters(); closeSettings(); $("about").hidden = true; }
      if (e.key === "n" || e.key === "N" || e.key === "ArrowRight") playRel(1);
      if (e.key === "p" || e.key === "P" || e.key === "ArrowLeft") playRel(-1);
      if (e.key === "m" || e.key === "M") toggleMute();
      if (e.key === "f" || e.key === "F") toggleFav();
      if (e.key === "ArrowUp") { e.preventDefault(); setVol(state.vol + 0.08); }
      if (e.key === "ArrowDown") { e.preventDefault(); setVol(state.vol - 0.08); }
    });
  }

  async function boot() {
    applyTheme();
    applyI18n();
    applyAudio();
    bind();
    try {
      const res = await fetch(SRC);
      if (!res.ok) throw new Error(String(res.status));
      const text = await res.text();
      state.all = parseM3U(text);
      applyFilter();
    } catch (err) {
      $("count-line").textContent = String(err && err.message ? err.message : err);
    } finally {
      $("loader").classList.add("off");
    }
  }
  boot();
})();
