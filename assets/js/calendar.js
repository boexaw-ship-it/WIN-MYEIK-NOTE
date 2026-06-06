// =============================================
//  WinStore Note — calendar.js
//  ရက်စွဲ Helper
// =============================================

const WinStoreCalendar = {
    init: function () {
        const dateInput = document.getElementById('entry-date');
        if (dateInput) {
            dateInput.value = this.getToday();
        }
    },

    getToday: function () {
        const today = new Date();
        const yyyy  = today.getFullYear();
        const mm    = String(today.getMonth() + 1).padStart(2, '0');
        const dd    = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    },

    formatDisplay: function (dateStr) {
        if (!dateStr) return '';
        const [yyyy, mm, dd] = dateStr.split('-');
        return `${dd}/${mm}/${yyyy}`;
    }
};
