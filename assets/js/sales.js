// =============================================
//  WinStore Note — sales.js
//  အရောင်း Logic + Accordion Render
// =============================================

let salesRecords = [];

function setSalesRecords(data) {
    salesRecords = data;
}

function renderSalesPage() {
    renderSalesSummaryCards();
    renderSalesTable();
}

// ── Item အလိုက် summary cards (accordion) ──
function renderSalesSummaryCards() {
    const container = document.getElementById('sales-summary-cards');
    if (!container) return;

    // Item တစ်ခုချင်းစီ group လုပ်
    const groups = {};
    salesRecords.forEach(r => {
        if (!groups[r.item]) groups[r.item] = [];
        groups[r.item].push(r);
    });

    if (Object.keys(groups).length === 0) {
        container.innerHTML = '<div class="empty-text">မှတ်တမ်း မရှိသေးပါ</div>';
        return;
    }

    container.innerHTML = Object.entries(groups).map(([itemName, records]) => {
        const totalAmt  = records.reduce((s, r) => s + Number(r.total), 0);
        const totalQty  = buildQtySummary(records);
        const rowsHtml  = records.map(r => `
            <div class="acc-detail-row">
                <span class="acc-date">${WinStoreCalendar.formatDisplay(r.date)}</span>
                <span class="acc-qty">${r.qty}</span>
                <span class="acc-amt">${Number(r.total).toLocaleString()} ကျပ်</span>
            </div>
        `).join('');

        return `
        <div class="acc-card" id="acc-sell-${itemName}">
            <div class="acc-header" onclick="toggleAccordion('acc-sell-${itemName}')">
                <div class="acc-header-left">
                    <div class="acc-item-name">${itemName}</div>
                    <div class="acc-totals">
                        <span class="acc-qty-total">${totalQty}</span>
                        <span class="acc-divider">|</span>
                        <span class="acc-amt-total">${totalAmt.toLocaleString()} ကျပ်</span>
                    </div>
                </div>
                <div class="acc-chevron">▼</div>
            </div>
            <div class="acc-body">
                <div class="acc-detail-header">
                    <span>ရက်စွဲ</span>
                    <span>အရေအတွက်</span>
                    <span>ကျသင့်ငွေ</span>
                </div>
                ${rowsHtml}
            </div>
        </div>`;
    }).join('');
}

// ── Qty ကို unit အလိုက် ပေါင်းပြ ──
function buildQtySummary(records) {
    const map = {};
    records.forEach(r => {
        const parts = r.qty.split(' ');
        const num   = parseFloat(parts[0]) || 0;
        const unit  = parts.slice(1).join(' ') || '';
        map[unit]   = (map[unit] || 0) + num;
    });
    return Object.entries(map).map(([unit, total]) => `${total} ${unit}`).join(', ');
}

// ── Accordion toggle ──
function toggleAccordion(id) {
    const card = document.getElementById(id);
    if (!card) return;
    card.classList.toggle('open');
}

// ── Grand total table ──
function renderSalesTable() {
    const tbody = document.getElementById('sales-table-body');
    const totalEl = document.getElementById('total-sales-amount');
    if (!tbody) return;

    const total = salesRecords.reduce((s, r) => s + Number(r.total), 0);
    if (totalEl) totalEl.textContent = total.toLocaleString();

    if (salesRecords.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-td">မှတ်တမ်း မရှိသေးပါ</td></tr>';
        return;
    }

    tbody.innerHTML = [...salesRecords].reverse().map(r => `
        <tr>
            <td>${WinStoreCalendar.formatDisplay(r.date)}</td>
            <td>${r.item}</td>
            <td>${r.qty}</td>
            <td>${Number(r.total).toLocaleString()}</td>
        </tr>
    `).join('');
}
