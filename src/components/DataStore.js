import React from "react"
import { GeckoProvider } from "./geckos/GeckoProvider"
import { MealProvider } from "./meals/MealProvider"
import { ImageProvider } from "./images/ImageProvider"
import { ListingProvider } from "./marketplace/MarketplaceProvider"
import { UserProvider } from "./auth/UserProvider"
import { WeightProvider } from "./weight/WeightProvider"
import { FamilyProvider } from "./family/FamilyProvider"


export const DataStore = props => (
    <UserProvider>
        <GeckoProvider>
            <ListingProvider>
                <MealProvider>
                    <WeightProvider>
                        <FamilyProvider>
                            <ImageProvider>
                                {props.children}
                            </ImageProvider>
                        </FamilyProvider>
                    </WeightProvider>
                </MealProvider>
            </ListingProvider>
        </GeckoProvider>
        </UserProvider>
)