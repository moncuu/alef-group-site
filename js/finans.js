/* =========================================================
   ALEF GROUP — Finansal Çözümler: örnek ödeme planı hesaplayıcı
   ========================================================= */
(function () {
  const amountInput = document.getElementById("calcAmount");
  if (!amountInput) return;
  const amountOut = document.getElementById("calcAmountOut");
  const summary = document.getElementById("calcSummary");
  const table = document.getElementById("calcTable");
  const tabs = document.querySelectorAll(".seg [data-model]");

  const usd = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const money = (n) => (n ? usd.format(Math.round(n)) : "—");

  const MODELS = {
    teminatsiz: { fee: 0.01, sblc: 2.5, cash: 0, consult: 0.07, months: 24, rate: 0.15 },
    teminatli:  { fee: 0.01, sblc: 1.3, cash: 0.30, consult: 0.07, months: 36, rate: 0.0599,
                  drawMonths: 11, graceEnd: 25 },
  };
  let model = "teminatsiz";

  function scheduleTeminatsiz(P, m) {
    const r = m.rate / 12;
    const pmt = (P * r) / (1 - Math.pow(1 + r, -m.months));
    const rows = [
      { ay: "", donem: "Başlangıç", odeme: P * m.fee, not: "Dosya masrafı" },
      { ay: "", donem: "Başlangıç", info: P * m.sblc, not: "SBLC teminatı" },
      { ay: "", donem: "Finansman", kullanim: P, kalan: P, not: "Finansman ödemesi" },
      { ay: "", donem: "Danışmanlık", odeme: P * m.consult, kalan: P, not: "Danışmanlık ücreti" },
    ];
    let bal = P;
    for (let i = 1; i <= m.months; i++) {
      const faiz = bal * r;
      const anapara = i === m.months ? bal : pmt - faiz;
      bal -= anapara;
      rows.push({ ay: i, donem: "Geri ödeme", faiz, anapara, odeme: faiz + anapara, kalan: Math.max(bal, 0), not: "Anapara ve faiz ödemesi" });
    }
    rows.push({ ay: "", donem: "Kapanış", kalan: 0, not: "Dosya kapanışı ve SBLC iadesi", close: true });
    return rows;
  }

  function scheduleTeminatli(P, m) {
    const r = m.rate / 12;
    const draw = P / m.drawMonths;
    const repayMonths = m.months - m.graceEnd;
    const principal = P / repayMonths;
    const release = (P * m.cash) / repayMonths;
    const rows = [
      { ay: "", donem: "Ön hazırlık", odeme: P * m.fee, not: "Dosya masrafı" },
      { ay: "", donem: "Başlangıç", info: P * m.cash, not: "Nakdi teminat (bloke hesap)" },
      { ay: "", donem: "Başlangıç", info: P * m.sblc, not: "SBLC teminatı" },
    ];
    let bal = 0;
    for (let i = 1; i <= m.months; i++) {
      const faiz = bal * r;
      if (i <= m.drawMonths) {
        bal += draw;
        rows.push({ ay: i, donem: "Finansman", kullanim: draw, faiz, odeme: faiz, kalan: bal, not: "Finansman dönemi taksit bedeli" });
        if (i === 2) rows.push({ ay: "", donem: "Finansman", odeme: P * m.consult, kalan: bal, not: "Danışmanlık ücreti" });
      } else if (i <= m.graceEnd) {
        rows.push({ ay: i, donem: "Ödemesiz dönem", faiz, odeme: faiz, kalan: bal, not: "Ödemesiz dönem faiz bedeli" });
      } else {
        const anapara = i === m.months ? bal : principal;
        bal -= anapara;
        rows.push({ ay: i, donem: "Geri ödeme", faiz, anapara, odeme: faiz + anapara, kalan: Math.max(bal, 0), iade: release, not: "Anapara + faiz, nakdi teminat iadesi" });
      }
    }
    rows.push({ ay: "", donem: "Kapanış", kalan: 0, not: "Dosya kapanışı ve SBLC iadesi", close: true });
    return rows;
  }

  function render() {
    const P = Number(amountInput.value);
    const m = MODELS[model];
    amountOut.textContent = usd.format(P);
    const rows = model === "teminatsiz" ? scheduleTeminatsiz(P, m) : scheduleTeminatli(P, m);
    const totalPay = rows.reduce((s, r) => s + (r.odeme || 0), 0);
    const totalFaiz = rows.reduce((s, r) => s + (r.faiz || 0), 0);
    const monthly = rows.filter((r) => r.donem === "Geri ödeme").map((r) => r.odeme);

    const cards = [
      ["Dosya Masrafı", money(P * m.fee)],
      ["SBLC Teminatı", money(P * m.sblc)],
      m.cash ? ["Nakdi Teminat", money(P * m.cash)] : null,
      ["Danışmanlık Ücreti", money(P * m.consult)],
      [model === "teminatsiz" ? "Aylık Taksit" : "Geri Ödeme Taksiti (ort.)", money(monthly.reduce((a, b) => a + b, 0) / monthly.length)],
      ["Toplam Faiz", money(totalFaiz)],
      ["Toplam Ödeme", money(totalPay)],
    ].filter(Boolean);
    summary.innerHTML = cards.map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join("");

    const hasIade = model === "teminatli";
    table.innerHTML = `
      <thead><tr><th>Ay</th><th>Dönem</th><th>Finansman Kullanımı</th><th>Faiz</th><th>Anapara</th><th>Ödeme</th><th>Kalan Anapara</th>${hasIade ? "<th>Teminat İadesi</th>" : ""}<th>Açıklama</th></tr></thead>
      <tbody>${rows.map((r) => `
        <tr class="${r.ay === "" ? "is-meta" : ""}${r.close ? " is-close" : ""}${r.donem === "Ödemesiz dönem" ? " is-grace" : ""}">
          <td>${r.ay}</td><td>${r.donem}</td>
          <td>${r.kullanim ? money(r.kullanim) : r.info ? `<span class="muted">${money(r.info)}</span>` : "—"}</td>
          <td>${money(r.faiz)}</td><td>${money(r.anapara)}</td><td><b>${money(r.odeme)}</b></td>
          <td>${r.kalan === 0 ? usd.format(0) : money(r.kalan)}</td>
          ${hasIade ? `<td>${money(r.iade)}</td>` : ""}
          <td>${r.not}</td>
        </tr>`).join("")}</tbody>`;
  }

  tabs.forEach((btn) => btn.addEventListener("click", () => {
    model = btn.dataset.model;
    tabs.forEach((b) => b.setAttribute("aria-selected", b === btn));
    render();
  }));
  amountInput.addEventListener("input", render);
  render();
})();
