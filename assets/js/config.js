// =============================================
//  WinStore Note — config.js
//  URL, Items, Units အားလုံး ဒီမှာ သိမ်း
// =============================================

const CONFIG = {
    WEB_APP_URL: "https://script.google.com/macros/s/AKfycbxBoTEBrwmoYfVugWOXmDQmujsKe-EYPGC6xD8tdWy6kTjqXVS0s9drRVbSM5AZgDlFJg/exec",
    SHEET_NAMES: {
        SALES: "Sales",
        BUY:   "Buy"
    }
};

const SELL_ITEMS = [
    { name: "မျှင်ငပိ",     units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ငပိထောင်း",    units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ငါးခြောက်",    units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ပုဇွန်ခြောက်", units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "သီဟိုဠ်စေ့ A",  units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "သီဟိုဠ်စေ့ B",  units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ဒူးရင်းယို",   units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ရေခူ",          units: ["ပိဿာ", "ကျပ်သား"] }
];

const BUY_ITEMS = [
    { name: "မျှင်ငပိ",          units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ငါးခြောက်",         units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ပုဇွန်ခြောက်",      units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "သီဟိုဠ်စေ့ A",       units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "သီဟိုဠ်စေ့ B",       units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ဒူးရင်းယို",        units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ရေခူ",               units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "တန်ဆာခ (Myein)",      units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "တန်ဆာခ (Taxi)",       units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "တန်ဆာခ (Delivery)",   units: ["ပိဿာ", "ကျပ်သား"] },
    { name: "ပလတ်စတစ်အိတ်",     units: ["ပါကင်"] },
    { name: "ပလတ်စတစ်ဗူး",      units: ["ဗူး"] }
];
