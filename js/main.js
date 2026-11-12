/* =========================================================
   ALEF GRUP — Ortak bileşenler ve etkileşimler
   ========================================================= */

const COMPANY = {
  name: "ALEF GRUP",
  phone: "0850 550 34 59",
  phoneHref: "tel:+908505503459",
  mobile: "+90 533 413 88 71",
  whatsapp: "905334138871",
  email: "info@alefgrup.com.tr",
  address: "Velimeşe Mah. Ertuğrul Gazi Sok. No:14, Ergene / Tekirdağ",
  maps: "https://maps.google.com/?q=Velime%C5%9Fe+Mah.+Ertu%C4%9Frul+Gazi+Sok.+No:14+Ergene+Tekirda%C4%9F",
  founded: 2007,
  instagram: "https://www.instagram.com/alefgrup.avrupa/",
  facebook: "https://www.facebook.com/profile.php?id=61558870140220",
};

const DIVISIONS = [
  {
    slug: "finans", href: "finansal-cozumler.html", icon: "landmark",
    title: "Finansal Çözümler",
    short: "Nakdi teminatlı / teminatsız SBLC finansmanı ve borç yeniden yapılandırma.",
  },
  {
    slug: "sigorta", href: "sigorta.html", icon: "shield-check",
    title: "Sigorta Acenteliği & Alacak Yönetimi",
    short: "Kasko, trafik, sağlık, DASK ve kurumsal poliçeler; profesyonel alacak takibi.",
  },
  {
    slug: "bilisim", href: "bilisim.html", icon: "cpu",
    title: "Yapay Zeka, Bilişim & Yazılım",
    short: "Yapay zeka entegrasyonu, ERP/CRM, özel yazılım, web & mobil, altyapı.",
  },
  {
    slug: "palet", href: "palet.html", icon: "package",
    title: "Ahşap Palet Üretimi",
    short: "Euro, ihracat (ISPM-15) ve özel ölçü palet üretimi; 2. el ahşap alım-satım.",
  },
  {
    slug: "otomotiv", href: "otomotiv.html", icon: "droplet",
    title: "Otomotiv & Madeni Yağ",
    short: "Yokohama Motor Oil — binek, ticari, ağır vasıta ve hidrolik yağlar.",
  },
  {
    slug: "site", href: "site-yonetimi.html", icon: "building-2",
    title: "Site Yönetimi, Güvenlik & Temizlik",
    short: "Profesyonel site yönetimi, özel güvenlik, temizlik ve teknik bakım.",
  },
];

const page = document.body.dataset.page || "home";
const icon = (name) => `<i data-lucide="${name}"></i>`;

