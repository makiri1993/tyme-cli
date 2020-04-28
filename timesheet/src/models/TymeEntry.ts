export interface TimeEntry {
    task: string
    date: string
    week: number
    project: string
    sum: number
    time: {
        hours: number
        minutes: number
    }
}
