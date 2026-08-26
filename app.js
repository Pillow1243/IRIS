/* IRIS — ساخته شده توسط مبین.آ */
(() => {
  const $ = (id) => document.getElementById(id);
  const PAGE = 36;
  const PLAYLISTS = [
    "https://iptv-org.github.io/iptv/index.m3u",
    "https://iptv-org.github.io/iptv/categories/news.m3u",
    "https://iptv-org.github.io/iptv/countries/de.m3u",
    "https://iptv-org.github.io/iptv/countries/ir.m3u",
  ];
  const FEATURED = [
    { id: "feat-aje", name: "Al Jazeera English", cc: "QA", groups: ["news"], url: "https://live-hls-apps-aje-fa.getaj.net/AJE/index.m3u8" },
    { id: "feat-dw-en", name: "DW English", cc: "DE", groups: ["news"], url: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8" },
    { id: "feat-f24-en", name: "France 24 English", cc: "FR", groups: ["news"], url: "https://static.france24.com/live/F24_EN_LO_HLS/live_web.m3u8" },
    { id: "feat-bloomberg", name: "Bloomberg", cc: "US", groups: ["news", "business"], url: "https://bloomberg.com/media-manifest/streams/us.m3u8" },
    { id: "feat-euronews", name: "Euronews", cc: "FR", groups: ["news"], url: "https://cdn-euronews.akamaized.net/live/eds/euronews-pl/26382/index.m3u8" },
    { id: "feat-nhk", name: "NHK World", cc: "JP", groups: ["news"], url: "https://masterpl.hls.nhkworld.jp/hls/w/live/smarttv.m3u8" },
    { id: "feat-cbsn", name: "CBS News", cc: "US", groups: ["news"], url: "https://cbsn-us.cbsnstream.cbsnews.com/out/v1/55a8648e8f134e82a470f83d562deeca/master.m3u8" },
    { id: "feat-abc", name: "ABC News", cc: "US", groups: ["news"], url: "https://abc-news-dmd-streams-1.akamaized.net/out/v1/701126012d044971b3fa89406a440133/index.m3u8" },
    { id: "feat-cgtn", name: "CGTN", cc: "CN", groups: ["news"], url: "https://news.cgtn.com/resource/live/english/cgtn-news.m3u8" },
    { id: "feat-trt", name: "TRT World", cc: "TR", groups: ["news"], url: "https://tv-trtworld.medya.trt.com.tr/master.m3u8" },
    { id: "feat-newsmax", name: "Newsmax", cc: "US", groups: ["news"], url: "https://nmxlive.akamaized.net/hls/live/529965/Live_1/index.m3u8" },
    { id: "feat-cna", name: "CNA", cc: "SG", groups: ["news"], url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index.m3u8" },
    { id: "feat-arirang", name: "Arirang", cc: "KR", groups: ["news"], url: "https://amdlive-ch01-ctnd-com.akamaized.net/arirang_1ch/smil:arirang_1ch.smil/playlist.m3u8" },
    { id: "feat-skyau", name: "Sky News Extra", cc: "AU", groups: ["news"], url: "https://skynewsau-live.akamaized.net/hls/live/2002689/skynewsau-extra1/master.m3u8" },
    { id: "feat-bb-eu", name: "Bloomberg Europe", cc: "US", groups: ["news", "business"], url: "https://bloomberg.com/media-manifest/streams/eu.m3u8" },
    { id: "feat-bb-qt", name: "Bloomberg Quicktake", cc: "US", groups: ["news", "business"], url: "https://bloomberg.com/media-manifest/streams/qt.m3u8" },
    { id: "feat-aja", name: "الجزيرة", cc: "QA", groups: ["news"], url: "https://live-hls-apps-aja-fa.getaj.net/AJA/01.m3u8" },
    { id: "feat-ajm", name: "الجزيرة مباشر", cc: "QA", groups: ["news"], url: "https://live-hls-apps-ajm-fa.getaj.net/AJM/index.m3u8" },
    { id: "feat-f24-fr", name: "France 24 Français", cc: "FR", groups: ["news"], url: "https://static.france24.com/live/F24_FR_LO_HLS/live_web.m3u8" },
    { id: "feat-f24-ar", name: "France 24 العربية", cc: "FR", groups: ["news"], url: "https://static.france24.com/live/F24_AR_LO_HLS/live_web.m3u8" },
    { id: "feat-f24-es", name: "France 24 Español", cc: "FR", groups: ["news"], url: "https://static.france24.com/live/F24_ES_LO_HLS/live_web.m3u8" },
    { id: "feat-dw-de", name: "DW Deutsch", cc: "DE", groups: ["news"], url: "https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8" },
    { id: "feat-dw-ar", name: "DW العربية", cc: "DE", groups: ["news"], url: "https://dwamdstream103.akamaized.net/hls/live/2015526/dwstream103/master.m3u8" },
    { id: "feat-dw-es", name: "DW Español", cc: "DE", groups: ["news"], url: "https://dwamdstream105.akamaized.net/hls/live/2015531/dwstream105/index.m3u8" },
    { id: "feat-tagesschau", name: "tagesschau24", cc: "DE", groups: ["news"], url: "https://tagesschau.akamaized.net/hls/live/2020115/tagesschau/tagesschau_1/master.m3u8" },
    { id: "feat-trt-haber", name: "TRT Haber", cc: "TR", groups: ["news"], url: "https://tv-trthaber.medya.trt.com.tr/master.m3u8" },
    { id: "feat-cbsn-ny", name: "CBS News New York", cc: "US", groups: ["news"], url: "https://cbsn-ny.cbsnstream.cbsnews.com/out/v1/ec3897d58a9b45129a77d67aa247d136/master.m3u8" },
    { id: "feat-sky2", name: "Sky News Extra 2", cc: "AU", groups: ["news"], url: "https://skynewsau-live.akamaized.net/hls/live/2002690/skynewsau-extra2/master.m3u8" },
    { id: "feat-sky3", name: "Sky News Extra 3", cc: "AU", groups: ["news"], url: "https://skynewsau-live.akamaized.net/hls/live/2002691/skynewsau-extra3/master.m3u8" },
    { id: "feat-cgtn-doc", name: "CGTN Documentary", cc: "CN", groups: ["documentary"], url: "https://news.cgtn.com/resource/live/document/cgtn-doc.m3u8" },
    { id: "feat-cgtn-fr", name: "CGTN Français", cc: "CN", groups: ["news"], url: "https://news.cgtn.com/resource/live/french/cgtn-f.m3u8" },
    { id: "feat-cgtn-es", name: "CGTN Español", cc: "CN", groups: ["news"], url: "https://news.cgtn.com/resource/live/espanol/cgtn-e.m3u8" },
    { id: "feat-cgtn-ar", name: "CGTN العربية", cc: "CN", groups: ["news"], url: "https://news.cgtn.com/resource/live/arabic/cgtn-a.m3u8" },
    { id: "feat-cgtn-ru", name: "CGTN Русский", cc: "CN", groups: ["news"], url: "https://news.cgtn.com/resource/live/russian/cgtn-r.m3u8" },
    { id: "feat-trt-arabi", name: "TRT عربي", cc: "TR", groups: ["news"], url: "https://tv-trtarabi.medya.trt.com.tr/master.m3u8" },
    { id: "feat-ard", name: "Das Erste", cc: "DE", groups: ["general"], url: "https://daserste-live.ard-mcdn.de/daserste/live/hls/de/master.m3u8" },
    { id: "feat-wdr", name: "WDR", cc: "DE", groups: ["general"], url: "https://wdrfs247.akamaized.net/hls/live/681509/wdr_msl4_fs247/index.m3u8" },
    { id: "feat-kika", name: "KiKA", cc: "DE", groups: ["kids"], url: "https://kikageohls.akamaized.net/hls/live/2022693/livetvkika_de/master.m3u8" },
    { id: "feat-redbull", name: "Red Bull TV", cc: "AT", groups: ["sports"], url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8" },
    { id: "feat-cas", name: "Classic Arts", cc: "US", groups: ["culture", "music"], url: "https://classicarts.akamaized.net/hls/live/1024257/CAS/master.m3u8" },
    { id: "feat-hr", name: "hr-fernsehen", cc: "DE", groups: ["general"], url: "https://hrhls.akamaized.net/hls/live/2024525/hrhls/master.m3u8" },
    { id: "feat-ndr", name: "NDR", cc: "DE", groups: ["general"], url: "https://mcdn.ndr.de/ndr/hls/ndr_fs/ndr_nds/master.m3u8" },
    { id: "feat-sr", name: "SR Fernsehen", cc: "DE", groups: ["general"], url: "https://srfs.akamaized.net/hls/live/689649/srfsgeo/index.m3u8" },
    { id: "feat-br", name: "BR Fernsehen", cc: "DE", groups: ["general"], url: "https://mcdn.br.de/br/fs/bfs_sued/hls/de/master.m3u8" },
    { id: "feat-alpha", name: "ARD-alpha", cc: "DE", groups: ["science"], url: "https://mcdn.br.de/br/fs/ard_alpha/hls/de/master.m3u8" },
    { id: "feat-ndr-hh", name: "NDR Hamburg", cc: "DE", groups: ["general"], url: "https://mcdn.ndr.de/ndr/hls/ndr_fs/ndr_hh/master.m3u8" },
    { id: "feat-ndr-sh", name: "NDR Schleswig-Holstein", cc: "DE", groups: ["general"], url: "https://mcdn.ndr.de/ndr/hls/ndr_fs/ndr_sh/master.m3u8" },
    { id: "feat-ndr-mv", name: "NDR Mecklenburg", cc: "DE", groups: ["general"], url: "https://mcdn.ndr.de/ndr/hls/ndr_fs/ndr_mv/master.m3u8" },
    { id: "feat-br-nord", name: "BR Nord", cc: "DE", groups: ["general"], url: "https://mcdn.br.de/br/fs/bfs_nord/hls/de/master.m3u8" },
    { id: "feat-trt-cocuk", name: "TRT Çocuk", cc: "TR", groups: ["kids"], url: "https://tv-trtcocuk.medya.trt.com.tr/master.m3u8" },
    { id: "feat-trt-muzik", name: "TRT Müzik", cc: "TR", groups: ["music"], url: "https://tv-trtmuzik.medya.trt.com.tr/master.m3u8" },
    { id: "feat-trt-avaz", name: "TRT Avaz", cc: "TR", groups: ["general"], url: "https://tv-trtavaz.medya.trt.com.tr/master.m3u8" },
    { id: "feat-1tvge", name: "1TV Georgia", cc: "GE", groups: ["general"], url: "https://tv.cdn.xsg.ge/gpb-1tv/index.m3u8" },
    { id: "feat-2tvge", name: "2TV Georgia", cc: "GE", groups: ["general"], url: "https://tv.cdn.xsg.ge/gpb-2tv/index.m3u8" },
    { id: "feat-4u", name: "4U TV", cc: "TR", groups: ["general"], url: "https://hls.4utv.live/hls/stream.m3u8" },
    { id: "feat-bbc-fa", name: "بی‌بی‌سی فارسی", cc: "IR", groups: ["news"], yt: "I0PU3dgFnGQ", ytChan: "UCHZk9MrT3DGWmVqdsj5y0EA", logo: "https://i.ytimg.com/vi/I0PU3dgFnGQ/mqdefault.jpg" },
    { id: "feat-iranintl", name: "ایران اینترنشنال", cc: "IR", groups: ["news"], yt: "5JDxjsAVaGk", ytChan: "UCat6bC0Wrqq9Bcq7EkH_yQw", logo: "https://i.ytimg.com/vi/5JDxjsAVaGk/mqdefault.jpg" },
    { id: "feat-voa-fa", name: "صدای آمریکا", cc: "IR", groups: ["news"], yt: "UzRuHWrN-gE", ytChan: "UCttfDeGMwUxPjnlsKagcwKw", logo: "https://i.ytimg.com/vi/UzRuHWrN-gE/mqdefault.jpg" },
    { id: "feat-247", name: "247 Box TV", cc: "IR", groups: ["general"], desk: "persian", url: "https://hls.247box.live/hls/stream.m3u8" },
  ].map((c) => ({ logo: "", url: "", ...c, featured: true }));
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
    { cc: "SG", fa: "سنگاپور", en: "Singapore" },
    { cc: "RU", fa: "روسیه", en: "Russia" },
    { cc: "ID", fa: "اندونزی", en: "Indonesia" },
  ];
  const CATS = [
    "news", "sports", "music", "movies", "documentary", "kids",
    "entertainment", "general", "culture", "science", "weather", "series", "travel", "business",
  ];
  const THEMES = ["dark", "oled", "cinema", "light"];
  const ADULT = /xxx|nsfw|adult|erotic|18\+|porn/i;
  const DEAD_HOST = /telewebion\.ir|persiana\.live|presstv\.ir|jmp2\.uk|pluto\.tv|short\.gy|xemzi\.|mcquack\.|streamlock\.net/i;
  const NICE_HOST = /akamaized|akamai|cloudfront|france24|cbsnstream|getaj\.net|dwamd|tagesschau|ard-mcdn|redbull|nhkworld|trt\.com|newsmax|bloomberg/i;

  const state = {
    lang: localStorage.getItem("iris-lang") || "en",
    theme: localStorage.getItem("iris-theme") || "dark",
    vol: clampVol(localStorage.getItem("iris-vol")),
    muted: localStorage.getItem("iris-mute") === "1",
    all: FEATURED.slice(),
    view: [],
    shown: 0,
    painted: 0,
    painting: false,
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
    tearing: false,
    applyingAudio: false,
    dead: new Set(safeParse("iris-dead", [])),
    scanning: false,
    sleepMins: 0,
    sleepTimer: 0,
    resume: localStorage.getItem("iris-resume") !== "0",
    ytOn: false,
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
  function normCC(cc) {
    const v = String(cc || "").toUpperCase();
    return v === "UK" ? "GB" : v;
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
    renderNow();
    renderSleeps();
    renderResume();
    renderWall(true);
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
    if (state.applyingAudio) return;
    state.applyingAudio = true;
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
    state.applyingAudio = false;
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
        let cc = ((id.match(/\.([a-z]{2})(?:@|$)/i) || [])[1] || "").toUpperCase();
        if (cc === "UK") cc = "GB";
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
      const k = c.url || c.id;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  function isPersian(c) {
    if (!c) return false;
    if (c.desk === "persian") return true;
    if (normCC(c.cc) === "IR") return true;
    return /persian|farsi|فارسی|ایران اینترنشنال|صدای آمریکا|بی‌بی‌سی فارسی/i.test(c.name || "");
  }
  function isYt(c) {
    return !!(c && (c.yt || c.ytChan));
  }
  function filtered() {
    if (state.mode === "fav") return state.favs.slice();
    if (state.mode === "recent") return state.recents.slice();
    const q = state.q.trim().toLowerCase();
    return state.all.filter((c) => {
      if (state.mode === "persian" && !isPersian(c)) return false;
      if (state.cc && normCC(c.cc) !== normCC(state.cc)) return false;
      if (state.cat && c.groups.indexOf(state.cat) < 0) return false;
      if (q && (c.name + " " + c.cc + " " + c.groups.join(" ")).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }
  function updateCount() {
    const cfn = dict().count;
    const n = state.view.length;
    const base = typeof cfn === "function" ? cfn(n) : String(n);
    $("count-line").textContent = state.scanning ? base + " · " + t("scanning") : base;
  }
  function applyFilter() {
    state.view = filtered();
    state.shown = 0;
    state.painted = 0;
    renderNow();
    renderWall(true);
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
  function renderNow() {
    const box = $("now");
    if (!box) return;
    box.innerHTML = FEATURED.map((c) => {
      const on = state.current && state.current.id === c.id ? "on" : "";
      return `<button type="button" class="chip ${on}" data-play="${esc(c.id)}">${flag(c.cc)} ${esc(c.name)}</button>`;
    }).join("");
  }
  function renderSleeps() {
    const box = $("sleeps");
    if (!box) return;
    const opts = [0, 15, 30, 60];
    box.innerHTML = opts.map((n) => {
      const label = n ? String(n) : t("off");
      return `<button type="button" class="${state.sleepMins === n ? "on" : ""}" data-sleep="${n}">${label}</button>`;
    }).join("");
  }
  function renderResume() {
    const btn = $("resume-btn");
    if (btn) btn.classList.toggle("on", state.resume);
  }
  function card(c) {
    const on = state.current && state.current.id === c.id ? "on" : "";
    const logo = c.logo
      ? `<img class="logo" src="${esc(c.logo)}" alt="" width="160" height="92" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false;"><div class="ph" hidden>${esc(initials(c.name))}</div>`
      : `<div class="ph">${esc(initials(c.name))}</div>`;
    const cat = c.groups[0] ? t(c.groups[0]) : "";
    const yt = isYt(c) ? `<span class="badge-yt">${t("yt")}</span>` : "";
    return `<button type="button" class="card ${on}" data-play="${esc(c.id)}">
      ${logo}${yt}
      <div class="nm">${esc(c.name)}</div>
      <div class="meta">${c.cc ? flag(c.cc) + " " : ""}${esc(c.cc)} ${cat ? "· " + esc(cat) : ""}</div>
    </button>`;
  }
  function useHome() {
    return false;
  }
  function pickRail(fn, n) {
    const seen = new Set();
    const out = [];
    state.all.forEach((c) => {
      if (out.length >= n) return;
      if (!fn(c) || seen.has(c.id)) return;
      seen.add(c.id);
      out.push(c);
    });
    return out;
  }
  function renderHome() {
    const box = $("wall");
    if (!box) return;
    box.classList.add("home");
    const rails = [
      { key: "persian", items: pickRail(isPersian, 12) },
      { key: "news", items: pickRail((c) => c.groups.indexOf("news") >= 0, 18) },
      { key: "germany", items: pickRail((c) => normCC(c.cc) === "DE", 16) },
      { key: "kids", items: pickRail((c) => c.groups.indexOf("kids") >= 0, 10) },
      { key: "sports", items: pickRail((c) => c.groups.indexOf("sports") >= 0, 10) },
      { key: "music", items: pickRail((c) => c.groups.indexOf("music") >= 0 || c.groups.indexOf("culture") >= 0, 10) },
    ];
    const rest = state.view.filter((c) => !c.featured);
    box.innerHTML =
      rails.filter((r) => r.items.length).map((r) => {
        return `<div class="rail"><div class="rail-lab">${t(r.key)}</div><div class="rail-row">${r.items.map(card).join("")}</div></div>`;
      }).join("") +
      (rest.length
        ? `<div class="rail-lab">${t("all")}</div><div class="rail-grid" id="rail-grid">${rest.slice(0, state.shown || PAGE).map(card).join("")}</div><div id="tail" class="tail"></div>`
        : `<div id="tail" class="tail"></div>`);
    state.painted = Math.min(state.shown || PAGE, rest.length);
    watchTail();
  }
  function renderWall(reset) {
    const box = $("wall");
    updateCount();
    if (useHome()) {
      if (reset || !box.classList.contains("home")) renderHome();
      return;
    }
    box.classList.remove("home");
    if (!state.view.length) {
      box.innerHTML = `<div class="card empty">${t("empty")}</div>`;
      state.painted = 0;
      return;
    }
    if (reset || !box.querySelector(".card")) {
      box.innerHTML = '<div id="tail" class="tail"></div>';
      state.painted = 0;
    }
    if (state.shown < PAGE) state.shown = Math.min(PAGE, state.view.length);
    paintMore();
  }
  function paintMore() {
    const box = $("wall");
    if (!box || state.painting) return;
    const end = Math.min(state.shown, state.view.length);
    if (state.painted >= end) {
      watchTail();
      return;
    }
    state.painting = true;
    const tail = $("tail") || box.appendChild(Object.assign(document.createElement("div"), { id: "tail", className: "tail" }));
    const frag = document.createDocumentFragment();
    const hold = document.createElement("div");
    hold.innerHTML = state.view.slice(state.painted, end).map(card).join("");
    while (hold.firstChild) frag.appendChild(hold.firstChild);
    box.insertBefore(frag, tail);
    state.painted = end;
    state.painting = false;
    watchTail();
  }
  function more() {
    const total = useHome() ? state.view.filter((c) => !c.featured).length : state.view.length;
    if (state.painting || state.shown >= total) return;
    state.shown = Math.min(state.shown + PAGE, total);
    paintMore();
  }
  let tailObs = null;
  let moreLock = 0;
  function watchTail() {
    const tail = $("tail");
    const root = $("wall");
    if (!tail || !root || typeof IntersectionObserver === "undefined") return;
    if (!tailObs) {
      tailObs = new IntersectionObserver(
        (ents) => {
          if (!ents.some((e) => e.isIntersecting)) return;
          const now = Date.now();
          if (now - moreLock < 220) return;
          moreLock = now;
          more();
        },
        { root, rootMargin: "240px" }
      );
    }
    tailObs.disconnect();
    tailObs.observe(tail);
  }

  function findCh(id) {
    return (
      FEATURED.find((c) => c.id === id) ||
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

  function stopYt() {
    const frame = $("yt");
    if (frame) {
      try { frame.src = "about:blank"; } catch (_) {}
      frame.hidden = true;
    }
    const video = $("vid");
    if (video) video.hidden = false;
    const stage = $("stage");
    if (stage) stage.classList.remove("has-yt");
    state.ytOn = false;
  }
  function ytCmd(fn, args) {
    const frame = $("yt");
    if (!frame || !frame.contentWindow || !state.ytOn) return;
    try {
      frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: fn, args: args || [] }), "*");
    } catch (_) {}
  }
  function ytSrc(ch) {
    const origin = encodeURIComponent(location.origin);
    const extra = `autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1&origin=${origin}`;
    if (ch.yt) return `https://www.youtube.com/embed/${ch.yt}?${extra}`;
    return `https://www.youtube.com/embed/live_stream?channel=${ch.ytChan}&${extra}`;
  }
  function playYt(ch) {
    stopHls();
    const video = $("vid");
    video.hidden = true;
    const frame = $("yt");
    const stage = $("stage");
    if (stage) stage.classList.add("has-yt");
    frame.hidden = false;
    frame.src = ytSrc(ch);
    state.ytOn = true;
    state.playing = true;
    state.fails = 0;
    setStatus("");
    if (state.connectTimer) { clearTimeout(state.connectTimer); state.connectTimer = 0; }
    renderDock();
    hideChromeSoon();
  }
  function stopHls() {
    state.tearing = true;
    if (state.hls) {
      try { state.hls.stopLoad(); } catch (_) {}
      try { state.hls.detachMedia(); } catch (_) {}
      try { state.hls.destroy(); } catch (_) {}
      state.hls = null;
    }
    if (state.connectTimer) {
      clearTimeout(state.connectTimer);
      state.connectTimer = 0;
    }
    const video = $("vid");
    try {
      video.pause();
      video.removeAttribute("src");
      video.srcObject = null;
    } catch (_) {}
    setTimeout(() => { state.tearing = false; }, 80);
  }
  function armConnect(gen) {
    if (state.connectTimer) clearTimeout(state.connectTimer);
    state.connectTimer = setTimeout(() => {
      if (gen !== state.playGen || state.playing) return;
      stayFailed();
    }, 10000);
  }
  function setStatus(msg) {
    state.status = msg || "";
    const el = $("s-status");
    if (el) el.textContent = state.status;
    const kick = $("d-kick");
    if (kick) kick.textContent = state.status || t("live");
  }
  function play(ch, fromUser) {
    if (!ch) return;
    const video = $("vid");
    if (fromUser) state.fails = 0;
    state.playGen += 1;
    const gen = state.playGen;
    state.current = ch;
    state.playing = false;
    setStatus(state.fails ? t("hunting") : t("connecting"));
    state.recents = [ch, ...state.recents.filter((x) => x.id !== ch.id)].slice(0, 40);
    try { localStorage.setItem("iris-recents", JSON.stringify(state.recents)); } catch (_) {}
    stopHls();
    stopYt();
    applyAudio();
    renderDock();
    markCurrent();
    showChrome();
    openStage();
    try { localStorage.setItem("iris-last", ch.id); } catch (_) {}
    if (isYt(ch)) {
      playYt(ch);
      return;
    }
    const url = ch.url;
    const onReady = () => {
      if (gen !== state.playGen) return;
      video.play().then(() => {
        if (gen !== state.playGen) return;
        state.playing = true;
        state.fails = 0;
        setStatus("");
        if (state.connectTimer) { clearTimeout(state.connectTimer); state.connectTimer = 0; }
        renderDock();
        hideChromeSoon();
      }).catch((err) => {
        if (gen !== state.playGen) return;
        if (err && err.name === "NotAllowedError") {
          state.playing = false;
          setStatus(t("tap"));
          renderDock();
          return;
        }
        stayFailed();
      });
    };
    armConnect(gen);
    if (window.Hls && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        capLevelToPlayerSize: true,
        startLevel: -1,
        backBufferLength: 4,
        maxBufferLength: 10,
        maxMaxBufferLength: 18,
        maxBufferSize: 20 * 1000 * 1000,
        fragLoadingTimeOut: 8000,
        manifestLoadingTimeOut: 8000,
        fragLoadingMaxRetry: 1,
        manifestLoadingMaxRetry: 1,
        levelLoadingMaxRetry: 1,
        testBandwidth: false,
        xhrSetup: (xhr) => { xhr.withCredentials = false; },
      });
      state.hls = hls;
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, onReady);
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (gen !== state.playGen || !data || !data.fatal) return;
        if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          try { hls.recoverMediaError(); return; } catch (_) {}
        }
        stayFailed();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("loadedmetadata", onReady, { once: true });
    } else {
      stayFailed();
    }
  }
  function stayFailed() {
    if (state.tearing) return;
    state.playing = false;
    setStatus(t("failed"));
    renderDock();
    showChrome();
  }
  function playRel(dir) {
    const list = huntList();
    if (!list.length) return;
    if (!state.current) {
      play(list[0]);
      return;
    }
    const i = list.findIndex((c) => c.id === state.current.id);
    const n = ((i < 0 ? 0 : i) + dir + list.length) % list.length;
    play(list[n]);
  }
  function huntList() {
    if (state.view.length) {
      const feat = FEATURED.filter((c) => state.view.some((v) => v.id === c.id) || !state.cc && !state.cat && !state.q);
      const rest = state.view.filter((c) => !c.featured);
      const merged = [];
      const seen = new Set();
      feat.concat(rest).forEach((c) => {
        if (seen.has(c.id)) return;
        seen.add(c.id);
        merged.push(c);
      });
      return merged.length ? merged : state.view;
    }
    return FEATURED;
  }
  function toggle() {
    const video = $("vid");
    if (!state.current) {
      play(FEATURED[0] || state.view[0], true);
      return;
    }
    if (state.playing) {
      if (state.ytOn) ytCmd("pauseVideo");
      else video.pause();
      state.playing = false;
      showChrome();
    } else if (state.ytOn) {
      ytCmd("playVideo");
      state.playing = true;
      setStatus("");
      hideChromeSoon();
    } else {
      video.play().then(() => {
        state.playing = true;
        setStatus("");
        renderDock();
        hideChromeSoon();
      }).catch((err) => {
        if (err && err.name === "NotAllowedError") {
          setStatus(t("tap"));
          renderDock();
          return;
        }
        play(state.current, true);
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
    if (state.ytOn) ytCmd(state.muted ? "mute" : "unMute");
  }
  function setVol(v) {
    state.vol = clampVol(v);
    state.muted = state.vol === 0;
    applyAudio();
    if (state.ytOn) ytCmd("setVolume", [Math.round(state.vol * 100)]);
  }
  function pip() {
    if (state.ytOn) {
      toast(t("pip"));
      return;
    }
    const video = $("vid");
    if (!document.pictureInPictureEnabled) {
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
    document.querySelectorAll("[data-play]").forEach((el) => {
      el.classList.toggle("on", !!(state.current && el.dataset.play === state.current.id));
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
    setStatus(state.status);
    applyAudio();
    syncWake();
    syncFS();
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
  const layers = [];
  let ignorePop = 0;
  function pushLayer(id) {
    if (layers[layers.length - 1] === id) return;
    layers.push(id);
  }
  function dropLayer(id) {
    const i = layers.lastIndexOf(id);
    if (i >= 0) layers.splice(i, 1);
  }
  function consumeBack() {
    if (fsEl() || ($("vid") && $("vid").webkitDisplayingFullscreen)) {
      exitFS();
      return true;
    }
    const id = layers[layers.length - 1];
    if (!id) return false;
    if (id === "stage") closeStage(true);
    else if (id === "filters") closeFilters(true);
    else if (id === "settings") closeSettings(true);
    else if (id === "about") closeAbout(true);
    else dropLayer(id, true);
    return true;
  }
  function bindBack() {
    try { history.scrollRestoration = "manual"; } catch (_) {}
    try {
      if (!history.state || !history.state.keep) history.replaceState({ keep: "root" }, "");
      history.pushState({ keep: "live" }, "");
    } catch (_) {}
    addEventListener("popstate", () => {
      if (ignorePop) { ignorePop -= 1; return; }
      if (consumeBack()) {
        try { history.pushState({ keep: "live" }, ""); } catch (_) {}
      }
    });
    document.addEventListener("backbutton", (e) => {
      if (consumeBack()) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
    addEventListener("keydown", (e) => {
      if (e.keyCode === 4 && consumeBack()) e.preventDefault();
    });
    window.AndroidBack = consumeBack;
    window.onBackPressed = consumeBack;
    try {
      if (window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.App) {
        Capacitor.Plugins.App.addListener("backButton", () => {
          if (!consumeBack() && Capacitor.Plugins.App.exitApp) Capacitor.Plugins.App.exitApp();
        });
      }
    } catch (_) {}
  }
  function openStage() {
    const was = !$("stage").hidden;
    $("stage").hidden = false;
    document.body.classList.add("stage-open");
    showChrome();
    if (state.playing) hideChromeSoon();
    if (!was) pushLayer("stage");
  }
  function fsEl() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
  }
  function requestFS(el) {
    const fn = el.requestFullscreen || el.webkitRequestFullscreen || el.webkitRequestFullScreen || el.msRequestFullscreen;
    if (fn) return Promise.resolve(fn.call(el));
    const v = $("vid");
    if (v && v.webkitEnterFullscreen) {
      try { v.webkitEnterFullscreen(); return Promise.resolve(); } catch (err) { return Promise.reject(err); }
    }
    return Promise.reject(new Error("fs"));
  }
  function exitFS() {
    const fn = document.exitFullscreen || document.webkitExitFullscreen || document.webkitCancelFullScreen || document.msExitFullscreen;
    if (fsEl() && fn) {
      return Promise.resolve(fn.call(document)).catch(() => {});
    }
    const v = $("vid");
    if (v && v.webkitDisplayingFullscreen && v.webkitExitFullscreen) {
      try { v.webkitExitFullscreen(); } catch (_) {}
    }
    return Promise.resolve();
  }
  function syncFS() {
    const on = !!(fsEl() || ($("vid") && $("vid").webkitDisplayingFullscreen));
    $("stage").classList.toggle("is-fs", on);
    const btn = $("s-fs");
    if (btn) btn.setAttribute("aria-label", on ? t("fsExit") : t("fs"));
  }
  function closeStage(fromPop) {
    const was = !$("stage").hidden;
    exitFS();
    $("stage").hidden = true;
    document.body.classList.remove("stage-open");
    $("stage").classList.remove("is-fs");
    showChrome();
    if (was) dropLayer("stage", fromPop);
  }
  function fullscreen() {
    if (fsEl() || ($("vid") && $("vid").webkitDisplayingFullscreen)) {
      exitFS();
      return;
    }
    openStage();
    requestFS($("stage")).catch(() => requestFS($("vid"))).catch(() => toast(t("fs")));
  }
  function seekLive() {
    const video = $("vid");
    const hls = state.hls;
    if (hls && Number.isFinite(hls.liveSyncPosition)) {
      try { video.currentTime = hls.liveSyncPosition; return true; } catch (_) {}
    }
    if (video.seekable && video.seekable.length) {
      try {
        video.currentTime = video.seekable.end(video.seekable.length - 1);
        return true;
      } catch (_) {}
    }
    return false;
  }
  function setRefreshing(on) {
    state.refreshing = on;
    document.querySelectorAll("[data-act='refresh']").forEach((b) => b.classList.toggle("spin", on));
  }
  async function refreshSignal() {
    if (state.refreshing) return;
    setRefreshing(true);
    setStatus(t("refreshing"));
    try {
      if (state.current) play(state.current, true);
      const parsed = await loadCatalog();
      startScan(parsed, true);
      toast(t("refreshed"));
    } catch (_) {
      if (state.current) play(state.current, true);
      else toast(t("failed"));
    } finally {
      setRefreshing(false);
    }
  }
  async function syncWake() {
    try {
      if (state.playing && navigator.wakeLock && navigator.wakeLock.request) {
        if (!state.wake) {
          state.wake = await navigator.wakeLock.request("screen");
          state.wake.addEventListener("release", () => { state.wake = null; });
        }
      } else if (state.wake) {
        await state.wake.release();
        state.wake = null;
      }
    } catch (_) {}
  }
  function tickClock() {
    const el = $("s-clock");
    if (!el) return;
    const loc = state.lang === "fa" ? "fa-IR" : "en-GB";
    el.textContent = new Date().toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" });
  }
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.hidden = true; }, 1600);
  }
  async function shareCh() {
    const c = state.current;
    const url = "https://pillow1243.github.io/IRIS/";
    const text = c ? c.name + " — IRIS · Mobin.A" : "IRIS — Live television · Mobin.A";
    try {
      if (navigator.share) {
        await navigator.share({ title: "IRIS", text: text, url: url });
        return;
      }
    } catch (_) {}
    try {
      await navigator.clipboard.writeText(text + "\n" + url);
      toast(t("copied"));
    } catch (_) {
      toast(url);
    }
  }
  function setSleep(mins) {
    mins = Number(mins) || 0;
    state.sleepMins = mins;
    if (state.sleepTimer) {
      clearTimeout(state.sleepTimer);
      state.sleepTimer = 0;
    }
    renderSleeps();
    if (!mins) {
      toast(t("sleepOff"));
      return;
    }
    state.sleepTimer = setTimeout(() => {
      state.sleepTimer = 0;
      state.sleepMins = 0;
      if (state.ytOn) ytCmd("pauseVideo");
      else {
        try { $("vid").pause(); } catch (_) {}
      }
      state.playing = false;
      renderSleeps();
      renderDock();
      showChrome();
      toast(t("sleepDone"));
    }, mins * 60 * 1000);
    const fn = t("sleepSet");
    toast(typeof fn === "function" ? fn(mins) : String(mins));
  }
  function toggleResume() {
    state.resume = !state.resume;
    try { localStorage.setItem("iris-resume", state.resume ? "1" : "0"); } catch (_) {}
    renderResume();
  }
  function applyQuick(act, val) {
    if (act === "world") {
      state.mode = "browse";
      state.cc = "";
      state.cat = "";
    } else if (act === "persian") {
      state.mode = "persian";
      state.cc = "";
      state.cat = "";
    } else if (act === "cat") {
      state.mode = "browse";
      state.cc = "";
      state.cat = val || "";
    } else if (act === "cc") {
      state.mode = "browse";
      state.cat = "";
      state.cc = val || "";
    }
    renderCountries();
    renderCats();
    applyFilter();
  }
  function hideExploreTip() {
    document.querySelectorAll(".neon-tip").forEach((el) => { el.hidden = true; });
    try { localStorage.setItem("iris-seen-filter", "1"); } catch (_) {}
  }
  function toggleFilters() {
    hideExploreTip();
    const el = $("filters");
    if (!el) return;
    if (el.hidden) {
      closeSettings();
      el.hidden = false;
      $("filters-btn").classList.add("on");
      pushLayer("filters");
    } else closeFilters();
  }
  function closeFilters(fromPop) {
    const el = $("filters");
    const was = el && !el.hidden;
    if (el) el.hidden = true;
    if ($("filters-btn")) $("filters-btn").classList.remove("on");
    if (was) dropLayer("filters", fromPop);
  }
  function toggleSettings() {
    const el = $("settings");
    if (!el) return;
    if (el.hidden) {
      closeFilters();
      el.hidden = false;
      $("settings-btn").classList.add("on");
      pushLayer("settings");
    } else closeSettings();
  }
  function closeSettings(fromPop) {
    const el = $("settings");
    const was = el && !el.hidden;
    if (el) el.hidden = true;
    if ($("settings-btn")) $("settings-btn").classList.remove("on");
    if (was) dropLayer("settings", fromPop);
  }
  function openAbout() {
    const el = $("about");
    if (!el) return;
    if (el.hidden) pushLayer("about");
    el.hidden = false;
  }
  function closeAbout(fromPop) {
    const el = $("about");
    const was = el && !el.hidden;
    if (el) el.hidden = true;
    if (was) dropLayer("about", fromPop);
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
    bindBack();
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
    function onPlayClick(e) {
      const btn = e.target.closest("[data-play]");
      if (!btn) return;
      const ch = findCh(btn.dataset.play);
      if (ch) play(ch, true);
    }
    $("wall").addEventListener("click", onPlayClick);
    $("now").addEventListener("click", onPlayClick);
    if ($("desk")) $("desk").addEventListener("click", onPlayClick);
    if ($("quick")) $("quick").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-quick]");
      if (btn) applyQuick(btn.dataset.quick, btn.dataset.val);
    });
    if ($("sleeps")) $("sleeps").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-sleep]");
      if (btn) setSleep(btn.dataset.sleep);
    });
    $("d-vol").addEventListener("input", (e) => setVol(e.target.value));
    $("stage").addEventListener("pointerdown", (e) => {
      if (e.target.closest("button, input, a")) return;
      toggleChrome();
    });
    $("stage").addEventListener("dblclick", (e) => {
      if (e.target.closest("button, input, a")) return;
      fullscreen();
    });
    let moveT = 0;
    $("stage").addEventListener("mousemove", () => {
      if ($("stage").hidden) return;
      const now = Date.now();
      if (now - moveT < 180) return;
      moveT = now;
      showChrome();
      if (state.playing) hideChromeSoon();
    });
    document.addEventListener("fullscreenchange", syncFS);
    document.addEventListener("webkitfullscreenchange", syncFS);
    $("vid").addEventListener("webkitbeginfullscreen", syncFS);
    $("vid").addEventListener("webkitendfullscreen", syncFS);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        state.hideAt = Date.now();
        return;
      }
      syncWake();
      if (state.current && state.hideAt && Date.now() - state.hideAt > 8000) seekLive();
    });
    tickClock();
    setInterval(tickClock, 30000);
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
      else if (act === "prev") { state.fails = 0; playRel(-1); }
      else if (act === "next") { state.fails = 0; playRel(1); }
      else if (act === "fav") toggleFav();
      else if (act === "expand") openStage();
      else if (act === "collapse") closeStage();
      else if (act === "fs") fullscreen();
      else if (act === "refresh") refreshSignal();
      else if (act === "mute") toggleMute();
      else if (act === "pip") pip();
      else if (act === "install") install();
      else if (act === "filters") toggleFilters();
      else if (act === "settings") toggleSettings();
      else if (act === "clearf") clearFilters();
      else if (act === "share") shareCh();
      else if (act === "resume") toggleResume();
    });
    $("filters").addEventListener("click", (e) => { if (e.target.id === "filters") closeFilters(); });
    $("settings").addEventListener("click", (e) => { if (e.target.id === "settings") closeSettings(); });
    $("about-btn").addEventListener("click", openAbout);
    $("about-close").addEventListener("click", () => closeAbout());
    $("about").addEventListener("click", (e) => { if (e.target.id === "about") closeAbout(); });
    $("vid").addEventListener("playing", () => {
      state.playing = true;
      state.fails = 0;
      setStatus("");
      renderDock();
      hideChromeSoon();
    });
    $("vid").addEventListener("pause", () => {
      if (state.tearing) return;
      state.playing = false;
      renderDock();
      showChrome();
    });
    $("vid").addEventListener("error", () => {
      if (state.tearing || !state.current) return;
      stayFailed();
    });
    addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      state.deferredInstall = e;
    });
    addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.code === "Space") { e.preventDefault(); toggle(); }
      if (e.key === "Escape") {
        if (consumeBack()) return;
        closeStage();
        closeFilters();
        closeSettings();
        closeAbout();
      }
      if (e.key === "n" || e.key === "N" || e.key === "ArrowRight") { state.fails = 0; playRel(1); }
      if (e.key === "p" || e.key === "P" || e.key === "ArrowLeft") { state.fails = 0; playRel(-1); }
      if (e.key === "m" || e.key === "M") toggleMute();
      if (e.key === "r" || e.key === "R") refreshSignal();
      if (e.key === "f" || e.key === "F") toggleFav();
      if (e.key === "ArrowUp") { e.preventDefault(); setVol(state.vol + 0.08); }
      if (e.key === "ArrowDown") { e.preventDefault(); setVol(state.vol - 0.08); }
    });
  }

  async function fetchText(url) {
    const sep = url.indexOf("?") >= 0 ? "&" : "?";
    const res = await fetch(url + sep + "iris=" + Date.now(), { cache: "no-store", signal: AbortSignal.timeout(22000) });
    if (!res.ok) throw new Error(String(res.status));
    return res.text();
  }
  async function loadCatalog() {
    for (const url of PLAYLISTS) {
      try {
        const text = await fetchText(url);
        const parsed = parseM3U(text);
        if (parsed.length) return parsed;
      } catch (_) {}
    }
    return [];
  }

  function hostOk(url) {
    return !DEAD_HOST.test(url) && !state.dead.has(url);
  }
  function scoreCh(c) {
    let s = 0;
    if (NICE_HOST.test(c.url)) s += 12;
    if (c.groups.indexOf("news") >= 0) s += 8;
    if (c.groups.indexOf("sports") >= 0) s += 5;
    if (["DE", "US", "GB", "FR", "TR", "NL", "JP", "QA", "KR", "SG", "AU"].indexOf(c.cc) >= 0) s += 4;
    return s;
  }
  function persistDead() {
    try { localStorage.setItem("iris-dead", JSON.stringify(Array.from(state.dead).slice(-900))); } catch (_) {}
  }
  function persistLive() {
    const ch = state.all.filter((c) => !c.featured).slice(0, 500);
    try { localStorage.setItem("iris-live", JSON.stringify({ at: Date.now(), ch: ch })); } catch (_) {}
  }
  function loadLiveCache() {
    const pack = safeParse("iris-live", null);
    if (!pack || !pack.at || Date.now() - pack.at > 12 * 3600 * 1000) return [];
    return Array.isArray(pack.ch) ? pack.ch.filter((c) => c && c.url && hostOk(c.url)) : [];
  }
  function bury(ch) {
    if (!ch || ch.featured) return;
    state.dead.add(ch.url);
    persistDead();
    state.all = state.all.filter((c) => c.url !== ch.url);
    state.view = state.view.filter((c) => c.url !== ch.url);
    updateCount();
  }
  function admit(ch) {
    if (!ch || state.all.some((c) => c.url === ch.url)) return;
    state.all.push(ch);
    const q = state.q.trim().toLowerCase();
    const ok =
      state.mode === "browse" &&
      (!state.cc || normCC(ch.cc) === normCC(state.cc)) &&
      (!state.cat || ch.groups.indexOf(state.cat) >= 0) &&
      (!q || (ch.name + " " + ch.cc + " " + ch.groups.join(" ")).toLowerCase().indexOf(q) >= 0);
    if (ok) {
      const empty = $("wall") && $("wall").querySelector(".empty");
      state.view.push(ch);
      if (empty) renderWall(true);
      else updateCount();
    } else updateCount();
  }
  async function probe(url) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3500);
    try {
      const res = await fetch(url, { method: "GET", mode: "cors", cache: "no-store", signal: ctrl.signal });
      if (!res.ok) return false;
      const head = (await res.text()).slice(0, 220);
      return head.indexOf("#EXT") >= 0 || head.indexOf("m3u8") >= 0;
    } catch (_) {
      return false;
    } finally {
      clearTimeout(t);
    }
  }
  async function startScan(pool) {
    const have = new Set(state.all.map((c) => c.url));
    let list = pool.filter((c) => hostOk(c.url) && !have.has(c.url));
    list.sort((a, b) => scoreCh(b) - scoreCh(a));
    list = list.slice(0, 900);
    state.scanning = true;
    updateCount();
    let i = 0;
    let found = 0;
    async function worker() {
      while (i < list.length && found < 420) {
        const ch = list[i++];
        if (!ch || state.dead.has(ch.url)) continue;
        const ok = await probe(ch.url);
        if (ok) { found += 1; admit(ch); }
        else state.dead.add(ch.url);
      }
    }
    await Promise.all(Array.from({ length: 6 }, worker));
    persistDead();
    persistLive();
    state.scanning = false;
    updateCount();
    if (useHome()) renderHome();
  }

  async function boot() {
    try {
      applyTheme();
      applyI18n();
      applyAudio();
      bind();
      const cached = loadLiveCache();
      if (cached.length) state.all = FEATURED.concat(cached);
      applyFilter();
      if (localStorage.getItem("iris-seen-filter") === "1") hideExploreTip();
      if (state.resume) {
        const last = findCh(localStorage.getItem("iris-last"));
        if (last) {
          state.current = last;
          renderDock();
          renderNow();
        }
      }
    } catch (err) {
      const line = $("count-line");
      if (line) line.textContent = String(err && err.message ? err.message : err);
    } finally {
      const loader = $("loader");
      if (loader) loader.classList.add("off");
    }
    try {
      const parsed = await loadCatalog();
      startScan(parsed);
    } catch (err) {
      const line = $("count-line");
      if (line) line.textContent = String(err && err.message ? err.message : err);
    }
  }
  boot();
})();