/* ---------- Header ---------- */
function renderHeader() {
  const megaLinks = DIVISIONS.map((d) => `
    <a class="mega-link theme-${d.slug}" href="${d.href}">
      <span class="ico">${icon(d.icon)}</span>
      <span><b>${d.title}</b><span>${d.short}</span></span>
    </a>`).join("");

  const mobileLinks = DIVISIONS.map((d) => `
    <a class="sub theme-${d.slug}" href="${d.href}">${icon(d.icon)} ${d.title}</a>`).join("");

  const solid = document.body.dataset.header === "solid" ? " solid" : "";

  document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header${solid}" id="siteHeader">
      <div class="container header-inner">
        <a href="index.html" class="logo" aria-label="ALEF GRUP Ana Sayfa">
          <span class="logo-mark" aria-hidden="true">א</span>
          <span class="logo-text"><b>ALEF</b><small>Grup</small></span>
        </a>
        <nav class="main-nav" aria-label="Ana menü">
          <a href="index.html">Ana Sayfa</a>
          <a href="index.html#hakkimizda">Kurumsal</a>
          <div class="nav-drop" id="navDrop">
            <button type="button" aria-expanded="false" aria-haspopup="true">Çözümler ${icon("chevron-down")}</button>
            <div class="mega" role="menu">
              <div class="mega-intro">
                <h4>Alef Çözümler</h4>
                <p>Altı uzmanlık alanımızla bireysel ve kurumsal ihtiyaçlarınıza tek çatı altında, bütünleşik çözümler sunuyoruz.</p>
                <a href="index.html#cozumler" class="btn btn--gold" style="padding:11px 20px;margin-top:8px">Tümünü Gör ${icon("arrow-right")}</a>
              </div>
              <div class="mega-grid">${megaLinks}</div>
            </div>
          </div>
          <a href="index.html#neden-alef">Neden ALEF</a>
          <a href="#iletisim">İletişim</a>
        </nav>
        <div class="header-cta">
          <a class="header-phone" href="${COMPANY.phoneHref}">${icon("phone")} ${COMPANY.phone}</a>
          <a class="btn btn--gold" href="#iletisim">Teklif Alın</a>
          <button class="nav-toggle" id="navToggle" aria-label="Menüyü aç" aria-expanded="false"><span class="i-on">${icon("menu")}</span><span class="i-off">${icon("x")}</span></button>
        </div>
      </div>
    </header>
    <nav class="mobile-nav" id="mobileNav" aria-label="Mobil menü">
      <a href="index.html">Ana Sayfa</a>
      <a href="index.html#hakkimizda">Kurumsal</a>
      <div class="label">Alef Çözümler</div>
      ${mobileLinks}
      <a href="index.html#neden-alef">Neden ALEF</a>
      <a href="#iletisim">İletişim</a>
      <a class="btn btn--gold" href="#iletisim">Teklif Alın</a>
    </nav>`);
}

/* ---------- Footer ---------- */
function renderFooter() {
  const links = DIVISIONS.map((d) => `<li><a href="${d.href}">${d.title}</a></li>`).join("");
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-about">
            <a href="index.html" class="logo">
              <span class="logo-mark" aria-hidden="true">א</span>
              <span class="logo-text"><b>ALEF</b><small>Grup</small></span>
            </a>
            <p>Finans, sigorta, teknoloji, üretim, otomotiv ve tesis yönetimi alanlarında uzman iştirakleriyle güvenilir, bütünleşik çözümler.</p>
            <div class="socials">
              <a href="${COMPANY.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
              <a href="${COMPANY.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook")}</a>
              <a href="https://wa.me/${COMPANY.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("message-circle")}</a>
            </div>
          </div>
          <div>
            <h4>Kurumsal</h4>
            <ul>
              <li><a href="index.html#hakkimizda">Hakkımızda</a></li>
              <li><a href="index.html#cozumler">Çözümler</a></li>
              <li><a href="index.html#neden-alef">Neden ALEF</a></li>
              <li><a href="#iletisim">İletişim</a></li>
            </ul>
          </div>
          <div>
            <h4>Çözümlerimiz</h4>
            <ul>${links}</ul>
          </div>
          <div>
            <h4>İletişim</h4>
            <ul class="footer-contact">
              <li>${icon("map-pin")}<a href="${COMPANY.maps}" target="_blank" rel="noopener">${COMPANY.address}</a></li>
              <li>${icon("phone")}<a href="${COMPANY.phoneHref}">${COMPANY.phone}</a></li>
              <li>${icon("smartphone")}<a href="https://wa.me/${COMPANY.whatsapp}" target="_blank" rel="noopener">${COMPANY.mobile}</a></li>
              <li>${icon("mail")}<a href="mailto:${COMPANY.email}">${COMPANY.email}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${COMPANY.founded} ${COMPANY.name}. Tüm hakları saklıdır.</span>
          <span><button type="button" class="link-btn" data-open-kvkk>KVKK Aydınlatma Metni</button></span>
        </div>
      </div>
    </footer>
    <a class="float-wa" href="https://wa.me/${COMPANY.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın">${icon("message-circle")}</a>
    <button class="to-top" id="toTop" aria-label="Yukarı çık">${icon("arrow-up")}</button>
    <nav class="m-bar" aria-label="Hızlı iletişim">
      <a href="${COMPANY.phoneHref}">${icon("phone")} Ara</a>
      <a class="wa" href="https://wa.me/${COMPANY.whatsapp}" target="_blank" rel="noopener">${icon("message-circle")} WhatsApp</a>
      <a class="primary" href="#iletisim">Teklif Al ${icon("arrow-right")}</a>
    </nav>`);
}

