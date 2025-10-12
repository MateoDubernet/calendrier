import { Events } from 'src/interfaces/events';
import { viewEventDetails } from '../renderer.js';

const calendar = document.getElementById("calendar");
const calendarBody = document.getElementById("calendarBody");
const calendarHeader = document.getElementById("calendarHeader");

const upperButton = document.createElement("button");
const lowerButton = document.createElement("button");

let casesActives: HTMLDivElement[] = [];
let casesGrises: HTMLDivElement[] = [];
let allEvents: Events[] = [];
let choosenMonth: number;
let choosenYear: number

export function generateCalendarBody(date: Date, events?: Events[]) {
    if(events) allEvents = events
    
    let premierJourDuMois = new Date(date)
    premierJourDuMois.setDate(1)

    let numPremierJourDuMois = premierJourDuMois.getDay()
    if (numPremierJourDuMois == 0) numPremierJourDuMois = 7

    choosenMonth = date.getMonth();
    choosenYear = date.getFullYear();
    let nombreDeJourMois = new Date(date.getFullYear(), choosenMonth + 1, 0);
    
    let numNombreJourDuMois = nombreDeJourMois.getDate()
    let numDernierJourDuMois = nombreDeJourMois.getDay()
    if (numDernierJourDuMois == 0) numDernierJourDuMois = 7

    for (let i = 1; i < numPremierJourDuMois; i++) {
        ajouteCaseGrise()
    }
    for (let i = 1; i <= numNombreJourDuMois; i++) {
        ajouteCaseActive(i, allEvents)
    }
    for (let i = numDernierJourDuMois; i < 7; i++) {
        ajouteCaseGrise()
    }
}

function ajouteCaseGrise() {
    let caseGrise = document.createElement("div")
    caseGrise.className = "caseInactive"
    if (calendarBody) {
        calendarBody.appendChild(caseGrise)
        casesGrises.push(caseGrise)
    }
}

function deleteCaseGrise(){
    casesGrises.forEach((cases) =>  {
        if (calendarBody) {
            calendarBody.removeChild(cases)
        }
    })
    casesGrises = [];
}

function ajouteCaseActive(numéroJour: number, events?: Events[]) {
    let caseActive = document.createElement("div")
    caseActive.className = "caseActive"
    caseActive.innerHTML = numéroJour.toString()
    if (calendarBody) {
        calendarBody.appendChild(caseActive)
        
        if (events) {
            events.forEach((event)=>{
                const eventId = event.id ? event.id : 0;
                if (event.date_deb.getDate() == numéroJour && event.date_deb.getMonth() == choosenMonth && event.date_deb.getFullYear() == choosenYear) {
                    let eventDebutSet = document.createElement("div")
                    eventDebutSet.innerHTML = 'Début :' + ' ' + event.titre + ' ' + event.date_deb.getHours() + 'h' + event.date_deb.getMinutes()
                    
                    eventDebutSet.className = 'eventDébut'

                    caseActive.appendChild(eventDebutSet)
                    viewEventDetails(eventDebutSet, eventId)
                }

                if (event.date_fin.getDate() == numéroJour && event.date_fin.getMonth() == choosenMonth && event.date_fin.getFullYear() == choosenYear) {
                    let eventFinSet = document.createElement("div")
                    eventFinSet.innerHTML = 'Fin :' + ' ' + event.titre + ' ' + event.date_fin.getHours() + 'h' + event.date_fin.getMinutes()
                    
                    eventFinSet.className = 'eventFinSet'
                    
                    caseActive.appendChild(eventFinSet)
                    viewEventDetails(eventFinSet, eventId)
                }
                
            })
        }

        if (numéroJour === new Date().getDate() && choosenMonth === new Date().getMonth() && choosenYear === new Date().getFullYear()) {
            caseActive.classList.add("today");
        }

        casesActives.push(caseActive)
    }
}

function deleteCaseActive(){
    casesActives.forEach((cases) =>  {
        if (calendarBody) {
            calendarBody.removeChild(cases)
        }
    })
    casesActives = [];
}

export function calendarHeaderComponent(date: Date) {
    if (!calendar || !calendarHeader) return;

    const oldSelectDate = calendarHeader.querySelector('.selectDate');
    if (oldSelectDate) {
        calendarHeader.removeChild(oldSelectDate);
    }

    const selectDate = document.createElement("div");

    let selectMonth = date.toLocaleString('default', { month: 'long' });
    let year = date.toLocaleString('default', { year: 'numeric' });

    const choosenDate = document.createElement("p");
    choosenDate.innerHTML = `${selectMonth} ${year}`;
    choosenDate.className = 'choosenDate';

    lowerButton.innerHTML = "<";
    upperButton.innerHTML = ">";

    selectDate.className = 'selectDate';
    choosenDate.className = 'choosenDate'

    selectDate.appendChild(lowerButton);
    selectDate.appendChild(choosenDate);
    selectDate.appendChild(upperButton);

    calendarHeader.appendChild(selectDate);
}

export function changeCalendarDate(date: Date){
    upperButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1) 
        
        deleteCaseActive();
        deleteCaseGrise();

        generateCalendarBody(date)
        calendarHeaderComponent(date)
    });

    lowerButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1)

        deleteCaseActive();
        deleteCaseGrise();
          
        generateCalendarBody(date)
        calendarHeaderComponent(date)
    });
}

