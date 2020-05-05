import React from "react"
import { GeckoProvider } from "./geckos/GeckoProvider"
import { MealProvider } from "./meals/MealProvider"
import { ImageProvider } from "./images/ImageProvider"

export const DataStore = props => (
    <GeckoProvider>
        <MealProvider>
            <ImageProvider>
                {props.children}
            </ImageProvider>
        </MealProvider>
    </GeckoProvider>
)