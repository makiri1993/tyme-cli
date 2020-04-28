import ReactPDF from "@react-pdf/renderer";
export declare function flexbox({ flexDirection, alignItems, justifyContent }: {
    justifyContent?: "flex-start" | "flex-end";
    flexDirection?: "row" | "column" | "row-reverse";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
}): ReactPDF.Style;
export declare function rowCell(value: string, headerMode?: boolean): JSX.Element;
//# sourceMappingURL=style.d.ts.map