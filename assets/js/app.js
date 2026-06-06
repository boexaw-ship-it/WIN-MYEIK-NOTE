// =============================================
//  WinStore Note — app.js
//  Navigation + Form + Init
// =============================================

let currentType  = 'Sales';
let selectedItem = null;

// =============================================
//  NAVIGATION
// =============================================
function navigateTo(pageId) {
    document.querySelectorAll('.app-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(pageId + '-page').classList.add('active');

    const tabMap = {
        'entry'      : 'tab-entry',
        'sales-view' : 'tab-sales-view',
        'buy-view'   : 'tab-buy-view'
    };
    if (tabMap[pageId]) {
        document.getElementById(tabMap[pageId]).classList.add('active');
    }

    if (pageId === 'sales-view') renderSalesPage();
    if (pageId === 'buy-view')   renderBuyPage();
}

// =============================================
//  SWITCH — အရောင်း / အဝယ်
// =============================================
function switchEntryType(type) {
    currentType  = type;
    selectedItem = null;

    document.getElementById('card-sell').classList.toggle('active', type === 'Sales');
    document.getElementById('card-buy').classList.toggle('active', type === 'Buy');

    renderItems();
    resetStatusBanner();
}

// =============================================
//  RENDER ITEMS
// =============================================
function renderItems() {
    const container = document.getElementById('entry-items-list');
    container.innerHTML = '';

    const items = (currentType === 'Sales') ? SELL_ITEMS : BUY_ITEMS;

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-list-row';
        div.innerHTML = `<div class="item-text-main">${item.name}</div>`;
        div.onclick   = () => selectItem(item, div);
        container.appendChild(div);
    });
}

// =============================================
//  SELECT ITEM
// =============================================
function selectItem(item, element) {
    selectedItem = item;

    document.querySelectorAll('.item-list-row').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    // Unit dropdown ကို item နဲ့ တိုက်ဆိုင်တဲ့ unit တွေပဲ ပြ
    const unitSelect = document.getElementById('entry-unit');
    unitSelect.innerHTML = item.units.map(u => `<option value="${u}">${u}</option>`).join('');

    const statusEl = document.getElementById('entry-status');
    statusEl.innerText = `ရွေးချယ်ထားသည့်ပစ္စည်း: ${item.name}`;
    statusEl.classList.add('highlight');
}

// =============================================
//  SUBMIT
// =============================================
function submitForm() {
    if (!selectedItem) {
        showToast("⚠️ ပစ္စည်းတစ်ခု ရွေးပေးပါ။");
        return;
    }

    const date  = document.getElementById('entry-date').value;
    const qty   = document.getElementById('entry-qty').value.trim();
    const unit  = document.getElementById('entry-unit').value;
    const total = document.getElementById('entry-total-price').value.trim();

    if (!date) { showToast("⚠️ ရက်စွဲ ဖြည့်ပေးပါ။"); return; }
    if (!qty || parseInt(qty) <= 0) { showToast("⚠️ အရေအတွက် မှန်ကန်အောင် ဖြည့်ပေးပါ။"); return; }
    if (!total || parseInt(total) <= 0) { showToast("⚠️ ကျသင့်ငွေ ဖြည့်ပေးပါ။"); return; }

    const data = {
        sheet: currentType === 'Sales' ? CONFIG.SHEET_NAMES.SALES : CONFIG.SHEET_NAMES.BUY,
        date:  date,
        item:  selectedItem.name,
        qty:   `${qty} ${unit}`,
        total: parseInt(total)
    };

    saveToSheet(data, () => {
        resetForm();
        loadAllRecords();
    });
}

// =============================================
//  RESET
// =============================================
function resetForm() {
    document.getElementById('entry-qty').value         = '';
    document.getElementById('entry-total-price').value = '';
    selectedItem = null;
    document.querySelectorAll('.item-list-row').forEach(el => el.classList.remove('selected'));
    document.getElementById('entry-unit').innerHTML = '';
    resetStatusBanner();
}

function resetStatusBanner() {
    const statusEl = document.getElementById('entry-status');
    statusEl.innerText = 'ရွေးချယ်ထားသည့်ပစ္စည်း: မရှိသေးပါ';
    statusEl.classList.remove('highlight');
}

// =============================================
//  LOAD ALL RECORDS
// =============================================
function loadAllRecords() {
    loadFromSheet((salesData, buyData) => {
        setSalesRecords(salesData);
        setBuyRecords(buyData);
        renderSalesPage();
        renderBuyPage();
    });
}

// =============================================
//  INIT
// =============================================
window.onload = () => {
    WinStoreCalendar.init();
    renderItems();
    loadAllRecords();
};
