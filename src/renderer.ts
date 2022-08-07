import { getAllEvents } from "./model/event.js";
import { Events } from './interfaces/events';
import { generateCalendarBody, calendarHeaderComponent, changeCalendarDate } from "./model/calendar.js";
const { ipcRenderer } = require("electron")

const result = document.getElementById('result');

let events: Events[] = [];
let event: Events;
let eventId: number;

let date = new Date()
date.setMonth(7)

export function displayAllEvents(){
    getAllEvents().then((data: Events[]) => {
        events = [...data]
        if(result){
            result.innerHTML = "";
            for(let i in events){
                let ligne = document.createElement("tr")
                let caseId = document.createElement("td")
                let caseDate_deb = document.createElement("td")
                let caseDate_fin = document.createElement("td")
                let caseTitre = document.createElement("td")
                let caseLocation = document.createElement("td")
                let caseCategorie = document.createElement("td")
                let caseStatut = document.createElement("td")
                let caseDescription = document.createElement("td")
                let caseTransparence = document.createElement("td")
                let caseNbMaj = document.createElement("td")
                let details = document.createElement("td")
                let detailButton = document.createElement("button");

                let idEnCours = events[i].id
                caseId.innerHTML = idEnCours.toString()

                caseDate_deb.innerHTML = events[i].date_deb.toString()
                caseDate_fin.innerHTML = events[i].date_fin.toString()
                caseTitre.innerHTML = events[i].titre
                caseLocation.innerHTML = events[i].location
                caseCategorie.innerHTML = events[i].categorie
                caseStatut.innerHTML = events[i].statut
                caseDescription.innerHTML = events[i].description
                caseTransparence.innerHTML = events[i].transparence
                caseNbMaj.innerHTML = events[i].nbMaj.toString()
                detailButton.innerHTML = "Info"

                details.appendChild(detailButton)

                ligne.appendChild(caseId)
                ligne.appendChild(caseDate_deb)
                ligne.appendChild(caseDate_fin)
                ligne.appendChild(caseTitre)
                ligne.appendChild(caseLocation)
                ligne.appendChild(caseCategorie)
                ligne.appendChild(caseStatut)
                ligne.appendChild(caseDescription)
                ligne.appendChild(caseTransparence)
                ligne.appendChild(caseNbMaj)
                ligne.appendChild(details)
                result.appendChild(ligne)

                viewEventDetails(detailButton, idEnCours)
            }
        }

        generateCalendarBody(date, events);
        calendarHeaderComponent(date);
        changeCalendarDate(date);

    }).catch(err => {
        throw new Error(err.message)
    })
}

export function viewEventDetails(detailButton: HTMLElement, id: number){
    detailButton.addEventListener('click', (e) => {
        eventId = id;
        
        e.preventDefault()
        ipcRenderer.send('activate', eventId)
    })
}

ipcRenderer.on('editEvent', function (event: Event, events: Events) {
    console.log(events);
    
})

displayAllEvents()





