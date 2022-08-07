import { Events } from "src/interfaces/events";
const mysql = require('mysql2');
const { ipcRenderer } = require("electron");

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'calendrier'
});

export function getAllEvents() {
        return new Promise<Events[]>((result, rej) => {
            connection.query('SELECT * FROM event',(error: Error, respons: Events[]) => {
                if (error){
                    rej(error)
                } else {
                    result(respons)
                }
            })
        })
    }

export function getEventById(id: number){
    return new Promise<Events[]>((result, rej) => {
        connection.query("SELECT * FROM event WHERE id="+[id], (error: Error, respons: Events[]) => {
            if (error){
                rej(error)
            } else {
                result(respons)
            }
        })
    })
}

export function editEventById(editEvent: Events){
    
    return new Promise<Events[]>((result, rej) => {
        connection.query("UPDATE event SET date_deb=?,date_fin=?,titre=?,location=?,categorie=?,statut=?,description=?,transparence=?,nbMaj=? WHERE id=?", [
            editEvent.date_deb.getFullYear()+'/'+editEvent.date_deb.getMonth()+'/'+editEvent.date_deb.getDate()+' '+editEvent.date_deb.toLocaleTimeString(),
            editEvent.date_fin.getFullYear()+'/'+editEvent.date_fin.getMonth()+'/'+editEvent.date_fin.getDate()+' '+editEvent.date_fin.toLocaleTimeString(),
            editEvent.titre,
            editEvent.location,
            editEvent.categorie,
            editEvent.statut,
            editEvent.description,
            editEvent.transparence,
            editEvent.nbMaj,
            editEvent.id], (error: Error, respons: Events[]) => {
            if (error){
                rej(error)
            } else {
                result(respons)
                console.log(respons);
            }
        })
    })
}

export function addEvent(addEvent: Events){
    return new Promise<Events[]>((result, rej) => {
        connection.query("INSERT INTO event (id,date_deb, date_fin,titre,location,categorie,statut,description,transparence,nbMaj) VALUES (?,?,?,?,?,?,?,?,?,?)", [
            addEvent.id,
            addEvent.date_deb.getFullYear()+'/'+addEvent.date_deb.getMonth()+'/'+addEvent.date_deb.getDate()+' '+addEvent.date_deb.toLocaleTimeString(),
            addEvent.date_fin.getFullYear()+'/'+addEvent.date_fin.getMonth()+'/'+addEvent.date_fin.getDate()+' '+addEvent.date_fin.toLocaleTimeString(),
            addEvent.titre,
            addEvent.location,
            addEvent.categorie,
            addEvent.statut,
            addEvent.description,
            addEvent.transparence,
            addEvent.nbMaj], (error: Error, respons: Events[]) => {
            if (error){
                rej(error)
            } else {
                result(respons)
            }
        })
    })
}

export function deleteEvent(id: number){
    return new Promise<Events[]>((result, rej) => {
        connection.query("DELETE FROM event WHERE id=?", [id],(error: Error, respons: Events[]) => {
            if (error){
                rej(error)
                
            } else {
                result(respons)
            }
        })
    })
}