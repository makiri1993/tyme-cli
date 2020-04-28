import { TimeEntry } from "../models/TymeEntry"

interface Time {
    hours: number
    minutes: number
}

// export const prettifyDate = (date: Date): string => {
//     const day = date.getDate()
//     const month = date.getMonth() + 1
//     const year = date.getFullYear()
//     return formatDateToString(year, month, day)
// }

export const addZeroIfNecessary = (datePart: number): string => `${datePart < 10 ? `0${datePart}` : datePart}`

// export const transformDurationToHoursAndMinutes = (duration: number): Time => {
//     const decimalNumber = duration / 60 / 60
//     const minutes = Math.trunc(Math.round(60 * (decimalNumber % 1)))
//     const hours = Math.floor(decimalNumber)
//     return { hours, minutes }
// }

export const prettifyHoursAndMinutes = ({ hours, minutes }: Time): string => {
    return `${hours}h ${minutes}m`
}

export const getSumOfHours = (timeEntries: TimeEntry[]): Time => {
    const fullAmountOfMinutes = timeEntries
        .map(({ time: { hours, minutes } }) => hours * 60 + minutes)
        .reduce((prevDuration, nextDuration) => (prevDuration += nextDuration), 0)
    return { hours: Math.trunc(fullAmountOfMinutes / 60), minutes: fullAmountOfMinutes % 60 }
}

// export const getFirstDateOfWeek = (dateString?: Date): string | void => {
//     if (dateString) {
//         return changeDateToStartOrEndOfWeek(dateString, 1, -1)
//     }

//     return "[No date found]"
// }

// export const getLastDateOfWeek = (dateString?: Date): string | void => {
//     if (dateString) {
//         return changeDateToStartOrEndOfWeek(dateString, 0, 1)
//     }

//     return "[No date found]"
// }

export const formatDateToString = (year: number, month: number, day: number): string => {
    return `${addZeroIfNecessary(year)}-${addZeroIfNecessary(month)}-${addZeroIfNecessary(day)}`
}

export const changeDateToStartOrEndOfWeek = (date: Date, changeDayTo: number, changeDayBy: number): string => {
    const dayOfWeek = date.getDay()
    if (dayOfWeek === changeDayTo) {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return formatDateToString(year, month, day)
    } else {
        date.setDate(date.getDate() + changeDayBy)
        return changeDateToStartOrEndOfWeek(date, changeDayTo, changeDayBy)
    }
}
