import React from "react"
import { GeckoProvider } from "./geckos/GeckoProvider"
import { MealProvider } from "./meals/MealProvider"

export const DataStore = props => (
    <GeckoProvider>
        <MealProvider>
            {props.children}
        </MealProvider>
    </GeckoProvider>
)