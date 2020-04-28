"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("@react-pdf/renderer");
const react_1 = __importDefault(require("react"));
function flexbox({ flexDirection = "column", alignItems = "center", justifyContent = "flex-start" }) {
    return {
        display: "flex",
        flexDirection,
        alignItems,
        justifyContent
    };
}
exports.flexbox = flexbox;
function rowCell(value, headerMode = false) {
    const headerStyle = headerMode ? { borderBottom: 2, borderColor: "#2d3748", fontSize: 12, fontWeight: "bold" } : { fontSize: 10 };
    return react_1.default.createElement(renderer_1.Text, { style: Object.assign({ width: "25%", padding: 4 }, headerStyle) }, value);
}
exports.rowCell = rowCell;
