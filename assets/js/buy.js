// =============================================
//  WinStore Note — buy.js
//  အဝယ် Logic + Render
// =============================================

let buyRecords = [];

function setBuyRecords(data) {
    buyRecords = data;
}

function renderBuyPage() {
    renderBuyTable();
}

function renderBuyTable() {
    const tbody  = document.getElementById('buy-table-body');
    const totalEl = document.getElementById('total-buy-amount');
    if (!tbody) return;

    const total = buyRecords.reduce((s, r) => s + Number(r.total), 0);
    if (totalEl) totalEl.textContent = total.toLocaleString();

    if (buyRecords.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-td">မှတ်တမ်း မရှိသေးပါ</td></tr>';
        return;
    }

    tbody.innerHTML = [...buyRecords].reverse().map(r => `
        <tr>
            <td>${WinStoreCalendar.formatDisplay(r.date)}</td>
            <td>${r.item}</td>
            <td>${r.qty}</td>
            <td>${Number(r.total).toLocaleString()}</td>
        </tr>
    `).join('');
}
