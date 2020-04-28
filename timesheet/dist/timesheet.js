"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("@react-pdf/renderer");
const react_1 = __importDefault(require("react"));
const tyme_1 = require("./helpers/tyme");
const style_1 = require("./helpers/style");
const weeknumber_1 = require("weeknumber");
// Create Document Component
const TimeSheet = ({ tymeEntries }) => {
    var _a, _b;
    renderer_1.Font.register({
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
    });
    const timeEntries = tymeEntries.map(entry => {
        const date = new Date(entry.date);
        return Object.assign(Object.assign(Object.assign({}, entry), tyme_1.transformDurationToHoursAndMinutes(entry.duration)), { date, week: weeknumber_1.weekNumber(date) });
    });
    const header = () => (react_1.default.createElement(renderer_1.View, { style: Object.assign(Object.assign({}, style_1.flexbox({ flexDirection: "row" })), { marginBottom: 4 }) },
        style_1.rowCell("Project", true),
        style_1.rowCell("Date", true),
        style_1.rowCell("Description", true),
        style_1.rowCell("Time", true)));
    const row = ({ index, task, date, minutes, hours, project, sum }) => (react_1.default.createElement(renderer_1.View, { key: index, style: Object.assign(Object.assign({}, style_1.flexbox({ flexDirection: "row" })), { marginBottom: 4 }) },
        style_1.rowCell(project),
        style_1.rowCell(tyme_1.prettifyDate(date)),
        style_1.rowCell(task),
        style_1.rowCell(tyme_1.prettifyHoursAndMinutes({ hours, minutes }))));
    const fullAmountOfHours = tyme_1.getSumOfHours(timeEntries);
    const firstDayOfPeriod = tyme_1.getFirstDateOfWeek((_a = timeEntries.find((_, index) => index === 0)) === null || _a === void 0 ? void 0 : _a.date);
    const lastDayOfPeriod = tyme_1.getLastDateOfWeek((_b = timeEntries.find((_, index) => index === timeEntries.length - 1)) === null || _b === void 0 ? void 0 : _b.date);
    const renderRows = () => {
        return timeEntries.map((entry, index, entries) => {
            var _a;
            const nextEntry = (_a = entries.find((_, nextEntryIndex) => nextEntryIndex === index + 1)) === null || _a === void 0 ? void 0 : _a.week;
            if (entry.week !== nextEntry || !nextEntry) {
                return (react_1.default.createElement(renderer_1.View, { key: index, style: { width: "100%" } },
                    react_1.default.createElement(renderer_1.View, { style: { borderBottom: 1, borderBottomColor: "#2d3748", marginBottom: 4 } }, row(Object.assign(Object.assign({}, entry), { index }))),
                    react_1.default.createElement(renderer_1.View, { style: Object.assign(Object.assign({}, style_1.flexbox({ flexDirection: "row-reverse" })), { marginBottom: 20 }) },
                        react_1.default.createElement(renderer_1.View, { style: { width: "15%", textAlign: "right" } },
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 10 } }, tyme_1.prettifyHoursAndMinutes(tyme_1.getSumOfHours(timeEntries.filter(({ week }) => week === entry.week))))),
                        react_1.default.createElement(renderer_1.View, { style: { width: "15%", textAlign: "right" } },
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 10 } },
                                "Week ",
                                entry.week)))));
            }
            return row(Object.assign(Object.assign({}, entry), { index }));
        });
    };
    return (react_1.default.createElement(renderer_1.Document, null,
        react_1.default.createElement(renderer_1.Page, { size: "A4", style: {
                flexDirection: "row",
                fontSize: 12
                // fontFamily: "JetBrains"
                // letterSpacing: 0
            } },
            react_1.default.createElement(renderer_1.View, { style: Object.assign(Object.assign({}, style_1.flexbox({})), { width: "100%", padding: 24 }) },
                react_1.default.createElement(renderer_1.Text, { style: { marginBottom: 48 } },
                    "Timesheet from ",
                    firstDayOfPeriod,
                    " to ",
                    lastDayOfPeriod,
                    " - Martin Kireew"),
                react_1.default.createElement(renderer_1.View, { style: Object.assign(Object.assign({}, style_1.flexbox({ flexDirection: "column" })), { borderBottom: 2, borderBottomColor: "#2d3748", marginBottom: 8 }) },
                    header(),
                    renderRows()),
                react_1.default.createElement(renderer_1.View, { style: Object.assign(Object.assign({}, style_1.flexbox({ flexDirection: "row-reverse" })), { width: "100%" }) },
                    react_1.default.createElement(renderer_1.View, { style: { width: "15%", textAlign: "right" } },
                        react_1.default.createElement(renderer_1.Text, null, tyme_1.prettifyHoursAndMinutes(fullAmountOfHours))),
                    react_1.default.createElement(renderer_1.View, { style: { width: "15%", textAlign: "right" } },
                        react_1.default.createElement(renderer_1.Text, null, "Total: ")))))));
};
exports.default = TimeSheet;
