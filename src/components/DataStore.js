import React from "react"
import { GeckoProvider } from "./geckos/GeckoProvider"
import { MealProvider } from "./meals/MealProvider"
import { ImageProvider } from "./images/ImageProvider"
import { ListingProvider } from "./marketplace/MarketplaceProvider"
import { UserProvider } from "./auth/UserProvider"


export const DataStore = props => (
    <UserProvider>
        <GeckoProvider>
            <ListingProvider>
                <MealProvider>
                    <ImageProvider>
                        {props.children}
                    </ImageProvider>
                </MealProvider>
            </ListingProvider>
        </GeckoProvider>
        </UserProvider>
)