/* ---------- Etkileşimler ---------- */
function initHeader() {
  const header = document.getElementById("siteHeader");
  const toTop = document.getElementById("toTop");
  let scrolled, shown, ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    if ((y > 40) !== scrolled) header.classList.toggle("scrolled", (scrolled = y > 40));
    if ((y > 700) !== shown) toTop.classList.toggle("show", (shown = y > 700));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Mega menü
  const drop = document.getElementById("navDrop");
  const dropBtn = drop.querySelector("button");
  let closeTimer;
  const setDrop = (open) => {
    drop.classList.toggle("open", open);
    dropBtn.setAttribute("aria-expanded", open);
  };
  dropBtn.addEventListener("click", () => setDrop(!drop.classList.contains("open")));
  drop.addEventListener("mouseenter", () => { clearTimeout(closeTimer); setDrop(true); });
  drop.addEventListener("mouseleave", () => { closeTimer = setTimeout(() => setDrop(false), 180); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setDrop(false); });
  document.addEventListener("click", (e) => { if (!drop.contains(e.target)) setDrop(false); });

  // Mobil menü
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("mobileNav");
  toggle.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    toggle.classList.toggle("is-off", open);
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    mobile.classList.remove("open");
    toggle.classList.remove("is-off");
    toggle.setAttribute("aria-expanded", false);
    document.body.style.overflow = "";
  }));
}

/* Videolar: ekrana yaklaşınca yüklenir ve oynar; sonra kesintisiz döngüde oynamaya devam eder. */
function initVideos() {
  const videos = [...document.querySelectorAll("video")];

  const start = (v) => {
    if (v.dataset.src && !v.dataset.loaded) {
      v.src = v.dataset.src;
      v.dataset.loaded = "1";
    }
    v.play().catch(() => {});
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) { start(target); io.unobserve(target); }
    });
  }, { rootMargin: "300px 0px" });

  videos.forEach((v) => {
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    if (v.dataset.src) io.observe(v);
  });

  // Hero video oynat/durdur düğmesi
  document.querySelectorAll("[data-video-toggle]").forEach((btn) => {
    const v = document.querySelector(btn.dataset.videoToggle);
    btn.innerHTML = `<span class="i-on">${icon("pause")}</span><span class="i-off">${icon("play")}</span>`;
    const sync = () => btn.classList.toggle("is-off", v.paused);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    btn.addEventListener("click", () => {
      if (v.paused) { delete v.dataset.paused; v.play().catch(() => {}); }
      else { v.dataset.paused = "1"; v.pause(); }
    });
  });
}

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* Sayaç animasyonu */
function initCounters() {
  // Deneyim yılı kuruluş yılından otomatik hesaplanır (data-years)
  const years = new Date().getFullYear() - COMPANY.founded;
  document.querySelectorAll("[data-years]").forEach((el) => {
    el.dataset.count = years;
    el.textContent = years;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      io.unobserve(target);
      const end = parseFloat(target.dataset.count);
      const dur = 1600;
      const start = performance.now();
      const fmt = new Intl.NumberFormat("tr-TR");
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        target.textContent = fmt.format(Math.round(end * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
}

/* Sertifika şeridi: kesintisiz kayması için öğeleri çoğalt */
function initMarquee() {
  const track = document.getElementById("certTrack");
  if (!track) return;
  const items = [...track.children];
  // Tek set ekran genişliğinden kısaysa seti tekrarla, ardından tamamını ikiye katla (-%50 döngüsü için)
  while (track.scrollWidth < window.innerWidth + 200) {
    items.forEach((el) => track.appendChild(el.cloneNode(true)));
  }
  [...track.children].forEach((el) => {
    const clone = el.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
}

function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-q").addEventListener("click", () => {
      const open = item.classList.toggle("open");
      item.querySelector(".faq-q").setAttribute("aria-expanded", open);
    });
  });
}

/* Çözümler açılır paneli (ana sayfa) */
function initSolutions() {
  const trigger = document.getElementById("finTrigger");
  const panel = document.getElementById("finPanel");
  if (!trigger || !panel) return;
  const setOpen = (open) => {
    panel.classList.toggle("open", open);
    trigger.setAttribute("aria-expanded", open);
    trigger.querySelector(".fin-open-label").textContent = open ? "Kartları Gizle" : "Çözümleri Görüntüle";
  };
  trigger.addEventListener("click", () => setOpen(!panel.classList.contains("open")));

  // #cozumler bağlantısıyla gelindiğinde paneli otomatik aç
  const openFromHash = () => {
    if (location.hash === "#cozumler") setTimeout(() => setOpen(true), 400);
  };
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
}

/* İletişim formu: talebi hazır bir WhatsApp mesajı olarak COMPANY.whatsapp hattına açar */
function initForms() {
  document.querySelectorAll("form[data-contact]").forEach((form) => {
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if (data.get("_honey")) return; // Spam botu

      const lines = [
        `Merhaba ${COMPANY.name}, web sitesi üzerinden teklif talebi:`,
        `Ad Soyad: ${data.get("name")}`,
        `Telefon: ${data.get("phone")}`,
        data.get("email") ? `E-posta: ${data.get("email")}` : "",
        `Hizmet: ${data.get("service")}`,
        data.get("message") ? `Mesaj: ${data.get("message")}` : "",
      ].filter(Boolean);
      window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");

      status.className = "form-status full show ok";
      status.textContent = "Teşekkürler! Talebiniz WhatsApp'ta hazırlandı; açılan pencerede \"Gönder\"e basmanız yeterli.";
      form.reset();
    });
  });
}

