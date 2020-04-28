"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const fs_1 = require("fs");
// import PropTypes from "prop-types";
const ink_1 = require("ink");
const timesheet_1 = __importDefault(require("./timesheet"));
const renderer_1 = __importDefault(require("@react-pdf/renderer"));
const App = ({ args }) => {
    const path = args.input[0];
    const data = fs_1.readFileSync(path);
    const { timed } = JSON.parse(data.toString());
    renderer_1.default.render(react_1.default.createElement(timesheet_1.default, { tymeEntries: timed }), `${__dirname}/example.pdf`);
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" }));
};
exports.default = App;
