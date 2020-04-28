import ReactPDF, { Document, Page, Text, View, Font } from "@react-pdf/renderer"
import React, { FC } from "react"
import { TimeEntry } from "./models/TymeEntry"
import { getSumOfHours, prettifyHoursAndMinutes } from "./helpers/tyme"
import { flexbox, rowCell } from "./helpers/style"
import { weekNumber } from "weeknumber"

// Create styles

interface TimeSheetProps {
    firstDay: string
    lastDay: string
    entries: TimeEntry[]
}

// Create Document Component
const TimeSheet: FC<TimeSheetProps> = ({ entries, firstDay, lastDay }) => {
    // Font.register({
    //     family: "SF Pro",
    //     fonts: [
    //         {
    //             src: `src/font/JetBrainsMono-Medium.ttf`
    //         },
    //         {
    //             src: `src/font/JetBrainsMono-Bold.ttf`,
    //             fontWeight: "bold"
    //         }
    //     ]
    // })

    // const entries:  = tymeEntries.map(entry => {
    //     const date = new Date(entry.date)
    //     console.log("date", date)
    //     return { ...entry, ...transformDurationToHoursAndMinutes(entry.duration), date, week: weekNumber(date) }
    // })
    // console.log("entries", entries)

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
        time: { minutes, hours },
        project,
        sum
    }: {
        index: number
    } & TimeEntry) => {
        return (
            <View key={index} style={{ ...flexbox({ flexDirection: "row" }), marginBottom: 4 }}>
                {rowCell(project)}
                {rowCell(date)}
                {rowCell(task)}
                {rowCell(prettifyHoursAndMinutes({ hours, minutes }))}
            </View>
        )
    }

    const fullAmountOfHours = getSumOfHours(entries)

    // const firstDayOfPeriod = getFirstDateOfWeek([...entries].find((_, index) => index === 0)?.date)
    // console.log("firstDayOfPeriod", firstDayOfPeriod)
    // const lastDayOfPeriod = getLastDateOfWeek(entries.find((_, index) => index === entries.length - 1)?.date)
    // console.log("lastDayOfPeriod", lastDayOfPeriod)

    const renderRows = () => {
        return entries.map((entry, index, entries) => {
            const nextEntry = entries.find((_, nextEntryIndex) => nextEntryIndex === index + 1)?.week
            if (entry.week !== nextEntry || !nextEntry) {
                return (
                    <View key={index} style={{ width: "100%" }}>
                        <View style={{ borderBottom: 1, borderBottomColor: "#2d3748", marginBottom: 4 }}>{row({ ...entry, index })}</View>
                        <View style={{ ...flexbox({ flexDirection: "row-reverse" }), marginBottom: 20 }}>
                            <View style={{ width: "15%", textAlign: "right" }}>
                                <Text style={{ fontSize: 10 }}>
                                    {prettifyHoursAndMinutes(getSumOfHours(entries.filter(({ week }) => week === entry.week)))}
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
                        Timesheet from {firstDay} to {lastDay} - Martin Kireew
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
