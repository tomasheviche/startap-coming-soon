(function () {
  const cfg = window.STARTAP_CONFIG || {};

  // Ссылка на бота передаёт язык сайта: t.me/<бот>?start=ru
  function tgLink() {
    const bot = String(cfg.telegramBot || "").replace(/^@/, "").trim();
    if (!bot) return cfg.telegramUrl || "#";
    const lang = window.I18N ? window.I18N.lang : "en";
    return "https://t.me/" + encodeURIComponent(bot) + "?start=" + lang;
  }
  function updateTgLinks() {
    document.querySelectorAll("[data-tg]").forEach((a) => { a.href = tgLink(); });
  }
  updateTgLinks();
  document.addEventListener("i18n:change", updateTgLinks);

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const t = (k) => (window.I18N ? window.I18N.t(k) : k);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function submitEmail(email) {
    const payload = {
      email,
      source: location.href,
      referrer: document.referrer,
      lang: window.I18N ? window.I18N.lang : "",
      browserLang: navigator.language || "",
      ts: new Date().toISOString(),
    };

    if (cfg.formEndpoint && cfg.formEndpoint.includes("script.google.com")) {
      // Google Apps Script не отвечает на CORS preflight, поэтому шлём
      // «простой» form-urlencoded запрос в режиме no-cors. Ответ прочитать
      // нельзя, но сетевые ошибки по-прежнему ловятся.
      await fetch(cfg.formEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
      });
      return;
    }

    if (!cfg.formEndpoint) {
      console.warn("[Startap] formEndpoint не задан в config.js — email сохранён только локально.");
      const list = JSON.parse(localStorage.getItem("startap_waitlist") || "[]");
      if (!list.includes(email)) list.push(email);
      localStorage.setItem("startap_waitlist", JSON.stringify(list));
      return;
    }

    const res = await fetch(cfg.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
  }

  document.querySelectorAll("[data-form]").forEach((form) => {
    const note = form.parentElement.querySelector("[data-form-note]");
    const input = form.querySelector("input[type=email]");
    const button = form.querySelector("button");

    const show = (text, type) => {
      note.textContent = text;
      note.className = "form-note " + type;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!EMAIL_RE.test(email)) {
        show(t("form.invalid"), "err");
        return;
      }

      button.disabled = true;
      button.textContent = t("form.sending");
      try {
        await submitEmail(email);
        show(t("form.ok"), "ok");
        form.reset();
      } catch (err) {
        console.error(err);
        show(t("form.error"), "err");
      } finally {
        button.disabled = false;
        button.textContent = t(button.dataset.i18n);
      }
    });
  });
})();
