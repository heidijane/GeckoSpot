import React from "react"
import { GeckoProvider } from "./geckos/GeckoProvider"

export const DataStore = props => (
    <GeckoProvider>
        {props.children}
    </GeckoProvider>
)