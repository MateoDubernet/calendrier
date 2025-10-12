const { ipcRenderer } = require("electron");

export function viewEventInfo(detailButton: HTMLElement, id: number) {
    detailButton.addEventListener('click', (clickEvent) => {
        clickEvent.preventDefault();
        ipcRenderer.send('activate', id);
    });
}

export function refreshCalendar(event: MouseEvent, edit: boolean) {
    event.preventDefault();
    ipcRenderer.send('refresh', edit);
}

export function formatDateFR(dateValue: Date) {
    const date = new Date(dateValue);

    return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', ' à');
}