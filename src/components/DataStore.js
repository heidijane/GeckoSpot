import React from "react"
import { GeckoProvider } from "./geckos/GeckoProvider"
import { MealProvider } from "./meals/MealProvider"
import { ImageProvider } from "./images/ImageProvider"
import { ListingProvider } from "./marketplace/MarketplaceProvider"
import { UserProvider } from "./auth/UserProvider"
import { WeightProvider } from "./weight/WeightProvider"


export const DataStore = props => (
    <UserProvider>
        <GeckoProvider>
            <ListingProvider>
                <MealProvider>
                    <WeightProvider>
                        <ImageProvider>
                            {props.children}
                        </ImageProvider>
                    </WeightProvider>
                </MealProvider>
            </ListingProvider>
        </GeckoProvider>
        </UserProvider>
)