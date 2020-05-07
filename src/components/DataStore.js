import React from "react"
import { GeckoProvider } from "./geckos/GeckoProvider"
import { MealProvider } from "./meals/MealProvider"
import { ImageProvider } from "./images/ImageProvider"
import { ListingProvider } from "./marketplace/MarketplaceProvider"

export const DataStore = props => (
    <GeckoProvider>
        <ListingProvider>
            <MealProvider>
                <ImageProvider>
                    {props.children}
                </ImageProvider>
            </MealProvider>
        </ListingProvider>
    </GeckoProvider>
)