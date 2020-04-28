import { TimeEntry } from "../models/TymeEntry";
interface Time {
    hours: number;
    minutes: number;
}
export declare const prettifyDate: (date: Date) => string;
export declare const addZeroIfNecessary: (datePart: number) => string;
export declare const transformDurationToHoursAndMinutes: (duration: number) => Time;
export declare const prettifyHoursAndMinutes: ({ hours, minutes }: Time) => string;
export declare const getSumOfHours: (timeEntries: TimeEntry[]) => Time;
export declare const getFirstDateOfWeek: (dateString?: Date | undefined) => string | void;
export declare const getLastDateOfWeek: (dateString?: Date | undefined) => string | void;
export declare const formatDateToString: (year: number, month: number, day: number) => string;
export declare const changeDateToStartOrEndOfWeek: (date: Date, changeDayTo: number, changeDayBy: number) => string;
export {};
//# sourceMappingURL=tyme.d.ts.map