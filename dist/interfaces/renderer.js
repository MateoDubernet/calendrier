import { getAllEvents } from "../database/database.js";
import { generateCalendarBody, calendarHeaderComponent, changeCalendarDate } from "./calendar.js";
import { generateEventGrid } from "./eventsList.js";
let events = [];
let date = new Date();
export function displayAllEvents() {
    getAllEvents().then((data) => {
        events = [...data];
        generateEventGrid(events);
        generateCalendarBody(date, events);
        calendarHeaderComponent(date);
        changeCalendarDate(date);
    }).catch(err => {
        throw new Error(err.message);
    });
}
displayAllEvents();
//# sourceMappingURL=renderer.js.map