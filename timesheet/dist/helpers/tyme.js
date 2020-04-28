"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettifyDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return exports.formatDateToString(year, month, day);
};
exports.addZeroIfNecessary = (datePart) => `${datePart < 10 ? `0${datePart}` : datePart}`;
exports.transformDurationToHoursAndMinutes = (duration) => {
    const decimalNumber = duration / 60 / 60;
    const minutes = Math.trunc(Math.round(60 * (decimalNumber % 1)));
    const hours = Math.floor(decimalNumber);
    return { hours, minutes };
};
exports.prettifyHoursAndMinutes = ({ hours, minutes }) => {
    return `${hours}h ${minutes}m`;
};
exports.getSumOfHours = (timeEntries) => {
    const fullAmountOfMinutes = timeEntries
        .map(({ hours, minutes }) => hours * 60 + minutes)
        .reduce((prevDuration, nextDuration) => (prevDuration += nextDuration), 0);
    return { hours: Math.trunc(fullAmountOfMinutes / 60), minutes: fullAmountOfMinutes % 60 };
};
exports.getFirstDateOfWeek = (dateString) => {
    if (dateString) {
        return exports.changeDateToStartOrEndOfWeek(dateString, 1, -1);
    }
    return "[No date found]";
};
exports.getLastDateOfWeek = (dateString) => {
    if (dateString) {
        return exports.changeDateToStartOrEndOfWeek(dateString, 0, 1);
    }
    return "[No date found]";
};
exports.formatDateToString = (year, month, day) => {
    return `${exports.addZeroIfNecessary(year)}-${exports.addZeroIfNecessary(month)}-${exports.addZeroIfNecessary(day)}`;
};
exports.changeDateToStartOrEndOfWeek = (date, changeDayTo, changeDayBy) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === changeDayTo) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return exports.formatDateToString(year, month, day);
    }
    else {
        date.setDate(date.getDate() + changeDayBy);
        return exports.changeDateToStartOrEndOfWeek(date, changeDayTo, changeDayBy);
    }
};
