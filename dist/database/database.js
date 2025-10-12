const mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'calendrier'
});
export async function getAllEvents() {
    return new Promise((result, rej) => {
        connection.query('SELECT * FROM event', (error, respons) => {
            if (error) {
                rej(error);
            }
            else {
                result(respons);
            }
        });
    });
}
export function getEventById(id) {
    return new Promise((result, rej) => {
        connection.query("SELECT * FROM event WHERE id=" + [id], (error, respons) => {
            if (error) {
                rej(error);
            }
            else {
                result(respons);
            }
        });
    });
}
export function editEventById(editEvent) {
    return new Promise((result, rej) => {
        connection.query("UPDATE event SET date_deb=?,date_fin=?,titre=?,localisation=?,categorie=?,statut=?,description=?,nbMaj=? WHERE id=?", [
            editEvent.date_deb,
            editEvent.date_fin,
            editEvent.titre,
            editEvent.localisation,
            editEvent.categorie,
            editEvent.statut,
            editEvent.description,
            editEvent.nbMaj,
            editEvent.id
        ], (error, respons) => {
            if (error) {
                rej(error);
            }
            else {
                result(respons);
                console.log(respons);
            }
        });
    });
}
export async function addEvent(addEvent) {
    return new Promise((result, rej) => {
        connection.query("INSERT INTO event (date_deb, date_fin, titre, localisation, categorie, statut, description, nbMaj) VALUES (?,?,?,?,?,?,?,?)", [
            addEvent.date_deb,
            addEvent.date_fin,
            addEvent.titre,
            addEvent.localisation,
            addEvent.categorie,
            addEvent.statut,
            addEvent.description,
            addEvent.nbMaj
        ], (error, respons) => {
            if (error) {
                rej(error);
            }
            else {
                result(respons);
            }
        });
    });
}
export function deleteEvent(id) {
    return new Promise((result, rej) => {
        connection.query("DELETE FROM event WHERE id=?", [id], (error, respons) => {
            if (error) {
                rej(error);
            }
            else {
                result(respons);
            }
        });
    });
}
//# sourceMappingURL=database.js.map