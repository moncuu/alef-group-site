/* =========================================================
   ALEF GROUP — KVKK Aydınlatma Metni (açılır pencere)
   Yalnızca alt bilgideki "KVKK Aydınlatma Metni" bağlantısıyla açılır.
   Ticari unvan, MERSİS ve KEP bilgilerini aşağıdaki KVKK_COMPANY içine yazın.
   ========================================================= */

const KVKK_UPDATED = "30.10.2026";

// Şirket bilgileri: boş bırakılan alanlar metinde gösterilmez, doldurulduğunda otomatik görünür
const KVKK_COMPANY = {
  title: "",   // Tam ticari unvan, örn. "ALEF GRUP ... Ltd. Şti."
  mersis: "",  // MERSİS numarası
  kep: "",     // KEP adresi, örn. "alefgrup@hs01.kep.tr"
};

const kvkkRow = (label, value) => (value ? `<tr><th>${label}</th><td>${value}</td></tr>` : "");

function kvkkContent() {
  return `
    <p class="kvkk-lead">ALEF GROUP olarak kişisel verilerinizin güvenliğine önem veriyoruz. Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, web sitemiz ve iletişim kanallarımız aracılığıyla işlenen kişisel verileriniz hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.</p>

    <h3>1. Veri Sorumlusu</h3>
    <p>Kişisel verileriniz, veri sorumlusu sıfatıyla aşağıda bilgileri yer alan şirketimiz tarafından işlenmektedir:</p>
    <table class="kvkk-table">
      ${kvkkRow("Ticari Unvan", KVKK_COMPANY.title || COMPANY.name)}
      ${kvkkRow("MERSİS No", KVKK_COMPANY.mersis)}
      ${kvkkRow("Adres", COMPANY.address)}
      ${kvkkRow("Telefon", COMPANY.phone)}
      ${kvkkRow("E-posta", COMPANY.email)}
      ${kvkkRow("KEP Adresi", KVKK_COMPANY.kep)}
    </table>

    <h3>2. İşlenen Kişisel Veri Kategorileri</h3>
    <ul>
      <li><b>Kimlik bilgileri:</b> Ad, soyad.</li>
      <li><b>İletişim bilgileri:</b> Telefon numarası, e-posta adresi.</li>
      <li><b>Müşteri işlem bilgileri:</b> İlgilendiğiniz hizmet, talep ve mesaj içerikleri, teklif ve görüşme kayıtları.</li>
      <li><b>İşlem güvenliği bilgileri:</b> IP adresi, tarayıcı bilgileri, ziyaret tarih ve saatleri gibi sunucu kayıtları.</li>
    </ul>
    <p>Web sitemiz üzerinden özel nitelikli kişisel veri (sağlık, biyometrik veri vb.) talep edilmemektedir. Mesaj alanına bu tür bilgiler yazmamanızı rica ederiz.</p>

    <h3>3. Kişisel Verilerin İşlenme Amaçları</h3>
    <ul>
      <li>Teklif, bilgi ve görüşme taleplerinizin alınması, değerlendirilmesi ve size dönüş yapılması,</li>
      <li>Talebinizin ilgili iştirakimize (sigorta, bilişim, palet üretimi, madeni yağ, site yönetimi) yönlendirilmesi,</li>
      <li>Sözleşme öncesi görüşmelerin yürütülmesi ve sözleşmenin kurulması,</li>
      <li>Müşteri ilişkilerinin yönetimi ve hizmet kalitesinin artırılması,</li>
      <li>Web sitesinin güvenliğinin sağlanması ve teknik işleyişinin sürdürülmesi,</li>
      <li>Mevzuattan kaynaklanan yükümlülüklerin yerine getirilmesi ve yetkili kurumlara bilgi verilmesi.</li>
    </ul>

    <h3>4. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h3>
    <p>Kişisel verileriniz; web sitemizdeki iletişim formu, WhatsApp, telefon ve e-posta kanalları aracılığıyla, kısmen otomatik yollarla elektronik ortamda toplanmaktadır. Verileriniz KVKK'nın 5. maddesinde yer alan aşağıdaki hukuki sebeplere dayanılarak işlenir:</p>
    <ul>
      <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (md. 5/2-c),</li>
      <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması (md. 5/2-ç),</li>
      <li>Bir hakkın tesisi, kullanılması veya korunması için zorunlu olması (md. 5/2-e),</li>
      <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için zorunlu olması (md. 5/2-f).</li>
    </ul>
    <p>Pazarlama ve kampanya bildirimleri gibi yukarıdaki sebeplere dayanmayan işlemler için ayrıca açık rızanız alınır.</p>

    <h3>5. Kişisel Verilerin Aktarılması</h3>
    <p>Kişisel verileriniz, yukarıdaki amaçlarla sınırlı ve ölçülü olmak kaydıyla aşağıdaki alıcı gruplarına aktarılabilir:</p>
    <ul>
      <li><b>Grup şirketlerimiz ve iştiraklerimiz:</b> Talebinizin ilgili olduğu hizmeti sunan iştirakimize,</li>
      <li><b>İş ortaklarımız:</b> Sigorta teklifi talepleriniz için anlaşmalı sigorta şirketlerine,</li>
      <li><b>Hizmet sağlayıcılarımız:</b> Barındırma (hosting), e-posta ve bilgi teknolojileri hizmeti aldığımız firmalara,</li>
      <li><b>Yetkili kamu kurum ve kuruluşları:</b> Kanunen yetkili mercilerin talebi halinde.</li>
    </ul>
    <p><b>Yurt dışına aktarım:</b> İletişim formu talebinizi WhatsApp uygulaması üzerinden iletmektedir. WhatsApp'ı kullanmayı tercih etmeniz halinde mesajınız, sunucuları yurt dışında bulunan WhatsApp LLC (Meta Platforms) altyapısı üzerinden iletilir. Bu aktarım KVKK'nın 9. maddesi kapsamında gerçekleştirilir. Yurt dışı aktarım istemiyorsanız bize telefon veya e-posta ile de ulaşabilirsiniz.</p>

    <h3>6. Saklama Süresi</h3>
    <p>Kişisel verileriniz, işlenme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanır. Sözleşmeye dönüşmeyen teklif ve bilgi talepleri en fazla <b>2 yıl</b> süreyle saklanır. Süre sonunda verileriniz silinir, yok edilir veya anonim hale getirilir.</p>

    <h3>7. İlgili Kişi Olarak Haklarınız (KVKK md. 11)</h3>
    <p>Şirketimize başvurarak;</p>
    <ul>
      <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
      <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
      <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
      <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
      <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
      <li>KVKK'nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
      <li>Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
      <li>İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
      <li>Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
    </ul>
    <p>haklarına sahipsiniz.</p>

    <h3>8. Başvuru Yöntemi</h3>
    <p>Haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'e uygun olarak;</p>
    <ul>
      <li>Kimliğinizi tespit edici belgelerle birlikte <b>${COMPANY.address}</b> adresine şahsen veya noter aracılığıyla,</li>
      ${KVKK_COMPANY.kep ? `<li>Kayıtlı elektronik posta (KEP) adresinize, güvenli elektronik imza veya mobil imza ile <b>${KVKK_COMPANY.kep}</b> adresine,</li>` : ""}
      <li>Sistemimizde kayıtlı e-posta adresinizden <b>${COMPANY.email}</b> adresine</li>
    </ul>
    <p>iletebilirsiniz. Başvurunuzda ad, soyad, T.C. kimlik numarası (yabancılar için uyruk ve pasaport numarası), tebligata esas adres, varsa e-posta ve telefon bilgileriniz ile talep konunuzun bulunması gerekir. Talepleriniz en geç <b>30 gün</b> içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi halinde Kişisel Verileri Koruma Kurulu'nca belirlenen ücret alınabilir.</p>

    <p class="kvkk-date">Son güncelleme: ${KVKK_UPDATED}</p>`;
}

