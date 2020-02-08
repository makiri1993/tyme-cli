import ReactPDF, { Document, Page, Text, View, Font } from "@react-pdf/renderer"
import React, { FC } from "react"
import { TymeEntry, TimeEntry } from "./models/TymeEntry"
import { prettifyDate, transformDurationToHoursAndMinutes, getSumOfHours, prettifyHoursAndMinutes, getFirstDateOfWeek, getLastDateOfWeek } from "./helpers/tyme"
import { flexbox, rowCell } from "./helpers/style"
import { weekNumber } from "weeknumber"

// Create styles

interface TimeSheetProps {
    tymeEntries: TymeEntry[]
}

// Create Document Component
const TimeSheet: FC<TimeSheetProps> = ({ tymeEntries }) => {
    Font.register({
        family: "SF Pro",
        fonts: [
            {
                src: `src/font/JetBrainsMono-Medium.ttf`
            },
            {
                src: `src/font/JetBrainsMono-Bold.ttf`,
                fontWeight: "bold"
            }
        ]
    })

    const timeEntries: TimeEntry[] = tymeEntries.map(entry => {
        const date = new Date(entry.date)
        return { ...entry, ...transformDurationToHoursAndMinutes(entry.duration), date, week: weekNumber(date) }
    })

    const header = () => (
        <View style={{ ...flexbox({ flexDirection: "row" }), marginBottom: 4 }}>
            {rowCell("Project", true)}
            {rowCell("Date", true)}
            {rowCell("Description", true)}
            {rowCell("Time", true)}
        </View>
    )

    const row = ({
        index,
        task,
        date,
        minutes,
        hours,
        project,
        sum
    }: {
        index: number
    } & TimeEntry) => (
        <View key={index} style={{ ...flexbox({ flexDirection: "row" }), marginBottom: 4 }}>
            {rowCell(project)}
            {rowCell(prettifyDate(date))}
            {rowCell(task)}
            {rowCell(prettifyHoursAndMinutes({ hours, minutes }))}
        </View>
    )

    const fullAmountOfHours = getSumOfHours(timeEntries)
    const firstDayOfPeriod = getFirstDateOfWeek(timeEntries.find((_, index) => index === 0)?.date)
    const lastDayOfPeriod = getLastDateOfWeek(timeEntries.find((_, index) => index === timeEntries.length - 1)?.date)

    const renderRows = () => {
        return timeEntries.map((entry, index, entries) => {
            const nextEntry = entries.find((_, nextEntryIndex) => nextEntryIndex === index + 1)?.week
            if (entry.week !== nextEntry || !nextEntry) {
                return (
                    <View key={index} style={{ width: "100%" }}>
                        <View style={{ borderBottom: 1, borderBottomColor: "#2d3748", marginBottom: 4 }}>{row({ ...entry, index })}</View>
                        <View style={{ ...flexbox({ flexDirection: "row-reverse" }), marginBottom: 20 }}>
                            <View style={{ width: "15%", textAlign: "right" }}>
                                <Text style={{ fontSize: 10 }}>
                                    {prettifyHoursAndMinutes(getSumOfHours(timeEntries.filter(({ week }) => week === entry.week)))}
                                </Text>
                            </View>
                            <View style={{ width: "15%", textAlign: "right" }}>
                                <Text style={{ fontSize: 10 }}>Week {entry.week}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            return row({ ...entry, index })
        })
    }

    return (
        <Document>
            <Page
                size="A4"
                style={{
                    flexDirection: "row",
                    fontSize: 12
                    // fontFamily: "JetBrains"
                    // letterSpacing: 0
                }}
            >
                <View style={{ ...flexbox({}), width: "100%", padding: 24 }}>
                    <Text style={{ marginBottom: 48 }}>
                        Timesheet from {firstDayOfPeriod} to {lastDayOfPeriod} - Martin Kireew
                    </Text>
                    <View style={{ ...flexbox({ flexDirection: "column" }), borderBottom: 2, borderBottomColor: "#2d3748", marginBottom: 8 }}>
                        {header()}
                        {renderRows()}
                    </View>
                    <View style={{ ...flexbox({ flexDirection: "row-reverse" }), width: "100%" }}>
                        <View style={{ width: "15%", textAlign: "right" }}>
                            <Text>{prettifyHoursAndMinutes(fullAmountOfHours)}</Text>
                        </View>
                        <View style={{ width: "15%", textAlign: "right" }}>
                            <Text>Total: </Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default TimeSheet
