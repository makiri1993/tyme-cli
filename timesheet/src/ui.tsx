// "use strict"
import ReactPDF from "@react-pdf/renderer"
import React from "react"
import { TimeEntry } from "./models/TymeEntry"
import TimeSheet from "./timesheet"

const generate_pdf = async () => {
    const path = process.argv?.[2]
    const outputPath = process.argv?.[3]
    const { entries, first_day, last_day }: { first_day: string; last_day: string; entries: TimeEntry[] } = JSON.parse(path)
    try {
        ReactPDF.render(<TimeSheet entries={entries} firstDay={first_day} lastDay={last_day} />, `${outputPath}/timesheet_${first_day}_${last_day}.pdf`)
    } catch (error) {
        console.log(error)
    }
}

generate_pdf()
