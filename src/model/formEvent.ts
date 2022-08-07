const { ipcRenderer } = require("electron")
import { displayAllEvents } from "../renderer.js";
import { displayEvent } from "./singleEvent.js";
import { Events } from "../interfaces/events.js";
import { addEvent, editEventById, getAllEvents } from "./event.js";

const date_deb = document.getElementById('date_deb') as HTMLInputElement 
const date_fin = document.getElementById('date_fin') as HTMLInputElement
const titre = document.getElementById('titre') as HTMLInputElement
const location = document.getElementById('location') as HTMLInputElement
const categorie = document.getElementById('categorie') as HTMLInputElement
const statut = document.getElementById('statut') as HTMLInputElement
const description = document.getElementById('description') as HTMLInputElement
const transparence = document.getElementById('transparence') as HTMLInputElement
const submit = document.getElementById('submit')

let eventDatas: Events[] = [];
let formValue: Events;
let lastEventId: number;
let edit: boolean;

function setFormValue(){    
    for(let i in eventDatas){
        titre.value = eventDatas[i].titre
        location.value = eventDatas[i].location
        categorie.value = eventDatas[i].categorie
        statut.value = eventDatas[i].statut
        description.value = eventDatas[i].description
        transparence.value = eventDatas[i].transparence
        
        formValue = eventDatas[i]
    }
}

function editEvent(){
    if(submit)
        submit.addEventListener('click', (e) => {
            let form = document.getElementById('eventForm') as HTMLFormElement
            
            if (form.checkValidity() == true){
                let dateDeb = date_deb.value.replace('T', ' ');
                let dateFin = date_fin.value.replace('T', ' ');

                formValue.date_deb = new Date(dateDeb)
                formValue.date_fin = new Date(dateFin)
                formValue.titre = titre.value;
                formValue.location = location.value;
                formValue.categorie = categorie.value;
                formValue.statut = statut.value;
                formValue.description = description.value;
                formValue.transparence = transparence.value;
                formValue.nbMaj = formValue.nbMaj + 1;

                editEventById(formValue)
                refreshCalendar(e)
            }
        })
}

function addNewEvent(){
    if(submit)
    submit.addEventListener('click', (e) => {
        let form = document.getElementById('eventForm') as HTMLFormElement

        if (form.checkValidity() == true){
            let dateDeb = date_deb.value.replace('T', ' ')
            let dateFin = date_fin.value.replace('T', ' ')
            
            formValue = {
                "id": lastEventId + 1,
                "date_deb": new Date(dateDeb),
                "date_fin": new Date(dateFin),
                "titre": titre.value,
                "location": location.value,
                "categorie": categorie.value,
                "statut": statut.value,
                "description": description.value,
                "transparence": transparence.value,
                "nbMaj": 0,
            }
            
            addEvent(formValue).then((data: Events[]) => {
                refreshCalendar(e)
            }).catch(err => {
                throw new Error(err.message)
            })
        }
    })
}

function refreshCalendar(e: MouseEvent){
    e.preventDefault();
    ipcRenderer.send('refresh', edit)
}

ipcRenderer.on('activate', (event: any, events: Events[]) => {
    if (events) {
        eventDatas = events
        edit = true;
        setFormValue()
        editEvent()
    }else{
        edit = false
        getAllEvents().then((data: Events[]) => {
            events = [...data]
            for(let i in events){
                lastEventId = events[i].id
            }
        })

        addNewEvent()
    }
})

