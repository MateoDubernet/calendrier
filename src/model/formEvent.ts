const { ipcRenderer } = require("electron")
import { refreshCalendar } from "../renderer.js";
import { Events } from "../interfaces/events.js";
import { addEvent, editEventById } from "./event.js";

const date_deb = document.getElementById('date_deb') as HTMLInputElement 
const date_fin = document.getElementById('date_fin') as HTMLInputElement
const titre = document.getElementById('titre') as HTMLInputElement
const localisation = document.getElementById('localisation') as HTMLInputElement
const categorie = document.getElementById('categorie') as HTMLInputElement
const statut = document.getElementById('statut') as HTMLInputElement
const description = document.getElementById('description') as HTMLInputElement
const submit = document.getElementById('submit')

let formValue: Events;

function setFormValue(eventDatas: Events[]) {    
    for(let i in eventDatas) {
        titre.value = eventDatas[i].titre
        localisation.value = eventDatas[i].localisation
        categorie.value = eventDatas[i].categorie
        statut.value = eventDatas[i].statut
        description.value = eventDatas[i].description
        
        formValue = eventDatas[i]
    }
}

function editEvent() {
    if(submit)
        submit.addEventListener('click', (clickEvent) => {
            let form = document.getElementById('eventForm') as HTMLFormElement
            
            if (form.checkValidity() == true) {
                formValue.date_deb = new Date(date_deb.value)
                formValue.date_fin = new Date(date_fin.value)
                formValue.titre = titre.value;
                formValue.localisation = localisation.value;
                formValue.categorie = categorie.value;
                formValue.statut = statut.value;
                formValue.description = description.value;
                formValue.nbMaj = formValue.nbMaj + 1;

                editEventById(formValue).then(() => {
                    refreshCalendar(clickEvent, true)
                }).catch(err => {
                    throw new Error(err.message)
                })
            }
        })
}

function addNewEvent() {
    if(submit)
    submit.addEventListener('click', (clickEvent) => {
        let form = document.getElementById('eventForm') as HTMLFormElement

        if (form.checkValidity() == true) {
            formValue = {
                "date_deb": new Date(date_deb.value),
                "date_fin": new Date(date_fin.value),
                "titre": titre.value,
                "localisation": localisation.value,
                "categorie": categorie.value,
                "statut": statut.value,
                "description": description.value,
                "nbMaj": 0,
            }
            
            addEvent(formValue).then(() => {
                refreshCalendar(clickEvent, false)
            }).catch(err => {
                throw new Error(err.message)
            })
        }
    })
}

ipcRenderer.on('activate', (event: any, events: Events[]) => {
    if (events && events.length > 0) {
        setFormValue(events);
        console.log(events);
        editEvent();
    }else{
        addNewEvent();
    }
})
