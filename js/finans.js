/* =========================================================
   ALEF GRUP — Finansal Çözümler: genel geri ödeme hesaplayıcı
   Kullanıcının girdiği tutar, faiz, vade ve ödemesiz dönemle
   örnek ödeme planı çıkarır. ALEF GRUP'a ait oran veya ücret içermez.
   ========================================================= */
(function () {
  const amountInput = document.getElementById("calcAmount");
  if (!amountInput) return;

  const inputs = {
    amount: amountInput,
    rate: document.getElementById("calcRate"),
    months: document.getElementById("calcMonths"),
    grace: document.getElementById("calcGrace"),
  };
  const outputs = {
    amount: document.getElementById("calcAmountOut"),
    rate: document.getElementById("calcRateOut"),
    months: document.getElementById("calcMonthsOut"),
    grace: document.getElementById("calcGraceOut"),
  };
  const summary = document.getElementById("calcSummary");
  const table = document.getElementById("calcTable");
  const tabs = document.querySelectorAll(".seg [data-type]");

  const tl = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });
  const money = (n) => (n ? tl.format(Math.round(n)) : "—");
  let type = "annuity";

  // Ödemesiz dönemde yalnızca faiz ödenir, ardından kalan vadede anapara geri ödenir
  function schedule(P, annualRate, months, grace) {
    const r = annualRate / 100 / 12;
    const repayMonths = months - grace;
    const pmt = r === 0 ? P / repayMonths : (P * r) / (1 - Math.pow(1 + r, -repayMonths));
    const rows = [];
    let bal = P;
    for (let i = 1; i <= months; i++) {
      const faiz = bal * r;
      if (i <= grace) {
        rows.push({ ay: i, donem: "Ödemesiz dönem", faiz, anapara: 0, odeme: faiz, kalan: bal });
        continue;
      }
      const last = i === months;
      const anapara = last ? bal : type === "annuity" ? pmt - faiz : P / repayMonths;
      bal -= anapara;
      rows.push({ ay: i, donem: "Geri ödeme", faiz, anapara, odeme: faiz + anapara, kalan: Math.max(bal, 0) });
    }
    return rows;
  }

  function render() {
    // Ödemesiz dönem vadeden kısa olmalı
    inputs.grace.max = Math.min(24, Number(inputs.months.value) - 1);
    if (Number(inputs.grace.value) > Number(inputs.grace.max)) inputs.grace.value = inputs.grace.max;

    const P = Number(inputs.amount.value);
    const rate = Number(inputs.rate.value);
    const months = Number(inputs.months.value);
    const grace = Number(inputs.grace.value);

    outputs.amount.textContent = tl.format(P);
    outputs.rate.textContent = `%${rate.toLocaleString("tr-TR")}`;
    outputs.months.textContent = `${months} ay`;
    outputs.grace.textContent = grace ? `${grace} ay` : "Yok";

    const rows = schedule(P, rate, months, grace);
    const repay = rows.filter((r) => r.donem === "Geri ödeme");
    const totalFaiz = rows.reduce((s, r) => s + r.faiz, 0);
    const totalPay = rows.reduce((s, r) => s + r.odeme, 0);

    const cards = [
      [type === "annuity" ? "Aylık Taksit" : "İlk Taksit", money(repay[0].odeme)],
      type === "principal" ? ["Son Taksit", money(repay[repay.length - 1].odeme)] : null,
      grace ? ["Ödemesiz Dönem Faizi (aylık)", money(rows[0].faiz)] : null,
      ["Toplam Faiz", money(totalFaiz)],
      ["Toplam Geri Ödeme", money(totalPay)],
    ].filter(Boolean);
    summary.innerHTML = cards.map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join("");

    table.innerHTML = `
      <thead><tr><th>Ay</th><th>Dönem</th><th>Faiz</th><th>Anapara</th><th>Taksit</th><th>Kalan Anapara</th></tr></thead>
      <tbody>${rows.map((r) => `
        <tr class="${r.donem === "Ödemesiz dönem" ? "is-grace" : ""}">
          <td>${r.ay}</td><td>${r.donem}</td>
          <td>${money(r.faiz)}</td><td>${money(r.anapara)}</td><td><b>${money(r.odeme)}</b></td>
          <td>${r.kalan === 0 ? tl.format(0) : money(r.kalan)}</td>
        </tr>`).join("")}</tbody>`;
  }

  tabs.forEach((btn) => btn.addEventListener("click", () => {
    type = btn.dataset.type;
    tabs.forEach((b) => b.setAttribute("aria-selected", b === btn));
    render();
  }));
  Object.values(inputs).forEach((el) => el.addEventListener("input", render));
  render();
})();