/* Ortak iletişim bölümü (her sayfanın sonunda) */
function renderContact() {
  const slot = document.getElementById("iletisim");
  if (!slot) return;
  const current = DIVISIONS.find((d) => d.slug === page);
  const options = DIVISIONS.map((d) =>
    `<option${current && current.slug === d.slug ? " selected" : ""}>${d.title}</option>`).join("");

  slot.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">İletişim</span>
        <h2>Projenizi birlikte planlayalım</h2>
        <p>Formu doldurun, uzman ekibimiz en kısa sürede size dönüş yapsın. Acil talepleriniz için bizi doğrudan arayabilirsiniz.</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info reveal">
          <a href="${COMPANY.phoneHref}"><span class="ico">${icon("phone")}</span><span><small>Çağrı Merkezi</small><b>${COMPANY.phone}</b></span></a>
          <a href="https://wa.me/${COMPANY.whatsapp}" target="_blank" rel="noopener"><span class="ico">${icon("message-circle")}</span><span><small>WhatsApp Hattı</small><b>${COMPANY.mobile}</b></span></a>
          <a href="mailto:${COMPANY.email}"><span class="ico">${icon("mail")}</span><span><small>E-posta</small><b>${COMPANY.email}</b></span></a>
          <a href="${COMPANY.maps}" target="_blank" rel="noopener"><span class="ico">${icon("map-pin")}</span><span><small>Merkez Ofis</small><b>${COMPANY.address}</b></span></a>
          <div class="item"><span class="ico">${icon("clock")}</span><span><small>Çalışma Saatleri</small><b>Pazartesi – Cuma · 08:30 – 18:00</b></span></div>
        </div>
        <form class="form reveal" data-delay="1" data-contact>
          <h3>Teklif & Bilgi Talebi</h3>
          <div class="field"><label for="f-name">Ad Soyad *</label><input id="f-name" name="name" required autocomplete="name"></div>
          <div class="field"><label for="f-phone">Telefon *</label><input id="f-phone" name="phone" type="tel" required autocomplete="tel" placeholder="05xx xxx xx xx"></div>
          <div class="field"><label for="f-email">E-posta</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
          <div class="field"><label for="f-service">İlgilendiğiniz Hizmet *</label><select id="f-service" name="service" required>${options}<option>Genel Bilgi</option></select></div>
          <div class="field full"><label for="f-msg">Mesajınız</label><textarea id="f-msg" name="message" placeholder="Kısaca ihtiyacınızı anlatın…"></textarea></div>
          <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
          <p class="note full">Kişisel verileriniz, sayfanın en altında yer alan KVKK Aydınlatma Metni kapsamında işlenir.</p>
          <label class="consent full"><input type="checkbox" name="consent" required>
            <span>Talebimin WhatsApp (Meta Platforms) altyapısı üzerinden iletilmesi nedeniyle kişisel verilerimin yurt dışına aktarılmasına açık rıza veriyorum. * <em>(Rıza vermek istemiyorsanız bize ${COMPANY.phone} numaralı hattımızdan ulaşabilirsiniz.)</em></span>
          </label>
          <div class="full"><button class="btn btn--dark" type="submit">Talebi Gönder ${icon("send")}</button></div>
          <p class="form-status full" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>`;
}

renderHeader();
renderContact();
renderFooter();
initHeader();
initVideos();
lucide.createIcons();
initReveal();
initCounters();
initMarquee();
initFaq();
initSolutions();
initForms();
