/*
    Dashboard.js
    Determines which part of the app is shown to the user

    Possible page states:
    - myGeckos: "home" page once a user is logged in, shows an overview of all their geckos
    - geckoDetails: detailed information page on one gecko
    - marketplace: area where users can see list of geckos for sale
*/

import React, { useState, useEffect } from "react"
import MyGeckos from "./geckos/MyGeckos"
import Marketplace from "./marketplace/Marketplace"
import NavBar from "./nav/NavBar"
import { DataStore } from "./DataStore"
import GeckoDetails from "./geckos/GeckoDetails"

export default ({logout}) => {
    const [pageState, setPageState] = useState("myGeckos")
    const [components, setComponents] = useState()

    const [geckoDetailsId, setGeckoDetailsId] = useState()

    const showMyGeckos = () => <MyGeckos setPageState={setPageState} setGeckoDetailsId={setGeckoDetailsId} />
    const showMarketplace = () => <Marketplace setPageState={setPageState} />
    const showGeckoDetails = () => <GeckoDetails setPageState={setPageState} geckoId={geckoDetailsId} />

    useEffect(() => {
        if (pageState === "myGeckos") {
            setComponents(showMyGeckos)
        } else if (pageState === "marketplace") {
            setComponents(showMarketplace)
        } else if (pageState === "geckoDetails") {
            setComponents(showGeckoDetails)
        }
    }, [pageState])

    return (
        <div className="page_outerWrapper">
            <div className="page_innerWrapper">
            <NavBar currentPage={pageState} setPageState={setPageState} logout={logout} />
            <DataStore>{components}</DataStore>
            </div>
        </div>
        )
}



