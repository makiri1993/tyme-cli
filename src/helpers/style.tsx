import ReactPDF, { Text } from "@react-pdf/renderer"
import React from "react"

export function flexbox({
    flexDirection = "column",
    alignItems = "center",
    justifyContent = "flex-start"
}: {
    justifyContent?: "flex-start" | "flex-end"
    flexDirection?: "row" | "column" | "row-reverse"
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
}): ReactPDF.Style {
    return {
        display: "flex",
        flexDirection,
        alignItems,
        justifyContent
    }
}

export function rowCell(value: string, headerMode: boolean = false) {
    const headerStyle: ReactPDF.Style = headerMode ? { borderBottom: 2, borderColor: "#2d3748", fontSize: 12, fontWeight: "bold" } : { fontSize: 10 }
    return <Text style={{ width: "25%", padding: 4, ...headerStyle }}>{value}</Text>
}
