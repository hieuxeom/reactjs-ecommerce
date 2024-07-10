import { parseAbsolute, toCalendarDate, toTime } from "@internationalized/date";

export function convertToInternationalizedDate(dateString) {
    const absoluteDate = parseAbsolute(dateString, "UTC");

    // Convert the Absolute date to a CalendarDate
    const calendarDate = toCalendarDate(absoluteDate);

    // Return the CalendarDate and Time
    return calendarDate;
}

export function convertToInternationalizedTime(dateString) {
    const absoluteDate = parseAbsolute(dateString, "UTC");

    // Convert the Absolute date to a CalendarDate
    const time = toTime(absoluteDate);

    // Return the CalendarDate and Time
    return time;
}

export function formatDate(isoString) {
    const date = new Date(isoString);

    const pad = (num) => num.toString().padStart(2, "0");

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
}

