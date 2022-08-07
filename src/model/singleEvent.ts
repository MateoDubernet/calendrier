import { Events } from "../interfaces/events.js";
import { getEventById } from "./event.js";
import { deleteEvent } from './event.js';

const { ipcRenderer } = require("electron")

const soloEvent = document.getElementById('soloEvent')
const modifButton = document.getElementById('modifButton')
const suppButton = document.getElementById('suppButton')

let events: Events[] = [];
let eventId: number;

ipcRenderer.on('activate', (event: Event, id: number) => {
    eventId = id
    displayEvent()
})

export function displayEvent(){
    getEventById(eventId).then((data: Events[]) => {
        events = data
        if (soloEvent) {
            soloEvent.innerHTML = "";
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

                caseId.innerHTML = events[i].id.toString()
                caseDate_deb.innerHTML = events[i].date_deb.toString()
                caseDate_fin.innerHTML = events[i].date_fin.toString()
                caseTitre.innerHTML = events[i].titre
                caseLocation.innerHTML = events[i].location
                caseCategorie.innerHTML = events[i].categorie
                caseStatut.innerHTML = events[i].statut
                caseDescription.innerHTML = events[i].description
                caseTransparence.innerHTML = events[i].transparence
                caseNbMaj.innerHTML = events[i].nbMaj.toString()

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
                soloEvent.appendChild(ligne)
            }
        }
    })
}

function openForm(){
    if (modifButton) {
        modifButton.addEventListener('click', (e) => {            
            e.preventDefault();
            ipcRenderer.send('formWindow', events)
        })
    }
}

function deleteSelectEvent(){
    if(suppButton)
    suppButton.addEventListener('click', () =>{
        if (window.confirm("Voulez vous vraiment supprimer l'événement ?")) {
            deleteEvent(eventId)
        }
    })
}

openForm()
deleteSelectEvent()