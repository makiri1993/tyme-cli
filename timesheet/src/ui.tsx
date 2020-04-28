"use strict"
import React, { FC } from "react"
import { readFileSync, readFile } from "fs"
// import PropTypes from "prop-types";
import { Text, Color, Box } from "ink"
import TimeSheet from "./timesheet"
import ReactPDF from "@react-pdf/renderer"
import { TimeEntry } from "./models/TymeEntry"

interface Props {
    args: {
        input: string[]
        flags: {
            name?: string
        }
    }
}

const App: FC<Props> = ({ args }) => {
    const path = args.input[0]
    const { entries, first_day, last_day }: { first_day: string; last_day: string; entries: TimeEntry[] } = JSON.parse(path)
    //     const data = readFileSync(path)
    //     const { timed }: TymeExport = JSON.parse(data.toString())

    ReactPDF.render(<TimeSheet entries={entries} firstDay={first_day} lastDay={last_day} />, `${__dirname}/example.pdf`)

    return (
        <Box flexDirection="column">
            {/* {timed.map(({ task, date }, index) => (
                <Box
                    key={index}
                    flexDirection="column"
                    paddingX={2}
                    paddingY={2}
                >
                    <Text>
                        Task: <Color blue>{task}</Color>
                    </Text>
                    <Text>
                        Date: <Color yellow>{date}</Color>
                    </Text>
                </Box>
            ))} */}
        </Box>
    )
}

export default App
