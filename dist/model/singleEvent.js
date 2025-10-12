import { getEventById } from "./event.js";
import { deleteEvent } from './event.js';
import { formatDateFR, refreshCalendar } from '../renderer.js';
const { ipcRenderer } = require("electron");
const soloEvent = document.getElementById('soloEvent');
const modifButton = document.getElementById('modifButton');
const suppButton = document.getElementById('suppButton');
let events = [];
let eventId;
ipcRenderer.on('activate', (event, id) => {
    eventId = id;
    displayEvent();
});
export function displayEvent() {
    getEventById(eventId).then((data) => {
        events = data;
        if (soloEvent && events.length > 0) {
            const event = events[0];
            soloEvent.innerHTML = "";
            const fields = [
                ["Id", event.id ? event.id.toString() : ""],
                ["Date début", formatDateFR(event.date_deb)],
                ["Date fin", formatDateFR(event.date_fin)],
                ["Titre", event.titre],
                ["Localisation", event.localisation],
                ["Catégorie", event.categorie],
                ["Statut", event.statut],
                ["Description", event.description],
                ["Nb Maj", event.nbMaj.toString()],
            ];
            fields.forEach(([label, value]) => {
                const row = document.createElement("tr");
                const cellLabel = document.createElement("td");
                const cellValue = document.createElement("td");
                cellLabel.innerHTML = label;
                cellValue.innerHTML = value;
                row.appendChild(cellLabel);
                row.appendChild(cellValue);
                soloEvent.appendChild(row);
            });
        }
    });
}
function openForm() {
    if (modifButton) {
        modifButton.addEventListener('click', (clickEvent) => {
            clickEvent.preventDefault();
            ipcRenderer.send('formWindow', events);
        });
    }
}
function deleteSelectEvent() {
    if (suppButton)
        suppButton.addEventListener('click', (clickEvent) => {
            if (window.confirm("Voulez vous vraiment supprimer l'événement ?")) {
                deleteEvent(eventId).then(() => {
                    refreshCalendar(clickEvent, false);
                }).catch(err => {
                    throw new Error(err.message);
                });
            }
        });
}
openForm();
deleteSelectEvent();
//# sourceMappingURL=singleEvent.js.map