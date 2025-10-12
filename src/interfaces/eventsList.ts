import { formatDateFR, viewEventInfo } from '../utils/utils.js';
import { Events } from '../model/event.js';

const eventList = document.getElementById('event-list');

export function generateEventGrid(events: Events[]) {
    if(!eventList) return;

    eventList.innerHTML = "";
    for(let i in events) {
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
        eventList.appendChild(ligne);

        viewEventInfo(detailButton, idEnCours ? idEnCours : 0);
    }
}