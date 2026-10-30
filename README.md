# ALEF GROUP — Kurumsal Web Sitesi

Statik (HTML + CSS + JS) kurumsal site. Kurulum gerektirmez.

## Yerelde çalıştırmak
Proje klasöründe terminale şunlardan birini yazın (Node.js gerekir, ek paket gerekmez):

```
npm start
```
veya
```
.\calistir
```

Site her zaman **http://localhost:8182** adresinde açılır ve tarayıcı kendiliğinden başlar.
Terminal, telefondan test için yerel ağ adresini de gösterir. Durdurmak için `Ctrl+C`.
Port `server.js` içindeki `PORT` satırından değiştirilebilir.

## Yayınlamak
Klasörü herhangi bir hosting'e (cPanel, Netlify, Vercel vb.) yükleyin. `server.js`, `package.json` ve `calistir.bat` yalnızca yerel test içindir.

## Yapı
| Dosya | Sayfa |
|---|---|
| `index.html` | Ana sayfa — "Alef Finansal Çözümler" paneli tıklanınca 5 kart açılır |
| `sigorta.html` | Sigorta Acenteliği & Alacak Yönetimi |
| `bilisim.html` | Yapay Zeka, Bilişim & Yazılım |
| `palet.html` | Ahşap Palet Üretimi |
| `otomotiv.html` | Otomotiv & Madeni Yağ (Yokohama Motor Oil) |
| `site-yonetimi.html` | Site Yönetimi, Güvenlik & Temizlik |
| `css/style.css` | Tüm tasarım (renkler en üstteki `:root` içinde) |
| `js/main.js` | Ortak menü, footer, iletişim formu; **şirket bilgileri `COMPANY` içinde** |
| `assets/videos/` | Arka plan videoları (Mixkit, ticari kullanım serbest) |
| `assets/img/` | Video kapak görselleri ve favicon |

## Güncellenmesi gerekenler
- `js/main.js` → `COMPANY` (telefon, e-posta, adres) ve sosyal medya linkleri (`href="#"`)
- `index.html` → istatistikler (20+, 1.500+, 350+, 81) ve sertifika şeridi örnek değerlerdir, gerçek verilerle değiştirin.
- Videoları değiştirmek için aynı isimle `assets/videos/` klasörüne yeni `.mp4` koymanız yeterli.

## Notlar
- İletişim formu, talebi WhatsApp mesajı olarak hazırlar (sunucu gerekmez).
- İkonlar (Lucide) ve yazı tipleri (Google Fonts) internetten yüklenir.
