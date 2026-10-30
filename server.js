/* =========================================================
   ALEF GROUP — Yerel geliştirme sunucusu
   Çalıştırma: npm start  (veya .\calistir)
   Adres:      http://localhost:8182
   ========================================================= */

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const PORT = 8182;
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

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath.endsWith("/")) urlPath += "index.html";

  const file = path.normalize(path.join(ROOT, urlPath));
  // Proje klasörünün dışına çıkılmasını engelle
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("404 - Sayfa bulunamadı");
  }

  const size = fs.statSync(file).size;
  const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
  const headers = { "Content-Type": type, "Accept-Ranges": "bytes", "Cache-Control": "no-cache" };

  // Videoların ileri/geri sarılabilmesi için parça parça gönderim
  const range = req.headers.range;
  if (range) {
    const [s, e] = range.replace("bytes=", "").split("-");
    const start = Number(s);
    const end = e ? Number(e) : size - 1;
    res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
    return fs.createReadStream(file, { start, end }).pipe(res);
  }

  res.writeHead(200, { ...headers, "Content-Length": size });
  fs.createReadStream(file).pipe(res);
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

  console.log("\n  ALEF GROUP sitesi çalışıyor\n");
  console.log(`  Bilgisayar : http://localhost:${PORT}`);
  if (lan) console.log(`  Telefon    : http://${lan.address}:${PORT}  (aynı Wi-Fi ağında)`);
  console.log("\n  Durdurmak için Ctrl+C\n");

  if (!process.argv.includes("--no-open")) {
    const url = `http://localhost:${PORT}`;
    const cmd = process.platform === "win32" ? `start "" "${url}"` : process.platform === "darwin" ? `open ${url}` : `xdg-open ${url}`;
    exec(cmd);
  }
});