function openKvkk() {
  let dialog = document.getElementById("kvkkDialog");
  if (!dialog) {
    document.body.insertAdjacentHTML("beforeend", `
      <dialog class="kvkk-dialog" id="kvkkDialog" aria-labelledby="kvkkTitle">
        <div class="kvkk-head">
          <div>
            <span class="eyebrow">Kişisel Verilerin Korunması</span>
            <h2 id="kvkkTitle">KVKK Aydınlatma Metni</h2>
          </div>
          <button class="kvkk-close" type="button" aria-label="Kapat">${icon("x")}</button>
        </div>
        <div class="kvkk-body">${kvkkContent()}</div>
        <div class="kvkk-foot">
          <button class="btn btn--dark" type="button" data-kvkk-close>Okudum, Kapat</button>
        </div>
      </dialog>`);
    dialog = document.getElementById("kvkkDialog");
    lucide.createIcons();

    const close = () => dialog.close();
    dialog.querySelector(".kvkk-close").addEventListener("click", close);
    dialog.querySelector("[data-kvkk-close]").addEventListener("click", close);
    // Pencerenin dışına (karartılmış alana) tıklanınca kapat
    dialog.addEventListener("click", (e) => { if (e.target === dialog) close(); });
    dialog.addEventListener("close", () => { document.body.style.overflow = ""; });
  }
  dialog.querySelector(".kvkk-body").scrollTop = 0;
  document.body.style.overflow = "hidden";
  dialog.showModal();
}

document.querySelectorAll("[data-open-kvkk]").forEach((btn) => btn.addEventListener("click", openKvkk));
