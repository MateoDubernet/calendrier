import { getAllEvents } from "./model/event.js";
import { generateCalendarBody, calendarHeaderComponent, changeCalendarDate } from "./model/calendar.js";
const { ipcRenderer } = require("electron");
const result = document.getElementById('result');
let events = [];
let eventId;
let date = new Date();
export function displayAllEvents() {
    getAllEvents().then((data) => {
        events = [...data];
        if (result) {
            result.innerHTML = "";
            for (let i in events) {
                let ligne = document.createElement("tr");
                let caseId = document.createElement("td");
                let caseDate_deb = document.createElement("td");
                let caseDate_fin = document.createElement("td");
                let caseTitre = document.createElement("td");
                let caseLocalisation = document.createElement("td");
                let caseCategorie = document.createElement("td");
                let caseStatut = document.createElement("td");
                let caseDescription = document.createElement("td");
                let caseNbMaj = document.createElement("td");
                let details = document.createElement("td");
                let detailButton = document.createElement("button");
                let idEnCours = events[i].id;
                caseId.innerHTML = idEnCours ? idEnCours.toString() : "";
                caseDate_deb.innerHTML = formatDateFR(events[i].date_deb);
                caseDate_fin.innerHTML = formatDateFR(events[i].date_fin);
                caseTitre.innerHTML = events[i].titre;
                caseLocalisation.innerHTML = events[i].localisation;
                caseCategorie.innerHTML = events[i].categorie;
                caseStatut.innerHTML = events[i].statut;
                caseDescription.innerHTML = events[i].description;
                caseNbMaj.innerHTML = events[i].nbMaj.toString();
                detailButton.innerHTML = "Info";
                details.appendChild(detailButton);
                ligne.appendChild(caseId);
                ligne.appendChild(caseDate_deb);
                ligne.appendChild(caseDate_fin);
                ligne.appendChild(caseTitre);
                ligne.appendChild(caseLocalisation);
                ligne.appendChild(caseCategorie);
                ligne.appendChild(caseStatut);
                ligne.appendChild(caseDescription);
                ligne.appendChild(caseNbMaj);
                ligne.appendChild(details);
                result.appendChild(ligne);
                viewEventDetails(detailButton, idEnCours ? idEnCours : 0);
            }
        }
        generateCalendarBody(date, events);
        calendarHeaderComponent(date);
        changeCalendarDate(date);
    }).catch(err => {
        throw new Error(err.message);
    });
}
export function formatDateFR(dateValue) {
    const date = new Date(dateValue);
    return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', ' à');
}
export function viewEventDetails(detailButton, id) {
    detailButton.addEventListener('click', (clickEvent) => {
        eventId = id;
        clickEvent.preventDefault();
        ipcRenderer.send('activate', eventId);
    });
}
export function refreshCalendar(event, edit) {
    event.preventDefault();
    ipcRenderer.send('refresh', edit);
}
displayAllEvents();
//# sourceMappingURL=renderer.js.map