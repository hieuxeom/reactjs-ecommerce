import {parseAbsolute, toCalendarDate, toTime} from "@internationalized/date";

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
