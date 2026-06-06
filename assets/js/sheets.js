// =============================================
//  WinStore Note — sheets.js
//  Google Sheets POST (သိမ်း) + GET (ဆွဲ)
// =============================================

function saveToSheet(data, onSuccess, onError) {
    setButtonLoading(true);

    fetch(CONFIG.WEB_APP_URL, {
        method:  "POST",
        mode:    "no-cors",
        cache:   "no-cache",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data)
    })
    .then(() => {
        showToast("✅ Google Sheets သို့ သိမ်းပြီးပါပြီ။");
        if (typeof onSuccess === 'function') onSuccess();
    })
    .catch((err) => {
        console.error("Sheets POST Error:", err);
        showToast("❌ ချိတ်ဆက်မှု မအောင်မြင်ပါ။");
        if (typeof onError === 'function') onError();
    })
    .finally(() => {
        setButtonLoading(false);
    });
}

function loadFromSheet(onSuccess) {
    fetch(CONFIG.WEB_APP_URL)
    .then(res => res.json())
    .then(data => {
        const salesRecords = data.filter(r => r.sheet === CONFIG.SHEET_NAMES.SALES);
        const buyRecords   = data.filter(r => r.sheet === CONFIG.SHEET_NAMES.BUY);
        if (typeof onSuccess === 'function') onSuccess(salesRecords, buyRecords);
    })
    .catch(err => {
        console.error("Sheets GET Error:", err);
        showToast("❌ Data ဆွဲယူ မရပါ။ Network စစ်ပါ။");
    });
}

// ── Button loading state ──
function setButtonLoading(isLoading) {
    const btn = document.getElementById("btn-submit");
    if (!btn) return;
    btn.disabled      = isLoading;
    btn.style.opacity = isLoading ? "0.7" : "1";
    btn.innerHTML     = isLoading
        ? "<span>⏳ သိမ်းဆည်းနေသည်...</span>"
        : "<span>💾 မှတ်တမ်းအသစ် သိမ်းဆည်းမည်</span>";
}

// ── Toast notification ──
function showToast(message) {
    const existing = document.getElementById("ws-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "ws-toast";
    toast.textContent = message;
    Object.assign(toast.style, {
        position:     "fixed",
        bottom:       "90px",
        left:         "50%",
        transform:    "translateX(-50%)",
        background:   "#1A2533",
        color:        "#FFFFFF",
        padding:      "12px 24px",
        borderRadius: "30px",
        fontSize:     "0.95rem",
        fontWeight:   "700",
        zIndex:       "9999",
        whiteSpace:   "nowrap",
        boxShadow:    "0 8px 24px rgba(0,0,0,0.2)"
    });

    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = "opacity 0.4s ease";
        toast.style.opacity    = "0";
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
