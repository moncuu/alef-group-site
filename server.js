/* =========================================================
   ALEF GRUP — Yerel geliştirme sunucusu
   Çalıştırma: npm start  (veya .\calistir)
   Adres:      http://localhost:8182
   ========================================================= */

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const PORT = Number(process.env.PORT) || 8182;
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};

// Güvenlik başlıkları (yerelde HTTP kullanıldığı için HSTS / upgrade-insecure-requests yok;
// canlı ortam başlıkları _headers dosyasındadır)
const SECURITY_HEADERS = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data:",
    "media-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

// Yalnızca bu klasörler ve kökteki .html sayfaları yayınlanır;
// server.js, package.json, .git, .claude gibi dosyalar asla sunulmaz.
const PUBLIC_DIRS = ["assets", "css", "js"];
const isPublic = (rel) => {
  const parts = rel.split(path.sep);
  if (parts.some((p) => p.startsWith("."))) return false;
  if (parts.length === 1) return path.extname(rel).toLowerCase() === ".html";
  return PUBLIC_DIRS.includes(parts[0].toLowerCase()) &&Boolean(TYPES[path.extname(rel).toLowerCase()]);
};

const send = (res, code, text, extra = {}) => {
  res.writeHead(code, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8", ...extra });
  res.end(text);
};

// Yavaş/bağlantıyı açık tutan isteklere (slowloris) karşı zaman aşımları.
// connectionsCheckingInterval, zaman aşımlarının ne sıklıkla denetlendiğini belirler (varsayılan 30 sn).
const server = http.createServer({
  headersTimeout: 10000,
  requestTimeout: 30000,
  connectionsCheckingInterval: 2000,
}, (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(res, 405, "405 - İzin verilmeyen istek", { Allow: "GET, HEAD" });
  }

  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    return send(res, 400, "400 - Geçersiz adres");
  }
  if (urlPath.includes("\0")) return send(res, 400, "400 - Geçersiz adres");
  if (urlPath.endsWith("/")) urlPath += "index.html";

  const file = path.resolve(ROOT, "." + urlPath);
  const rel = path.relative(ROOT, file);
  // Proje klasörünün dışına çıkılmasını ve gizli/iç dosyaların okunmasını engelle
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel) || !isPublic(rel)) {
    return send(res, 404, "404 - Sayfa bulunamadı");
  }

  let stat;
  try {
    stat = fs.statSync(file);
  } catch {
    return send(res, 404, "404 - Sayfa bulunamadı");
  }
  if (!stat.isFile()) return send(res, 404, "404 - Sayfa bulunamadı");

  const size = stat.size;
  const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
  const headers = { ...SECURITY_HEADERS, "Content-Type": type, "Accept-Ranges": "bytes",
    // HTML her seferinde tazelenir; görsel, video, font, css ve js 30 gün önbellekte kalır (Cloudflare kenarında da)
    "Cache-Control": rel.endsWith(".html") ? "no-cache" : "public, max-age=2592000" };

  const stream = (opts) => {
    if (req.method === "HEAD") return res.end();
    const rs = fs.createReadStream(file, opts);
    rs.on("error", () => res.destroy());
    rs.pipe(res);
  };

  // Videoların ileri/geri sarılabilmesi için parça parça gönderim
  // Anlaşılamayan veya çok parçalı aralıklar yok sayılır ve dosyanın tamamı gönderilir (RFC 9110).
  const m = /^bytes=(\d*)-(\d*)$/.exec((req.headers.range || "").trim());
  if (m && (m[1] !== "" || m[2] !== "")) {
    let start, end;
    if (m[1] !== "") { start = Number(m[1]); end = m[2] !== "" ? Math.min(Number(m[2]), size - 1) : size - 1; }
    else { start = Math.max(size - Number(m[2]), 0); end = size - 1; }
    if (start > end || start >= size) {
      return send(res, 416, "416 - Geçersiz aralık", { "Content-Range": `bytes */${size}` });
    }
    res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
    return stream({ start, end });
  }

  res.writeHead(200, { ...headers, "Content-Length": size });
  stream();
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n  ✗ ${PORT} portu zaten kullanımda. Site muhtemelen zaten açık: http://localhost:${PORT}`);
    console.error("    Eski sunucuyu kapatmak için onun terminalinde Ctrl+C'ye basın.\n");
  } else {
    console.error(err);
  }
  process.exit(1);
});

server.listen(PORT, "0.0.0.0", () => {
  // Sanal ağ kartlarını (VirtualBox 192.168.56.x, VMware, Hyper-V, WSL) atla; Wi-Fi'yi öncelikle
  const candidates = Object.entries(os.networkInterfaces())
    .filter(([name]) => !/virtual|vbox|vmware|vethernet|hyper-v|wsl|loopback/i.test(name))
    .flatMap(([name, list]) => list.map((i) => ({ ...i, name })))
    .filter((i) => i.family === "IPv4" && !i.internal && !i.address.startsWith("192.168.56."));
  const lan = candidates.find((i) => /wi-?fi|wlan|wireless/i.test(i.name)) || candidates[0];

  console.log("\n  ALEF GRUP sitesi çalışıyor\n");
  console.log(`  Bilgisayar : http://localhost:${PORT}`);
  if (lan) console.log(`  Telefon    : http://${lan.address}:${PORT}  (aynı Wi-Fi ağında)`);
  console.log("\n  Durdurmak için Ctrl+C\n");

  if (!process.argv.includes("--no-open")) {
    const url = `http://localhost:${PORT}`;
    const cmd = process.platform === "win32" ? `start "" "${url}"` : process.platform === "darwin" ? `open ${url}` : `xdg-open ${url}`;
    exec(cmd);
  }
});
