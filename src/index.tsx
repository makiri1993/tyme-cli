#!/usr/bin/env node
"use strict"
import React from "react"
import { render } from "ink"
import meow from "meow"

import App from "./ui"

const cli = meow(`
	Usage
	  $ timesheet

	Options
		--name  Your name

	Examples
	  $ timesheet --name=Jane
	  Hello, Jane
`)

render(<App args={cli} />)
